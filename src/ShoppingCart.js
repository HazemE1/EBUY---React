import React, {Component} from "react";
import "./ShoppingCart.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";


class ShoppingCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
        }

        global.addItemToCart = (product) => {
            const arr = this.state.products;
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].state.uuid === product.state.uuid) {
                    alert("Product is already in your cart!")
                    return
                }
            }
            alert(product.state.name + " has been added to cart!")
            arr.push(product)
            this.setState({products: arr}, () => console.log(this.state))

        }

        global.removeProductFromCart = (product) => {
            const arr = this.state.products;
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].state.uuid === product)
                    arr.splice(i)
            }
            this.setState({products: arr})
        }
    }

    purchase() {
        const arr = this.state.products;

        for (let i = 0; i < arr.length; i++) {
            arr[i].purchase({name: firebase.auth().currentUser.displayName, uid: firebase.auth().currentUser.uid})
        }
        this.setState({products: []})


    }

    getCurrentPrice() {
        if (this.props.products != null) {
            const app = this.props.products.length
            console.log(app)
        }
        let price = 0;
        this.state.products.forEach((p) => price += parseInt(p.state.price))
        return price
    }


    render() {
        return (
            <div className="cart-modal-overlay">
                <div className="cart-modal">
                    <h1 style={{
                        fontWeight: "bold",
                        fontSize: "2em",
                        textAlign: "center",
                        color: "white",
                        justifySelf: "center"
                    }}>SHOPINGCART</h1>

                    <label id="close-btn" onClick={() => {
                        const cartModalOverlay = document.querySelector('.cart-modal-overlay');
                        cartModalOverlay.style.transform = 'translateX(200%)'; // hides the modal (shopping cart)
                    }}>X
                    </label>
                    {this.state.products.length === 0 ? <h1 className="cart-is-empty">Cart is empty</h1> :
                        this.state.products.map((v) => {
                            return v.cartRender();
                        })
                    }


                    <div className="total">
                        <h2 className="cart-total">TOTAL</h2>
                        <span className="total-price">{this.getCurrentPrice()} :-</span>
                        <button onClick={() => this.purchase()} className="purchase-btn">PURCHASE</button>
                    </div>
                </div>
            </div>)
    }
}


export default ShoppingCart