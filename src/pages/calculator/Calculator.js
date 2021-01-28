import React, { useState } from 'react'
import Swal from 'sweetalert2'

import { ThumbnailTools } from '../../components/thumbnail-tools/Thumbnail-tools'
import { Thumbnail } from '../../components/thumbnail/Thumbnail';
import { TitleScreen } from '../../components/screen/title-screen/title-screen';
import { Button } from '../../components/screen/button/button';
import { Alert } from '../../components/screen/alert/alert';
import { calculateArea, calculateBoxToBuy, calculateTileNeeded } from '../../utils/utils';

const decimalPattern = /^\d+(\.\d{0,2})?$/;
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
    const [showAlert, setShowAlert] = useState(false)
    
    const handleClick = (thumb) => {
        setKind(thumb.kind);
        setArea(0);
        setHeight(0);
        setWidth(0);
        setTile(0);
        setTilePerformance(0);
        setBoxToBuy(0);
    }

    const cleanData = () => {
        setKind('')
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

    //screens
    const chooseFigure = () => {
        return <>
        <div className='flex items-center mb-6 justify-center'>
                <ThumbnailTools 
                    tools={tools}
                />
        </div>
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
                        onChange={(e) => {
                            if(e.target.value === 0 || e.target.value === '' || decimalPattern.test(e.target.value)){
                                setWidth(e.target.value)
                            }
                        }}
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
                        onChange={(e) => {
                            if(e.target.value === 0 || e.target.value === '' || decimalPattern.test(e.target.value)){
                                setHeight(e.target.value)
                            }
                        }}
                        pattern={decimalPattern}
                    />
                </div>
            </div>
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
                        onChange={(e) => {
                            if(e.target.value === 0 || e.target.value === '' || decimalPattern.test(e.target.value)){
                                setTilePerformance(e.target.value)
                            }
                        }}
                        pattern={decimalPattern}
                    />
                </div>
            </div>
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
        </>
        )
    }

    const renderStep = () => {
        switch (nextStep) {
            case step.CHOOSE_FIGURE:
                return (
                    <>
                        <TitleScreen text='Choose the kind of area'/>
                        {chooseFigure()}
                        {showAlert && <Alert text='Await' description='Choose the kind'/>}
                        <Button text='Continue' handleClick={ () => { 
                            if(kind === ''){
                                setShowAlert(true);
                                return;
                            }
                            setShowAlert(false);
                            setNextStep(step.ENTER_MEASURES)
                        }}/>
                    </>);
            case step.ENTER_MEASURES:
                return (
                    <>
                        <div className='mb-4 text-center'>
                            <Thumbnail kind={kind} x={50} y={50} handleClick={()=>{}}/>
                        </div>
                        <TitleScreen text='Enter measures: use m2'/>
                        {enterMeasures()}
                        {showAlert && <Alert text='Await' description='Enter measures'/>}
                        <Button text='Continue' handleClick={ () =>  { 
                            if(!(width > 0) || !(height > 0) ){
                                setShowAlert(true);
                                return;
                            }
                            setShowAlert(false);

                            calculate(); 
                            setNextStep(step.TILE_PERFORMANCE) 
                        }}/>
                    </>);
            case step.TILE_PERFORMANCE:
                return (
                    <>
                        <div className='mb-4 text-center'>
                            <Thumbnail kind={kind} x={50} y={50} handleClick={()=>{}}/>
                        </div>
                        <TitleScreen text='Enter tile performance'/>
                        {enterTilePerfomance()}
                        {showAlert && <Alert text='Await' description='Enter tile performance'/>}
                        <Button text='Continue' handleClick={() => { 
                            if(tilePerformance <= 0){
                                setShowAlert(true);
                                return;
                            }
                            setShowAlert(false);

                            Swal.fire({
                                position: 'top-start',
                                title: 'Thank you for tried it! ❤️',
                                showConfirmButton: false,
                                timer: 1500
                            });
                            getBoxToBuy(); 
                            setNextStep(step.SHOW_RESULT);
                        }}/>
                    </>);
            case step.SHOW_RESULT:
                return (
                    <>
                        <div className='mb-4 text-center'>
                            <Thumbnail kind={kind} x={50} y={50} handleClick={()=>{}}/>
                        </div>
                        {showResult()}
                        <Button text='Try again' handleClick={() => {
                            cleanData();
                            setNextStep(step.CHOOSE_FIGURE);
                        }}/>
                    </>);
            default:
                break;
        }
    }
    
    return (
        <div className="w-full max-w-sm p-2">
            <h1 className='text-center font-bold text-lg p-6'>Tile Calculator</h1>
            {renderStep()}
        </div>
    )
}
