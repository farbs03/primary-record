import { MoonIcon, SunIcon } from '@heroicons/react/solid'
import { useState } from 'react'

const Switch = ({on, onClick}) => {

    return (
        <button 
            onClick={onClick} 
            className={`rounded-full p-1 w-16 transition ${on? "bg-gray-700" : "bg-blue-500"}`}
        >
            <div 
                className={`
                    rounded-full 
                    aspect-square 
                    w-8 
                    bg-white 
                    grid
                    place-items-center
                    transition-all
                    ${on? "translate-x-6" : "-translate-x-0"}
                `}
            >
                {on?
                    <MoonIcon className={`w-5 h-5 transition-all ${!on? "scale-95" : "text-gray-700"}`} />
                    :
                    <SunIcon className={`w-5 h-5 transition-all ${on? "scale-95" : "text-blue-500"}`} />
                }
                
            </div>
        </button>
    )
}

export default Switch