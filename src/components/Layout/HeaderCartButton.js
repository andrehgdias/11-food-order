import { useContext, useEffect, useState } from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
	const [btnAnim, setBtnAnim] = useState(false);
  const cartCtx = useContext(CartContext);
	const { items } = cartCtx;

  const numberOfItems = items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);
	
	const btnClasses = `${classes.button} ${btnAnim ? classes.bump : ''}`;

	useEffect(() => {
		if(items.length === 0)
			return ;

		setBtnAnim(true);
		
		const timer = setTimeout(() => setBtnAnim(false), 300);

		return () => clearTimeout(timer);
	},[items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfItems}</span>
    </button>
  );
};

export default HeaderCartButton;
