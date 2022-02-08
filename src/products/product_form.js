import React, { Component } from "react"
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

class ProductForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            api_url: props.api_url,
            product: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleProductChange = this.handleProductChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.formSubmit(event.target);
    }

    async formSubmit(formData) {
        var data = new FormData(formData);
        await fetch(this.state.api_url, {
            method: "POST",
            mode: "cors",
            body: data
        }).then(response => response.json())
            .then(response => this.props.updateProductsList(response))
    }

    handleProductChange(event) {
        this.setState({
            product: event.target.value
        })
    }

    render() {
        return (
            <div>
                <form
                    onSubmit={this.handleSubmit}
                    id="product_form"
                    autoComplete="off">


                    <TextField
                        id="product_input"
                        label="product Description"
                        variant="outlined"
                        type="text"
                        name="product[name]"
                        onChange={this.handleProductChange} />
                    <Button variant="contained"
                        color="primary"
                        type="submit">Add Product</Button>
                </form>
            </div>
        )
    }
}
export default ProductForm;