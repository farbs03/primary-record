import { useState } from 'react';
import './index.css';

import {ArrowCircleRightIcon, ArrowLeftIcon, ChevronLeftIcon, PlusIcon} from "@heroicons/react/outline"
import Modal from "./components/Modal"
import axios from 'axios';

function App() {

  const [mainState, setMainState] = useState(false)
  const [imageUploaded, setImageUploaded] = useState(0)
  const [selectedFile, setSelectedFile] = useState(null)
  const [encoding, setEncoding] = useState("")
  const [loading, setLoading] = useState(false)
  const [textFromImage, setTextFromImage] = useState("")

  const handleUploadClick = (event) => {
    var file = event.target.files[0];
    setSelectedFile(event.target.files[0])
    
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSelectedFile([reader.result])
      setImageUploaded(reader.result)
      setEncoding(reader.result.split("base64,")[1])
    }
    setMainState(true)
  }

  const imageResetHandler = () => {
    setMainState(false);
    setSelectedFile(null);
    setImageUploaded(0);
    setTextFromImage("")
    setLoading(false)
  }

  const uploadImage = () => {
    setLoading(true);
    axios.post('https://incentiva-cloud-vision.herokuapp.com/', {
      imageString: encoding
    })
    .then(res => {
      setTimeout(() => setLoading(false), 200)
      setTextFromImage(res.data);
      console.log(res.data)
    })
  }
  
  console.log(textFromImage.split(/\r?\n/))

  return (
    <div className="grid place-items-center h-screen p-6">
      <div className='max-w-xl w-full aspect-square shadow-2xl shadow-blue-500/40 rounded-2xl p-6'>
        
        <p className="text-2xl font-semibold mb-2">Primary Record</p>
        
        {selectedFile == null ?
          <div className="border-dashed border border-gray-400 text-gray-500 h-full grid place-items-center">
          
            <div>
              <PlusIcon className='w-6 h-6 mx-auto mb-2' />
              
              <p className="font-semibold text-center">Drag Image or</p>
              
              <label 
                for='image-upload' 
                className='font-semibold text-center text-blue-500 mx-auto block cursor-pointer'
              >
                Browse
              </label>

              <input 
                className='hidden' 
                id="image-upload" 
                type="file"
                accept="image/*"
                onChange={handleUploadClick}
              />

            </div>

          </div>
        :
          <>
            {!textFromImage ?
              <div className='flex flex-col'>

                <div className="grid place-items-center h-max">
                  <img
                    className='aspect-auto object-scale-down max-h-[400px]'
                    src={selectedFile}
                    alt="Upload"
                  />
                </div>

                <div className='mt-4 text-center font-semibold'>
                  <button 
                    className="rounded-full flex items-center gap-2 drop-shadow-xl border-blue-500 border-2 text-blue-500 font-semibold text-center mx-auto px-4 py-2 hover:scale-105 active:scale-95 transition duration-100 ease-in group"
                    onClick={uploadImage}
                  >
                      <p className='text-base'>Extract Text</p>
                      {!loading ? 
                        <ArrowCircleRightIcon className='w-6 h-6 group-hover:translate-x-1 transition duration-100 ease-in' />
                        :
                        <svg class="animate-spin h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      }
                      
                  </button>
                  <p>or</p>
                  <button 
                    for='image-upload' 
                    className='font-semibold text-center text-blue-500 mx-auto block cursor-pointer'
                    onClick={imageResetHandler}
                  >
                    Change Image
                  </button>
                </div>

              </div>
            :
              <>
                <button
                  onClick={() => setTextFromImage("")}
                  className='mr-auto flex items-center gap-2 text-blue-500 font-semibold mb-2'
                >
                  <ChevronLeftIcon className='w-6 h-6' />
                  <p>Go Back</p>
                </button>

                <div className='flex flex-col gap-4'>
                  {textFromImage.split(/\r?\n/).map((line) => (
                    <label className='text-sm font-semibold'>
                      Name
                      <input 
                        type='text' 
                        value={line}
                        className='
                          rounded-md
                          p-2
                          w-full
                          bg-gray-200
                          focus:bg-white
                          transition
                          duration-200
                          ease-in
                          focus:ring-2
                          focus:ring-gray-300
                          appearance-none
                        '
                      />
                    </label>
                  ))}
                </div>
                
                <button className="px-8 py-2 rounded-md text-center font-semibold bg-blue-500 text-white mt-4 mx-auto block">Submit</button>
              </>
            }
          </>
        }
      </div>
    </div>
  );
}

export default App;
