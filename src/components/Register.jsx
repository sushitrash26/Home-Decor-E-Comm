import {React,useEffect,useState} from 'react'

import SignUp from './SignUp'

import AnimatedGridPattern from '@/components/magicui/animated-grid-pattern'
import { cn } from '@/lib/utils'
import WordPullUp from "@/components/magicui/word-pull-up";
import BoxReveal from "@/components/magicui/box-reveal";

const Register = () => {
    
  useEffect(()=>{
    document.title = "Register"
  },[])
    return (
      <>
       <BoxReveal boxColor={"#5F4090"} duration={0.5}>
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
        <div className="main  h-[91vh] w-[100vw] sm:flex">
          <div className="w-[50%] h-[100%] sm:flex sm:justify-end sm:items-center hidden">
            <div className="w-[80%] h-[80%] flex justify-center items-center  ">
              <WordPullUp
                className="text-4xl font-bold tracking-[-0.02em] text-black dark:text-white md:text-7xl md:leading-[5rem]"
                words="Register to make your dream home come true."
              />
            </div>
          </div>
          <div className="sm:w-[50%] w-[100%] h-[100%] flex justify-center items-center">
            <SignUp></SignUp>
          </div>
        </div>
        </BoxReveal>
      </>
    );
}

export default Register
