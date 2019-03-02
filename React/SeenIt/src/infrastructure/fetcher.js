const HOST = 'http://127.0.0.1:5000'

const fetcher = {
  async register(data) {
    const res = await fetch(`${HOST}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    return res.json()
  },

  async login(data) {
    const res = await fetch(`${HOST}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    return res.json()
  },
  async getAllPosts(){

    const res=await fetch(`${HOST}/posts/all`)

    return res.json()
  },
  async getUserRole(data){
    const res=await fetch(`${HOST}/auth/user/${data}`)
    return res.json()
  },
  async findPostById(id){
    const res=await fetch(`${HOST}/posts/details/${id}`)
    return res.json()
  },
  async createComment(data){
    const res=await fetch(`${HOST}/comment/create`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    return res.json()
  }
}



export default fetcher