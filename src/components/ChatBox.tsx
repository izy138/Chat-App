// 
// ChatBox.tsx
import { useEffect, useRef, useState } from "react";
import { query, collection, orderBy, onSnapshot, limit, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase/firebase';

// Define a type for the messages
interface Message {
  id: string;
  text: string;
  createdAt: any; // Using 'any' for serverTimestamp compatibility
  uid: string;
  name?: string;
  photoURL?: string;
}

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Query Firestore for messages
    const msgCollection = collection(db, "msgs");
    const q = query(
      msgCollection,
      orderBy("createdAt", "desc"),
      limit(50)
    );

    // Set up real-time listener
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedMessages: Message[] = [];
      querySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id } as Message);
      });

      // Sort messages by timestamp
      const sortedMessages = fetchedMessages.sort((a, b) => {
        // Handle serverTimestamp objects correctly
        const aTime = a.createdAt?.toMillis ? a.createdAt.toMillis() : a.createdAt;
        const bTime = b.createdAt?.toMillis ? b.createdAt.toMillis() : b.createdAt;
        return aTime - bTime;
      });

      setMessages(sortedMessages);
      
      // Auto-scroll to latest message
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    });
    
    // Clean up listener on unmount
    return () => unsubscribe();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (newMessage.trim() === "") {
      return; // Don't send empty messages
    }
    
    const currentUser = auth.currentUser;
    if (!currentUser) {
      console.error("No user is signed in");
      return;
    }
    
    const { uid, displayName, photoURL } = currentUser;
    
    try {
      // Add message to Firestore
      await addDoc(collection(db, "msgs"), {
        text: newMessage,
        name: displayName || "Anonymous User",
        photoURL: photoURL || null,
        createdAt: serverTimestamp(),
        uid,
      });
      
      // Clear input field
      setNewMessage("");
      
      // Scroll to bottom
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <main className="chat-box">
      <div className="messages-wrapper">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`message ${msg.uid === auth?.currentUser?.uid ? 'sent' : 'received'}`}
          >
            {msg.photoURL && (
              <img 
                className="avatar" 
                src={msg.photoURL} 
                alt={msg.name || "User"} 
              />
            )}
            <div className="message-content">
              <span className="user">{msg.name || "User"}</span>
              <p className="text">{msg.text}</p>
              <span className="time">
                {msg.createdAt?.toDate 
                  ? new Date(msg.createdAt.toDate()).toLocaleTimeString() 
                  : msg.createdAt
                    ? new Date(msg.createdAt).toLocaleTimeString()
                    : "Sending..."}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="send-message">
        <label htmlFor="messageInput" hidden>
          Enter Message
        </label>
        <input 
          id="messageInput"
          name="messageInput"
          type="text"
          className="form-input__input"
          placeholder="Type message..."
          value={newMessage}
          onChange={handleInputChange}
        />
        <button type="submit">Send</button>
      </form>
    </main>
  );
}