import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Shop from './components/Shop';
import Cart from './components/Cart';
import Dashboard from './components/Dashboard';
import EditItem from './components/dashboard/EditItem';
import AddItem from './components/dashboard/AddItem';
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
                    <Route exact path='/dashboard' component={Dashboard}/>
                    <Route path='/dashboard/add' component={AddItem}/>
                    <Route path='/dashboard/edit' component={EditItem}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/signup' component={SignUp}/>
                    <Footer/>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
