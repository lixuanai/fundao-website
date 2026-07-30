'use client';

import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

export default function DynamicBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const colors = [
      'rgba(124, 58, 237, 0.5)',
      'rgba(236, 72, 153, 0.4)',
      'rgba(6, 182, 212, 0.4)',
      'rgba(168, 85, 247, 0.3)',
    ];
    const generated: Particle[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 5 + 4,
      delay: Math.random() * 6,
      color: colors[i % 4],
    }));
    setParticles(generated);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Mesh gradient base */}
      <div className="mesh-gradient-animated" />

      {/* Floating orbs - 5 new positions */}
      <div className="light-orb light-orb-1" />
      <div className="light-orb light-orb-2" />
      <div className="light-orb light-orb-3" />
      <div className="light-orb light-orb-4" />
      <div className="light-orb light-orb-5" />

      {/* Rotating ring */}
      <div className="rotating-ring rotating-ring-1" />
      <div className="rotating-ring rotating-ring-2" />

      {/* Sparkle particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="sparkle-dot"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.size}px ${p.color}`,
            animation: `sparkle ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}

      {/* Mouse-follow glow */}
      <div
        className="fixed pointer-events-none z-0 transition-all duration-500 ease-out"
        style={{
          left: mousePos.x - 120,
          top: mousePos.y - 120,
          width: 240,
          height: 240,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.05) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Bottom wave */}
      <div className="gradient-wave" />
    </>
  );
}
