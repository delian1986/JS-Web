import { toast } from 'react-toastify';
import observer from './../infrastructure/observer';
import fetcher from './../infrastructure/fetcher'


export default{
    login:async(data,props)=>{
        const user = data
        const res = await fetcher.login(user)
        if(res.success){
            localStorage.setItem('token',res.token)
            localStorage.setItem('username',res.user.username)
            localStorage.setItem('role',res.user.roles)
            // localStorage.setItem('userId',res.userId)
            // localStorage.setItem('isAdmin',res.isAdmin)
            toast.success(res.message)
            observer.trigger(observer.events.loginUser,res.user.username)
            props.history.push('/catalog')
        }else{
            toast.error(res.message)
        }
        
    },
    register:async(data)=>{
        const user = data
        const res = await fetcher.register(user)
        // console.log(res);
        if(res.success){
            // localStorage.setItem('token',res.token)
            // localStorage.setItem('username',res.user.username)
            // localStorage.setItem('userId',res.userId)
            // localStorage.setItem('isAdmin',res.isAdmin)
            toast.success(res.message)
        }else{
           Object.entries(res.errors).forEach(([e,msg])=>{
                toast.error(msg)
           })
        }
    }
}