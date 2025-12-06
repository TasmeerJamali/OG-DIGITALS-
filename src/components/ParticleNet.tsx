"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
}

interface ParticleNetProps {
    particleCount?: number;
    particleColor?: string;
    lineColor?: string;
    maxDistance?: number;
    mouseRadius?: number;
}

export default function ParticleNet({
    particleCount = 40,
    particleColor = "rgba(168, 255, 196, 0.5)",
    lineColor = "rgba(168, 255, 196, 0.08)",
    maxDistance = 200,
    mouseRadius = 250,
}: ParticleNetProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const animationRef = useRef<number | undefined>(undefined);

    const initParticles = useCallback((width: number, height: number) => {
        const particles: Particle[] = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
            });
        }
        particlesRef.current = particles;
    }, [particleCount]);

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const { width, height } = canvas;
        const particles = particlesRef.current;
        const mouse = mouseRef.current;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Update and draw particles
        particles.forEach((particle, i) => {
            // Mouse interaction - attract particles to mouse
            const dx = mouse.x - particle.x;
            const dy = mouse.y - particle.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouseRadius && dist > 0) {
                const force = (mouseRadius - dist) / mouseRadius;
                particle.vx += (dx / dist) * force * 0.02;
                particle.vy += (dy / dist) * force * 0.02;
            }

            // Apply velocity with friction
            particle.vx *= 0.99;
            particle.vy *= 0.99;

            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off edges
            if (particle.x < 0 || particle.x > width) {
                particle.vx *= -1;
                particle.x = Math.max(0, Math.min(width, particle.x));
            }
            if (particle.y < 0 || particle.y > height) {
                particle.vy *= -1;
                particle.y = Math.max(0, Math.min(height, particle.y));
            }

            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particleColor;
            ctx.fill();

            // Draw connections
            for (let j = i + 1; j < particles.length; j++) {
                const other = particles[j];
                const distX = particle.x - other.x;
                const distY = particle.y - other.y;
                const distance = Math.sqrt(distX * distX + distY * distY);

                if (distance < maxDistance) {
                    const opacity = 1 - distance / maxDistance;
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(other.x, other.y);
                    ctx.strokeStyle = lineColor.replace("0.15", String(opacity * 0.15));
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }

            // Draw connection to mouse
            if (dist < maxDistance * 1.5) {
                const opacity = 1 - dist / (maxDistance * 1.5);
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.strokeStyle = `rgba(168, 255, 196, ${opacity * 0.3})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        });

        // Draw mouse glow
        if (mouse.x > 0 && mouse.y > 0) {
            const gradient = ctx.createRadialGradient(
                mouse.x, mouse.y, 0,
                mouse.x, mouse.y, 100
            );
            gradient.addColorStop(0, "rgba(168, 255, 196, 0.1)");
            gradient.addColorStop(1, "rgba(168, 255, 196, 0)");
            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, 100, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
        }

        animationRef.current = requestAnimationFrame(animate);
    }, [particleColor, lineColor, maxDistance, mouseRadius]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles(canvas.width, canvas.height);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleMouseLeave = () => {
            mouseRef.current = { x: -1000, y: -1000 };
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", handleMouseLeave);

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [initParticles, animate]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ background: "transparent" }}
        />
    );
}
