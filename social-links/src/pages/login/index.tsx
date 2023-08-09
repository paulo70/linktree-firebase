import { Link, useNavigate } from "react-router-dom"
import { Input } from "../../components/Input"
import { FormEvent, useState } from "react"

import { auth } from "../../services/firebaseConnection"
import { signInWithEmailAndPassword } from "firebase/auth"

export function Login(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    function handleSubmit(e:FormEvent){
        e.preventDefault()
        if(email === "" || password === ""){
            alert("Fill the fields")
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            console.log("SIGN SUCCESSFULY")
            navigate("/admin", {replace: true})
        }).catch((error) => {
            console.log(error, "ERROR")
        })
    }

    return (
        <div className="flex w-full h-screen items-center justify-center flex-col">
        <Link to="/">
             <h1 className="mt-11 text-white mb-7 font-bold text-5xl">Dev<span className="bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">Link</span></h1>
        </Link>
         <form onSubmit={handleSubmit} className="w-full flex flex-col max-w-xl px-2">
            <Input 
            placeholder="Type your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <Input 
            placeholder="*************"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <button 
                type="submit"
                className="h-9 bg-blue-600 rounded border-0 text-lg font-medium text-white">
            Access
            </button>
         </form>  
        </div>
    )
}