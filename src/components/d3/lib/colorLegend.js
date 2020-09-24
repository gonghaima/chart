export const colorLegend = (selection, props) => {
    const { colorScale, cirlcleRadius, spacing, textOffset } = props;

    const groups = selection
        .selectAll('g')
        .data(colorScale.domain());
    const groupsEnter = groups.enter().append('g');
    groupsEnter.merge(groups)
        .transition().duration(1000)
        .attr('transform', (d, i) => `translate(${i * spacing}, 0)`);

    groups.exit().remove();

    groupsEnter.append('circle')
        .merge(groups.select('circle'))
        .attr('r', cirlcleRadius)
        .attr('fill', colorScale)
        .transition().duration(1000);

    groupsEnter.append('text')
        .merge(groups.select('text'))
        .attr('class', 'nested-element')
        .text(d => d)
        .attr('y', textOffset);
}