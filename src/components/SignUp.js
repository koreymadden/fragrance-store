import React, { Component } from 'react';
import fire from "./Fire";

class SignUp extends Component{

    componentWillMount() {
        fire.auth().onAuthStateChanged(fireUser => {
            if(fireUser) {
                window.location = "/"
            }
        });
    }

    componentDidMount() {
        const btnSignUp = document.getElementById('signup-btn');
        btnSignUp.addEventListener('click', e => {
            const txtEmail = document.getElementById('email').value;
            const txtPassword = document.getElementById('password').value;
            const txtFirstName = document.getElementById('first_name').value;
            const txtLastName = document.getElementById('last_name').value;

            const displayName = txtFirstName + " " + txtLastName;
            const promise = fire.auth().createUserWithEmailAndPassword(txtEmail, txtPassword);

            promise.then(e => {
                e.user.updateProfile({displayName: displayName})
                    .then(() => {console.log("updated profile")}).catch(e => console.log(e.message));
                e.user.sendEmailVerification()
                    .then(() => {
                        console.log("email verification sent");
                        window.location = "/"
                    })
            }).catch(e => {console.log(e.message)})
        })
    }

    render () {
        return (
            <div className="container">
                <div className="row" id="signup-box">
                    <div className="row">
                        <h1>Sign Up</h1>
                    </div>
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="first_name" type="text" className="validate"/>
                                <label htmlFor="first_name">First Name</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="last_name" type="text" className="validate"/>
                                <label htmlFor="last_name">Last Name</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="email" type="email" className="validate"/>
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
                                <div className="btn red darken-2 width-100" id="signup-btn">Sign Up</div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default SignUp;