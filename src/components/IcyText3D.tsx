"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Text3D, Center, Environment, MeshTransmissionMaterial, Float, Lightformer } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useMotionValue, useSpring } from "framer-motion";

// Configuration
const WORDS = ["DIGITALS", "DESIGNERS", "MARKETERS", "ENGINEERS", "PARTNERS"];
const FONT_URL = "https://threejs.org/examples/fonts/helvetiker_bold.typeface.json";

// Icy Material Component
function IcyMaterial() {
    return (
        <MeshTransmissionMaterial
            backside
            samples={16}
            thickness={2}
            roughness={0.2}
            clearcoat={1}
            clearcoatRoughness={0.1}
            transmission={1}
            ior={1.5}
            chromaticAberration={1} // The "leaving color" effect
            anisotropy={20}
            distortion={0.5}
            distortionScale={0.5}
            temporalDistortion={0.2}
            color="#a8ffc4" // Base Tint
            attenuationColor="#ffffff"
            attenuationDistance={0.5}
        />
    );
}

function RotatingText() {
    const [index, setIndex] = useState(0);
    const groupRef = useRef<THREE.Group>(null);

    // Auto-rotate words
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % WORDS.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    useFrame((state, delta) => {
        if (!groupRef.current) return;
        // Smooth rotation animation could go here, 
        // but for now we basically swap the geometry/text.
        // A simple "spin" effect:
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, index * (Math.PI * 2), delta * 2);
    });

    return (
        <group ref={groupRef}>
            {/* We render the current word. For a true Morph, we'd need complex geometry morphing. 
                 For now, let's do a smooth opacity fade or just a direct swap with a spin. 
             */}
            <Center position={[1.5, 0, 0]} right>
                <Text3D
                    font={FONT_URL}
                    size={0.8}
                    height={0.2}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.02}
                    bevelSize={0.02}
                    bevelOffset={0}
                    bevelSegments={5}
                >
                    {WORDS[index]}
                    <IcyMaterial />
                </Text3D>
            </Center>
        </group>
    );
}

function Scene() {
    return (
        <>
            <Environment preset="city" />

            {/* Ambient Lights for the Ice */}
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <group>
                    {/* "OG" - Static Left */}
                    <Center position={[-2.5, 0, 0]} left>
                        <Text3D
                            font={FONT_URL}
                            size={0.8}
                            height={0.2}
                            curveSegments={12}
                            bevelEnabled
                            bevelThickness={0.02}
                            bevelSize={0.02}
                            bevelOffset={0}
                            bevelSegments={5}
                        >
                            OG
                            <IcyMaterial />
                        </Text3D>
                    </Center>

                    {/* Rotating "DIGITALS" etc - Right */}
                    <RotatingText />
                </group>
            </Float>

            {/* Backdrop Lighting for "Glow" */}
            <mesh position={[0, 0, -2]}>
                <planeGeometry args={[10, 5]} />
                <meshBasicMaterial color="#000" transparent opacity={0} />
            </mesh>
        </>
    );
}

export default function IcyText3D({ opacity = 1 }: { opacity?: number }) {
    // Opacity prop to control visibility based on zipper
    return (
        <div style={{ opacity, transition: 'opacity 0.2s', width: '100%', height: '100%' }}>
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
                <Scene />
            </Canvas>
        </div>
    );
}
