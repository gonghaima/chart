import React, { useState, useEffect, useRef } from 'react';

import WorldMap from './components/WorldMap'
import WorldMapSummary from './components/WorldMapSummary'


export const D3World = () => {


    return (
        <div>
            <WorldMap />
            <WorldMapSummary />
        </div>
    );
}
