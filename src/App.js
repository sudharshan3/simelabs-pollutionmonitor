import logo from "./logo.svg";
import "./App.css";
import ElevateAppBar from "./components/AppBar";
import { Container } from "@mui/material";
import LocationSelector from "./Pages/LocationSelector";

function App() {
  return (
    <div className="App">
      <ElevateAppBar />
      <Container sx={{marginTop:'2rem'}}>
        <LocationSelector/>
      </Container>
    </div>
  );
}

export default App;
