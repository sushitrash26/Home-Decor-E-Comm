import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
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
import { Textarea } from "@/components/ui/textarea"
import axios from 'axios'
import { useToast } from '../ui/use-toast'
import { Loader2 } from 'lucide-react'



const AddProducts = () => {
  const URI = import.meta.env.VITE_URI
    const form = useForm()
    const {toast} = useToast()
    const [isLoading,setIsLoading] = useState(false)
    const onSubmit = async (data)=>{
      const formData = new FormData()
      for (let i = 0; i < data.images.length; i++) {
        formData.append('images', data.images[i]);
      }
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('price',data.price)
      formData.append('stock',data.stock)
      formData.append('categoryName',"Home Decor")
        try {
            setIsLoading(true)
            const response = await axios.post(`${URI}/api/v1/products/`,formData,{
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
              })
           
            toast({
                title: "Product Added Successfully",
                description: "Your product has been added successfully",
            })
            setIsLoading(false)
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong",
            })
          
            setIsLoading(false)
        }
    }
  return (
    <>
      <div className="h-[95%] w-[60%] sm:w-[30%]   space-y-5 text-white ">
        <div className="h-[5%] w-[100%] text-black flex justify-center items-center text-2xl">
          <h1>Add Your Product</h1>
        </div>
        <div className="h-[95%] w-[100%] space-y-2 bg-[#973131] rounded-xl p-4 text-[#F9D689]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name.</FormLabel>
                    <FormControl>
                      <Input
                        className="border-[#E0A75E]"
                        placeholder="Enter your product name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Price (INR).</FormLabel>
                    <FormControl>
                      <Input
                        className="border-[#E0A75E]"
                        placeholder="Price"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Description.</FormLabel>
                    <FormControl>
                      <Textarea
                        className="border-[#E0A75E] scrollbar-hide w-[100%] h-[25vh]"
                        placeholder="Description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Stock</FormLabel>
                    <FormControl>
                      <Input
                        className="border border-[#E0A75E]"
                        placeholder="Stock"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem >
                  <FormLabel>Images.</FormLabel>
                  <FormControl>
                    <Input

                      id="picture"
                      type="file"
                      name="images"
                      multiple
                      className=" text-black bg-white border-none"
                      onChange={(e) => field.onChange(e.target.files)}
                    />
                  </FormControl>
                  <FormMessage className="text-[#E0A75E]">Max Images Should Be 5.</FormMessage>
                </FormItem>
              )}
            />
            <Button className="mt-2 bg-[#E0A75E] text-[#973131] hover:bg-[#973131] hover:text-[#E0A75E]" type="submit">{isLoading && <>
            <Loader2 className='animate animate-spin'></Loader2>
            Adding Product...
            </>}{!isLoading && "Add Product"}</Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}

export default AddProducts
