import React from 'react'
import { ThumbnailTools } from '../../components/thumbnail-tools/Thumbnail-tools'

export const Calculator = () => {
    return (
        <div>
            <div>
                <p className='mb-2 text-center'>Available areas</p>
                <ThumbnailTools 
                    tools={[
                        {
                            kind: 'square',
                            x: 50,
                            y: 50
                        },
                        {
                            kind: 'triangle',
                            x: 50,
                            y: 50
                        }
                    ]}
                />
            </div>
            <div>
                <p>Request data here</p>
            </div>
        </div>
    )
}
