import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const OrderHistory = () => {
  const URI = import.meta.env.VITE_URI
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(()=>{
      const token = localStorage.getItem("accessToken")
      document.title="Order History"
        const fetchOrders = async()=>{
            setLoading(true)
            const response = await axios.get(`${URI}/api/v1/orders/get-orders`,{
              headers:{
                Authorization: `Bearer ${token}`
              }
            })
            setOrders(response.data.data)
            setLoading(false)
        }
        fetchOrders()
    },[])
  return (
    <>
    <div className='main h-[91vh] w-[100vw]  overflow-y-scroll scrollbar-hide'>
      <div className='h-[5vh] w-[100vw]  flex justify-center items-center bg-slate-900 text-white'> Your Previous Orders</div>
      <div className='w-[100vw] min-h-[90%]  mt-2 space-y-3 '>
        {orders.map((order)=>{
          return (
            <div className='w-[100vw] h-[25vh]  flex border-2 border-black rounded-xl' key={order._id}>
            <div className='w-[30%] h-[100%] flex justify-center items-center'>
                <img src={order.items[0].productId.images[0]} alt=""  className='object-cover h-[80%] w-[80%] sm:h-[100%] sm:w-[40%]' />
            </div>
            <div className='w-[35%] h-[100%]  ml-2 overflow-y-scroll scrollbar-hide'>
              {order.items.map((item)=>{
                
                  return (
                    
                  <Link key={item.productId} to={`/product/${item.productId._id}`} className='ml-2 mt-2 hover:underline'>{item.productId.name} <br/>
                  <h1 className='ml-2'>{`Quantity: ${item.quantity}`}</h1>
                  </Link>
                  
                )
                
              })}
            </div>
            <div className='w-[35%] h-[100%] overflow-y-scroll scrollbar-hide'>
              <h1>{`Status: ${order.status} `}</h1>
              <h1>{`Total Price: ${order.totalAmount}`}</h1>
              <div>
                <h1>{`Address Type: ${order.shippingAddressId.addressType}`}</h1>
                <h1>{`Street: ${order.shippingAddressId.street}`} <br/> {`City: ${order.shippingAddressId.city}`}<br/>{`State: ${order.shippingAddressId.state}`}<br/>{`Pin Code: ${order.shippingAddressId.postalCode}`}</h1>
              </div>
            </div>
          </div>


          )
})}
      
      </div>
    </div>
    </>
  )
}

export default OrderHistory
