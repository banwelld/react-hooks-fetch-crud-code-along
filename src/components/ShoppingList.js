import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(('http://localhost:4000/items'))
      .then(res => res.json())
      .then(items => setItems(items));
  }, []);

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  };

  function handleAddItem(itemObj) {
    setItems([...items, itemObj]);
  };

  function onUpdateItem(updateObj) {
    let updatedItemList;
    if (updateObj.action === 'PATCH') {
      updatedItemList = items.map(item => item.id === updateObj.item.id ? updateObj.item : item);
    } else if (updateObj.action === 'DELETE') {
      updatedItemList = items.filter(item => item.id !== updateObj.item.id);
    }
    console.log(updatedItemList);
    setItems(updatedItemList);
    console.log(items);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdateItem={onUpdateItem} />
        ))}
      </ul>
    </div>
  );
};

export default ShoppingList;
