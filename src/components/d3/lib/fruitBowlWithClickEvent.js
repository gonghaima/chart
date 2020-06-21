import { scaleOrdinal } from 'd3';

const height = '400';

const colorScale = scaleOrdinal().domain(['apple', 'lemon']).range(['#c11d1d', '#eae600']);

const radiusScale = scaleOrdinal().domain(['apple', 'lemon']).range([30, 20]);

export const fruitBowlWithClickEvent = (selection, props) => {
    const { fruits, height } = props;
    const circles = selection
        .selectAll('circle')
        .data(fruits);
    circles.enter()
        .append('circle')
            .attr('cx', (d, i) => i * 90 + 40)
            .attr('cy', height / 2)
        .merge(circles)
            .attr('fill', d => colorScale(d.type))
            .on('click',()=>{
                console.log('clicked');
            })
        .transition().duration(1000)
        .attr('r', d => radiusScale(d.type))

    circles.exit()
        .transition().duration(1000).attr('r', 0)
        .remove();
}