const HOST = 'http://127.0.0.1:9999'

const fetcher = {
  async register(data) {
    const res = await fetch(`${HOST}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
        email: data.email
      })
    })

    return res.json()
  },

  async login(data) {
    const res = await fetch(`${HOST}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
      })
    })

    return res.json()
  },
  async create(data) {
    const res = await fetch(`${HOST}/feed/movie/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Bearer': localStorage.token
      },
      body: JSON.stringify({
        title: data.title,
        storyLine: data.storyLine,
        trailerUrl: data.trailerUrl,
        poster: data.poster
      })
    })

    return res.json()
  },
  async getMovies(){
      const res=await fetch(`${HOST}/feed/movies/`)

      return res.json()
  }
}

export default fetcher