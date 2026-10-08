"use client";

import { Center, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Component, Suspense, useLayoutEffect, useMemo, useRef, type ReactNode } from "react";
import * as THREE from "three";
import { site } from "@/lib/site";
import { experienceRef } from "@/store/useExperienceStore";

const layers = [
  { y: 0.1, lift: 0.2, x: -0.02, rz: 0 },
  { y: 0.32, lift: 0.58, x: 0.1, rz: 0.04 },
  { y: 0.45, lift: 0.86, x: -0.12, rz: -0.12 },
  { y: 0.48, lift: 1.12, x: 0.08, rz: 0.14 },
  { y: 0.53, lift: 1.38, x: -0.05, rz: 0.03 },
  { y: 0.59, lift: 1.66, x: 0.12, rz: -0.08 },
  { y: 0.68, lift: 2.05, x: 0, rz: 0.02 },
];

function sculpt(
  geometry: THREE.BufferGeometry,
  shape: (x: number, y: number, z: number) => [number, number, number],
) {
  const position = geometry.attributes.position;
  const vector = new THREE.Vector3();
  for (let index = 0; index < position.count; index += 1) {
    vector.fromBufferAttribute(position, index);
    const [x, y, z] = shape(vector.x, vector.y, vector.z);
    position.setXYZ(index, x, y, z);
  }
  geometry.computeVertexNormals();
  geometry.computeBoundingBox();
  geometry.translate(0, -(geometry.boundingBox?.min.y ?? 0), 0);
  return geometry;
}

function paint(
  geometry: THREE.BufferGeometry,
  colorAt: (x: number, y: number, z: number) => [number, number, number],
) {
  const position = geometry.attributes.position;
  const colors = new Float32Array(position.count * 3);
  const vector = new THREE.Vector3();
  for (let index = 0; index < position.count; index += 1) {
    vector.fromBufferAttribute(position, index);
    const [r, g, b] = colorAt(vector.x, vector.y, vector.z);
    colors[index * 3] = r;
    colors[index * 3 + 1] = g;
    colors[index * 3 + 2] = b;
  }
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  return geometry;
}

function Pedestal() {
  return (
    <group>
      <mesh position={[0, -0.48, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.62, 0.78, 0.78, 48]} />
        <meshStandardMaterial color="#1a1612" roughness={0.62} metalness={0.22} />
      </mesh>
      <mesh position={[0, -0.08, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.18, 1.22, 0.12, 64]} />
        <meshStandardMaterial color="#241c16" roughness={0.48} metalness={0.28} />
      </mesh>
      <mesh position={[0, -0.01, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.92, 0.012, 12, 64]} />
        <meshStandardMaterial color={site.colors.gold} roughness={0.28} metalness={0.86} />
      </mesh>
    </group>
  );
}

function Sesame() {
  const seeds = useMemo(
    () =>
      Array.from({ length: 26 }, (_, index) => {
        const angle = index * 2.399;
        const radius = 0.06 + (index % 8) * 0.07;
        const crown = Math.sqrt(Math.max(0.04, 0.5 - radius * radius));
        return {
          position: [Math.cos(angle) * radius, crown * 0.62 + 0.08, Math.sin(angle) * radius] as [
            number,
            number,
            number,
          ],
          rotation: [0.4, angle, 1.1] as [number, number, number],
        };
      }),
    [],
  );

  return seeds.map((seed) => (
    <mesh key={seed.position.join("-")} position={seed.position} rotation={seed.rotation} castShadow scale={[1.6, 0.45, 0.7]}>
      <sphereGeometry args={[0.028, 10, 8]} />
      <meshStandardMaterial color="#f3e2c4" roughness={0.72} />
    </mesh>
  ));
}

