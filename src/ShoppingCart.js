import React, {Component} from "react";
import "./ShoppingCart.css";

class ShoppingCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
        }
    }

    getCurrentPrice() {
        let price = 0;
        this.state.products.forEach((p) => price += p.state.price)
        return price
    }

    render() {
        return (
            <div class="cart-modal-overlay">
                <div class="cart-modal">
                    <icon id="close-btn" icon={"img/close-icon.png"} onClick={() => {
                        const cartModalOverlay = document.querySelector('.cart-modal-overlay');
                        cartModalOverlay.style.transform = 'translateX(-200%)'; // hides the modal (shopping cart)
                    }}>X
                    </icon>
                    {this.state.products.length === 0 &&
                        <h1 className="cart-is-empty">Cart is empty</h1>
                    }


                    <div class="total">
                        <h1 class="cart-total">TOTAL</h1>
                        <span class="total-price">{this.getCurrentPrice()} :-</span>
                        <button class="purchase-btn">PURCHASE</button>
                    </div>
                </div>
            </div>
        )
    }
}


export default ShoppingCart