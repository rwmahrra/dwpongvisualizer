import logo from './logo.svg';
import './App.css';

import {Canvas} from '@react-three/fiber'
import {AIOpponent} from './Models/AIOpponent'

function App() {
  return (
    <div id="canvas-container">
      <Canvas>
        <ambientLight intensity={0.1} />
        <directionalLight color="red" position={[0, 0, 5]} />
        <AIOpponent />
      </Canvas>
    </div>
  );
}

export default App;
