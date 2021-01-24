import React from 'react'
import { Thumbnail } from '../../components/thumbnail/Thumbnail';

export const Calculator = () => {
    return (
        <div style={{padding: "10px"}}>
            <Thumbnail kind='square' x={60} y={50} />
            <Thumbnail kind='triangle' x={60} y={50} />
        </div>
    )
}
