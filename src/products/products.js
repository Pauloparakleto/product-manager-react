import React, {Component} from "react";
import AlertDialogSlide from "./alert_dialog";
import Product from "./product";
import ProductForm from "./product_form";


const api_url = 'http://localhost:3001/products'

class Products extends Component {
    constructor(props){
        super(props)
        this.state = {
            items: [],
            hasAlertMessage: false,
        }
        this.updateProductsList = this.updateProductsList.bind(this);
    }

    componentDidMount(){
        this.getProducts();
    }

    getProducts() {
        fetch(api_url)
            .then(response => response.json())
            .then(response_items => {
                this.setState({
                    items: response_items
                })
            });
    }

    closeFlashMessage(){
        this.setState({
            hasAlertMessage: false,
        })
    }

    showFlashMessage(items){
        if(this.state.hasAlertMessage === true ){
            return <AlertDialogSlide onClick={() => this.closeFlashMessage()}/>;
        };   
    }

    updateProductsList(item) {
        if(item.errors.length >= 1){
            return this.setState({
                hasAlertMessage: true,
            });
        }

        let _items = this.state.items;
        _items.unshift(item)
        this.setState({
            items: _items,
        });
    }

    render () {
        return (
            <div>
                {this.showFlashMessage()}
                <ProductForm api_url={api_url} updateProductsList={this.updateProductsList}/>
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