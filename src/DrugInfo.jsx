import React, { useEffect, useState } from 'react'

import categorize from './categorize'

import { classNames } from './classNames'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCoffee, faSun, faMoon} from "@fortawesome/free-solid-svg-icons"

import {PlusIcon, MinusIcon} from "@heroicons/react/solid"

import { AnimatePresence, motion } from 'framer-motion'

const DrugInfo = ({data}) => {

    let [foundData, setFoundData] = useState({})

    useEffect(() => {
        setFoundData(categorize(data))
    }, [])

    const [morning, setMorning] = useState(false)
    const [morningCount, setMorningCount] = useState(0)

    const [afternoon, setAfternoon] = useState(false)
    const [afternoonCount, setAfternoonCount] = useState(0)

    const [night, setNight] = useState(false)
    const [nightCount, setNightCount] = useState(0)

    const [error, setError] = useState(false)

    function submit() {
        if(foundData.medicationName && foundData.strength && foundData.form && (morningCount || afternoonCount || nightCount)) {
            let data = {
                medicationName: foundData.medicationName,
                strength: foundData.strength,
                form: foundData.form,
                morningCount: morningCount,
                afternoonCount: afternoonCount,
                nightCount: nightCount
            }
            //make api call here to database to send data to be stored
            console.log(data)
        }
        else {
            setError(true);
        }
    }

    return (
        <div className='flex flex-col gap-4 mt-4'>
            
            <label className='text-sm font-semibold'>
                Medication Name
                <input 
                    type='text'
                    value={foundData.medicationName}
                    onChange={(e) => setFoundData({...foundData, medicationName: e.target.value})}
                    className={classNames.textfield}
                />
            </label>

            <label className='text-sm font-semibold'>
                Strength
                <input 
                    type='text'
                    value={foundData.strength}
                    onChange={(e) => setFoundData({...foundData, strength: e.target.value})}
                    className={classNames.textfield}
                />
            </label>

            <label className='text-sm font-semibold'>
                Form
                <input 
                    type='text'
                    value={foundData.form}
                    onChange={(e) => setFoundData({...foundData, form: e.target.value})}
                    className={classNames.textfield}
                />
            </label>

            <div>
                
                <p className="text-sm font-semibold mb-1">Pill Schedule</p>
                
                <div className="flex gap-4">
                    
                    <div className="flex flex-col items-center gap-2">
                        <button 
                            className={`
                                px-4
                                py-2 
                                font-semibold 
                                text-sm 
                                flex items-center 
                                gap-2 
                                rounded-md 
                                ring-2 
                                transition 
                                duration-100 
                                ease-in 
                                ${morning ? "ring-yellow-500 text-yellow-500 bg-yellow-50" : "text-gray-500 ring-gray-300"}
                            `}
                            onClick={() => {setMorning(!morning); setMorningCount(0)}}
                        >
                            Morning
                            <FontAwesomeIcon icon={faCoffee} size='sm' />
                        </button>
                        <AnimatePresence>
                            {morning &&
                                <motion.div 
                                    initial={{opacity: 0, y: 2}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: 2}}
                                    transition={{duration: 0.4}}
                                    className="flex gap-2"
                                >
                                    <button onClick={morningCount !== 0 ? () => setMorningCount(morningCount - 1) : () => {}} className="bg-gray-200 p-1 rounded-md">
                                        <MinusIcon className='w-5 h-5' />
                                    </button>
                                    {morningCount}
                                    <button onClick={() => setMorningCount(morningCount + 1)} className="bg-gray-200 p-1 rounded-md">
                                        <PlusIcon className='w-5 h-5' />
                                    </button>
                                </motion.div>
                            }
                        </AnimatePresence>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <button 
                            className={`
                                px-4
                                py-2
                                font-semibold 
                                text-sm 
                                flex 
                                items-center 
                                gap-2 
                                rounded-md 
                                ring-2 
                                transition 
                                duration-100 
                                ease-in 
                                ${afternoon ? "ring-orange-500 text-orange-500 bg-orange-50" : "text-gray-500 ring-gray-300"}
                            `}
                            onClick={() => {setAfternoon(!afternoon); setAfternoonCount(0)}}
                        >
                            Afternoon
                            <FontAwesomeIcon icon={faSun} size='lg' />
                        </button>
                        <AnimatePresence>
                            {afternoon &&
                                <motion.div 
                                    initial={{opacity: 0, y: 2}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: 2}}
                                    transition={{duration: 0.4}}
                                    className="flex gap-2"
                                >
                                    <button onClick={afternoonCount !== 0 ? () => setAfternoonCount(afternoonCount - 1) : () => {}} className="bg-gray-200 p-1 rounded-md">
                                        <MinusIcon className='w-5 h-5' />
                                    </button>
                                    {afternoonCount}
                                    <button onClick={() => setAfternoonCount(afternoonCount + 1)} className="bg-gray-200 p-1 rounded-md">
                                        <PlusIcon className='w-5 h-5' />
                                    </button>
                                </motion.div> 
                            }
                        </AnimatePresence>
                    </div>
                    
                    <div className="flex flex-col items-center gap-2">
                        <button 
                            className={`
                                px-4 
                                py-2 
                                font-semibold 
                                text-sm 
                                flex 
                                items-center 
                                gap-2 
                                rounded-md 
                                ring-2 
                                transition 
                                duration-100 
                                ease-in 
                                ${night ? "ring-indigo-500 text-indigo-500 bg-indigo-50" : "text-gray-500 ring-gray-300"}
                            `}
                            onClick={() => {setNight(!night); setNightCount(0)}}
                        >
                            Night
                            <FontAwesomeIcon icon={faMoon} size='sm' />
                        </button>
                        <AnimatePresence>
                            {night &&
                                <motion.div 
                                    initial={{opacity: 0, y: 2}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: 2}}
                                    transition={{duration: 0.4}}
                                    className="flex gap-2"
                                >
                                    <button onClick={nightCount !== 0 ? () => setNightCount(nightCount - 1) : () => {}} className="bg-gray-200 p-1 rounded-md">
                                        <MinusIcon className='w-5 h-5' />
                                    </button>
                                    {nightCount}
                                    <button onClick={() => setNightCount(nightCount + 1)} className="bg-gray-200 p-1 rounded-md">
                                        <PlusIcon className='w-5 h-5' />
                                    </button>
                                </motion.div>
                            }
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <button 
                className="
                mt-2
                px-12 
                py-3 
                rounded-full 
                text-center 
                font-semibold 
                bg-blue-500 
                text-white  
                mx-auto

                hover:ring-2
                hover:ring-blue-500
                hover:bg-white
                hover:text-blue-500

                active:scale-90

                transition
                duration-200
                ease-in
                "
                onClick={submit}
            >
                Submit
            </button>
        </div>
    )
}

export default DrugInfo