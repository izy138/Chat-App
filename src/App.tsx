// import "./App.css";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Welcome from "./components/Welcome";
import NavBar from "./components/NavBar";
import ChatBox from "./components/ChatBox";



export default function App(){
  const [user] = useAuthState(auth);
  console.log("user= ", user);

  return (
    <div className= "App">
      <NavBar/>
      {!user ? <Welcome /> : <ChatBox />}
      </div>
  );
}