import './App.css';
import DynamicCubes from './components/DynamicCubes';
import Ground from './components/Ground';
import Scene from './components/Scene';

function App() {
  return (
    <div className="App">
      <Scene bg-color="33BBFF">
        <DynamicCubes/>
        <Ground size={20}/>
      </Scene>
    </div>
  );
}

export default App;
