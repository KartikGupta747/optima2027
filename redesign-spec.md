### Deliverable 1 — Creative Direction and Design Rationale

**Concept: Algorithmic Elegance**
The redesign abandons standard "hacker-neon" clichés in favor of a sophisticated, highly engineered aesthetic termed *Algorithmic Elegance*. Optima represents industrial and systems engineering—disciplines rooted in precision, optimization, and structural logic. The website must feel like a high-performance computational environment.

The visual identity relies on deep onyx backgrounds, strict modular grids (reminiscent of data arrays), and precise typography. To represent "optimization," the design uses the brand's signature orange infinity loop not just as a static logo, but as a dynamic motion motif—a glowing, flowing pathway that guides the user's eye down the page, finding the most efficient route through the content. This direction was chosen over a purely cinematic or futuristic cyber-aesthetic because it communicates academic rigor, corporate readiness (appealing to sponsors like ONGC and IBM), and technical ambition without sacrificing usability.

### Deliverable 2 — Existing Content and Asset Inventory

* **Branding:** Optima 2027 logo (orange gradient infinity symbol).


* **Hero Content:** "Welcome to Optima 2027", "IIT Kharagpur's renowned Techno-Optimization Fest... 7th-9th March 2027", IIT Kharagpur gate photograph.


* **Messages:** Welcome message from Head of Department, Chairman (Prof. Jitendra Kumar Jha), and user endorsements/reviews.


* **About Content:** Descriptions of "Optima - IIT Kharagpur's Techno-Optimization Fest" and "Department of Industrial and Systems Engineering".


* **Competitions:** Innovate-X, HackTank, Strategy Sutram, Operheimer, Stratathon, AI Odyssey, Datavantage, Code Ops, including Unstop registration links.


* **Guest Lectures:** Profiles for Dr. Rajesh Kumar, Dr. Arvind Kumar, Nitish Kumar, Dr. Anindita Desarkar, Suman Das, Saptaswa Sarkar, Pallavi Gupta Bhowmick, Papia Banerjee, Deepa Duraisamy.


* **Event Schedule:** Empty timeline section requiring structure.


* **Gallery:** Workshop, Guest Lecture, and Competition event photography.


* **Sponsors:** Hire3x, Sirius DigiTech, ONGC, GAIL, optym, BlueYonder, IBM, Unstop, Delhivery, LiveAI, and media partners.


* **Team:** Executive and Head profiles (including Kshitij Nayan, Anora Ankur, Kartik Gupta) with LinkedIn URLs.


* **Contact:** Phone numbers and emails for Kshitij Nayan and Anora Ankur.


* **Registration:** Empty page framework.


* **Navigation & Footer:** About, Events, Gallery, Schedule, Sponsors, Contact Us, Register links. Outdated "2025" assets and text identified for exclusion/updating.



### Deliverable 3 — Final Visual Identity

* **Typography:**
* *Display/Headings:* **Space Grotesk**. A geometric, engineered sans-serif that feels technical yet highly legible.
* *Body/UI text:* **Inter**. Neutral, high-performance, and perfectly optimized for dense data.


* **Shape Language:** Architectural and precise. Zero rounded corners (`border-radius: 0px`). Containers are defined by 1px solid borders rather than heavy drop shadows, mimicking a CAD interface or a data dashboard.
* **Visual Effects:** Controlled use of light. Instead of generic glassmorphism, surfaces use ultra-subtle noise textures overlaying pure black (`#000000`). The only glowing elements are interactive states and the "optimization pathway" line that animates on scroll.

**Color Palette Tokens**

| Token Name | HEX Value | Usage & Rationale |
| --- | --- | --- |
| `--color-bg-base` | `#030305` | Absolute background. Creates infinite depth. |
| `--color-bg-surface` | `#0A0A0E` | Default card and container background. |
| `--color-bg-elevated` | `#14141A` | Hover states and primary navigation panels. |
| `--color-text-primary` | `#F2F2F5` | Main headings and active data. High contrast. |
| `--color-text-secondary` | `#8A8A99` | Body text, metadata, and inactive tabs. |
| `--color-accent-brand` | `#FF6B00` | The Optima logo orange. Used for primary CTAs and the main motion pathway.

 |
