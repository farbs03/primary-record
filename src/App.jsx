import { useState } from 'react';
import './index.css';

import {ArrowCircleRightIcon, PlusIcon} from "@heroicons/react/outline"
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
          <div className="max-h-fit grid place-items-center">
            {!textFromImage ?
            <>
              <div className='transition-all duration-200 ease-in '>
                <img
                  className='aspect-auto object-scale-down max-h-[400px]'
                  src={selectedFile}
                  alt="Upload"
                />
              </div>

              <div className='mt-2 text-center font-semibold'>
                
                <button 
                  className="rounded-full flex items-center gap-2 drop-shadow-xl border-blue-500 border-2 text-blue-500 font-semibold text-center mx-auto px-4 py-2 hover:scale-105 active:scale-95 transition duration-100 ease-in group"
                  onClick={uploadImage}
                >
                    <p className='text-base'>Extract Text</p>
                    <ArrowCircleRightIcon className='w-6 h-6 group-hover:translate-x-1 transition duration-100 ease-in' />
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
            </>
            :
            <>
              {textFromImage.split(/\r?\n/).map((line) => (
                <p>{line}</p>
              ))}
            </>
            }
          </div>
        }
      </div>
    </div>
  );
}

export default App;
