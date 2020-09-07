import React, { Component } from 'react';
import fire from '../Fire';
import { Link } from 'react-router-dom';

class AddItem extends Component {
    state = {  }

    render() { 
        const handleSubmit = async (e) => {
            e.preventDefault();
            
            // get values from DOM
            let name = document.getElementById('newItemName').value;
            let price = document.getElementById('newItemPrice').value;
            let stock = document.getElementById('newItemStock').value;
            let imageData = document.getElementById('newItemImage').files[0];
            let id = 404;

            if (name === "" || price === "" || stock === "" || imageData === undefined) return;

            // upload user image to firebase storage using the name value as file name
            let imageRef = fire.storage().ref().child('images').child(name);
            await imageRef.put(imageData)
            .then(
                console.log("image upload successful")
            ).catch(e => {
                console.error("could not complete image upload", e);
            });

            // add item object to the products section in firebase
            imageRef.getDownloadURL().then(url => {
                fire.database().ref("products").push({id, name, price, stock, image: url})
                .then(
                    console.log(`${name} has been added to the store's products list.`)
                ).catch((e) => {
                    console.error(`There was an error adding ${name} to the store's product selection.`, e);
                });            
            }).catch(e => {
                console.error(e);
            });
            
        }
        return (
            <div className="container">
                <div className="row">
                    <h1>Add Item</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <label className="active" htmlFor="newItemName">Item Display Name</label>
                    <input placeholder="Fragrance: Eau De Parfum" id="newItemName" type="text" className="validate" />
                    <label className="active" htmlFor="newItemPrice">Price in USD</label>
                    <input placeholder="129.99" id="newItemPrice" type="text" className="validate" />
                    <label className="active" htmlFor="newItemStock">Available Stock</label>
                    <input placeholder="300" id="newItemStock" type="text" className="validate" />
                    <div className="file-field input-field">
                        <div className="btn theme-bg-2">
                            <span>File</span>
                            <input id="newItemImage" type="file" accept="image/*" multiple />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" placeholder="Upload one or more files" />
                        </div>
                    </div>
                    <div className="flex-center">
                        <button className="form-btn btn theme-bg-2 waves-effect waves-light" type="submit" name="action">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}
 
export default AddItem;