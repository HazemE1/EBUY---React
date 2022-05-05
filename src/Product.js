import React from "react"
import "./Product.css"

function Product() {
    return (
        <div>
            <div className="Product">
                <div className="product__info">
                    <p>Title</p>
                    <p className="product__price">€30</p>
                    <p className="product__rating">⭐️⭐️⭐️</p>
                </div>
                <img src="import imageImport from './image.png';" alt="" />
            </div>

            <button>Add to Basket</button>

        </div>
    )
}
export default Product