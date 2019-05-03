import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Shop from './components/Shop';
import Cart from './components/Cart';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Navbar from "./components/navigation/Navbar";
import Footer from "./components/navigation/Footer";

class App extends Component {

    render() {
        return (
            <div className="item-app">
                <BrowserRouter>
                    <Navbar/>
                    <Route exact path='/' component={Home}/>
                    <Route path='/shop' component={Shop}/>
                    <Route path='/cart' component={Cart}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/signup' component={SignUp}/>
                    <Footer/>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
