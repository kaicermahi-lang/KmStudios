// Shared sidebar HTML
function injectSidebar(activePage) {
  // ── LOADER ──
  const loader = document.createElement('div');
  loader.id = 'loader';
  loader.innerHTML = '<div class="loader-logo">KM Studio</div><div class="loader-bar"><div class="loader-fill"></div></div>';
  document.body.prepend(loader);
  window.addEventListener('load', () => setTimeout(() => loader.classList.add('hidden'), 1000));

  // ── SCROLL BAR ──
  const scrollBar = document.createElement('div'); scrollBar.id = 'scroll-bar';
  document.body.appendChild(scrollBar);
  window.addEventListener('scroll', () => {
    const p = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    scrollBar.style.transform = 'scaleX(' + p + ')';
  });

  // ── CURSOR GLOW ──
  const cg = document.createElement('div'); cg.className = 'cursor-glow';
  document.body.appendChild(cg);
  document.addEventListener('mousemove', e => { cg.style.left = e.clientX + 'px'; cg.style.top = e.clientY + 'px'; });

  // ── BACK TO TOP ──
  const btt = document.createElement('button'); btt.id = 'btt';
  btt.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
  btt.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  document.body.appendChild(btt);
  window.addEventListener('scroll', () => btt.classList.toggle('visible', window.scrollY > 400));

  // ── TOAST ──
  const toast = document.createElement('div'); toast.id = 'toast';
  toast.innerHTML = '<i class="fa-solid fa-film" id="toast-icon"></i><span>Welcome to KM Studio 🎬</span>';
  document.body.appendChild(toast);
  setTimeout(() => { toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 4000); }, 2000);

  // ── ANIME FONT ──
  document.querySelectorAll('.ttl, .hero-ttl, .loader-logo, .story-quote').forEach(el => {
    el.classList.add('font-anime');
  });
  
  // Apply page fade to content, NOT body (to avoid breaking fixed positioning)
  document.querySelectorAll('body > div, body > section, body > footer').forEach(el => {
    if (el.id !== 'loader' && el.id !== 'scroll-bar' && el.id !== 'toast' && !el.classList.contains('sidebar') && !el.classList.contains('sb-overlay')) {
      el.classList.add('page-fade');
    }
  });

  // ── SIDEBAR LINKS ──
  const links = [
    { href: 'index.html',     icon: 'fa-house',        label: 'Home',      id: 'home' },
    { href: 'services.html',  icon: 'fa-film',         label: 'Services',  id: 'services' },
    { href: 'portfolio.html', icon: 'fa-clapperboard', label: 'Portfolio', id: 'portfolio', badge: 'NEW' },
    { href: 'pricing.html',   icon: 'fa-tag',          label: 'Pricing',   id: 'pricing' },
    { href: 'contact.html',   icon: 'fa-envelope',     label: 'Contact',   id: 'contact' },
  ];

  const navHTML = links.map(l => `
    <li>
      <a href="${l.href}" ${activePage === l.id ? 'class="active"' : ''} title="${l.label}">
        <span class="nav-icon"><i class="fa-solid ${l.icon}"></i></span>
        <span class="nav-label">${l.label}</span>
        ${l.badge ? `<span class="sb-badge">${l.badge}</span>` : ''}
      </a>
    </li>`).join('');

  // ── BUILD SIDEBAR ──
  const sidebar = document.createElement('aside');
  sidebar.className = 'sidebar';
  sidebar.id = 'sidebar';
  sidebar.innerHTML = `
    <button class="sb-toggle" id="sb-toggle" title="Toggle Menu">
      <i class="fa-solid fa-bars sb-toggle-icon" id="sb-icon"></i>
      <span class="sb-toggle-label">Menu</span>
    </button>
    <div class="sb-logo">
      <img src="logo.png" alt="KM Studio Logo" class="sb-logo-img">
    </div>
    <div class="sb-section-label">Navigation</div>
    <ul class="sb-nav">${navHTML}</ul>
    <div class="sb-bottom">
      <div class="sb-socials">
        <a class="sb-soc" href="https://mail.google.com/mail/?view=cm&to=kasiermahamud@gmail.com" target="_blank" title="Gmail"><i class="fa-brands fa-google"></i></a>
        <a class="sb-soc" href="https://wa.me/8801953373693" target="_blank" title="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
        <a class="sb-soc" href="https://facebook.com/domainexpansion11" target="_blank" title="Facebook"><i class="fa-brands fa-facebook"></i></a>
      </div>
      <div class="sb-user">
        <div class="sb-avatar">K</div>
        <div class="sb-user-info">
          <div class="sb-uname">Kasier Mahamud</div>
          <div class="sb-urole">Video Editor</div>
        </div>
      </div>
    </div>`;
  document.body.prepend(sidebar);

  // ── TOGGLE LOGIC ──
  let isOpen = false;
  const toggleBtn = document.getElementById('sb-toggle');
  const sbIcon = document.getElementById('sb-icon');

  function openSidebar() {
    isOpen = true;
    sidebar.classList.add('open');
    document.body.classList.add('sb-open');
    sbIcon.className = 'fa-solid fa-xmark sb-toggle-icon';
    if(window.innerWidth <= 900) overlay.classList.add('open');
  }
  function closeSidebar() {
    isOpen = false;
    sidebar.classList.remove('open');
    document.body.classList.remove('sb-open');
    sbIcon.className = 'fa-solid fa-bars sb-toggle-icon';
    overlay.classList.remove('open');
  }
  
  toggleBtn.addEventListener('click', () => isOpen ? closeSidebar() : openSidebar());

  // Close on outside click (only if it's the overlay)
  const overlay = document.createElement('div');
  overlay.className = 'sb-overlay';
  overlay.onclick = closeSidebar;
  document.body.appendChild(overlay);

  // Close on nav link click
  sidebar.querySelectorAll('.sb-nav a').forEach(a => {
    a.addEventListener('click', () => {
      setTimeout(closeSidebar, 150);
    });
  });

  // Mobile hamburger floating button
  const mobToggle = document.createElement('button');
  mobToggle.className = 'mob-toggle';
  mobToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  mobToggle.onclick = openSidebar;
  document.body.prepend(mobToggle);

  // Handle resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      overlay.classList.remove('open');
    } else {
      if(isOpen) overlay.classList.add('open');
    }
  });
}

