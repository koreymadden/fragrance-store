import React, { Component } from 'react';
import fire from './Fire';
import { Link } from 'react-router-dom';
import Logo from '../assets/mcmc.png';
import firebase from "firebase/app";
import GoogleLogo from '../assets/g-logo.png';
import TwitterLogo from '../assets/t-logo.png';

class Login extends Component{

    componentDidMount() {
        const txtEmail = document.getElementById('email');
        const txtPassword = document.getElementById('password');
        const btnLogin = document.getElementById('login-btn');
        const btnLogout = document.getElementById('logout-btn');

        btnLogin.addEventListener('click', e => {
            e.preventDefault();

            const email = txtEmail.value;
            const password = txtPassword.value;
            const promise = fire.auth().signInWithEmailAndPassword(email, password);

            promise.catch(e => {
                console.log(e.message)
            });
        });

        fire.auth().onAuthStateChanged(fireUser => {
            if(fireUser) {
                console.log("Login Page: " + fireUser.email);
                btnLogout.classList.remove('hide');
                btnLogin.classList.add('hide');
                window.location = "/";
            } else {
                console.log("Login.js: not logged in");
                btnLogout.classList.add('hide');
                btnLogin.classList.remove('hide');
            }
        });

        btnLogout.addEventListener('click', e => {
            fire.auth().signOut().then(() => {console.log("user logged out")});
        });
    }

    render () {
        var provider;

        function socialSignin(e) {
            if (e.target.dataset.provider === "google") {
                provider = new firebase.auth.GoogleAuthProvider();
            } else if (e.target.dataset.provider === "twitter") {
                provider = new firebase.auth.TwitterAuthProvider();
            }

            firebase.auth()
                .signInWithPopup(provider).then(function(result) {
                var token = result.credential.accessToken;
                var user = result.user;
                console.log(token);
                console.log(user)
            }).catch(function(error) {
                console.log(error.code);
                console.log(error.message)
            });
        }

        return (
            <div className="container">
                <div id="login-box" className="row">
                    <div className="row">
                        <img draggable="false" className="responsive-img no-select" src={Logo} alt="logo"/>
                    </div>
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="email" type="text" className="validate"/>
                                <label htmlFor="email">Email</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="password" type="password" className="validate"/>
                                    <label htmlFor="password">Password</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12">
                                <button className="btn red darken-2 width-100 z-depth-2" id="login-btn">Log In</button>
                                <div className="btn red hide red darken-2 width-100" id="logout-btn">Log Out</div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12 center">
                                <div data-provider="google" className="social-btn z-depth-2 valign-wrapper" onClick={socialSignin}>
                                    <img data-provider="google" className="google-img" src={GoogleLogo} alt="Google Logo"/>
                                    <span data-provider="google" className="g-span">Sign in with Google</span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12 center">
                                <div data-provider="twitter" className="social-btn z-depth-2 valign-wrapper" onClick={socialSignin}>
                                    <img data-provider="twitter" className="twitter-img" src={TwitterLogo} alt="Twitter Logo"/>
                                    <span data-provider="twitter" className="t-span">Sign in with Twitter</span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12 center">
                                <Link to='/signup'>Don't have an account? Sign Up</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;