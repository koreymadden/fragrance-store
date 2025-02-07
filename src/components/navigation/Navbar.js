import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import fire from "../Fire";

class Navbar extends Component {

    state = {
        email: null,
        name: null
    };

    componentDidMount() {
        const dashboardBtn = document.getElementById("dashboard-nav");
        const logoutBtn = document.getElementById("logout-nav");
        const loginBtn = document.getElementById("login-nav");

        fire.auth().onAuthStateChanged(user => {
            let stateCopy = this.state;

            if (user) {
                if (user.uid === "zXDFWiVo4OYeLZHguHCwdG6M5KV2") {
                    console.warn("administrator");
                    dashboardBtn.classList.remove("hide");
                } else {
                    console.warn("not administrator");
                }
                logoutBtn.classList.remove("hide");
                loginBtn.classList.add("hide");
                let userEmail = fire.auth().currentUser.email;
                let userName = fire.auth().currentUser.displayName;
                stateCopy.email = userEmail;
                this.setState({
                    email: userEmail,
                    name: userName
                })
            } else {
                logoutBtn.classList.add("hide");
                loginBtn.classList.remove("hide");
                let userEmail = "";
                let userName = "";
                stateCopy.email = userEmail;
                this.setState({
                    email: userEmail,
                    name: userName
                })
            }
        });

        logoutBtn.addEventListener('click', e => {
            fire.auth().signOut();
            window.location = "/login"
        });
    }

    render() {
        return(
            <nav className="nav-wrapper black lighten-1">
                <div className="container">
                    <ul className="nav-ul">
                        <li><NavLink exact to="/">Home</NavLink></li>
                        <li><NavLink to="/shop">Shop</NavLink></li>
                        <li><NavLink to="/cart">Cart</NavLink></li>
                        <li className="hide" id="dashboard-nav"><NavLink to="/dashboard">Dashboard</NavLink></li>
                        <li className="right" id="login-nav"><NavLink to="/login">Login</NavLink></li>
                        <li className="right hide" id="logout-nav"><button className="button-a">Logout</button></li>
                    </ul>
                </div>
            </nav>
        )
    };
}

export default Navbar;