| `--color-accent-glow` | `#FF8C00` | Used exclusively for CSS `box-shadow` glows on active brand elements. |
| `--color-accent-muted` | `#5C45FD` | A technical violet derived from current UI, used strictly for subtle structural lines and secondary badges.

 |
| `--color-border-subtle` | `#1F1F2E` | 1px borders dividing all grid sections and cards. |

### Deliverable 4 — New Information Architecture

The redesigned website consolidates fragmented pages into a continuous, immersive single-page scroll experience, with modal overlays for deep dives (like full team lists or detailed event rules).

1. **The Initiation (Hero & Intro):** Establishes the 2027 dates and the prestige of IIT Kharagpur.


2. **The Context (About & Leadership):** Immediately grounds the fest in academic credibility by featuring the Department info and Prof. Jha's message.


3. **The Arena (Competitions):** The highest-traffic section. Displayed early to drive registrations for HackTank, Operheimer, etc..


4. **The Minds (Guest Lectures):** Transitions from student output to industry input, showcasing high-profile speakers.


5. **The Blueprint (Schedule):** Transforms the empty schedule page into a sticky, horizontal scrolling timeline.


6. **The Proof (Gallery & Endorsements):** Combines the event photography and review sliders into an asymmetric, editorial masonry grid.


7. **The Network (Sponsors & Team):** Groups the corporate backing with the student organizers, demonstrating the scale of the operation.


8. **The Terminal (Footer & Contact):** Final persistent CTA, contact details, and footer links.



### Deliverable 5 & 6 — Full-Page Visual Walkthrough & Implementation Specs

#### 1. Global Navigation (Fixed)

* **Layout:** A top-pinned, 100% width bar. Height: 64px. Border-bottom: 1px solid `--color-border-subtle`. Background: `--color-bg-base` at 80% opacity with `backdrop-filter: blur(12px)`.
* **Content:** Optima logo left-aligned. Links right-aligned: About, Events, Schedule, Speakers, Sponsors.


* **Register CTA:** A solid `--color-text-primary` button with `--color-bg-base` text, transforming to `--color-accent-brand` on hover.

#### 2. Hero Section

* **Purpose:** Establish immediate technical authority.
* **Layout:** `min-height: 100vh`. A CSS Grid layout (12 columns).
* **Visuals:** The background features a desaturated, high-contrast, slow-panning version of the IIT Kharagpur gate, heavily masked by a radial gradient fading to pure black at the edges.


* **Typography:** "OPTIMA 2027" dominates the center spanning 10 columns, using Space Grotesk at `clamp(4rem, 10vw, 9rem)`. Letter spacing: `-0.02em`. The text is rendered with a CSS clip-path reveal animation.


* **Sub-content:** The dates "7th-9th March 2027" and "IIT Kharagpur's renowned Techno-Optimization Fest" are positioned in a strict metadata block in the bottom-left corner, styled like a terminal readout.



#### 3. About & Leadership (The Context)

* **Layout:** 2-column asymmetric grid. Left column (4 cols): Sticky sticky sidebar containing the "About Optima & ISE" text. Right column (8 cols): Scrolling content containing Prof. Jha's message and the Endorsements.


* **Styling:** Typography shifts to Inter. The background remains `--color-bg-base`. An SVG line (colored `--color-accent-muted`) draws itself vertically down the left margin as the user scrolls, visually connecting the sections.

#### 4. Competitions Grid

* **Layout:** A dense, 4-column bento-box grid structure.
* **Card Design:** Each of the 8 competitions is a strict rectangular card with a 1px `--color-border-subtle` border. No rounded edges. The current vector illustrations are scaled down, desaturated, and placed in the top right corner of each card.


