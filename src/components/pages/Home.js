import React from "react"
import {Link} from "react-router-dom"

function Home() {

  var pluginList = [
    {
      id: 1,
      title: "Simple Chat",
      description: "Showing goplay live chat",
      image_link: "/images/thumbs_simple_chat.png",
      use_link: "/configs/simple_chat"
    },
    {
      id: 2,
      title: "Tarik Tambang",
      description: "Showing tarik tambang games. game played by sending virtual gifts",
      image_link: "/images/thumbs_tarik_tambang.png",
      use_link: "/configs/tarik_tambang"
    },
    {
      id: 3,
      title: "Voice thanks",
      description: "Speaking thankyou when the audience sent you gifts",
      image_link: "/images/thumbs_tarik_tambang.png",
      use_link: "/configs/voice_bot"
    },
    {
      id: 4,
      title: "Gift binggo",
      description: "Playing a binggo games using virtual gifts",
      image_link: "/images/thumbs_tarik_tambang.png",
      use_link: "/configs/gift_binggo"
    },
  ]

  return (
    <div style={{
      backgroundColor: "#8ad3ed",
      height: "2000px"
    }}>
      <div className="container p-2 border rounded bg-light">
        <div className="bd-pink-400 text-white border rounded mb-2">
          <h1 className="text-center">Welcome To Goplay Plugins Glosary</h1>
        </div>

        <div className="row mb-2">
          <div className="col-12">
            <Link to="#" className="btn btn-sm btn-success btn-block d-grid gap-2">How To Use</Link>
          </div>
        </div>

        <div className="row">
          {pluginList.map(((selectedPlugin, index) => (
            <div className="col-12 col-lg-3" key={selectedPlugin.id} id={index}>
              <PluginCard params={selectedPlugin} />
            </div>
          )))}
        </div>
      </div>
    </div>
  )

  function PluginCard(props) {
    return(
      <div>
        <div className="shadow-sm border rounded mt-2">
          <div class="card">
            <img
              style={{
                height: "200px",
                width: "100%"
              }}
              src={props.params.image_link}
              className="img-fluid border rounded p-2"
              alt="thumbs"
            />
            <div class="card-body">
              <h5 class="card-title">{props.params.title}</h5>
              <p class="card-text">{props.params.description}</p>
              <Link to={props.params.use_link} className="btn bd-pink-400 d-grid gap-2 text-white">Use</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
