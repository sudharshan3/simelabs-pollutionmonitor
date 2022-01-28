import logo from "./logo.svg";
import "./App.css";
import LocationSelector from "./Pages/LocationSelector";
import {
  HashRouter as Router,
  Navigate,
  Routes,
  Switch,
  Route,
} from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route exact path="/home" element={<LocationSelector />} />
      </Routes>
    </Router>
  );
}

export default App;
