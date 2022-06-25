import { useState } from 'react'

const Switch = ({on, onClick}) => {

    return (
        <button onClick={onClick} className={`rounded-full p-1 w-12 transition ${on? "bg-blue-500" : "bg-gray-200"}`}>
            <div className={`rounded-full aspect-square w-5 bg-white transition-all ${on? "translate-x-5" : "-translate-x-0"}`} />
        </button>
    )
}

export default Switch