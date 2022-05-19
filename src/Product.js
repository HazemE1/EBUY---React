import React, {Component} from "react";
import "./Product.css";


class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            price: this.props.price,
            image: this.props.image,
            condition: this.props.condition,
            description: this.props.description,
            category: this.props.category,

            yearofmake: this.props.yearofmake,
            colour: this.props.colour,
            owner: this.props.owner,
            uuid: this.props.uuid,
        }
    }

    renderCart() {
        return (<div className="product-rows">
                <div className="product-row">
                    <img className="cart-image" src={this.state.image} alt="Putin gives hope"></img>
                    <span className="cart-price">$1200</span>
                    <p>Putin poster for good luck</p>
                    <button className="remove-btn">Remove</button>
                </div>
            </div>
        )
    }

    render() {

        return (
            <div className="product">
                <div className="product__info">
                    <p>{this.state.name}</p>
                    <p className="product__price">
                        <small>$</small>
                        <strong>{this.state.price}</strong>
                    </p>
                </div>
                <img src={this.state.image} alt={"test"}/>
            </div>
        )
    }
}

export default Product
