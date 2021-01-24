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
        <div>
            <Figure kind={props.kind} x={props.x} y={props.y}/>
        </div>
    )
}
