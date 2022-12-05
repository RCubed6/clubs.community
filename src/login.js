import './main.css'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { gapi } from "gapi-script";
import React, { useEffect } from 'react';
import jwt_decode from 'jwt-decode';

const clientId = "240774990043-ihvs4vgp5uohimrsrfbciig1st194a9n.apps.googleusercontent.com";

function Login(){

    // const profileData = React.useState(JSON.parse(localStorage.getItem("profileData")))
    const [profileText, setProfileText] = React.useState("Not Signed In");

    gapi.load("client:auth2", () => {
        gapi.client.init({
          clientId:
            clientId,
          plugin_name: "chat",
          scope: "https://www.googleapis.com/auth/cloud-platform"
        });
      });
    
    const handleSuccess = (res) => {
        let response = JSON.stringify(res);
        response = jwt_decode(response);
        localStorage.setItem("profileData", JSON.stringify(response));
        setProfileText("Signed in as: " + response["email"]);
        if (response["email"].includes("nuevaschool.org")){
            window.open("http://localhost:3000")
            window.close("http://localhost:3000/login")
        }
    };
      
    const handleFail = (err) => {
        console.log('failed', err);
    }

    return(
    <div className="login">
        {profileText}
        <GoogleOAuthProvider  
            clientId={clientId}
            buttonText="Sign In With Google"
        >
        <GoogleLogin
          onSuccess={handleSuccess}
          onFailure={handleFail}
        />
        </GoogleOAuthProvider>
    </div>
    );
}
export default Login;