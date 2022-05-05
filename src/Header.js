import React from "react"
import "./Header.css";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div className="header">
            <Link to="/" style={{ textDecoration: "none" }}>
                <div className="header__logo">
                    <StorefrontIcon className='header_logoImage' FontSize="large" />
                    <h2 className='header__logoTitle'>Mini Project</h2>
                </div>
            </Link>

            <div className="header__search">
                <input type="text" className="header__searchInput" />
                <SearchIcon className='header__searchIcon' />

            </div>
            <div className="header__nav">
                <div className="nav__item">
                    <span className="nav_itemLineOne">Hello Guest</span>
                    <span className="nav_itemLineTwo">Sign In</span>
                </div>
                <div className="nav__item">
                    <span className="nav_itemLineOne">Your</span>
                    <span className="nav_itemLineTwo">Shop</span>
                </div>
                <Link to="/checkout" state={{ textDecoration: "none" }}>
                    <div className="nav__item">
                        <ShoppingBasketIcon className="itemBasket" />
                        <span className="nav_itemLineTwo nav__basketCount">0</span>
                    </div>
                </Link>

            </div>

        </div>
    )

}

export default Header