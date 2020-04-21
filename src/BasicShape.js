import React from 'react';

export default () => {
    return (
        <div>
            <svg width="960" height="500">
                <circle cx="50" cy="50" r="40"></circle>
                <rect x="100" y="25" width="50" height="50"></rect>
                <circle cx="50" cy="150" r="40" fill="red"></circle>
                <rect x="100" y="125" width="50" height="50" fill="green"></rect>
                <g transform="translate(0,200)" fill="#adf6ff" stroke="black">
                    <circle cx="50" cy="50" r="40" stroke-width="5"></circle>
                    <rect x="100" y="25" width="50" height="50"></rect>
                </g>
                <line x1="200" y1="20" x2="300" y2="280" stroke="black" stroke-width="10"></line>
            </svg>
        </div>
    )
}