function useFoodGeometries() {
  return useMemo(() => {
    const bottomBun = sculpt(new THREE.SphereGeometry(0.7, 64, 40), (x, y, z) => {
      const n = Math.sin(x * 10 + z * 7) * 0.01;
      const dome = y > 0 ? y * 0.42 + n : y * 0.16;
      return [x * 1.02, dome, z * 1.02];
    });
    paint(bottomBun, (x, y) => {
      const toast = THREE.MathUtils.clamp(y / 0.28, 0, 1);
      return [0.72 - toast * 0.12, 0.46 - toast * 0.08, 0.26];
    });

    const patty = sculpt(new THREE.CylinderGeometry(0.58, 0.6, 0.13, 72, 5), (x, y, z) => {
      const theta = Math.atan2(z, x);
      const wobble = 1 + Math.sin(theta * 5) * 0.04 + Math.sin(theta * 11) * 0.015;
      const grill = Math.abs(Math.sin(x * 26)) * 0.01;
      return [x * wobble, y - grill, z * wobble];
    });
    paint(patty, (x, y, z) => {
      const edge = Math.min(1, Math.hypot(x, z) / 0.58);
      const char = edge * edge;
      const stripe = Math.abs(Math.sin(x * 26)) * 0.08;
      return [0.28 - char * 0.14 - stripe, 0.12 - char * 0.06, 0.07];
    });

    const onion = new THREE.TorusGeometry(0.36, 0.045, 12, 48);
    onion.rotateX(Math.PI / 2);
    sculpt(onion, (x, y, z) => {
      const wave = Math.sin(Math.atan2(z, x) * 6) * 0.025;
      return [x, y * 0.45 + wave, z];
    });
    paint(onion, () => [0.9, 0.82, 0.68]);

    const cheese = sculpt(new THREE.BoxGeometry(1.12, 0.04, 1.08, 18, 1, 18), (x, y, z) => {
      const radius = Math.hypot(x, z);
      const droop = Math.max(0, radius - 0.46) * 0.28;
      const fold = Math.sin(x * 7) * Math.cos(z * 5) * 0.006;
      return [x, y - droop + fold, z];
    });
    paint(cheese, (x, z) => {
      const edge = Math.min(1, Math.hypot(x, z) / 0.7);
      return [0.92 - edge * 0.08, 0.62 - edge * 0.12, 0.16];
    });

    const tomato = sculpt(new THREE.CylinderGeometry(0.5, 0.5, 0.055, 48, 2), (x, y, z) => {
      const theta = Math.atan2(z, x);
      const wobble = 1 + Math.sin(theta * 4) * 0.03;
      return [x * wobble, y, z * wobble];
    });
    paint(tomato, (x, z) => {
      const seed = Math.abs(Math.sin(x * 30) * Math.cos(z * 28));
      return [0.62 + seed * 0.08, 0.16, 0.12];
    });

    const lettuce = new THREE.CircleGeometry(0.72, 72);
    const lettucePosition = lettuce.attributes.position;
    const lettuceVector = new THREE.Vector3();
    for (let index = 0; index < lettucePosition.count; index += 1) {
      lettuceVector.fromBufferAttribute(lettucePosition, index);
      const radius = Math.hypot(lettuceVector.x, lettuceVector.y) || 0.001;
      const theta = Math.atan2(lettuceVector.y, lettuceVector.x);
      const ruffle = Math.sin(theta * 8) * 0.055 * Math.min(1, radius / 0.32);
      const curl = Math.max(0, radius - 0.46) * 0.42;
      lettucePosition.setXYZ(
        index,
        lettuceVector.x + Math.cos(theta) * ruffle * 0.15,
        lettuceVector.y + Math.sin(theta) * ruffle * 0.15,
        ruffle * 0.85 + curl,
      );
    }
    lettuce.rotateX(-Math.PI / 2);
    lettuce.computeVertexNormals();
    lettuce.computeBoundingBox();
    lettuce.translate(0, -(lettuce.boundingBox?.min.y ?? 0), 0);
    paint(lettuce, (x, _y, z) => {
      const vein = Math.abs(Math.sin(x * 14 + z * 8));
      return [0.28 + vein * 0.05, 0.48 + vein * 0.08, 0.2];
    });

    const topBun = sculpt(new THREE.SphereGeometry(0.74, 80, 56), (x, y, z) => {
      const n = Math.sin(x * 12) * Math.cos(z * 10) * 0.012 + Math.sin(x * 28 + z * 21) * 0.005;
      const flat = y < 0.04 ? y * 0.08 : y * 0.9 + n;
      return [x * (1 + n), flat, z * (1 + n)];
    });
    paint(topBun, (x, y, z) => {
      const height = y / 0.75;
      const crust = THREE.MathUtils.clamp(1 - height, 0, 1);
      const speck = Math.abs(Math.sin(x * 46 + z * 31));
      return [0.82 - crust * 0.36 + speck * 0.03, 0.55 - crust * 0.28, 0.3 - crust * 0.16];
    });

    return { bottomBun, patty, onion, cheese, tomato, lettuce, topBun };
  }, []);
}

