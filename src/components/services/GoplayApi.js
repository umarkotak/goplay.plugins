class GoplayApi {
  constructor() {
    this.ProxyHost = "http://localhost:8000/proxy"
    this.ProxyHost = "https://goplay-plugins-api.herokuapp.com/proxy"
  }

  getGoplayHost(env) {
    if (env === "production") { return "https://goplay.co.id" }
    return "https://r7lk8n0srbams5t7sl7q.goplay.co.id"
  }

  getChatWSURL(env) {
    if (env === "production") { return "wss://gschat.goplay.co.id/chat" }
    return "wss://g-gschat.goplay.co.id/chat"
  }

  async fetchLiveEventDetail(env, slug) {
    var uri = new URL(`${this.ProxyHost}/${this.getGoplayHost(env)}/api/v1/live/event/${slug}`)
    uri.search = new URLSearchParams({}).toString()
    var response = await fetch(uri, {method: "GET", headers: {"Content-Type": "application/json"}})
    return response
  }

  async fetchGiftList(env) {
    var uri = new URL(`${this.ProxyHost}/${this.getGoplayHost(env)}/api/v1/gifts`)
    uri.search = new URLSearchParams({limit: 200}).toString()
    var response = await fetch(uri, {method: "GET", headers: {"Content-Type": "application/json"}})
    return response
  }

  async fetchGiftListReconstructed(env, name) {
    var response = await this.fetchGiftList(env)
    var body = await response.json()
    var reconstructedGiftList = body["data"]["gifts"].map((val) => {
      return {
        value: val.icon_url,
        label: <div><img src={val.icon_url} alt="" height="30px" width="30px"/> {val.title}</div>,
        title: val.title,
        name: name
      }
    })
    return reconstructedGiftList
  }
}

const goplayApi = new GoplayApi()

export default goplayApi
