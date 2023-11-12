let generator = d3.randomUniform();

function draw_circles() {
    let x = d3.range(10).map(generator)
    let y = d3.range(10).map(generator)
    let z = d3.range(10).map(generator)
    data = d3.range(10)

    d3.select("svg")
        .selectAll("circle")
        .data(data)
        .join(
            enter => enter.append("circle")
                .attrs({
                    cy: 100,
                    r: 10
                })
        )
        .transition()
        .duration(500)
        .attrs({
	    r: (d,i)=>z[i] * 30,
	    cx: (d,i)=>x[i] * 500 + 30,
	    fill: (d,i)=>d3.hsl(360 * y[i], 0.7, 0.5)
	})
}

d3.interval(draw_circles, 1000)
