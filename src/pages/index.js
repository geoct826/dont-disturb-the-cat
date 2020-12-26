import React, { useEffect, useState } from "react"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

import "./index.css"

const idleImageFN = 'cat-idle.png'

const motionImageFNArray = [
  "cat-blink.png",
  "cat-ear.png",
  "cat-tail.png",
]

const disturbImageFNArray = [
  "cat-idle.png",
  "click-1.png",
  "click-2.png",
  "click-3.png",
  "click-4.png",
]

export default () => {
  const [imageFile, setImageFile] = useState(idleImageFN)
  const [disturbState, setDisturbState] = useState(0)
  const [timerCounter, setCounterTimer] = useState(0)
  
  function disturbCat() {
    if (disturbState < disturbImageFNArray.length - 1 ) {
      let temp = disturbState + 1
      setDisturbState(temp)
    }
    setCounterTimer(0)
  }

  function recoverCat() {
    if (disturbState > 0) {
      let temp = disturbState - 1
      setDisturbState(temp)
    }
    setCounterTimer(0)
  }
  
  function idleCat() {
    setImageFile(motionImageFNArray[Math.floor(Math.random()*motionImageFNArray.length)])
    var idleTimer = setTimeout(() => {
      setCounterTimer(0)
    },500)
    return () => clearTimeout(idleTimer);
  }
  
  function catMotion() {
    if (disturbState === 0) {
      idleCat()
    } else {
      recoverCat()
    }
  }
  
  useEffect(() => {
    function counter() {
      switch (timerCounter) {
        case 0:
          setImageFile(disturbImageFNArray[disturbState])
          setCounterTimer(1)
          break
        case 50:
          catMotion()
          break
        default:
          setCounterTimer(timerCounter + 1)
      }
    }    
    var timer = setTimeout(()=>{counter()}, 100)
    return () => clearTimeout(timer);
  }, [timerCounter])

  return (
    <Layout>
      <SEO title="Home" />
      <div className={'cat-image'}
           onClick={disturbCat}>
        {disturbImageFNArray.map(file => {
          return (
            <Image fileName={file} style={{display: imageFile === file ? 'inherit' : 'none'}} alt=""/>
          )
        })}
       {motionImageFNArray.map(file => {
          return (
            <Image fileName={file} style={{display: imageFile === file ? 'inherit' : 'none'}} alt=""/>
          )
        })}
      </div>
    </Layout>
  )
}
