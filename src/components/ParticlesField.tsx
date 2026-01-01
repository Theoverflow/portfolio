import React from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import type { Vec3 } from '../app/scene/SceneContext';

type Props = {
  focus: Vec3;
  strength: number;
  paused: boolean;
};

const VERT = /* glsl */ `
  precision highp float;

  attribute float aSeed;

  uniform float uTime;
  uniform vec3 uFocus;
  uniform float uStrength;
  uniform float uPointSize;

  varying vec3 vColor;
  varying float vAlpha;

  // Hash-ish helper (cheap and deterministic)
  float hash(float n) {
    return fract(sin(n) * 43758.5453123);
  }

  void main() {
    vec3 base = position;

    float s = aSeed;
    float h1 = hash(s * 1.3);
    float h2 = hash(s * 2.1);

    vec3 drift = 0.25 * vec3(
      sin(uTime * 0.60 + base.y * 1.40 + s * 6.2831),
      sin(uTime * 0.80 + base.z * 1.20 + s * 4.2000),
      sin(uTime * 0.70 + base.x * 1.60 + s * 2.1000)
    );

    vec3 toFocus = uFocus - base;
    float d = length(toFocus);
    vec3 dir = toFocus / max(d, 0.0005);
    float falloff = exp(-d * 0.85);

    vec3 attract = dir * (uStrength * 1.15) * falloff;

    vec3 p = base + drift + attract;

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    float size = uPointSize * (0.80 + h1 * 0.55) * (1.0 + falloff * 1.5);
    // Size attenuation
    gl_PointSize = size * (300.0 / max(1.0, -mvPosition.z));

    vec3 c1 = vec3(0.70, 0.55, 1.0);
    vec3 c2 = vec3(0.40, 0.85, 1.0);
    vColor = mix(c1, c2, h2);

    vAlpha = 0.45 + falloff * 0.55;
  }
`;

const FRAG = /* glsl */ `
  precision highp float;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    float r = length(uv);
    float a = smoothstep(0.50, 0.00, r);
    a *= vAlpha;

    // Soft glow edge
    a *= 0.85 + 0.15 * smoothstep(0.45, 0.00, r);

    gl_FragColor = vec4(vColor, a);
  }
`;

function makeGeometry(count: number): THREE.BufferGeometry {
  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count);

  // Random points in a sphere (with slight bias toward center)
  for (let i = 0; i < count; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);

    const r = Math.pow(Math.random(), 0.65) * 3.2;
    const sinPhi = Math.sin(phi);

    const x = r * sinPhi * Math.cos(theta);
    const y = r * sinPhi * Math.sin(theta);
    const z = r * Math.cos(phi);

    const idx = i * 3;
    positions[idx] = x;
    positions[idx + 1] = y;
    positions[idx + 2] = z;

    seeds[i] = Math.random();
  }

  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  g.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
  g.computeBoundingSphere();
  return g;
}

function makeMaterial(): THREE.ShaderMaterial {
  const m = new THREE.ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: FRAG,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uFocus: { value: new THREE.Vector3(0, 0, 0) },
      uStrength: { value: 0.4 },
      uPointSize: { value: 1.7 }
    }
  });

  return m;
}

export function ParticlesField({ focus, strength, paused }: Props) {
  const geometry = React.useMemo(() => makeGeometry(8000), []);
  const material = React.useMemo(() => makeMaterial(), []);

  React.useEffect(() => {
    (material.uniforms.uFocus.value as THREE.Vector3).set(focus[0], focus[1], focus[2]);
    material.uniforms.uStrength.value = strength;
  }, [focus, strength, material]);

  useFrame((_, delta) => {
    if (paused) return;
    material.uniforms.uTime.value += delta;
  });

  React.useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  return (
    <points geometry={geometry} material={material} frustumCulled>
      {/* No children */}
    </points>
  );
}
