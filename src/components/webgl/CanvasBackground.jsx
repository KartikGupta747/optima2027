import React, { useRef, useMemo, useCallback, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────
const NODE_COUNT = 120;
const CONNECTION_RADIUS = 1.8;
const CURSOR_SNAP_RADIUS = 2.2;
const AMBER = new THREE.Color("#FF5E00");
const CYAN = new THREE.Color("#00E5FF");
const NODE_COLOR = new THREE.Color("#FF5E00");
const DIM_COLOR = new THREE.Color("#1a0800");

// Shared cursor world-space position (updated in NetworkScene, read by CursorLines)
const cursorWorld = new THREE.Vector3(999, 999, 999);
let isMobile = false;

// ─────────────────────────────────────────────────────────────────────────────
// Node positions — generated once, stable across renders
// ─────────────────────────────────────────────────────────────────────────────
function generateNodes(count) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 14;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
  }
  return positions;
}

function generateEdges(positions, count, radius) {
  const indices = [];
  for (let i = 0; i < count; i++) {
    const ax = positions[i * 3], ay = positions[i * 3 + 1], az = positions[i * 3 + 2];
    for (let j = i + 1; j < count; j++) {
      const dx = ax - positions[j * 3];
      const dy = ay - positions[j * 3 + 1];
      const dz = az - positions[j * 3 + 2];
      if (Math.sqrt(dx * dx + dy * dy + dz * dz) < radius) {
        indices.push(i, j);
      }
    }
  }
  return indices;
}

// ─────────────────────────────────────────────────────────────────────────────
// Network mesh (nodes + edges)
// ─────────────────────────────────────────────────────────────────────────────
const nodePositions = generateNodes(NODE_COUNT);
const edgeIndices = generateEdges(nodePositions, NODE_COUNT, CONNECTION_RADIUS);

