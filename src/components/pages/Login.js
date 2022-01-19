import React, {} from "react"

import {GoogleLogin, GoogleLogout} from 'react-google-login'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import AppleLogin from 'react-apple-login'
import TwitterLogin from 'react-twitter-login'

function Login() {

  function handleGoogleCallback(response) {
    console.log("GOOGLE LOGIN", response)
  }

  function handleGoogleLogoutCallback(response) {
    console.log("GOOGLE LOGOUT", response)
  }

  function responseFacebook(response) {
    console.log(response)
  }

  function responseTwitter(err, data) {
    console.log(err, data)
  }

  return (
    <div style={{
      backgroundColor: "#8ad3ed",
      height: "2000px"
    }}>
      <div className="container p-2 border rounded bg-light">
        <div className="bd-pink-400 text-white border rounded mb-2">
          <h1 className="text-center">Welcome To Goplay Plugins Glosary</h1>
        </div>

        <div className="row">
          <div className="col-12">
            {/* <GoogleLogin
              clientId="334886517586-djci4jil803sqjk042f6nne3016bngni.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={handleGoogleCallback}
              onFailure={handleGoogleCallback}
              cookiePolicy={'single_host_origin'}
              render={renderProps => (
                <button className="btn btn-block btn-light" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                  <i className="fab fa-google text-primary"></i> Login With Google
                </button>
              )}
            /> */}
            <GoogleLogin
              clientId="1001397782757-5f0dh37iqlpv484fn1qn7qqgl94124ug.apps.googleusercontent.com"
              buttonText="Login 2"
              onSuccess={handleGoogleCallback}
              onFailure={handleGoogleCallback}
              cookiePolicy={'single_host_origin'}
              render={renderProps => (
                <button className="btn btn-block btn-light" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                  <i className="fab fa-google text-primary"></i> Login With Google
                </button>
              )}
            />
            {/* <GoogleLogout
              clientId="334886517586-djci4jil803sqjk042f6nne3016bngni.apps.googleusercontent.com"
              buttonText="Logout"
              onLogoutSuccess={handleGoogleLogoutCallback}
              onFailure={handleGoogleLogoutCallback}
              render={renderProps => (
                <button className="btn btn-block btn-light" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                  <i className="fab fa-google text-danger"></i> Logout From Google
                </button>
              )}
            /> */}
            <GoogleLogout
              clientId="1001397782757-5f0dh37iqlpv484fn1qn7qqgl94124ug.apps.googleusercontent.com"
              buttonText="Logout 2"
              onLogoutSuccess={handleGoogleLogoutCallback}
              onFailure={handleGoogleLogoutCallback}
              render={renderProps => (
                <button className="btn btn-block btn-light" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                  <i className="fab fa-google text-danger"></i> Logout From Google
                </button>
              )}
            />
            <FacebookLogin
              appId="1050889079041740"
              autoLoad={true}
              fields="name,email,picture"
              scope="public_profile,email"
              callback={responseFacebook}
              render={renderProps => (
                <button className="btn btn-block btn-light" onClick={renderProps.onClick}>
                  <i className="fab fa-facebook text-primary"></i> Login With FaceBook
                </button>
              )}
            />
            {/* <div id="appleid-signin" data-color="black" data-border="true" data-type="sign in"></div> */}
            <AppleLogin
              clientId="2.apple.login.test"
              redirectURI="https://go-animapu.herokuapp.com/2/account/apple/callback"
              scope="name%20email"
              responseType="code%20id_token"
              responseMode="form_post"
              render={renderProps => (
                <button className="btn btn-block btn-light" onClick={renderProps.onClick}>
                  <i className="fab fa-apple text-primary"></i> Login With Apple
                </button>
              )}
            />
            <AppleLogin
              clientId="2.apple.login.test"
              redirectURI="https://go-animapu.herokuapp.com/2/account/apple/callback/redirect"
              scope="name%20email"
              responseType="code%20id_token"
              responseMode="form_post"
              render={renderProps => (
                <button className="btn btn-block btn-light" onClick={renderProps.onClick}>
                  <i className="fab fa-apple text-primary"></i> Login With Apple With Redir
                </button>
              )}
            />
            <TwitterLogin
              authCallback={responseTwitter}
              consumerKey={"sKg9AyClMaDWw56uo5eBt57Qk"}
              consumerSecret={"KZosfxHqFXijiZgFv4WaypxosSruO9zE4333T2Jqu5pzW5G20w"}
              children={
                <button className="btn btn-block btn-light mt-2">
                  <i className="fab fa-twitter text-primary"></i> Login With Twitter
                </button>
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
