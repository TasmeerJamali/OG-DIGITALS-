"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// Generate thousands of random points in a sphere
function GenerateParticles(count = 5000) {
    const points = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const r = 40 * Math.cbrt(Math.random()); // Radius
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);

        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);

        points[i * 3] = x;
        points[i * 3 + 1] = y;
        points[i * 3 + 2] = z;
    }
    return points;
}

function ParticleField({ mouse }: { mouse: React.MutableRefObject<{ x: number, y: number }> }) {
    const ref = useRef<THREE.Points>(null!);
    const positions = useMemo(() => GenerateParticles(6000), []);

    useFrame((state, delta) => {
        if (!ref.current) return;

        // Rotate the entire field slowly
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;

        // Interactive Sway based on mouse
        // Lerp rotation towards mouse influence
        const targetX = mouse.current.y * 0.5;
        const targetY = mouse.current.x * 0.5;

        ref.current.rotation.x += (targetX - ref.current.rotation.x) * 0.05 * delta;
        ref.current.rotation.y += (targetY - ref.current.rotation.y) * 0.05 * delta;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#a8ffc4"
                    size={0.05}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.6}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </group>
    );
}

function Scene() {
    // Mouse tracking in valid R3F/React way
    const mouse = useRef({ x: 0, y: 0 });

    return (
        <div
            className="absolute inset-0 z-0 pointer-events-none"
            onMouseMove={(e) => {
                mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
                mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
            }}
        >
            <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
                <ParticleField mouse={mouse} />
            </Canvas>
        </div>
    );
}

// Wrapper for next.js dynamic import (client only)
export default function QuantumParticles() {
    return (
        <div className="absolute inset-0 -z-10 mix-blend-screen opacity-40">
            <Canvas camera={{ position: [0, 0, 20], fov: 60 }} gl={{ alpha: true, antialias: false }}>
                <Cloud mouseRef={{ current: { x: 0, y: 0 } } /* Placeholder, actual interaction needs global event usually or parent passing */} />
            </Canvas>
        </div>
    );
}

// Let's rewrite the export to be cleaner and self-contained with event listener
function Cloud({ mouseRef }: { mouseRef: React.MutableRefObject<{ x: number, y: number }> }) {
    const ref = useRef<THREE.Points>(null!);
    const positions = useMemo(() => GenerateParticles(4000), []);

    useFrame((state, delta) => {
        if (!ref.current) return;
        ref.current.rotation.x -= delta / 20;
        ref.current.rotation.y -= delta / 25;
    });

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#a8ffc4"
                size={0.08}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.4}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
}

export function BackgroundParticles() {
    return (
        <div className="absolute inset-0 -z-10 h-full w-full pointer-events-none">
            <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
                <color attach="background" args={['#000000']} />
                {/* Actually transparent background is handled by parent div usually if no color attached, but we want black base */}
                <ambientLight intensity={0.5} />
                <Cloud mouseRef={{ current: { x: 0, y: 0 } }} />
            </Canvas>
        </div>
    );
}
