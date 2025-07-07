
"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';

interface Point {
  id: number;
  x: number;
  y: number;
  z: number;
  size: number;
  // For projection
  screenX?: number;
  screenY?: number;
  projectedSize?: number;
}

const PARTICLE_COUNT = 300;
const PARTICLE_BASE_SIZE = 1.5; 
const FIELD_OF_VIEW = 250; 
const MAX_DEPTH = 500; 
const SCROLL_SENSITIVITY = 0.1; 
const INITIAL_CAMERA_Z = -200;

const LINK_DISTANCE_THRESHOLD = 120; 
const LINK_BASE_OPACITY = 0.4;     
const PARTICLE_GLOW_BLUR_BASE = 6; 
const PARTICLE_GLOW_COLOR = 'rgba(200, 225, 255, 0.25)'; 
const LINK_LINE_WIDTH = 0.5;

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const [particles, setParticles] = useState<Point[]>([]);
  const [cameraZ, setCameraZ] = useState<number>(INITIAL_CAMERA_Z);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const initCanvas = useCallback(() => {
    if (typeof window !== 'undefined') {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }
  }, []);
  
  useEffect(() => {
    initCanvas();
    window.addEventListener('resize', initCanvas);
    return () => window.removeEventListener('resize', initCanvas);
  }, [initCanvas]);


  const initializeParticles = useCallback(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const newParticles: Point[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      newParticles.push({
        id: i,
        x: (Math.random() - 0.5) * dimensions.width * 1.5, 
        y: (Math.random() - 0.5) * dimensions.height * 1.5, 
        z: Math.random() * MAX_DEPTH,
        size: Math.random() * PARTICLE_BASE_SIZE + 0.5, 
      });
    }
    setParticles(newParticles);
  }, [dimensions.width, dimensions.height]);

  useEffect(() => {
    initializeParticles();
  }, [initializeParticles]);

  useEffect(() => {
    const handleScroll = () => {
      const newCameraZ = INITIAL_CAMERA_Z + window.scrollY * SCROLL_SENSITIVITY;
      setCameraZ(newCameraZ);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || particles.length === 0 || dimensions.width === 0 || dimensions.height === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    
    const currentParticles = particles.map(p => ({ ...p })); 

    const animate = () => {
      ctx.fillStyle = '#000000'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      currentParticles.forEach(p => {
        const perspective = FIELD_OF_VIEW / (FIELD_OF_VIEW + p.z - cameraZ);
        if (perspective > 0) {
          p.screenX = (p.x * perspective) + canvas.width / 2;
          p.screenY = (p.y * perspective) + canvas.height / 2;
          p.projectedSize = p.size * perspective;
        } else {
          p.screenX = undefined; 
          p.screenY = undefined;
          p.projectedSize = undefined;
        }
      });

      ctx.lineWidth = LINK_LINE_WIDTH;
      for (let i = 0; i < currentParticles.length; i++) {
        const p1 = currentParticles[i];
        if (p1.screenX === undefined || p1.screenY === undefined) continue;

        for (let j = i + 1; j < currentParticles.length; j++) {
          const p2 = currentParticles[j];
          if (p2.screenX === undefined || p2.screenY === undefined) continue;

          const dx = p1.screenX - p2.screenX;
          const dy = p1.screenY - p2.screenY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < LINK_DISTANCE_THRESHOLD) {
            const opacity = LINK_BASE_OPACITY * (1 - distance / LINK_DISTANCE_THRESHOLD);
            if (opacity > 0.01) { 
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
              ctx.beginPath();
              ctx.moveTo(p1.screenX, p1.screenY);
              ctx.lineTo(p2.screenX, p2.screenY);
              ctx.stroke();
            }
          }
        }
      }
      
      currentParticles.forEach(p => {
        if (p.screenX !== undefined && p.screenY !== undefined && p.projectedSize !== undefined && p.projectedSize > 0.1) {
          const perspective = FIELD_OF_VIEW / (FIELD_OF_VIEW + p.z - cameraZ); 
          
          ctx.shadowBlur = Math.max(PARTICLE_GLOW_BLUR_BASE * perspective * 0.5, 1); 
          ctx.shadowColor = PARTICLE_GLOW_COLOR;
          
          ctx.beginPath();
          ctx.arc(p.screenX, p.screenY, p.projectedSize, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF'; 
          ctx.fill();

          ctx.shadowBlur = 0; 
        }
      });

      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    animationFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [particles, cameraZ, dimensions]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1, // Ensures it's behind all other content
        pointerEvents: 'none', // Allows interaction with content on top
        backgroundColor: '#000000', 
      }}
    />
  );
};

// Deprecated: This file might be removed in the future if not used.
// The particle background functionality has been moved to src/components/effects/particle-background.tsx

export default ParticleBackground;
