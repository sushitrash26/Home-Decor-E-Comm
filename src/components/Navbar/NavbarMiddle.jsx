import React from 'react'
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import BlurFade from "@/components/magicui/blur-fade";


const NavbarMiddle = () => {
  return (
    <>
      <div className="h-[100%] w-[100%] sm:flex sm:justify-center sm:items-center hidden">
        <div className="flex gap-20">
        <BlurFade delay={0.25} inView>
          <Link to="/" className='hover:underline hover:underline-offset-4'>Home</Link>
        </BlurFade>
        <BlurFade delay={0.25} inView>
          <Link to="/products" className='hover:underline hover:underline-offset-4'>All Products</Link>
          </BlurFade>
          {/* <BlurFade delay={0.25} inView>
          <DropdownMenu>
            <DropdownMenuTrigger className='hover:underline hover:underline-offset-4'>Shop By Category</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </BlurFade> */}
        </div>
      </div>
    </>
  );
}

export default NavbarMiddle
