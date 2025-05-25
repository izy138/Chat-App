import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../firebase/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { GoogleSignInButton } from "./GoogleButton";

export default function NavBar() {
  const [user] = useAuthState(auth);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const signOut = () => {
    auth.signOut();
  };

  return (
    <nav className="navbar">
      <h1>Izy Chat</h1>
      {user ? (
        <button className="sign-out" onClick={signOut}>
          Sign Out
        </button>
      ) : (
        <GoogleSignInButton onClick={googleSignIn} />
      )}
    </nav>
  );
}
