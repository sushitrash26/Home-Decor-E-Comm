import React from 'react'
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import Particles from '../magicui/particles';

const HomeCarousel = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
      target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-55%"]);
  return (
    <>
     
    <div className='sm:w-[100vw] sm:h-[130vh] h-[200vh] w-[200vw] sm:overflow-x-hidden sm:overflow-y-hidden sm:flex justify-center items-start bg-[#b0bef4] '>
    {/* <div className='h-[130vh] w-[130vw]'>
      <Particles
        className=" relative inset-0"
        quantity={1000}
        ease={80}
        color="#00B713"
        refresh
        size={1}
      />
      </div> */}
      <section ref={targetRef} className="absolute sm:h-[130vh] h-[200vh] sm:w-[100vw] w-[100vw]  ">
      <div className="sticky top-0 flex h-screen items-center sm:w-screen w-[100vw] sm:overflow-x-hidden overflow-x-hidden scrollbar-hide">
        <div className='scrollbar-hide w-[300vw]  sm:w-auto'>
        <motion.div style={{ x}} className="flex gap-4 sm:overflow-x-clip scrollbar-hide">
          {cards.map((card) => {
            return <Card  card={card} key={card.id} />;
          })}
        </motion.div>
        </div>
      </div>
    </section>
   
    </div>
    </>
  )
}
const Card = ({ card }) => {
    return (
      <div
        key={card.id}
        className="group relative sm:h-[50vh] sm:w-[450px] h-[20vh] w-[500px]  bg-neutral-200 "
      >
        <div
          style={{
            backgroundImage: `url(${card.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
        ></div>
        
      </div>
    );
  };



export default HomeCarousel

const cards = [
    {
      url: "/pngegg.png",
      title: "Title 1",
      id: 1,
    },
    {
      url: "/table.png",
      title: "Title 2",
      id: 2,
    },
    {
      url: "/books.png",
      title: "Title 3",
      id: 3,
    },
    {
      url: "/image.png",
      title: "Title 4",
      id: 4,
    },
    {
      url: "/lamp.png",
      title: "Title 5",
      id: 5,
    },
    {
      url: "/lantern.png",
      title: "Title 6",
      id: 6,
    },
    {
      url: "/lantern_2.png",
      title: "Title 7",
      id: 7,
    },
  ];
