import React, { useState } from 'react'
import { ThumbnailTools } from '../../components/thumbnail-tools/Thumbnail-tools'
import { Thumbnail } from '../../components/thumbnail/Thumbnail';
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
    const [tile, setTile] = useState(0)
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
        let area;
        switch (kind) {
            case 'square':
                area = width * height;
                break;
            case 'triangle':
                area = (width * height) / 2
                break;
            default:
                break;
        }
        area = Math.round((area + Number.EPSILON) * 100) / 100;
        const tile = Math.round(((area * 1.05) + Number.EPSILON) * 100) / 100;;
        setArea(area);
        setTile(tile);
    }

    const title = (text) => {
        return <p className='mb-4 text-center'>{text}</p>
    }

    const renderButton = (text, handleClick) => {
        return (
            <div className="md:flex md:items-center justify-center">
                <button 
                    className='shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded' 
                    onClick={handleClick}
                >
                    {text}
                </button>
            </div>
        )
    }

    const chooseFigure = () => {
        return <>
        <div className='md:flex md:items-center mb-6 justify-center'>
                <ThumbnailTools 
                    tools={tools}
                />
        </div>
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
            <div className='md:flex md:items-center mb-6 justify-center'>
                <div>
                    <p className='p-2 text-center'>{`Area: ${area}`}</p>
                    <p className='p-2'><span>You should </span><span className='font-bold'>{`buy ${tile} m2`}</span> of tile</p>
                </div>
            </div>
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
                    <>
                    {title('Choose the kind of area')}
                    {chooseFigure()}
                    </>);
            case step.ENTER_MEASURES:
                return (
                    <>
                        {title('Enter measures: use m2')}
                        <div className='mb-4 text-center'>
                            <Thumbnail kind={kind} x={50} y={50} handleClick={()=>{}}/>
                        </div>
                        {enterMeasures()}
                    </>);
            case step.SHOW_RESULT:
                return (
                    <>
                        {/* {title('Result')} */}
                        <div className='mb-4 text-center'>
                            <Thumbnail kind={kind} x={50} y={50} handleClick={()=>{}}/>
                        </div>
                        {showResult()}
                    </>);
            default:
                break;
        }
    }
    
    return (
        <div className="w-full max-w-sm">
            <h1 className='text-center font-bold text-lg p-6'>Tile Calculator</h1>
            {renderStep()}
        </div>
    )
}
