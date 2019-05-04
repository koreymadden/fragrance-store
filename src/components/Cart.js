import React, { Component } from 'react';
import fire from './Fire';
import { Link } from 'react-router-dom';

class Cart extends Component {

    state = {
        cart: []
    };

    componentDidMount() {
        fire.auth().onAuthStateChanged(user => {
            if (user) {
                console.log('logged in on cart page');
                let uid = user.uid;
                const pathRef = fire.database().ref("cart").child(uid).child("items");
                const totalPathRef = fire.database().ref("cart").child(uid).child("total");
                let total = 0;

                pathRef.on('child_added', snapshot => {
                    let id = snapshot.key;
                    let image = snapshot.val().image;
                    let name = snapshot.val().name;
                    let price = snapshot.val().price;
                    let quantity = snapshot.val().quantity;
                    let subtotal = snapshot.val().subtotal;

                    alert('subtotal: ' + snapshot.val().subtotal);
                    alert('total: ' + total);

                    total = total + snapshot.val().subtotal;
                    totalPathRef.set(total).then(() => {
                        console.log('TOTAL: ' + total);
                        document.getElementById("calculated-total-num").innerText = total;
                    });

                    let stateCopy = this.state.cart;
                    let item = {id, image, name, price, quantity, subtotal};
                    stateCopy.push(item);
                    this.setState({
                        cart: stateCopy
                    })
                })
            } else {
                console.log('not logged in on cart page')
            }
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