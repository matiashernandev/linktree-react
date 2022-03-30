import logo from "./logo.svg";
import "./App.css";
import {Link} from "react-router-dom"


function App() {
    return (
       
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    
                >
                    Learn React
                </a>

                <nav>
                    <Link to="/login">Login ?</Link>

                </nav>

               
            </header>
        </div>
      
    );
}

export default App;
