// Knowledge Graph - Static SVG with Mobile Optimization
// EDIT THIS SECTION TO CUSTOMIZE YOUR GRAPH

const graphData = {
    nodes: [
        { id: 'center', label: 'Chaotic Brain', size: 12, color: '#C4B08C' },
        { id: 'node1', label: 'Why Coffee?', size: 8, color: '#CCCCCC' },
        { id: 'node2', label: 'Procrastination Pro', size: 8, color: '#CCCCCC' },
        { id: 'node3', label: 'Vibing at 3AM', size: 8, color: '#CCCCCC' },
        { id: 'node4', label: 'Bug or Feature?', size: 8, color: '#CCCCCC' },
        { id: 'node5', label: 'Stack Overflow Mom', size: 8, color: '#CCCCCC' },
        { id: 'node6', label: 'Ctrl+Z Mistakes', size: 8, color: '#CCCCCC' },
        { id: 'node7', label: 'Rubber Duck Debug', size: 8, color: '#CCCCCC' },
        { id: 'node8', label: 'Git Regrets', size: 8, color: '#CCCCCC' },
        { id: 'node9', label: 'Cache Clear Hopes', size: 8, color: '#CCCCCC' },
        { id: 'node10', label: 'Semicolon Trauma', size: 8, color: '#CCCCCC' },
        { id: 'node11', label: 'Comment Lies', size: 8, color: '#CCCCCC' },
        { id: 'node12', label: 'Undefined Dreams', size: 8, color: '#CCCCCC' },
        { id: 'node13', label: 'Loop & Loop Again', size: 8, color: '#CCCCCC' },
        { id: 'node14', label: 'Deploy Fear', size: 8, color: '#CCCCCC' },
        { id: 'node15', label: 'Browser Console Yells', size: 8, color: '#CCCCCC' },
        { id: 'node16', label: 'Timezone Confusion', size: 8, color: '#CCCCCC' },
        { id: 'node17', label: 'Async Chaos', size: 8, color: '#CCCCCC' },
        { id: 'node18', label: 'Test? Never Heard', size: 8, color: '#CCCCCC' },
        { id: 'node19', label: 'CSS: Witchcraft', size: 8, color: '#CCCCCC' },
        { id: 'node20', label: 'Mobile? Desktop!', size: 8, color: '#CCCCCC' },
        { id: 'node21', label: 'Production Down', size: 8, color: '#CCCCCC' },
        { id: 'node22', label: '404 Sanity', size: 8, color: '#CCCCCC' },
        { id: 'node23', label: 'Refactor Later', size: 8, color: '#CCCCCC' },
        { id: 'node24', label: 'Tech Debt Mountain', size: 8, color: '#CCCCCC' }
    ],
    links: [
        // Random center connections
        { source: 'center', target: 'node1' },
        { source: 'center', target: 'node3' },
        { source: 'center', target: 'node5' },
        { source: 'center', target: 'node7' },
        { source: 'center', target: 'node9' },
        { source: 'center', target: 'node11' },
        { source: 'center', target: 'node13' },
        { source: 'center', target: 'node15' },
        { source: 'center', target: 'node17' },
        { source: 'center', target: 'node19' },
        { source: 'center', target: 'node21' },
        { source: 'center', target: 'node23' },
        { source: 'center', target: 'node2' },
        { source: 'center', target: 'node4' },
        { source: 'center', target: 'node6' },
        { source: 'center', target: 'node8' },
        { source: 'center', target: 'node10' },
        { source: 'center', target: 'node12' },
        { source: 'center', target: 'node14' },
        { source: 'center', target: 'node16' },
        { source: 'center', target: 'node18' },
        { source: 'center', target: 'node20' },
        { source: 'center', target: 'node22' },
        { source: 'center', target: 'node24' },
        // Chaotic cross connections
        { source: 'node1', target: 'node8' },
        { source: 'node2', target: 'node15' },
        { source: 'node3', target: 'node11' },
        { source: 'node4', target: 'node19' },
        { source: 'node5', target: 'node24' },
        { source: 'node6', target: 'node13' },
        { source: 'node7', target: 'node22' },
        { source: 'node8', target: 'node17' },
        { source: 'node9', target: 'node2' },
        { source: 'node10', target: 'node18' },
        { source: 'node11', target: 'node6' },
        { source: 'node12', target: 'node23' },
        { source: 'node13', target: 'node3' },
        { source: 'node14', target: 'node9' },
        { source: 'node15', target: 'node21' },
        { source: 'node16', target: 'node5' },
        { source: 'node17', target: 'node12' },
        { source: 'node18', target: 'node1' },
        { source: 'node19', target: 'node7' },
        { source: 'node20', target: 'node14' },
        { source: 'node21', target: 'node4' },
        { source: 'node22', target: 'node10' },
        { source: 'node23', target: 'node20' },
        { source: 'node24', target: 'node16' },
        // Extra chaos
        { source: 'node1', target: 'node19' },
        { source: 'node2', target: 'node20' },
        { source: 'node3', target: 'node21' },
        { source: 'node4', target: 'node22' },
        { source: 'node5', target: 'node23' },
        { source: 'node6', target: 'node24' },
        { source: 'node7', target: 'node14' },
        { source: 'node8', target: 'node13' },
        { source: 'node9', target: 'node16' },
        { source: 'node10', target: 'node11' },
        { source: 'node17', target: 'node4' },
        { source: 'node18', target: 'node6' }
    ]
};

