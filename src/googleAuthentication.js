import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import React, { useEffect } from "react";

const clientId = "240774990043-ihvs4vgp5uohimrsrfbciig1st194a9n.apps.googleusercontent.com"; //this is my specific client id

export function GoogleSignIn(){
    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: ''
            });
        };
        gapi.load('client:auth2', initClient);
    });

    const onSuccess = (res) => {
        console.log('success:', res.profileObj);
        localStorage.setItem("profileData", JSON.stringify(res.profileObj));
    };
    const onFailure = (err) => {
        console.log('failed:', err);
    };

    return (
    <GoogleLogin
        id="sign_in"
        clientId={clientId}
        buttonText="Sign in with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
    />
    );
}