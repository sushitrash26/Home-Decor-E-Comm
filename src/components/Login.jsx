import {React,useEffect,useState} from 'react'
import LoginForm from './LoginForm'
import SignUp from './SignUp'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import AnimatedGridPattern from '@/components/magicui/animated-grid-pattern'
import WordPullUp from './magicui/word-pull-up'
import BoxReveal from "@/components/magicui/box-reveal";

const Login = () => {
    useEffect(()=>{
        document.title = "Login"
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
        <div className="w-[50%] h-[100%] sm:flex sm:justify-end sm:items-center hidden ">
          <div className="w-[80%] h-[80%] flex justify-center items-center  ">
            <WordPullUp
              className="text-4xl font-bold tracking-[-0.02em] text-black dark:text-white md:text-7xl md:leading-[5rem]"
              words="Login to access your dream home decor products."
            />
          </div>
        </div>
        <div className="sm:w-[50%] h-[100%] sm:flex sm:justify-center sm:items-center flex justify-center items-center ">
         <LoginForm/>
        </div>
      </div>
      </BoxReveal>
    </>
      )
    
}

export default Login
