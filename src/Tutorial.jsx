import React, { useState, useEffect } from 'react'

import { InformationCircleIcon } from "@heroicons/react/outline"

import Modal from './components/Modal'

import { motion, AnimatePresence } from 'framer-motion'

import TakePhoto from "./assets/takephoto.svg"
import DrugInfo from "./assets/druginfo.svg"
import SubmitButton from "./assets/submitbutton.svg"

const Tutorial = () => {
    
    const [open, setOpen] = useState(false)
    const [currSlide, setCurrSlide] = useState(0)

    function handleSlideChange() {
        if(currSlide < 2) {
            setCurrSlide(currSlide + 1)
        }
        else {
            setOpen(false)
            setTimeout(() => setCurrSlide(0), 400)
        }
    }

    useEffect(() => {
        if(!localStorage.getItem('visitedWebsite')) {
            localStorage.setItem('visitedWebsite', true)
            setOpen(true)
        }
    }, [])

    const slideData = [
        {
            title: 'Upload a Photo',
            text: 'Take a picture of the prescription label whose text you want processed by our system',
            bg: 'from-green-200 to-blue-300',
            image: TakePhoto

        },
        {
            title: 'Confirm and Edit Drug Info',
            text: 'After our system obtains and classifies the text from your image, you may edit/confirm this info',
            bg: 'from-red-200 to-indigo-300',
            image: DrugInfo
        },
        {
            title: 'Submit Info',
            text: 'Just like that, you can save important drug info to your profile! You may edit this info at any time afterwards',
            bg: 'from-cyan-200 to-purple-300',
            image: SubmitButton
        }
    ]

    return (
        <>

            <button onClick={() => setOpen(true)}>
                <InformationCircleIcon className='w-6 h-6 text-gray-800' />
            </button>

            <Modal open={open} setOpen={setOpen}>

                <div className="w-80 h-[450px] relative grid place-items-center">

                    {slideData.map((slide, number) => (
                        <AnimatePresence>
                            {number === currSlide &&
                                <motion.div
                                    key={slide.title}
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    exit={{opacity: 0}}
                                    transition={{duration: 0.4}}
                                    className='w-80 h-[450px] absolute'
                                >
                                    <div className="relative h-1/2 bg-white grid place-items-center rounded-t-xl">
                                        <div className={`h-full w-full z-0 absolute rounded-t-xl bg-gradient-to-tr ${slide.bg} blur-lg opacity-80`} />
                                        <img src={slide.image} className='absolute z-10 max-h-[90%] max-w-[90%]' />
                                    </div>
                                    
                                    <motion.div 
                                        initial={{x: 20}}
                                        animate={{x: 0}}
                                        exit={{x: -20}}
                                        transition={{duration: 0.4}}
                                        className="p-4 h-1/2"
                                    >
                                        <div className="text-center">
                                            <p className="font-semibold text-xl tracking-tight">{slide.title}</p>
                                            <p className="mt-2 text-gray-800 font-semibold">{slide.text}</p>
                                        </div>
                                        
                                        <div className='flex items-center gap-8 w-fit mx-auto my-4'>
                                            <button
                                                className='text-blue-500 text-sm font-semibold px-8 py-3'
                                                onClick={() => setOpen(false)}
                                            >
                                                Skip
                                            </button>
                                            <button 
                                                className="px-8 py-3 font-semibold rounded-full bg-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/50 transition duration-200 ease-in text-sm"
                                                onClick={handleSlideChange}
                                            >
                                                {number === 2 ? "Done" : "Next"}
                                            </button>
                                        </div>

                                    </motion.div>
                                    
                                </motion.div>
                            }
                        </AnimatePresence>
                    ))}
                    
                    <div className="absolute bottom-4 flex gap-2">
                        {[0, 1, 2].map((number) => (
                            <div className='w-2 h-2 rounded-full' key={number}>
                                {number === currSlide ?
                                    <div className='w-2 h-2 rounded-full bg-black/80 transition-all duration-200' />
                                    :
                                    <div className='w-2 h-2 rounded-full bg-black/40 transition-all duration-200' />
                                }
                            </div>
                        ))}
                    </div>

                </div>
                
            </Modal>
        </>
    )
}

export default Tutorial