// Eye of Odin - Floating in Space
document.addEventListener('DOMContentLoaded', function() {
    console.log('Eye of Odin floating in space...');
    
    // Get the eye elements
    const eye = document.querySelector('.eye');
    const pupil = document.querySelector('.pupil');
    const iris = document.querySelector('.iris');
    const floatingEye = document.querySelector('.floating-eye');
    
    // Mouse tracking for eye movement
    let mouseX = 0;
    let mouseY = 0;
    let eyeX = 0;
    let eyeY = 0;
    
    // Smooth eye movement
    function updateEyePosition() {
        const rect = eye.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;
        
        // Calculate distance from mouse to eye center
        const deltaX = mouseX - eyeCenterX;
        const deltaY = mouseY - eyeCenterY;
        
        // Limit movement to keep pupil within iris
        const maxMove = 15;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        if (distance > maxMove) {
            eyeX = (deltaX / distance) * maxMove;
            eyeY = (deltaY / distance) * maxMove;
        } else {
            eyeX = deltaX;
            eyeY = deltaY;
        }
        
        // Apply movement to pupil and iris
        pupil.style.transform = `translate(calc(-50% + ${eyeX}px), calc(-50% + ${eyeY}px))`;
        iris.style.transform = `translate(calc(-50% + ${eyeX * 0.3}px), calc(-50% + ${eyeY * 0.3}px))`;
        
        requestAnimationFrame(updateEyePosition);
    }
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Start eye tracking
    updateEyePosition();
    
    // Add random eye movements when mouse is not moving
    setInterval(() => {
        if (Math.abs(mouseX - eyeX) < 10 && Math.abs(mouseY - eyeY) < 10) {
            // Random eye movement
            const randomX = (Math.random() - 0.5) * 20;
            const randomY = (Math.random() - 0.5) * 20;
            
            pupil.style.transform = `translate(calc(-50% + ${randomX}px), calc(-50% + ${randomY}px))`;
            iris.style.transform = `translate(calc(-50% + ${randomX * 0.3}px), calc(-50% + ${randomY * 0.3}px))`;
        }
    }, 3000);
    
    // Add click effect
    floatingEye.addEventListener('click', () => {
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.top = '50%';
        ripple.style.left = '50%';
        ripple.style.width = '0px';
        ripple.style.height = '0px';
        ripple.style.background = 'radial-gradient(circle, rgba(255, 215, 0, 0.5), transparent)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.animation = 'ripple 1s ease-out forwards';
        ripple.style.pointerEvents = 'none';
        
        floatingEye.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 1000);
    });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            0% {
                width: 0px;
                height: 0px;
                opacity: 1;
            }
            100% {
                width: 200px;
                height: 200px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add floating particles
    function createFloatingParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        document.querySelector('.particles').appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 20000);
    }
    
    // Create particles periodically
    setInterval(createFloatingParticle, 2000);
    
    // Add keyboard interaction
    document.addEventListener('keydown', (e) => {
        if (e.key === ' ') {
            // Space bar - make eye blink
            const topLid = document.querySelector('.eyelid.top');
            const bottomLid = document.querySelector('.eyelid.bottom');
            
            topLid.style.animation = 'none';
            bottomLid.style.animation = 'none';
            
            setTimeout(() => {
                topLid.style.animation = 'blink 0.5s ease-in-out';
                bottomLid.style.animation = 'blink 0.5s ease-in-out';
            }, 10);
        }
    });
    
    console.log('Eye of Odin is now watching...');
});
