import React from 'react';

export default () => {
    return (
        <div>
            <svg width="960" height="500">
                <g transform="scale(1.5)">
                    <circle cx="50" cy="50" r="40"></circle>
                    <rect x="100" y="25" width="50" height="50"></rect>
                    <circle cx="50" cy="150" r="40" fill="red"></circle>
                    <rect x="100" y="125" width="50" height="50" fill="green"></rect>
                    <g transform="translate(0,200)" fill="#adf6ff" stroke="black">
                        <circle cx="50" cy="50" r="40" stroke-width="5"></circle>
                        <rect x="100" y="25" width="50" height="50"></rect>
                    </g>
                    <g className="lines" transform="translate(50,0)">
                        <line x1="200" y1="20" x2="300" y2="280"></line>
                        <path fill="none" d="M300 280 L350 200 L400 250 L450 230"></path>
                    </g>
                </g>
            </svg>
        </div>
    )
}

