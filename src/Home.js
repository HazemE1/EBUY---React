import React from "react";
import "./Home.css";
import firebase from "firebase/compat/app"
import "firebase/compat/database"
import Product from "./Product"

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allProducts: [],
        }
    }

    componentDidMount() {
        this.fetchAllProducts()

    }

    fetchAllProducts() {
        firebase.database().ref("products").once("value", (v) => {
            const arr = []
            v.forEach(p => {
                arr.push(<Product key={p.val().uuid}
                                  name={p.val().name}
                                  price={p.val().price}
                                  image={p.val().image}
                                  condition={p.val().condition}
                                  description={p.val().description}
                                  category={p.val().category}
                                  yearofmake={p.val().yearofmake}
                                  colour={p.val().colour}
                                  owner={p.val().user}
                                  uuid={p.val().uuid}/>)

            })
            this.setState({allProducts: arr})
        }).then(r => console.log("done"));


    }

    render() {
        return (
            <div style={styles.wrapper}>
                <div style={styles.product_view}>
                    <div style={styles.product}>
                    {this.state.allProducts.length > 0 ? this.state.allProducts.map(p => {
                        return p
                    }) : <h1 style={{textAlign: "center"}}>There are no items in the shop</h1>}
                    </div>
                </div>
            </div>
        )
    }
}

let styles = {
    wrapper: {
        display: "flex",
        background: `url("https://www.thestatesman.com/wp-content/uploads/2020/11/iStock-ecomm.jpg")`,
        backgroundSize: "contain",
        overflow: "hidden",
        backgroundColor: "rgba(0,0,0,0.8)",
    },
    product_view: {
        minHeight: "150vh",
        backgroundColor: "rgba(0,0,0,0.8)",
        display: "flex",
        flex: 1,
        flexWrap: "wrap",

    },
    product: {
        flex:1,
        width: "20%",

    }
}

export default Home
