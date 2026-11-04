import React, { useRef, useEffect, useCallback, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ──────────────────────────────────────────────────────────────────
// Shared cursor raycasting state (module-level for zero-React overhead)
// ──────────────────────────────────────────────────────────────────
const _cursorNDC = new THREE.Vector2(9999, 9999);
const _cursorWorld = new THREE.Vector3(9999, 9999, 0);
const _raycaster = new THREE.Raycaster();
const _plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
let _isMobile = typeof window !== "undefined" && window.innerWidth < 768;

if (typeof window !== "undefined") {
  window.addEventListener("resize", () => {
    _isMobile = window.innerWidth < 768;
  });
}

export function useNetworkCursor(glDomElement, camera) {
  useEffect(() => {
    if (_isMobile || !glDomElement) return;

    const onMove = (e) => {
      const rect = glDomElement.getBoundingClientRect();
      _cursorNDC.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      _cursorNDC.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      _raycaster.setFromCamera(_cursorNDC, camera);
      _raycaster.ray.intersectPlane(_plane, _cursorWorld);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [glDomElement, camera]);

  return _cursorWorld;
}

export { _cursorWorld as cursorWorld, _isMobile as isMobile };
