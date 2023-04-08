import './App.css';
import DynamicCubes from './components/DynamicCubes';
import Ground from './components/Ground';
import Scene from './components/Scene';
import ToolsMenu from './components/ToolsMenu/ToolsMenu';

function App() {
  return (
    <div className="App">
      <Scene bg-color="33BBFF">
        <ToolsMenu/>
        <DynamicCubes/>
        <Ground size={20}/>
      </Scene>
    </div>
  );
}

export default App;
