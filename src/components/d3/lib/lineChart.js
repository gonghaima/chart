import { csv, curveBasis, descending, extent, format, line, mouse, scaleLinear, scaleTime, scaleOrdinal, axisLeft, axisBottom, nest, schemeCategory10, timeParse } from 'd3';
import { colorLegend } from './colorLegendMeltingData';

export const lineChart = (width, height, data, svg, selectedYear, setYr, selection, colorScale) => {

    const title = 'Population over Time by Region';


    const xValue = d => d.year;
    const xAxisLabel = 'Time';

    const yValue = d => d.population;
    const circleRadius = 6;
    const yAxisLabel = 'Population';
    const parseYear = timeParse('%Y');

    const colorValue = d => d.name;

    const margin = { top: 60, right: 280, bottom: 88, left: 105 };
    const innerWidth = width - margin.left - margin.right + 50;
    const innerHeight = height - margin.top - margin.bottom + 50;


    const xScale = scaleTime()
        .domain(extent(data, xValue))
        .range([0, innerWidth]);

    const yScale = scaleLinear()
        .domain(extent(data, yValue))
        .range([innerHeight, 0])
        .nice();

    const g = selection.selectAll('.container').data([null]);
    const gEnter = g.enter()
        .append('g')
        .attr('class', 'container');
    gEnter.merge(g)
        .attr('transform', `translate(${margin.left + 40},${margin.top})`);

    // const colorScale = scaleOrdinal(schemeCategory10);
    // svg.selectAll('g').remove();
    // const g = svg.append('g')//
    //     .attr('transform', `translate(${margin.left + 40},${margin.top})`);

    const xAxis = axisBottom(xScale)
        .tickSize(-innerHeight)
        .tickPadding(15);

    const yAxisTickFormat = number =>
        format('.2s')(number)
            .replace('G', 'B')
            .replace('.0', '');

    const yAxis = axisLeft(yScale)
        .tickSize(-innerWidth)
        .tickFormat(yAxisTickFormat)
        .tickPadding(10);

    // const yAxisG = g.append('g').call(yAxis);

    // yAxisG.selectAll('.domain').remove();

    // yAxisG.append('text')
    // yAxisGEnter.append('text')
    //     .attr('class', 'axis-label')
    //     .attr('y', -60)
    //     .attr('x', -innerHeight / 2)
    //     .attr('fill', 'black')
    //     .attr('transform', `rotate(-90)`)
    //     .attr('text-anchor', 'middle')
    //     .text(yAxisLabel);
    const yAxisGEnter = gEnter
        .append('g')
        .attr('class', 'y-axis');
    const yAxisG = g.select('.y-axis');
    yAxisGEnter
        .merge(yAxisG)
        .call(yAxis)
        .selectAll('.domain').remove();

    // const xAxisG = g.append('g').call(xAxis)
    //     .attr('transform', `translate(0,${innerHeight})`);

    // xAxisG.select('.domain').remove();

    // xAxisG.append('text')
    //     .attr('class', 'axis-label')
    //     .attr('y', 80)
    //     .attr('x', innerWidth / 2)
    //     .attr('fill', 'black')
    //     .text(xAxisLabel);

    const xAxisGEnter = gEnter
        .append('g')
        .attr('class', 'x-axis');
    const xAxisG = g.select('.x-axis');
    xAxisGEnter
        .merge(xAxisG)
        .call(xAxis)
        .attr('transform', `translate(0, ${innerHeight})`)
        .select('.domain').remove();
    xAxisGEnter
        .append('text')
        .attr('class', 'axis-label')
        .attr('y', 75)
        .attr('fill', 'black')
        .merge(xAxisG.select('.axis-label'))
        .attr('x', innerWidth / 2)
        .text(xAxisLabel);


    const lineGenerator = line()
        .x(d => xScale(xValue(d)))
        .y(d => yScale(yValue(d)))
        .curve(curveBasis);

    const lastYValue = d =>
        yValue(d.values[d.values.length - 1]);

    const nested = nest()
        .key(colorValue)
        .entries(data)
        .sort((a, b) =>
            descending(lastYValue(a), lastYValue(b))
        );


    colorScale.domain(nested.map(d => d.key));

    // g.selectAll('.line-path-multi').data(nested)
    //     .enter().append('path')
    //     .attr('class', 'line-path-multi-melting-data')
    //     .attr('d', d => lineGenerator(d.values))
    //     .attr('stroke', d => colorScale(d.key));

    const linePaths = g.merge(gEnter)
        .selectAll('.line-path-multi').data(nested);
    linePaths
        .enter().append('path')
        .attr('class', 'line-path-multi')
        .merge(linePaths)
        .attr('d', d => lineGenerator(d.values))
        .attr('stroke', d => colorScale(d.key));

    // selectedYear
    const selectedYearDate = parseYear(selectedYear);
    // g.append('line')
    //     .attr('class', 'selected-year-line')
    //     .attr('x1', xScale(selectedYearDate))
    //     .attr('x2', xScale(selectedYearDate))
    //     .attr('y1', 0)
    //     .attr('y2', innerHeight);
    gEnter
        .append('line')
        .attr('class', 'selected-year-line')
        .attr('y1', 0)
        .merge(g.select('.selected-year-line'))
        .attr('x1', xScale(selectedYearDate))
        .attr('x2', xScale(selectedYearDate))
        .attr('y2', innerHeight);

    // g.append('text')
    //     .attr('class', 'title')
    //     .attr('x', 240)
    //     .attr('y', -10)
    //     .text(title);
    gEnter
        .append('text')
        .attr('class', 'title')
        .attr('y', -10)
        .merge(g.select('.title'))
        .text(title);

    // g.append('rect')
    //     .attr('class', 'mouse-event-rect')
    //     .attr('width', innerWidth)
    //     .attr('height', innerHeight)
    //     .attr('pointer-events', 'all')
    //     .on('mousemove', () => {
    //         const x = mouse(g.node())[0];
    //         const hoveredDate = xScale.invert(x);
    //         const hoverYr = hoveredDate.getFullYear();
    //         console.log(hoverYr);
    //         setYr(hoverYr);
    //     })
    gEnter
        .append('rect')
        .attr('class', 'mouse-interceptor')
        .attr('fill', 'none')
        .attr('pointer-events', 'all')
        .merge(g.select('.mouse-interceptor'))
        .attr('width', innerWidth)
        .attr('height', innerHeight)
        .on('mousemove', function () {
            const x = mouse(this)[0];
            const hoveredDate = xScale.invert(x);
            setYr(hoveredDate.getFullYear());
        });

    // svg.append('g')
    //     .attr('transform', `translate(700,110)`)
    //     .call(colorLegend, {
    //         colorScale,
    //         circleRadius: 10,
    //         spacing: 55,
    //         textOffset: 15
    //     });
}