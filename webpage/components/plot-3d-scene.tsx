'use client'

import React, { useEffect, useLayoutEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import * as THREE from 'three'

const GRASS = '#3d6b3a'
const WALL = '#e8e8ea'
const TERRACOTTA = '#b85c4a'
const SOLAR = '#2a2a2e'
const TREE = '#1a3d16'

function clampRatio(sizeRatio: number) {
  return Math.max(0.45, Math.min(2.8, sizeRatio))
}

function CameraRig({ sizeRatio }: { sizeRatio: number }) {
  const { camera } = useThree()
  const r = clampRatio(sizeRatio)
  useLayoutEffect(() => {
    const dist = 8 * Math.max(1, r * 0.95)
    camera.position.set(dist, dist, dist)
    camera.lookAt(0, 0, 0)
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.updateProjectionMatrix()
    }
  }, [camera, r])
  return null
}

function ScaledPlotMeshes({ plotLabel, sizeRatio }: { plotLabel: string; sizeRatio: number }) {
  const r = clampRatio(sizeRatio)
  return (
    <group scale={[r, 1, r]}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[8, 0.1, 8]} />
        <meshStandardMaterial color={GRASS} roughness={0.9} />
      </mesh>

      <mesh position={[0, 0.25, 4.075]}>
        <boxGeometry args={[8, 0.4, 0.15]} />
        <meshStandardMaterial color={WALL} roughness={0.6} />
      </mesh>
      {/* Left wall (full) */}
      <mesh position={[-4.075, 0.25, 0]}>
        <boxGeometry args={[0.15, 0.4, 8]} />
        <meshStandardMaterial color={WALL} roughness={0.6} />
      </mesh>
      <mesh position={[4.075, 0.25, 0]}>
        <boxGeometry args={[0.15, 0.4, 8]} />
        <meshStandardMaterial color={WALL} roughness={0.6} />
      </mesh>
      <mesh position={[-2.4, 0.25, -4.075]}>
        <boxGeometry args={[3.2, 0.4, 0.15]} />
        <meshStandardMaterial color={WALL} roughness={0.6} />
      </mesh>
      <mesh position={[2.4, 0.25, -4.075]}>
        <boxGeometry args={[3.2, 0.4, 0.15]} />
        <meshStandardMaterial color={WALL} roughness={0.6} />
      </mesh>

      {[
        [-3.95, 0.28, -3.95],
        [3.95, 0.28, -3.95],
        [-3.95, 0.28, 3.95],
        [3.95, 0.28, 3.95],
      ].map((pos, i) => (
        <mesh key={`post-${i}`} position={pos as [number, number, number]}>
          <cylinderGeometry args={[0.08, 0.08, 0.5, 12]} />
          <meshStandardMaterial
            color="#1a5c1a"
            emissive="#2d8a2d"
            emissiveIntensity={0.6}
            roughness={0.4}
          />
        </mesh>
      ))}

      {[
        [-3, 0.4, -3.1],
        [2.9, 0.4, -2.7],
        [-2.8, 0.4, 2.9],
      ].map((pos, i) => (
        <mesh key={`tree-${i}`} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.4, 20, 20]} />
          <meshStandardMaterial color={TREE} roughness={0.85} />
        </mesh>
      ))}

      <mesh position={[-2.9, 0.1, 2.9]}>
        <boxGeometry args={[1.1, 0.12, 1.1]} />
        <meshStandardMaterial color={TERRACOTTA} roughness={0.7} />
      </mesh>

      <mesh position={[2.85, 0.2, -2.85]} rotation={[-0.4, 0, 0]}>
        <boxGeometry args={[1.8, 0.05, 1.2]} />
        <meshStandardMaterial color={SOLAR} metalness={0.4} roughness={0.5} />
      </mesh>

      <Html position={[0, 0.55, 0]} center distanceFactor={10}>
        <div
          className="pointer-events-none whitespace-nowrap font-mono text-base font-medium text-white select-none"
          style={{ fontFamily: 'var(--font-dm-mono), monospace', textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}
        >
          {plotLabel}
        </div>
      </Html>
    </group>
  )
}

function PlotSceneRoot({ plotLabel, sizeRatio }: { plotLabel: string; sizeRatio: number }) {
  return (
    <>
      <CameraRig sizeRatio={sizeRatio} />
      <ambientLight intensity={0.5} color="#ffffff" />
      <directionalLight position={[5, 8, 5]} intensity={1.4} color="#ffffff" />
      <ScaledPlotMeshes plotLabel={plotLabel} sizeRatio={sizeRatio} />
      <OrbitControls
        autoRotate
        autoRotateSpeed={0.8}
        enableZoom={false}
        enablePan={false}
        target={[0, 0, 0]}
      />
    </>
  )
}

function PlotCanvasInner({ plotLabel, sizeRatio }: { plotLabel: string; sizeRatio: number }) {
  return (
    <Canvas
      className="h-full w-full"
      camera={{ position: [8, 8, 8], fov: 50 }}
      style={{ background: 'transparent' }}
      gl={{ alpha: true }}
    >
      <PlotSceneRoot plotLabel={plotLabel} sizeRatio={sizeRatio} />
    </Canvas>
  )
}

export type Plot3DViewProps = {
  plotLabel?: string
  sizeRatio?: number
  showDragHint?: boolean
  className?: string
}

function Plot3DViewImpl({
  plotLabel = 'VZG-047',
  sizeRatio = 1,
  showDragHint = true,
  className = '',
}: Plot3DViewProps) {
  const [showHint, setShowHint] = useState(showDragHint)

  useEffect(() => {
    if (!showDragHint) {
      setShowHint(false)
      return
    }
    const timer = setTimeout(() => setShowHint(false), 4000)
    return () => clearTimeout(timer)
  }, [showDragHint])

  return (
    <div className={`flex h-full min-h-0 flex-col ${className}`}>
      <div className="relative min-h-0 flex-1">
        <PlotCanvasInner plotLabel={plotLabel} sizeRatio={sizeRatio} />
      </div>
      {showHint && showDragHint && (
        <p
          className="mt-2 text-center font-mono text-xs text-white/50"
          style={{ fontFamily: 'var(--font-dm-mono), monospace' }}
        >
          Drag to rotate
        </p>
      )}
    </div>
  )
}

const Plot3DViewDynamic = dynamic(() => Promise.resolve(Plot3DViewImpl), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[12rem] items-center justify-center bg-charcoal">
      <div className="text-center">
        <div className="mb-2 font-mono text-sm text-muted-foreground">Loading 3D Scene...</div>
      </div>
    </div>
  ),
})

export function Plot3DView(props: Plot3DViewProps) {
  return <Plot3DViewDynamic {...props} />
}

export const Plot3DScene = Plot3DView
