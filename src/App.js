import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

import PageHome from "./components/pages/Home"

import GpPlTarikTambang from "./components/gp_plugins/TarikTambang"
import GpPlSimpleChat from "./components/gp_plugins/SimpleChat"

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={PageHome} />

        <Route path="/gp_plugins/tarik_tambang" exact component={GpPlTarikTambang} />
        <Route path="/gp_plugins/simple_chat" exact component={GpPlSimpleChat} />
      </Switch>
    </Router>
  )
}

export default App
