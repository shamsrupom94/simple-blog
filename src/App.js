import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import BlogDetails from "./pages/BlogDetails";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/create">
            <CreatePost />
          </Route>
          <Route exact path="/blog/:id">
            <BlogDetails />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
