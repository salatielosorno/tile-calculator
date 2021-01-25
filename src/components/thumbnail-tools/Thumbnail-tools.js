import React from 'react'
import { Thumbnail } from '../thumbnail/Thumbnail';

export const ThumbnailTools = props => {
    return (
        <div>
            {
                props.tools ?
                    props.tools.map((tool, index) => 
                        <Thumbnail 
                            key={index} 
                            kind={tool.kind} 
                            x={tool.x} 
                            y={tool.y} 
                            handleClick={tool.handleClick} 
                        />
                    ) : 'tools not defined'
            }
        </div>
    )
}
