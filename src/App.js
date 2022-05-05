import logo from "./logo.svg";
import "./App.css";
import {Link} from "react-router-dom"


function App() {
    return (
       
        <div className="App">
            <header className="App-header">
               <h2>sarasa</h2>

                <nav>
                    <Link to="/login">Login ?</Link>

                </nav>

               
            </header>
        </div>
      
    );
}

export default App;
