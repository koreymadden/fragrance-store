import React, { Component } from 'react';
import fire from './Fire';
import { Link } from 'react-router-dom';

class Cart extends Component {

    state = {
        cart: [],
        logStatus: false
    };

    componentDidMount() {
        // determine if the user is logged in or not
        fire.auth().onAuthStateChanged(user => {
            if (user) {
                console.log('logged in on cart page');
                this.uid = user.uid;
                this.setState({
                    logStatus: true
                })
            } else {
                console.log('not logged in on cart page');
                this.uid = 'notsignedin';
                this.setState({
                    logStatus: false
                })
            }

            this.cartItemsPath = fire.database().ref("cart").child(this.uid).child("items");
            this.cartTotalPath = fire.database().ref("cart").child(this.uid).child("total");
            let total = 0;

            // set initial state of the cart
            this.cartItemsPath.on('child_added', snapshot => {
                if (window.location.pathname === "/cart") {
                    let id = snapshot.key;
                    let image = snapshot.val().image;
                    let name = snapshot.val().name;
                    let price = snapshot.val().price;
                    let quantity = snapshot.val().quantity;
                    let subtotal = snapshot.val().subtotal;
                    
                    total = total + subtotal;

                    let stateCopy = this.state.cart;
                    let item = {
                        id,
                        image,
                        name,
                        price,
                        quantity,
                        subtotal
                    };
                    stateCopy.push(item);
                    this.setState({
                        cart: stateCopy
                    })
                } else {
                    console.warn('Why is this running on the shop page?', snapshot.val());
                    return
                }

            });

            this.cartTotalPath.set(total).then(() => {
                this.updateDocVals("calculated-total-num", "innerText", total);
            });
        });
    }

    removeFromCart = (item) => {
        // removes items from current cart
        if (this.state.logStatus) {
            this.uid = fire.auth().currentUser.uid;
        } else {
            const id = 'notsignedin';
            console.log('removing from cart when not signed in');
            this.uid = id;
        }

        this.cartItemsPath.child(item.id).remove().then(() => {
            this.getCurrentCart();
            let total = 0;

            this.state.cart.forEach(item => {
                total = total + item.subtotal;
            });

            this.cartTotalPath.set(total).then(() => {
                this.updateDocVals("calculated-total-num", "innerText", total);
            });
        }).catch(e => {
            console.log(e.message)
        });
    };
    
    updateDocVals = (id, prop, val) => {
        // easy way to update the DOM
        switch (id) {
            case "_example":
                // do something
                break;
            default:
                document.getElementById(id)[prop] = val;
                console.log(`document.getElementById(${id}).${prop} = ${val}`);
        }
    }

    getCurrentCart = () => {
        // updates the state from firebase to reflect the current cart
        console.log("getting current cart...");
        
        this.cartItemsPath.once('value', snapshot => {            
            let databaseItems = snapshot.val();
            let cart = [];
            
            for (let key in databaseItems) {
                cart.push(databaseItems[key]);
            }

            this.setState({
                cart
            })
        });
    }

    render() {
        const cartList = this.state.cart.map(cartItem => {
            return (
                <div key={cartItem.id}>
                    <div className="row no-margin details-row">
                        <div className="col s2">
                            <img className="responsive-img" src={cartItem.image} alt={cartItem.name}/>
                        </div>
                        <div className="col s4">
                            <p className="cart-item-name">
                                {cartItem.name}
                            </p>
                            <p className="cart-item-id">
                                Item ID: {cartItem.id}
                            </p>
                            <p>
                                <span id="cart-remove" className="btn transparent z-depth-0 red-text text-darken-2 no-padding" onClick={() => {this.removeFromCart(cartItem)}}>Remove</span>
                            </p>
                        </div>
                        <div className="col s2">
                            <p>
                                {cartItem.quantity}
                            </p>
                        </div>
                        <div className="col s2">
                            <p>
                                ${cartItem.price}
                            </p>
                        </div>
                        <div className="col s2">
                            <p>
                                ${cartItem.subtotal}
                            </p>
                        </div>
                    </div>
                    <div className="divider"/>
                </div>
            )
        });

        return (
            <div className="container">
                <div className="row">
                    <h1>Shopping Cart</h1>
                </div>
                <div className="divider"/>
                <div className="row no-margin category-row">
                    <div className="col s6 ">
                        Product Details
                    </div>
                    <div className="col s2">
                        Quantity
                    </div>
                    <div className="col s2">
                        Price
                    </div>
                    <div className="col s2">
                        Total
                    </div>
                </div>
                <div className="divider"/>
                {cartList}
                <div className="row" id="calc-row">
                    <div className="col s12">
                        <span id="calculated-total">
                            Total: $<span id="calculated-total-num"/>
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <Link to="/shop">Continue Shopping</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Cart;