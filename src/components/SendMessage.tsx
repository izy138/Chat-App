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


// // import React, { useState } from "react";
// // import { auth, db } from "../firebase";
// // import { addDoc, collection, serverTimestamp } from "firebase/firestore";

// // const SendMessage = ({
// //   scroll,
// // }: {
// //   scroll: {
// //     current: { scrollIntoView: (arg0: { behavior: string }) => void };
// //   };
// // }) => {
// //   const [message, setMessage] = useState("");

// //   const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
// //     event.preventDefault();
// //     if (message.trim() === "") {
// //       alert("Enter valid message");
// //       return;
// //     }
// //     const { uid, displayName, photoURL } = auth.currentUser as {
// //       uid: string;
// //       displayName: string;
// //       photoURL: string;
// //     };
// //     await addDoc(collection(db, "messages"), {
// //       text: message,
// //       name: displayName,
// //       avatar: photoURL,
// //       createdAt: serverTimestamp(),
// //       uid,
// //     });
// //     setMessage("");
// //     scroll.current.scrollIntoView({ behavior: "smooth" });
// //   };
// //   return (
// //     <form onSubmit={(event) => sendMessage(event)} className="send-message">
// //       <label htmlFor="messageInput" hidden>
// //         Enter Message
// //       </label>
// //       <input
// //         id="messageInput"
// //         name="messageInput"
// //         type="text"
// //         className="form-input__input"
// //         placeholder="type message..."
// //         value={message}
// //         onChange={(e) => setMessage(e.target.value)}
// //       />
// //       <button type="submit">Send</button>
// //     </form>
// //   );
// // };

// // export default SendMessage;
