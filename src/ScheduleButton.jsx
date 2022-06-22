import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { motion, AnimatePresence } from "framer-motion";

import { PlusIcon, MinusIcon } from "@heroicons/react/solid";

//component that's used for the pill schedule UI; takes in the state values to keep track of, the icon, colors, and label that the button has
const ScheduleButton = ({selected, setSelected, value, setValue, icon, colors, label}) => {
    return (
        <div className="flex flex-col items-center gap-1">
            <button 
                className={`
                    w-10
                    md:w-fit
                    aspect-square
                    md:aspect-auto
                    md:p-2
                    flex 
                    items-center
                    justify-center
                    font-semibold 
                    text-sm 
                    gap-2 
                    rounded-md 
                    ring-2 
                    transition 
                    duration-100 
                    ease-in
                    ${selected ? colors : "text-gray-500 ring-gray-300"}
                `}
                onClick={() => {setSelected(!selected); setValue(0)}}
            >
                <FontAwesomeIcon icon={icon} size='sm' />
                <span className='hidden md:block'>{label}</span>
            </button>
            <AnimatePresence>
                {selected &&
                    <motion.div 
                        initial={{opacity: 0, y: 2}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: 2}}
                        transition={{duration: 0.4}}
                        className="text-sm md:text-base text-center font-semibold select-none"
                    >
                        {value}
                        <div className="flex divide-x-2 divide-x-gray-700">
                            <button onClick={value !== 0 ? () => setValue(value - 0.5) : () => {}} className="bg-gray-200 p-1 rounded-l-full border-r-[0.5px] border-r-gray-300">
                                <MinusIcon className='w-4 h-4' />
                            </button>
                            <button onClick={value !== 10 ? () => setValue(value + 0.5) : () => {}} className="bg-gray-200 p-1 rounded-r-full border-l-[0.5px] border-l-gray-300">
                                <PlusIcon className='w-4 h-4' />
                            </button>
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    )
}

export default ScheduleButton