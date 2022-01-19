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
          <div className="col-2">
            <div className="p-1">
              <Link to="#" className="btn btn-sm btn-success d-grid gap-2">How To Use</Link>
            </div>
          </div>
        </div>

        <div className="row">
          {pluginList.map(((selectedPlugin, index) => (
            <div className="col-12 col-lg-4" key={selectedPlugin.id} id={index}>
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
        <div className="border rounded">
          <div className="row">
            <div className="col-6 pe-0">
              <img
                style={{
                  height: "200px",
                  width: "100%"
                }}
                src={props.params.image_link}
                className="img-fluid border rounded"
                alt="thumbs"
              />
            </div>
            <div className="col-6 ps-0">
              <div className="px-1">
                <div>
                  <h3>{props.params.title}</h3>
                  <p>{props.params.description}</p>
                </div>
                <Link to={props.params.use_link} className="btn bd-pink-400 d-grid gap-2 text-white">Use</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
