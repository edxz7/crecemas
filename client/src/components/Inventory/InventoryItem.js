import React, { useState, useEffect, useContext} from 'react';
import { MyContext } from "../../context";

import {
  CheckoutItemContainer,
  TextContainer,
  QuantityContainer,
  RemoveButtonContainer
} from './InventoryItem.Styles';

const InventoryItem = ({ cartItem }) => {
  
  const context = useContext(MyContext)
  const { _id, item, category, price, quantity } = cartItem;
  const [counter, setCounter] = useState(0);
  const [stock, setStock] = useState(quantity);
  const [transaction, setTransaction] = useState(
    {
      quantity: stock,
      item: cartItem._id,
      author: context.state.user._id,
      commerceId:context.state.commerce._id
    });
  const [updated, setUpdated] = useState(false)
    useEffect(() => {
      if (!updated) return
      context.handleRegisterTransaction(transaction)
      setCounter(0)
      setStock(transaction.quantity)
      setUpdated(false)
    }, [transaction]);

  // console.log(transaction)
  const addItemFunc = (cartItem, counter) => {
    if (counter < transaction.quantity) {
      counter++;
      setCounter(counter)
      setStock(transaction.quantity - counter)
    }
  }

  const removeItemFunc = (cartItem, counter) => {
    if (counter > 0) {
      counter--;
      setCounter(counter)
      setStock(transaction.quantity - counter)
    }
  }


  return (
    <MyContext>
      {context => (
        <CheckoutItemContainer>
          <TextContainer>{item}</TextContainer>
          <QuantityContainer>
            <div onClick={() => removeItemFunc(cartItem, counter)}>&#10094;</div>
            <span>{counter}</span>
            <div onClick={() => addItemFunc(cartItem, counter)}>&#10095;</div>
          </QuantityContainer>
          <TextContainer>{price}</TextContainer>
          <TextContainer>{stock}</TextContainer>

          <RemoveButtonContainer onClick={(e) => {
            setUpdated(true)
            setTransaction({
              quantity: stock,
              itemId: cartItem._id,
              author: context.state.user._id,
              commerceId:context.state.commerce._id
            })

          }}>
            &#10005;
            {/* <input type="text" name="id" value={_id} hidden />
            <input type="text" name="quantity" value={quantity} hidden /> */}
          </RemoveButtonContainer>
        </CheckoutItemContainer>
      )}
    </MyContext>
  );
};

InventoryItem.contextType = MyContext;

export default InventoryItem;
