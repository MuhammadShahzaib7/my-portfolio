# Shader Notes

This document explains the technical implementation of the fullscreen fragment shader hero.

## 1. UV

- **What they are**: UV coordinates map the pixels of our screen (ranging from 0 to width/height) to a normalized 2D space (0.0 to 1.0).
- **Why normalized**: Normalizing ensures that the math in the shader works identically regardless of whether the screen is 375px wide or 4000px wide.
- **Why centered**: We subtract 0.5 from the UVs to move the origin `(0,0)` to the center of the screen. This makes symmetrical effects (like vignettes) much easier to calculate.
- **Aspect-ratio correction**: If we don't multiply the x-coordinate by `resolution.x / resolution.y`, a perfect circle would stretch into an oval on a widescreen monitor. Correcting the aspect ratio ensures our energy field maintains its intended shape across all devices.

## 2. u_time

- **What it represents**: A continuously increasing float value (based on `performance.now()`) passed from JavaScript to the shader every frame.
- **How it changes**: We scale it down in JS or GLSL (e.g., `u_time * 0.15`) so the animation remains slow and fluid.
- **Usage**: It's added to the spatial coordinates inside the Fractional Brownian Motion (fBm) functions. This causes the noise patterns to continuously drift across the screen, creating the illusion of a flowing aurora.

## 3. u_resolution

- **What it represents**: A 2D vector (`vec2`) containing the canvas's width and height in pixels (scaled by devicePixelRatio).
- **Why it's needed**: To convert `gl_FragCoord` (which is in pixel units) into normalized UV coordinates, and to calculate the aspect ratio for distortion prevention.

## 4. u_mouse

- **What it represents**: A 2D vector of the current mouse pixel coordinates (scaled by devicePixelRatio).
- **How it influences**: The shader normalizes the mouse coordinates, centers them, and corrects their aspect ratio just like the UVs. It then calculates the distance from the current pixel to the mouse.
- **Subtlety**: We use a `smoothstep` to create a localized "bend" in the space coordinates. This means the energy field subtly shifts away from the cursor as you move, but only near the cursor itself. It feels organic and avoids distracting the user from the content.

## 5. Main Visual Algorithm

The visual is built using **Domain Warping**.
1. We start with a base 2D noise function (fBm - Fractional Brownian Motion) which creates organic cloud-like patterns.
2. Instead of just coloring the noise, we use the output of one noise function to distort the *coordinates* of a second noise function.
3. This creates stretched, swirling bands of energy that look like liquid or auroras, rather than just static static/clouds.
4. We apply the mouse distance to the base coordinates before passing them to the noise, meaning the mouse distorts the physical "space" the aurora exists in.

## 6. Color

The palette is constructed using `mix()` to blend between multiple colors:
- A deep slate background (`#0f172a`) to match the Tailwind theme.
- An electric blue (`vec3(0.1, 0.5, 1.0)`) and violet (`vec3(0.6, 0.2, 0.8)`) for the energy bands.
- We isolate the sharpest parts of the noise (where the value is around 0.5) using a double `smoothstep` to create a glowing cyan band effect.
- Finally, a dark vignette is applied to the edges and the top of the screen to ensure the white hero text remains perfectly readable.

## 7. Performance

- **DPR Cap**: `devicePixelRatio` is capped at `2.0`. Rendering a complex fragment shader on a 4K 3x Retina display would destroy performance. Capping it at 2 ensures it looks crisp while maintaining 60fps.
- **Hidden-tab pause**: Using the Page Visibility API (`document.hidden`), the JavaScript `requestAnimationFrame` loop stops requesting new frames when the user switches tabs, saving battery and CPU.
- **Reduced-motion**: We listen for `prefers-reduced-motion: reduce`. If active, the continuous animation loop is completely halted, and mouse tracking is ignored. The shader renders a single, static, visually pleasing frame and stops consuming resources.

## 8. Customization & Remixing

While inspired by standard fBM/domain-warping techniques (like those documented by Inigo Quilez), this shader is heavily customized:
- The base colors were strictly mapped to the project's Tailwind `slate-900` dark mode.
- A custom top-down gradient mask was added specifically to ensure the "Hi, I'm a Full Stack Web Developer" headline is readable without needing an opaque HTML overlay.
- The mouse interaction uses a distance-based `smoothstep` bend, rather than a global camera pan, ensuring the background remains stable while still feeling interactive.
