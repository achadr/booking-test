import "./App.css";
import { Grid } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Availabilites from "./pages/Availabilities";
import Bookings from "./pages/Bookings";
import NavBar from "./components/NavBar"

function App() {
  return (
    <Router>
      <NavBar/>
      <Switch>
        <Route path="/availabilities">
          <Grid container>
            <Availabilites />
          </Grid>
        </Route>
        <Route path="/bookings">
          <Grid container>
            <Bookings />
          </Grid>
        </Route>
        <Redirect to="/availabilities" />
      </Switch>
    </Router>
  );
}

export default App;
