import React, { Component } from 'react';
import fire from 'firebase';
import { Link } from 'react-router-dom';
import Logo from '../assets/mcmc.png';

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
        return (
            <div className="container">
                <div id="login-box" className="row">
                    <div className="row">
                        <img className="responsive-img" src={Logo} alt="logo"/>
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
                                <button className="btn red darken-2 width-100" id="login-btn">Log In</button>
                                <div className="btn red hide red darken-2 width-100" id="logout-btn">Log Out</div>
                                <div className="center"><Link to='/sign-up'>Don't have an account? Sign Up</Link></div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;