* **Interaction:** On hover, the border illuminates to `--color-accent-brand`, the illustration regains full opacity, and the "Register on Unstop" button slides up from the bottom boundary.

#### 5. Guest Lectures

* **Layout:** A horizontal scroll section (implemented via CSS `position: sticky` and a translation on the X-axis tied to vertical scroll).
* **Card Design:** Speaker photos are cropped to strict 3:4 aspect ratio black-and-white portraits. Upon hover, the image reveals full color and a `--color-accent-muted` geometric overlay, while the speaker's name and title (e.g., "Suman Das, Digital Transformation Leader") slide into view.



#### 6. Schedule Timeline

* **Layout:** A central vertical axis (a glowing 2px line) with events branching left and right. Since the current schedule is empty, the UI must support an empty state that says "Awaiting Data Ingestion" with a blinking terminal cursor, maintaining the technical aesthetic.



#### 7. Sponsors & Partners

* **Layout:** A strict architectural hierarchy. Title Sponsor (Hire3x) and Co-Title (Sirius DigiTech) receive massive 6-column spans. Platinum (ONGC) and Strategic (optym) receive 4-column spans.


* **Visuals:** All logos must be converted to monochrome white/grey. They only reveal their brand colors on hover.

#### 8. Team & Footer (The Terminal)

* **Layout:** A strict tabular layout for the team, resembling a database table rather than a standard card grid. Columns: Name, Role, LinkedIn link.


* **Footer:** Spans 100% width, divided into 4 columns containing the Quick Links, Contact details (Kshitij, Anora), and social icons. Background is pure `#000000`.



### Deliverable 7 — Complete Animation Specification

| ID | Element | Trigger | Start State | End State | Duration | Easing |
| --- | --- | --- | --- | --- | --- | --- |
| A1 | Hero Heading | Page Load | `clip-path: inset(100% 0 0 0); transform: translateY(20px)` | `clip-path: inset(0 0 0 0); transform: translateY(0)` | 1200ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| A2 | Hero Metadata | A1 completes | `opacity: 0; filter: blur(4px)` | `opacity: 1; filter: blur(0)` | 800ms | `ease-out` |
| A3 | Section Line | Scroll (Scrub) | `stroke-dashoffset: 100%` | `stroke-dashoffset: 0%` | Tied to Scroll | Linear (Scrubbed) |
| A4 | Comp Cards | Scroll (Enter) | `opacity: 0; transform: translateY(40px)` | `opacity: 1; transform: translateY(0)` | 600ms | `ease-out` (Stagger: 100ms) |
| A5 | Hover Glow | Pointer Hover | `box-shadow: 0 0 0 rgba(255,107,0,0)` | `box-shadow: 0 0 20px rgba(255,107,0,0.15)` | 300ms | `ease-out` |

### Deliverable 8 — Interaction Map

* **Global Cursor:** Replace the default cursor with a precise 4x4 pixel white square. On hover over actionable elements (links, buttons, competition cards), the square scales up to 32x32 pixels, becomes transparent, and applies a `backdrop-filter: invert(1)` to the content beneath it.
* **Competition Cards:** Clicking the card boundary triggers a scale-down effect (`transform: scale(0.98)`) for 150ms before routing to the Unstop registration link.


* **Speaker Profiles:** Hovering scales the portrait to `1.05` within a hidden overflow container, smoothly transitioning CSS `filter: grayscale(100%)` to `grayscale(0%)`.

### Deliverable 9 — Desktop, Tablet, and Mobile Specifications

