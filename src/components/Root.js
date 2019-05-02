import React, { Component } from 'react';
import fire from './Fire';
import Logo from '../assets/mcmc.png';

class Root extends Component{

    state = {
        displayName: ""
    };

    componentDidMount() {
        fire.auth().onAuthStateChanged(user => {
            let stateCopy = this.state;
            var displayName;

            if (user) {
                displayName = user.displayName;
                stateCopy.displayName = displayName;
                this.setState({
                    displayName: displayName
                });
            } else {
                displayName = "to Korey Fragrance";
                stateCopy.displayName = displayName;
                this.setState({
                    displayName: displayName
                });
            }
        });
    }

    render () {
        const displayName = this.state.displayName;
        return (
            <div>
                <div className="full-bg">
                    <div className="layer valign-wrapper">
                        <img className="center-block" src={Logo} alt="logo"/>
                    </div>
                </div>
                <div className="divider black home-bg-divider"/>
                <div className="container">
                    <div className="row">
                        <h1>Welcome {displayName}</h1>
                    </div>
                    <div className="row">
                        <div className="row">
                            <div className="col s12 m6 l4">
                                <div className="card">
                                    <div className="card-image">
                                            <div className="btn-floating halfway-fab red darken-2 no-select testimonial-btn">
                                                <i className="material-icons">format_quote</i>
                                            </div>
                                    </div>
                                    <div className="card-content">
                                        <span className="card-title">
                                            <i className="material-icons star-icon">star</i>
                                            <i className="material-icons star-icon">star</i>
                                            <i className="material-icons star-icon">star</i>
                                            <i className="material-icons star-icon">star</i>
                                            <i className="material-icons star-icon">star</i>
                                        </span>
                                        <p>I am a very simple card. I am good at containing small bits of information. I
                                            am convenient because I require little markup to use effectively.</p>
                                        <span className="testimonial-name center-block">Korey Madden</span>
                                        <span className="testimonial-title center-block">Business Owner</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col s12 m6 l4">
                                <div className="card">
                                    <div className="card-image">
                                        <div className="btn-floating halfway-fab red darken-2 no-select testimonial-btn">
                                            <i className="material-icons">format_quote</i>
                                        </div>
                                    </div>
                                    <div className="card-content">
                                        <span className="card-title">
                                            <i className="material-icons star-icon">star</i>
                                            <i className="material-icons star-icon">star</i>
                                            <i className="material-icons star-icon">star</i>
                                            <i className="material-icons star-icon">star</i>
                                            <i className="material-icons star-icon">star</i>
                                        </span>
                                        <p>I am a very simple card. I am good at containing small bits of information. I
                                            am convenient because I require little markup to use effectively.</p>
                                        <span className="testimonial-name center-block">Korey Madden</span>
                                        <span className="testimonial-title center-block">Business Owner</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col l4 hide-on-med-and-down">
                                <div className="card">
                                    <div className="card-image">
                                        <div className="btn-floating halfway-fab red darken-2 no-select testimonial-btn">
                                            <i className="material-icons">format_quote</i>
                                        </div>
                                    </div>
                                    <div className="card-content">
                                        <span className="card-title">
                                            <i className="material-icons star-icon">star</i>
                                            <i className="material-icons star-icon">star</i>
                                            <i className="material-icons star-icon">star</i>
                                            <i className="material-icons star-icon">star</i>
                                            <i className="material-icons star-icon">star</i>
                                        </span>
                                        <p>I am a very simple card. I am good at containing small bits of information. I
                                            am convenient because I require little markup to use effectively.</p>
                                        <span className="testimonial-name center-block">Korey Madden</span>
                                        <span className="testimonial-title center-block">Business Owner</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Root;