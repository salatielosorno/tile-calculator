import React from 'react'

export const Alert = ({ title, description }) => {
    return (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mt-2 mb-4" role="alert">
            <p className="font-bold">{title}</p>
            <p>{description}</p>
        </div>
    )
}
