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
      <div className="w-[100vw] h-[5vh]  flex justify-start items-center">
        <div className="w-[20%] h-[100%] text-xs border-2 border-white  flex justify-center items-center sm:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger><Menu/></DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Add Products</DropdownMenuItem>
              <DropdownMenuItem>Recieved Order</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className='link sm:flex sm:justify-evenly sm:gap-4 sm:items-center hidden '>
            <Link to={`/dashboard`}>Add Product</Link>
            {/* <Link to={`/dashboard/get-orders`}>Get Orders data</Link> */}
        </div>
      </div>
      <div className='m-0 p-0 h-[85vh] w-[100vw] flex justify-center items-center'>
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
          <AddProducts></AddProducts>
      </div>
    </>
  );
}

export default Dashboard
