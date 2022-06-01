import './AddItemPage.css'
import firebase from "firebase/compat/app";
import "firebase/compat/storage"
import "firebase/compat/auth"
import "firebase/compat/database"


import {Component} from "react"

class AddItemPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            price: "",
            image: "",
            condition: "New",
            description: "",
            category: "",
            yearofmake: "",
            colour: "",
            user: firebase.auth().currentUser.uid,
            uuid: (Date.now() + Math.random() + "").replace(".", ""),
            confirm: "",
            err: ""
        }

        this.temp = ""

    }

    async uploadImage(image) {
        return await firebase.storage().ref("Products/" + this.state.uuid).put(image)
            .then(async (r) => {
                return await r.ref.getDownloadURL()
            })
            .catch(e => {
            })
    }


    async register() {
        if (this.state.name === "" || this.state.price === "" ||
            this.state.category === "" || this.state.yearofmake === "" || this.state.description === "" ||
            this.state.condition === "" || this.temp === "" || this.state.colour === "") {
            this.setState({err: "You must fill in everything!"})
            return
        }

        const image = await this.uploadImage(this.temp)

        await this.setState({image: image, confirm: null, err: null}, async () => {
                await firebase.database()
                    .ref("products")
                    .child(this.state.uuid)
                    .set(this.state)
                    .then(r => {
                        this.setState({confirm: "WORKED!!"})
                    })
                    .catch(e => {
                        this.setState({err: "DIDNT WORK"})
                    })

                await firebase.database()
                    .ref("users")
                    .child(this.state.user)
                    .child("products")
                    .child(this.state.uuid)
                    .set(this.state.uuid)
                    .then(r => {
                        this.setState({confirm: "WORKED!!"})

                    })
                    .catch(e => {
                        this.setState({err: "DIDNT WORK"})
                    })

                global.sendMessage("New product has been added!", this.state.name + " Has been added to the shop!", this.state.user)
            }
        )
    }

    render() {
        return (
            <div className='background' style={{
                background: "rgba(0,0,0,0.9)"
            }}>
                <div className="main">
                    <div className="addItem">
                        <label style={{color: "red"}}>{this.state.err}</label>
                        <label style={{color: "green"}}>{this.state.confirm}</label>

                        <label itemType="itemType">Name:</label>
                        <input value={this.state.value} onChange={(r) => this.setState({name: r.target.value})}
                               id="itemType" name="itemType"
                               input="text"
                               required/>
                        <label categoriy="category">Category:</label>
                        <input value={this.state.category} onChange={(r) => this.setState({category: r.target.value})}
                               id="category" name="category"
                               input="text"
                               required/>
                        <label price="price">Price: </label>
                        <input value={this.state.price} onChange={(r) => this.setState({price: r.target.value})}
                               id="price" name="price"
                               input="number"
                               required/>


                        <label yearofmake="yearofmake">Year of make: </label>
                        <input value={this.state.yearofmake}
                               onChange={(r) => this.setState({yearofmake: r.target.value})} id="yearofmake"
                               name="yearofmake"
                               input="number"
                               required/>


                        <label colour="colour">Colour: </label>
                        <input value={this.state.colour} onChange={(r) => this.setState({colour: r.target.value})}
                               id="colour" name="colour"
                               input="text"
                               required/>

                        <label description="description">Description: </label>
                        <input value={this.state.description} className='description'
                               onChange={(r) => this.setState({description: r.target.value})}
                               id="description" name="description"
                               input="text"
                               required/>

                        <label condition="condition" className='condition'>Condition:
                            <select value={this.state.condition}
                                    onChange={(v) => this.setState({condition: v.target.value})}
                                    className="condition" id="condition">
                                <option value="new">New</option>
                                <option value="very_good">Very good</option>
                                <option value="good">Good</option>
                                <option value="not_working">Not working properly</option>
                            </select>
                        </label>

                        <div>
                            <button className="addImage"
                                    onClick={() => this.inputFile.click()}
                                    type='submit'>Image
                                <input onChange={(r) => this.temp = r.target.files[0]} accept="image/*"
                                       type='file'
                                       id='file' ref={(r) => this.inputFile = r} style={{display: 'none'}}/>
                            </button>
                        </div>
                        <div>
                            <button className="submit" onClick={() => this.register()} type='submit'>Add item</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddItemPage;