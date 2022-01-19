import React, {useState,useEffect,useRef} from "react"
import {bounce,headShake,shake} from 'react-animations'
import Radium, {StyleRoot} from 'radium'

import GoplayApi from "../services/GoplayApi"

var qs = require('qs')
var qsParse = qs.parse(window.location.search, { ignoreQueryPrefix: true })

function GiftBinggo() {
  const [receiveAudio] = useState(new Audio("/sounds/receive.mp3"))
  const [finalAudio] = useState(new Audio("/sounds/final.wav"))
  const [finalWinAudio] = useState(new Audio("/sounds/final_win.mp3"))

  const styles = {
    bounce: {
      animation: 'x 1s',
      animationName: Radium.keyframes(bounce, 'bounce')
    },
    headShake: {
      animation: 'x 1s',
      animationName: Radium.keyframes(headShake, 'headShake')
    },
    shake: {
      animation: 'x 1s',
      animationName: Radium.keyframes(shake, 'shake')
    },
  }

  var tempTableVal = qsParse.table_val
  var tempTableValParsed = {}
  var giftToTable = {}
  try {
    tempTableValParsed = JSON.parse(tempTableVal)
    Object.keys(tempTableValParsed).forEach(function (key) {
      if (tempTableValParsed[key]["img_url"] !== "") {
        giftToTable[tempTableValParsed[key]["label"]] = key
      }
    })
  } catch (error) {
    tempTableValParsed = {
      "y1x1": {"label": "1", "img_url": "", "achieved": false, "prize": "", target: 0, curr_achieved: 0},
      "y1x2": {"label": "2", "img_url": "", "achieved": false, "prize": "", target: 0, curr_achieved: 0},
      "y1x3": {"label": "3", "img_url": "", "achieved": false, "prize": "", target: 0, curr_achieved: 0},
      "y1x4": {"label": "prize1", "img_url": "", "achieved": false, "prize": "", target: 0, curr_achieved: 0},
      "y2x1": {"label": "5", "img_url": "", "achieved": false, "prize": "", target: 0, curr_achieved: 0},
      "y2x2": {"label": "6", "img_url": "", "achieved": false, "prize": "", target: 0, curr_achieved: 0},
      "y2x3": {"label": "7", "img_url": "", "achieved": false, "prize": "", target: 0, curr_achieved: 0},
      "y2x4": {"label": "prize2", "img_url": "", "achieved": false, "prize": "", target: 0, curr_achieved: 0},
      "y3x1": {"label": "9", "img_url": "", "achieved": false, "prize": "", target: 0, curr_achieved: 0},
      "y3x2": {"label": "10", "img_url": "", "achieved": false, "prize": "", target: 0, curr_achieved: 0},
      "y3x3": {"label": "11", "img_url": "", "achieved": false, "prize": "", target: 0, curr_achieved: 0},
      "y3x4": {"label": "prize3", "img_url": "", "achieved": false, "prize": "", target: 0, curr_achieved: 0},
      "y4x1": {"label": "prize4", "img_url": "", "achieved": false, "prize": "", target: 0, curr_achieved: 0},
      "y4x2": {"label": "prize5", "img_url": "", "achieved": false, "prize": "", target: 0, curr_achieved: 0},
      "y4x3": {"label": "prize6", "img_url": "", "achieved": false, "prize": "", target: 0, curr_achieved: 0},
      "y4x4": {"label": "jackpot", "img_url": "", "achieved": false, "prize": "", target: 0, curr_achieved: 0},
    }
  }

  const[tableVal, setTableVal] = useState(tempTableValParsed)
  const[liveEventDetail, setLiveEventDetail] = useState({})
  const[vanguardChatRoom, setVanguardChatRoom] = useState({})

  async function fetchLiveEventDetail() {
    const response = await GoplayApi.fetchLiveEventDetail(qsParse.live_event_slug)
    var body = await response.json()
    setLiveEventDetail(body.data)
  }

  useEffect(() => {
    fetchLiveEventDetail()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (!liveEventDetail || liveEventDetail === {}) { return }
    connectVanguardWS()
    // eslint-disable-next-line
  }, [liveEventDetail])

  useEffect(() => {
    if (!vanguardChatRoom || vanguardChatRoom === {}) { return }
    connectChatWS()
    // eslint-disable-next-line
  }, [vanguardChatRoom])

  const vanguardWS = useRef(null)
  function connectVanguardWS() {
    try {
      if (!liveEventDetail.guard_url) { return }

      vanguardWS.current = new WebSocket(liveEventDetail.guard_url)
      if (!vanguardWS.current) { return }

      vanguardWS.current.onopen = () => {
        var payload = {
          action_type: "join_chat_room",
          iat: Date.now() + (600*1000),
          recon: false,
          username: "anonymous"
        }
        try {
          vanguardWS.current.send(JSON.stringify(payload))
        } catch (error) {
          console.log(error)
        }
      }
      vanguardWS.current.onmessage = (e) => {
        e.preventDefault()
        handleVanguardWSIncomingMessage(e.data)
      }
      vanguardWS.current.onclose = (e) => { }

    } catch (error) {
      console.log("ERROR connectVanguardWS", error)
    }
  }

  function handleVanguardWSIncomingMessage(data) {
    try {
      var parsedData = JSON.parse(data)
      if (!parsedData) { return }
      if (parsedData.action_type === "join_chat_success") {
        setVanguardChatRoom(parsedData)
      }
    } catch(error) {
      console.log("ERROR handleVanguardWSIncomingMessage", error)
    }
  }

  const chatWS = useRef(null)
  function connectChatWS() {
    try {
      if (!vanguardChatRoom.room_id || !vanguardChatRoom.token) { return }

      chatWS.current = new WebSocket(GoplayApi.ChatWSURL)
      if (!chatWS.current) { return }

      chatWS.current.onopen = () => {
        var payload = {
          ct: 10,
          recon: false,
          room_id: vanguardChatRoom.room_id,
          token: vanguardChatRoom.token
        }
        chatWS.current.send(JSON.stringify(payload))
      }
      chatWS.current.onmessage = (e) => {
        e.preventDefault()
        handleChatWSIncomingMessage(e.data)
      }
      chatWS.current.onclose = (e) => { }

    } catch (error) {
    }
  }

  function handleChatWSIncomingMessage(data) {
    try {
      var parsedData = JSON.parse(data)
      if (!parsedData) { return }
      if (parsedData.ct === 82) {
        // console.log("PARSED DATA", parsedData)
        handleGiftMessage(parsedData)
      }
    } catch(error) {
      console.log("ERROR handleChatWSIncomingMessage", error)
    }
  }

  function handleGiftMessage(giftObj) {
    if (giftToTable[giftObj.title_en]) {
      var keyTable = giftToTable[giftObj.title_en]
      tempTableValParsed[keyTable]["curr_achieved"] = (tempTableValParsed[keyTable]["curr_achieved"] || 0) + 1
      winningCheck()
      setTableVal({...tempTableValParsed})
    }
  }

  function winningCheck() {
    Object.keys(tempTableValParsed).forEach((val) => {
      if (tempTableValParsed[val]["img_url"] && tempTableValParsed[val]["img_url"] !== "") {
        if (tempTableValParsed[val]["curr_achieved"] >= tempTableValParsed[val]["target"]) {
          tempTableValParsed[val]["achieved"] = true
          console.log(val)
        }
      }
    })

    var totalAchieved = 0
    if (tempTableValParsed["y1x1"]["achieved"] && tempTableValParsed["y1x2"]["achieved"] && tempTableValParsed["y1x3"]["achieved"]) {
      tempTableValParsed["y1x4"]["achieved"] = true
      totalAchieved++
    }
    if (tempTableValParsed["y2x1"]["achieved"] && tempTableValParsed["y2x2"]["achieved"] && tempTableValParsed["y2x3"]["achieved"]) {
      tempTableValParsed["y2x4"]["achieved"] = true
      totalAchieved++
    }
    if (tempTableValParsed["y3x1"]["achieved"] && tempTableValParsed["y3x2"]["achieved"] && tempTableValParsed["y3x3"]["achieved"]) {
      tempTableValParsed["y3x4"]["achieved"] = true
      totalAchieved++
    }
    if (tempTableValParsed["y1x1"]["achieved"] && tempTableValParsed["y2x1"]["achieved"] && tempTableValParsed["y3x1"]["achieved"]) {
      tempTableValParsed["y4x1"]["achieved"] = true
      totalAchieved++
    }
    if (tempTableValParsed["y1x2"]["achieved"] && tempTableValParsed["y2x2"]["achieved"] && tempTableValParsed["y3x2"]["achieved"]) {
      tempTableValParsed["y4x2"]["achieved"] = true
      totalAchieved++
    }
    if (tempTableValParsed["y1x3"]["achieved"] && tempTableValParsed["y2x3"]["achieved"] && tempTableValParsed["y3x3"]["achieved"]) {
      tempTableValParsed["y4x3"]["achieved"] = true
      totalAchieved++
    }
    if (totalAchieved >= 6) {
      tempTableValParsed["y4x4"]["achieved"] = true
      finalWinAudio.play()
    }
  }

  function cellRenderDecider(obj) {
    if (obj["img_url"] !== "" && obj.curr_achieved > 0) {
      if (obj.curr_achieved >= obj.target) {
        finalAudio.play()
        return(
          <StyleRoot key={obj["time"]}>
            <div style={styles.bounce} key={obj["time"]}>
              <img src={obj["img_url"]} className="p-2" alt="gift" style={{
                width: "100%",
                height: "100%",
                filter: `grayscale(${obj.curr_achieved >= obj.target ? 100 : 0}%)`
              }} />
            </div>
          </StyleRoot>
        )
      }
      if (obj.curr_achieved % 2 === 0) {
        receiveAudio.play()
        return(
          <StyleRoot key={obj["time"]}>
            <div style={styles.headShake} key={obj["time"]}>
              <img src={obj["img_url"]} className="p-2" alt="gift" style={{
                width: "100%",
                height: "100%",
                filter: `grayscale(${obj.curr_achieved >= obj.target ? 100 : 0}%)`
              }} />
              <span className="rounded p-1" style={{fontSize: "25px", backgroundColor: "white"}}>
                {obj.curr_achieved || 0}/{obj.target}
              </span>
            </div>
          </StyleRoot>
        )
      } else {
        receiveAudio.play()
        return(
          <StyleRoot key={obj["time"]}>
            <div style={styles.shake} key={obj["time"]}>
              <img src={obj["img_url"]} className="p-2" alt="gift" style={{
                width: "100%",
                height: "100%",
                filter: `grayscale(${obj.curr_achieved >= obj.target ? 100 : 0}%)`
              }} />
              <span className="rounded p-1" style={{fontSize: "25px", backgroundColor: "white"}}>
                {obj.curr_achieved || 0}/{obj.target}
              </span>
            </div>
          </StyleRoot>
        )
      }
    }
    if (obj["img_url"] !== "") {
      return(
        <div>
          <img src={obj["img_url"]} className="p-2" alt="gift" style={{
            width: "100%",
            height: "100%"
          }} />
          <span className="rounded p-1" style={{fontSize: "25px", backgroundColor: "white"}}>
            {obj.curr_achieved || 0}/{obj.target}
          </span>
        </div>
      )
    }
    if (obj["img_url"] === "" && obj["achieved"]) {
      return(
        <div className="rounded p-2" style={{fontSize: "25px", backgroundColor: "rgb(25,255,25,0.8)", fontStyle: "bold"}}>
        <span >
          {obj["label"]}
        </span>
      </div>
      )
    }
    return (
      <div className="rounded p-2" style={{fontSize: "25px", backgroundColor: "rgb(255,255,255,0.8)", fontStyle: "bold"}}>
        <span >
          {obj["label"]}
        </span>
      </div>
    )
  }

  return (
    <div style={{maxWidth: "750px", margin: "auto"}}>
      <div className="mt-4">
        <table
          className="table table-bordered"
          style={{
            textAlign: "center",
            backgroundColor: "rgb(255,255,255,0.5)"
          }}
        >
          <tbody>
            <tr style={{height: "100px"}}>
              <td width="25%" style={{verticalAlign: "middle"}}>{cellRenderDecider(tableVal["y1x1"])}</td>
              <td width="25%" style={{verticalAlign: "middle"}}>{cellRenderDecider(tableVal["y1x2"])}</td>
              <td width="25%" style={{verticalAlign: "middle"}}>{cellRenderDecider(tableVal["y1x3"])}</td>
              <td width="25%" style={{verticalAlign: "middle"}}>{cellRenderDecider(tableVal["y1x4"])}</td>
            </tr>
            <tr style={{height: "100px"}}>
              <td width="25%" style={{verticalAlign: "middle"}}>{cellRenderDecider(tableVal["y2x1"])}</td>
              <td width="25%" style={{verticalAlign: "middle"}}>{cellRenderDecider(tableVal["y2x2"])}</td>
              <td width="25%" style={{verticalAlign: "middle"}}>{cellRenderDecider(tableVal["y2x3"])}</td>
              <td width="25%" style={{verticalAlign: "middle"}}>{cellRenderDecider(tableVal["y2x4"])}</td>
            </tr>
            <tr style={{height: "100px"}}>
              <td width="25%" style={{verticalAlign: "middle"}}>{cellRenderDecider(tableVal["y3x1"])}</td>
              <td width="25%" style={{verticalAlign: "middle"}}>{cellRenderDecider(tableVal["y3x2"])}</td>
              <td width="25%" style={{verticalAlign: "middle"}}>{cellRenderDecider(tableVal["y3x3"])}</td>
              <td width="25%" style={{verticalAlign: "middle"}}>{cellRenderDecider(tableVal["y3x4"])}</td>
            </tr>
            <tr style={{height: "100px"}}>
              <td width="25%" style={{verticalAlign: "middle"}}>{cellRenderDecider(tableVal["y4x1"])}</td>
              <td width="25%" style={{verticalAlign: "middle"}}>{cellRenderDecider(tableVal["y4x2"])}</td>
              <td width="25%" style={{verticalAlign: "middle"}}>{cellRenderDecider(tableVal["y4x3"])}</td>
              <td width="25%" style={{verticalAlign: "middle"}}>{cellRenderDecider(tableVal["y4x4"])}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default GiftBinggo
