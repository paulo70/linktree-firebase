import { useEffect, useState } from "react";
import { Social } from "../../components/Social";
import {FaLinkedinIn, FaInstagram, FaGithub} from "react-icons/fa"

import {db} from "../../services/firebaseConnection"
import {
    getDocs,
    collection,
    orderBy,
    query,
    doc,
    getDoc
} from "firebase/firestore"
import { list } from "firebase/storage";
import { Link } from "react-router-dom";

interface LinksProps{
    id: string;
    name: string;
    url: string;
    bg: string;
    color: string;
}

interface SocialProps{
    linkedin: string;
    gitHub: string;
    instagram: string;
}

export function Home(){
    const [links, setLinks] = useState<LinksProps[]>([])
    const [socialLink, setSocialLink] = useState<SocialProps>()

    useEffect(() => {
        function getLinks(){
            const linkRef = collection(db, "links")
            const queryRef = query(linkRef, orderBy("created", "asc"))
            getDocs(queryRef)
            .then((snapshot) => {
               let list = [] as LinksProps[]

               snapshot.forEach((doc) => {
                 list.push({
                    id: doc.id,
                    name: doc.data().name,
                    bg: doc.data().bg,
                    color: doc.data().color,
                    url: doc.data().url
                 })
               })
               setLinks(list)
            })
            
        }

        getLinks()
    },[])

    useEffect(() => {
        function loadingSocial(){
            const docRef = doc(db, "links", "social")
            getDoc(docRef)
            .then((snapshot) => {
                if(snapshot.data() !== undefined){
                    setSocialLink({
                        linkedin: snapshot.data()?.linkedin,
                        instagram: snapshot.data()?.instagram,
                        gitHub: snapshot.data()?.gitHub

                    })
                }
            })
        }

        loadingSocial()
    },[])

    return (
        <div className="flex flex-col w-full py-4 items-center justify-center">
            <h1 className="md:text-4xl text-3xl font-bold text-white mt-20">Paulo Costa - Front-End Developer</h1>
            <span className="text-gray-50 mb-5 mt-3">Social Medias</span>

            <main className="flex flex-col w-11/12 max-w-xl text-center">
                {links.map((link) => (
                     <section
                     style={{backgroundColor: link.bg}} 
                     key={link.id} 
                     className={`${link.bg} mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer`}>
                        <Link to={link.url} target="_blank">
                            <p className="text-base md:text-lg" style={{color: link.color}}>
                                {link.name}
                            </p>
                        </Link>
                    </section>
                ))}

               
            </main>

            {socialLink && Object.keys(setSocialLink).length > 0 && (
                <footer className="flex justify-center gap-3 my-4">
                    <Social url={socialLink?.linkedin}>
                        <FaLinkedinIn size={35} color="#fff"/>
                    </Social>
                    <Social url={socialLink?.instagram}>
                        <FaInstagram size={35} color="#fff"/>
                    </Social>
                    <Social url={socialLink?.gitHub}>
                        <FaGithub size={35} color="#fff"/>
                    </Social>
                </footer>
            )}
        </div>
    )
}