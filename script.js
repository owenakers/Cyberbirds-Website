// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.createElement('div');
  mobileMenu.className = 'hidden md:hidden bg-gray-900 shadow-lg absolute top-16 left-0 right-0 py-4 px-6 border-t border-cyan-500/20';
  
  // Clone the navigation links for mobile
  const navLinks = document.querySelector('nav').cloneNode(true);
  navLinks.className = 'flex flex-col space-y-4';
  mobileMenu.appendChild(navLinks);
  
  document.querySelector('header').appendChild(mobileMenu);
  
  mobileMenuButton.addEventListener('click', function() {
    mobileMenu.classList.toggle('hidden');
  });
  
  // Typewriter effect for terminal
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
  
  const terminal = document.querySelector('.terminal-bg');
  const terminalContent = document.createElement('div');
  terminalContent.className = 'p-6 font-mono text-green-400';
  terminalContent.innerHTML = '<p><span class="text-purple-400">$</span> <span id="typing"></span><span class="blink">_</span></p>';
  
  let currentLine = 0;
  let currentChar = 0;
  let isDeleting = false;
  
  function typeTerminalText() {
    const line = terminalText[currentLine];
    const text = isDeleting 
      ? line.text.substring(0, currentChar - 1)
      : line.text.substring(0, currentChar + 1);
    
    document.getElementById('typing').textContent = text;
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
  
  // Start typing when terminal is in view
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      terminal.appendChild(terminalContent);
      setTimeout(typeTerminalText, 1000);
      observer.disconnect();
    }
  }, {threshold: 0.5});
  
  observer.observe(terminal);
});

