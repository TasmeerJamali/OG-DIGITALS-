"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";

// Outer wireframe geodesic shell
function GeodesicShell({ radius, detail, speed, reverse }: { radius: number; detail: number; speed: number; reverse?: boolean }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((_, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * speed * (reverse ? -1 : 1);
            meshRef.current.rotation.x += delta * speed * 0.3 * (reverse ? -1 : 1);
        }
    });

    return (
        <mesh ref={meshRef}>
            <icosahedronGeometry args={[radius, detail]} />
            <meshBasicMaterial
                color="#00FF41"
                wireframe
                transparent
                opacity={0.9}
            />
        </mesh>
    );
}

// Inner glowing core with pulsing animation
function GlowingCore() {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.MeshBasicMaterial>(null);

    useFrame(({ clock }) => {
        if (materialRef.current) {
            const pulse = Math.sin(clock.elapsedTime * 2) * 0.3 + 0.7;
            materialRef.current.opacity = pulse * 0.6;
        }
        if (meshRef.current) {
            const scale = Math.sin(clock.elapsedTime * 3) * 0.1 + 1;
            meshRef.current.scale.setScalar(scale);
        }
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[0.4, 32, 32]} />
            <meshBasicMaterial
                ref={materialRef}
                color="#00FF41"
                transparent
                opacity={0.5}
            />
        </mesh>
    );
}

// Floating particles around the sphere
function FloatingParticles() {
    const particlesRef = useRef<THREE.Points>(null);

    const particleCount = 200;

    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 2 + Math.random() * 1.5;
            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);
        }
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        return geo;
    }, []);

    useFrame((_, delta) => {
        if (particlesRef.current) {
            particlesRef.current.rotation.y += delta * 0.1;
            particlesRef.current.rotation.x += delta * 0.05;
        }
    });

    return (
        <points ref={particlesRef} geometry={geometry}>
            <pointsMaterial
                color="#00FF41"
                size={0.03}
                transparent
                opacity={0.8}
                sizeAttenuation
            />
        </points>
    );
}

// Orbiting ring
function OrbitRing({ radius, speed }: { radius: number; speed: number }) {
    const ringRef = useRef<THREE.Mesh>(null);

    useFrame((_, delta) => {
        if (ringRef.current) {
            ringRef.current.rotation.z += delta * speed;
        }
    });

    return (
        <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[radius, 0.01, 16, 100]} />
            <meshBasicMaterial color="#00FF41" transparent opacity={0.6} />
        </mesh>
    );
}

// The complete scene
function HolographicScene() {
    return (
        <>
            {/* Background stars */}
            <Stars radius={50} depth={50} count={1000} factor={2} saturation={0} fade speed={1} />

            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <group>
                    {/* Multiple nested geodesic shells rotating at different speeds */}
                    <GeodesicShell radius={1.8} detail={1} speed={0.2} />
                    <GeodesicShell radius={1.5} detail={2} speed={0.35} reverse />
                    <GeodesicShell radius={1.2} detail={1} speed={0.5} />

                    {/* Glowing inner core */}
                    <GlowingCore />

                    {/* Orbit rings */}
                    <OrbitRing radius={2.2} speed={0.8} />
                    <mesh rotation={[Math.PI / 3, 0, 0]}>
                        <OrbitRing radius={2.0} speed={-0.6} />
                    </mesh>
                    <mesh rotation={[0, 0, Math.PI / 4]}>
                        <OrbitRing radius={2.4} speed={0.4} />
                    </mesh>
                </group>
            </Float>

            {/* Floating particles */}
            <FloatingParticles />

            {/* Post-processing effects */}
            <EffectComposer>
                <Bloom
                    intensity={2}
                    luminanceThreshold={0}
                    luminanceSmoothing={0.4}
                    mipmapBlur
                />
                <Vignette eskil={false} offset={0.1} darkness={0.8} />
            </EffectComposer>
        </>
    );
}

// Main exported component
export default function GeodesicSphere() {
    return (
        <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
            <Canvas
                camera={{ position: [0, 0, 6], fov: 45 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance"
                }}
                style={{ background: "transparent" }}
                dpr={[1, 2]}
            >
                <HolographicScene />
            </Canvas>
        </div>
    );
}
