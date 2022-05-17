import "./CreateAccountPage.css";
import {Component} from "react";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";


class CreateAccountPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            cpassword: "",
            error: ""
        }
    }


    register = async () => {
        if (this.state.password !== this.state.cpassword) {
            this.setState({error: "Password does not match!"})
            return
        }
        if (this.state.password.length < 8) {
            this.setState({error: "Password is not long enough!"})
            return
        }

        if (!this.state.email.includes("@") || this.state.email.length < 3) {
            this.setState({error: "Invalid email!"})
            return;
        }
        this.setState({error: ""})

        await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(r => {
                r.user.updateProfile({displayName: this.state.firstname + " " + this.state.lastname});
            })
            .catch(e => {
                this.setState({error: e})
            })

    }


    render() {
        return (
            <div className='background' style={{
                backgroundImage: `url("https://www.thestatesman.com/wp-content/uploads/2020/11/iStock-ecomm.jpg")`
            }}>
                <div className="main">
                    <div className="create">
                        <label style={{color: "red"}}>{this.state.error}</label>

                        <label fName="fName">First name:</label>
                        <input onChange={(r) => this.setState({firstname: r.target.value})} id="fName" name="fName"
                               input="text"
                               required/>

                        <label fName="lName">last name: </label>
                        <input onChange={(r) => this.setState({lastname: r.target.value})} id="lName" name="lName"
                               input="text"
                               required/>

                        <label email="emailAdress">Email address: </label>
                        <input onChange={(r) => this.setState({email: r.target.value})} id="email" name="Email_addrsss"
                               input="email"
                               required/>

                        <label password="password">Password: </label>
                        <input onChange={(r) => this.setState({password: r.target.value})} id="password" name="Password"
                               input="password" required/>

                        <label password_conf="password_conf">Password confirmation: </label>
                        <input onChange={(r) => this.setState({cpassword: r.target.value})} id="password_conf"
                               name="Password_conf"
                               input="password" required/>

                        <button onClick={() => this.register()} type='submit'>Create account
                        </button>
                    </div>
                </div>
            </div>
        )
    }

}


export default CreateAccountPage;