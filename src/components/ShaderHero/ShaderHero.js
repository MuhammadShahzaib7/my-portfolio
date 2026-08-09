"use client";

import React, { useEffect, useRef, useState } from "react";
import { fragmentShaderSource, vertexShaderSource } from "./shaders";

export default function ShaderHero({ children }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationFrameId = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // 1. Accessibility: Check for reduced motion preference
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsReducedMotion(motionQuery.matches);
    const handleMotionChange = (e) => setIsReducedMotion(e.matches);
    motionQuery.addEventListener("change", handleMotionChange);

    return () => motionQuery.removeEventListener("change", handleMotionChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    // Helper to compile shaders
    const compileShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

    if (!vertexShader || !fragmentShader) return;

    // Create and link program
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Set up a full-screen quad (two triangles)
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
      -1.0,  1.0,
       1.0, -1.0,
       1.0,  1.0,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const mouseLocation = gl.getUniformLocation(program, "u_mouse");

    // Track state
    let startTime = performance.now();
    let isHidden = document.hidden;
    
    // Smooth mouse interpolation
    let currentMouseX = 0;
    let currentMouseY = 0;

    // Handle Resize & DPR
    const resizeCanvas = () => {
      // 12. PERFORMANCE: Cap DPR to 2 to prevent massive memory usage on retina screens
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      
      const rect = canvas.parentElement.getBoundingClientRect();
      const displayWidth = Math.floor(rect.width);
      const displayHeight = Math.floor(rect.height);

      // Set actual size in memory (scaled by DPR)
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;

      // Set display size via CSS (handled by absolute inset-0)
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      
      // Initialize mouse to center if not set
      if (mousePos.current.x === 0 && mousePos.current.y === 0) {
        mousePos.current = { x: canvas.width / 2, y: canvas.height / 2 };
        currentMouseX = canvas.width / 2;
        currentMouseY = canvas.height / 2;
      }
    };
    
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas(); // initial setup

    // Mouse tracking (attached to window to track smoothly even if over other elements)
    const handleMouseMove = (e) => {
      // 14. PREFERS-REDUCED-MOTION: Disable mouse influence if reduced motion is requested
      if (isReducedMotion) return;
      
      const rect = canvas.getBoundingClientRect();
      // u_mouse is expected in WebGL pixel coordinates (DPR scaled), origin bottom-left
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const x = (e.clientX - rect.left) * dpr;
      const y = (rect.height - (e.clientY - rect.top)) * dpr;
      mousePos.current = { x, y };
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Tab visibility pausing
    const handleVisibilityChange = () => {
      isHidden = document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Render loop
    const render = (now) => {
      // 13. PAUSE WHEN TAB IS HIDDEN
      if (!isHidden) {
        // If reduced motion is requested, render a static frame (time = 0 or constant)
        // 14. REDUCED-MOTION FALLBACK
        const time = isReducedMotion ? 10.0 : (now - startTime) * 0.001;
        gl.uniform1f(timeLocation, time);

        // Interpolate mouse for organic feel (unless reduced motion)
        if (!isReducedMotion) {
          currentMouseX += (mousePos.current.x - currentMouseX) * 0.05;
          currentMouseY += (mousePos.current.y - currentMouseY) * 0.05;
        } else {
          currentMouseX = canvas.width / 2;
          currentMouseY = canvas.height / 2;
        }
        
        gl.uniform2f(mouseLocation, currentMouseX, currentMouseY);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
      
      // Always request next frame, but we only compute when not hidden
      // Wait, if it's reduced motion, we could just stop the loop entirely to save CPU!
      // Let's stop the loop if reduced motion is true. We'll render once and stop.
      if (!isReducedMotion) {
        animationFrameId.current = requestAnimationFrame(render);
      }
    };

    // If reduced motion, we just render one frame and don't loop
    if (isReducedMotion) {
      render(performance.now());
    } else {
      animationFrameId.current = requestAnimationFrame(render);
    }

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animationFrameId.current);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, [isReducedMotion]);

  return (
    <div ref={containerRef} className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden w-full">
      {/* 
        16. ACCESSIBILITY: The shader is decorative, so aria-hidden is true.
        17. POINTER EVENTS: pointer-events-none ensures we can still interact with buttons above.
      */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{
          // Fallback static gradient for CSS-only scenarios (or before JS loads)
          background: "radial-gradient(ellipse at center, #1e293b 0%, #0f172a 100%)",
        }}
      />
      
      {/* 
        Foreground content container
        z-10 ensures it sits above the canvas
      */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}
