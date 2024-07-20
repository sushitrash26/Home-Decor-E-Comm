import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from './ui/button'
import { useDispatch,useSelector } from 'react-redux'
import { add,remove } from '@/store/cart.slice.js'
import { useToast } from './ui/use-toast'
import { CookingPot } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from '@/lib/utils'
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern"

const ProductDetails = () => {
  const URI = import.meta.env.VITE_URI
    const {id} = useParams()
    const [product,setProduct] = useState()
    const [productImages,setProductImages] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const [productName,setProductName] = useState("")
    const [productDescription,setProductDescription] = useState("")
    const [productPrice,setProductPrice] = useState(null)
    const [stock,setStock] = useState(null)
    const {toast} = useToast()
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.user.isLoggedIn)

   

    useEffect(()=>{
      document.title = "Product Details"
        try {
            setIsLoading(true)
            const getProductById = async()=>{
            const response = await axios.get(`${URI}/api/v1/products/${id}`)
            setProduct(response.data.data)
            setProductImages(response.data.data.images)
            setProductName(response.data.data.name)
            setProductDescription(response.data.data.description)
            setProductPrice(parseInt(response.data.data.price))
            setStock(parseInt(response.data.data.stock))
           
            
            }
            setIsLoading(false)
            getProductById()

        } catch (error) {
           
            setIsLoading(false)
        }finally{
            setIsLoading(false)
        }

    },[id])
    const handleAddToCart = (product)=>{
      dispatch(add(product))
      toast({
          title:"Added to Cart",
      })
    }
    

  return (
    <>
    {isLoading && <></>}
    {!isLoading &&
      <div className="h-[91vh] w-[100vw]  flex justify-center items-center">
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
        <div className="h-[90vh] w-[80vw]  sm:h-[85vh] sm:w-[80vw] border-2 border-black rounded-xl shadow-2xl bg-black text-white">
          <div className="header h-[15%] w-[100%] text-4xl sm:text-3xl sm:h-[10%] flex justify-center items-center">
            <h1>{productName}</h1>
          </div>
          <div className="det sm:flex sm:justify-center sm:tems-center  w-[100%] h-[85%] sm:h-[90%]">
            <div className="top-left w-[100%] h-[40%] sm:h-[100%] sm:w-[40%]  flex justify-center items-center ">
              <div className=" w-[100%] h-[100%] flex justify-center items-center">
                <Carousel className="w-[70%] h-[100%] flex justify-center items-center p-4  ">
                  <CarouselContent className="w-[100%] h-[100%] ">
                    {productImages.map((productImage) => (
                      <CarouselItem
                        key={productImage}
                        className="w-[100%] h-[100%]"
                      >
                        <Card className="w-[100%] h-[100%]">
                          <CardContent className="w-[100%] h-[100%] flex justify-center items-center">
                            <img
                              src={productImage}
                              alt=""
                              className="object-cover"
                            />
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </div>
            <div className="bottom-right w-[100%] min-h-[60%] sm:h-[100%] sm:w-[60%] ">
              <div className="w-[100%] h-[25%] grid justify-center items-center p-2 sm:justify-start ">
                <h1 className="text-4xl">{productName}</h1>
                <h2 className="text-2xl">{`Rs. ${productPrice}`}</h2>
              </div>
              <div className="w-[100%] h-[10%]  border-black border-t-2 p-2">
                <h1 className="text-xl">{`${stock} pieces in stock.`}</h1>
              </div>
              <div className="w-[100%] h-[20%] flex justify-center items-center">
                {!isLoggedIn &&(
                  <h1>Please Login To Add Products</h1>
                )}
                {isLoggedIn && <Button
                  className="w-[50%] h-[70%] sm:w-[25%] sm:h-[40%] rounded-xl text-xl text-black bg-[#6d4ba4] hover:bg-[#593c89]"
                  onClick={()=>handleAddToCart(product)}
                >
                  Add To Cart
                </Button>}
              </div>
              <div className="mt-2 w-[100%] h-[43%]  p-1 overflow-y-scroll scrollbar-hide">
                <Accordion type="single" collapsible className=' border-2 border-black rounded-xl'>
                  <AccordionItem value="item-1" className="h-[100%]">
                    <AccordionTrigger className="h-[100%] ">Description and Care</AccordionTrigger>
                    <AccordionContent className="overflow-y-scroll h-[100%] scrollbar-hide ">
                      {productDescription}
                     
                    </AccordionContent>
                  </AccordionItem>
                 
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
      
}
    </>
  );
}

export default ProductDetails
