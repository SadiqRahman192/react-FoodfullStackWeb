import { currencyFormatter } from "../util/formatting"

export default function CartItem({name, quantity, price , Ondecrease,Onincrease }) {
    return(
        <li className="cart-item">
            <p>
                {name} - {quantity} x {currencyFormatter.format(price)}
            </p>
            <p className="cart-item-actions">
                <button onClick={Ondecrease}>+</button>
                <button>{quantity}</button>
                <button onClick={Onincrease}>-</button>
            </p>
        </li>
    )
}