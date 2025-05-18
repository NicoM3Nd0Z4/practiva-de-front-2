import React from 'react'
import Boton from './Boton'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Add = ({add}) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  const addItem = () => {
    add({name, price});
    setName("");
    setPrice(0);
  };

  const onsubmit = (e) => {
    e.preventDefault();
    if (!name | !price) return;
    add({name: name, price: price});
    setName("");
    setPrice("");
    navigate('/items');
  };

  return (
    <form onSubmit={onsubmit}>
      <input onChange={(e) => setName(e.target.value)} value={name} type="text" id="" name="" />
      <input onChange={(e) => setPrice(e.target.value)} value={price} type="text" id="" name="" />
      <input type='submit' value={"add"} />
    </form>
  )
}

export default Add
