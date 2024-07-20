import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useToast } from "@/components/ui/use-toast"
import { fetchUser, getUser } from '@/store/user.slice.js'
import { useDispatch, useSelector } from 'react-redux'
import { setCart } from '@/store/cart.slice.js'




const LoginForm = () => {
  const URI = import.meta.env.VITE_URI
  console.log("URIII CALL",URI)

  const isLoggedIn = useSelector(state => state.user.isLoggedIn)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  useEffect(()=>{
    if(isLoggedIn){
      navigate('/')
      
    }

  },[isLoggedIn,navigate])

 
 
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [isSubmitting,setIsSubmitting] = useState(false)
    



    const form = useForm()
    const { toast } = useToast()


    const onSubmit = async (data,e) => {
        e.preventDefault()
        setIsSubmitting(true)
      try {
       
        const response = await axios.post(`${URI}/api/v1/users/login`,data)
        localStorage.setItem('accessToken',response.data.data.accessToken)
        const token = localStorage.getItem('accessToken')
        const cartResponse = await axios.get(`${URI}/api/v1/carts/latest`,{
          headers: {
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
        if(!transformedItems){
         
        }else{
          dispatch(setCart(transformedItems))
        }
        dispatch(getUser())
       
        toast({
          title: "Success !",
          description: "User logged in successfully",
        });


        setIsSubmitting(false);  
        

      } catch (error) {
        const parser = new DOMParser();
        const htmlDocument = parser.parseFromString(error?.response?.data, 'text/html');
        const preElement = htmlDocument.querySelector('pre');
        const errorMessage = preElement?.innerHTML?.split('<br>')[0];
        toast({
          title: "Failed !",
          description: errorMessage,
          varient: "destructive"
        });
        setIsSubmitting(false)
      } finally{
        form.reset()
        setIsSubmitting(false)
      }
    }
    useEffect(() => {
      if(isLoggedIn){
        navigate("/")
      }
    },[isLoggedIn])

  return (
    <>
   
    <div className="m-0 border border-black flex justify-center items-center light rounded-2xl shadow-2xl bg-black sm:w-[40%] h-[80%] text-white w-[80%]">
      <div className=" h-[50vh] w-[80%] ">
    <Form {...form} className="w-[25vw]">
      <form  className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input 
                className="text-white"
                placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                className="text-white"
                 type="password" placeholder="Enter your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" disabled ={isSubmitting} className="w-full  bg-[#6d4ba4] hover:bg-[#593c89]"
        >
          Login</Button>

         <div className='w-[100%] flex justify-center items-center'> 
          <h1 >OR</h1>
          </div>
        <Button type="button" className="w-full  bg-[#6d4ba4] hover:bg-[#593c89]"
        onClick={()=>{
          navigate('/sign-up')
        }}
        >
          SignUp</Button>
        
      </form>
    </Form>
    </div>
    </div>
   
    </>
  )
}

export default LoginForm
