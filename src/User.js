import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import Product from "./Product";

export default class User {
    constructor() {
        this.sellingProducts = [];
        this.pendingProducts = [];
        this.messages = []
        this.cart = [];


        global.user = this;
        this.fetchPendingProducts();
        this.fetchSellingProducts();
        this.getMessages();
    }



    fetchSellingProducts() {

        firebase.database()
            .ref("users")
            .child(firebase.auth().currentUser.uid)
            .child("products")
            .on("value", p => {
                const arr = []
                p.forEach(v => {
                    arr.push(<Product props={false} uuid={v.val()}/>)
                })
                this.sellingProducts = arr
            })
    }

    saveSellingProducts() {


    }

    fetchPendingProducts() {

        firebase.database()
            .ref("users")
            .child(firebase.auth().currentUser.uid)
            .child("pending")
            .on("value", p => {
                const arr = []
                p.forEach(v => {
                    arr.push(<Product buyer={v.val().buyer} values={v.val()} props={true} key={v.key} uuid={v.key}/>)
                })
                this.pendingProducts = arr
            })
    }

    getMessages() {
        firebase.database()
            .ref("users")
            .child(firebase.auth().currentUser.uid)
            .child("messages")
            .on("value", (s) => {
                const arr = []

                s.forEach(v => {
                    arr.push({
                        title: v.val().title,
                        message: v.val().message,
                        uuid: v.key
                    })
                })

                if (this.messages.length !== 0 && this.messages.length < arr.length)
                    alert("You have a new message!")
                this.messages = arr;
            })
    }

    delMessage(uid) {
        firebase.database()
            .ref("users")
            .child(firebase.auth().currentUser.uid)
            .child("messages")
            .child(uid).remove().then()
    }

    getUserName() {
        return firebase.auth().currentUser !== null ? firebase.auth().currentUser.displayName : "ERRRR"
    }

}
