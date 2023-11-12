let generator = d3.randomUniform();

function draw_circles() {
    let x = d3.range(10).map(generator)
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
    // Here we can alternatively use `.enter().append()` and `.transition()` for the same functionality. The use of `.join()` is for syntactic fluency and simplicity.
        .transition()
        .duration(500)
        .attr("cx", (d,i)=>x[i] * 500 + 10)
}

d3.interval(draw_circles, 1000)
