{/* <select name="cars" id="cars">
    <option value="volvo">Volvo</option>
    <option value="saab">Saab</option>
    <option value="mercedes">Mercedes</option>
    <option value="audi">Audi</option>
</select> */}


export const dropdownMenu = (selection, props) => {
    const { options } = props;

    let select = selection.selectAll('select').data([null]);
    select = select.enter().append('select')
        .merge(select)
        .attr('class', 'select-menu');

    const option = select.selectAll('option').data(options);

    option.enter().append('option')
        .merge(option)
        .attr('value', d => d)
        .text(d => d)
}