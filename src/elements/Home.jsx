import { ChevronLeftIcon, CollectionIcon, PhotographIcon, PlusCircleIcon } from "@heroicons/react/outline";
import {useState} from "react"
import {fakeUser} from "../fakeUser"
import PreviousData from "./PreviousData";
import UploadImage from "./UploadImage"

function Home() {

  const [selected, setSelected] = useState('')
  const screens = [
    {
      color: "bg-indigo-400 shadow-indigo-400/50",
      icon: <CollectionIcon className="w-8 h-8" />,
      title: "Use Previous Data",
      value: "previous"
    },
    {
      color: "bg-fuchsia-400 shadow-fuchsia-400/50",
      icon: <PhotographIcon className="w-8 h-8" />,
      title: "Upload a Picture",
      value: "photo"
    },
  ]

  return (
      <div>
          
          {selected ? 
            <div>
                <div>
                  
                  <button className="mb-4 text-blue-500 rounded-full" onClick={() => setSelected('')}>
                    <ChevronLeftIcon className='w-6 h-6' />
                  </button>

                  {selected === 'photo' ? <UploadImage /> : <PreviousData />}
                  
                </div>
            </div>
            :
            <div>
              <p className="text-3xl font-semibold mb-2">Hello {fakeUser.fName}</p>
              <div className="grid grid-cols-2 gap-4">
                {screens.map((screen) => (
                  <button
                    onClick={() => setSelected(screen.value)} 
                    className={`aspect-square rounded-xl text-white font-semibold shadow-md text-center inline-flex flex-col items-center justify-center text-lg active:scale-95 transition duration-100 ${screen.color}`}
                  >
                    {screen.icon}
                    <p className='px-4'>{screen.title}</p>
                  </button>
                ))}
              </div>
            </div>
          }
      </div>
  );
}

export default Home;