function renderGraph() {
    const container = document.getElementById('graph-canvas');
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    let width, height;
    
    if (isMobile) {
        // Mobile optimization: 2400x1080 aspect ratio
        // Target: width proportional, height more compact
        width = Math.min(container.offsetWidth || 320, 400);
        height = Math.round(width * 1.08); // 1.08 ratio for tighter layout
    } else {
        // Desktop: keep existing layout
        width = container.offsetWidth || 400;
        height = 1200;
    }

    const nodes = graphData.nodes;
    const links = graphData.links;

    // Position nodes
    const centerNode = nodes.find(n => n.id === 'center');
    const otherNodes = nodes.filter(n => n.id !== 'center');
    
    const centerX = width / 2;
    const centerY = height / 2;
    
    let colsPerRow, hSpacing, vSpacing;
    
    if (isMobile) {
        // Mobile: 3 columns, tighter vertical spacing
        colsPerRow = 3;
        hSpacing = 60;
        vSpacing = 95; // Reduced from 140
    } else {
        // Desktop: 5 columns
        colsPerRow = 5;
        hSpacing = 100;
        vSpacing = 150;
    }
    
    if (centerNode) {
        centerNode.x = centerX;
        centerNode.y = centerY;
    }
    
    const totalRows = Math.ceil(otherNodes.length / colsPerRow);
    const startRow = -(Math.floor(totalRows / 2));
    
    otherNodes.forEach((node, i) => {
        const row = Math.floor(i / colsPerRow);
        const col = i % colsPerRow;
        const offsetX = (col - (colsPerRow - 1) / 2) * hSpacing;
        const offsetY = (startRow + row) * vSpacing;
        node.x = centerX + offsetX;
        node.y = centerY + offsetY;
    });

    // Clear container
    container.innerHTML = '';

    // Create SVG
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.style.display = 'block';
    svg.style.margin = '0 auto';
    svg.style.maxWidth = '100%';
    
    container.appendChild(svg);

    // Draw links
    links.forEach(link => {
        const sourceNode = nodes.find(n => n.id === link.source);
        const targetNode = nodes.find(n => n.id === link.target);
        if (!sourceNode || !targetNode) return;
        
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', sourceNode.x);
        line.setAttribute('y1', sourceNode.y);
        line.setAttribute('x2', targetNode.x);
        line.setAttribute('y2', targetNode.y);
        line.setAttribute('stroke', '#555555');
        line.setAttribute('stroke-width', '1.5');
        line.setAttribute('stroke-opacity', '0.4');
        svg.appendChild(line);
    });

    // Draw nodes
    nodes.forEach(node => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', node.x);
        circle.setAttribute('cy', node.y);
        circle.setAttribute('r', node.size);
        circle.setAttribute('fill', node.color);
        circle.setAttribute('stroke', '#444444');
        circle.setAttribute('stroke-width', '1');
        svg.appendChild(circle);
        
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', node.x);
        text.setAttribute('y', node.y + (node.id === 'center' ? -18 : 18));
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('font-family', 'Montserrat, sans-serif');
        text.setAttribute('font-size', isMobile ? '7px' : '10px');
        text.setAttribute('fill', '#E8DCC4');
        text.setAttribute('pointer-events', 'none');
        text.setAttribute('user-select', 'none');
        text.textContent = node.label;
        svg.appendChild(text);
    });
}

setTimeout(renderGraph, 100);
window.addEventListener('resize', renderGraph);
