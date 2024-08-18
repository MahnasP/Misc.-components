import React, { useEffect } from 'react'
import {motion, useMotionValue, useSpring} from 'framer-motion'

function Cursor() {

    const cursorSize = 20;
    const mouse = {
        x: useMotionValue(0),
        y: useMotionValue(0)
    }

    const smoothOptions={damping:20, stiffness:300, mass: 0.5}
    const smoothMouse = {
        x: useSpring(mouse.x,smoothOptions),
        y:useSpring(mouse.y,smoothOptions)
    }
    function manageMouseMove(e) {
        const { clientX, clientY } = e;
        mouse.x.set(clientX - cursorSize / 2);
        mouse.y.set(clientY - cursorSize / 2);
    }

    useEffect(() => {
        window.addEventListener("mousemove", manageMouseMove);
        return ()=> window.removeEventListener("mousemove", manageMouseMove);
    },[])

  return (
      <motion.div
          style={{
              top: smoothMouse.y,
              left: smoothMouse.x,
      }}
          className={`fixed bg-black h-[20px] w-[20px] rounded-full pointer-events-none `}>
          
      </motion.div>
  )
}

export default Cursor
