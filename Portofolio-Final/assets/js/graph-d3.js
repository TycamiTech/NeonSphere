// Knowledge Graph - D3.js force-directed graph
// EDIT THIS SECTION TO CUSTOMIZE YOUR GRAPH

// === DATA CONFIGURATION ===
// Edit nodes array below to add/remove/rename nodes
const graphData = {
    nodes: [
        // Central node
        { id: 'center', label: 'Tycami Tech', size: 12, color: '#C4B08C' },
        
        // Add your nodes here - format: { id: 'unique-id', label: 'Display Name', size: 8, color: '#CCCCCC' }
        { id: 'node1', label: 'Linux', size: 8, color: '#CCCCCC' },
        { id: 'node2', label: 'Windows', size: 8, color: '#CCCCCC' },
        { id: 'node3', label: 'Android', size: 8, color: '#CCCCCC' },
        { id: 'node4', label: 'Hardware', size: 8, color: '#CCCCCC' },
        { id: 'node5', label: 'Software', size: 8, color: '#CCCCCC' },
        { id: 'node6', label: 'Operating Systems', size: 8, color: '#CCCCCC' },
        { id: 'node7', label: 'User Interface', size: 8, color: '#CCCCCC' },
        { id: 'node8', label: 'Internet', size: 8, color: '#CCCCCC' },
        { id: 'node9', label: 'Protocol', size: 8, color: '#CCCCCC' },
        { id: 'node10', label: 'Desktop', size: 8, color: '#CCCCCC' },
        { id: 'node11', label: 'Mobile', size: 8, color: '#CCCCCC' },
        { id: 'node12', label: 'Games', size: 8, color: '#CCCCCC' },
        { id: 'node13', label: 'Movie', size: 8, color: '#CCCCCC' },
        { id: 'node14', label: 'K-POP', size: 8, color: '#CCCCCC' },
        { id: 'node15', label: 'Anime', size: 8, color: '#CCCCCC' },
        { id: 'node16', label: 'Communication', size: 8, color: '#CCCCCC' },
        { id: 'node17', label: 'Information', size: 8, color: '#CCCCCC' },
        { id: 'node18', label: 'Network', size: 8, color: '#CCCCCC' }
    ],
    
    // Edit links array below - format: { source: 'node-id', target: 'node-id' }
    // Connect nodes by matching their IDs
    links: [
        // Center connections - connect center to all main nodes
        { source: 'center', target: 'node1' },
        { source: 'center', target: 'node2' },
        { source: 'center', target: 'node3' },
        { source: 'center', target: 'node4' },
        { source: 'center', target: 'node5' },
        { source: 'center', target: 'node6' },
        { source: 'center', target: 'node7' },
        { source: 'center', target: 'node8' },
        { source: 'center', target: 'node9' },
        { source: 'center', target: 'node10' },
        { source: 'center', target: 'node11' },
        { source: 'center', target: 'node12' },
        { source: 'center', target: 'node13' },
        { source: 'center', target: 'node14' },
        { source: 'center', target: 'node15' },
        { source: 'center', target: 'node16' },
        { source: 'center', target: 'node17' },
        { source: 'center', target: 'node18' },
        
        // Cross-connections - add connections between related nodes
        { source: 'node1', target: 'node2' },
        { source: 'node2', target: 'node3' },
        { source: 'node4', target: 'node5' },
        { source: 'node6', target: 'node7' },
        { source: 'node8', target: 'node9' },
        { source: 'node10', target: 'node11' },
        { source: 'node12', target: 'node13' },
        { source: 'node14', target: 'node15' },
        { source: 'node16', target: 'node17' }
    ]
};

// === END OF CONFIGURATION ===

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        if (typeof d3 === 'undefined') {
            console.error('D3.js not loaded');
            return;
        }

        const container = document.getElementById('graph-canvas');
        if (!container) return;

        const width = Math.max(800, container.offsetWidth);
        const height = 560;

        // Use the data from graphData object above
        const nodes = graphData.nodes;
        const links = graphData.links;

        // Clear any existing SVG
        d3.select('#graph-canvas').selectAll('svg').remove();

        // Create SVG
        const svg = d3.select('#graph-canvas')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .style('background', 'transparent');

        // Create groups for links and nodes
        const g = svg.append('g');

        const linkGroup = g.append('g')
            .attr('class', 'links');

        const nodeGroup = g.append('g')
            .attr('class', 'nodes');

        // Create simulation
        const simulation = d3.forceSimulation(nodes)
            .force('link', d3.forceLink(links)
                .id(d => d.id)
                .distance(100)
                .strength(0.5)
            )
            .force('charge', d3.forceManyBody().strength(-300))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .force('collide', d3.forceCollide(30));

        // Create links
        const link = linkGroup.selectAll('line')
            .data(links)
            .enter()
            .append('line')
            .style('stroke', '#555555')
            .style('stroke-width', 1.5)
            .style('stroke-opacity', 0.4);

        // Create nodes
        const node = nodeGroup.selectAll('g')
            .data(nodes)
            .enter()
            .append('g')
            .attr('class', 'node')
            .call(d3.drag()
                .on('start', dragstarted)
                .on('drag', dragged)
                .on('end', dragended)
            );

        // Add circles
        node.append('circle')
            .attr('r', d => d.size)
            .attr('fill', d => d.color)
            .attr('stroke', '#444444')
            .attr('stroke-width', 1)
            .style('cursor', 'pointer')
            .on('mouseover', function(event, d) {
                // Brighten hovered node
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('r', d.size * 1.5)
                    .attr('fill', d.id === 'center' ? '#E0D7B5' : '#FFFFFF');

                // Highlight connected links
                link.style('stroke-opacity', l => {
                    if (l.source.id === d.id || l.target.id === d.id) {
                        return 0.8;
                    }
                    return 0.15;
                })
                .style('stroke-width', l => {
                    if (l.source.id === d.id || l.target.id === d.id) {
                        return 2.5;
                    }
                    return 1.5;
                });

                // Dim non-connected nodes
                node.selectAll('circle')
                    .style('opacity', n => {
                        const isConnected = links.some(l => 
                            (l.source.id === d.id && l.target.id === n.id) ||
                            (l.target.id === d.id && l.source.id === n.id) ||
                            n.id === d.id
                        );
                        return isConnected ? 1 : 0.4;
                    });
            })
            .on('mouseout', function(event, d) {
                // Reset node
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('r', d.size)
                    .attr('fill', d.color);

                // Reset links
                link.style('stroke-opacity', 0.4)
                    .style('stroke-width', 1.5);

                // Reset nodes
                node.selectAll('circle')
                    .style('opacity', 1);
            });

        // Add labels
        node.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', d => d.id === 'center' ? -20 : 20)
            .attr('font-size', '11px')
            .attr('fill', '#E8DCC4')
            .attr('font-family', 'Montserrat, sans-serif')
            .text(d => d.label)
            .style('pointer-events', 'none')
            .style('user-select', 'none');

        // Tick function
        simulation.on('tick', () => {
            link
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);

            node.attr('transform', d => `translate(${d.x},${d.y})`);
        });

        // Drag functions
        function dragstarted(event, d) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }

        function dragended(event, d) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        // Handle resize
        window.addEventListener('resize', () => {
            const newWidth = container.offsetWidth;
            svg.attr('width', newWidth);
            simulation.force('center', d3.forceCenter(newWidth / 2, height / 2));
            simulation.alpha(0.3).restart();
        });

    }, 500); // Delay to ensure D3 is loaded
});

