// import 'src/App.css';
import {auth} from "../firebase/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import GoogleSignInButton from "../components/google-button";
import { GoogleSignInButton } from "./GoogleButton"; // ✅ Curly braces = named import

export default function Welcome(){

    //popup for google sign in
    const googleSignIn = () =>{
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
    };

    return (
        <main className= "welcome">
            <h2>Welcome to Chat</h2>
            <h1>Izy138 Chat</h1>
            <p>Sign in with google to chat</p>
            <GoogleSignInButton onClick={googleSignIn} />
        </main>
    )


}   