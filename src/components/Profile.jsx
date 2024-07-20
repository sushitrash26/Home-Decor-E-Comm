import React,{useEffect, useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { set, useForm } from 'react-hook-form'
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
import axios from 'axios'
import { updateUserInfo } from '@/store/user.slice.js'
import { useToast } from './ui/use-toast'
import { Loader, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern"

const Profile = () => {
  const URI = import.meta.env.VITE_URI
  useEffect(()=>{
    document.title = "Profile"
  },[])
    const userDetails = useSelector((state) => state.user.userInfo)

    const form = useForm()
    const dispatch = useDispatch()
    const avatarForm = useForm()
    const [fullNameLoading,setFullNameLoading] = useState(false)
    const [avatarLoading,setAvatarLoading] = useState(false)
    const {toast} = useToast()
    const onFullNameSubmit=async (data)=>{

        try {

            setFullNameLoading(true)
            const response = await axios.post(`${URI}/api/v1/users/update-details`,{
                fullName:data.fullName
            },{
              headers:{
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
            dispatch(updateUserInfo({
                fullName:data.fullName
            }))
            toast({
                title:"Full name updated successfully"
            })
            setFullNameLoading(false)
        } catch (error) {
            toast({
                title:"Error updating full name"
            })
            setFullNameLoading(false)
        }
    }
    const onAvatarSubmit=async(data)=>{
       try {
        setAvatarLoading(true)
         const response = await axios.post(`${URI}/api/v1/users/update-profile`,data,{
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          })
          dispatch(updateUserInfo({
            avatar:response.data.data.avatar
          }))
          toast({
            title:"Avatar updated successfully"
        })
         setAvatarLoading(false)
       } catch (error) {
            toast({
                title:"Error updating avatar"
            })
            setAvatarLoading(false)
       }

    }
  return (
    <>
      <div className="w-[100vw] h-[90vh] ">
      <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.3}
          duration={1}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(200vh_circle_at_center,green,transparent)]",
            "inset-x-0 inset-y-[-6%] h-[100vh] w-[100vw] -skew-y-3 overflow-y-hidden"
          )}
        />
        <div className="h-[10%] w-[100%] text-white flex justify-center items-center bg-slate-900">
          <h1 className="text-2xl">Update your details</h1>
        </div>
        <div className="h-[90%] w-[100%]  flex justify-center items-center">
          <div className="h-[80%] w-[60%] rounded-xl p-6 border-2 border-black space-y-4  bg-slate-900 text-white">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onFullNameSubmit)}>
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          className=""
                          placeholder="Full Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
               <Button type="submit" className="bg-[#6d4ba4] hover:bg-[#593c89] mt-2 sm:mt-4">{fullNameLoading && <>
               <Loader2 className='animate animate-spin'></Loader2>
               Updating Full Name
               </>}{!fullNameLoading && "Update Full Name"}</Button>
              </form>
            </Form>
            <Form {...avatarForm} className="space-y-2">
                <form onSubmit={avatarForm.handleSubmit(onAvatarSubmit)}>
                <FormField
                  control={avatarForm.control}
                  name="avatar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Avatar</FormLabel>
                      <FormControl>
                        <Input
                          id="picture"
                          type="file"
                          name="avatar"
                          className=" text-black bg-white w-[100%] h-[10vh]"
                          onChange={(e) => field.onChange(e.target.files[0])}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="bg-[#6d4ba4] hover:bg-[#593c89] mt-2 sm:mt-4">{avatarLoading && <>
                <Loader2 className='animate animate-spin'></Loader2>
                Updating
                </>}{!avatarLoading && "Update Avatar"}</Button>
                </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile
