import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Fragrances from './components/Fragrances';
import Cart from './components/Cart';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Root from './components/Root';
import Navbar from "./components/navigation/Navbar";
import Footer from "./components/navigation/Footer";

class App extends Component {

    render() {
        return (
            <div className="item-app">
                <BrowserRouter>
                    <Navbar/>
                    <Route exact path='/' component={Root}/>
                    <Route path='/store' component={Fragrances}/>
                    <Route path='/cart' component={Cart}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/sign-up' component={SignUp}/>
                    <Footer/>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
