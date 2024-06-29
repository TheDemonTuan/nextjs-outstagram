"use client";
import React from "react";
import { signInWithPopup, FacebookAuthProvider, getAdditionalUserInfo } from "firebase/auth";
import { auth, provider } from "@/firebase";

const HighlightTextarea = () => {

  const handleLogin = async () => {
    const result = await signInWithPopup(auth, provider);

    // The signed-in user info.
    const user = result.user;
    // This gives you a Facebook Access Token.
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;

    // The signed-in user info.
    console.log(user);
    console.log(token);
    
  }

  return (
    <div>
      <button onClick={handleLogin}>Login with Facebook</button>
    </div>
  )
};

export default HighlightTextarea;
