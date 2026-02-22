/* eslint-disable react/no-unknown-property */
import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const SEGMENT_COUNT = 18;
const BUFFER_SIZE = 300;
const SPACING = 6;
const SPEED = 2.5;
const HEAD_RADIUS = 0.07;
const TAIL_RADIUS = 0.025;

export default function WanderingSnake() {
  const { viewport } = useThree();
  const segmentRefs = useRef([]);

  const shared = useMemo(() => ({
    geometry: new THREE.SphereGeometry(1, 8, 6),
    material: new THREE.MeshBasicMaterial({ color: 0xe8e8e8 }),
  }), []);

  const scales = useMemo(() =>
    Array.from({ length: SEGMENT_COUNT }, (_, i) => {
      const t = i / (SEGMENT_COUNT - 1);
      return HEAD_RADIUS + (TAIL_RADIUS - HEAD_RADIUS) * t;
    }),
  []);

  const state = useRef(null);

  function getState() {
    if (!state.current) {
      state.current = {
        x: 0,
        y: 0,
        angle: Math.random() * Math.PI * 2,
        time: Math.random() * 100,
        buf: new Float32Array(BUFFER_SIZE * 2),
        idx: 0,
        ready: false,
      };
    }
    return state.current;
  }

  useFrame((_, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    const s = getState();
    const hw = viewport.width * 0.45;
    const hh = viewport.height * 0.45;

    if (!s.ready) {
      s.x = (Math.random() - 0.5) * viewport.width * 0.5;
      s.y = (Math.random() - 0.5) * viewport.height * 0.5;
      for (let i = 0; i < BUFFER_SIZE; i++) {
        s.buf[i * 2] = s.x;
        s.buf[i * 2 + 1] = s.y;
      }
      s.ready = true;
    }

    s.time += dt;

    // Organic steering via layered sinusoids
    const steer =
      Math.sin(s.time * 1.3) * 0.8 +
      Math.sin(s.time * 0.7 + 2.0) * 0.5 +
      Math.sin(s.time * 2.1 + 5.0) * 0.3;
    s.angle += steer * dt;

    // Boundary repulsion
    const margin = 1.2;
    let fx = 0, fy = 0;
    const rep = 5.0;
    if (s.x > hw - margin) fx -= rep * (s.x - hw + margin) / margin;
    if (s.x < -hw + margin) fx += rep * (-hw + margin - s.x) / margin;
    if (s.y > hh - margin) fy -= rep * (s.y - hh + margin) / margin;
    if (s.y < -hh + margin) fy += rep * (-hh + margin - s.y) / margin;

    const hx = Math.cos(s.angle);
    const hy = Math.sin(s.angle);
    s.angle += (hx * fy - hy * fx) * dt;

    // Move head
    s.x += Math.cos(s.angle) * SPEED * dt;
    s.y += Math.sin(s.angle) * SPEED * dt;

    // Hard clamp as safety net
    s.x = Math.max(-hw, Math.min(hw, s.x));
    s.y = Math.max(-hh, Math.min(hh, s.y));

    // Write to ring buffer
    s.buf[s.idx * 2] = s.x;
    s.buf[s.idx * 2 + 1] = s.y;
    s.idx = (s.idx + 1) % BUFFER_SIZE;

    // Update segment positions from ring buffer
    for (let i = 0; i < SEGMENT_COUNT; i++) {
      const ref = segmentRefs.current[i];
      if (!ref) continue;
      const offset = i * SPACING;
      const bi = ((s.idx - 1 - offset) % BUFFER_SIZE + BUFFER_SIZE) % BUFFER_SIZE;
      ref.position.x = s.buf[bi * 2];
      ref.position.y = s.buf[bi * 2 + 1];
      ref.scale.setScalar(scales[i]);
    }
  });

  return (
    <group position={[0, 0, 0.05]}>
      {scales.map((_, i) => (
        <mesh
          key={i}
          ref={el => { segmentRefs.current[i] = el; }}
          geometry={shared.geometry}
          material={shared.material}
        />
      ))}
    </group>
  );
}
