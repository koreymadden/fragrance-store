import React, { Component } from 'react';

class EditItem extends Component {
    state = {  }
    render() { 
        return (
            <div className="container">
                <div className="row center">
                    <img draggable="false" className='cart-page-logo responsive-img no-select' src="http://cdn.shopify.com/s/files/1/0195/0248/t/2/assets/logo.png?0" alt="page-logo" />
                </div>
                <div className="fragrances row">
                    Edit Item
                </div>
            </div>
        );
    }
}
 
export default EditItem;