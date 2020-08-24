import React, { Component } from 'react';
import fire from './Fire';
class Shop extends Component{

    state = {
        items: [],
        logStatus: false
    };

    uid = undefined;

    componentDidMount() {

        // get products from firebase and write to state
        fire.database().ref("products").on("child_added", snapshot => {
            let name = snapshot.child("name").val();
            let price = snapshot.child("price").val();
            let id = snapshot.child("id").val();
            let stock = snapshot.child("stock").val();
            let image = snapshot.child("image").val();

            let item = {'name': name, 'price': price, 'id': id, 'stock': stock, 'image': image, 'amount': 1};

            let itemsCopy = this.state.items;
            itemsCopy.push(item);

            this.setState({
                items: itemsCopy
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
            console.log(`user's logStatus: ${this.state.logStatus}`);
        })

    }

    addToCart = (item) => {

        // get uid if logged in
        if (this.state.logStatus) {
            this.uid = fire.auth().currentUser.uid;
            console.log('adding to cart when signed in');
        } else {
            this.uid = "notsignedin";
            console.log('adding to cart when not signed in');
        }

        let pathRef = fire.database().ref("cart").child(this.uid).child("items").child(item.id);

        // sets new quantity of item and sends quantity and price to updateTotals
        function updateItemQuantity(quantity, price) {
            if (quantity === null || quantity === undefined || quantity === 0) {
                let setQuantity = 1;
                pathRef.child("quantity").set(setQuantity).then(() => {
                    console.log("quantity set in firebase")
                });
                updateTotals(price, setQuantity);
            } else {
                let setQuantity = quantity + item.amount;
                pathRef.child("quantity").set(setQuantity).then(() => {
                    console.log("quantity set in firebase")
                });
                updateTotals(price, setQuantity);
            }
        }

        // uses new quantity and the current price to set subtotal and quantity in database
        function updateTotals (price, quantity) {
            let subtotal = Number((price * quantity).toFixed(2));
            pathRef.child("subtotal").set(subtotal)
                .then(() => {
                    console.log(`new quantity is: ${quantity}`);
                    console.log(`subtotal successfully calculated as: ${subtotal}`);
                })
                .catch((e) => {
                    console.log(e.message)
                });
        }

        // sets or updates the price, name, and image url of item being added
        pathRef.child("price").set(item.price).catch(e => {
            console.log(e.message)
        });
        pathRef.child("name").set(item.name).catch(e => {
            console.log(e.message)
        });
        pathRef.child("image").set(item.image).catch(e => {
            console.log(e.message)
        });

        // gets quantity of item depending on if it already exists in user's cart and calls updateItemQuantity
        pathRef.once("value", snapshot => {
            let currentQuantity = snapshot.child("quantity").val();
            let currentPrice = snapshot.child("price").val();
            updateItemQuantity(currentQuantity, currentPrice);
        }).then(() => {
            console.log("quantity check complete")
        }).catch((e) => {
            console.log(e.message);
            console.error("Error adding item to cart.")
        });
    };

    removeFromCart = (item) => {
        // get uid if logged in
        if (this.state.logStatus) {
            this.uid = fire.auth().currentUser.uid;
        } else {
            this.uid = "notsignedin";
        }

        let pathRef = fire.database().ref("cart").child(this.uid).child("items").child(item.id);

        // pathRef.once('value', snapshot => {
        //     let snapSubtotal = snapshot.child("subtotal").val();
        // }).then(e => {console.warn(`removed item(s) from cart`)});

        // let snapSubtotal = snapshot.child("subtotal").val();
        // alert(snapSubtotal);

        pathRef.remove().then(() => {
            console.log("item successfully removed");
        }).catch(e => {
            console.log(e.message);
        });
    };



    render() {
        function updateStock (item) {
            let element = document.getElementById(`${item.id}stock`);
            let elementID = item.id;

            // writes to element depending on their stock amount
            if (item.stock < 10 && item.stock > 0) {
                document.getElementById(`${elementID}stock`).innerHTML = "Low&nbsp;Stock";
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
                                        <span className="item-name">
                                            {item.name}
                                        </span>
                                        <span className="new badge red darken-2 no-select" data-badge-caption="">
                                            New
                                        </span>
                                        <span className="new badge" onClick={() => {updateStock(item)}} data-badge-caption="" id={`${item.id}stock`}>
                                            In&nbsp;Stock
                                        </span>
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
                                <button className="btn-flat grey lighten-4 card-btn" onClick={() => {this.addToCart(item)}}>
                                    Add To Cart
                                </button>
                                <button className="btn-flat grey lighten-4 card-btn" onClick={() => {this.removeFromCart(item)}}>
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                    <script onLoad={() => {updateStock(item)}}/>
                </div>
            )
        });

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