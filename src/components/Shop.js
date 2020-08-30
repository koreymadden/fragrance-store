import React, { Component } from 'react';
import fire from './Fire';
class Shop extends Component {

    state = {
        items: [],
        logStatus: false
    };
    
    componentDidMount() {
        // see if user is logged in or not
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
        });

        // get products from firebase and write to state
        fire.database().ref("products").on("child_added", snapshot => {
            let name = snapshot.child("name").val();
            let price = snapshot.child("price").val();
            let id = snapshot.child("id").val();
            let stock = snapshot.child("stock").val();
            let image = snapshot.child("image").val();
            let amount = 1;
            
            let items = this.state.items;
            let item = {
                name,
                price,
                id,
                stock,
                image,
                amount
            };
            items.push(item);
            this.setState({
                items
            });
        });

    }

    addToCart = (item) => {
        let itemPath = this.cartItemsPath.child(item.id);

        // uses new quantity and the current price to set subtotal and quantity in database
        function updateTotals(price, quantity) {
            let subtotal = Number((price * quantity).toFixed(2));
            itemPath.child("subtotal").set(subtotal)
                .then(() => {
                    console.log(`subtotal successfully calculated as: ${subtotal}`);
                })
                .catch((e) => {
                    console.log(e.message)
                });
        }

        // checks to see if there is stock to add to the users cart
        if (item.stock < 1) {
            console.error(`${item.name} is out of stock`);
            return;
        }

        // sets or updates the price, name, and image url of item being added
        itemPath.child("price").set(item.price).catch(e => {
            console.log(e.message)
        });
        itemPath.child("name").set(item.name).catch(e => {
            console.log(e.message)
        });
        itemPath.child("stock").set(item.stock).catch(e => {
            console.log(e.message)
        });
        itemPath.child("image").set(item.image).catch(e => {
            console.log(e.message)
        });

        // gets quantity of item depending on if it already exists in user's cart and sets new quantity of item and sends quantity and price to updateTotals
        itemPath.once("value", snapshot => {
            let currentQuantity = snapshot.child("quantity").val();
            let currentPrice = snapshot.child("price").val();
            let setQuantity = currentQuantity ? currentQuantity + item.amount : item.amount;
            this.cartItemsPath.child(item.id).child("quantity").set(setQuantity).then(() => {
                updateTotals(currentPrice, setQuantity);
            });
        }).then(() => {
            console.log("quantity successfully updated")
        }).catch((e) => {
            console.log(e.message);
        });
    };

    removeFromCart = (item) => {
        // remove an item from user's cart
        let itemPath = this.cartItemsPath.child(item.id);
        itemPath.remove().then(() => {
            console.log(`${item.name} was successfully removed`);
        }).catch(e => {
            console.log(e.message);
        });
    };

    render() {
        function updateStock(item) {
            let element = document.getElementById(`${item.id}stock`);
            let elementID = item.id;

            // writes to element depending on their stock amount
            if (item.stock < 10 && item.stock > 0) {
                document.getElementById(`${elementID}stock`).innerHTML = "Low&nbsp;Stock";
                element.className += ' low-stock';
            } else if (item.stock < 1) {
                document.getElementById(`${elementID}stock`).innerHTML = "Sold&nbsp;Out";
                element.className += ' no-stock';
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
                            <div id={`${item.id}-card-action`} className="card-action">
                                <button className={`btn-flat grey lighten-4 card-btn ${item.stock > 0 ? "" : "disabled no-select"}`} onClick={() => {this.addToCart(item)}}>
                                    Add To Cart
                                </button>
                                <button className={`btn-flat grey lighten-4 card-btn ${item.stock > 0 ? "" : "disabled no-select"}`} onClick={() => {this.removeFromCart(item)}}>
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