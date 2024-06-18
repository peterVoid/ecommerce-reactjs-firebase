import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Pages/Home";
import Login from "./components/Pages/Login";
import Register from "./components/Pages/Register";
import DetailProduct from "./components/Pages/DetailProduct";
import Notification from "./components/Notification/Notification";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useStoreStore } from "./lib/useUserStore";
import Cart from "./components/Pages/Cart";

function App() {
  const { user, changeUser } = useStoreStore();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      changeUser(user?.uid);
    });

    return () => {
      unsub();
    };
  }, [changeUser]);

  return (
    <BrowserRouter>
      {user && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/login" />}
        ></Route>
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        ></Route>
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        ></Route>
        <Route
          path="/product/:id"
          element={!user ? <Navigate to="/login" /> : <DetailProduct />}
        ></Route>
        <Route
          path="/cart"
          element={!user ? <Navigate to="/login" /> : <Cart />}
        ></Route>
      </Routes>
      <Notification />
    </BrowserRouter>
  );
}

export default App;
