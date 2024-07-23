import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useCallback } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
  } from "@/components/ui/card"

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
import { Link, useNavigate } from 'react-router-dom'
import { useToast } from './ui/use-toast'
import { Skeleton } from "@/components/ui/skeleton"
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card.jsx";



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
     
      
     
        
        <div className="main w-[100vw] min-h-[50vh] scrollbar-hide bg-[#9a3838]  ">
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
                className="innerproducts w-[80%] min-h-[20vh] sm:grid-cols-3  sm:grid sm:gap-y-20
                justify-center items-center "
              >
                {products.map((product) => {
                  return (
                    <CardContainer className="inter-var w-[100%] h-[100%]" key={product._id} >
                      <CardBody className=" relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]  dark:border-white/[0.2] border-black/[0.1] w-[100%] sm:w-[20rem] h-[100%] rounded-xl p-6 border bg-[#E0A75E] ">
                        <CardItem
                          translateZ="50"
                          className="text-xl font-bold   text-[#973131] uppercase "
                          
                        >
                          {`${product.name}`}
                        </CardItem>
                        <CardItem
                          as="p"
                          translateZ="60"
                          className="text-sm max-w-sm mt-2 h-[50%] sm:h-[10vh]  overflow-clip text-[#973131]"
                        >
                          {`${product.description}`}
                        </CardItem>
                        <CardItem translateZ="100" className="w-full mt-4">
                          <img
                            src={product.images[0]}
                            height={1000}
                            width={1000}
                            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                            alt="thumbnail"
                          />
                        </CardItem>
                        <div className="flex justify-between items-center mt-20">
                          <CardItem
                            translateZ={20}
                            
                            target="__blank"
                            className="px-4 py-2 rounded-xl text-xs font-normal text-[#973131] "
                          >
                            Try now →
                          </CardItem>
                          <CardItem
                            translateZ={20}
                            as="button"
                            className="px-4 py-2 rounded-xl bg-[#973131] text-[#F5E7B2]  text-xs font-bold"
                            onClick={() => {
                              navigate(`/product/${product._id}`);
                            }}
                          >
                            View Product
                          </CardItem>
                        </div>
                      </CardBody>
                    </CardContainer>
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
     
      
    </>
  );
}

export default Products
