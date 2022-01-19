import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

import PageHome from "./components/pages/Home"
import PageLogin from "./components/pages/Login"

import PageConfigSimpleChat from "./components/pages/SimpleChat"
import PageConfigTarikTambang from "./components/pages/TarikTambang"
import PageConfigGiftBinggo from "./components/pages/GiftBinggo"

import GpPlSimpleChat from "./components/gp_plugins/SimpleChat"
import GpPlTarikTambang from "./components/gp_plugins/TarikTambang"
import GpPlVoiceBot from "./components/gp_plugins/VoiceBot"
import GpPlGiftBinggo from "./components/gp_plugins/GiftBinggo"

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={PageHome} />
        <Route path="/login" exact component={PageLogin} />

        <Route path="/configs/simple_chat" exact component={PageConfigSimpleChat} />
        <Route path="/configs/tarik_tambang" exact component={PageConfigTarikTambang} />
        <Route path="/configs/gift_binggo" exact component={PageConfigGiftBinggo} />

        <Route path="/gp_plugins/simple_chat" exact component={GpPlSimpleChat} />
        <Route path="/gp_plugins/tarik_tambang" exact component={GpPlTarikTambang} />
        <Route path="/gp_plugins/voice_bot" exact component={GpPlVoiceBot} />
        <Route path="/gp_plugins/gift_binggo" exact component={GpPlGiftBinggo} />
      </Switch>
    </Router>
  )
}

export default App
