import React, { Component } from 'react';

class Links extends Component {

    render() {
        return (
            <div className='wrap-links'>
                <a className='link' href="/" > Home </a>
                <a className='link' href="/login"> Login </a>
                <a className='link' href="/products"> Products </a>
            </div>
        );
    }
}

export default Links;
