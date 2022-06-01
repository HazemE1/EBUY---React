import React from "react"
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom"
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/auth";
import './App.css';
import Header from './Header';
import Home from "./Home";
import LoginPage from './LoginPage';
import CreateAccountPage from "./CreateAccountPage";

import Profile from "./Profile";
import User from "./User";
import ShoppingCart from "./ShoppingCart";
import Product from "./Product";
import Message from "./Message";

const firebaseConfig = {
    apiKey: "AIzaSyBYJHfzfe9nhfXyxdjvKtQuPnHph0YC9Gc",
    authDomain: "ebuy-fc949.firebaseapp.com",
    databaseURL: "https://ebuy-fc949-default-rtdb.firebaseio.com",
    projectId: "ebuy-fc949",
    storageBucket: "ebuy-fc949.appspot.com",
    messagingSenderId: "138046789057",
    appId: "1:138046789057:web:9359c58997df8b2ea4cb40",
    measurementId: "G-HFCTDBJCSV"
};
firebase.initializeApp(firebaseConfig)


function HomePage(props) {
    console.log(props)
    return (
        <div className="app">
        </div>
    );
}


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            allProducts: null,
        }

        global.sendMessage = (title, message, user) => {
            firebase.database().ref("users").child(user).child("messages").push({
                title: title, message: message
            })
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({user: new User()})

            } else {
                console.log("No user")
            }
        })

        firebase.database().ref("products").on("child_removed", (v) => {
            const arr = this.state.allProducts
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].uuid === v.key)
                    arr.splice(i)
            }
            this.setState({allProducts: arr})
        })

        firebase.database().ref("products").on("value", (v) => {
            const arr = []
            v.forEach(p => {
                arr.push(<Product props={false} uuid={p.key} key={p.key}/>)
            })
            this.setState({allProducts: arr})
        })
    }

    render() {
        return (
            <BrowserRouter className={"bg"} id={"bg"}>
                <Header/>

                <ShoppingCart/>
                {this.state.user != null &&
                    <Message/>}

                <Switch>
                    <Route exact path={"/login"}>
                        <LoginPage products={this.state.allProducts}/>
                    </Route>
                </Switch>
                <Switch>
                    <Route exact path={"/register"}>
                        <CreateAccountPage products={this.state.allProducts}/>
                    </Route>
                </Switch>
                <Switch>
                    <Route exact path={"/home"}>
                        {this.state.user ?
                            <Home user={this.state.user} products={this.state.allProducts}/>
                            : <div/>}
                    </Route>
                </Switch>
                <Switch>
                    <Route exact path={"/profile"}>
                        {this.state.user ?
                            <Profile products={this.state.allProducts} user={this.state.user}/>
                            : <div>
                                <h1>You need to login first! </h1>
                            </div>}
                    </Route>
                </Switch>
                <Switch>
                    <Route exact path={"/"}>
                        {this.state.user === null ?
                            <Redirect products={this.state.allProducts} to="/home"/>
                            :
                            <Redirect products={this.state.allProducts} to="/login"/>

                        }
                    </Route>
                </Switch>

            </BrowserRouter>
        )
    }
}

export default App;
