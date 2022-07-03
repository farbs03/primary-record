import React, { useEffect, useState } from 'react'

import categorize from '../utils/categorize'

import { styles } from '../utils/styles'

import {faCoffee, faSun, faMoon, faBed} from "@fortawesome/free-solid-svg-icons"

import ScheduleButton from './ScheduleButton'

const DrugInfo = ({data}) => {

    let [foundData, setFoundData] = useState(data)


    //state management that allows user to create their pill schedule
    const [morning, setMorning] = useState(false)
    const [morningCount, setMorningCount] = useState(0)

    const [afternoon, setAfternoon] = useState(false)
    const [afternoonCount, setAfternoonCount] = useState(0)

    const [night, setNight] = useState(false)
    const [nightCount, setNightCount] = useState(0)

    const [bedtime, setBedtime] = useState(false)
    const [bedtimeCount, setBedtimeCount] = useState(0)

    const [error, setError] = useState(false)

    //submits the info that the user confirms in the form
    function submit() {
        if(foundData.drugName && foundData.strength && foundData.form && (morningCount || afternoonCount || nightCount || bedtimeCount)) {
            let data = {
                drugName: foundData.drugName,
                strength: foundData.strength,
                form: foundData.form,
                morningCount: morningCount,
                afternoonCount: afternoonCount,
                nightCount: nightCount,
                bedtimeCount: bedtimeCount
            }
            //make api call here to database to send data to be stored
            console.log(data)
        }
        else {
            setError(true);
        }
    }

    return (
        <div className='flex flex-col gap-4 mt-4 -p-4'>
            
            <label className='text-sm font-semibold'>
                Drug Name
                <input 
                    type='text'
                    value={foundData.drugName}
                    onChange={(e) => setFoundData({...foundData, drugName: e.target.value})}
                    className={styles.textfield}
                />
            </label>

            <label className='text-sm font-semibold'>
                Strength
                <input 
                    type='text'
                    value={foundData.strength}
                    onChange={(e) => setFoundData({...foundData, strength: e.target.value})}
                    className={styles.textfield}
                />
            </label>

            <label className='text-sm font-semibold'>
                Form
                <input 
                    type='text'
                    value={foundData.form}
                    onChange={(e) => setFoundData({...foundData, form: e.target.value})}
                    className={styles.textfield}
                />
            </label>

            <div>
                
                <p className="text-sm font-semibold mb-1">Pill Schedule</p>
                
                <div className="flex justify-between">
                    
                    <ScheduleButton 
                        selected={morning || morningCount > 0}
                        setSelected={setMorning}
                        value={morningCount}
                        setValue={setMorningCount}
                        icon={faCoffee}
                        label="Morning"
                        colors="ring-yellow-500 text-yellow-500 bg-yellow-50 dark:bg-gray-800"
                    />

                    <ScheduleButton 
                        selected={afternoon || afternoonCount > 0}
                        setSelected={setAfternoon}
                        value={afternoonCount}
                        setValue={setAfternoonCount}
                        icon={faSun}
                        label="Afternoon"
                        colors="ring-orange-500 text-orange-500 bg-orange-50 dark:bg-gray-800"
                    />
                    
                    <ScheduleButton 
                        selected={night || nightCount > 0}
                        setSelected={setNight}
                        value={nightCount}
                        setValue={setNightCount}
                        icon={faMoon}
                        label="Night"
                        colors="ring-indigo-500 text-indigo-500 bg-indigo-50 dark:bg-gray-800"
                    />

                    <ScheduleButton 
                        selected={bedtime || bedtimeCount > 0}
                        setSelected={setBedtime}
                        value={bedtimeCount}
                        setValue={setBedtimeCount}
                        icon={faBed}
                        label="Bedtime"
                        colors="ring-violet-500 text-violet-500 bg-violet-50 dark:bg-gray-800"
                    />

                </div>
            </div>

            <button 
                className="
                mt-2
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
                dark:hover:bg-gray-800
                hover:text-blue-500

                active:scale-90

                transition
                duration-200
                ease-in
                "
                onClick={submit}
            >
                Submit
            </button>
        </div>
    )
}

export default DrugInfo