function NetworkScene() {
  const groupRef = useRef();
  const instancedRef = useRef();
  const linesRef = useRef();
  const cursorLinesRef = useRef();
  const { camera, gl, size } = useThree();

  // Raycasting plane (invisible, at z=0)
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const planeTarget = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);
  const mouse = useMemo(() => new THREE.Vector2(), []);

  // Build edge geometry
  const edgeGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const verts = new Float32Array(edgeIndices.length * 3);
    for (let i = 0; i < edgeIndices.length; i++) {
      const ni = edgeIndices[i];
      verts[i * 3] = nodePositions[ni * 3];
      verts[i * 3 + 1] = nodePositions[ni * 3 + 1];
      verts[i * 3 + 2] = nodePositions[ni * 3 + 2];
    }
    geo.setAttribute("position", new THREE.BufferAttribute(verts, 3));
    return geo;
  }, []);

  // Build cursor-snap lines geometry (MAX_SNAP * 2 vertices: node + cursor)
  const MAX_SNAP = 8;
  const cursorLineGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const verts = new Float32Array(MAX_SNAP * 2 * 3);
    geo.setAttribute("position", new THREE.BufferAttribute(verts, 3));
    return geo;
  }, []);

  // Instanced mesh dummy
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Set instance transforms on mount
  useEffect(() => {
    if (!instancedRef.current) return;
    for (let i = 0; i < NODE_COUNT; i++) {
      dummy.position.set(
        nodePositions[i * 3],
        nodePositions[i * 3 + 1],
        nodePositions[i * 3 + 2]
      );
      dummy.scale.setScalar(0.06 + Math.random() * 0.06);
      dummy.updateMatrix();
      instancedRef.current.setMatrixAt(i, dummy.matrix);
      instancedRef.current.setColorAt(i, DIM_COLOR);
    }
    instancedRef.current.instanceMatrix.needsUpdate = true;
    instancedRef.current.instanceColor.needsUpdate = true;
  }, [dummy]);

  // Mouse move handler — updates cursorWorld
  useEffect(() => {
    if (isMobile) return;

    const onMove = (e) => {
      const rect = gl.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersection = new THREE.Vector3();
      raycaster.ray.intersectPlane(planeTarget, intersection);
      cursorWorld.copy(intersection);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [camera, gl, mouse, raycaster, planeTarget]);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += 0.001;

    if (isMobile || !instancedRef.current) return;

    // Find nearby nodes and update cursor snap lines
    const snapVerts = cursorLinesRef.current?.geometry?.attributes?.position?.array;
    if (!snapVerts) return;

    let snapCount = 0;
    for (let i = 0; i < NODE_COUNT && snapCount < MAX_SNAP; i++) {
      const wx = nodePositions[i * 3];
      const wy = nodePositions[i * 3 + 1];
      const wz = nodePositions[i * 3 + 2];

      // Transform node to world-space accounting for group rotation
      const worldPos = new THREE.Vector3(wx, wy, wz).applyMatrix4(groupRef.current.matrixWorld);
      const dist = worldPos.distanceTo(cursorWorld);

      if (dist < CURSOR_SNAP_RADIUS) {
        const base = snapCount * 6;
        // Line from node to cursor
        snapVerts[base] = worldPos.x;
        snapVerts[base + 1] = worldPos.y;
        snapVerts[base + 2] = worldPos.z;
        snapVerts[base + 3] = cursorWorld.x;
        snapVerts[base + 4] = cursorWorld.y;
        snapVerts[base + 5] = cursorWorld.z;
        snapCount++;

        // Highlight nearby node color
        instancedRef.current.setColorAt(i, AMBER);
      } else {
        instancedRef.current.setColorAt(i, DIM_COLOR);
      }
    }

    // Zero out unused snap line slots
    for (let i = snapCount; i < MAX_SNAP; i++) {
      const base = i * 6;
      for (let k = 0; k < 6; k++) snapVerts[base + k] = 0;
    }

    instancedRef.current.instanceColor.needsUpdate = true;
    cursorLinesRef.current.geometry.attributes.position.needsUpdate = true;
    cursorLinesRef.current.geometry.setDrawRange(0, snapCount * 2);
  });

  return (
    <group ref={groupRef}>
      {/* Nodes — InstancedMesh for perf */}
      <instancedMesh ref={instancedRef} args={[null, null, NODE_COUNT]} frustumCulled={false}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial vertexColors />
      </instancedMesh>

      {/* Static network edges */}
      <lineSegments ref={linesRef} geometry={edgeGeometry} frustumCulled={false}>
        <lineBasicMaterial color="#3d1500" transparent opacity={0.35} />
      </lineSegments>

      {/* Dynamic cursor snap lines — rendered OUTSIDE the rotating group */}
    </group>
  );
}

// Cursor lines are not inside the rotating group so they stay in world-space
function CursorSnapLines() {
  const ref = useRef();
  return (
    <lineSegments ref={ref}>
      <bufferGeometry />
      <lineBasicMaterial color="#FF5E00" transparent opacity={0.9} linewidth={1} />
    </lineSegments>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Loading fallback (brutalist terminal)
// ─────────────────────────────────────────────────────────────────────────────
function BrutalistLoader() {
  return (
    <div className="fixed inset-0 z-[-1] flex items-center justify-center bg-[#050505]">
      <span
        className="font-mono text-[#FF5E00] text-xs tracking-[0.3em] uppercase"
        style={{ animation: "pulse 1s step-end infinite" }}
      >
        INITIALIZING...
        <span style={{ animation: "blink 0.8s step-end infinite" }}>█</span>
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main export — WebGL canvas fixed behind everything
// ─────────────────────────────────────────────────────────────────────────────
export default function CanvasBackground() {
  useEffect(() => {
    isMobile = window.innerWidth < 768;
    const onResize = () => { isMobile = window.innerWidth < 768; };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div
      className="fixed inset-0 w-screen h-screen pointer-events-none"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    >
      <Suspense fallback={<BrutalistLoader />}>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 55 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          dpr={[1, 1.5]}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.1} />
          <NetworkScene />
          <CursorSnapLines />
          <EffectComposer>
            <Bloom
              luminanceThreshold={0.1}
              luminanceSmoothing={0.6}
              intensity={0.8}
              radius={0.6}
            />
          </EffectComposer>
        </Canvas>
      </Suspense>
    </div>
  );
}
