import "./CreateAccountPage.css";
import "firebase/compat/auth";

import {Component} from "react";
import Header from "./Header"
import AddItemPage from "./AddItemPage";

class CreateAccountPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user,
            showAdd: false,
            showRemove: false,
            showPending: false,
            showProducts: true,
            update: false
        }
    }


    switch(page) {
        if (page === "products") {
            this.setState({
                showAdd: false, showRemove: false, showPending: false, showProducts: true
            })
        } else if (page === "add") {
            this.setState({
                showAdd: true, showRemove: false, showPending: false, showProducts: false
            })
        } else if (page === "remove") {
            this.setState({
                showAdd: false, showRemove: true, showPending: false, showProducts: false
            })
        } else if (page === "pending") {
            this.setState({
                showAdd: false, showRemove: false, showPending: true, showProducts: false
            })
        }
    }

    componentDidMount() {
        this.setState({
            update: true
        })
    }


    render() {
        return (<div style={{
            backgroundImage: `url("https://www.thestatesman.com/wp-content/uploads/2020/11/iStock-ecomm.jpg")`,
            height: "100vh",
            width: "100vw"
        }}>

            <div style={styles.container}>
                <div style={styles.profileContainer}>
                    <div style={{display: "inline"}}>
                        <h1 style={{display: "block", alignSelf: "flex-start"}}>{this.state.user.getUserName()}</h1>
                        <h1 style={{display: "block", textAlign: "center"}}>Product management</h1>
                    </div>
                    <div style={styles.panel}>
                        <div onClick={() => this.switch("products")} style={styles.button}>
                            <h1 style={styles.text}>PRODUCTS</h1>
                        </div>
                        <div onClick={() => this.switch("add")} style={styles.button}>
                            <h1 style={styles.text}>ADD</h1>
                        </div>
                        <div onClick={() => this.switch("pending")} style={styles.button}>
                            <h1 style={styles.text}>PENDING</h1>
                        </div>
                    </div>
                </div>

            </div>
            {this.state.showAdd && <AddItemPage user={this.state.user}/>}
            {this.state.showPending && <ShowPending/>}
            {this.state.showProducts && <ShowProducts user={this.state.user}/>}
        </div>)

    }

}


function ShowProducts() {
    return (
        <div style={styles.components}>
            {global.user.sellingProducts.map((v) => {
                return v
            })}
        </div>)
}

function ShowRemove() {
    return (
        <div>
            <h1>remove product</h1>
        </div>
    )
}

function ShowPending() {
    return (
        <div style={styles.components}>
            {global.user.pendingProducts.map((i) => {
                return i
            })
            }
        </div>)
}


let styles = {
    container: {
        display: "flex", flex: 1
    }, profileContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        width: "100%",
        background: "rgba(228,255,0,0.899)",
    }, panel: {
        display: "flex", width: "100%",

        background: "gray",

        justifyContent: "center", alignContent: "flex-end", alignItems: "flex-end",
    }, button: {
        display: "flex", userSelect: "none", marginLeft: 50, alignSelf: "flex-end"
    }, text: {
        fontSize: 15,
    }, components: {
        height: "100%",
        width: "100%",
        background: "rgba(0,0,0,0.8)",
    }

}

export default CreateAccountPage;