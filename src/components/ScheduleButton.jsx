import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { motion, AnimatePresence } from "framer-motion";

import { PlusIcon, MinusIcon } from "@heroicons/react/solid";

//component that's used for the pill schedule UI; takes in the state values to keep track of, the icon, colors, and label that the button has
const ScheduleButton = ({selected, setSelected, value, setValue, icon, colors, label}) => {
    return (
        <div className="flex flex-col items-center gap-2 w-14">
            <button 
                className={`
                    w-12
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
                        className="text-xs text-center font-semibold select-none flex items-center gap-2"
                    >
                        <button onClick={value !== 0 ? () => setValue(value - 0.5) : () => {}}>
                            <MinusIcon className='w-3 h-3' />
                        </button>
                        <p>{value}</p>
                        <button onClick={value !== 10 ? () => setValue(value + 0.5) : () => {}}>
                            <PlusIcon className='w-3 h-3' />
                        </button>
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    )
}

export default ScheduleButton