// import { auth } from '../firebase/firebase';
// import { useAuthState } from "react-firebase-hooks/auth";
// import { MessageDoc } from "./send-message";

// export default function Message({
//   message,
// }: {
//   message: Pick<MessageDoc, "uid" | "avatar" | "name" | "text">;
// }) {
//   const [user] = useAuthState(auth);

//   return (
//     <div className={`chat-bubble ${message.uid === user?.uid ? "right" : ""}`}>
//       <img
//         className="chat-bubble__left"
//         src={message?.avatar ?? ""}
//         alt="user avatar"
//       />
//       <div className="chat-bubble__right">
//         <p className="user-name">{message.name}</p>
//         <p className="user-message">{message.text}</p>
//       </div>
//     </div>
//   );
// }

//render a message
import { auth } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Message = ({
  message,
}: {
  message: {
    uid: string;
    avatar: string;
    name: string;
    text: string;
  };
}) => {
  const [user] = useAuthState(auth);
  return (
    <div className={`chat-bubble ${message.uid === user?.uid ? "right" : ""}`}>
      <img
        className="chat-bubble__left"
        src={message.avatar}
        alt="user avatar"
      />
      <div className="chat-bubble__right">
        <p className="user-name">{message.name}</p>
        <p className="user-message">{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
