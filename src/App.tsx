// import "./App.css";
import { auth } from "./firebase";
import Welcome from "./components/welcome";
import NavBar from "./components/nav-bar";
import { useAuthState } from "react-firebase-hooks/auth";


export default function App(){
  const [user] = useAuthState(auth);
  console.log("user= ", user);

  return (
    <div className= "App">
      <NavBar/>;
      <Welcome/>;
      </div>
  );
}