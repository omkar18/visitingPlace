import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import VisitingPlaces from "./Pages/VisitingPlacesList";
import FavouritePlacesList from "./Pages/FavouritePlaces";
import { Box } from "@mui/material";
function App() {
  return (
    <>
      <Router>
        <Header />
        <div style={{ margin: "1rem", padding: "1rem" }}>
          <Box sx={{ my: 8 }}>
            <Routes>
              <Route exact path="/" element={<VisitingPlaces />}></Route>
              <Route
                exact
                path="/favourite"
                element={<FavouritePlacesList />}
              ></Route>
            </Routes>
          </Box>
        </div>
      </Router>
    </>
  );
}

export default App;
