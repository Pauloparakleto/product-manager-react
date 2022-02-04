import React, {Component} from "react";

const api_url = 'http://localhost:3000/products'

class Products extends Component {
    render () {
        return (
            <div>
                <ul>
                    <li>Product #1</li>
                    <li>Product #2</li>
                </ul>
            </div>
        )
    }
}

export default Products;