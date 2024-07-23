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
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card.jsx";

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
    const handleUpdateQuantity = (cartItem, newQuantity) => {
      dispatch(updateQuantity({ _id: cartItem._id, quantity: newQuantity }));
    };

  return (
    <>
      {isLoading && <></>}
      {!isLoading && (
        <div className="h-[91vh] w-[100vw]  flex justify-center items-center bg-[#F9D689]">
          <div className="h-[90vh] w-[80vw]  sm:h-[85vh] sm:w-[80vw] border-2 rounded-xl shadow-2xl bg-[#973131] border-none">
            <div className="det sm:flex sm:justify-center sm:tems-center  w-[100%] h-[85%] sm:h-[90%]">
              <div className="top-left w-[100%] h-[40%] sm:h-[100%] sm:w-[40%]  flex justify-center items-center ">
                <div className=" sm:w-[100%] h-[100%] flex justify-center items-center w-[90%]">
                <CardContainer className="inter-var w-[80%] h-[80%] ">
                <CardBody className=" h-[80%] w-[100%] dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]  dark:border-white/[0.2] border-black/[0.1] bg-[#f3c563] rounded-xl ">
                <CardItem
                          translateZ="50"
                          className="text-xl font-bold   text-[#973131] uppercase ml-4 "
                          
                        >
                  <Carousel className="w-[100%] h-[100%] flex">
                    <CarouselContent className="w-[100%] h-[100%]">
                    
                      {productImages.map((productImage) => (
                        <CarouselItem
                          key={productImage}
                          className="w-[100%] h-[100%] flex justify-center items-center"
                        >
                          <Card className="w-[100%] h-[100%] bg-[#E0A75E] border-none flex justify-center items-center">
                            <CardContent className="w-[80%] h-[80%]  border-none flex justify-center items-center ">
                              <img
                                src={productImage}
                                alt=""
                                className="bg-none"
                              />
                            </CardContent>
                          </Card>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="bg-[#E0A75E]" />
                    <CarouselNext className="bg-[#E0A75E] " />
                  </Carousel>
                  </CardItem>
                  </CardBody>
                  </CardContainer>
                </div>
              </div>
              <div className="bottom-right w-[100%] min-h-[60%] sm:h-[100%] sm:w-[60%] ">
                <div className="w-[100%] h-[25%] grid justify-center items-center p-2 sm:justify-start ">
                  <h1 className="text-4xl uppercase text-[#E0A75E]  ">{productName}</h1>
                  <h2 className="text-2xl text-[#E0A75E] ">{`Rs. ${productPrice}`}</h2>
                </div>
                <div className="w-[100%] h-[10%]  border-[#F9D689] border-dotted border-t-2 p-2">
                  <h1 className="text-xl text-[#E0A75E]">{`${stock} pieces in stock.`}</h1>
                </div>
                <div className="w-[100%] h-[20%] flex justify-center items-center">
                  {!isLoggedIn && <h1>Please Login To Add Products</h1>}
                  {isLoggedIn && (
                    <>
                      <Button
                        className="w-[50%] h-[70%] sm:w-[25%] sm:h-[40%] rounded-xl text-xl  bg-[#E0A75E] text-[#973131] hover:bg-[#973131] hover:text-[#E0A75E]"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add To Cart
                      </Button>
                    </>
                  )}
                </div>
                <div className="mt-2 w-[100%] h-[43%]  p-1 overflow-y-scroll scrollbar-hide border-none">
                  <Accordion type="single" collapsible className=" rounded-xl w-[80%]">
                    <AccordionItem value="item-1" className="h-[100%] border-none">
                      <AccordionTrigger className="h-[100%] border-none text-[#E0A75E] ">
                        Description and Care
                      </AccordionTrigger>
                      <AccordionContent className="overflow-y-scroll h-[100%] scrollbar-hide border-none text-[#F9D689] ">
                        {productDescription}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetails
