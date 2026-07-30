'use client';

import { useEffect, useState } from 'react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

export default function DynamicBackground() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const colors = [
      'rgba(124, 58, 237, 0.6)',
      'rgba(236, 72, 153, 0.5)',
      'rgba(6, 182, 212, 0.5)',
    ];
    const generated: Sparkle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 5,
      color: colors[i % 3],
    }));
    setSparkles(generated);
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
      {/* Aurora background */}
      <div className="aurora-bg" />

      {/* Floating light orbs */}
      <div className="light-orb light-orb-1" />
      <div className="light-orb light-orb-2" />
      <div className="light-orb light-orb-3" />
      <div className="light-orb light-orb-4" />

      {/* Light beams */}
      <div className="light-beam light-beam-1" />
      <div className="light-beam light-beam-2" />
      <div className="light-beam light-beam-3" />

      {/* Sparkle particles */}
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="sparkle-dot"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            background: s.color,
            boxShadow: `0 0 ${s.size * 2}px ${s.size}px ${s.color}`,
            animation: `sparkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}

      {/* Mouse-follow glow */}
      <div
        className="fixed pointer-events-none z-0 transition-all duration-700 ease-out"
        style={{
          left: mousePos.x - 150,
          top: mousePos.y - 150,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.06) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Gradient wave at bottom */}
      <div className="gradient-wave" />
    </>
  );
}
