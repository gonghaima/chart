import { scaleOrdinal } from 'd3';

const height = '400';

const colorScale = scaleOrdinal().domain(['apple', 'lemon']).range(['#c11d1d', '#eae600']);

const radiusScale = scaleOrdinal().domain(['apple', 'lemon']).range([30, 20]);

const xPosition = (d, i) => i * 90 + 40;

export const fruitBowl = (selection, props) => {
    const { fruits, height } = props;

    const bowl = selection.selectAll('rect')
        .data([null])
        .enter()
        .append('rect')
        .attr('y', 110)
        .attr('width', 450)
        .attr('height', 200)
        .attr('rx', 100)

    const groups = selection
        .selectAll('g')
        .data(fruits, d => d.id);
    const groupsEnter = groups.enter().append('g');
    groupsEnter.merge(groups)
        .transition().duration(1000)
        .attr('transform', (d, i) => `translate(${i * 90 + 40}, ${height / 2})`);

    groups.exit().remove();
    // groups.exit().transition().duration(1000).remove();


    groupsEnter.append('circle')
        .merge(groups.select('circle'))
        .attr('r', d => radiusScale(d.type))
        .attr('fill', d => colorScale(d.type))
        .transition().duration(1000);

    groupsEnter.append('text')
        .merge(groups.select('text'))
        .attr('class', 'nested-element')
        .text(d => d.type)
        .attr('y', 50);

    // const text = selection.selectAll('text').data(fruits);
    // text.enter().append('text')
    //     .attr('class', 'nested-element')
    //     .attr('x', xPosition)
    //     .attr('y', height / 2 + 50)
    //     .merge(text)
    //     .text(d => d.type);
    // text.exit().remove();
}