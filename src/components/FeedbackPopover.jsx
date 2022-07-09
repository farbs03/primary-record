import { Popover, Transition } from '@headlessui/react'
import { ThumbUpIcon, ThumbDownIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import { usePopper } from 'react-popper'

const FeedbackPopover = () => {

    let [referenceElement, setReferenceElement] = useState()
    let [popperElement, setPopperElement] = useState()
    let { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement: "bottom-start"
    })

    return (
        <Popover>

            <Popover.Button ref={setReferenceElement} className="text-blue-500 font-semibold text-sm">
                Was this scan successful?
            </Popover.Button>

                <Transition
                    enter="transition duration-200 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-200 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                >
                    <Popover.Panel
                        ref={setPopperElement}
                        style={styles.popper}
                        {...attributes.popper}
                        className='drop-shadow-xl rounded-lg bg-white dark:bg-gray-600 p-2 mr-auto'
                    >
                        <div className="flex gap-2">
                            <button className='rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200'>
                                <ThumbUpIcon className='w-5 h-5' />
                            </button>
                            <button className='rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200'>
                                <ThumbDownIcon className='w-5 h-5' />
                            </button>
                        </div>
                    </Popover.Panel>
                </Transition>
        </Popover>
    )
}

export default FeedbackPopover