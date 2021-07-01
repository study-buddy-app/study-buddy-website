import routes from './routes'
import './App.css';
import Header from './components/header/Header'
import Footer from './components/footer/Footer'



function App() {
  return (
    <div className="app">
      <Header/>
      {routes}
      <Footer />

    </div>
  );
}

export default App;
