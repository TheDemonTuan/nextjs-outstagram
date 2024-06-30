"use client";
import React from "react";
import { signInWithPopup, FacebookAuthProvider, getAdditionalUserInfo, GithubAuthProvider } from "firebase/auth";
import { auth, githubProvider } from "@/firebase";

const HighlightTextarea = () => {

  const handleLogin = async () => {
    const result = await signInWithPopup(auth, githubProvider);

    // The signed-in user info.
    const user = result.user;
    // This gives you a Facebook Access Token.
    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;

    // The signed-in user info.
    console.log(user);
    console.log(token);
    
  }

  return (
    <div>
      <button onClick={handleLogin}>Login with Github</button>
    </div>
  )
};

export default HighlightTextarea;
