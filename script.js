// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu setup (same as before)
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  if (mobileMenuButton) {
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'hidden md:hidden bg-gray-900 shadow-lg absolute top-16 left-0 right-0 py-4 px-6 border-t border-cyan-500/20';
    
    const navLinks = document.querySelector('nav').cloneNode(true);
    navLinks.className = 'flex flex-col space-y-4';
    mobileMenu.appendChild(navLinks);
    
    document.querySelector('header').appendChild(mobileMenu);
    
    mobileMenuButton.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Terminal animation setup
  const terminalAnimation = document.getElementById('terminal-animation');
  if (terminalAnimation) {
    const terminalText = [
      {text: "scan --network jhu.edu", delay: 1000},
      {text: ">_ Scanning university network...", delay: 500},
      {text: ">_ Vulnerabilities detected: 12", delay: 500},
      {text: ">_ Critical: 3, High: 5, Medium: 4", delay: 500},
      {text: "exploit --type sql-injection", delay: 1000},
      {text: ">_ Attempting SQL injection...", delay: 500},
      {text: ">_ Bypassed authentication", delay: 500},
      {text: ">_ Gained admin privileges", delay: 500},
      {text: "exit", delay: 2000}
    ];
    
    let currentLine = 0;
    let currentChar = 0;
    let isDeleting = false;
    
    function typeTerminalText() {
      const line = terminalText[currentLine];
      const text = isDeleting 
        ? line.text.substring(0, currentChar - 1)
        : line.text.substring(0, currentChar + 1);
      
      terminalAnimation.textContent = text;
      terminalAnimation.classList.remove('hidden');
      currentChar = isDeleting ? currentChar - 1 : currentChar + 1;
      
      if (!isDeleting && currentChar === line.text.length) {
        isDeleting = true;
        setTimeout(typeTerminalText, line.delay);
      } else if (isDeleting && currentChar === 0) {
        isDeleting = false;
        currentLine = (currentLine + 1) % terminalText.length;
        setTimeout(typeTerminalText, 500);
      } else {
        setTimeout(typeTerminalText, isDeleting ? 50 : 100);
      }
    }
    
    // Start animation when page loads
    setTimeout(typeTerminalText, 1500);
  }
});