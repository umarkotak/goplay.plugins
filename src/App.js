import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

import PageHome from "./components/pages/Home"

import PageConfigSimpleChat from "./components/pages/SimpleChat"

import GpPlSimpleChat from "./components/gp_plugins/SimpleChat"
import GpPlTarikTambang from "./components/gp_plugins/TarikTambang"

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={PageHome} />

        <Route path="/configs/simple_chat" exact component={PageConfigSimpleChat} />

        <Route path="/gp_plugins/simple_chat" exact component={GpPlSimpleChat} />
        <Route path="/gp_plugins/tarik_tambang" exact component={GpPlTarikTambang} />
      </Switch>
    </Router>
  )
}

export default App
