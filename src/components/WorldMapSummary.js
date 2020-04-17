
import React, { useState, useEffect } from "react"
import { geoEqualEarth, geoPath } from "d3-geo"
import { feature } from "topojson-client"
import { summaryData } from "../data/DataSummary";
import { countriesTransformed } from "../data/CountriesTransformed";
import { countries } from "../data/Countries";


const transformedCtry = {};
countries.map(c => {
    transformedCtry[c.country_code] = c;
});

const cities = summaryData.Countries.map(country => {
    const mappedData = { name: country.Country, coordinates: transformedCtry[country.CountryCode] && transformedCtry[country.CountryCode].latlng ? transformedCtry[country.CountryCode].latlng : [0, 0], population: country.TotalConfirmed };
    return mappedData;
});

const projection = geoEqualEarth()
    .scale(160)
    .translate([800 / 2, 450 / 2])

const WorldMapSummary = () => {
    const [geographies, setGeographies] = useState([])

    useEffect(() => {
        fetch("/world-110m.json")
            .then(response => {
                if (response.status !== 200) {
                    console.log(`There was a problem: ${response.status}`)
                    return
                }
                response.json().then(worlddata => {
                    setGeographies(feature(worlddata, worlddata.objects.countries).features)
                })
            })
    }, [])

    const handleCountryClick = countryIndex => {
        console.log("Clicked on country: ", geographies[countryIndex])
    }

    const handleMarkerClick = i => {
        console.log("Marker: ", cities[i])
    }

    return (
        <svg width={800} height={450} viewBox="0 0 800 450">
            <g className="countries">
                {
                    geographies.map((d, i) => (
                        <path
                            key={`path-${i}`}
                            d={geoPath().projection(projection)(d)}
                            className="country"
                            fill={`rgba(38,50,56,${1 / geographies.length * i})`}
                            stroke="#FFFFFF"
                            strokeWidth={0.5}
                            onClick={() => handleCountryClick(i)}
                        />
                    ))
                }
            </g>
            <g className="markers">
                {
                    cities.map((city, i) => (
                        <circle
                            key={`marker-${i}`}
                            cx={projection(city.coordinates)[0]}
                            cy={projection(city.coordinates)[1]}
                            r={city.population / 20000}
                            fill="#E91E63"
                            stroke="#FFFFFF"
                            className="marker"
                            onClick={() => handleMarkerClick(i)}
                        />
                    ))
                }
            </g>
        </svg>
    )
}

export default WorldMapSummary
