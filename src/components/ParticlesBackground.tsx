import React from 'react';
import { Canvas } from '@react-three/fiber';

import { useScene } from '../app/scene/SceneContext';
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion';
import { isWebGLAvailable } from '../lib/webgl';
import { ParticlesField } from './ParticlesField';

export function ParticlesBackground() {
  const reduced = usePrefersReducedMotion();
  const { focus, strength } = useScene();

  const [webgl, setWebgl] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    setWebgl(isWebGLAvailable());
  }, []);

  // During hydration, assume WebGL is available; swap once we know.
  const canRender = webgl !== false;

  return (
    <div aria-hidden className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08),rgba(255,255,255,0)_55%),radial-gradient(ellipse_at_bottom,rgba(130,87,229,0.18),rgba(0,0,0,0)_60%)]" />

      {canRender ? (
        <Canvas
          frameloop={reduced ? 'demand' : 'always'}
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          camera={{ position: [0, 0, 6], fov: 60, near: 0.1, far: 50 }}
          style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
        >
          <ParticlesField focus={focus} strength={strength} paused={reduced} />
        </Canvas>
      ) : null}

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
      <div className="absolute inset-0 [mask-image:radial-gradient(circle_at_center,black_55%,transparent_80%)] bg-black/50" />
    </div>
  );
}
