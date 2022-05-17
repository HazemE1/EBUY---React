import {Component} from "react"
import "./LoginPage.css"

class LoginPage extends Component{
    constructor(props) {
        super(props);
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
                            <button onClick={console.log('trynna log in?')}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginPage;