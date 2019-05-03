import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {

    render() {
        return(
            <footer className="page-footer black">
                <div className="container">
                    <div className="row">
                        <div className="col l6 s12">
                            <h5 className="white-text">Support</h5>
                            <ul className="footer-ul">
                                <li>support@koreymadden.com</li>
                                <li>Call Toll-Free</li>
                                <li>+1 (888) 507-0220</li>
                                <li>Mon-Fri 9am-5pm EST</li>
                            </ul>
                        </div>
                        <div className="col l4 offset-l2 s12">
                            <h5 className="white-text">Customer Service</h5>
                            <ul>
                                <li><Link to="/" className="grey-text text-lighten-3" href="#">My Account</Link></li>
                                <li><Link to="/" className="grey-text text-lighten-3" href="#">Contact Us</Link></li>
                                <li><Link to="/" className="grey-text text-lighten-3" href="#">Shipping & Returns</Link></li>
                                <li><Link to="/" className="grey-text text-lighten-3" href="#">FAQ</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-copyright">
                    <div className="container">
                        © 2019 Copyright Korey Fragrance Project
                        <Link to="/" className="grey-text text-lighten-4 right more-link" href="#">Terms & Conditions</Link>
                        <Link to="/" className="grey-text text-lighten-4 right more-link" href="#">Privacy Policy</Link>
                    </div>
                </div>
            </footer>
        )
    };
}

export default Footer;