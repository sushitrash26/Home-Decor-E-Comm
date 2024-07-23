import React, { useEffect } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import AddProducts from '../Dashboard/AddProducts.jsx';
import { cn } from '@/lib/utils.js';
import AnimatedGridPattern from '@/components/magicui/animated-grid-pattern.jsx'

const Dashboard = () => {
  useEffect(()=>{
    document.title = "Dashboard"
  },[])
  return (
    <>
    <div className='h-[92vh] w-[100%]'>
      <div className="w-[100vw] h-[5vh]  flex justify-start items-center bg-[#F9D689]">
        <div className="w-[20%] h-[100%] text-xs border-2 border-white  sm:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger><Menu/></DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Add Products</DropdownMenuItem>
              <DropdownMenuItem>Recieved Order</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className='m-0 p-0 h-[90vh]  w-[100vw] flex justify-center items-center bg-[#F9D689] '>
      
      
          <AddProducts></AddProducts>
      </div>
      </div>
    </>
  );
}

export default Dashboard
