
import React, { useState, useRef, useEffect } from "react"

import GoplayApi from "../services/GoplayApi"

var qs = require('qs')
var qsParse = qs.parse(window.location.search, { ignoreQueryPrefix: true })

function TarikTambang() {
  const [liveEventDetail, setLiveEventDeail] = useState({})
  const [vanguardChatRoom, setVanguardChatRoom] = useState({})

  var leftSideLabel = qsParse.left_side_label
  var rightSideLabel = qsParse.right_side_label
  var leftSideGiftIDs = qsParse.left_side_gift_list.split(",")
  var rightSideGiftIDs = qsParse.right_side_gift_list.split(",")
  var [redTeamPower, setRedTeamPower] = useState(0)
  var [blueTeamPower, setBlueTeamPower] = useState(0)
  var [powerState, setPowerState] = useState(500000)
  var [winner, setWinner] = useState("")
  var redPower = 0
  var bluePower = 0
  var currPower = 500000

  var countedGift = []

  var chatTemplate = {
    width: (qsParse.width || 1200) + "px",
    chatBoxBG: (qsParse.chat_box_bg || "FFFFFF"),
    chatTextColor: (qsParse.chat_text_color || "000000"),
  }

  async function fetchLiveEventDetail() {
    const response = await GoplayApi.fetchLiveEventDetail(qsParse.env, qsParse.live_event_slug)
    var body = await response.json()
    setLiveEventDeail(body.data)
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

  useEffect(() => {
    // eslint-disable-next-line
  }, [powerState])

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

      chatWS.current = new WebSocket(GoplayApi.getChatWSURL(qsParse.env))
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

    function handleChatWSIncomingMessage(data) {
      // console.log("INCOMING handleChatWSIncomingMessage", data)

      try {
        var parsedData = JSON.parse(data)
        if (!parsedData) { return }
        if (parsedData.ct === 82) {
          console.log(parsedData)

          if (countedGift.includes(parsedData.id)) { return }

          if (leftSideGiftIDs.includes(parsedData.icon)) {
            redPower = redPower + parsedData.price
            setRedTeamPower(redPower)
            currPower = currPower - parsedData.price
            setPowerState(currPower)
          } else if (rightSideGiftIDs.includes(parsedData.icon)) {
            bluePower = bluePower + parsedData.price
            setBlueTeamPower(bluePower)
            currPower = currPower + parsedData.price
            setPowerState(currPower)
          }
          if (redPower > bluePower) {
            setWinner(leftSideLabel)
          } else if (redPower < bluePower) {
            setWinner(rightSideLabel)
          }

          countedGift.push(parsedData.id)
        }
      } catch(error) {
        console.log("ERROR handleChatWSIncomingMessage", error)
      }
    }
  }

  return (
    <div className="container" style={{
      backgroundColor: "#00000000",
      width: chatTemplate.width
    }}>
      <div>
        <div className="float-start">
          <span className="badge rounded-pill bg-danger">{leftSideLabel}</span>
        </div>
        <div className="float-end">
          <span className="badge rounded-pill bg-primary">{rightSideLabel}</span>
        </div>
      </div>
      <br/>
      <div className="p-2 pb-0">
        <div className="text-center" style={{marginBottom: "-25px"}}>
          <span style={{fontSize: "25px"}}>|</span>
        </div>
        <input
          type="range"
          className="form-range"
          min="0"
          max="1000000"
          // onChange={(e) => setPowerState(e.target.value)}
          value={powerState}
          // value={500000}
          readOnly
        />
      </div>
      <div>
        <div className="float-start">
          <span className="badge rounded-pill bg-secondary">pwr: {redTeamPower}</span>
        </div>
        <div className="float-end">
          <span className="badge rounded-pill bg-secondary">pwr: {blueTeamPower}</span>
        </div>
      </div>
      <div className="text-center">
        leading: <span className={`badge rounded-pill ${winner === leftSideLabel ? "bg-danger" : "bg-primary"}`}>{winner}</span>
      </div>
    </div>
  )
}

export default TarikTambang
