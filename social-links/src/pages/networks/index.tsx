import { FormEvent, useEffect, useState } from "react";
import { Input } from "../../components/Input";
import { Header } from "../../components/header";

import {db} from "../../services/firebaseConnection"
import {setDoc, doc, getDoc} from "firebase/firestore"

export function NetWork(){
    const [linkedin, setLinkedin] = useState("")
    const [instagram, setInstagram] = useState("")
    const [gitHub, setGitHub] = useState("")

    useEffect(() => {
     
     function loadingLinks(){
        const docRef = doc(db, "social", "links")
        getDoc(docRef)
        .then((snapshot) => {
            if(snapshot.data() !== undefined){
                setLinkedin(snapshot.data()?.linkedin)
                setInstagram(snapshot.data()?.instagram)
                setGitHub(snapshot.data()?.gitHub)
            }
        })
     }

     loadingLinks()

    },[])

    function handleRegister(e: FormEvent){
        e.preventDefault()

        setDoc(doc(db, "social", "links"), {
            linkedin: linkedin,
            instagram: instagram,
            gitHub: gitHub,
        })
        .then(() => {
            setLinkedin("")
            setInstagram("")
            setGitHub("")
        })
    }

    return (
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header/>
            <h1 className="text-white text-2xl font-medium mt-8 mb-4">My NetWorks</h1>
            <form onSubmit={handleRegister} className="flex flex-col max-w-xl w-full">
                <label className="text-white font-medium mt-2 mb-2">Link Likedin</label>
                <Input 
                    type="url" 
                    placeholder="type url Linkedin"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                />
                <label className="text-white font-medium mt-2 mb-2">Link Instagram</label>
                 <Input 
                    type="url" 
                    placeholder="type url Instagram"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                />

                <label className="text-white font-medium mt-2 mb-2">Link GitHub</label>    
                <Input 
                    type="url" 
                    placeholder="type url GitHub"
                    value={gitHub}
                    onChange={(e) => setGitHub(e.target.value)}
                />

                <button 
                    type="submit"
                    className="text-white bg-blue-600 h-9 rounded-md items-center justify-center flex mb-7"
                    >
                    Salvar Links
                </button>
            </form>
        </div>
    )
}