export const vertexShaderSource = `
attribute vec2 a_position;

void main() {
  // Pass the raw 2D coordinate (-1 to +1) directly to gl_Position.
  // The vertex shader simply covers the entire screen with a quad.
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

export const fragmentShaderSource = `
precision highp float;

// Uniforms provided by our JavaScript WebGL loop
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

// Rotates a 2D vector by an angle
mat2 rotate(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
}

// A simple hash function for pseudo-random noise
float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

// 2D Noise function
float noise(in vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

// Fractional Brownian Motion for layered noise details
float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    mat2 rot = rotate(0.5);
    for (int i = 0; i < 5; i++) {
        value += amplitude * noise(p);
        p = rot * p * 2.0 + vec2(100.0);
        amplitude *= 0.5;
    }
    return value;
}

void main() {
    // 1. Coordinate / UV setup
    // Normalize coordinates so they range from 0.0 to 1.0
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    
    // Convert UV to a centered coordinate system (-0.5 to 0.5)
    vec2 centered_uv = uv - 0.5;

    // 2. Aspect-ratio correction
    // Multiply the x coordinate by aspect ratio to prevent stretching
    centered_uv.x *= u_resolution.x / u_resolution.y;

    // 4. Mouse influence
    // Calculate normalized mouse coordinate (also centered)
    // u_mouse is provided in pixels, so we normalize and center it
    vec2 mouse_uv = u_mouse / u_resolution.xy - 0.5;
    mouse_uv.x *= u_resolution.x / u_resolution.y;
    
    // We create a vector from the current pixel to the mouse.
    vec2 to_mouse = centered_uv - mouse_uv;
    float dist_to_mouse = length(to_mouse);
    
    // 3. Time-based animation & 5. Aurora / field generation
    // We'll use domain warping. We displace the space using fbm.
    
    // Slight mouse bend: push the coordinates slightly away from the mouse
    // The effect weakens over distance (smoothstep)
    float mouse_bend = smoothstep(0.5, 0.0, dist_to_mouse);
    vec2 p = centered_uv + to_mouse * mouse_bend * 0.1;
    
    // Slow down the time for a subtle, fluid animation rather than chaotic speed
    float t = u_time * 0.15;
    
    // Layer 1: Base flow
    vec2 q = vec2(0.0);
    q.x = fbm(p + vec2(t, t * 0.5));
    q.y = fbm(p + vec2(-t * 0.8, t * 0.3));
    
    // Layer 2: Domain distortion based on the first layer
    vec2 r = vec2(0.0);
    r.x = fbm(p + 2.0 * q + vec2(1.7, 9.2) + 0.15 * t);
    r.y = fbm(p + 2.0 * q + vec2(8.3, 2.8) + 0.12 * t);
    
    // Final noise value that determines the aurora's intensity/shape
    float f = fbm(p + 3.0 * r);
    
    // 6. Color palette
    // Deep slate background color
    vec3 bg_color = vec3(0.06, 0.09, 0.16); // corresponds to #0f172a (tailwind slate-900)
    
    // Electric blue / Cyan for the main energy field
    vec3 color1 = vec3(0.1, 0.5, 1.0);
    // Violet / Magenta for highlights
    vec3 color2 = vec3(0.6, 0.2, 0.8);
    // Subtle cyan edge
    vec3 color3 = vec3(0.0, 0.8, 1.0);
    
    // Mix the colors based on the domain-warped noise patterns
    vec3 color = mix(bg_color, color1, clamp(f * f * 4.0, 0.0, 1.0));
    color = mix(color, color2, clamp(length(q) * f, 0.0, 1.0));
    color = mix(color, color3, clamp(length(r.x) * 0.5, 0.0, 1.0));
    
    // Enhance the aurora bands by adding a smoothstep glow
    // We isolate a band where 'f' is near 0.5
    float band = smoothstep(0.4, 0.5, f) * smoothstep(0.6, 0.5, f);
    color += color1 * band * 0.8;
    
    // 7. Contrast / vignette
    // Darken the edges to keep focus on the center and ensure text readability
    float vignette = length(centered_uv);
    color *= smoothstep(1.0, 0.3, vignette);
    
    // Make the very top slightly darker to ensure header text readability
    color *= smoothstep(1.0, 0.0, uv.y - 0.7);

    // 8. Final output
    gl_FragColor = vec4(color, 1.0);
}
`;
