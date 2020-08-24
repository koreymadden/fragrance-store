import React, { Component } from 'react';
import fire from './Fire';
import { Link } from 'react-router-dom';

class Cart extends Component {

    state = {
        cart: [],
        logStatus: false
    };

    componentDidMount() {
        fire.auth().onAuthStateChanged(user => {
            if (user) {
                console.log('logged in on cart page');
                this.uid = user.uid;
            } else {
                console.log('not logged in on cart page');
                this.uid = 'notsignedin';
            }

            const pathRef = fire.database().ref("cart").child(this.uid).child("items");
            const totalPathRef = fire.database().ref("cart").child(this.uid).child("total");
            let total = 0;

            pathRef.on('child_added', snapshot => {
                if (window.location.pathname === "/cart") {
                    let id = snapshot.key;
                    let image = snapshot.val().image;
                    let name = snapshot.val().name;
                    let price = snapshot.val().price;
                    let quantity = snapshot.val().quantity;
                    let subtotal = snapshot.val().subtotal;

                    console.log('stuff: ' + total, snapshot.val().subtotal);
                    total = total + snapshot.val().subtotal;

                    totalPathRef.set(total).then(() => {
                        console.log('TOTAL: ' + total);
                        document.getElementById("calculated-total-num").innerText = total;
                    });

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
                    console.warn('Why is this running on the shop page?')
                }

            });

            // See if user is logged in or not
            fire.auth().onAuthStateChanged(user => {
                if (user) {
                    this.setState({
                        logStatus: true
                    })
                } else {
                    this.setState({
                        logStatus: false
                    })
                }
                console.log(`user's logStatus: ${this.state.logStatus}`);
            })


        });
    }

    removeFromCart = (item) => {
        // get uid if logged in
        if (this.state.logStatus) {
            this.uid = fire.auth().currentUser.uid;
        } else {
            const id = 'notsignedin';
            console.log('removing from cart when not signed in');
            this.uid = id;
        }

        let pathRef = fire.database().ref("cart").child(this.uid).child("items").child(item.id);

        pathRef.once('value', snapshot => {
            let snapSubtotal = snapshot.child("subtotal").val();
        }).then(e => {console.warn(`removed item(s) from cart`)});

        pathRef.remove().then(() => {
            console.log("item successfully removed", this.uid);
            window.location.reload()
        }).catch(e => {
            console.log(e.message)
        });
    };

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