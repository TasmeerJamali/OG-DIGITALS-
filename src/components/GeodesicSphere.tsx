"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";

// The rotating geodesic sphere mesh
function GeodesicMesh() {
    const meshRef = useRef<THREE.Group>(null);

    // Rotate on Y-axis continuously
    useFrame((_, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.3;
            meshRef.current.rotation.x += delta * 0.1;
        }
    });

    return (
        <group ref={meshRef}>
            {/* Solid faces with low opacity for volume */}
            <mesh>
                <icosahedronGeometry args={[1.5, 2]} />
                <meshBasicMaterial
                    color="#00FF00"
                    transparent
                    opacity={0.08}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Wireframe edges with neon glow */}
            <mesh>
                <icosahedronGeometry args={[1.5, 2]} />
                <meshBasicMaterial
                    color="#00FF41"
                    wireframe
                    wireframeLinewidth={2}
                />
            </mesh>

            {/* Inner glow core */}
            <mesh>
                <sphereGeometry args={[0.3, 16, 16]} />
                <meshBasicMaterial
                    color="#00FF41"
                    transparent
                    opacity={0.4}
                />
            </mesh>
        </group>
    );
}

// Main component exported for use in Preloader
export default function GeodesicSphere() {
    return (
        <div className="w-48 h-48 md:w-56 md:h-56">
            <Canvas
                camera={{ position: [0, 0, 4], fov: 50 }}
                gl={{ antialias: true, alpha: true }}
                style={{ background: "transparent" }}
            >
                {/* Ambient lighting */}
                <ambientLight intensity={0.5} />

                {/* The geodesic sphere */}
                <GeodesicMesh />

                {/* Bloom post-processing for neon glow */}
                <EffectComposer>
                    <Bloom
                        intensity={1.5}
                        luminanceThreshold={0}
                        luminanceSmoothing={0.9}
                        mipmapBlur
                    />
                </EffectComposer>
            </Canvas>
        </div>
    );
}
