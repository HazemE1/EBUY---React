import React from "react";
import "./Home.css";
import "firebase/compat/database"
import "firebase/compat/auth"
import firebase from "firebase/compat/app"

class Home extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        
    }


    render() {
        return (
            <div style={styles.wrapper}>
                <div style={styles.product_view}>
                    <div style={styles.product}>
                        {this.props.products != null && this.props.products.length > 0 ? this.props.products.map(p => {
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
        flex: 1,
        width: "20%",

    }
}

export default Home
