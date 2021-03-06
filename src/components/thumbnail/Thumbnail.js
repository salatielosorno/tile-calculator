import React from 'react';
import { Figure } from '../figure/Figure';

export const Thumbnail = (props) => {
    return (
        <div 
            className={`p-4 inline-block shadow m-2 cursor-pointer hover:bg-purple-700 hover:text-white ${props.index === props.isActive ? 'bg-purple-700 text-white': ''}`}
            onClick={()=>{
                props.handleClick(props)
            }}
        >
            <p>{props.kind}</p>
            <Figure 
                kind={props.kind} 
                x={props.x} 
                y={props.y}
            />
        </div>
    )
}
