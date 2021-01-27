import React, { useState } from 'react'
import { Thumbnail } from '../thumbnail/Thumbnail';

export const ThumbnailTools = props => {
    const [isActive, setIsActive] = useState()
    return <>
        {
            props.tools ?
                props.tools.map((tool, index) => 
                <div 
                    key={index} 
                    className='inline-block'
                    onClick={()=>{setIsActive(index)}}
                >
                    <Thumbnail 
                        kind={tool.kind} 
                        x={tool.x} 
                        y={tool.y} 
                        handleClick={tool.handleClick}
                        index={index}
                        isActive={isActive}
                    />
                </div>
                ) : 'tools not defined'
        }
    </>
}
