import React, { useRef, useEffect } from 'react'

import * as d3 from 'd3'

const Basic = () => {
    const visEl = useRef(null);

    useEffect(() => {
        const svg = d3
            .select(visEl.current)
            .append('svg');
        svg.attr('width', '100%')
        svg.attr('height', '100vh')

        const circle = svg.append('circle');
        circle.attr('r', 100);
        circle.attr('cx', 300);
        circle.attr('cy', 200);
    });
    return (
        <g>
            <div ref={visEl}></div>
        </g>
    )
}

export default Basic


// export const D3World = () => {
//     const visEl = useRef(null);
//     return (
//         <div ref={visEl}></div>
//     );
// }
