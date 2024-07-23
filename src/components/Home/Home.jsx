import React, { useEffect } from 'react'
import HomeStart from './HomeStart'
import {HomeCarousel} from './HomeCarousel'
import "@/components/Home/styles.css"
import Particles from "@/components/magicui/particles";

const Home = () => {
  useEffect(()=>{
    document.title="Home"
  },[])
  return (
    <div className='sm:overflow-x-hidden'>
      <HomeStart/>
      <div className='max-w-[100vw]  no-scrollbar'>
  
      <HomeCarousel/>
      </div>
    </div>
  )
}

export default Home
