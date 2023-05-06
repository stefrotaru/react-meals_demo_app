import { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import ConfettiExplosion from 'react-confetti-explosion';

// function App() {
//   const [isExploding, setIsExploding] = React.useState(false);
//   return <>{isExploding && <ConfettiExplosion />}</>;
// }

const Cart = props => {
    const [isExploding, setIsExploding] = useState(false);
    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id)
    };

    const cartItemAddHandler = item => {
        cartCtx.addItem({...item, amount: 1})
    };

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map(item => (
                <CartItem 
                    key={item.id} 
                    name={item.name}
                    price={item.price}
                    amount={item.amount}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            ))}
        </ul>
    );

    const onOrderBtnHandler = () => {
        if (isExploding === false) {
            setIsExploding(true);
            cartCtx.removeAll();
            setTimeout(() => {
                setIsExploding(false);
            }, 2000)
        }
    };

    return (
        <Modal onClose={props.onClose}>
            {isExploding && <ConfettiExplosion />}
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
                {hasItems && <button className={classes.button} onClick={onOrderBtnHandler}>Order</button>}
            </div>
        </Modal>
    )
};

export default Cart;