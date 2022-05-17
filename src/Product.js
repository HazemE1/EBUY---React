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
            categories: this.props.categories,
            owner: this.props.owner,
        }
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