| Breakpoint | Layout Adjustments | Typography & UI Changes |
| --- | --- | --- |
| **Desktop (≥1024px)** | 12-column grid. Horizontal scroll active for Speakers. | Typography uses `clamp()`. Full hover interactions active. |
| **Tablet (768px - 1023px)** | Grid reduces to 6 columns. Competitions become a 2-column grid. | Horizontal scroll disabled; Speakers stack in a 2-column grid. |
| **Mobile (≤767px)** | Grid reduces to 4 columns. All multi-column layouts stack vertically. | Hero text reduced to `3rem`. Sticky hover states replaced with visible CTAs. Custom cursor disabled. |

### Deliverable 10 — Design System and Component Library

**Component: Primary Button**

* *Structure:* `padding: 12px 24px`, `border: 1px solid var(--color-accent-brand)`.
* *Default State:* `background: transparent`, `color: var(--color-text-primary)`.
* *Hover State:* `background: var(--color-accent-brand)`, `color: #000000`, `transition: all 0.2s ease`.
* *Active State:* `transform: scale(0.96)`.

**Component: Section Header**

* *Structure:* Flex container. A 24px orange square (`var(--color-accent-brand)`) followed by Space Grotesk text, `font-weight: 700`, `text-transform: uppercase`, `letter-spacing: 0.1em`.

### Deliverable 11 — Technical Implementation Blueprint

* **Core Framework:** React (Next.js App Router for optimal SEO and fast page loads via Server Components).
* **Styling:** Tailwind CSS mapped directly to the design tokens provided in Deliverable 3.
* **Animation Engine:** Framer Motion for orchestrating the page-load sequences (A1, A2) and scroll-triggered element reveals (A4).
* **Scroll Jacking/Smoothing:** Lenis Scroll for performant, hardware-accelerated smooth scrolling, essential for the horizontal scroll section (Guest Lectures) and the SVG path drawing (A3) to feel premium rather than stuttery.
* *(Optional Addition)* **AI Schedule Explorer:** Given the technical focus of the fest, implement a semantic search input in the Schedule section using a lightweight local endpoint (e.g., FastAPI + ChromaDB), allowing users to query "Show me coding events on day 2" via natural language.

### Deliverable 12 — Accessibility and Performance Checklist

* **Contrast:** All `text-secondary` (`#8A8A99`) on `bg-base` (`#030305`) exceeds 4.5:1 WCAG AA minimums.
* **Reduced Motion:** Wrap all Framer Motion animations in `useReducedMotion()` hooks. If true, replace transitions with simple opacity fades (0ms duration).
* **Focus States:** All interactive elements must receive a `focus-visible` outline: `2px solid var(--color-accent-brand)` with `outline-offset: 4px`.
* **Performance:** The large hero background image and gallery images must utilize Next.js `<Image>` components with WebP formatting, strict `sizes` attributes, and `priority` loading for the hero.



### Deliverable 13 — Final Visual Acceptance Criteria

1. **Content Verification:** Every competition, speaker, sponsor, and team member from the screenshots is present in the DOM.
2. **Temporal Consistency:** All instances of "2025" in headers or graphics have been programmatically or visually updated to the 2027 context.


3. **Performance Standard:** Lighthouse score must exceed 90 for Performance and 100 for Accessibility.
4. **Aesthetic Constraint:** No element possesses a `border-radius` greater than `2px`, strictly maintaining the architectural visual language.

### Deliverable 14 — An Unambiguous Final Design Summary

The redesigned Optima 2027 website is an immersive, single-page, dark-mode experience built on a philosophy of "Algorithmic Elegance." It utilizes a strict pure black and onyx palette punctuated by sharp, 1px grid lines and highly targeted bursts of the brand's signature orange. The typography is entirely geometric (Space Grotesk) and utilitarian (Inter), stripping away generic glowing gradients and rounded cards in favor of a brutalist, data-dashboard aesthetic. Motion is utilized strictly to guide the user down the page, linking sections via drawing SVG paths and smooth-scrolling horizontal planes, resulting in a digital identity that commands immediate technical respect and aligns perfectly with the rigor of IIT Kharagpur's Industrial and Systems Engineering department.