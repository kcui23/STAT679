function make_tree(edges) {
  const stratifier = d3.stratify()
    .id(d => d.to)
    .parentId(d => d.from);
  
  const root = stratifier(edges);
  const tree_gen = d3.tree()
    .size([1500, 800]);
  return tree_gen(root);
}

function visualize(data) {
  const [nodes, edges] = data;
  edges.unshift({from: null, to:1, name: 'NA', date:'NA', country:'NA'});
  const link_gen = d3.linkVertical()
    .x(d => d.x)
    .y(d => d.y);
  const countries = new Set([
    'China', 'UnitedStates', 'Netherlands', 'Australia', 'UnitedKingdom', 
    'Singapore', 'Switzerland', 'Korea', 'Japan', 'NA'
  ]);
  
  nodes.forEach(node => {
    node.country = countries.has(node.country) ? node.country : 'Other';
  });

  const nodes_lookup = nodes.map((node, index) => ({ ...node, ...edges[index] }));
  const tree = make_tree(nodes_lookup);
  
  const unique_countries = Array.from(new Set(nodes.map(d => d.country)));
  const myColors = ['#2B2A4C', '#C70039', '#900C3F', '#581845', '#FFC300', '#DAF7A6', '#33FFCE', '#33D4FF', '#B533FF', '#A0A0A0'];
  const colorScale = d3.scaleOrdinal()
    .domain(unique_countries)
    .range(myColors);

  d3.select("#tree")
    .selectAll("path")
    .data(tree.links()).enter()
    .append("path")
    .attr("d", link_gen)
    .attr("transform", "translate(0, 10)");

  d3.select("#tree")
    .selectAll("circle")
    .data(tree.descendants()).enter()
    .append("circle")
    .attrs({
      cx: d => d.x,
      cy: d => d.y,
      r: d => radius(d.depth),
      fill: d => colorScale(d.data.country),
      transform: "translate(0, 10)"
    });
}

function radius(depth) {
  return 10 - (0.3 * depth);
}

Promise.all([
  d3.csv("https://raw.githubusercontent.com/krisrs1128/stat992_f23/main/exercises/ps4/covid-nodes.csv", d3.autoType),
  d3.csv("https://raw.githubusercontent.com/krisrs1128/stat992_f23/main/exercises/ps4/covid-edges.csv", d3.autoType)
]).then(visualize);
