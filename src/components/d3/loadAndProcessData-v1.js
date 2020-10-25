import { json, tsv } from 'd3';
import { feature } from "topojson";

const loadAndProcessData = () =>
    Promise.all([
        tsv('https://cdn.jsdelivr.net/npm/world-atlas@1/world/50m.tsv'),
        json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json')
    ]).then(([tsvData, topoJSONdata]) => {
        console.log(tsvData);
        console.log(topoJSONdata);
        const rowById = tsvData.reduce((accumulator, d) => {
            accumulator[d.iso_n3] = d;
            return accumulator;
        }, {});
        const countries = feature(topoJSONdata, topoJSONdata.objects.countries);

        console.log(countries);

        countries.features.forEach(d => {
            Object.assign(d.properties, rowById[d.id]);
        });
        return countries;
    });


export { loadAndProcessData }