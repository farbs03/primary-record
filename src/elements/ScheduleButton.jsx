import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { motion, AnimatePresence } from "framer-motion";

import { PlusIcon, MinusIcon } from "@heroicons/react/solid";

//component that's used for the pill schedule UI; takes in the state values to keep track of, the icon, colors, and label that the button has
const ScheduleButton = ({selected, setSelected, value, setValue, icon, colors, label}) => {
    return (
        <div className="flex flex-col items-center gap-1">
            <button 
                className={`
                    w-14
                    aspect-square
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
                    ${selected ? colors : "text-gray-500 ring-gray-300 dark:ring-gray-500"}
                `}
                onClick={() => {setSelected(!selected); setValue(0)}}
            >
                <FontAwesomeIcon icon={icon} size='lg' />
            </button>
            <AnimatePresence>
                {selected &&
                    <motion.div 
                        initial={{opacity: 0, y: 2}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: 2}}
                        transition={{duration: 0.4}}
                        className="text-sm text-center font-semibold select-none"
                    >
                        {value}
                        <div className="flex divide-x divide-x-gray-300 dark:divide-x-gray-600">
                            <button onClick={value !== 0 ? () => setValue(value - 0.5) : () => {}} className="bg-gray-200 dark:bg-gray-700 p-1 rounded-l-full">
                                <MinusIcon className='w-4 h-4' />
                            </button>
                            <button onClick={value !== 10 ? () => setValue(value + 0.5) : () => {}} className="bg-gray-200 dark:bg-gray-700 p-1 rounded-r-full">
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