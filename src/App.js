import logo from './logo.svg';
import './App.css';

import {Canvas} from '@react-three/fiber'
import { OrbitControls, Sky, Environment } from '@react-three/drei';

import AIOpponent from './Models/AIOpponent.js'

function App() {
  return (
      <Canvas mode="concurrent" camera={{position: [0,0,2.5]}}>
        <OrbitControls></OrbitControls>
        <ambientLight intensity={0.5}></ambientLight>
        <spotLight position={[0,0,5]} angle={0.4} intensity={1.0} />
        <AIOpponent></AIOpponent>
        <Sky />
      </Canvas>
  );
}

export default App;
