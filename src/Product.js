import React, {Component} from "react";
import "./Product.css";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/auth";


class Product extends Component {
    constructor(props) {
        super(props);

        if (this.props.props) {
            console.log(props)
            console.log("Here")
            this.state = {
                name: this.props.values.name,
                price: this.props.values.price,
                image: this.props.values.image,
                condition: this.props.values.condition,
                description: this.props.values.description,
                category: this.props.values.category,
                yearofmake: this.props.values.yearofmake,
                colour: this.props.values.colour,
                owner: this.props.values.owner,
                uuid: this.props.values.uuid,
            }
        } else {
            this.state = {
                uuid: this.props.uuid,
                name: "",
                price: "",
                image: "",
                condition: "",
                description: "",
                category: "",
                yearofmake: "",
                colour: "",
                owner: "",
            }
        }
    }

    async componentDidMount() {
        if (!this.props.props ) {
            await firebase.database().ref("products").child(this.state.uuid).once("value", (p) => {
                this.setState({
                    name: p.val().name,
                    price: p.val().price,
                    image: p.val().image,
                    condition: p.val().condition,
                    description: p.val().description,
                    category: p.val().category,
                    yearofmake: p.val().yearofmake,
                    colour: p.val().colour,
                    owner: p.val().user,
                    uuid: p.val().uuid,
                })
            })
        }
    }

    async removeProduct() {
        await firebase.database().ref("products").child(this.state.uuid).remove().then(() => {
        })

        await firebase.database().ref("users").child(this.state.owner).child("products").child(this.state.uuid).remove().then(() => {
            alert(this.state.name + " Has been removed!")

        })
        window.location.reload();
    }

    async purchase(buyer) {
        await firebase.database().ref("products").child(this.state.uuid).remove().then(() => {
        })

        await firebase.database().ref("users").child(this.state.owner).child("products").child(this.state.uuid).remove().then(() => {
            alert(this.state.name + " Has been removed!")
        })

        await firebase.database()
            .ref("users")
            .child(this.state.owner)
            .child("pending")
            .child(this.state.uuid)
            .set({
                ...this.state,
                buyer: buyer
            })

        global.sendMessage("Purchase Pending!", "The user " + buyer.name + " wants to buy your product " + this.state.name, this.state.owner)
        global.sendMessage("Purchase Request!", "The owner of the products needs to accept!", buyer.uid)

    }


    cartRender() {
        return (
            <div key={this.state.uuid} className="product-rows">
                <div className="product-row">
                    <img className="cart-image" src={this.state.image} alt="Putin gives hope"></img>
                    <span className="cart-price">{this.state.price}$</span>
                    <p>{this.state.description}</p>
                    <button onClick={() => global.removeProductFromCart(this.state.uuid)}
                            className="remove-btn">Remove
                    </button>
                </div>
            </div>
        )
    }

    async disbandPurchase() {

        await firebase.database()
            .ref("users")
            .child(this.state.owner)
            .child("pending")
            .child(this.state.uuid)
            .remove()

        await firebase.database()
            .ref("users")
            .child(this.state.owner)
            .child("products")
            .child(this.state.uuid)
            .set(this.state.uuid)

        await firebase.database()
            .ref("products")
            .child(this.state.uuid)
            .set(this.state)

        global.sendMessage("Purchase Denied!", "Your purchase " + this.state.name + " has been denied by the owner!", this.props.buyer.uid)
        alert("Your product " + this.state.name + " has been returned to the store!")
    }

    async acceptPurchase() {
        await firebase.database()
            .ref("users")
            .child(this.state.owner)
            .child("pending")
            .child(this.state.uuid)
            .remove()

        global.sendMessage("Purchase accepted!", "Your purchase " + this.state.name + " has been accepted by the owner! " +
            "\n " + this.state.price + "$ has been withdrawn!", this.props.buyer.uid)
        alert("Your product " + this.state.name + " has been bought now! \n You have " + this.state.price + "$ deposited to your account")

    }

    renderPending() {
        return (
            <div key={this.state.uuid} className="card">
                <div style={{display: "flex"}} className="product-row">
                    <div style={{width: "100%", flexDirection: "row", display: "flex"}}>
                        <img style={{height: "100%"}} className="cart-image" src={this.state.image}
                             alt="Putin gives hope"></img>
                        <span className="cart-price">{this.state.price}$</span>
                        <p>{this.state.description}</p>
                    </div>
                    <h2 style={{textAlign: "center"}}>{this.props.buyer.name} wants to buy this
                        product</h2>
                    <div style={{alignItems: "flex-end", justifyContent: "flex-end", width: "100%"}}>

                        <button onClick={() => {
                            this.disbandPurchase()
                        }}
                                className="remove-btn">disband
                        </button>
                        <button onClick={() => {
                            this.acceptPurchase()

                        }}
                                className="remove-btn">Accept
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        if (this.props.buyer !== undefined) {
            return this.renderPending()
        }

        return (
            <div key={this.state.uuid} className="card">
                <div className="product">
                    <div className="image">
                        <img src={this.state.image} alt={"test"}/>
                    </div>
                    <div className="product__info">
                        <p className="headline">{this.state.name}</p>
                        <p className="subline">Condition: {this.state.condition}</p>
                        <p className="subline">Colour: {this.state.colour}</p>
                        <p className="subline">Model Year: {this.state.yearofmake}</p>
                    </div>
                    <div className="product__description">
                        <p className="headline">Description</p>
                        <p className="subline">{this.state.description}</p>
                    </div>
                    {firebase.auth().currentUser === null || this.state.owner !== firebase.auth().currentUser.uid ?
                        <div className="product__add">
                            <p className="price"><small>$</small>{this.state.price}</p>
                            <button onClick={() => {
                                global.addItemToCart(this)
                            }} type="submit">Add to cart
                            </button>
                        </div>
                        :
                        <div className="product__add">
                            <button onClick={() => {
                                this.removeProduct()
                            }} type="submit">Remove product
                            </button>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default Product
