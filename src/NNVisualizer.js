import * as THREE from 'three'
import React, { useRef, useEffect, useState, useMemo } from "react";
import { useGLTF, Float } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

import { arg_heapsort, is_significant } from "./Utils/heap";
import { getMaxListeners } from "process";

const mqtt = require('mqtt')
const client = mqtt.connect(process.env.REACT_APP_URL)
client.on('connect', function () {
  client.subscribe('ai/activation', function (err) {
    if (!err) {
      console.log("ai activation")
    }
  })
});


function Neurons (props) {

  let current_activations = null
  let new_activations = false
  let current_action = [0,0,0]



  const action_left = useRef()
  const neuron_refs = useMemo(() => Array(200).fill(0).map(i=> React.createRef()), []);


  useEffect(() => {
    client.on('message', function (topic, messsage) {
      const data = JSON.parse(messsage.toString())
      switch(topic) {
        case "ai/activation":
          current_activations = data[1]
          // console.log(current_activations)
          new_activations = true
          // console.log(data[2]) // use this to adjust action intensity
          break;
      }
    })
  })

  useFrame(() => {
    if(new_activations) {
      neuron_refs.map((neuron, idx) => {
        console.log(neuron.current.material.color)
        neuron.current.material.color = new THREE.Color(props.colors[idx].map(col => col ))
      })
      new_activations = false
    }
  })

  const { viewport, camera } = useThree()
  const { nodes } = useGLTF('/Neuron.glb')
  const [geometry] = useState(() => nodes['Neuron'].geometry)
  const bounds =  viewport.getCurrentViewport(camera, [0, 0, 0])

  const position = useMemo(() => {
    const z = Math.random() * -30
    const bounds = viewport.getCurrentViewport(camera, [0, 0, z])
    return [THREE.MathUtils.randFloatSpread(bounds.width), THREE.MathUtils.randFloatSpread(bounds.height * 0.75), z]
  }, [viewport])

  return <group>
  {Array.from({ length: 200}, (_, i) => 
    <Float key={i} position={[THREE.MathUtils.randFloatSpread(bounds.width), THREE.MathUtils.randFloatSpread(bounds.height * 0.75), Math.random() * -30]} rotationIntensity={5} floatIntensity={10} dispose={null}>
      <mesh scale={1} geometry={geometry} ref={neuron_refs[i]}>
      <meshStandardMaterial color={props.colors[i]} transparent/>
      </mesh>
    </Float>
  )}
</group>
  
}

// function ActionNeuron(props) {
//   const { nodes } = useGLTF('/Neuron.glb')
//   const [geometry] = useState(() => nodes['Neuron'].geometry)
//   return (
//     <Float position={props.position} rotationIntensity={5} floatIntensity={2} dispose={null}>
//       <mesh scale={props.scale} geometry={geometry} ref={props.ref}>
//         <meshStandardMaterial color="red" transparent/>
//         </mesh>
//     </Float>
//   )
// }

export default function NNVisualizer (props) {
  let [colors, setColors] = useState([])

  let structure = null

  // console.log(structure)

  let output_weights = null
  let output_biases = null

  let significant_ow = null;

  /**
   * We are retrieving the predefined model weights from the public url as trying to use them through webpack made it spew mad chunks bruh
   */
  const getNN=()=>{
    fetch('medium.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        console.log(response)
        return response.json();
      })
      .then(function(model) {
        structure = model.medium_model

        // hidden_weights = structure[0];
        // hidden_biases = structure[1];
        output_weights = structure[2];
        output_biases = structure[3];

        // Save the "significant" weights: we only render the 2% most important hidden weights and
        // the 30% most important output weights so the screen doesn't get crowded
        // significant_hw = is_significant(hidden_weights, 0.02); // might not even use this
        significant_ow = is_significant(output_weights, 0.3)

        // console.log(significant_hw)
        console.log(significant_ow)
        setColors(significant_ow)

      });
  }


  useEffect(() => {
    getNN()
  },[])

  

  return <Neurons colors={colors}/>
}