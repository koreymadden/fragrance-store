import React, { Component } from 'react';
import fire from './Fire';
class Shop extends Component{

    state = {
        items: [],
        logStatus: false
    };

    componentDidMount() {

        var newItems = this.state.items;

        fire.database().ref("products").on("child_added", snapshot => {

            var name = snapshot.child("name").val();
            var price = snapshot.child("price").val();
            var id = snapshot.child("id").val();
            var stock = snapshot.child("stock").val();
            var image = snapshot.child("image").val();

            var item = {'name': name, 'price': price, 'id': id, 'stock': stock, 'image': image, 'amount': 1};

            newItems.push(item);
            this.setState({
                items: newItems
            });
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
        })

    }

    addToCart = (item) => {
        var uid;

        if (this.state.logStatus) {
            uid = fire.auth().currentUser.uid;
        } else {
            //var uuid = require("uuid");
            //var id = uuid.v4();
            const id = 'notsignedin';
            console.log('adding to cart when not signed in');
            uid = id;
        }

        var pathRef = fire.database().ref("cart").child(uid).child("items").child(item.id);

        function updateTotals (price, quantity) {
            var subtotal = price * quantity;
            pathRef.child("subtotal").set(subtotal);
        }

        function updateItemQuantity(quantity, price) {
            if (quantity === null || quantity === undefined || quantity === 0) {
                quantity = 1;
                pathRef.child("quantity").set(quantity);
                updateTotals(quantity, price);
            } else {
                quantity = quantity + item.amount;
                pathRef.child("quantity").set(quantity);
                updateTotals(quantity, price);
            }
        }

        pathRef.once("value", snapshot => {

            var currentQuantity = snapshot.child("quantity").val();
            var currentPrice = snapshot.child("price").val();

            updateItemQuantity(currentQuantity, currentPrice);

        }).then(() => {
            console.log("quantity check complete")
        }).catch((e) => {
            console.log(e.message);
            alert("Error adding item to cart.")
        });

        pathRef.child("price").set(item.price);
        pathRef.child("name").set(item.name);
        pathRef.child("image").set(item.image);
    };

    removeFromCart = (item) => {
        const uid = fire.auth().currentUser.uid;
        var pathRef = fire.database().ref("cart").child(uid).child("items").child(item.id);
        pathRef.remove();
    };



    render() {
        function updateStock (item) {
            var element = document.getElementById(item.id + 'stock');
            /*var snapStock;
            fire.database().ref("products").child("items").child(item.id).child("stock").once("value", snapshot => {
                    snapStock = snapshot.val();
                    alert(snapStock)
                });*/
            if (item.stock < 10 && item.stock > 0) {
                document.getElementById(item.id + 'stock').innerHTML = "Low&nbsp;Stock";
                element.className += ' low-stock';
            } else {
                element.className += ' good-stock';
            }
        }
        const itemList = this.state.items.map(item => {
            return (
                <div className="item" key={item.id}>
                        <div className="col s12 l6">
                            <div className="card">
                                <div className="card-image center">
                                    <img draggable="false" className="item-image no-select" src={item.image} alt={item.name} onLoad={() => {updateStock(item)}}/>
                                </div>
                                <div className="card-content">
                                    <span className="card-title valign-wrapper">
                                        <span className="item-name">{item.name}</span>
                                        <span className="new badge red darken-2 no-select" data-badge-caption="">New</span>
                                        <span className="new badge" onClick={() => {updateStock(item)}} data-badge-caption="" id={item.id+"stock"}>In&nbsp;Stock</span>
                                    </span>
                                    <p>
                                        I am a very simple card. I am good at containing small bits of information.
                                        I am convenient because I require little markup to use effectively.
                                    </p>
                                </div>
                                <div className="divider"/>
                                <div className="card-content row no-margin">
                                    <p className="price col s12">Price: ${item.price}</p>
                                    <p className="price col s12">Stock: {item.stock}</p>
                                </div>
                                <div className="card-action">
                                    <button className="btn-flat grey lighten-4 card-btn" onClick={() => {this.addToCart(item)}}>Add To Cart</button>
                                    <button className="btn-flat grey lighten-4 card-btn" onClick={() => {this.removeFromCart(item)}}>Remove</button>
                                </div>
                            </div>
                        </div>
                    <script onLoad={() => {updateStock(item)}}/>
                    </div>
            )
        });

        console.log(this.state.items);

        return (
            <div className="container">

                <div className="row center">
                    <img draggable="false" className='cart-page-logo responsive-img no-select' src="http://cdn.shopify.com/s/files/1/0195/0248/t/2/assets/logo.png?0" alt="page-logo" />
                </div>
                <div className="fragrances row">
                    {itemList}
                </div>

            </div>
        )
    }
}

export default Shop;