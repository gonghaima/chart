import { scaleOrdinal } from 'd3';

const height = '400';

const colorScale = scaleOrdinal().domain(['apple', 'lemon']).range(['#c11d1d', '#eae600']);

const radiusScale = scaleOrdinal().domain(['apple', 'lemon']).range([30, 20]);

const xPosition = (d, i) => i * 90 + 40;

export const fruitBowl = (selection, props) => {
    const { fruits, height } = props;
    const circles = selection
        .selectAll('circle')
        .data(fruits, d => d.id);
    circles.enter()
        .append('circle')
        // .attr('class', 'd3-pattern')
        .attr('cx', xPosition)
        .attr('cy', height / 2)
        // .attr('r', 0)
        .merge(circles)
        .attr('fill', d => colorScale(d.type))
        .transition().duration(1000)
        .attr('cx', xPosition)
        .attr('r', d => radiusScale(d.type))


    const text = selection.selectAll('text').data(fruits);
    text.enter().append('text')
        .attr('class', 'nested-element')
        .attr('x', xPosition)
        .attr('y', height / 2 + 50)
        .merge(text)
        .text(d => d.type);
    text.exit().remove();


    circles.exit()
        .transition().duration(1000).attr('r', 0)
        .remove();
}