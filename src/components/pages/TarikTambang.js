import React, { useState } from "react"
// import {Link} from "react-router-dom"

function TarikTambang() {
  const [configParams, setConfigParams] = useState({
    live_event_slug: "",
    width: 400,
    chat_box_bg: "FFFFFF",
    chat_text_color: "000000"
  })
  function handleConfigParamsChanges(e) {
    const { name, value } = e.target
    setConfigParams(configParams => ({...configParams, [name]: value}))
  }

  const [pluginLink, setPluginLink] = useState("")

  function generatePluginLink() {
    var generatedLink = new URL(`${window.location.origin}/gp_plugins/tarik_tambang`)
    generatedLink.search = new URLSearchParams(configParams).toString()
    setPluginLink(generatedLink)
  }

  return (
    <div style={{
      backgroundColor: "#8ad3ed",
      height: "2000px"
    }}>
      <div className="container p-2 border rounded bg-light">
        <div className="bd-pink-400 text-white border rounded mb-2">
          <h1 className="text-center">Welcome To Goplay Plugins Glosary</h1>
        </div>

        <div>
          <h1>Config - Tarik Tambang</h1>
        </div>

        <div className="row">
          <div className="col-6">
            <div className="form-control">
              <div class="form-group mb-3">
                <label for="exampleInputEmail1">Live event slug</label>
                <input type="text" class="form-control" placeholder="pagi-ceria-di-goplay" name="live_event_slug" onChange={(e) => handleConfigParamsChanges(e)} />
                <small class="form-text text-muted">Eg: https://goplay.co.id/live/<b>pagi-ceria-di-goplay</b>. Live event slug can be found on your goplay url</small>
              </div>
              <hr className="my-2" />
              <div class="form-group d-grid gap-2">
                <button className="btn btn-success" onClick={() => generatePluginLink()}>Generate Plugin Link</button>
              </div>
              <div class="form-group">
                <input type="text" class="form-control" value={pluginLink} readOnly />
              </div>
            </div>
          </div>
          <div className="col-6">

          </div>
        </div>
      </div>
    </div>
  )
}

export default TarikTambang
