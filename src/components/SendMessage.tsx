// import { useState } from "react";
// import { auth, db } from '../firebase';
// import { addDoc, collection, serverTimestamp } from "firebase/firestore";

// interface SendMessageProps {
//     messagesEndRef: React.RefObject<HTMLDivElement>;
// }

// const SendMessage = ({ messagesEndRef }: SendMessageProps) => {
// //     current: { scrollIntoView: (arg0: { behavior: string }) => void };
// //     };
// // }) => {
//     const [message, setMessage] = useState("");

//     const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
//         console.log("sendmessage");
//         event.preventDefault;

//         //no empty messages
//         if(message.trim() === ""){
//             return;
//         }
//         //checks for user sign in
//         const currentUser = auth.currentUser;
//         if(!currentUser) {
//             console.error("No user signed in");
//             return;
//         }

//         const { uid,displayName, photoURL} = currentUser;
//         // console.log("currentUser =", currentUser)

//         try {
//             //adds message to firestore
//             await addDoc(collection(db,"msgs"), {
//                 text: message,
//                 name: displayName || "Anonymous User",
//                 photoURL: photoURL || null,
//                 createdAt: serverTimestamp(),
//                 uid,
//             });

//             //clears message input field
//             setMessage("");

//             // scroll to bottom
//             if(messagesEndRef.current) {
//                 messagesEndRef.current.scrollIntoView({ behavior: "smooth"});
//             }
//         }catch (error) {
//             console.error("Error sending message:", error);
//         }
//     };
//     return (
//         <form onSubmit={sendMessage} className="send-message">
//             <label htmlFor="messageInput" hidden>
//             Enter Message
//             </label>
//             <input
//                 id="messageInput"
//                 name="messageInput"
//                 type="text"
//                 className="form-input__input"
//                 placeholder="type message..."
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//             />
//             <button type="submit">Send</button>
//         </form>
//     );
// };

// export default SendMessage;

import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { auth, db } from "../firebase/firebase";

type MessageDoc = {
  id?: string;
  avatar?: string | null;
  createdAt: any;
  uid?: string | null;
  name?: string | null;
  text: string;
};

export default function SendMessage({
  scroll,
}: {
  scroll: React.RefObject<HTMLSpanElement | null>;
}) {
  // state
  const [message, setMessage] = useState<string>("");

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentUser = auth.currentUser;
    // 1. trim message for white space at front and back
    if (message.trim() === "") return alert("enter valid message please...");

    // 2. create document structure
    const messageDoc: MessageDoc = {
      avatar: currentUser?.photoURL,
      createdAt: serverTimestamp(),
      uid: currentUser?.uid,
      name: currentUser?.displayName,
      text: message,
    };
    // 3. addDoc
    const messagesCollection = collection(db, "messages");
    await addDoc(messagesCollection, messageDoc);

    setMessage("");

    scroll.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <form className="send-message" onSubmit={(e) => sendMessage(e)}>
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="form-input__input"
        placeholder="type message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}
