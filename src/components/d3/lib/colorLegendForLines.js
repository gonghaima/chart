export const colorLegend = (selection, props) => {
    const { colorScale, cirlcleRadius, spacing, textOffset, textClass = 'nested-element' } = props;

    const groups = selection
        .selectAll('g')
        .data(colorScale.domain());
    const groupsEnter = groups.enter().append('g');
    groupsEnter.merge(groups)
        .transition().duration(1000)
        .attr('transform', (d, i) => `translate(0, ${i * spacing})`);

    groups.exit().remove();

    groupsEnter.append('circle')
        .merge(groups.select('circle'))
        .attr('r', cirlcleRadius)
        .attr('fill', colorScale)
        .transition().duration(1000);

    groupsEnter.append('text')
        .merge(groups.select('text'))
        .attr('class', textClass)
        .text(d => d)
        .attr('dy', '0.32em')
        .attr('x', textOffset);
}