class GeometricAnimation {
    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'geometric-bg';
        document.body.prepend(this.container);
        
        this.shapes = [];
        this.numberOfShapes = 15;
        
        this.init();
        this.animate();
        
        // Handle window resize
        window.addEventListener('resize', () => this.handleResize());
    }
    
    init() {
        // Clear existing shapes
        this.shapes.forEach(shape => shape.element.remove());
        this.shapes = [];
        
        // Create new shapes
        for (let i = 0; i < this.numberOfShapes; i++) {
            this.createShape();
        }
    }
    
    createShape() {
        const element = document.createElement('div');
        element.className = 'geometric-shape';
        
        // Random properties
        const size = Math.random() * 100 + 50;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const rotation = Math.random() * 360;
        const duration = Math.random() * 20 + 20;
        const delay = Math.random() * -20;
        
        // Shape type (square, triangle, circle)
        const shapeType = Math.floor(Math.random() * 3);
        
        switch(shapeType) {
            case 0: // Square
                element.style.width = `${size}px`;
                element.style.height = `${size}px`;
                break;
            case 1: // Triangle
                element.style.width = '0';
                element.style.height = '0';
                element.style.borderLeft = `${size/2}px solid transparent`;
                element.style.borderRight = `${size/2}px solid transparent`;
                element.style.borderBottom = `${size}px solid rgba(196, 176, 140, 0.1)`;
                element.style.border = 'none';
                break;
            case 2: // Circle
                element.style.width = `${size}px`;
                element.style.height = `${size}px`;
                element.style.borderRadius = '50%';
                break;
        }
        
        // Set initial position and animation
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
        element.style.transform = `rotate(${rotation}deg)`;
        
        // Add animation
        element.style.transition = 'all linear';
        element.style.animation = `
            float ${duration}s linear ${delay}s infinite,
            rotate ${duration * 2}s linear ${delay}s infinite
        `;
        
        // Add to container
        this.container.appendChild(element);
        
        // Store shape data
        this.shapes.push({
            element,
            x,
            y,
            rotation,
            size,
            speed: Math.random() * 1 - 0.5
        });
    }
    
    animate() {
        this.shapes.forEach(shape => {
            shape.y += shape.speed;
            shape.rotation += 0.1;
            
            // Reset position if out of view
            if (shape.y > window.innerHeight + shape.size) {
                shape.y = -shape.size;
            } else if (shape.y < -shape.size) {
                shape.y = window.innerHeight + shape.size;
            }
            
            // Update position
            shape.element.style.top = `${shape.y}px`;
            shape.element.style.transform = `rotate(${shape.rotation}deg)`;
        });
        
        requestAnimationFrame(() => this.animate());
    }
    
    handleResize() {
        this.init();
    }
}

// Add keyframes for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% { transform: translate(0, 0) rotate(0deg); }
        50% { transform: translate(30px, 30px) rotate(180deg); }
        100% { transform: translate(0, 0) rotate(360deg); }
    }
    
    @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GeometricAnimation();
    
    // Add gradient overlay
    const overlay = document.createElement('div');
    overlay.className = 'gradient-overlay';
    document.body.prepend(overlay);
});
