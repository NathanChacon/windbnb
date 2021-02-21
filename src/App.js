import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import utils from './styles/utils.css'
import colors from './styles/colors.css'
import Home from './views/Home/Home'
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
              <Home />
        </Route>
      </Switch>
    </Router>

  );
}

export default App;
