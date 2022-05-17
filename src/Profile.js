import "./CreateAccountPage.css";
import "firebase/compat/auth";

import {Component} from "react";
import User from "./User"
import Header from "./Header"

class CreateAccountPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: new User(), showAdd: true, showRemove: false, showPending: false, showProducts: false,

        }
    }


    render() {
        return (<div style={{
            backgroundImage: `url("https://www.thestatesman.com/wp-content/uploads/2020/11/iStock-ecomm.jpg")`,
            height: "100vh",
            width: "100vw"
        }}>
            <Header/>

            <div style={styles.container}>
                <div style={styles.profileContainer}>
                    <div style={{display: "inline"}}>
                        <h1 style={{display: "block", alignSelf: "flex-start"}}>{this.state.user.getUserName()}</h1>
                        <h1 style={{display: "block", textAlign: "center"}}>Product management</h1>
                    </div>
                    <div style={styles.panel}>
                        <div onClick={() => alert("add")} style={styles.button}>
                            <h1 style={styles.text}>ADD</h1>
                        </div>
                        <div onClick={() => alert("remove")} style={styles.button}>
                            <h1 style={styles.text}>REMOVE</h1>

                        </div>
                        <div onClick={() => alert("pending")} style={styles.button}>
                            <h1 style={styles.text}>PENDING</h1>
                        </div>
                    </div>
                </div>

            </div>
            {this.state.showAdd && <ShowAdd/>}
            {this.state.showRemove && <ShowRemove/>}
            {this.state.showPending && <ShowPending/>}
            {this.state.showProducts && <showProducts/>}
        </div>)

    }

}

function ShowAdd() {
    return (
        <div style={styles.components}>

        </div>)
}

function ShowRemove() {
    return (<div>
        <h1>remove product</h1>
    </div>)
}

function ShowPending() {
    return (<div>
        <h1>show pending</h1>
    </div>)
}

function ShowProducts() {
    return (<div>
        <h1>show product</h1>
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
        overflowY: "scroll"
    }

}

export default CreateAccountPage;