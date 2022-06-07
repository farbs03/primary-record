import React, { useEffect, useState } from 'react'
import categorize from './categorize'
import { classNames } from './classNames'

const DrugInfo = ({data}) => {

    let [foundData, setFoundData] = useState({})

    useEffect(() => {
        setFoundData(categorize(data))
    }, [])

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

            <label className='text-sm font-semibold'>
                Instructions
                <input 
                    type='text'
                    value={foundData.instructions}
                    onChange={(e) => setFoundData({...foundData, instructions: e.target.value})}
                    className={classNames.textfield}
                />
            </label>

            <button 
                className="
                mt-4
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
            >
                Submit
            </button>
        </div>
    )
}

export default DrugInfo