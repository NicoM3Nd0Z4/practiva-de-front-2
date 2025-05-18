import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import List from './pages/List';
import Add from './components/Add';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import ResponsiveAppBar from './components/AppBar';

function App() {
  const [items, setItems] = useState([]);

  // const [count, setCount] = useState(0);

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (isLogin) {
      getItems();
    }
  }, [isLogin]);

  const getItems = async() => {
    const result = await fetch("http://localhost:5000/items/");
    const data = await result.json();
    setItems(data);
  };

  // const sum = () => {
  //   setCount(count + 1, console.log(count));
  // };
  // const res = () => {
  //   setCount(count - 1, console.log(count));
  // };

  const add = async(item) => {
    // item.id = items.length + 1;
    const result = await fetch("http://localhost:5000/items/", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(item),
    });
    setItems([...items, item]);
  };

  const del = async (id) => {
    await fetch("http://localhost:5000/items/" + id, {
      method: "DELETE",
    });
    setItems(items.filter((item) => item.id !== id));
  };

  const login = async (user) => {
    const result = await fetch("http://localhost:3001/login/", {
      method: "POST", 
      headers: {"Content-Type": "application/json"}, 
      body: JSON.stringify(user),
    });
    const data = await result.json();
    setIsLogin(data.isLogin);
    return data.isLogin;
  };

  const setLogout = () => {
    setIsLogin(false);
  };

  return (
    <div>
      <BrowserRouter>
        {isLogin && <ResponsiveAppBar setLogout={setLogout} />}
        <Routes>
          <Route path="/" element={<Login login={login}/>} />
          <Route path="/add" element={<Add add={add} />} />
          <Route path="/items" element={ <List items={items} ondelete={del}/> } />
          <Route path="/nombre" element={<h1>Hola, Nicolas Mendoza</h1>} />
        </Routes>
        <Footer />
      </BrowserRouter>
      {/* <Boton name={"suma"} click={sum}/>
      <Boton name={"resta"} click={res} />
      <Boton name={"mensaje"} click={() => alert("hola")} /> */}
    </div>
  );
}

export default App;
