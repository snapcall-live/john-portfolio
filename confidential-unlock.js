(() => {
  const CODE = '555';
  const KEY = 'johnPortfolioConfidentialUnlocked';

  const isUnlocked = () => window.localStorage.getItem(KEY) === 'true';

  function setUnlocked(value) {
    if (value) window.localStorage.setItem(KEY, 'true');
    else window.localStorage.removeItem(KEY);
    applyState();
  }

  function applyState() {
    const unlocked = isUnlocked();
    document.documentElement.classList.toggle('confidential-unlocked', unlocked);
    document.querySelectorAll('[data-confidential-locked]').forEach(el => {
      el.hidden = unlocked;
    });
    document.querySelectorAll('[data-confidential-unlocked]').forEach(el => {
      el.hidden = !unlocked;
    });
    document.querySelectorAll('[data-confidential-trigger]').forEach(btn => {
      btn.textContent = unlocked ? 'Confidential proof unlocked' : 'Unlock confidential proof';
      btn.setAttribute('aria-pressed', unlocked ? 'true' : 'false');
      btn.classList.toggle('unlocked', unlocked);
    });
  }

  function promptForCode() {
    if (isUnlocked()) {
      const lockAgain = window.confirm('Confidential proof is already unlocked on this browser. Lock it again?');
      if (lockAgain) setUnlocked(false);
      return;
    }
    const code = window.prompt('Enter confidential access code');
    if (code === null) return;
    if (code.trim() === CODE) {
      setUnlocked(true);
      window.alert('Confidential proof unlocked for this browser.');
    } else {
      window.alert('Incorrect code.');
    }
  }

  function injectUnlockButton() {
    const nav = document.querySelector('.nav');
    if (!nav || nav.querySelector('[data-confidential-trigger]')) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'confidentialUnlockBtn';
    button.setAttribute('data-confidential-trigger', '');
    button.addEventListener('click', promptForCode);
    nav.appendChild(button);
  }

  document.addEventListener('DOMContentLoaded', () => {
    injectUnlockButton();
    document.querySelectorAll('[data-confidential-trigger]').forEach(btn => {
      btn.addEventListener('click', promptForCode);
    });
    applyState();
  });
})();
