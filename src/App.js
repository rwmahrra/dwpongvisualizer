import logo from './logo.svg';
import './App.css';

import {Canvas} from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei';

import AIOpponent from './Models/AIOpponent.js'

function App() {
  return (
      <Canvas mode="concurrent">
        <OrbitControls></OrbitControls>
        <ambientLight intensity={0.3}></ambientLight>
        <spotLight position={[0,0,5]} angle={0.4} intensity={1.0} />
        <AIOpponent></AIOpponent>
      </Canvas>
  );
}

export default App;
