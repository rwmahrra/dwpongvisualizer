/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function AIOpponent(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/AIOpponent.glb");
  return (
    <group ref={group} {...props} dispose={null}>
      <group scale={[1.07, 1.07, 1]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
          material={nodes.Cube001.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_1.geometry}
          material={materials.Backing}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Backing001.geometry}
          material={nodes.Backing001.material}
          position={[0, 0, -0.02]}
          rotation={[0, 0, -Math.PI / 4]}
          scale={[0.94, 0.94, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Backing002.geometry}
          material={nodes.Backing002.material}
          position={[0, 0, -0.02]}
          rotation={[0, 0, -2.36]}
          scale={[0.94, 0.94, 1]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Hour_Hand.geometry}
          material={nodes.Hour_Hand.material}
          rotation={[0, 0, 0.6]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mintue_Hand.geometry}
          material={nodes.Mintue_Hand.material}
          rotation={[0, 0, -0.48]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Times.geometry}
          material={nodes.Times.material}
        />
      </group>
      <mesh
        name="Face"
        castShadow
        receiveShadow
        geometry={nodes.Face.geometry}
        material={nodes.Face.material}
        morphTargetDictionary={nodes.Face.morphTargetDictionary}
        morphTargetInfluences={nodes.Face.morphTargetInfluences}
      />
    </group>
  );
}

useGLTF.preload("/AIOpponent.glb");
