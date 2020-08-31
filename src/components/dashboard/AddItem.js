import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AddItem extends Component {
    state = {  }
    render() { 
        return (
            <div className="container">
                <div className="row">
                    <h1>Add Item</h1>
                </div>
                <div className="divider"/>
                    <form>
                        <p>Data Input Goes in Here</p>
                    </form>
                <div className="divider"/>
                <div className="row" style={{marginBottom: 0}}>
                    <div className="col s12">
                        <p>Last signed in on: </p>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default AddItem;