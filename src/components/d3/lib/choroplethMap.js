import { event, geoPath, geoNaturalEarth1, zoom } from 'd3';

export const choroplethMap = (selection, props) => {
    const { features, colorScale, colorValue, selectedColorValue } = props;
    const projection = geoNaturalEarth1();
    const pathGenerator = geoPath().projection(projection);


    const gUpdate = selection.selectAll('g').data([null]);
    const gEnter = gUpdate.enter().append('g');
    const g = gUpdate.merge(gEnter);
    gEnter.append('path')
        .attr('class', 'sphere')
        .attr('d', pathGenerator({ type: "Sphere" }))
        .merge(gUpdate.select('.sphere'))
        .attr('opacity', selectedColorValue ? 0.05 : 1)

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
        .merge(countryPathEnter)
        .attr('opacity', d =>
            !selectedColorValue || selectedColorValue === colorValue(d) ? 1 : 0.2
        )
        .classed('highlighted', d => selectedColorValue && selectedColorValue === colorValue(d));

    countryPathEnter
        .append('title')
        .text(d => d.properties.name + ": " + colorValue(d));
} 