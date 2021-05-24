import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Admin from "./Components/Admin";
import { auth } from "./firebase";
import Home from "./Components/Home";

function App() {
  const [firebaseUser, setFirebaseUser] = React.useState(false);

  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setFirebaseUser(user);
      } else {
 setFirebaseUser(null);
      }
    });
  }, []);
  return firebaseUser !== false ? (
    <Router>
      <Navbar firebaseUser={firebaseUser} />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
      </Switch>
    </Router>
  ) : (
    <p>...</p>
  );
}

export default App;
