import { useState } from 'react';

import {ArrowCircleRightIcon, UploadIcon} from "@heroicons/react/outline"
import axios from 'axios';
import DrugInfo from './DrugInfo';
import categorize from '../utils/categorize';
import FeedbackPopover from '../components/FeedbackPopover';

const UploadImage = () => {

    {/* state management for image uploading */}
    const [mainState, setMainState] = useState(false)
    const [imageUploaded, setImageUploaded] = useState(0)
    const [selectedFile, setSelectedFile] = useState(null)
    const [encoding, setEncoding] = useState("")
    const [loading, setLoading] = useState(false)
    const [textFromImage, setTextFromImage] = useState('')

    const [usingPrevious, setUsingPrevious] = useState(false)
    const confirmUsingPrevious = () => {
        imageResetHandler()
        setUsingPrevious(true)
    }

    /* function to handle image uploading and extracting the base64 string from it */
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

    /* when user wants to choose another image */
    const imageResetHandler = () => {
        setMainState(false);
        setSelectedFile(null);
        setImageUploaded(0);
        setTextFromImage('')
        setLoading(false)
    }

    /* function to send base 64 string of the image to the google cloud api, and return the text from the image */
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
        <div>
            {!textFromImage ?
                <div>
                    {selectedFile == null ?
                        <div className="border-dashed border-2 border-gray-400 text-gray-500 aspect-square grid place-items-center">
                        
                            <div>
                                <UploadIcon className='w-10 h-10 mx-auto mb-2' />
                                
                                <label 
                                    htmlFor='image-upload' 
                                    className='font-semibold text-center text-blue-500 mx-auto block cursor-pointer'
                                >
                                Browse Images
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
                                    className={`rounded-full flex items-center gap-2 bg-blue-500 text-sm font-semibold text-white mx-auto px-8 py-3 hover:shadow-md hover:shadow-blue-500/50 active:scale-95 transition duration-200 ease-in group ${loading? "select-none cursor-not-allowed opacity-90" : ""}`}
                                    onClick={uploadImage}
                                >
                                    <p className='text-base'>Extract Text</p>
                                    {!loading ? 
                                        <ArrowCircleRightIcon className='w-6 h-6 group-hover:translate-x-1 transition duration-200 ease-in' />
                                        :
                                        <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    }
                                </button>
                                <p>or</p>
                                <button 
                                    className='font-semibold text-center text-blue-500 mx-auto block cursor-pointer'
                                    onClick={imageResetHandler}
                                >
                                    Change Image
                                </button>
                            </div>
                
                        </div>
                    }
                </div>
                :
                <div>
                    <FeedbackPopover />
                    <DrugInfo data={categorize(textFromImage)} />
                </div>
            }
            
        </div>
    )
}

export default UploadImage