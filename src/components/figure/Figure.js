import React, { useEffect, useState } from 'react'
import { Canvas } from '../canvas/Canvas'

export const Figure = (props) => {
    const { kind } = props;
    const width = props.x;
    const height = props.y;
    const initialState = () => {};

    const [draw, setDraw] = useState((ctx) => initialState(ctx));

    useEffect(()=>{
        switch (kind) {
            case 'square':
                setDraw((ctx) => (ctx) => {
                    ctx.clearRect(0, 0, width, height);
                    ctx.fillStyle = 'white';
                    ctx.fillRect(0, 0, props.x, props.y);
                    ctx.fillStyle = 'black';
                    ctx.strokeRect(0, 0, props.x, props.y);
                });
                break;
            case 'triangle':
                setDraw((ctx) => (ctx) => {
                    ctx.clearRect(0, 0, width, height);
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(props.x, props.y);
                    ctx.lineTo(0, props.y);
                    ctx.fillStyle = 'white';
                    ctx.fill();
                    ctx.fillStyle = 'black';
                    ctx.lineTo(0, 0);
                    ctx.stroke();
                    ctx.closePath();
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
