import React from "react";
import { useState } from "react";
import { useTelegram } from "../../hooks/useTelegram";
import ProductItem from "../ProductItem/ProductItem";
import "./ProductList.css";
const ProductList = () => {
  const products = [
    {
      id: "1",
      title: "Джинсы",
      price: 5000,
      description: "Синего цвета, прямые",
    },
    {
      id: "2",
      title: "Куртка",
      price: 16000,
      description: "Черного цвета, на меху",
    },
    {
      id: "3",
      title: "Джинсы 2",
      price: 5000,
      description: "Синего цвета, прямые",
    },
    {
      id: "4",
      title: "Джинсы 3",
      price: 5000,
      description: "Синего цвета, прямые",
    },
    {
      id: "5",
      title: "Джинсы 4",
      price: 5000,
      description: "Синего цвета, прямые",
    },
    {
      id: "6",
      title: "Куртка 2",
      price: 12000,
      description: "Зеленого цвета, теплая",
    },
    {
      id: "7",
      title: "Джинсы 5",
      price: 6000,
      description: "Синего цвета, прямые",
    },
    {
      id: "8",
      title: "Куртка 3",
      price: 12000,
      description: "Зеленого цвета, теплая",
    },
  ];

  const getTotalPrice = (items = []) => {
    return items.reduce((sum, item) => {
      return (sum += item.price);
    }, 0);
  };
  const [addedItems, setAddedItems] = useState([]);

  const { tg } = useTelegram();

  const onAdd = (product) => {
    const alredyAdded = addedItems.find((item) => item.id === product.id);
    let newItems = [];
    if (alredyAdded) {
      newItems = addedItems.find((item) => item.id !== product.id);
    } else {
      newItems = [...addedItems, product];
    }
    setAddedItems(newItems);

    if (newItems.length === 0) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Купить ${getTotalPrice(newItems)}`,
      });
    }
  };

  return (
    <div className={"list"}>
      {products.map((item) => (
        <ProductItem product={item} onAdd={onAdd} className={"item"} />
      ))}
    </div>
  );
};

export default ProductList;
