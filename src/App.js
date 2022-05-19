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



function HomePage() {

    return (
        <div className="app">
            <Header/>
            <Home/>
        </div>
    );
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: new User(),

        }
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                this.setState({user: new User()})

            }else{
                console.log(user)
            }

        })


    }

    render() {
        return (
            <BrowserRouter className={"bg"} id={"bg"}>
                <ShoppingCart/>

                <Switch>
                    <Route exact path={"/login"}>
                        <LoginPage user={this.state.user}/>

                    </Route>
                </Switch>
                <Switch>
                    <Route exact path={"/register"}>
                        <CreateAccountPage user={this.state.user}/>
                    </Route>
                </Switch>
                <Switch>
                    <Route exact path={"/home"}>
                        <HomePage user={this.state.user}/>
                    </Route>
                </Switch>
                <Switch>
                    <Route exact path={"/profile"}>
                        <Profile user={this.state.user}/>
                    </Route>
                </Switch>
                <Switch>
                    <Route exact path={"/"}>
                        <Redirect to="/home"/>
                    </Route>
                </Switch>

            </BrowserRouter>
        )
    }
}

export default App;
