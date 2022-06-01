import React, {Component} from "react"
import "./Header.css";

import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Mesasge from '@mui/icons-material/Message';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SearchIcon from '@mui/icons-material/Search';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
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


                {/* eslint-disable-next-line no-restricted-globals */}
                <div onClick={() => location.href = "/home"} className="header__logo">
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
                                <a style={{display: "block"}} href={"/login"} className="nav__itemLineTwo">Sign
                                    In</a>
                            </div>
                            :
                            // eslint-disable-next-line no-restricted-globals
                            <div onClick={() => location.href = "/profile"}>

                                <AccountBoxIcon/>
                            </div>

                        }
                    </div>

                    <div onClick={() => global.showMessages()} className="nav__item">
                        <Mesasge/>
                    </div>
                    <div onClick={() => {
                        const cartModalOverlay = document.querySelector('.cart-modal-overlay');
                        if (cartModalOverlay.style.transform === 'translateX(200%)') {
                            cartModalOverlay.style.transform = 'translateX(0)';
                        } else {
                            cartModalOverlay.style.transform = 'translateX(200%)';
                        }
                    }} className="nav__itemBasket">
                        <icon>
                            <ShoppingBasketIcon/>
                        </icon>
                    </div>
                </div>


            </div>
        )
    }

}

export default Header