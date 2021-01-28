import React from 'react'

export const Button = ({ text, handleClick }) => {
    return (
        <div className="flex items-center justify-center">
            <button 
                className='shadow hover:bg-purple-700 bg-purple-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded' 
                onClick={handleClick}
            >
                {text}
            </button>
        </div>
    )
}