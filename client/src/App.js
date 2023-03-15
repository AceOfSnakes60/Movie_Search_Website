import './App.css';
import './components/Main.css'
import Main from "./components/Main";
import Header from './components/Header';
import Footer from './components/Footer';


function App() {
  return (
    <div className="App">
      <Header />
      <Footer />
      <Main/>
    </div>
  );
}

export default App;