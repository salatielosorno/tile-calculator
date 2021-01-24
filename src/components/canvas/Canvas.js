import React, { useRef, useEffect } from 'react'

export const Canvas = (props) => {
    const { draw } = props
    let ref = useRef();
    
    useEffect(() => {
        let canvas = ref.current;
        let ctx = canvas.getContext('2d');

        const render = () => {
            draw(ctx);
        }
        render();

    },[draw])
    return (
        <canvas
            ref={ref}
            width={props.width}
            height={props.height}
            style={{'display':'block'}}
        />
    );
}