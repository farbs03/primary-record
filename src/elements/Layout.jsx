import React, { useState, useEffect } from 'react'
import Tutorial from './Tutorial';
import Switch from '../components/Switch';
import { CalendarIcon, CogIcon, HomeIcon, UserIcon } from '@heroicons/react/solid';
import { UserCircleIcon } from '@heroicons/react/outline';

const Layout = ({children, selected, setSelected}) => {

    //dark mode stuff :)
    const [darkMode, setDarkMode] = useState(false)
    var darkModeStatus = false;

    if(typeof window !== 'undefined')
        darkModeStatus = JSON.parse(localStorage.getItem('darkMode'))
        
    useEffect(() => {
        if(!darkModeStatus) {
            localStorage.setItem('darkMode', JSON.stringify(false))
        }
        else {
            setDarkMode(darkModeStatus)
            if(darkModeStatus === true) {
                document.documentElement.classList.add('dark')
            }
            else {
                document.documentElement.classList.remove('dark')
            }
        }
    }, [darkModeStatus])

    const toggleDarkMode = () => {
        const newVal = !darkMode
        setDarkMode(newVal)
        localStorage.setItem('darkMode', JSON.stringify(newVal))

        if (newVal === true) {
            document.documentElement.classList.add('dark')
        } 
        else {
            document.documentElement.classList.remove('dark')
        }
    }

    const navItems = [
        {
            icon: <HomeIcon className='w-6 h-6' />,
            title: "Home"
        },
        {
            icon: <CalendarIcon className='w-6 h-6' />,
            title: "Calendar"
        },
        {
            icon: <UserIcon className='w-6 h-6' />,
            title: "Profile"
        },
        {
            icon: <CogIcon className='w-6 h-6' />,
            title: "Settings"
        },
    ]

    return (
        <div className="grid place-items-center h-screen p-4 dark:text-white dark:bg-gray-900">

            <div className="relative max-w-md w-full">
                <div class="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl blur-lg opacity-60" />

                <div className='relative z-10 bg-white dark:bg-gray-800 rounded-2xl p-6'>

                    <div className="flex justify-between items-center">
                        <UserCircleIcon className='w-6 h-6' />
                        
                        <div className='flex items-center gap-2'>
                            <p className="text-xl font-bold tracking-tight">Primary Record</p>
                            <Tutorial />
                        </div>

                        <Switch on={darkMode} onClick={toggleDarkMode} />
                    </div>

                    <div className='h-[400px] overflow-y-auto'>
                        {children}
                    </div>

                    <div className="flex justify-between">
                        {navItems.map((item) => (
                            <button 
                                key={item.title}
                                onClick={() => setSelected(item.title)} 
                                className={`p-4 rounded-full transition duration-200 text-sm font-semibold ${item.title === selected ? "text-blue-500" : "text-gray-300 dark:text-gray-700"}`}
                            >
                                {item.icon}
                            </button>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Layout