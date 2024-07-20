import React, { useEffect } from 'react'
import { useState } from'react'
import {z as zod} from 'zod'
import { useForm } from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
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
import { useDebounceCallback } from 'usehooks-ts'
import axios, { AxiosError } from 'axios'
import { useToast } from "@/components/ui/use-toast"
import { Loader2, LoaderCircle } from 'lucide-react';

import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'


const SignUp = () => {
  const URI = import.meta.env.VITE_URI
    const dispatch = useDispatch()
    const navigate = useNavigate();
    //states for the fields for signup form
    const [fullName,setFullName] = useState('')
    const [email,setEmail] = useState('')
    const [username,setUsername] = useState('')
    const [phoneNumber,setPhoneNumber] = useState('')
    const [avatar,setAvatar] = useState('')
    const [password,setPassword] = useState('')
    const [isLoading,setIsLoading] = useState(false)
    const [isSubmitting,setIsSubmitting] = useState(false)
    const [isAdmin,setIsAdmin] = useState(false)
    // const [isSuccess,setIsSuccess] = useState(false)
    const [error,setError] = useState('')
    const [isCheckingUsername,setIsCheckingUsername] = useState(false)
    const [usernameMessage,setUsernameMessage] = useState('')


    //form schema for zod
    const formSchema = zod.object({
        fullName: zod.string().min(2).max(100).nonempty(),
        username: zod.string().min(2).max(100).trim().nonempty(),
        // phoneNumber: zod.number().positive().int(),
        phoneNumber:  zod.string().min(2).max(100).nonempty(),
        email: zod.string().email().nonempty(),
        password: zod.string().min(8).max(100).nonempty(),
        avatar: zod.any().optional(),
        isAdmin: zod.boolean().optional()
     })

     //defining the form 
     
     const form = useForm({

        resolver: zodResolver(formSchema),
        defaultValues:{
            fullName:"",
            username:"",    
            phoneNumber:"",
            email:"",
            password:"",
            avatar:null,
            isAdmin:false
        }
     })
    
     const { toast } = useToast()

     //debouncing username
     const debouncedUsername = useDebounceCallback(setUsername, 700)

     //checking unique username
     useEffect(()=>{
        const checkUniqueUsername = async()=>{
            if(username){
                setIsCheckingUsername(true)
                setUsernameMessage('')
                try {

                    const response =  await axios.get(`${URI}/api/v1/users/unique/${username}`)
                    setUsernameMessage(response.data.message)
                 

                } catch (error) {
                       setUsernameMessage(error.response.data.message)
                } finally{
                    setIsCheckingUsername(false)
                }
            }
        }   
        checkUniqueUsername()
     },[username])

     const onSubmit = async (data) => {
       setIsSubmitting(true);
       try {
         const response = await axios.post(`${URI}/api/v1/users/register`, data, {
           headers: {
             "Content-Type": "multipart/form-data",
           },
         });
         if (response.status === 200) {
          
           toast({
             title: "Success",
             description: response.data.message,
           });
           setIsSubmitting(false);
           navigate("/log-in");
         } else if (response.data.statusCode >= 400) {
           toast({
             title: "Failed !",
             description: response.data.message,
           });
           setIsSubmitting(false);
         }

       } catch (error) {
        
         toast({
           title: "Failed ! Singing up",
           description:
              "User already exists or something went wrong",
           varient: "destructive",
         });
         setIsSubmitting(false);
       } finally {
         setIsSubmitting(false);
       }
     };

  return (
    <>
      <div className="m-0 border-2 border-black flex justify-center items-center light rounded-2xl shadow-2xl sm:w-[40%] h-[80vh] bg-[#000000] text-white w-[80%] ">
        <div className=' h-[100%] w-[80%]  flex justify-center items-center '>
        <Form {...form} className="text-white ">
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <FormField
              
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input 
                      className=" text-white"
                      placeholder="username"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        debouncedUsername(e.target.value);
                      }}
                    />
                  </FormControl>

                  <FormDescription className=" text-white">
                    {<>This can't be changed further on.</>}
                  </FormDescription>
                  <FormMessage className="p-0 m-0">
                    {isCheckingUsername && (
                      <>
                        <Loader2
                          className="w-4 h-4 animate-spin"
                          color="black"
                        />
                      </>
                    )}
                    {usernameMessage && (
                      <>
                        <p
                          className={
                            usernameMessage === "Username is unique"
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          {usernameMessage}
                        </p>
                      </>
                    )}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                    className=" text-white"
                    placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormDescription className=" text-white">
                    This is your public display name.
                  </FormDescription>
                  {/* <FormMessage ></FormMessage> */}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number (+91)</FormLabel>
                  <FormControl>
                    <Input
                    className="  text-white"
                    placeholder="**********" {...field} />
                  </FormControl>
                  <FormDescription className=" text-white">
                    This can't be changed further on.
                  </FormDescription>
                  {/* <FormMessage></FormMessage> */}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input 
                    className="  text-white"
                    placeholder="name@example.com" {...field} />
                  </FormControl>
                  {/* <FormMessage ></FormMessage> */}
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
                    className="  text-white"
                    placeholder="*********" {...field} type="password" />
                  </FormControl>
                  {/* <FormMessage ></FormMessage> */}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem >
                  <FormLabel>Avatar</FormLabel>
                  <FormControl>
                    <Input

                      id="picture"
                      type="file"
                      name="avatar"
                      className=" text-black bg-white"
                      onChange={(e) => field.onChange(e.target.files[0])}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
             <Button type="submit" disabled={isSubmitting} className="w-full relative bg-[#6d4ba4] hover:bg-[#593c89]">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please Wait
                </>
              ) : (
                "SignUp"
              )}
            </Button>
            
          </form>
          
        </Form>
        </div>
      </div>
    </>
  );
}

export default SignUp
