import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useToast } from '../ui/use-toast'
import { useDispatch } from 'react-redux'
import { emptyCart } from '@/store/cart.slice.js'
import { useNavigate } from 'react-router-dom'
import { Loader, LoaderCircle } from 'lucide-react';
import { Loader2 } from 'lucide-react'

const Order = () => {
  const {toast}= useToast()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const form = useForm()
  const [orderItems,setOrderItems] = useState([])
  const [lastAddress,setLastAddress] = useState({})
  const [addressSent,setAddressSent] = useState(false)
  const [addressDetails,setAddressDetails] = useState({})
  const [isLoading,setIsLoading] = useState(false)
  const [addressLoading,setAddressLoading] = useState(false)
  useEffect(()=>{
    const token = localStorage.getItem("accessToken")
    const URI = import.meta.env.VITE_URI
    document.title="Order"
    const getOrder = async()=>{
      
      const cartResponse = await axios.get(`${URI}/api/v1/carts/latest`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
       
        const transformedItems = cartResponse.data?.data[0]?.items?.map(item => ({
          _id: item.productId._id,
          name: item.productId.name,
          price: item.productId.price,
          quantity: item.quantity,
          images: item.productId.images,
          categoryId: item.productId.categoryId,
          createdAt: item.productId.createdAt,
          stock: item.productId.stock,
          description: item.productId.description
        }));
        setOrderItems(transformedItems)
        
       
    }
    getOrder()

    const getAddress = async()=>{
      const response = await axios.get(`${URI}/api/v1/address/latest`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      setLastAddress(response.data.data[0])
      
    }
    getAddress()


  },[])


  const onSubmit = async(data)=>{
    console.log("kya hua bhai")
    try {
      const URI = import.meta.env.VITE_URI
      const token = localStorage.getItem("accessToken")
     
      setAddressLoading(true)
      const response = await axios.post(`${URI}/api/v1/address/add`,data,{
          headers:{
          Authorization: `Bearer ${token}`
        }
      })
      
      setAddressLoading(false)
      setAddressDetails(data)
      toast({
        title: "Address Added",
        status: "success",
      })
      
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
      })
      setAddressSent(false)
      setAddressLoading(false)
      
    }finally{
      setAddressSent(false)
      setAddressLoading(false)
    }
  }
    


  const handleEditAddress =()=>{
    setAddressSent(false)
    setAddressDetails({})
  }

  const totalPrice = orderItems && orderItems?.reduce((total, orderItem) => {
    return total + orderItem.price * orderItem.quantity
  }, 0)

  const order = async (orderItems)=>{
 try {
      const URI = import.meta.env.VITE_URI
      const token = localStorage.getItem("accessToken")
    
     const orderCreation = async(orderItems)=>{
      setIsLoading(true)
       const response = await axios.post(`${URI}/api/v1/orders/create`,{
         totalAmount: totalPrice,
       },{
        headers:{
           Authorization: `Bearer ${token}`
         }
       })
       toast({
        title: "Order Created",
        status: "success",
      })
      setIsLoading(false)
     }
     await orderCreation()
    
     const cartRefresh = async()=>{
      setIsLoading(true)
      const response = await axios.get(`${URI}/api/v1/carts/refresh`,{
        headers:{
           Authorization: `Bearer ${token}`
         }
      })
      
         if (response.status === 200) {
        dispatch(emptyCart());
      }
      setIsLoading(false)
     }
     await cartRefresh()

     navigate("/products")
     

 } catch (error) {
    toast({
      title: "Error",
      status: "error",
      description: error.message,
    })
 } finally{
  setIsLoading(false)
 }
  
  }
  return (
    <>
      <div className="w-[100%] min-h-[92vh] bg-[#973131]">
        <div className="header w-[100%] sm:h-[10vh] h-[5vh] flex justify-center items-center">
          <h1 className='sm:text-xl text-[#F5E7B2] uppercase'>Create and Place your Order</h1>
        </div>
        <div className="content w-[100vw] h-[100%] space-y-4">
          <div className='w-[100%] h-[100%] flex justify-center items-center'>
          <Accordion type="single" collapsible className='space-y-4 w-[90%]'>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-[#F5E7B2]">Your Order Items</AccordionTrigger>
              <AccordionContent className="text-black">
                <div className="header h-[5vh] flex  text-black text-xs sm:text-base">
                  <div className="h-[100%] w-[28%] border flex justify-center items-center text-[#F5E7B2]">
                    Product
                  </div>
                  <div className="h-[100%] w-[18%] border flex justify-center items-center text-[#F5E7B2]">
                    Name
                  </div>
                  <div className="h-[100%] w-[18%] border flex justify-center items-center text-[#F5E7B2]">
                    Quantity
                  </div>
                  <div className="h-[100%] w-[18%] border flex justify-center items-center text-[#F5E7B2]">
                    Price
                  </div>
                  <div className="h-[100%] w-[18%] border flex justify-center items-center text-[#F5E7B2] ">
                    Total Price
                  </div>
                </div>
                {orderItems && orderItems.map((orderItem) => {
                  return (
                    
                      <div className="h-[15vh] w-[100%] bg-[#F5E7B2] text-[#973131] sm:text-base flex" key={orderItem._id} >
                        <div className=" h-[100%] w-[28%]  flex justify-center items-center">
                          <img
                            src={orderItem.images?.[0]}
                            alt=""
                            className="w-[60%] h-[80%] object-contain"
                          />
                        </div>
                        <div className=" h-[100%] w-[18%]  flex justify-center items-center">
                          <h2>{orderItem.name}</h2>
                        </div>
                        <div className="h-[100%] w-[18%]   flex justify-center items-center">
                          <h2>{orderItem.quantity}</h2>
                        </div>
                        <div className="h-[100%] w-[18%]    flex justify-center items-center">
                          <h2>{`Rs. ${orderItem.price}`}</h2>
                        </div>
                        <div className="h-[100%] w-[18%]   flex justify-center items-center">
                          <h2>{`Rs .${orderItem.price * orderItem.quantity}`}</h2>
                        </div>
                      </div>
                    
                  );
                })}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2 bg-[#F5E7B2]">
              
              <AccordionTrigger className="text-[#F5E7B2] sm:text-base">Add your Address </AccordionTrigger>
              <AccordionContent className="bg-[#F5E7B2] p-4">
                {!addressSent &&
                  <>
                  <div className='address border-2 hidden  max-h-[20vh] w-[50%]'>
                    <h1>Last Address used</h1>
                    <h2>{lastAddress.street}</h2>
                    <h2>{lastAddress.state}</h2>
                    <h2>{lastAddress.city}</h2>
                    <h2>{lastAddress.postalCode}</h2>
                  </div>
                  </>
                }
                {
                  addressSent && 
                  <>
                  <div className='address border-2 border-black max-h-[20vh] w-[50%]'>
                    <h2>{addressDetails.street}</h2>
                    <h2>{addressDetails.state}</h2>
                    <h2>{addressDetails.city}</h2>
                    <h2>{addressDetails.postalCode}</h2>
                  </div>
                  </>
                }
                {!addressSent &&
                 <Form {...form} className="">
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                      control={form.control}
                      name="street"
                      render={({ field }) => (
                        <FormItem className="text-[#973131]">
                          <FormLabel>Street</FormLabel>
                          <FormControl>
                            <Input className="max-w-[55vw] border border-green-500" placeholder="Street XYZ" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#973131]">City</FormLabel>
                          <FormControl>
                            <Input className="max-w-[30vw] border border-green-500" placeholder="Georgia" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem className="text-[#973131]">
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input className="max-w-[30vw] border border-green-500" placeholder="New Delhi" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#973131]">City</FormLabel>
                          <FormControl>
                            <Input className="max-w-[20vw] border border-green-500" placeholder="474001" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <div className="btn mt-2">
                    <Button type="submit" className="bg-[#E0A75E] text-[#973131] hover:bg-[#973131] hover:text-[#E0A75E] ">   {addressLoading &&<> <Loader2 className='animate animate-spin'></Loader2> "Adding.."</>}{!addressLoading && "Add this address"}</Button>
                    </div>
                  </form>
                </Form>}
                {addressSent && <Button onClick = {handleEditAddress}> Edit Address</Button>}
              </AccordionContent>
              
            </AccordionItem>
            <AccordionItem value='Item-3'>
              <AccordionTrigger className="text-[#F5E7B2]">
                      Your Order Summary
              </AccordionTrigger>
              <AccordionContent>
                      <div className='h-[30vh] w-[100%]  flex justify-center items-center'>
                        <div className='w-[70%] h-[80%] p-2 border-2 border-black rounded-2xl bg-[#F5E7B2]'>
                          <h1 className='text-lg text-nowrap'>{`Total payable amount: Rs ${totalPrice}`}</h1>
                          </div>  
                      </div>  
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          </div>
          <div className='w-[100%] h-[100%] flex items-center justify-center '>
          <Button onClick={()=>order(orderItems)} className="bg-[#E0A75E] text-[#973131] hover:bg-[#973131] hover:text-[#E0A75E]">{isLoading ? <div className='flex justify-center items-center text-lg'><LoaderCircle className='animate animate-spin' /> "Paying"</div> : "Pay now"} </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order
