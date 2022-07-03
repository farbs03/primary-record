import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { fakeUser } from '../fakeUser'
import { CheckIcon } from '@heroicons/react/outline'
import DrugInfo from './DrugInfo'

const PreviousData = () => {
    let data = fakeUser.drugs

    const [selected, setSelected] = useState({})
    const [confirmed, setConfirmed] = useState(false)

    return (
        <div>
            {!confirmed ?
                <div className='grid gap-4 grid-cols-1'>
                    
                    {data.map((drug, idx) => (
                        <motion.div
                            key={drug.drugName}
                            initial={{scale: 0.8, opacity: 0, y: 2}}
                            animate={{scale: 1, opacity: 1, y: 0}}
                            transition={{duration: 0.2, delay: 0.2 + 0.2 * idx}}
                        >
                            <motion.button
                                onClick={() => setSelected(drug)}
                                className={`shadow-md hover:shadow-lg transition duration-200 relative p-4 rounded-md select-none cursor-pointer text-left ${drug.drugName === selected.drugName ? "ring-blue-500 ring-2 bg-blue-50 dark:bg-gray-900" : "ring-2 ring-gray-700"}`}
                            >
                                {drug.drugName === selected.drugName &&
                                    <div className='-ml-4 -mt-4 absolute z-10 h-full w-full rounded-md bg-blue-100/50 dark:bg-blue-900/50 grid place-items-center'>
                                        <button 
                                            onClick={() => setConfirmed(true)} 
                                            className='bg-blue-500 p-4 rounded-full aspect-square z-20'
                                        >
                                            <CheckIcon className='w-6 h-6' />
                                        </button>
                                    </div>
                                }
                                <p className="font-semibold">{drug.drugName} {drug.strength} {drug.form}</p>
                                <p className="font-semibold">Instructions <span className='font-normal'>: Take {drug.morningCount} capsule in the morning</span></p>
                            </motion.button>
                        </motion.div>
                    ))}
                </div>
                :
                <DrugInfo data={selected} />
            }
                
        </div>
    )
}

export default PreviousData