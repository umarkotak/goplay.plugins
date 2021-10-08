import DataVG from "./DataVG"

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
      // `${this.GoplayApiHOST}/goplay_api_integration/v1/live/event/${params.live_event_slug}`,
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

  AvailableGiftTitles(name) {
    return [
      {name: name, value: "Cilok", label: "Cilok"},
      {name: name, value: "Nasi Pecel", label: "Nasi Pecel"},
      {name: name, value: "Nasgor Special", label: "Nasgor Special"},
      {name: name, value: "Martabak Spesial", label: "Martabak Spesial"},
      {name: name, value: "Light Stick", label: "Light Stick"},
      {name: name, value: "Disco Ball", label: "Disco Ball"},
      {name: name, value: "DWP Special Drink", label: "DWP Special Drink"},
      {name: name, value: "Loving it", label: "Loving it"},
      {name: name, value: "Agreeeeeee", label: "Agreeeeeee"},
      {name: name, value: "Just for you", label: "Just for you"},
      {name: name, value: "Encore!", label: "Encore!"},
      {name: name, value: "Mind blown", label: "Mind blown"},
      {name: name, value: "Take a bow!", label: "Take a bow!"},
      {name: name, value: "You're lit", label: "You're lit"},
      {name: name, value: "Well noted", label: "Well noted"},
      {name: name, value: "Cheat sheet", label: "Cheat sheet"},
      {name: name, value: "Ganbatte", label: "Ganbatte"},
      {name: name, value: "Takoyaki", label: "Takoyaki"},
      {name: name, value: "Sushi Roll", label: "Sushi Roll"},
      {name: name, value: "Kawaii", label: "Kawaii"},
      {name: name, value: "Sushi Platter", label: "Sushi Platter"},
      {name: name, value: "Lucky Cat", label: "Lucky Cat"},
      {name: name, value: "McDonald's", label: "McDonald's"},
      {name: name, value: "Come On Joko Tingkir!", label: "Come On Joko Tingkir!"},
      {name: name, value: "Soto Lamongan", label: "Soto Lamongan"},
      {name: name, value: "Lightstick", label: "Lightstick"},
      {name: name, value: "Yoh Iso Yoh", label: "Yoh Iso Yoh"},
      {name: name, value: "Lumpia Semarang", label: "Lumpia Semarang"},
      {name: name, value: "Bakpia Jogja", label: "Bakpia Jogja"},
      {name: name, value: "Goall", label: "Goall"},
      {name: name, value: "Djajati Persik", label: "Djajati Persik"},
      {name: name, value: "Carrot", label: "Carrot"},
      {name: name, value: "Meat", label: "Meat"},
      {name: name, value: "Bucin Banget", label: "Bucin Banget"},
      {name: name, value: "Ugh Gemeesh", label: "Ugh Gemeesh"},
      {name: name, value: "Mabar Kuy", label: "Mabar Kuy"},
      {name: name, value: "Drumstick", label: "Drumstick"},
      {name: name, value: "Calliandra", label: "Calliandra"},
      {name: name, value: "Caterpillar", label: "Caterpillar"},
      {name: name, value: "Cricket", label: "Cricket"},
      {name: name, value: "Green Bean", label: "Green Bean"},
      {name: name, value: "Fish", label: "Fish"},
      {name: name, value: "Whole Chicken", label: "Whole Chicken"},
      {name: name, value: "Banana", label: "Banana"},
      {name: name, value: "Kick Avenue", label: "Kick Avenue"},
      {name: name, value: "Milk", label: "Milk"},
      {name: name, value: "Watermelon", label: "Watermelon"},
      {name: name, value: "Biscuit Date", label: "Biscuit Date"},
      {name: name, value: "Merdeka Mask", label: "Merdeka Mask"},
      {name: name, value: "Chicken Bowl", label: "Chicken Bowl"},
      {name: name, value: "Gold Medal", label: "Gold Medal"},
      {name: name, value: "Lucky Cat Merdeka", label: "Lucky Cat Merdeka"},
      {name: name, value: "MERDEKA!", label: "MERDEKA!"},
      {name: name, value: "Itadakimas!", label: "Itadakimas!"},
      {name: name, value: "GoPlay Mask", label: "GoPlay Mask"},
      {name: name, value: "Play 2Gether", label: "Play 2Gether"},
      {name: name, value: "Pecel Lele", label: "Pecel Lele"},
      {name: name, value: "Warung Pecel", label: "Warung Pecel"},
      {name: name, value: "Lamongan Megilan", label: "Lamongan Megilan"},
      {name: name, value: "Iced Coffee", label: "Iced Coffee"},
      {name: name, value: "Confetti", label: "Confetti"},
      {name: name, value: "Disco Ball", label: "Disco Ball"},
      {name: name, value: "Teddy", label: "Teddy"},
      {name: name, value: "Galaxy", label: "Galaxy"},
      {name: name, value: "Private Island", label: "Private Island"},
      {name: name, value: "Treasure Chest", label: "Treasure Chest"},
    ]
  }

  AvailableGifts(name) {
    var datas = DataVG.Get()
    var res = datas.map((val, key) => {
      return {name: name, value: val.title, label: <div><img src={val.icon_url} alt="" height="30px" width="30px"/> {val.title}</div>}
    })
    return res
  }

}

const goplayApi = new GoplayApi()

export default goplayApi
