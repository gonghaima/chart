import React, { useRef, useEffect } from 'react'

import * as d3 from 'd3'

const Basic = () => {
    const visEl = useRef(null);

    useEffect(() => {
        const svg = d3
            .select(visEl.current)
            .append('svg');
        svg.style('background-color', 'red');
    });
    return (
        <div ref={visEl}></div>
    )
}

export default Basic


// export const D3World = () => {
//     const visEl = useRef(null);
//     return (
//         <div ref={visEl}></div>
//     );
// }
