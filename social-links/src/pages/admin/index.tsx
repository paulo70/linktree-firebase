import { FormEvent, useEffect, useState } from "react";
import { Input } from "../../components/Input";
import { Header } from "../../components/header";
import { Link } from "react-router-dom";

import {
    addDoc, 
    collection, 
    onSnapshot, 
    query, 
    orderBy, 
    doc, 
    deleteDoc
} from "firebase/firestore"

import {db} from "../../services/firebaseConnection"

import {FiTrash} from "react-icons/fi"


interface LinksProps{
    id: string;
    name: string;
    url: string;
    bg: string;
    color: string;
}

export function Admin(){
    const [nameInput, setNameInput] = useState("")
    const [urlInput, setUrlInput] = useState("")
    const [textColorInput, setColorInput] = useState("#f1f1f1")
    const [backgroundColorInput, setBackgroundColorInput] = useState("#121212")
    const [links, setLinks] = useState<LinksProps[]>([])

    useEffect(() => {
        const linksRef = collection(db, "links")
        const queryRef = query(linksRef, orderBy("created", "asc"))

        const unsub = onSnapshot(queryRef, (snapshot) => {
            let list = [] as LinksProps []
            snapshot.forEach((doc) => {
                list.push({
                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url,
                    bg: doc.data().bg,
                    color: doc.data().color
                 })
            })

            setLinks(list)
        })

        return () => {
            unsub()
        }
    
    },[])
    
    
    function handleRegister(e:FormEvent){
        e.preventDefault()

        if(nameInput === "" || urlInput === ""){
            alert("You should filled all fields")
            return
        }

        addDoc(collection(db, "links"), {
            name: nameInput,
            url: urlInput,
            bg: backgroundColorInput,
            color: textColorInput,
            created: new Date()
        })
        .then(() => {
            setNameInput("")
            setUrlInput("")
            console.log("REGISTER WAS SUCCESSFULY")
        })
        .catch((error) => {
            console.log("ERROR REGISTER" + error)
        })
    }

    async function handleDeleteLinks(id:string){
        const docRef = doc(db, "links", id)
        
        await deleteDoc(docRef)
    }

    return (
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header/>
            <form onSubmit={handleRegister} className="flex flex-col mt-8 mb-3 w-full max-w-xl">
                <label className="text-white font-medium mt-2 mb-2">Type your name Link</label>
                <Input 
                    placeholder="type name your link" 
                    value={nameInput} 
                    onChange={(e) => setNameInput(e.target.value)}
                />
                <label className="text-white font-medium mt-2 mb-2">Type your URL Link</label>
                <Input 
                    placeholder="type your url"
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                />

                <section className="flex my-4 gap-5">
                    <div className="flex gap-2">
                        <label className="text-white font-medium mt-2 mb-2">Color Link</label>
                        <input 
                            type="color"
                            value={textColorInput} 
                            onChange={(e) => setColorInput(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-2">
                        <label className="text-white font-medium mt-2 mb-2">Background Link</label>
                        <input 
                            type="color"
                            value={backgroundColorInput} 
                            onChange={(e) => setBackgroundColorInput(e.target.value)}
                        />
                    </div>
                </section>

                {nameInput !== "" && (
                    <div className="flex flex-col justify-center mb-7 p-1 border-gray-100/25 border rounded-md">
                        <label className="text-white font-medium mt-2 mb-2">Preview Link:</label>
                        <article 
                            className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3"
                            style={{backgroundColor: backgroundColorInput, marginBottom: 8, marginTop: 8}}
                            >
                            <p 
                                style={{color: textColorInput, fontWeight: "bold"}}>
                                <Link target="_blank" to={urlInput}>{nameInput}</Link>
                            </p>
                        </article>
                    </div>
                )}

                <button 
                    className="mb-7 h-9 rounded-md bg-blue-700 px-2 py-8 font-medium text-white gap-4 flex justify-center items-center"
                    type="submit"
                    >
                    Register
                </button>

                <section>

                </section>
            </form>

            <h2 
                className="font-bold text-white mb-4 text-2x1">
                Social Links
            </h2>

            {links.map((link) => (
                <article
                    key={link.id} 
                    className="flex items-center justify-between w-11/12 max-w-xl mb-3 rounded py-3 px-2 select-none"
                    style={{backgroundColor: link.bg, color: link.color}}
                    >
                    <p>{link.name}</p>
                    <button className="border border-dashed p-1 rounded">
                        <FiTrash onClick={() => handleDeleteLinks(link.id)} size={18} color="#fff"/>
                    </button>
                </article>
            ))}
            
        </div>
    )
}