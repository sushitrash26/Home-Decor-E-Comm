import React, { useState } from 'react'
import NavbarRight from '../components/Navbar/NavbarRight.jsx'
import NavbarMiddle from './Navbar/NavbarMiddle.jsx'
import { Button } from './ui/button.jsx'
import { Link, useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu } from 'lucide-react';



const Navbar = () => {
  
  
  const navigate = useNavigate()
  return (
    <>
      <div className="overflow-hidden">
        <div className="navbar h-[9vh] w-[100vw] flex">
          <div className="left h-[100%] sm:w-[20%] w-[150%] flex justify-start items-center">
            <div className='sm:hidden pl-2 '>
            <DropdownMenu>
              <DropdownMenuTrigger>
               <Menu />
            
              </DropdownMenuTrigger>
              <DropdownMenuContent className="h-[100vh] w-[50vw]">
                
                <DropdownMenuItem onClick ={()=>{
                  navigate("/")
                }}>HOME</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                onClick={()=>{
                  navigate("/products")
                }}
                >All Products</DropdownMenuItem>
                <DropdownMenuSeparator />
                

              </DropdownMenuContent>
            </DropdownMenu>
            </div>
          </div>
          <div className="middle sm:h-[100%] sm:w-[50%] h-[100%] w-[40%] ">
            <NavbarMiddle />
          </div>
          <div className="right sm:h-[100%] sm:w-[30%] sm:overflow-hidden h-[100%] w-[40%] flex justify-center items-center">
            <NavbarRight />
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar
