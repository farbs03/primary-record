import { useState } from 'react';
import './index.css';

import {ArrowCircleRightIcon, ArrowLeftIcon, ChevronLeftIcon, PlusIcon} from "@heroicons/react/outline"
import Modal from "./components/Modal"
import axios from 'axios';
import DrugInfo from './DrugInfo';
import Tutorial from './Tutorial';

function App() {

  const [mainState, setMainState] = useState(false)
  const [imageUploaded, setImageUploaded] = useState(0)
  const [selectedFile, setSelectedFile] = useState(null)
  const [encoding, setEncoding] = useState("")
  const [loading, setLoading] = useState(false)
  const [textFromImage, setTextFromImage] = useState('')

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
    setTextFromImage('')
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
    })
  }
  
  return (
    <div className="grid place-items-center h-screen p-6">

      <div className='max-w-xl w-full shadow-2xl shadow-blue-500/40 rounded-2xl p-6'>
        
        <div className="flex gap-2 items-center mb-2">
          <p className="text-xl font-bold tracking-tight">Primary Record</p>
          <Tutorial />
        </div>
        
        {selectedFile == null ?
          <div className="border-dashed border-2 rounded-sm border-gray-300 text-gray-500 h-[400px] grid place-items-center">
          
            <div>
              <PlusIcon className='w-6 h-6 mx-auto mb-2' />
              
              <p className="font-semibold text-center">Drag Image or</p>
              
              <label 
                htmlFor='image-upload' 
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
                  <div 
                    className="rounded-full cursor-pointer w-fit flex items-center gap-2 border-blue-500 border-2 text-blue-500 font-semibold text-center mx-auto px-4 py-2 hover:bg-blue-50 active:scale-95 transition duration-200 ease-in group"
                    onClick={uploadImage}
                  >
                      <p className='text-base'>Extract Text</p>
                      {!loading ? 
                        <ArrowCircleRightIcon className='w-6 h-6 group-hover:translate-x-1 transition duration-100 ease-in' />
                        :
                        <svg className="animate-spin h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      }
                      
                  </div>
                  <p>or</p>
                  <button 
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
                  className='mr-auto flex items-center gap-2 text-blue-500 font-semibold my-4'
                >
                  <ChevronLeftIcon className='w-6 h-6' />
                  <p>Go Back</p>
                </button>

                {textFromImage && <DrugInfo data={textFromImage} />}
                
              </>
            }
          </>
        }
      </div>
    </div>
  );
}

export default App;
