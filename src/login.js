import './main.css'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { gapi } from "gapi-script";
import React, { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

//REPLACE IT HERE
const clientId = "240774990043-ihvs4vgp5uohimrsrfbciig1st194a9n.apps.googleusercontent.com";

function Login(){

    const [profileText, setProfileText] = React.useState("Not Signed In");
    const [googlePicture, setGooglePicture] = React.useState("");

    gapi.load("client:auth2", () => {
        gapi.client.init({
          clientId:
            clientId,
          plugin_name: "chat",
          scope: "https://www.googleapis.com/auth/cloud-platform"
        });
      });
    
    const handleSuccess = async googleData => {
      console.log(googleData.credential);
      axios.post('http://localhost:3001/googleloginapi', {
        headers: {'Access-Control-Allow-Origin':"*"}, 
        clientId: googleData.clientId,
        token: googleData.credential
      })
      .then((res) => {
        console.log(res);
        sessionStorage.setItem("profileData", JSON.stringify(res));
        setProfileText(res.data.email);
        setGooglePicture(res.data.picture);
      })
      .catch((err) => {
        console.error(err);
        alert(err.response.data);
      })
      // const res = await fetch('http://localhost:3001/cors', {
      //     mode:"cors",
      //     method: "POST",
      //     body: JSON.stringify({
      //     token: googleData.tokenId
      //   }),
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Access-Control-Allow-Origin":"*"
      //   }
      // })
      // const data = await res.json()

      // store returned user somehow
      // let response = JSON.stringify(res);
      // response = jwt_decode(response);
      // localStorage.setItem("profileData", JSON.stringify(response));
      // setProfileText("Signed in as: " + response["email"]);
      // if (response["email"].includes("nuevaschool.org")){
      //     window.open("http://localhost:3000")
      //     window.close("http://localhost:3000/login")
      // }
    };
      
    const handleFail = (err) => {
        console.log('failed', err);
    }
    
    if (sessionStorage.getItem("profileData")) {
      return(<Navigate replace to="/" />)
    } else {
      return(
      <div id="login">
        <h3>Sign In</h3>
        <div id="googleLogin">
            <GoogleOAuthProvider 
                id="googleButton"
                clientId={clientId}
                buttonText="Sign In With Google"
            >
            <GoogleLogin
              onSuccess={handleSuccess}
              onFailure={handleFail}
            />
            </GoogleOAuthProvider>
          <p id="loginCaption">Access is currently restricted to those with a nuevaschool.org email address</p>
        </div>
      </div>
      );
    }
}
export default Login;