export default (selection, props) => {
    const {
        xColumn,
        yColumn,
        width,
        height,
        scaleLinear,
        extent,
        data,
        axisBottom,
        axisLeft
    } = props;

    const xValue = xs => d => xs(d[xColumn]);
    const yValue = ys => d => ys(yColumn ? d[yColumn] : d.weight);
    const circleRadius = 10;
    const xAxisLabel = xColumn ? xColumn : '?';
    const yAxisLabel = yColumn ? yColumn : "Weight";
    const title = `Cars: ${xAxisLabel} vs. ${yAxisLabel}`;
    const margin = { top: 60, right: 40, bottom: 90, left: 200 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = scaleLinear()
        .domain(extent(data, d => d[xColumn]))
        .range([0, innerWidth]).nice();

    const yScale = scaleLinear()
        .domain(extent(data, d => yColumn ? d[yColumn] : d.weight))
        .range([innerHeight, 0]).nice();

    const g = selection.selectAll('.container').data([null]);
    const gEnter = g
        .enter().append('g')
        .attr('class', 'container');
    gEnter
        .merge(g)
        .attr('transform',
            `translate(${margin.left},${margin.top})`
        );

    const xAxis = axisBottom(xScale)
        .tickSize(-innerHeight)
        .tickPadding(15);

    const yAxis = axisLeft(yScale).tickSize(-innerWidth).tickPadding(10);

    const yAxisG = g.select('.y-axis');
    const yAxisGEnter = gEnter
        .append('g')
        .attr('class', 'y-axis');

    yAxisG
        .merge(yAxisGEnter)
        .call(yAxis)
        .selectAll('.domain').remove();

    const yAxisLabelText = yAxisGEnter
        .append('text')
        .attr('class', 'axis-label')
        .attr('y', -93)
        .attr('fill', 'black')
        .attr('transform', `rotate(-90)`)
        .attr('text-anchor', 'middle')
        .merge(yAxisG.select('.axis-label'))
        .attr('x', -innerHeight / 2)
        .text(yAxisLabel);

    const xAxisG = g.select('.x-axis');
    const xAxisGEnter = gEnter
        .append('g')
        .attr('class', 'x-axis');

    xAxisG
        .merge(xAxisGEnter)
        .attr('transform', `translate(0,${innerHeight})`)
        .call(xAxis)
        .selectAll('.domain').remove();

    const xAxisLabelText = xAxisGEnter
        .append('text')
        .attr('class', 'axis-label')
        .attr('y', 75)
        .attr('fill', 'black')
        .merge(xAxisG.select('.axis-label'))
        .attr('x', innerWidth / 2)
        .text(xAxisLabel);
    const circles = g.merge(gEnter)
        .selectAll('circle').data(data);

    circles
        .enter().append('circle')
        .attr('fill', 'red')
        .attr('opacity', 0.5)
        .attr('cx', innerWidth / 2)
        .attr('cy', innerHeight / 2)
        .attr('r', 0)
        .merge(circles)
        .transition().duration(2000)
        .delay((d, i) => i * 10)
        .attr('cy', yValue(yScale))
        .attr('cx', xValue(xScale))
        .attr('r', circleRadius);
}