import { useEffect, useRef, useState } from "react";
import { query, collection, orderBy, onSnapshot, limit } from 'firebase/firestore';
import { db } from '../firebase';

export default function ChatBox() {

    //state variable
    const [messages, setMessages] = useState<any[]>([]);
    const scroll = useRef<HTMLSpanElement>(null);

    const getMessages = () => {
        const msgCollection = collection(db, "msgs");
        const q =  query(
            msgCollection,
            orderBy("createdAt", "desc"),
            limit(50)
        );
    }

    useEffect(getMessages, [])

    return (
        <main className="chat-box">
            <div className="messages-wrapper">
                <span ref = {scroll}> </span>
                <input> user input</input>

                
            
            </div> 
        </main>
    )
    
}