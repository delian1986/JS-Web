import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import { toast } from 'react-toastify';

export default class Logout extends Component{
    logout=()=>{
        sessionStorage.clear()
        toast.success('Successful logout!')
    }

    render=()=><Redirect to='/'/>
}