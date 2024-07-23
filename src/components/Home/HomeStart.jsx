import React from 'react'
import BoxReveal from "@/components/magicui/box-reveal";
import { Button } from '../ui/button';
import TypingAnimation from "@/components/magicui/typing-animation";

import { cn } from "@/lib/utils";
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";
import { CoolMode } from "@/components/magicui/cool-mode";
import BlurFade from '../magicui/blur-fade';
import { useNavigate } from 'react-router-dom';

const HomeStart = () => {
  const navigate = useNavigate()
  return (
    <>
        
      <div className="sm:flex block w-[100vw] h-[80vh] overflow-y-hidden pt-20 sm:pt-0 bg-[#973131]">
        <div className="w-[60%] h-[100%] p-4 sm:p-0">
     
          <div className="w-[100%] h-[40%]  sm:flex justify-center items-end sm:p-8 flex ">
            <BoxReveal boxColor={"#E0A75E"} duration={0.5}>
              <h1 className="sm:text-8xl text-6xl">Beautify Your House</h1>
            </BoxReveal>
          </div>
          <div className="h-[15%] w-[100%] sm:flex sm:justify-end sm:items-start sm:mt-0 ">
            <BoxReveal boxColor={"#E0A75E"} duration={1.0}>
              <h1 className="sm:text-7xl text-6xl">With our collections.</h1>
            </BoxReveal>
          </div>
          <div className="h-[20%] sm:flex sm:justify-center sm:items-top mt-20 ml-10 sm:mt-0 sm:ml-0">
          <CoolMode>
            <Button className="bg-white h-[7vh] shadow-xl hover:bg-gray-300 rounded-2xl"
            onClick={
              ()=>{
                navigate('/log-in')
              }
            }
            >
              <TypingAnimation
                className="font-semibold text-2xl text-black dark:text-white"
                text="Shop Now"
                duration={300}
              />
            </Button>
            </CoolMode>
          </div>
        </div>
        <div className="w-[40%] h-[100%] sm:flex sm:justify-center sm:items-start hidden  ">
            <BlurFade delay={0.5} inView>
            <img src="pngegg.png" alt="" className='sm:w-[80%] sm:h-[70%] object-contain sm:visible' />
            </BlurFade>
        </div>
      </div>
     
    </>
  );
}

export default HomeStart
