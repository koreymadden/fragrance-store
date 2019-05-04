import React, { Component } from 'react';
import fire from "./Fire";

class SignUp extends Component{

    componentDidMount() {
        const btnSignUp = document.getElementById('signup-btn');
        btnSignUp.addEventListener('click', (e) => {
            e.preventDefault();

            const txtEmail = document.getElementById('email').value;
            const txtPassword = document.getElementById('password').value;
            const txtFirstName = document.getElementById('first_name').value;
            const txtLastName = document.getElementById('last_name').value;

            // if text field conditions are met attempt to create an account with email and password
            if (!txtFirstName.replace(/\s/g, '').length || !txtLastName.replace(/\s/g, '').length || !txtEmail.replace(/\s/g, '').length || !txtPassword.replace(/\s/g, '').length) {
                console.log("one or more fields does not contain a valid value");
                document.getElementById('signup-error-message').classList.remove('hide');
            } else {
                const displayName = txtFirstName;
                const promise = fire.auth().createUserWithEmailAndPassword(txtEmail, txtPassword);

                promise
                    .then(e => {
                        // set users firebase display name
                        e.user.updateProfile({displayName: displayName})
                            .then(() => {
                                console.log("updated profile");
                                // send email verification after display name is set
                                let uid = e.user.uid;
                                fire.database().ref("users").child(uid).child("firstName").set(txtFirstName);
                                fire.database().ref("users").child(uid).child("lastName").set(txtLastName);
                                e.user.sendEmailVerification()
                                    .then(() => {
                                        console.log("email verification sent")})})
                            .catch(e => {
                                console.log(e.message)})})
                    .catch(e => {
                        document.getElementById('signup-error-message').classList.remove('hide');
                        document.getElementById('signup-error-message').innerText = e.message;
                        console.log(e.message)});

            }
        });

        fire.auth().onAuthStateChanged(fireUser => {
            // go to homepage if there is a user signed in
            if(fireUser) {
                window.location = "/"
            }
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
                                <button className="btn red darken-2 width-100" id="signup-btn">Sign Up</button>
                                <div id="signup-error-message" className="center hide red-text darken-2">Please complete all fields.</div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default SignUp;