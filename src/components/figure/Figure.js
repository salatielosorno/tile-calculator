import React, { useEffect, useState } from 'react'
import { Canvas } from '../canvas/Canvas'

export const Figure = (props) => {
    const { kind } = props;
    const width = props.y;
    const height = props.x;
    const initialState = () => {}

    const [draw, setDraw] = useState((ctx) => initialState(ctx));

    useEffect(()=>{
        switch (kind) {
            case 'square':
                setDraw((ctx) => (ctx) => {
                    ctx.clearRect(0, 0, width, height);
                    ctx.strokeRect(0, 0, props.y, props.x);
                });
                break;
            case 'triangle':
                setDraw((ctx) => (ctx) => {
                    ctx.clearRect(0, 0, width, height);
                    ctx.moveTo(0, 0);
                    ctx.lineTo(0, props.y);
                    ctx.lineTo(props.y, props.x);
                    ctx.lineTo(0, 0);
                    ctx.stroke();
                });
                break;
            default:
                break;
        }
    }, [kind, props.x, props.y, props.z, width, height])
    
    return (
        <div>
        {
            draw ?
            <Canvas draw={draw} width={width} height={height}/>
            : <div>Loading</div>
        }
        </div>
    )
}