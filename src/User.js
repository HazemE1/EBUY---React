import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export default class User {
    constructor() {
        this.sellingProducts = {};
        this.buyProducts = {};
        this.cart = [];


        this.fetchBuyProducts();
        this.fetchSellingProducts();
        this.getMessages();
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


    addProductToSelling(product){
        
    }

    getUserName(){
        return firebase.auth().currentUser !== null ? firebase.auth().currentUser.displayName : "ERRRR"
    }

}
