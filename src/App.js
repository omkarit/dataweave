import "./App.css";
import Dashboard from "./components/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Update from "./Actions/Update";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/update" element={<Update />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
