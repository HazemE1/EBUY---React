import "./CreateAccountPage.css";

function CreateAccountPage() {
    return (
        <div className="create">
            <div>
                <label fName="fName">First name:</label>
                <input id="fName" name="fName" input="text" required />

                <label fName="lName">last name: </label>
                <input id="lName" name="lName" input="text" required />

                <label uName="fName">Username: </label>
                <input id="uName" name="uName" input="text" required />

                <label email="emailAdress">Email address: </label>
                <input id="email" name="Email_addrsss" input="email" required />

                <label password="password">Password: </label>
                <input id="password" name="Password" input="password" required />

                <label password_conf="password_conf">Password confirmation: </label>
                <input id="password_conf" name="Password_conf" input="password" required />
            </div>
            <div>
                <button type='submit'>Create account</button>
            </div>
        </div>
    )
}

export default CreateAccountPage;