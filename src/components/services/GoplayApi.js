class GoplayApi {
  constructor() {
    if (window.location.protocol === "https:") {
      this.GoplayApiHOST = "https://go-animapu2.herokuapp.com"
      this.GoplayApiHOST = "https://go-animapu.herokuapp.com"
    } else {
      this.GoplayApiHOST = "https://go-animapu.herokuapp.com"
      this.GoplayApiHOST = "http://localhost:4000"
    }
  }

  async GetLiveEventDetail(params) {
    return this.BaseHttpCall(
      "GET",
      `${this.GoplayApiHOST}/goplay_api/v1/live/event/${params.live_event_slug}`,
      {},
      {},
      {}
    )
  }

  async BaseHttpCall(method, url, headers, requestQuery, requestBody) {
    try {
      var uri = new URL(url)
      uri.search = new URLSearchParams(requestQuery).toString()
      headers['Content-Type'] = 'application/json'

      console.log(`${method} ${uri} REQUEST\n`, requestBody)
      var fetchOpts = { method: method, headers: headers }
      if (method !== "GET") { fetchOpts.body = JSON.stringify(requestBody) }
      const response = await fetch(uri, fetchOpts)
      var body = await response.json()
      console.log(`${method} ${uri} RESPONSE\n`, response.status, body)

      return { status: response.status, body: body }
    } catch (e) {
      console.log("ERROR", e)
      return { status: 500, body: {} }
    }
  }

}

const goplayApi = new GoplayApi()

export default goplayApi
