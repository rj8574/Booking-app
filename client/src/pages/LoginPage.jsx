/* eslint-disable react/no-unescaped-entities */
import axios from "axios";
import { useContext, useState } from "react";
import {Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage(){
    const [email,setEmail]=useState('');
    const [password,setPasssword]=useState('')
    const [redirect,setridrect]=useState(false);
    const {setUser}=useContext(UserContext)
    async function handleSubmit(e){
        e.preventDefault()
        try{
        const {data}= await axios.post('/login',{
            email,
            password
        })
        setUser(data)
        alert("Login Successfull")
        setridrect(true);
        
        }
        catch(e){
            alert("Login unsuccessful")
        }
    }
    if(redirect){
       return <Navigate to="/" replace={true} />
    }
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4" >Login</h1>
                <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                <input type="email" placeholder="your@email.com" value={email} onChange={e=>setEmail(e.target.value)}/>
                <input type="password" placeholder="password"  value={password} onChange={e=>setPasssword(e.target.value)}/>
                <button className="primary">Login</button>
                <div className="text-center py-2 text-gray-500">
                    Don't have an account yet ? <Link className="underline text-black" to={'/register'} replace={true}>Register now</Link>
                    </div>
                </form> 
                
            </div>
          
        </div>
    ) 
}