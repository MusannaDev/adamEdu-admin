console.log("Home frontend javascript file - Gradient Circles Version");

// Smooth scroll for navigation
(function initSmoothScroll() {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Add smooth transition effect
      const href = this.getAttribute('href');
      
      if (href && !href.startsWith('#')) {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = '';
        }, 200);
      }
    });
  });
})();

// Navigation scroll effect
(function initNavigation() {
  const nav = document.querySelector('.navigation-menu');
  
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.style.background = 'rgba(45, 83, 83, 0.9)';
      nav.style.padding = '10px 0';
    } else {
      nav.style.background = 'rgba(45, 83, 83, 0.7)';
      nav.style.padding = '15px 0';
    }
  });
})();

// Enhanced circle animations with mouse interaction
(function initCircleAnimations() {
  const circles = document.querySelectorAll('.circle');
  
  if (circles.length === 0) return;

  let mouseX = 0;
  let mouseY = 0;
  let isMouseMoving = false;

  // Track mouse movement
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;
    isMouseMoving = true;
  });

  // Animate circles based on mouse position
  function animateCircles() {
    if (isMouseMoving) {
      circles.forEach((circle, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * 30 * speed;
        const y = (mouseY - 0.5) * 30 * speed;
        
        circle.style.transform = `translate(${x}px, ${y}px)`;
      });
    }
    
    requestAnimationFrame(animateCircles);
  }

  animateCircles();

  // Reset mouse moving flag after inactivity
  setInterval(() => {
    isMouseMoving = false;
  }, 100);
})();

// Welcome text animation on load
(function initWelcomeAnimation() {
  const welcomeContent = document.querySelector('.welcome-content');
  
  if (!welcomeContent) return;

  // Add entrance animation
  setTimeout(() => {
    welcomeContent.style.opacity = '1';
    welcomeContent.style.transform = 'translateY(0)';
  }, 100);
})();

// Parallax effect for circles on scroll
(function initParallaxScroll() {
  const circles = document.querySelectorAll('.circle');
  
  if (circles.length === 0) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    circles.forEach((circle, index) => {
      const speed = (index + 1) * 0.1;
      const yPos = scrolled * speed;
      circle.style.transform = `translateY(${yPos}px)`;
    });
  });
})();

// Add subtle pulse animation to main circle
(function initPulseAnimation() {
  const mainCircle = document.querySelector('.circle-3');
  
  if (!mainCircle) return;

  let scale = 1;
  let growing = true;

  function pulse() {
    if (growing) {
      scale += 0.0002;
      if (scale >= 1.03) growing = false;
    } else {
      scale -= 0.0002;
      if (scale <= 0.97) growing = true;
    }
    
    mainCircle.style.transform = `translate(-50%, -50%) scale(${scale})`;
    requestAnimationFrame(pulse);
  }

  pulse();
})();

// Performance monitoring
(function monitorPerformance() {
  if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
      const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
      console.log(`Page loaded in ${loadTime}ms`);
    });
  }
})();

// Add hover effect to navigation items
(function initNavHoverEffect() {
  const navItems = document.querySelectorAll('.nav-item a');
  
  navItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.letterSpacing = '1px';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.letterSpacing = '0.3px';
    });
  });
})();

console.log("All animations initialized successfully!");