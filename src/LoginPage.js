import "./LoginPage.css"

function LoginPage() {
    return (
        <div className="login">
            <div>
                <label uName="fName">Username: </label>
                <input id="uName" name="uName" input="text" required />

                <label password="password">Password: </label>
                <input id="password" name="Password" input='password' required />
            </div>
            <div>
                <button type='submit'>Login</button>
            </div>
        </div>
    )
}

export default LoginPage;