// Scroll reveal
function initReveal() {
  const ro = new IntersectionObserver(e => {
    e.forEach(x => { if (x.isIntersecting) { x.target.classList.add('visible'); ro.unobserve(x.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-zoom').forEach(r => ro.observe(r));
}

// Counter animation
function initCounters() {
  const co = new IntersectionObserver(e => {
    e.forEach(x => {
      if (x.isIntersecting) {
        const el = x.target, t = +el.dataset.t;
        let c = 0, s = t / 60;
        const i = setInterval(() => {
          c += s;
          if (c >= t) { el.textContent = t + (t === 100 ? '' : '+'); clearInterval(i); }
          else el.textContent = Math.floor(c) + (t === 100 ? '' : '+');
        }, 22);
        co.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stat-n').forEach(c => co.observe(c));
}

// Canvas particle animation
function initCanvas(canvasId) {
  const cv = document.getElementById(canvasId);
  if (!cv) return;
  const ctx = cv.getContext('2d');
  let W, H, pts = [];
  function resize() { W = cv.width = innerWidth; H = cv.height = innerHeight; }
  resize(); window.addEventListener('resize', resize);
  const colors = ['rgba(99,102,241,', 'rgba(139,92,246,', 'rgba(245,158,11,', 'rgba(6,182,212,'];
  for (let i = 0; i < 110; i++) pts.push({
    x: Math.random() * 9999, y: Math.random() * 9999,
    a: Math.random() * Math.PI * 2, s: Math.random() * .4 + .1,
    r: Math.random() * 1.8 + .4, op: Math.random() * .45 + .08,
    col: colors[Math.floor(Math.random() * colors.length)]
  });
  (function draw() {
    ctx.clearRect(0, 0, W, H);
    pts.forEach(p => {
      p.x += Math.cos(p.a) * p.s; p.y += Math.sin(p.a) * p.s; p.a += .02 - Math.random() * .04;
      if (p.x < 0 || p.x > W || p.y < 0 || p.y > H) { p.x = Math.random() * W; p.y = Math.random() * H; }
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.col + p.op + ')'; ctx.fill();
    });
    requestAnimationFrame(draw);
  })();
}

// Skill bar animation
function initSkillBars() {
  const so = new IntersectionObserver(e => {
    e.forEach(x => {
      if (x.isIntersecting) {
        x.target.style.width = x.target.dataset.w + '%';
        so.unobserve(x.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.skill-fill').forEach(f => so.observe(f));
}

// Typed text
function initTyped(elId, words) {
  let wi = 0, ci = 0, dl = false;
  function type() {
    const el = document.getElementById(elId); if (!el) return;
    const w = words[wi];
    if (!dl) { el.textContent = w.slice(0, ++ci); if (ci === w.length) { dl = true; setTimeout(type, 1800); return; } }
    else { el.textContent = w.slice(0, --ci); if (ci === 0) { dl = false; wi = (wi + 1) % words.length; } }
    setTimeout(type, dl ? 60 : 100);
  }
  type();
}

// FAQ toggle
function toggleFaq(el) { el.parentElement.classList.toggle('open'); }

// Send via Gmail
function sendMsg() {
  const n = document.getElementById('fn').value, e = document.getElementById('fe').value,
    s = (document.getElementById('fs') || {}).value || '', b = (document.getElementById('fb') || {}).value || '',
    p = (document.getElementById('fp') || {}).value || '', m = document.getElementById('fm').value;
  if (!n || !e || !m) { alert('Please fill name, email and message!'); return; }
  const body = 'Name: ' + n + '\nEmail: ' + e + '\nPhone: ' + (p || 'N/A') + '\nService: ' + s + '\nBudget: ' + b + '\n\nMessage:\n' + m;
  window.open('https://mail.google.com/mail/?view=cm&to=kasiermahamud@gmail.com&su=' + encodeURIComponent('Project: ' + s) + '&body=' + encodeURIComponent(body), '_blank');
}

// ── NEW FEATURES (150+ EXPANSION) ──

// Accordion Logic
function initAccordion() {
  document.querySelectorAll('.acc-head').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.parentElement;
      const isOpen = parent.classList.contains('open');
      document.querySelectorAll('.accordion').forEach(a => a.classList.remove('open'));
      if(!isOpen) parent.classList.add('open');
    });
  });
}

// Custom Context Menu
function initContextMenu() {
  const menu = document.createElement('div');
  menu.className = 'context-menu';
  menu.innerHTML = `
    <div class="cm-item" onclick="window.location.reload()"><i class="fa-solid fa-rotate-right"></i> Reload Studio</div>
    <div class="cm-item" onclick="window.scrollTo(0,0)"><i class="fa-solid fa-arrow-up"></i> Back to Top</div>
    <div class="cm-item" onclick="window.open('contact.html','_self')"><i class="fa-solid fa-envelope"></i> Contact Support</div>
    <div class="cm-item" style="color:var(--muted);border-top:1px solid var(--border);margin-top:4px"><i class="fa-solid fa-code"></i> KM Studio Engine v3</div>
  `;
  document.body.appendChild(menu);

  document.addEventListener('contextmenu', e => {
    e.preventDefault();
    menu.style.left = e.clientX + 'px';
    menu.style.top = e.clientY + 'px';
    menu.classList.add('show');
  });

  document.addEventListener('click', () => menu.classList.remove('show'));
}

// Magnetic Buttons
function initMagneticButtons() {
  document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });
}
