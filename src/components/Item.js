import React from "react";

function Item({ item, onUpdateItem }) {

  function handleAddToCartClick() {
    const action = 'PATCH';
    const itemChange = {isInCart: !item.isInCart};
    fetch((`http://localhost:4000/items/${item.id}`), {
      method: action,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(itemChange)
    })
      .then(res => res.json())
      .then(item => onUpdateItem({ item: item, action: action }));
  }

  function handleDeleteItem() {
    const action = 'DELETE';
    fetch((`http://localhost:4000/items/${item.id}`), {
      method: action
    })
      .then(res => res.json())
      .then(res => onUpdateItem({ item: { id: item.id }, action: action }));
  }
  
  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className={item.isInCart ? "remove" : "add"} onClick={handleAddToCartClick}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDeleteItem}>Delete</button>
    </li>
  );
}

export default Item;
