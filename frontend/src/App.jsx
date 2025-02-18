import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Collection from './pages/Collection'
import Product from './pages/Product'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Login from './pages/login'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './pages/Profile'
import OrderDetails from './pages/OrderDetails'
import Wishlist from './pages/Wishlist'
import ReviewViewMore from './components/ListReviews'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Custom from './pages/Custom'

const App = () => {
  return (
    <div className='px-3 sm:px-[4vw] md:px-[5vw] lg:px-[7vw]'>
      <ToastContainer/>
      <Navbar />
      <SearchBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/custom" element={<Custom />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/wishlist" element={<Wishlist/>} />
        <Route path="/order-details/:productId" element={<OrderDetails/>} />
        <Route path="/review-page" element={<ReviewViewMore/>} />
        <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App