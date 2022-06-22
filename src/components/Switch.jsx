import { useState } from 'react'

const Switch = () => {

    const [on, setOn] = useState(false)

    return (
        <button onClick={() => setOn(!on)} className={`rounded-full p-2 w-16 transition-all ${on? "bg-blue-500" : "bg-gray-200"}`}>
            <div className={`rounded-full aspect-square w-6 bg-white transition-all ${on? "translate-x-6" : "-translate-x-0"}`} />
        </button>
    )
}

export default Switch