function ProceduralAssembly() {
  const groups = useRef<Array<THREE.Group | null>>([]);
  const exploded = useRef(0);
  const food = useFoodGeometries();

  useFrame((_, delta) => {
    const target = THREE.MathUtils.smoothstep(experienceRef.storyProgress, 0.4, 0.96);
    exploded.current = THREE.MathUtils.damp(exploded.current, target, 3.1, delta);

    groups.current.forEach((group, index) => {
      if (!group) return;
      const spec = layers[index];
      const y = THREE.MathUtils.lerp(spec.y, spec.y + spec.lift, exploded.current);
      const x = THREE.MathUtils.lerp(0, spec.x, exploded.current);
      const rz = THREE.MathUtils.lerp(0, spec.rz, exploded.current);
      group.position.y = THREE.MathUtils.damp(group.position.y, y, 4, delta);
      group.position.x = THREE.MathUtils.damp(group.position.x, x, 4, delta);
      group.rotation.z = THREE.MathUtils.damp(group.rotation.z, rz, 4, delta);
    });
  });

  return (
    <group>
      <Pedestal />
      <group position={[0, 0.02, 0]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[1.32, 1.32, 0.06, 64]} />
          <meshPhysicalMaterial
            color="#f7f2ea"
            roughness={0.28}
            metalness={0.04}
            clearcoat={0.5}
            clearcoatRoughness={0.28}
          />
        </mesh>
        <mesh position={[0, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.24, 0.045, 16, 64]} />
          <meshStandardMaterial color="#efe6da" roughness={0.32} metalness={0.12} />
        </mesh>
        <mesh position={[0.62, 0.045, 0.12]} rotation={[-Math.PI / 2, 0, 0.5]}>
          <circleGeometry args={[0.2, 24]} />
          <meshStandardMaterial color="#6d2418" roughness={0.32} metalness={0.08} />
        </mesh>
      </group>

      <group ref={(node) => { groups.current[0] = node; }} position={[0, layers[0].y, 0]}>
        <mesh geometry={food.bottomBun} castShadow receiveShadow>
          <meshStandardMaterial vertexColors roughness={0.86} />
        </mesh>
      </group>

      <group ref={(node) => { groups.current[1] = node; }} position={[0, layers[1].y, 0]}>
        <mesh geometry={food.patty} castShadow receiveShadow>
          <meshStandardMaterial vertexColors roughness={0.9} />
        </mesh>
      </group>

      <group ref={(node) => { groups.current[2] = node; }} position={[0, layers[2].y, 0]}>
        <mesh geometry={food.onion} castShadow>
          <meshStandardMaterial vertexColors roughness={0.62} />
        </mesh>
      </group>

      <group ref={(node) => { groups.current[3] = node; }} position={[0, layers[3].y, 0]}>
        <mesh geometry={food.cheese} castShadow>
          <meshStandardMaterial vertexColors roughness={0.42} metalness={0.04} />
        </mesh>
      </group>

      <group ref={(node) => { groups.current[4] = node; }} position={[0, layers[4].y, 0]}>
        <mesh geometry={food.tomato} castShadow>
          <meshStandardMaterial vertexColors roughness={0.38} />
        </mesh>
      </group>

      <group ref={(node) => { groups.current[5] = node; }} position={[0, layers[5].y, 0]}>
        <mesh geometry={food.lettuce} castShadow>
          <meshStandardMaterial vertexColors roughness={0.74} side={THREE.DoubleSide} />
        </mesh>
      </group>

      <group ref={(node) => { groups.current[6] = node; }} position={[0, layers[6].y, 0]}>
        <mesh geometry={food.topBun} castShadow receiveShadow>
          <meshStandardMaterial vertexColors roughness={0.8} />
        </mesh>
        <Sesame />
      </group>
    </group>
  );
}

function GlbModel({ path }: { path: string }) {
  const { scene } = useGLTF(path, true);
  const clone = useMemo(() => scene.clone(true), [scene]);

  useLayoutEffect(() => {
    clone.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
  }, [clone]);

  return (
    <Center>
      <primitive object={clone} scale={site.modelScale} rotation={site.modelRotation} />
    </Center>
  );
}

type BoundaryProps = { children: ReactNode };
type BoundaryState = { failed: boolean };

class ModelBoundary extends Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { failed: false };

  static getDerivedStateFromError(): BoundaryState {
    return { failed: true };
  }

  render() {
    if (this.state.failed) return <ProceduralAssembly />;
    return this.props.children;
  }
}

export function HeroDish() {
  const anchor = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const yaw = useRef(0.4);

  useFrame((_, delta) => {
    if (anchor.current) {
      const x = experienceRef.isMobile ? 0 : 1.2;
      anchor.current.position.x = THREE.MathUtils.damp(anchor.current.position.x, x, 3, delta);
    }
    if (!spin.current) return;
    if (!experienceRef.reducedMotion) yaw.current += delta * 0.08;
    const influence = experienceRef.reducedMotion ? 0 : 1 - Math.min(experienceRef.storyProgress * 1.5, 1);
    const tiltX = experienceRef.pointerY * -0.16 * influence;
    const tiltY = yaw.current + experienceRef.pointerX * 0.38 * influence;
    spin.current.rotation.x = THREE.MathUtils.damp(spin.current.rotation.x, tiltX, 4, delta);
    spin.current.rotation.y = THREE.MathUtils.damp(spin.current.rotation.y, tiltY, 4, delta);
  });

  return (
    <group ref={anchor} position={[1.2, -0.42, 0]}>
      <group ref={spin} scale={0.92}>
        {site.modelPath ? (
          <ModelBoundary>
            <Suspense fallback={<ProceduralAssembly />}>
              <GlbModel path={site.modelPath} />
            </Suspense>
          </ModelBoundary>
        ) : (
          <ProceduralAssembly />
        )}
      </group>
    </group>
  );
}
