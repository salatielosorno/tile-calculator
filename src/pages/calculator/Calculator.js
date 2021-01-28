import React, { useState } from 'react'

import { ThumbnailTools } from '../../components/thumbnail-tools/Thumbnail-tools'
import { Thumbnail } from '../../components/thumbnail/Thumbnail';
import { calculateArea, calculateBoxToBuy, calculateTileNeeded } from '../../utils/utils';

const step = {
    CHOOSE_FIGURE: 'chooseFigure',
    ENTER_MEASURES: 'enterMeasures',
    TILE_PERFORMANCE: 'tilePerformance',
    SHOW_RESULT: 'showResult'

}
export const Calculator = () => {
    const [kind, setKind] = useState('');
    const [area, setArea] = useState(0);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [tile, setTile] = useState(0)
    const [nextStep, setNextStep] = useState(step.CHOOSE_FIGURE);
    const [tilePerformance, setTilePerformance] = useState(0);
    const [boxToBuy, setBoxToBuy] = useState(0);
    
    const handleClick = (thumb) => {
        setKind(thumb.kind);
        setArea(0);
        setHeight(0);
        setWidth(0);
        setTile(0);
        setTilePerformance(0);
        setBoxToBuy(0);
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
        const area = calculateArea(kind, width, height);
        const tile = calculateTileNeeded(area);
        setArea(area);
        setTile(tile);
    }

    const getBoxToBuy = () => {
        setBoxToBuy(calculateBoxToBuy(tile, tilePerformance));
    }

    const title = (text) => {
        return <p className='mb-4 text-center'>{text}</p>
    }

    const renderButton = (text, handleClick) => {
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

    const chooseFigure = () => {
        return <>
        <div className='flex items-center mb-6 justify-center'>
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
            <div className="flex items-center mb-6">
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
            <div className="flex items-center mb-6">
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
            {renderButton('Continue', () => { calculate(); setNextStep(step.TILE_PERFORMANCE) })}
        </>
    }

    const enterTilePerfomance = () => {
        return <>
            <div className="flex items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="tilePerformance">
                        Performance per box
                    </label>
                </div>
                <div className="md:w-2/3">
                    <input 
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                        id="tilePerformance" 
                        type="text"
                        value={tilePerformance}
                        onChange={(e) => setTilePerformance(e.target.value)}
                    />
                </div>
            </div>
            {renderButton('Continue', () => { getBoxToBuy(); setNextStep(step.SHOW_RESULT) })}
        </>
    }

    const showResult = () => {
        return (
        <>
            <div className='flex items-center mb-6 justify-center'>
                <div>
                    <p className='p-2'>{`Area: ${area} m2`}</p>
                    <p className='p-2'>{`Tile: ${tile} m2`}</p>
                    <p className='p-2'>{`Tile performance per box: ${tilePerformance} m2`}</p>
                    <p className='p-2'>You should <span className='font-bold'>{`buy ${boxToBuy} ${ boxToBuy > 1 ? 'boxes' : 'box' }`}</span> of tile</p>
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
            case step.TILE_PERFORMANCE:
                return (
                    <>
                        {title('Enter tile performance')}
                        <div className='mb-4 text-center'>
                            <Thumbnail kind={kind} x={50} y={50} handleClick={()=>{}}/>
                        </div>
                        {enterTilePerfomance()}
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
