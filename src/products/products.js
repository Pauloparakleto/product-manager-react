import React, {Component} from "react";
import AlertDialogSlide from "./alert_dialog";
import Product from "./product";
import ProductForm from "./product_form";
import AlertDialog from "./product_detail";


const api_url =  process.env.REACT_APP_DATABASE_URL + '/products'

class Products extends Component {
    constructor(props){
        super(props)
        this.state = {
            items: [],
            hasAlertMessage: false,
            errors: [],
            isProductDetailShow: false,
            productDetail: [],
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

    closeProductDetail(){
        this.setState({
            isProductDetailShow: false,
        })
    }

    showFlashMessage(){
        if(this.state.hasAlertMessage === true ){
            return <AlertDialogSlide errorMessage={this.state.errors} onClick={() => this.closeFlashMessage()}/>;
        };   
    }

    showProductDetail(){
        if(this.state.isProductDetailShow === true ){
            
            return <AlertDialog productDetail={this.state.productDetail} onClick={() => this.closeProductDetail()}/>;
        };   
    }

    updateProductsList(response) {
        if(response.hasOwnProperty("errors")){
            return this.setState({
                hasAlertMessage: true,
                errors: response.errors,
            });
        } else {
            let _items = this.state.items;
             _items.unshift(response)
            this.setState({
            items: _items,
            isProductDetailShow: true,
            productDetail: response,
        });
        }
    }

    render () {
        return (
            <div>
                {this.showFlashMessage()}
                {this.showProductDetail(this.state.productDetail)}
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