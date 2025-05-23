// import "./App.css";
import { auth } from "./firebase";
import Welcome from "./components/Welcome";
import NavBar from "./components/NavBar";
import { useAuthState } from "react-firebase-hooks/auth";


export default function App(){
  const [user] = useAuthState(auth);
  console.log("user= ", user);

  return (
    <div className= "App">
      <NavBar/>
      {!user ? <Welcome /> : <div> show chat</div>}
      {/* <Welcome/>; */}
      </div>
  );
}