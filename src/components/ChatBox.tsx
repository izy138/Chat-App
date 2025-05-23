import { useEffect, useRef, useState } from "react";
import { query, collection, orderBy, onSnapshot, limit, Querysnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export default function ChatBox() {

    //state variable
    const [messages, setMessages] = useState<any[]>([]);
    const scroll = useRef<HTMLSpanElement>(null);
 
    const getMessages: () => void = () => {
        const msgCollection = collection(db, "msgs");
        const q =  query(
            msgCollection,
            orderBy("createdAt", "desc"),
            limit(50)
        );

        const unsubscribe = onSnapshot(q, (Querysnapshot) => {
            console.log("QuerySnapshot =", Querysnapshot);

            const fetchedMessages: any[] = [];
            QuerySnapshot.forEach((doc) => {
                fetchedMessages.push({ ...doc.data(), id: doc.id });
            });
            console.log("fetchedMsgs = ", fetchedMessages);

            const sortedMessages = fetchedMessages.sort(
                (a,b) => a.createdAt - b.createdAt
            );       
            
            console.log("sortedMsgs = ", sortedMessages);

            setMessages(sortedMessages);
        });
    return () => unsubscribe;
    };

    useEffect(getMessages, [])

    return (
        <main className="chat-box">
            <div className="messages-wrapper"></div>
                <span ref = {scroll}>
                    <pre>{JSON.stringify(messages, null,2)}</pre>
                </span>
                <input> user input</input>
        </main>
    );
}