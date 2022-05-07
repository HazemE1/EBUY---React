import './App.css';
import Header from './Header';
import Home from "./Home";
import User from "./user"

import Checkout from './Checkout';

const user = new User()

function App() {
  return (
    <div className="App">
      <Header test={user}/>
      <Home />
      
    </div>
  );
}

export default App;
