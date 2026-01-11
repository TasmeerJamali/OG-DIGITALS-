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
            ior={1.25} // Low IOR for more 'diamond' dispersion
            chromaticAberration={0.4}
            anisotropy={20}
            distortion={0.1}
            distortionScale={0.3}
            temporalDistortion={0.1}
            color="#ffffff" // White base for maximum brightness
            attenuationColor="#a8ffc4" // Green tint inside
            attenuationDistance={1}
            envMapIntensity={3} // BOOST brightness
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
            // Pulse OUT
            setVisible(false);

            setTimeout(() => {
                // Change Word
                setIndex((prev) => (prev + 1) % WORDS.length);
                // Pulse IN
                setVisible(true);
            }, 500);

        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Animation Logic
    const targetScale = visible ? 1 : 0;

    useFrame((state, delta) => {
        if (!groupRef.current) return;
        // Smooth scaling Transition (No Flip)
        groupRef.current.scale.y = THREE.MathUtils.lerp(groupRef.current.scale.y, targetScale, delta * 5);
        groupRef.current.scale.z = THREE.MathUtils.lerp(groupRef.current.scale.z, targetScale, delta * 5);
    });

    return (
        <group ref={groupRef}>
            <Text3D
                font={FONT_URL}
                size={3.5} // SIZE INCREASED (2.5 -> 3.5)
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
                <IcyMaterial />
            </Text3D>
        </group>
    );
}

function Scene() {
    return (
        <>
            <Environment preset="studio">
                {/* Custom Lightformers for SHINE */}
                <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
                <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[10, 2, 1]} />
                <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 2, 1]} color="#a8ffc4" />
            </Environment>

            <ambientLight intensity={2} />
            <spotLight position={[10, 20, 10]} angle={0.25} penumbra={1} intensity={4} castShadow color="#ffffff" />

            <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
                <group position={[0, -1.2, 0]}>
                    <Center position={[0, 0, 0]}>
                        <group>
                            {/* STATIC OG - Scaled Up */}
                            <Text3D
                                position={[-8.5, 0, 0]} // Shift left more
                                font={FONT_URL}
                                size={3.5} // SIZE INCREASED
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
                                <IcyMaterial />
                            </Text3D>

                            {/* DYNAMIC SUFFIX */}
                            <group position={[-1.8, 0, 0]}>
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
