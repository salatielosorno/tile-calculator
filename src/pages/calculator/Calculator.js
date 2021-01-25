import React, { useState } from 'react'
import { ThumbnailTools } from '../../components/thumbnail-tools/Thumbnail-tools'

export const Calculator = () => {
    const [kind, setKind] = useState('');
    const [area, setArea] = useState(0);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const handleClick = (thumb) => {
        setKind(thumb.kind);
        setArea(0);
        setHeight(0);
        setWidth(0);
    }
    const calculate = () => {
        switch (kind) {
            case 'square':
                setArea(width * height);
                break;
            case 'triangle':
                setArea((width * height) / 2);
                break;
            default:
                break;
        }
    }

    const tools = [
        {
            kind: 'square',
            x: 50,
            y: 50,
            handleClick,
        },
        {
            kind: 'triangle',
            x: 50,
            y: 50,
            handleClick,
        }
    ];
    const renderDataIO = () => {
        return <>
        <div className="w-full max-w-sm">
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="width">
                            Width
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input 
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                            id="width" 
                            type="text"
                            value={width}
                            onChange={(e) => setWidth(e.target.value)}
                        />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="large">
                            Large
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input 
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                            id="large" 
                            type="text" 
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                        />
                    </div>
                </div>
                <div className="md:flex md:items-center">
                    <div className="md:w-1/3"></div>
                    <div className="md:w-2/3">
                        <button 
                            className='shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded' 
                            onClick={calculate}
                        >
                            Calculate
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <p>{`Kind: ${kind}`}</p>
                { area > 0 && <p>{`Area: ${area}`}</p>}
            </div>
        </>
    }
    return (
        <div>
            <div>
                <p className='mb-2 text-center'>Available areas</p>
                <ThumbnailTools 
                    tools={tools}
                />
            </div>
            {kind && renderDataIO()}
        </div>
    )
}
