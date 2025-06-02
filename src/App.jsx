// import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
// import Header from './components/Header';
import Footer from './components/Footer';
import List from './pages/List';
import Add from './components/Add';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import ResponsiveAppBar from './components/AppBar';
import LifeCycle from './pages/LifeCycle';
// Import or create the ItemInfo component
// import ItemInfo from './components/ItemInfo';

function App() {
  const [items, setItems] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [show, setShow] = useState(false); // Missing state for show/hide

  const API_URL = "practica-back-partedos-production.up.railway.app";

  useEffect(() => {
    if (isLogin) {
      getItems();
    }
  }, [isLogin]);

  const getItems = async() => {
    const result = await fetch(`${API_URL}/items/`);
    const data = await result.json();
    setItems(data);
  };

  const del = async (id) => {
    await fetch(`${API_URL}/items/${id}`, {
      method: "DELETE",
    });
    setItems(items.filter((item) => item.id !== id));
  };

  // Missing add function
  const add = async (item) => {
    const res = await fetch(`${API_URL}/items/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    const data = await res.json();
    setItems([...items, data]);
  };

  const login = async (user) => {
    const result = await fetch(`${API_URL}/login/`, {
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

  // You need to define or import ItemInfo component for the route
  const ItemInfo = () => <div>Item Info Component Needed</div>;

  return (
    <div>
      <BrowserRouter>
        {isLogin && <ResponsiveAppBar logout={setLogout} />}
        <Routes>
          <Route path="/" element={<Login login={login}/>} />
          <Route path="/add" element={<Add add={add} />} />
          <Route path="/items" element={<List items={items} ondelete={del}/>} />
          <Route path="/nombre" element={<h1>Hola, Nicolas Mendoza</h1>} />
          <Route path="/items/:id" element={<ItemInfo items={items}/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <button onClick={() => setShow(!show)}>{show ? "Hide" : "Show"}</button>
      {show && <LifeCycle />}
      {/* <Boton name={"suma"} click={sum}/>
      <Boton name={"resta"} click={res} />
      <Boton name={"mensaje"} click={() => alert("hola")} /> */}
    </div>
  );
}

export default App;
