import React, {Component} from 'react';
import fire from './Fire';
import Logo from '../assets/mcmc.png';
import {Link} from "react-router-dom";

class Home extends Component {

    state = {
        displayName: ""
    };

    componentDidMount() {
        fire.auth().onAuthStateChanged(user => {
            let stateCopy = this.state;
            let displayName;

            // if user is signed in show their display name
            if (user) {
                displayName = user.displayName;
                stateCopy.displayName = displayName;
                this.setState({
                    displayName: displayName
                });
            } else {
                displayName = "to MCMC Shop";
                stateCopy.displayName = displayName;
                this.setState({
                    displayName: displayName
                });
            }
        });
    }

    render() {
        const displayName = this.state.displayName + "!";

        return (
            <div>
                <div className="full-bg">
                    <div className="layer valign-wrapper">
                        <img draggable="false" className="center-block responsive-img home-bg-logo no-select" src={Logo} alt="logo"/>
                    </div>
                </div>
                <div className="divider black home-bg-divider"/>
                <div className="container">
                    <div className="row">

                        <h1>Welcome {displayName}</h1>

                    </div>
                    <div className="row">

                        <div className="col s12 m4">
                            <div className="icon-block">
                                <h2 className="center red-text text-darken-2"><i
                                    className="feat-icon material-icons">local_shipping</i></h2>
                                <h5 className="center">Free Shipping</h5>

                                <p className="light">We did most of the heavy lifting for you to provide a default
                                    stylings that incorporate our custom components. Additionally, we refined animations
                                    and transitions to provide a smoother experience for developers.</p>
                            </div>
                        </div>

                        <div className="col s12 m4">
                            <div className="icon-block">
                                <h2 className="center red-text text-darken-2"><i
                                    className="feat-icon material-icons">group</i></h2>
                                <h5 className="center">Community</h5>

                                <p className="light">By utilizing elements and principles of Material Design, we were
                                    able to create a framework that incorporates components and animations that provide
                                    more feedback to users.</p>
                            </div>
                        </div>

                        <div className="col s12 m4">
                            <div className="icon-block">
                                <h2 className="center red-text text-darken-2"><i
                                    className="feat-icon material-icons">attach_money</i></h2>
                                <h5 className="center">Discount Prices</h5>

                                <p className="light">We have provided detailed documentation as well as specific code
                                    examples to help new users get started. We are also always open to feedback and can
                                    answer any questions a user may have about Materialize.</p>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="divider"/>
                <div className="row valign-wrapper fragrance-brands no-margin">
                    <div className="col s6 m4 l2 center" id="versace-wrapper">
                        <img id="versace" className="all-brand-logos margin-center no-select" draggable="false"
                             src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Versace_logo.svg/1280px-Versace_logo.svg.png"
                             alt="Versace"/>
                    </div>
                    <div className="col s6 m4 l2 center" id="dior-wrapper">
                        <img id="dior" className="all-brand-logos margin-center no-select" draggable="false"
                             src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Dior_Logo.svg/1280px-Dior_Logo.svg.png"
                             alt="Dior"/>
                    </div>
                    <div className="col s4 l2 hide-on-small-and-down center no-select" id="ysl-wrapper">
                        <img id="ysl" className="all-brand-logos margin-center hide-on-small-and-down" draggable="false"
                             src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Yves_Saint_Laurent_Logo.svg/1280px-Yves_Saint_Laurent_Logo.svg.png"
                             alt="Yves Saint Laurent"/>
                    </div>
                    <div className="col s4 l2 center hide-on-med-and-down center no-select" id="dandg-wrapper">
                        <img id="dandg" className="all-brand-logos margin-center hide-on-med-and-down" draggable="false"
                             src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Dolce_and_Gabbana.svg/1280px-Dolce_and_Gabbana.svg.png"
                             alt="Dolce & Gabbana"/>
                    </div>
                    <div className="col s4 l2 center hide-on-med-and-down no-select" id="chanel-wrapper">
                        <img id="chanel" className="all-brand-logos margin-center hide-on-med-and-down" draggable="false"
                             src="https://upload.wikimedia.org/wikipedia/commons/3/35/Chanel_logo.svg"
                             alt="Chanel"/>
                    </div>
                    <div className="col s4 l2 center hide-on-med-and-down no-select" id="givenchy-wrapper">
                        <img id="givenchy" className="all-brand-logos margin-center hide-on-med-and-down" draggable="false"
                             src="https://upload.wikimedia.org/wikipedia/commons/3/30/Logo_givenchy.png"
                             alt="Givenchy"/>
                    </div>
                </div>
                <div className="divider"/>

                <div className="container">
                    <div className="row add-margin-top">

                        <div className="col s12 m6">
                            <div className="card z-depth-5">
                                <div className="card-image waves-effect waves-block waves-light">
                                    <img className="activator" draggable="false"
                                         src="https://dimg.dillards.com/is/image/DillardsZoom/mainProduct/viktor--rolf-spicebomb-eau-de-toilette-spray/04122364_zi.jpg"
                                         alt="men fragrances"/>
                                </div>
                                <div className="divider male-female-divider"/>
                                <div className="card-content">
                                <span className="card-title activator grey-text text-darken-4">
                                    Men
                                    <i className="material-icons right no-select">more_vert</i>
                                </span>
                                    <p><Link to="/shop">Shop Men Fragrances</Link></p>
                                </div>
                                <div className="card-reveal">
                                <span className="card-title grey-text text-darken-4">
                                    Products for Men
                                    <i className="material-icons right no-select">close</i>
                                </span>
                                    <p>Here is some more information about this product that is only revealed once
                                        clicked on.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col s12 m6">
                            <div className="card z-depth-5">
                                <div className="card-image waves-effect waves-block waves-light">
                                    <img className="activator" draggable="false"
                                         src="https://dimg.dillards.com/is/image/DillardsZoom/mainProduct/viktor--rolf-flowerbomb-eau-de-parfum-spray/02729059_zi.jpg"
                                         alt="men fragrances"/>
                                </div>
                                <div className="divider male-female-divider"/>
                                <div className="card-content">
                                <span className="card-title activator grey-text text-darken-4">
                                    Women
                                    <i className="material-icons right no-select">more_vert</i>
                                </span>
                                    <p><Link to="/shop">Shop Women Fragrances</Link></p>
                                </div>
                                <div className="card-reveal">
                                <span className="card-title grey-text text-darken-4">
                                    Products for Women
                                    <i className="material-icons right no-select">close</i>
                                </span>
                                    <p>Here is some more information about this product that is only revealed once
                                        clicked on.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="row">

                        <div className="col s12 m4">
                            <div className="icon-block">
                                <h2 className="center red-text text-darken-2"><i
                                    className="feat-icon material-icons">local_shipping</i></h2>
                                <h5 className="center">Free Shipping</h5>

                                <p className="light">We did most of the heavy lifting for you to provide a default
                                    stylings that incorporate our custom components. Additionally, we refined animations
                                    and transitions to provide a smoother experience for developers.</p>
                            </div>
                        </div>

                        <div className="col s12 m4">
                            <div className="icon-block">
                                <h2 className="center red-text text-darken-2"><i
                                    className="feat-icon material-icons">group</i></h2>
                                <h5 className="center">Community</h5>

                                <p className="light">By utilizing elements and principles of Material Design, we were
                                    able to create a framework that incorporates components and animations that provide
                                    more feedback to users.</p>
                            </div>
                        </div>

                        <div className="col s12 m4">
                            <div className="icon-block">
                                <h2 className="center red-text text-darken-2"><i
                                    className="feat-icon material-icons">attach_money</i></h2>
                                <h5 className="center">Discount Prices</h5>

                                <p className="light">We have provided detailed documentation as well as specific code
                                    examples to help new users get started. We are also always open to feedback and can
                                    answer any questions a user may have about Materialize.</p>
                            </div>
                        </div>

                    </div>
                    <div className="row testimonial-cards-wrapper">

                        <div className="col s12 m6 l4">
                            <div className="card testimonial-card z-depth-2">
                                <div className="card-image">
                                    <div className="btn-floating halfway-fab red darken-2 no-select testimonial-btn">
                                        <i className="material-icons">format_quote</i>
                                    </div>
                                </div>
                                <div className="card-content">
                                        <span className="card-title no-select">
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
                            <div className="card testimonial-card z-depth-2">
                                <div className="card-image">
                                    <div className="btn-floating halfway-fab red darken-2 no-select testimonial-btn">
                                        <i className="material-icons">format_quote</i>
                                    </div>
                                </div>
                                <div className="card-content">
                                        <span className="card-title no-select">
                                            <i className="material-icons star-icon">star</i>
                                            <i className="material-icons star-icon">star</i>
                                            <i className="material-icons star-icon">star</i>
                                            <i className="material-icons star-icon">star</i>
                                            <i className="material-icons star-icon">star</i>
                                        </span>
                                    <p>I am a very simple card. I am good at containing small bits of information. I
                                        am convenient because I require little markup to use effectively.</p>
                                    <span className="testimonial-name center-block">Robert Sieradzki</span>
                                    <span className="testimonial-title center-block">Data Analyst</span>
                                </div>
                            </div>
                        </div>

                        <div className="col l4 hide-on-med-and-down">
                            <div className="card testimonial-card">
                                <div className="card-image">
                                    <div className="btn-floating halfway-fab red darken-2 no-select testimonial-btn">
                                        <i className="material-icons">format_quote</i>
                                    </div>
                                </div>
                                <div className="card-content">
                                        <span className="card-title no-select">
                                            <i className="material-icons star-icon">star</i>
                                            <i className="material-icons star-icon">star</i>
                                            <i className="material-icons star-icon">star</i>
                                            <i className="material-icons star-icon">star</i>
                                            <i className="material-icons star-icon">star</i>
                                        </span>
                                    <p>I am a very simple card. I am good at containing small bits of information. I
                                        am convenient because I require little markup to use effectively.</p>
                                    <span className="testimonial-name center-block">Alex Newman</span>
                                    <span className="testimonial-title center-block">Chauffeur</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default Home;