import {Component} from "react"
import "firebase/compat/auth";

import "./LoginPage.css"


class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            password: "",
        }
    }

    loginUser() {
        if (this.state.user.length < 3 || this.state.password < 8 || !this.state.user.includes("@")) {
            this.setState({err: "Invalid username/password"});
            return
        }
    }

    render() {
        return (
            <div className='background' style={{
                backgroundImage: `url("https://www.thestatesman.com/wp-content/uploads/2020/11/iStock-ecomm.jpg")`
            }}>
                <div className='main'>
                    <div>
                        <div className='images'>
                            <div className='imgContainer'>
                                <img
                                    src="https://www.enadglobal7.com/wp-content/uploads/2021/09/blank-profile-picture-973460_640.png"
                                    alt="profile" className='profile'/>
                            </div>
                        </div>
                        <div>
                            <h1 style={{color: "red", fontSize: 15, display: "inline-block"}}>{this.state.err}</h1>

                            <h1>Log in to your account</h1>
                            <div>
                                <img
                                    src="https://pngset.com/images/free-member-icon-download-user-icon-svg-symbol-number-text-logo-transparent-png-1044389.png"
                                    alt="namePic" className="namePic"/>
                                <input type="text" placeholder="Username" className="details"/>
                            </div>
                            <div className='passwordInput'>
                                <img src="https://flyclipart.com/thumb2/password-png-icon-free-download-121695.png"
                                     alt="passPic" className='namePic'/>
                                <input type="text" placeholder="Password" className="details"/>
                            </div>
                            <button className="loginB" onClick={() => this.loginUser()}>Login
                            </button>

                            {/* eslint-disable-next-line no-restricted-globals */}
                            <button className="registerB" onClick={() => location.href = "/register"}>Register</button>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginPage;