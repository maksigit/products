import React, {Component} from 'react';
import {connect} from 'react-redux';

class Products extends Component {

    state = {
        someText: null,
        id: null,
        name: null,
        desc: null,
        price: null,
        status: null
    };

    getTokenFromLS = () => {
        return localStorage.getItem('token')
    };

    getProducts = () => {
        fetch('https://gentle-escarpment-19443.herokuapp.com/v1/articles?page=1&updated_after=1410403761', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.getTokenFromLS()
            }
        }).then(res => res.json())
            .then(products => this.props.toLoad(products))
    };

    toObjJson = () => {
        console.log (JSON.stringify({
            "group_id": this.state.id.value,
            "name": this.state.name.value,
            "description": this.state.desc.value,
            "price": this.state.price.value,
            "status": this.state.status.value
        }) );

        return this.props.addItem ({
            "group_id": +this.state.id.value,
            "name": this.state.name.value,
            "description": this.state.desc.value,
            "price": this.state.price.value,
            "status": +this.state.status.value
        });
    };

    render() {
        var removeById = (id) => {
            this.props.removeItem(id)
        };
        return (
            <div className='wrapper'>
                <div className='add-product'>
                    <label htmlFor="">ID:
                    <input type="text" ref={(input) => {this.state.id = input}}/>
                    </label>
                    <label htmlFor="">Name:
                    <input type="text" ref={(input) => {this.state.name = input}}/>
                    </label>
                    <label htmlFor="">Desc:
                    <input type="text" ref={(input) => {this.state.desc = input}}/>
                </label>
                    <label htmlFor="">Price:
                    <input type="text" ref={(input) => {this.state.price = input}}/>
                </label>
                    <label htmlFor="">Status:
                    <input type="text" ref={(input) => {this.state.status = input}}/>
                </label>
                    <button onClick={this.toObjJson}>Add Product</button>
                </div>

                <button className='btn' onClick={this.getProducts}>Load ALL Products</button>
                <div className='wrap-all-products'>
                    {this.props.testStore != null ? this.props.testStore.map(function (item, i) {
                        if (item.status !== 0) {
                            return <div key={item.id} className='item'>
                                <div className='item-name'>
                                    <span className='text'>Name: </span>
                                    <span>{item.name}</span>
                                </div>
                                <div className='item-desc'>
                                    <span className='text'>Desc: </span>
                                    <span>{item.description}</span>
                                </div>
                                <div className='item-price'>
                                    <span className='text'>Price: </span>
                                    <span>{item.price}</span>
                                </div>
                                <div>id - {item.id}</div>
                                <div>status - {item.status}</div>
                                <div className='del-item' onClick={() => removeById(item.id)}>x</div>
                            </div>
                        }
                    }) : ' '}
                </div>
            </div>
        )
    }
}

export default connect(
    state => {
        console.log('store prod => ', state);
        return ({
            testStore: state
        })
    },
    dispatch => {
        return ({
            toLoad: (products) => {
                dispatch({type: 'LOAD_PRODUCTS', payload: products})
            },
            removeItem: (id) => {
                dispatch({type: 'REMOVE_ITEM', payload: id})
            },
            addItem: (obj) => {
                dispatch({type: 'ADD_ITEM', payload: obj})
            }
        })
    }
)(Products);
