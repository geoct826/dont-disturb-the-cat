import React, { useEffect, useState } from "react"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

import "./index.css"

const motionImageFNArray = [
  {"file":"cat-blink.png","alt":"cat blinks"},
  {"file":"cat-ear.png","alt":"cat twitches ear"},
  {"file":"cat-tail.png","alt":"cat swishes tail"}
]

const disturbImageFNArray = [
  {"file":"cat-idle.png","alt":"cat is peaceful"},
  {"file":"click-1.png","alt":"cat is now amused"},
  {"file":"click-2.png","alt":"cat is now disturbed"},
  {"file":"click-3.png","alt":"cat is now mad"},
  {"file":"click-4.png","alt":"cat is now angry"}
]

export default () => {
  const [imageFile, setImageFile] = useState(disturbImageFNArray[0].file)
  const [ariaText, setAriaText] = useState(disturbImageFNArray[0].alt)
  const [ariaLive, setAriaLive] = useState('polite')
  const [disturbState, setDisturbState] = useState(0)
  const [timerCounter, setCounterTimer] = useState(0)
  
  function disturbCat() {
    if (disturbState < disturbImageFNArray.length - 1 ) {
      let temp = disturbState + 1
      setDisturbState(temp)
    }
    setCounterTimer(0)
  }
  
  useEffect(() => {
    function catMotion() {
      if (disturbState === 0) {
        idleCat()
      } else {
        recoverCat()
      }
    }
    
    function recoverCat() {
      if (disturbState > 0) {
        let temp = disturbState - 1
        setDisturbState(temp)
      }
      setCounterTimer(0)
    }

    function idleCat() {
      let randomId = Math.floor(Math.random()*motionImageFNArray.length)
      setImageFile(motionImageFNArray[randomId].file)
      setAriaText(motionImageFNArray[randomId].alt)
      setAriaLive('polite')
      var idleTimer = setTimeout(() => {
        setCounterTimer(0)
      },1000)
      return () => clearTimeout(idleTimer);
    }
    
    function counter() {
      switch (timerCounter) {
        case 0:
          console.log(disturbImageFNArray[disturbState].file)
          setImageFile(disturbImageFNArray[disturbState].file)
          setAriaText(disturbImageFNArray[disturbState].alt)
          setAriaLive('assertive')
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
  }, [timerCounter, disturbState])

  return (
    <Layout>
      <SEO title="Home" />
      <div className={'cat-image'}
           onClick={disturbCat}
           onKeyPress={disturbCat}
           tabIndex={0}
           alt={ariaText}
           aria-label={ariaText}
           aria-live={ariaLive}
           role={'button'}
           >
        {disturbImageFNArray.map(fN => {
          return (
            <Image key={'img-' + fN.file} fileName={fN.file} style={{display: imageFile === fN.file ? 'inherit' : 'none'}} />
          )
        })}
       {motionImageFNArray.map(fN => {
          return (
            <Image key={'img-' + fN.file} fileName={fN.file} style={{display: imageFile === fN.file ? 'inherit' : 'none'}}/>
          )
        })}
      </div>
    </Layout>
  )
}
