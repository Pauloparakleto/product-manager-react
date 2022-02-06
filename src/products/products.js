import React, {Component} from "react";
import Product from "./product";
import ProductForm from "./product_form";

const api_url = 'http://localhost:3001/products'

class Products extends Component {
    constructor(props){
        super(props)
        this.state = {
            items: []
        }
    }

    componentDidMount(){
        this.getProducts();
    }

    getProducts() {
        fetch(api_url)
            .then(response => response.json())
            .then(response_items => {
                this.setState({
                    items: response_items.reverse()
                })
            });
    }

    render () {
        return (
            <div>
                <ProductForm />
                <ul id='products'>
                    {this.state.items.map((item) => (
                        <Product key={item.id} item={item}/>
                    ))}
                </ul>
            </div>
        )
    }
}

export default Products;