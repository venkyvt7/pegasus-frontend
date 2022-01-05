import React, { useEffect, useState } from 'react';
import { GoogleLogin } from 'react-google-login';

function LoginGoogle() {
    const [isLoggedIn, setIsLoggedIn] = useState(window.localStorage.getItem("googleId") ? true : false);

    useEffect(() => {}, [isLoggedIn])

    function successResponse(response) {
        console.log(response);
        window.localStorage.setItem("googleId", response.googleId);
        window.localStorage.setItem("token", response.tokenId)
        setIsLoggedIn(true);
    }

    function failureResponse(response) {
        // window.localStorage.setItem("googleId", "102636063375093927481");
        // window.localStorage.setItem("token", "102636063375093927481")
        setIsLoggedIn(false);
    }

    function logout() {
        setIsLoggedIn(false);
        window.localStorage.removeItem("googleId");
        window.localStorage.removeItem("token");
    }

    return (
        <div>
            {!isLoggedIn && <GoogleLogin
                clientId="99372715003-humskopmhidam8afoqi2r4hklneh02sf.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={successResponse}
                onFailure={failureResponse}
                
            />}
            {
                isLoggedIn && <button onClick={logout}>Logout</button>
            }

        </div>
    )
}

export default LoginGoogle;