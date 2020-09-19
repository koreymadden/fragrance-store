import React, { useState, useEffect } from 'react';
import fire from '../Fire';
import { Link } from 'react-router-dom';

function EditItem () {
    const [items, setItems] = useState([]);
    
    useEffect(() => {
        let newItems = [];
        fire.database().ref("products").on("child_added", snapshot => {
            let name = snapshot.child("name").val();
            let price = snapshot.child("price").val();
            let id = snapshot.child("id").val();
            let stock = snapshot.child("stock").val();
            let image = snapshot.child("image").val();
            const obj = {name, price, id, stock, image};
            newItems.push(obj);
        });
        setItems(newItems);
    }, [],);

    const itemList = items.map(item => {
        return (
            <div key={item.id} className="card edit-item">
                <Link to={`/edit/${item.id}`}>
                    <div className="card-content">
                        <div className="edit-name edit-content">{item.name}</div>
                        <div className="edit-id edit-content">{item.id}</div>
                    </div>
                    <img className="edit-icon" src={item.image} alt=""/>
                </Link>
            </div>
        )
    });
    
        
    return (
        <div className="container">
            <div className="row center">
                <img draggable="false" className='cart-page-logo responsive-img no-select' src="http://cdn.shopify.com/s/files/1/0195/0248/t/2/assets/logo.png?0" alt="page-logo" />
            </div>
            <div className="fragrances row">
                <h1>Edit Items:</h1>
            </div>
            <div className="row" id={items.length}>
                {itemList}
            </div>
        </div>
    );
}
 
export default EditItem;