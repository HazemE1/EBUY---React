import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export default class User {
    constructor() {
        this.sellingProducts = {};
        this.buyProducts = {};
        this.cart = [];

        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                console.log(user)
            }else{
                console.log(user)
            }

        })
    }


    fetchSellingProducts() {

    }

    saveSellingProducts() {

    }

    fetchBuyProducts() {

    }

    saveBuyProducts() {

    }

    getMessages() {

    }


    getUserName(){
        return firebase.auth().currentUser !== null ? firebase.auth().currentUser.displayName : "NO NAME"
    }

}
