import { useEffect, useState } from "react";
import classNames from "../utils/classNames"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import format from "date-fns/format";

const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = ({date, selectedDay, setSelectedDay, month, setMonth, year, setYear}) => {

    const [numOfDays, setNumOfDays] = useState([]);
    const [emptyDays, setEmptyDays] = useState([]);

    const isToday = (date) => {
        const today = new Date();
        const d = new Date(year, month, date);

        return format(today, 'yyyy/MM/dd') === format(d, 'yyyy/MM/dd');
    };

    const isSelected = (date) => {
        const d = new Date(year, month, date)
        return selectedDay === format(d, 'yyyy/MM/dd')
    }

    const getNoOfDays = () => {
        let i;
        let daysInMonth = new Date(year, month + 1, 0).getDate();

        // find where to start calendar day of week
        let dayOfWeek = new Date(year, month).getDay();
        let emptyDaysArray = [];
        for (i = 1; i <= dayOfWeek; i++) {
            emptyDaysArray.push(i);
        }

        let daysArray = [];
        for (i = 1; i <= daysInMonth; i++) {
            daysArray.push(i);
        }

        setEmptyDays(emptyDaysArray);
        setNumOfDays(daysArray);
    };

    useEffect(() => {
        getNoOfDays();
    }, [month]);
    
    const btnClass = (limit) => {
        return classNames(
            month === limit ? "cursor-not-allowed opacity-25" : "",
            "leading-none rounded-lg transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200 ease-in p-1 items-center focus:outline-none"
        );
    };

    const nextMonth = () => {
        setMonth(month + 1);
        getNoOfDays();
    };

    const prevMonth = () => {
        setMonth(month - 1);
        getNoOfDays();
    };

    return (
        <>
            <div className="w-full">
                <div className="bg-white dark:bg-gray-800">
                    <div className="flex items-center justify-between mb-2 px-2">
                        <div>
                            <span className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                                {monthNames[month]}
                            </span>
                            <span className="ml-2 text-lg font-semibold text-gray-600 dark:text-gray-400">
                                {year}
                            </span>
                        </div>
                        <div className="rounded-lg px-1 pt-1">
                            {/* Previous Month Button */}
                            <button
                                type="button"
                                onClick={() => prevMonth()}
                                disabled={month === 0}
                                className={btnClass(0)}
                            >
                                <ChevronLeftIcon className="h-5 w-5 text-gray-500 dark:text-gray-400 inline-flex leading-none" />
                            </button>
                            <div className="inline-flex h-6" />
                            {/* Next Month Button */}
                            <button
                                type="button"
                                onClick={() => nextMonth()}
                                disabled={month === 11}
                                className={btnClass(11)}
                            >
                                <ChevronRightIcon className="h-5 w-5 text-gray-500 dark:text-gray-400 inline-flex leading-none" />
                            </button>
                        </div>
                    </div>
                    <div>
                        <div
                            className="flex flex-wrap"
                        >
                            {days.map((day) => (
                                <div key={day} className="w-[14.28%]">
                                    <div className="text-gray-600 dark:text-gray-300 text-xs md:text-sm uppercase tracking-wide font-semibold text-center">
                                        {day}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-wrap">
                            {emptyDays.map((emptyDay) => (
                                <div
                                    key={emptyDay}
                                    className="text-center aspect-square w-[14.28%]"
                                />
                            ))}
                            {numOfDays.map((date, index) => (
                                <div
                                    key={index}
                                    className="relative aspect-square w-[14.28%] inline-flex items-center flex-shrink-0 justify-center"
                                >
                                    <div
                                        onClick={() => setSelectedDay(format(new Date(year, month, date), "yyyy/MM/dd"))}
                                        className={classNames(
                                            isToday(date) && !isSelected(date)
                                            ? "border-2 border-blue-500 text-gray-900 dark:text-gray-100 "
                                            :
                                            isSelected(date)
                                            ? "bg-blue-500 text-gray-100"
                                            : "text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-500 dark:hover:bg-opacity-50",
                                            "transition duration-200 ease-in inline-flex w-10 h-10 items-center justify-center cursor-pointer text-center leading-none rounded-full"
                                        )}
                                    >
                                        {date}
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Calendar;