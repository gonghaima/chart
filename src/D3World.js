import React, { useState, useEffect, useRef } from 'react';

import WorldMap from './components/WorldMap'
import WorldMapSummary from './components/WorldMapSummary'
import WorldMapV1 from './components/WorldMapV1'


export const D3World = () => {

    return (
        <div>
            <WorldMap />
            <WorldMapSummary />
            <WorldMapV1 />
        </div>
    );
}
