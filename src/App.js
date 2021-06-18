import routes from './routes'
import './App.css';
import Header from './components/header/Header'


function App() {
  return (
    <div className="app">
      <Header/>
      {routes}
    
    </div>
  );
}

export default App;
