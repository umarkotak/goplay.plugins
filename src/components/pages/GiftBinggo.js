import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import Select from 'react-select'

import GoplayApi from "../services/GoplayApi"

function GiftBinggo() {
  const[pluginURL, setPluginURL] = useState("/gp_plugins/gift_binggo")
  const[liveEventSlug, setLiveEventSlug] = useState("")
  const[tableVal, setTableVal] = useState({
    "y1x1": {"label": "1", "img_url": "", "prize": "", target: 0},
    "y1x2": {"label": "2", "img_url": "", "prize": "", target: 0},
    "y1x3": {"label": "3", "img_url": "", "prize": "", target: 0},
    "y1x4": {"label": "prize1", "img_url": "", "prize": "", target: 0},
    "y2x1": {"label": "5", "img_url": "", "prize": "", target: 0},
    "y2x2": {"label": "6", "img_url": "", "prize": "", target: 0},
    "y2x3": {"label": "7", "img_url": "", "prize": "", target: 0},
    "y2x4": {"label": "prize2", "img_url": "", "prize": "", target: 0},
    "y3x1": {"label": "9", "img_url": "", "prize": "", target: 0},
    "y3x2": {"label": "10", "img_url": "", "prize": "", target: 0},
    "y3x3": {"label": "11", "img_url": "", "prize": "", target: 0},
    "y3x4": {"label": "prize3", "img_url": "", "prize": "", target: 0},
    "y4x1": {"label": "prize4", "img_url": "", "prize": "", target: 0},
    "y4x2": {"label": "prize5", "img_url": "", "prize": "", target: 0},
    "y4x3": {"label": "prize6", "img_url": "", "prize": "", target: 0},
    "y4x4": {"label": "jackpot", "img_url": "", "prize": "", target: 0},
  })
  const[giftList, setGiftList] = useState([])

  async function fetchGiftList() {
    var response = await GoplayApi.fetchGiftList()
    var body = await response.json()
    var reconstructedGiftList = body["data"]["gifts"].map((val) => {
      return {
        value: val.icon_url,
        label: <div><img src={val.icon_url} alt="" height="30px" width="30px"/> {val.title}</div>,
        title: val.title
      }
    })
    setGiftList(reconstructedGiftList)
  }

  function handleParamsChanges(elem, custElem, custName) {
    if (elem) {
      const { name, value } = elem.target
      tableVal[name].label = value
      tableVal[name].prize = value
      setTableVal(tableVal => ({...tableVal, [custName]: tableVal[custName]}))
    } else if (custElem) {
      tableVal[custName].img_url = custElem.value
      tableVal[custName].label = custElem.title
      setTableVal(tableVal => ({...tableVal, [custName]: tableVal[custName]}))
    }
  }

  function handleParamsChangesNumber(elem) {
    const { name, value } = elem.target
    tableVal[name].target = parseInt(value)
    setTableVal(tableVal => ({...tableVal, [name]: tableVal[name]}))
  }

  useEffect(() => {
    fetchGiftList()
  }, [])

  useEffect(() => {
    var queryParams = [
      `table_val=${JSON.stringify(tableVal)}`,
      `live_event_slug=${liveEventSlug}`
    ]
    setPluginURL(`/plugin/binggo?${queryParams.join("&")}`)
  }, [tableVal, liveEventSlug])

  return (
    <div className="container">
      <div className="mt-4">
        <div name="slug" className="row">
          <div className="col-12">
            <div className="form-group border rounded p-2">
              <label>Live event slug</label>
              <input className="form-control" value={liveEventSlug} onChange={(e) => setLiveEventSlug(e.target.value)} />
            </div>
          </div>
        </div>
        <div name="y1" className="row">
          <div className="col-3">
            <div className="form-group border rounded p-2">
              <label>Y1 - X1</label>
              <hr className="my-0 py-0" />
              <label>Gift</label>
              <Select
                name="y1x1"
                options={giftList}
                onChange={(custElem) => handleParamsChanges(null, custElem, "y1x1")}
              />
              <label>Jumlah</label>
              <input name="y1x1" type="number" className="form-control" onChange={(elem) => handleParamsChangesNumber(elem)} />
            </div>
          </div>
          <div className="col-3">
            <div className="form-group border rounded p-2">
              <label>Y1 - X2</label>
              <hr className="my-0 py-0" />
              <label>Gift</label>
              <Select
                name="y1x1"
                options={giftList}
                onChange={(custElem) => handleParamsChanges(null, custElem, "y1x2")}
              />
              <label>Jumlah</label>
              <input name="y1x2" type="number" className="form-control" onChange={(elem) => handleParamsChangesNumber(elem)} />
            </div>
          </div>
          <div className="col-3">
            <div className="form-group border rounded p-2">
              <label>Y1 - X3</label>
              <hr className="my-0 py-0" />
              <label>Gift</label>
              <Select
                name="y1x1"
                options={giftList}
                onChange={(custElem) => handleParamsChanges(null, custElem, "y1x3")}
              />
              <label>Jumlah</label>
              <input name="y1x3" type="number" className="form-control" onChange={(elem) => handleParamsChangesNumber(elem)} />
            </div>
          </div>
          <div className="col-3">
            <div className="form-group border rounded p-2">
              <label>Y1 - X4 (reward)</label>
              <hr className="my-0 py-0" />
              <label>Reward</label>
              <input name="y1x4" type="text" className="form-control" onChange={(elem) => handleParamsChanges(elem, null, "y1x4")} />
            </div>
          </div>
        </div>
        <div name="y2" className="row">
          <div className="col-3">
            <div className="form-group border rounded p-2">
              <label>Y2 - X1</label>
              <hr className="my-0 py-0" />
              <label>Gift</label>
              <Select
                name="y2x1"
                options={giftList}
                onChange={(custElem) => handleParamsChanges(null, custElem, "y2x1")}
              />
              <label>Jumlah</label>
              <input name="y2x1" type="number" className="form-control" onChange={(elem) => handleParamsChangesNumber(elem)} />
            </div>
          </div>
          <div className="col-3">
            <div className="form-group border rounded p-2">
              <label>Y2 - X2</label>
              <hr className="my-0 py-0" />
              <label>Gift</label>
              <Select
                name="y2x1"
                options={giftList}
                onChange={(custElem) => handleParamsChanges(null, custElem, "y2x2")}
              />
              <label>Jumlah</label>
              <input name="y2x2" type="number" className="form-control" onChange={(elem) => handleParamsChangesNumber(elem)} />
            </div>
          </div>
          <div className="col-3">
            <div className="form-group border rounded p-2">
              <label>Y2 - X3</label>
              <hr className="my-0 py-0" />
              <label>Gift</label>
              <Select
                name="y2x1"
                options={giftList}
                onChange={(custElem) => handleParamsChanges(null, custElem, "y2x3")}
              />
              <label>Jumlah</label>
              <input name="y2x3" type="number" className="form-control" onChange={(elem) => handleParamsChangesNumber(elem)} />
            </div>
          </div>
          <div className="col-3">
            <div className="form-group border rounded p-2">
              <label>Y1 - X4 (reward)</label>
              <hr className="my-0 py-0" />
              <label>Reward</label>
              <input name="y2x4" type="text" className="form-control" onChange={(elem) => handleParamsChanges(elem, null, "y2x4")} />
            </div>
          </div>
        </div>
        <div name="y3" className="row">
          <div className="col-3">
            <div className="form-group border rounded p-2">
              <label>Y3 - X1</label>
              <hr className="my-0 py-0" />
              <label>Gift</label>
              <Select
                name="y3x1"
                options={giftList}
                onChange={(custElem) => handleParamsChanges(null, custElem, "y3x1")}
              />
              <label>Jumlah</label>
              <input name="y3x1" type="number" className="form-control" onChange={(elem) => handleParamsChangesNumber(elem)} />
            </div>
          </div>
          <div className="col-3">
            <div className="form-group border rounded p-2">
              <label>Y3 - X2</label>
              <hr className="my-0 py-0" />
              <label>Gift</label>
              <Select
                name="y3x1"
                options={giftList}
                onChange={(custElem) => handleParamsChanges(null, custElem, "y3x2")}
              />
              <label>Jumlah</label>
              <input name="y3x2" type="number" className="form-control" onChange={(elem) => handleParamsChangesNumber(elem)} />
            </div>
          </div>
          <div className="col-3">
            <div className="form-group border rounded p-2">
              <label>Y3 - X3</label>
              <hr className="my-0 py-0" />
              <label>Gift</label>
              <Select
                name="y3x1"
                options={giftList}
                onChange={(custElem) => handleParamsChanges(null, custElem, "y3x3")}
              />
              <label>Jumlah</label>
              <input name="y3x3" type="number" className="form-control" onChange={(elem) => handleParamsChangesNumber(elem)} />
            </div>
          </div>
          <div className="col-3">
            <div className="form-group border rounded p-2">
              <label>Y1 - X4 (reward)</label>
              <hr className="my-0 py-0" />
              <label>Reward</label>
              <input name="y3x4" type="text" className="form-control" onChange={(elem) => handleParamsChanges(elem, null, "y3x4")} />
            </div>
          </div>
        </div>
        <div name="y4" className="row">
          <div className="col-3">
            <div className="form-group border rounded p-2">
              <label>Y4 - X1 (reward)</label>
              <hr className="my-0 py-0" />
              <label>Reward</label>
              <input name="y4x1" type="text" className="form-control" onChange={(elem) => handleParamsChanges(elem, null, "y4x1")} />
            </div>
          </div>
          <div className="col-3">
            <div className="form-group border rounded p-2">
              <label>Y4 - X2 (reward)</label>
              <hr className="my-0 py-0" />
              <label>Reward</label>
              <input name="y4x2" type="text" className="form-control" onChange={(elem) => handleParamsChanges(elem, null, "y4x2")} />
            </div>
          </div>
          <div className="col-3">
            <div className="form-group border rounded p-2">
              <label>Y4 - X3 (reward)</label>
              <hr className="my-0 py-0" />
              <label>Reward</label>
              <input name="y4x3" type="text" className="form-control" onChange={(elem) => handleParamsChanges(elem, null, "y4x3")} />
            </div>
          </div>
          <div className="col-3">
            <div className="form-group border rounded p-2">
              <label>Y4 - X4 (reward)</label>
              <hr className="my-0 py-0" />
              <label>Reward</label>
              <input name="y4x4" type="text" className="form-control" onChange={(elem) => handleParamsChanges(elem, null, "y4x4")} />
            </div>
          </div>
        </div>
        <div name="submission" className="row">
          <div className="col-12">
            <div className="form-group border rounded p-2">
              <button onClick={(e) => {console.log(liveEventSlug, tableVal)}} className="btn btn-primary btn-block">Console Log</button>
              <Link to={pluginURL} target="_blank" rel="" className="btn btn-primary btn-block">Plugin Link</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GiftBinggo
