let generator = d3.randomUniform();

let x = d3.range(10).map(generator);
d3.select("svg")
    .selectAll("circle")
    .data(x).enter()
    .append("circle")
    .attrs({
	cx: (_,i) => 10 + 500 * x[i],
	cy: 100,
	r: 10
    })
