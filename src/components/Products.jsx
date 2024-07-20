import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useCallback } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import PaginationBox from './PaginationBox'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import { Button } from './ui/button'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useToast } from './ui/use-toast'
import { Skeleton } from "@/components/ui/skeleton"
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern"
import { cn } from '@/lib/utils'



const Products = () => {
  const URI = import.meta.env.VITE_URI  
    const [value,setValue] = useState(1)
    const [itemsPerPage,setItemsPerPage] = useState(12)
    const [page,setPage] = useState(0)
    const toast = useToast()
    const [products,setProducts] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const [noProducts,setNoProducts] = useState(false)

    const navigate = useNavigate()


   useEffect(()=>{
       document.title = "All Products"
        const getProducts = async ()=>{
          setNoProducts(false)
           try {
            
            setIsLoading(true)
             const response = await axios.get(`${URI}/api/v1/products/all-products/paginate`,{
              params:{
                page,
                itemsPerPage,
              }
             })
             setProducts(response.data.data)
             if(products.length === 0){
              setNoProducts(true)
             }  
             setIsLoading(false)
           } catch (error) {
                
                toast({
                  title: "Failed!",
                  description: "An error occured while fetching the products",
                  status: "error",
                })
              setIsLoading(false)
           } finally{
            setIsLoading(false)
           }
            
        }
        getProducts()
   },[page,itemsPerPage])



  return (
    <>
     
      
      {<div className="">
        
       
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.3}
          duration={1}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(200vh_circle_at_center,green,transparent)]",
            "inset-x-0 inset-y-[0%] sm:h-[100vh] w-[100vw] -skew-y-3 overflow-y-hidden"
          )}
        />
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.3}
          duration={1}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(200vh_circle_at_center,green,transparent)]",
            "inset-x-0 inset-y-[100%] sm:h-[100vh] w-[100vw] -skew-y-3 overflow-y-hidden"
          )}
        />
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.3}
          duration={1}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(200vh_circle_at_center,green,transparent)]",
            "inset-x-0 inset-y-[150%] sm:h-[100vh] w-[100vw] -skew-y-3 overflow-y-hidden"
          )}
        />
        <div className='sm:hidden'>
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.3}
          duration={1}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(200vh_circle_at_center,green,transparent)]",
            "inset-x-0 inset-y-[100%]  sm:h-[100vh] w-[100vw] -skew-y-3 overflow-y-hidden"
          )}
        />
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.3}
          duration={1}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(200vh_circle_at_center,green,transparent)]",
            "inset-x-0 inset-y-[200%]  sm:h-[100vh] w-[100vw] -skew-y-3 overflow-y-hidden"
          )}
        />
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.3}
          duration={1}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(200vh_circle_at_center,green,transparent)]",
            "inset-x-0 inset-y-[300%]  sm:h-[100vh] w-[100vw] -skew-y-3 overflow-y-hidden"
          )}
        />
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.3}
          duration={1}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(200vh_circle_at_center,green,transparent)]",
            "inset-x-0 inset-y-[400%]  sm:h-[100vh] w-[100vw] -skew-y-3 overflow-y-hidden"
          )}
        />
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.3}
          duration={1}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(200vh_circle_at_center,green,transparent)]",
            "inset-x-0 inset-y-[500%]  sm:h-[100vh] w-[100vw] -skew-y-3 overflow-y-hidden"
          )}
        />
        </div>
        <div className="main w-[100vw] min-h-[50vh] ">
          <div className="header w-[100%] h-[10vh] sticky flex justify-center items-center"></div>
          {
          <div className="products w-[100%] min-h-[85%] flex items-center justify-center dark">
            {isLoading && (
              <div className="innerproducts w-[80%] h-auto  grid
          justify-center items-center space-y-2 p-4 ">
                <Skeleton className="h-[400px] w-[500px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            )}

            {!isLoading && (
              <div
                className="innerproducts w-[80%] min-h-[20vh] sm:grid-cols-4  sm:grid sm:gap-y-20
                justify-center items-center "
              >
                {products.map((product) => {
                  return (
                    <div className="overflow-hidden flex justify-center items-center " key={product._id}>
                      <Card className="shadow-2xl sm:h-[65vh] sm:w-[18vw] sm:ml-3.5 sm:mt-3 sm:mb-0 sm:overflow-hidden sm:p-1 sm:space-y-2 bg-white w-[80%] h-[40vh] my-3 sm:my-0 ">
                        <div className="sm:h-[80%] sm:w-[100%] sm:flex sm:items-center sm:justify-center">
                          <CardContent className="">
                            <img
                              className="h-[25vh] w-[25vh] p-4"
                              src={product.images[0]}
                              alt=""
                            />
                          </CardContent>
                        </div>
                        <CardDescription className=" sm:h-[20%] sm:overflow-clip ">
                          <div className='w-[100%] h-[100%] flex justify-center items-center'>
                          <Link
                            className="hover:underline font-bold"
                            to={`/product/${product._id}`}
                          >
                            {product.name}
                          </Link>
                          </div>
                          <div className='h-[100%] w-[100%] flex justify-center items-end p-4'>
                              <Button className="bg-[#6d4ba4] hover:bg-[#593c89]"
                              onClick={()=>{
                                navigate(`/product/${product._id}`)
                              }}
                              >
                                View Product
                              </Button>
                          </div>
                        </CardDescription>
                      </Card>
                    </div>
                  );
                })}
              </div>
            )}
          </div>}
          <div className="w-[100%] h-[10vh] m-0 p-0 flex justify-center items-center mt-6">
            <div className="h-[10vh] w-[80%] rounded-2xl flex justify-center items-center ">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => {
                        if (page === 0) {
                          return;
                        } else {
                          setPage(page - 1);
                        }
                      }}
                    />
                  </PaginationItem>

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => {
                        setPage(page + 1);
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </div>}
      
    </>
  );
}

export default Products
