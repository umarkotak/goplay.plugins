import React, { useState, useRef, useEffect } from "react"

import GoplayApi from "../services/GoplayApi"

var qs = require('qs')
var qsParse = qs.parse(window.location.search, { ignoreQueryPrefix: true })

function SimpleChat() {
  const [liveEventDetail, setLiveEventDeail] = useState({})
  const [vanguardChatRoom, setVanguardChatRoom] = useState({})
  const [chatMessages, setChatMessages] = useState([])

  var chatTemplate = {
    width: (qsParse.width || 400) + "px",
    chatBoxBG: (qsParse.chat_box_bg || "FFFFFF"),
    chatTextColor: (qsParse.chat_text_color || "000000"),
  }

  async function fetchLiveEventDetail() {
    const response = await GoplayApi.fetchLiveEventDetail({
      live_event_slug: qsParse.live_event_slug
    })
    setLiveEventDeail(response.body.data)
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
        if (parsedData.ct === 20) {
          setChatMessages(chatMessages => [...chatMessages, parsedData])
          window.scrollTo(0,document.body.scrollHeight)
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
      {chatMessages.map(((chatMessage, index) => (
        <div
          className="border rounded mb-2 p-2"
          id={chatMessage.id}
          style={{
            backgroundColor: `#${chatTemplate.chatBoxBG}`,
          }}
        >
          <p style={{
            color: `#${chatTemplate.chatTextColor}`,
          }}>
            <b>{chatMessage.frm}</b>
            <br className="my-1" />
            {chatMessage.msg}
          </p>
        </div>
      )))}
    </div>
  )
}

export default SimpleChat
