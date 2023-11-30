import Footer from "./components/Footer";
import Header from "./components/Header";
import { Route, Routes } from 'react-router-dom'
import Home from "./pages/Home";
import ItemCarts from "./pages/ItemCarts";
import ShoppingCartProvider from "./context/ShoppingContext";
function App (){
  return (
    <ShoppingCartProvider>
    <Header/>
    <Routes>
      {/* public-routes */}
      <Route path="/" element={<Home/>}/>
      <Route path="/item-cart" element={<ItemCarts/>}/>
    </Routes>
    <Footer/>
    </ShoppingCartProvider>
  )
}

export default App;