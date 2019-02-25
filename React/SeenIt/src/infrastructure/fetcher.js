const BASE_URL = 'http://localhost:9999'

export default {
    get: (endpoint, callback) => 
        fetch(BASE_URL + endpoint)
            .then(data => data.json())
            .then(callback)
            .catch(console.log),
            
    post:(endpoint, data,callback)=>{
        fetch(BASE_URL + endpoint,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(data => data.json())
            .then(body=>{
                if(body.errors){
                    body.errors.forEach(e=>{
                        console.log(e.msg)
                    })
                }
            })
            .catch((e)=>console.log(e))
    }
}