import { LogIn } from 'lucide-react'
import './App.css'
import SignUp from './components/SignUp'
import LoginForm from './components/LoginForm'
import { Toaster } from './components/ui/toaster'
import Navbar from './components/Navbar'
import RegisterAndLogin from './components/RegisterAndLogin'
import  Register from './components/Register.jsx'
import Login from './components/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Products from './components/Products'
import PaginationBox from './components/PaginationBox'
import ProductDetails from './components/ProductDetails'
import { Provider } from 'react-redux'
import store from './store/cart.store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import Order from "@/components/Order/Order.jsx"
import OrderHistory from './components/Order/OrderHistory'
import HomeStart from './components/Home/HomeStart'
import Home from './components/Home/Home'
import "@/components/Home/styles.css"
import Profile from './components/Profile'
import Dashboard from '@/components/Order/Dashboard.jsx'
import AddProducts from "@/components/Dashboard/AddProducts.jsx"
function App() {

  const persistor = persistStore(store);

  return (
    <>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
    <Router>
    
    <Toaster/>
    <Navbar/>
    <div className='light overflow-x-hidden no-scrollbar'>
    <Routes>
      <Route path='/order' element={<Order></Order>}/>
      <Route path='/order-history' element={<OrderHistory/>}/>
      <Route path="/products" element={<Products></Products>}/>
      <Route path='/log-in' element={<Login/>} />
      <Route path='/sign-up' element={<Register/>} />
      <Route path='/' element={<Home></Home>} />
      <Route path='/product/:id' element={<ProductDetails></ProductDetails>}/>
      <Route path="/profile" element={<Profile></Profile>}/>
      <Route path="/dashboard" element={<Dashboard></Dashboard>} />
      {/* <Route path="/dashboard/add-product" element={<AddProducts></AddProducts>}/> */}
    </Routes>
    </div>
    </Router>
    </PersistGate>
    </Provider>
    </>
  )
}

export default App
