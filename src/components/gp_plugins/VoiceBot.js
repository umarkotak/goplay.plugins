import React, { useState, useRef, useEffect } from "react"
import { useSpeechSynthesis } from 'react-speech-kit'

import GoplayApi from "../services/GoplayApi"

var qs = require('qs')
var qsParse = qs.parse(window.location.search, { ignoreQueryPrefix: true })

var readIndexNumber = 0

function VoiceBot() {
  const [liveEventDetail, setLiveEventDeail] = useState({})
  const [vanguardChatRoom, setVanguardChatRoom] = useState({})
  const [chatMessages, setChatMessages] = useState([])
  const onEnd = () => {
  }
  const { speak } = useSpeechSynthesis({onEnd})
  const [start, setStart] = useState(false)

  async function fetchLiveEventDetail() {
    const response = await GoplayApi.fetchLiveEventDetail(qsParse.env, qsParse.live_event_slug)
    var body = await response.json()
    setLiveEventDeail(body.data)
  }

  useEffect(() => {
    if (start) {
      fetchLiveEventDetail()
    }
    // eslint-disable-next-line
  }, [start])

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
        vanguardWS.current.send(JSON.stringify(payload))
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

      var chatWSURL = "wss://gschat.goplay.co.id/chat"
      chatWS.current = new WebSocket(chatWSURL)
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
          console.log("parsedData", parsedData)
          setChatMessages(chatMessages => [...chatMessages, parsedData])
          window.scrollTo(0,document.body.scrollHeight)
        }
      } catch(error) {
        console.log("ERROR handleChatWSIncomingMessage", error)
      }
    }
  }

  useEffect(() => {
    try {
      if (chatMessages.length <= 0) { return }
      console.log("POS", readIndexNumber)
      var text = `THANKYOU ${chatMessages[readIndexNumber].frm} FOR THE ${chatMessages[readIndexNumber].title_en} GIFT`
      speak({ text: text})
      readIndexNumber++
    } catch(error) {
    }
    // eslint-disable-next-line
  }, [chatMessages])

  return (
    <div
      className="container"
      style={{
          backgroundColor: "#00000000",
          width: "600px"
      }}
    >
      <button className="btn btn-block btn-primary" onClick={(e) => {
        speak({ text: "INITIALIZING" })
        setStart(true)
      }}>Start</button>
      <div
        className="overflow-auto"
        style={{
          backgroundColor: "#00000000",
        }}
      >
        {chatMessages.slice(chatMessages.length - chatMessages.length, chatMessages.length).map(((chatMessage, index) => (
          <div
            className="mb-2 p-2"
            id={chatMessage.id}
            key={`${chatMessage.id}-${index}`}
            style={{
              backgroundColor: `#FFFFFF`,
            }}
          >
            <div className="border" style={{width: "50%"}}>
              <p
                style={{
                  color: `#000000`,
                  textAlign: "center"
                }}
              >
                <b>{chatMessage.frm}</b>
                <br className="my-1" />
                <img
                  src={chatMessage.icon}
                  style={{width: "120px", height: "120px"}}
                  alt="virtual gift"
                />
                <br className="my-1" />
                {chatMessage.msg}
              </p>
            </div>
          </div>
        )))}
      </div>
    </div>
  )
}

export default VoiceBot
