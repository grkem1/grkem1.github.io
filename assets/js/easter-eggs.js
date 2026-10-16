/**
 * Easter Eggs
 * Fun surprises and hidden features
 */

class EasterEggs {
  constructor() {
    this.konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    this.konamiIndex = 0;
    this.logoClickCount = 0;
    this.init();
  }

  init() {
    this.setupKonamiCode();
    this.setupLogoClicks();
    this.setupConsoleMessages();
    this.setupCornerSequence();
  }

  // Konami Code Easter Egg
  setupKonamiCode() {
    document.addEventListener('keydown', (e) => {
      const key = e.key;
      
      if (key === this.konamiCode[this.konamiIndex]) {
        this.konamiIndex++;
        
        if (this.konamiIndex === this.konamiCode.length) {
          this.activateKonamiCode();
          this.konamiIndex = 0;
        }
      } else {
        this.konamiIndex = 0;
      }
    });
  }

  activateKonamiCode() {
    console.log('🎮 Konami Code Activated!');
    
    // Add rainbow effect to body
    document.body.classList.add('konami-activated');
    
    // Show notification
    this.showNotification('🎮 Konami Code Activated! You found the secret!', 'success');
    
    // Create confetti effect
    this.createConfetti();
    
    // Remove effect after 5 seconds
    setTimeout(() => {
      document.body.classList.remove('konami-activated');
    }, 5000);
  }

  // Logo Click Counter
  setupLogoClicks() {
    const logo = document.querySelector('.nav-logo');
    if (!logo) return;

    logo.addEventListener('click', (e) => {
      this.logoClickCount++;
      
      if (this.logoClickCount === 5) {
        e.preventDefault();
        this.activateLogoEasterEgg();
        this.logoClickCount = 0;
      }
      
      // Reset counter after 2 seconds of no clicks
      setTimeout(() => {
        this.logoClickCount = 0;
      }, 2000);
    });
  }

  activateLogoEasterEgg() {
    const messages = [
      '🎯 You found a secret! I love clean code and coffee ☕',
      '💡 Fun fact: This entire site is built with pure CSS (no frameworks)!',
      '🚀 Did you know? I debug with console.log more than I\'d like to admit',
      '🎨 Design tip: This site uses the golden ratio for spacing',
      '⚡ Performance: 100% lighthouse score is my obsession'
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    this.showNotification(randomMessage, 'info');
    
    console.log('%c🎉 Secret Unlocked!', 'color: #14b8a6; font-size: 16px; font-weight: bold;');
    console.log(`%c${randomMessage}`, 'color: #6b7280; font-size: 14px;');
  }

  // Console Messages
  setupConsoleMessages() {
    // Already set up in main.js, but we can add more
    const messages = [
      {
        text: '🔍 Inspecting the code? I like your style!',
        delay: 3000
      },
      {
        text: '💼 Interested in working together? Check out the contact section!',
        delay: 6000
      }
    ];

    messages.forEach(({ text, delay }) => {
      setTimeout(() => {
        console.log(`%c${text}`, 'color: #3b82f6; font-size: 14px;');
      }, delay);
    });
  }

  // Corner Click Sequence (Top-left, Top-right, Bottom-right, Bottom-left)
  setupCornerSequence() {
    const corners = ['tl', 'tr', 'br', 'bl'];
    let sequence = [];
    const cornerSize = 50; // pixels from corner

    document.addEventListener('click', (e) => {
      const x = e.clientX;
      const y = e.clientY;
      const width = window.innerWidth;
      const height = window.innerHeight;

      let corner = null;
      
      // Detect which corner was clicked
      if (x < cornerSize && y < cornerSize) corner = 'tl';
      else if (x > width - cornerSize && y < cornerSize) corner = 'tr';
      else if (x > width - cornerSize && y > height - cornerSize) corner = 'br';
      else if (x < cornerSize && y > height - cornerSize) corner = 'bl';

      if (corner) {
        sequence.push(corner);
        
        // Keep only last 4 clicks
        if (sequence.length > 4) sequence.shift();
        
        // Check if sequence matches
        if (JSON.stringify(sequence) === JSON.stringify(corners)) {
          this.activateDevMode();
          sequence = [];
        }
      }
    });
  }

  activateDevMode() {
    console.log('🛠️ Dev Mode Activated!');
    this.showNotification('🛠️ Dev Mode: Grid overlay enabled!', 'info');
    
    // Toggle grid overlay
    const existingGrid = document.querySelector('.dev-mode-grid');
    if (existingGrid) {
      existingGrid.remove();
    } else {
      const grid = document.createElement('div');
      grid.className = 'dev-mode-grid';
      document.body.appendChild(grid);
      
      // Remove after 10 seconds
      setTimeout(() => grid.remove(), 10000);
    }
  }

  // Notification System
  showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.easter-egg-notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = 'easter-egg-notification';
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
      position: 'fixed',
      top: '2rem',
      right: '2rem',
      padding: '1rem 1.5rem',
      background: type === 'success' ? 'linear-gradient(135deg, #10b981, #14b8a6)' : 
                  type === 'info' ? 'linear-gradient(135deg, #3b82f6, #2563eb)' : 
                  'linear-gradient(135deg, #6366f1, #8b5cf6)',
      color: 'white',
      borderRadius: '0.75rem',
      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
      zIndex: '9999',
      fontSize: '0.875rem',
      fontWeight: '600',
      maxWidth: '20rem',
      animation: 'slideInRight 0.3s ease-out'
    });

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideInRight {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes slideOutRight {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Remove after 4 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, 4000);
  }

  // Confetti Effect
  createConfetti() {
    const colors = ['#3b82f6', '#14b8a6', '#f59e0b', '#ef4444', '#8b5cf6', '#10b981'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        const size = Math.random() * 10 + 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 3 + 2;
        const delay = Math.random() * 0.5;

        Object.assign(confetti.style, {
          position: 'fixed',
          left: `${left}%`,
          top: '-10px',
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: color,
          borderRadius: Math.random() > 0.5 ? '50%' : '0',
          zIndex: '9999',
          pointerEvents: 'none',
          animation: `confettiFall ${animationDuration}s linear ${delay}s`
        });

        const style = document.createElement('style');
        style.textContent = `
          @keyframes confettiFall {
            to {
              transform: translateY(100vh) rotate(360deg);
              opacity: 0;
            }
          }
        `;
        document.head.appendChild(style);

        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), (animationDuration + delay) * 1000);
      }, i * 30);
    }
  }
}

// Initialize Easter Eggs
document.addEventListener('DOMContentLoaded', () => {
  new EasterEggs();
});

// Export
window.EasterEggs = EasterEggs;
