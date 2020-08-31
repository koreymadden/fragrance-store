import React, { Component } from 'react';
import fire from './Fire';
import { Link } from 'react-router-dom';

class Cart extends Component {

    state = {
        logStatus: false
    };

    componentDidMount() {
        // determine if the user is logged in or not
        fire.auth().onAuthStateChanged(user => {
            if (user) {
                this.uid = user.uid;
                this.signInTime = user.metadata.lastSignInTime;
                this.setState({
                    logStatus: true
                });
                console.log('logged in on cart page', this.uid);
            } else {
                this.uid = 'notsignedin';
                this.setState({
                    logStatus: false
                });
                console.log('not logged in on cart page', this.uid);
            }
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <h1>Dashboard</h1>
                </div>
                <div className="divider"/>
                    <Link className="dashboard-link row no-margin category-row block" to="/dashboard/add">
                        <h2><i className="material-icons icon-text">add</i><span className="icon-text">&nbsp;Add New Item</span></h2>
                    </Link>
                <div className="divider"/>
                    <Link className="dashboard-link row no-margin category-row block" to="/dashboard/edit">
                        <h2><i className="material-icons icon-text">layers</i><span className="icon-text">&nbsp;Edit Item</span></h2>
                    </Link>
                <div className="divider"/>
                    <Link className="dashboard-link row no-margin category-row block" to="/dashboard/other">
                        <h2><i className="material-icons icon-text">vpn_key</i><span className="icon-text">&nbsp;Permissions</span></h2>
                    </Link>
                <div className="divider"/>    
                    <Link className="dashboard-link row no-margin category-row block" to="/dashboard/other">
                        <h2><i className="material-icons icon-text">clear_all</i><span className="icon-text">&nbsp;Other Options</span></h2>
                    </Link>
                <div className="divider"/>
                <div className="row" style={{marginBottom: 0}}>
                    <div className="col s12">
                        <p>Last signed in on: {this.signInTime}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Cart;