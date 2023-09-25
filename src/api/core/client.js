class Client {
  constructor() {
    this.headers = {
      'Content-Type': 'application/json',
    }
  }

  async get(url) {
    const resp = await fetch(url, {
      method: "GET",
      headers: this.headers
    })
    const result = await resp.json()
    return result
  }

  async post(url) {
    return {}
  }
}

const client = new Client()
export default client
