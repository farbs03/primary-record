import React, { useState } from 'react'
import { motion } from 'framer-motion'

const PreviousData = ({data}) => {
    const [selected, setSelected] = useState()
    return (
        <div className='grid gap-2 grid-cols-1'>
           {data.map((drug, idx) => (
            <motion.button
                initial={{scale: 0.8, opacity: 0, y: 2}}
                animate={{scale: 1, opacity: 1, y: 0}}
                transition={{delay: 0.2 + 0.2 * idx}}
                onClick={() => setSelected(idx)}
                className={`shadow-md hover:shadow-lg transition duration-200 p-4 rounded-md select-none cursor-pointer text-left ${idx === selected ? "ring-blue-500 ring-2 bg-blue-50 dark:bg-gray-900 dark:opacity-60" : ""}`}
            >
                <p className="font-semibold">{drug.drugName} {drug.strength} {drug.form}</p>
                <p className="font-semibold">Instructions <span className='font-normal'>: Take {drug.morningCount} capsule in the morning</span></p>
            </motion.button>
           ))} 
        </div>
    )
}

export default PreviousData