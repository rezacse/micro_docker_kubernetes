import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import FibCalculator from "./FibCalculator";
import Home from "./Home";

function App() {
  return (
    <div className="App">
      <header
        style={{
          backgroundColor: "#FFF",
          padding: "10px",
          marginBottom: "25px",
          color: "#000 !important",
        }}
      >
        <p>Fib Calculator</p>
        <Link to="/">Home</Link>
        <br />
        <Link to="/fib-cal">Fib Calculator</Link>
      </header>

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fib-cal" element={<FibCalculator />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
