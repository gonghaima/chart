import { csv, json, range, timeParse } from 'd3';

const parseYear = timeParse('%Y');

const allCaps = str => str === str.toUpperCase();
const isRegion = name => allCaps(name) && name !== 'WORLD';

const melt = (unData, minYear, maxYear) => {

    const years = range(minYear, maxYear + 1);

    const data = [];

    unData.forEach(d => {
        const name = d['Region, subregion, country or area *']
            .replace('AND THE', '&');
        years.forEach(year => {
            const population = +d[year].replace(/ /g, '') * 1000;
            const row = {
                year: parseYear(year),
                name,
                population
            };
            data.push(row);
        });
    });

    return data.filter(d => isRegion(d.name));
};

const loadAndProcessData = () =>
    Promise
        .all([
            // csv('https://vizhub.com/curran/datasets/un-population-estimates-2017-medium-variant.csv'),
            // csv('https://vizhub.com/curran/datasets/un-population-estimates-2017.csv'),
            csv('https://raw.githubusercontent.com/gonghaima/data/master/un-population-estimates-2017-medium-variant.csv'),
            csv('https://raw.githubusercontent.com/gonghaima/data/master/un-population-estimates-2017.csv'),
        ])
        .then(([unDataMediumVariant, unDataEstimates]) => {
            return melt(unDataEstimates, 1950, 2014)
                .concat(melt(unDataMediumVariant, 2015, 2100));
        });

export { loadAndProcessData }