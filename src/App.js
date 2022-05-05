import './App.css';
import Header from './Header';
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from './Checkout';

function App() {
  return (
    <div className="App">
      <Router>
        <Route>
          <Route path='/checkout'>
            <Header />
            <Checkout />
          </Route>
          <Route path='/'>
            <Header />
            <Home />
          </Route>
        </Route>
      </Router>



    </div>
  );
}

export default App;
