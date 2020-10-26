import { event, geoPath, geoNaturalEarth1, zoom } from 'd3';

export const choroplethMap = (selection, props) => {
    const { features, colorScale, colorValue } = props;
    const projection = geoNaturalEarth1();
    const pathGenerator = geoPath().projection(projection);


    const gUpdate = selection.selectAll('g').data([null]);
    const gEnter = gUpdate.enter().append('g');
    const g = gUpdate.merge(gEnter);
    gEnter.append('path')
        .attr('class', 'sphere')
        .attr('d', pathGenerator({ type: "Sphere" }));

    selection.call(zoom().on("zoom", function () {
        g.attr("transform", event.transform)
    }));

    const countryPaths = g.selectAll('.country')
        .data(features, d => d.id);

    const countryPathEnter = countryPaths
        .enter().append('path')
        .attr('class', 'country')
        .attr('d', pathGenerator)
        .attr('fill', d => colorScale(colorValue(d)))

    countryPaths
        .merge(countryPathEnter);

    countryPathEnter
        .append('title')
        .text(d => d.properties.name + ": " + colorValue(d));
} 