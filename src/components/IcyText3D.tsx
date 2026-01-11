"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Text3D, Center, Environment, MeshTransmissionMaterial, Float, Lightformer } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

// Configuration
// We want "OG [SPACE] DIGITALS" to fill the screen width nicely.
const WORDS = ["DIGITALS", "DESIGNERS", "MARKETERS", "ENGINEERS", "PARTNERS"];
const FONT_URL = "https://threejs.org/examples/fonts/helvetiker_bold.typeface.json";

// Icy Material Component
function IcyMaterial() {
    return (
        <MeshTransmissionMaterial
            backside
            samples={16}
            thickness={2}
            roughness={0} // Crystal clear
            clearcoat={1}
            clearcoatRoughness={0}
            transmission={1}
            ior={1.5}
            chromaticAberration={0.6} // Subtle dispersion
            anisotropy={20}
            distortion={0.2}
            distortionScale={0.3}
            temporalDistortion={0.1}
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
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    useFrame((state, delta) => {
        if (!groupRef.current) return;
        // Spin effect on Change
        // We can make it do a full 360 spin every change or just sit there.
        // Let's add a subtle continuous float-rotation.
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, index * (Math.PI * 2), delta * 1.5);
    });

    return (
        <group ref={groupRef}>
            {/* LEFT ALIGNED relative to the container */}
            <Text3D
                font={FONT_URL}
                size={2.5} // HUGE FONT
                height={0.5}
                curveSegments={24}
                bevelEnabled
                bevelThickness={0.05}
                bevelSize={0.04}
                bevelOffset={0}
                bevelSegments={8}
                letterSpacing={0.05}
            >
                {WORDS[index]}
                <IcyMaterial />
            </Text3D>
        </group>
    );
}

function Scene() {
    return (
        <>
            <Environment preset="studio" />

            <ambientLight intensity={1} />
            <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={2} castShadow />
            <pointLight position={[-10, -10, -10]} color="#a8ffc4" intensity={1} />

            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
                <group position={[0, -1, 0]}> {/* Center vertically roughly */}

                    {/* FLEX ROW LAYOUT: "OG" + "DIGITALS" */}
                    {/* "OG" sits on the LEFT. "DIGITALS" sits on the RIGHT. */}
                    {/* We center the WHOLE group. */}

                    <Center position={[0, 0, 0]}>
                        <group>
                            {/* STATIC OG */}
                            <Text3D
                                position={[-6.5, 0, 0]} // Shift left to make room
                                font={FONT_URL}
                                size={2.5} // HUGE FONT
                                height={0.5}
                                curveSegments={24}
                                bevelEnabled
                                bevelThickness={0.05}
                                bevelSize={0.04}
                                bevelOffset={0}
                                bevelSegments={8}
                                letterSpacing={0.05}
                            >
                                OG
                                <IcyMaterial />
                            </Text3D>

                            {/* DYNAMIC SUFFIX */}
                            {/* Positioned right after "OG" + Spacing */}
                            <group position={[-1.5, 0, 0]}> {/* Start point for word */}
                                <RotatingText />
                            </group>
                        </group>
                    </Center>
                </group>
            </Float>
        </>
    );
}

export default function IcyText3D({ opacity = 1 }: { opacity?: number }) {
    return (
        <div style={{ opacity, transition: 'opacity 0.2s', width: '100%', height: '100%' }}>
            {/* Field of View 35 makes things look more orthographic/flat which is good for typography */}
            <Canvas camera={{ position: [0, 0, 18], fov: 35 }} dpr={[1, 2]}>
                <Scene />
            </Canvas>
        </div>
    );
}
