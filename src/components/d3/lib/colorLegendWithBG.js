export const colorLegendWithBG = (selection, props) => {
    const { colorScale, cirlcleRadius, spacing, textOffset, backgroundRectWidth, textClass = 'nested-element' } = props;

    const backgroundRect = selection.selectAll('rect').data([null]);
    const n = colorScale.domain().length;
    backgroundRect.enter().append('rect')
        .merge(backgroundRect)
        .attr('class', 'choro')
        .attr('x', -cirlcleRadius * 2)
        .attr('y', -cirlcleRadius * 2 - 10)
        .attr('rx', cirlcleRadius * 2)
        .attr('width', backgroundRectWidth)
        .attr('height', spacing * n + cirlcleRadius * 2)
        .attr('fill', 'white')
        .attr('opacity', 0.8);

    const groups = selection
        .selectAll('.tick')
        // work around, the undefined value should be cleaned up from data source loading
        .data(colorScale.domain().filter(c => c));
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