export const colorLegend = (selection, props) => {
    const { colorScale, height } = props;

    const groups = selection
        .selectAll('g')
        .data(colorScale.domain());
    const groupsEnter = groups.enter().append('g');
    groupsEnter.merge(groups)
        .transition().duration(1000)
        .attr('transform', (d, i) => `translate(${i * 90 + 40}, ${height / 2})`);

    groups.exit().remove();

    groupsEnter.append('circle')
        .merge(groups.select('circle'))
        .attr('r', 20)
        .attr('fill', d => colorScale(d.type))
        .transition().duration(1000);

    groupsEnter.append('text')
        .merge(groups.select('text'))
        .attr('class', 'nested-element')
        .text(d => d.type)
        .attr('y', 50);
}