import React, { useState, useEffect } from "react"
import {Link} from "react-router-dom"
import Select from 'react-select'

import GoplayApi from "../services/GoplayApi"

function TarikTambang() {
  const [configParams, setConfigParams] = useState({
    env: "production",
    live_event_slug: "",
    width: 1200,
    left_side_label: "Red Team",
    left_side_gift_list: "",
    right_side_label: "Blue Team",
    right_side_gift_list: "",
    start_time: new Date(),
    end_time: new Date(),
    winning_condition: "last_leading",
    winning_threshold: 0,
  })
  const[left_side_gift_list, set_left_side_gift_list] = useState([])
  const[right_side_gift_list, set_right_side_gift_list] = useState([])

  async function fetch_gift_list(){
    var temp = await GoplayApi.fetchGiftListReconstructed(configParams["env"], "left_side_gift_list")
    set_left_side_gift_list(temp)
    temp = await GoplayApi.fetchGiftListReconstructed(configParams["env"], "right_side_gift_list")
    set_right_side_gift_list(temp)
  }

  useEffect(() => {
    fetch_gift_list()
    // eslint-disable-next-line
  }, [configParams])

  function handleConfigParamsChanges(e) {
    try {
      const { name, value } = e.target
      setConfigParams(configParams => ({...configParams, [name]: value}))
    } catch (err) {
      if (Array.isArray(e) && e.length > 0) {
        var joinedValue = e.map((val, idx) => {
          return val.value
        }).join(",")
        setConfigParams(configParams => ({...configParams, [e[0].name]: joinedValue}))
        return
      }
      setConfigParams(configParams => ({...configParams, [e.name]: e.value}))
    }
  }

  const [pluginLink, setPluginLink] = useState("")

  function generatePluginLink() {
    var sanitizedConfigParams = configParams
    var generatedLink = new URL(`${window.location.origin}/gp_plugins/tarik_tambang`)
    generatedLink.search = new URLSearchParams(sanitizedConfigParams).toString()
    setPluginLink(generatedLink)
  }

  return (
    <div style={{
      backgroundColor: "#8ad3ed",
      height: "2000px"
    }}>
      <div className="container p-2 border rounded bg-light">
        <div className="bd-pink-400 text-white border rounded mb-2">
          <h1 className="text-center"><Link to="/" className="text-white">Welcome To Goplay Plugins Glosary</Link></h1>
        </div>

        <div>
          <h1>Config - Tarik Tambang</h1>
        </div>

        <div className="row">
          <div className="col-6">
            <div className="form-control">
              <div className="form-group mb-3">
                <label>Environment</label>
                <Select
                  name="env"
                  options={[
                    {
                      value: "production",
                      label: "production",
                      title: "env",
                      name: "env"
                    },
                    {
                      value: "integration",
                      label: "integration",
                      title: "env",
                      name: "env"
                    }
                  ]}
                  onChange={(e) => handleConfigParamsChanges(e)}
                />
              </div>
              <div className="form-group mb-3">
                <label>Live event slug</label>
                <input type="text" className="form-control" placeholder="pagi-ceria-di-goplay" name="live_event_slug" onChange={(e) => handleConfigParamsChanges(e)} />
                <small className="form-text text-muted">Eg: https://goplay.co.id/live/<b>pagi-ceria-di-goplay</b>. Live event slug can be found on your goplay url</small>
              </div>
              <div className="form-group mb-3">
                <label><b>Left</b> side label</label>
                <input type="text" className="form-control" name="left_side_label" defaultValue={configParams.left_side_label} onChange={(e) => handleConfigParamsChanges(e)} />
              </div>
              <div className="form-group mb-3">
                <label><b>Left</b> side Gift list</label>
                <Select
                  name="left_side_label"
                  isMulti
                  options={left_side_gift_list}
                  onChange={(e) => handleConfigParamsChanges(e)}
                />
              </div>
              <div className="form-group mb-3">
                <label><b>Right</b> side label</label>
                <input type="text" className="form-control" name="right_side_label" defaultValue={configParams.right_side_label} onChange={(e) => handleConfigParamsChanges(e)} />
              </div>
              <div className="form-group mb-3">
                <label><b>Right</b> side Gift list</label>
                <Select
                  name="right_side_label"
                  isMulti
                  options={right_side_gift_list}
                  onChange={(e) => handleConfigParamsChanges(e)}
                />
              </div>
              <div className="form-group mb-3">
                <label>Start Time</label>
                <input type="datetime-local" className="form-control" name="start_time" onChange={(e) => handleConfigParamsChanges(e)} />
              </div>
              <div className="form-group mb-3">
                <label>End Time</label>
                <input type="datetime-local" className="form-control" name="end_time" onChange={(e) => handleConfigParamsChanges(e)} />
              </div>
              <div className="form-group mb-3">
                <label>Winning Condition</label>
                <Select
                  name="winning_condition"
                  options={[
                    {name: "winning_condition", value: "last_leading", label: "Last Leading"},
                    {name: "winning_condition", value: "first_reach_threshold", label: "First Reach Threshold"}
                  ]}
                  onChange={(e) => handleConfigParamsChanges(e)}
                />
              </div>
              <div className="form-group mb-3">
                <label>Winning Threshold</label>
                <input type="number" className="form-control" name="winning_threshold" onChange={(e) => handleConfigParamsChanges(e)} />
              </div>

              <hr className="my-2" />
              <div className="form-group d-grid gap-2">
                <button className="btn btn-success" onClick={() => generatePluginLink()}>Generate Plugin Link</button>
              </div>
              <div className="form-group">
                <input type="text" className="form-control" value={pluginLink} readOnly />
              </div>
            </div>
          </div>
          <div className="col-6">
            <pre>
              {/* {JSON.stringify(configParams,null,2)} */}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TarikTambang
