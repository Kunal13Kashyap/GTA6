import React, { useEffect, useState } from 'react'
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import 'remixicon/fonts/remixicon.css';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

function App() {

  let [showContent, setShowContent] = useState(false);
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "Power4.easeInOut",
      transformOrigin: "50% 50%",
    })
      .to(".vi-mask-group", {
        scale: 10,
        duration: 2,
        delay: -1.8,
        ease: "expo.easeinOut",
        transformOrigin: "50% 50%",
        opacity: 0,
        onUpdate: function () {
          if (this.progress() >= .9) {
            document.querySelector(".svg")?.remove();
            setShowContent(true);
            this.kill();
          }
        }
      })
  });

  useGSAP(() => {

    if (!showContent) return;

    gsap.to(".main", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: -1,
      ease: "expo.inOut",
    });

    gsap.to(".sky", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: -0.9,
      ease: "expo.inOut",
    });

    gsap.to(".bg", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: -0.9,
      ease: "expo.inOut",
    });

    gsap.to(".character", {
      scale: 1.1,
      x: "-50%",
      bottom: "-25%",
      rotate: 0,
      duration: 2,
      delay: -0.9,
      ease: "expo.inOut",
    });

    gsap.to(".text", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: -0.9,
      ease: "expo.inOut",
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: '.rg',
        start: 'top 100%',
        end: 'bottom 0%',
        scrub: true,
      },
    })
      .to('.rg', { color: '#39ff14', textShadow: 5, duration: 0.3 })
      .to('.rg', { color: '#ff5f1f', textShadow: 10, duration: 0.3 });

    const main = document.querySelector(".main");
    main?.addEventListener("mousemove", function (e) {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
      gsap.to(".imagesdiv .text", {
        x: `${-50 - xMove * 0.4}%`,
      })
      gsap.to(".sky", {
        x: `${-xMove * 0.1}%`,
      })
      gsap.to(".bg", {
        x: `${-xMove * 0.23}%`,
      })
    });
  }, [showContent]);

  return (
    <>
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>
      {showContent && (
        <div className='main w-full rotate-[-10deg] scale-[1.5]'>
          <div className='landing overflow-hidden  relative w-full h-screen bg-black'>
            <div className='navbar absolute top-0 left-0 z-[10] w-full py-10 px-10'>
              <div className='logo flex gap-7'>
                <div className='lines flex flex-col gap-[5px]'>
                  <div className='line w-15 h-2 bg-white'></div>
                  <div className='line w-8 h-2 bg-white'></div>
                  <div className='line w-5 h-2 bg-white'></div>
                </div>
                <h3 className='text-4xl -mt-[7px] leading-none text-white'>Rockstar</h3>
              </div>
            </div>
            <div className='imagesdiv overflow-hidden relative w-full h-screen'>
              <img className='absolute sky scale-[1.4] rotate-[-20deg] top-0 left-0 w-full h-full object-cover' src="./sky.png" alt="" />
              <img className='absolute rotate-[-3deg] scale-[1.6] bg top-0 left-0 w-full h-full object-cover' src="./bg.png" alt="" />
              <div className='text text-white flex flex-col gap-5 absolute top-15 left-1/2 -translate-x-1/2 scale-[1.4] rotate-[-10deg]'>
                <h1 className='text-[5rem] leading-none -ml-10'>grand</h1>
                <h1 className='text-[5rem] leading-none ml-25'>theft</h1>
                <h1 className='text-[5rem] leading-none -ml-8 -mt-6'>auto</h1>
              </div>
              <img className='absolute character h-full -bottom-[150%] left-1/2 -translate-x-1/2 scale-[3] rotate-[-20deg]' src="./girlbg.png" alt="" />
            </div>
            <div className='btmbar text-white absolute bottom-0 left-0 w-full py-15 px-10 bg-gradient-to-t from-black to-transparent'>
              <div className='flex gap-4 items-center'>
                <i className="text-4xl ri-arrow-down-line"></i>
                <h3 className='text-xl font-[Helvetica-Now-Display]'>Scroll</h3>
              </div>
              <img className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[45px]' src="./ps5.png" alt="" />
            </div>
          </div>
          <div className='w-full min-h-screen gap-0 px-10 flex items-center justify-center bg-black'>
            <div className='cntnr relative flex flex-col md:flex-row text-white w-full h-[80%]'>
              <div className='limg w-full md:w-1/2 h-full'></div>
              <div className='rg flex flex-col md:flex-row items-start justify-center gap-5'>
                <h1 className='leonida text-4xl md:text-8xl w-full md:w-[40%]'>Only in Leonida</h1>
                <p className='prgtag text-xl md:text-3xl w-full md:w-[28%] mb-24 md:mb-0'>When the sun fades and the neon glows, everyone has something to gain — and more to lose.</p>
              </div>
            </div>
          </div>
          <div className='btm flex flex-col md:flex-row bg-black'>
            <div className='relative aspect-[3/4] w-full md:w-1/2'>
              <img className='h-full w-full object-cover' src="./imag.png" alt="" />
            </div>
            <div className='text-white relative w-full md:w-1/2 mt-[10%] md:mt-[15%] flex flex-col px-6'>
              <h1 className='text-4xl md:text-6xl mt-10 text-[#FFB0C4] font-[600] font-[sans-serif]'>Lucia Caminos</h1>
              <p className='font-[helvetica] text-xl md:text-3xl mt-10 md:w-[50%] mb-32 md:mb-0'>Life has been coming at her swinging ever since. Fighting for her family landed her in the Leonida Penitentiary. Sheer luck got her out. Lucia’s learned her lesson — only smart moves from here.</p>
            </div>
            <button className='fixed bottom-5 left-1/2 -translate-x-1/2 w-[90%] md:w-auto px-10 py-6 text-2xl md:text-4xl text-black font-[impact] bg-yellow-500 uppercase z-50'>Download Now</button>
            <div className='fixed bottom-2 right-2 flex text-white gap-1 text-xs md:text-base z-50'>
              <p className='font-[montserrat]'>Made with</p>
              <i className="ri-heart-3-fill text-red-500"></i>
              <p className='font-[montserrat]'>by</p>
              <a className='font-[Helvetica-Neue]' href="https://www.linkedin.com/in/kunal-kashyap-601094170/" target='blank' rel="noopener noreferrer">Kunal Kashyap</a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default App
