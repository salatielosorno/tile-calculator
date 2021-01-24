import React, { useEffect } from 'react';
import { Figure } from '../figure/Figure';

export const Thumbnail = (props) => {
    const handleClick = props.handleClick;

    useEffect(() => {
        if(handleClick){
            handleClick();
        }
    }, [handleClick]);

    return (
        <div 
            className='p-4 inline-block shadow mr-2 mb-2 cursor-pointer hover:bg-purple-700 hover:text-white'
        >
            <p>{props.kind}</p>
            <Figure kind={props.kind} x={props.x} y={props.y}/>
        </div>
    )
}
