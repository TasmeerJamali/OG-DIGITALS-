"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Text3D, Center, Environment, MeshTransmissionMaterial, Float, Lightformer } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

// Configuration
const WORDS = ["DIGITALS", "DESIGNERS", "MARKETERS", "ENGINEERS", "PARTNERS"];
const FONT_URL = "https://threejs.org/examples/fonts/helvetiker_bold.typeface.json";

// 1. OG MATERIAL - "Diamond Prism"
// Pure, high dispersion, white shine.
function OgMaterial() {
    return (
        <MeshTransmissionMaterial
            backside
            samples={16}
            thickness={2}
            roughness={0}
            clearcoat={1}
            clearcoatRoughness={0}
            transmission={1}
            ior={1.8} // Higher IOR for Gemstone look
            chromaticAberration={1.5} // HIGH Dispersion (Rainbow shine)
            anisotropy={20}
            distortion={0.2}
            distortionScale={0.3}
            temporalDistortion={0.1}
            color="#ffffff"
            attenuationColor="#ffffff" // Pure White inside
            attenuationDistance={2}
            envMapIntensity={5} // VERY Bright
            toneMapped={false}
        />
    );
}

// 2. SUFFIX MATERIAL - "Green Ice"
// The original look, but refined.
function SuffixMaterial() {
    return (
        <MeshTransmissionMaterial
            backside
            samples={16}
            thickness={2}
            roughness={0}
            clearcoat={1}
            clearcoatRoughness={0}
            transmission={1}
            ior={1.25}
            chromaticAberration={0.5}
            anisotropy={20}
            distortion={0.1}
            distortionScale={0.3}
            temporalDistortion={0.1}
            color="#ffffff"
            attenuationColor="#a8ffc4" // Green tint inside
            attenuationDistance={1}
            envMapIntensity={3}
            toneMapped={false}
        />
    );
}

function RotatingText() {
    const [index, setIndex] = useState(0);
    const [visible, setVisible] = useState(true);
    const groupRef = useRef<THREE.Group>(null);

    // Auto-rotate words with Pulse Animation
    useEffect(() => {
        const interval = setInterval(() => {
            setVisible(false);
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % WORDS.length);
                setVisible(true);
            }, 500);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const targetScale = visible ? 1 : 0;

    useFrame((state, delta) => {
        if (!groupRef.current) return;
        groupRef.current.scale.y = THREE.MathUtils.lerp(groupRef.current.scale.y, targetScale, delta * 5);
        groupRef.current.scale.z = THREE.MathUtils.lerp(groupRef.current.scale.z, targetScale, delta * 5);
    });

    return (
        <group ref={groupRef}>
            <Text3D
                font={FONT_URL}
                size={3.5}
                height={0.2}
                curveSegments={24}
                bevelEnabled
                bevelThickness={0.05}
                bevelSize={0.02}
                bevelOffset={0}
                bevelSegments={8}
                letterSpacing={0.02}
            >
                {WORDS[index]}
                <SuffixMaterial />
            </Text3D>
        </group>
    );
}

function Scene() {
    return (
        <>
            <Environment preset="studio">
                <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
                <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[10, 2, 1]} />
                <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 2, 1]} color="#a8ffc4" />
                <Lightformer intensity={5} rotation-y={Math.PI / 2} position={[-10, 0, 0]} scale={[10, 10, 1]} /> {/* Side Light for OG */}
            </Environment>

            <ambientLight intensity={2} />
            <spotLight position={[0, 20, 10]} angle={0.5} penumbra={1} intensity={5} castShadow color="#ffffff" />

            <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
                <group position={[0, -1.2, 0]}>
                    <Center position={[0, 0, 0]}>
                        <group>
                            {/* STATIC OG - Scaled Up */}
                            {/* Moved LEFT (-9.0) */}
                            <Text3D
                                position={[-9.0, 0, 0]}
                                font={FONT_URL}
                                size={3.5}
                                height={0.2}
                                curveSegments={24}
                                bevelEnabled
                                bevelThickness={0.05}
                                bevelSize={0.02}
                                bevelOffset={0}
                                bevelSegments={8}
                                letterSpacing={0.02}
                            >
                                OG
                                <OgMaterial />
                            </Text3D>

                            {/* DYNAMIC SUFFIX */}
                            {/* Moved RIGHT (-1.0) -> Creates ~8.0 unit gap minus text width */}
                            <group position={[-1.0, 0, 0]}>
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
            {/* FOV 35, dist 22 to fit the WIDE layout */}
            <Canvas camera={{ position: [0, 0, 22], fov: 35 }} dpr={[1, 2]}>
                <Scene />
            </Canvas>
        </div>
    );
}
