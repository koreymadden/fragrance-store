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
                this.uid = user.uid;
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
                    total = Number((total + subtotal).toFixed(2));

                    let cart = this.state.cart;
                    let item = {
                        id,
                        image,
                        name,
                        price,
                        quantity,
                        subtotal
                    };
                    cart.push(item);
                    this.setState({
                        cart
                    });
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
        }).catch(e => {
            console.log(e.message)
        });
    };

    handleQuantityChange = (e, item) => {
        // remove targeted item from the state's cart and push a new one to it
        item.quantity = e.target.value;
        let cart = this.state.cart.filter(obj => {
            return obj.id !== item.id;
        });
        cart.push(item);

        let id = item.id;
        let quantity = item.quantity;
        this.cartItemsPath.child(id).child("quantity").set(quantity).then(() => {
            this.calculateSubtotal(item);
        });
    }
    
    calculateSubtotal(item) {
        // calculate the subtotal of an item and set it in firebase, then update the current cart state
        const subtotal = Number((item.price * item.quantity).toFixed(2));
        this.cartItemsPath.child(item.id).child("subtotal").set(subtotal)
            .then(() => {
                this.getCurrentCart();
            })
            .catch((e) => {
                console.log(e.message)
            });
    }

    updateDocVals = (id, prop, val) => {
        // easy way to update the DOM
        switch (id) {
            case "calculated-total-num":
                // add comma to the calculated total
                val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                document.getElementById(id)[prop] = val;
                break;
            default:
                document.getElementById(id)[prop] = val;
                console.log(`document.getElementById(${id}).${prop} = ${val}`);
        }
    }

    getCurrentCart = () => {
        // updates the state and calculates total from firebase to reflect the current cart
        this.cartItemsPath.once('value', snapshot => {            
            let databaseItems = snapshot.val();
            let cart = [];
            for (let key in databaseItems) {
                databaseItems[key].id = key;
                cart.push(databaseItems[key]);
            }
            this.setState({
                cart
            });
            let total = 0;
            this.state.cart.forEach(item => {
                total = Number((total + item.subtotal).toFixed(2));
            });
            this.cartTotalPath.set(total).then(() => {
                this.updateDocVals("calculated-total-num", "innerText", total);
            });
        });
    }

    render() {
        const handleSubmit = (e) => {
            e.preventDefault();
          }
        const cartList = this.state.cart.map(cartItem => {
            return (
                <form key={cartItem.id} onSubmit={handleSubmit}>
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
                        <div className="col s2 input-field no-margin">
                                <input className="cart-quantity" type="number" value={cartItem.quantity} onChange={(e) => {this.handleQuantityChange(e, cartItem)}}></input>
                        </div>
                        <div className="col s2">
                            <p>
                                ${cartItem.price}
                            </p>
                        </div>
                        <div className="col s2">
                            <p id={`item-subtotal-${cartItem.id}`}>
                                ${cartItem.subtotal}
                            </p>
                        </div>
                    </div>
                    <div className="divider"/>
                </form>
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