import React, {Component} from 'react';
import {connect} from 'react-redux';

class Products extends Component {

    state = {
        someText: null
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

    // removeItem = (id) => {
    //     fetch('https://gentle-escarpment-19443.herokuapp.com/v1/articles/' + id, {
    //         method: 'GET',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //             'Authorization': this.getTokenFromLS()
    //         }
    //     }).then(res => res.json())
    //         .then(products => this.props.toLoad(products))
    // };



    render() {
        var removeById = (id) => {
            this.props.removeItem(id)
        };
        return (
            <div className='wrapper'>
                <button onClick={this.getProducts}>To load Products</button>
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
            }
        })
    }
)(Products);
