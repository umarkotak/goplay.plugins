import React from "react"
import {Link} from "react-router-dom"

function Home() {
  return (
    <div>
      <div className="container">
        <div className="bd-pink-400 text-white border rounded">
          <h1 className="text-center">Welcome To Goplay Plugins Glosary</h1>
        </div>

        <div className="row">
          <div className="col-12 col-lg-4">
            <PluginCard params={{
              title: "Simple Chat",
              description: "Showing chat",
              image_link: "https://placekitten.com/500/400",
              use_link: "/gp_plugins/simple_chat"
            }} />
          </div>
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
                className="img-fluid"
              />
            </div>
            <div className="col-6 ps-0">
              <div className="px-1">
                <div>
                  <h3>{props.params.title}</h3>
                  <p>{props.params.description}</p>
                </div>
                <Link to={props.params.use_link} className="btn btn-block bd-pink-400 d-grid gap-2 text-white">Use</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
