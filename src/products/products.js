import React, {Component} from "react";

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
        console.log(this.state.items)
        return (
            <div>
                <ul id='products'>
                    {this.state.items.map((item) => (
                        <li key={ item.id }>{item.name}</li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default Products;