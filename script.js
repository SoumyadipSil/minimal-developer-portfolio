    // Year
    document.getElementById('year').textContent = new Date().getFullYear();


    // Theme toggle (persists in localStorage)
    const toggle = document.getElementById('themeToggle');
    const body = document.body;
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        if (savedTheme === 'light') {
            body.classList.add('light-mode');
        }
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        body.classList.add('light-mode');
    }

    toggle.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        }
    });

    // Contact form
    const form = document.getElementById('contactForm');
    const statusEl = document.getElementById('formStatus');

    async function handleSubmit(event) {
      event.preventDefault();
      statusEl.textContent = 'Sending…';
      const data = new FormData(event.target);
      try {
        const response = await fetch(event.target.action, {
          method: form.method,
          body: data,
          headers: {
              'Accept': 'application/json'
          }
        });
        const json = await response.json();

        if (json.success) {
          statusEl.textContent = json.message || "Thanks! I will get back to you soon.";
          form.reset();
        } else {
          console.log("Error", json);
          statusEl.textContent = json.message || "Oops! There was a problem submitting your form.";
        }
      } catch (error) {
        console.log("Error", error);
        statusEl.textContent = "Oops! There was a problem and your message could not be sent.";
      }
    }
    form.addEventListener("submit", handleSubmit);

    // Copy email
    const copyBtn = document.getElementById('copyEmailBtn');
    const emailAddress = document.getElementById('emailAddress').textContent;

    const copyIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z"/></svg>`;
    const checkIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/></svg>`;

    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(emailAddress).then(() => {
        copyBtn.innerHTML = checkIcon;
        copyBtn.style.color = 'var(--ok)'; // Using the 'ok' color for feedback
        setTimeout(() => {
          copyBtn.innerHTML = copyIcon;
          copyBtn.style.color = 'var(--muted)'; // Revert to original color
        }, 2000); // Revert back to 'Copy' after 2 seconds
      }).catch(err => {
        console.error('Failed to copy email: ', err);
      });
    });