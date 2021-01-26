import React, { useState } from 'react'
import { ThumbnailTools } from '../../components/thumbnail-tools/Thumbnail-tools'
const step = {
    CHOOSE_FIGURE: 'chooseFigure',
    ENTER_MEASURES: 'enterMeasures',
    SHOW_RESULT: 'showResult'

}
export const Calculator = () => {
    const [kind, setKind] = useState('');
    const [area, setArea] = useState(0);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [nextStep, setNextStep] = useState(step.CHOOSE_FIGURE);
    
    const handleClick = (thumb) => {
        setKind(thumb.kind);
        setArea(0);
        setHeight(0);
        setWidth(0);
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

    const title = (text) => {
        return <p className='mb-2 text-center'>{text}</p>
    }

    const renderButton = (text, handleClick) => {
        return (
            <div className="md:flex md:items-center">
                <div className="md:w-1/3"></div>
                <div className="md:w-2/3">
                    <button 
                        className='shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded' 
                        onClick={handleClick}
                    >
                        {text}
                    </button>
                </div>
            </div>
        )
    }

    const chooseFigure = () => {
        return <>
            <ThumbnailTools 
                tools={tools}
            />
            {renderButton('Continue', () => {
                setNextStep(step.ENTER_MEASURES);
            })}
        </>;
    }
    
    const enterMeasures = () => {
        return <>
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
            {renderButton('Continue', () => { calculate(); setNextStep(step.SHOW_RESULT) })}
        </>
    }

    const showResult = () => {
        return (
            <>
                <p>{`Kind: ${kind}`}</p>
                <p>{`Area: ${area}`}</p>
                {renderButton('Try again', () => {
                    setNextStep(step.CHOOSE_FIGURE);
                })}
            </>
        )
    }

    const renderStep = () => {
        switch (nextStep) {
            case step.CHOOSE_FIGURE:
                return (
                <div>
                    {title('Choose figure')}
                    {chooseFigure()}
                </div>);
            case step.ENTER_MEASURES:
                return (
                    <div>
                        {title(`Enter measures of the ${kind}`)}
                        {enterMeasures()}
                    </div>);
            case step.SHOW_RESULT:
                return (
                    <div>
                        {title('Result')}
                        {showResult()}
                    </div>);
            default:
                break;
        }
    }
    
    return (
        <div className="w-full max-w-sm">
            {renderStep()}
        </div>
    )
}
