import React, {Component} from "react"
import "./Header.css";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SearchIcon from '@mui/icons-material/Search';
import {Link} from "react-router-dom"
import firebase from "firebase/compat/app";
import "firebase/compat/auth"

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            counter: 1
        }


    }


    render() {

        return (
            <div className="header">
                <div className="header__logo">
                    <StorefrontIcon className="header__logoImage" fontSize="large"/>
                    <h2 className="header__logoTitle">Mini project</h2>
                </div>

                <div className="header__search">
                    <input type="text" className="header__searchInput"/>
                    <SearchIcon className="header__searchIcon"/>
                </div>

                <div className="header__nav">
                    <div className="nav__item">
                        {firebase.auth().currentUser === null ?
                            <div>
                                <span style={{display: "block"}} className="nav__itemLineOne">Hello Guest</span>
                                <Link style={{display: "block"}} to={"login"} className="nav__itemLineTwo">Sign
                                    In</Link>
                            </div>
                            :
                            <div>
                                <span style={{display: "block", textAlign: "center"}}
                                      className="nav__itemLineOne">Hello</span>
                                <span style={{display: "block", fontWeight: "bold"}}
                                      className="nav__itemLineOne">{firebase.auth().currentUser.displayName}</span>
                            </div>

                        }
                    </div>

                    <div className="nav__item">
                        <span className="nav__itemLineOne">Your</span>
                        <span className="nav__itemLineTwo">Shop</span>
                    </div>
                    <div className="nav__itemBasket">
                        <ShoppingBasketIcon/>
                        <span className="nav__itemLineTwo nav__basketCount">0</span>
                    </div>
                </div>


            </div>
        )
    }

}

export default Header