export const colorLegendWithInteractive = (selection, props) => {
    const { onClick, colorScale, cirlcleRadius, spacing, textOffset, backgroundRectWidth, textClass = 'nested-element', selectedColorValue } = props;

    const backgroundRect = selection.selectAll('rect').data([null]);
    
    backgroundRect.enter().append('rect')
        .merge(backgroundRect)
        .attr('class', 'choro')
        .attr('x', -cirlcleRadius * 2)
        .attr('y', -cirlcleRadius * 2 - 10)
        .attr('rx', cirlcleRadius * 2)
        .attr('width', backgroundRectWidth)
        .attr('fill', 'white')
        .attr('opacity', 0.8);
    
    const groups = selection
        .selectAll('g')
        // work around, the undefined value should be cleaned up from data source loading
        .data(colorScale.domain().filter(c => c));
    const groupsEnter = groups.enter().append('g');
    
    groupsEnter.merge(groups)
        .attr('class', 'legend-row')
        .attr('transform', (d, i) => `translate(0, ${i * spacing})`)
        .attr('opacity', d =>
            (!selectedColorValue || d === selectedColorValue)
                ? 1 : 0.2
        )
        .on('click', d => onClick(
            d === selectedColorValue ? null : d
        ));
    
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