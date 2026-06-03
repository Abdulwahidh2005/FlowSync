import { useEffect, useRef, useState } from 'react';

const navLinks = [
  ['Home', '#home'],
  ['Features', '#features'],
  ['How It Works', 'how-it-works.html'],
  ['Benefits', 'benefits.html'],
  ['Applications', 'applications.html'],
];

const features = [
  ['Real-Time Monitoring', 'Continuous visibility into healthcare operations and patient flow activities - every department, every movement, as it happens.', 'wide'],
  ['Operational Intelligence', 'Transforms healthcare data into actionable insights.', ''],
  ['Predictive Analytics', 'Supports early identification of workflow inefficiencies.', ''],
  ['Smart Dashboard', 'Provides centralized monitoring and visualization.', ''],
  ['Workflow Optimization', 'Supports efficient healthcare operations and resource utilization.', ''],
  ['Scalable Infrastructure', 'Designed to support healthcare facilities of different sizes - from a single OPD to multi-site healthcare networks.', 'wide'],
];

const team = [
  {
    src: 'assets/team-1.jpg',
    name: 'Naseeha Nafrin N M',
    role: 'Healthcare Technology Strategist',
    bio: 'Drives the design and development of smart healthcare solutions by integrating healthcare workflows, digital technologies, IoT systems, and operational intelligence frameworks. Focuses on creating scalable and innovative solutions for predictive hospital management and patient flow optimization.',
    linkedin: 'https://www.linkedin.com/in/naseeha-nafrin-nm-274745327',
  },
  {
    src: 'assets/team-2.jpg',
    name: 'Navin R',
    role: 'Healthcare Analytics Strategist',
    bio: 'Develops intelligent analytics and decision-support solutions through predictive modeling, workflow optimization, real-time monitoring, and data-driven healthcare intelligence systems.',
    linkedin: 'https://www.linkedin.com/in/navin-r-071898327',
  },
  {
    src: 'assets/team-3.jpg',
    name: 'Krisnan K',
    role: 'Mechanical Engineer · Engineering Lead',
    bio: 'Designs and optimizes wearable tracking devices, hardware modules, power management systems, and deployment-ready physical infrastructure for continuous healthcare monitoring applications.',
    linkedin: 'https://www.linkedin.com/in/krisnan',
  },
  {
    src: 'assets/team-4.jpg',
    name: 'Brathikan VM',
    role: 'Innovation Expert',
    bio: 'Identifies technological opportunities, evaluates novelty, strengthens intellectual property potential, and guides innovation strategy to ensure scalability, practical impact, and long-term technology adoption.',
    linkedin: 'https://www.linkedin.com/in/brathikan',
  },
];

function Logo({ small = false }) {
  return (
    <span className={`mark ${small ? 'size-[30px]' : ''}`}>
      <svg viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <rect width="36" height="36" rx="10" fill="url(#logoGradient)" />
        <circle cx="11" cy="12" r="2.4" fill="#fff" />
        <circle cx="25" cy="11" r="2.4" fill="#fff" />
        <circle cx="18" cy="25" r="2.4" fill="#fff" />
        <path d="M11 12 25 11M11 12 18 25M25 11 18 25" stroke="#fff" strokeWidth="1.4" opacity=".75" />
        <defs>
          <linearGradient id="logoGradient" x1="0" y1="0" x2="36" y2="36">
            <stop stopColor="#0A6CFF" />
            <stop offset="1" stopColor="#22D3EE" />
          </linearGradient>
        </defs>
      </svg>
    </span>
  );
}

function ArrowIcon() {
  return (
    <svg className="arw" width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.74v20.52C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.74C24 .78 23.2 0 22.22 0Z" />
    </svg>
  );
}

function FeatureIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 12h4l2 6 4-14 2 8h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function useCanvasOrb(ref) {
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let raf = 0;
    let active = true;
    let lastFrame = 0;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const nodes = Array.from({ length: matchMedia('(pointer: coarse)').matches ? 16 : 30 }, () => ({
      a: Math.random() * Math.PI * 2,
      rad: 0,
      sp: (Math.random() * 0.4 + 0.1) * (Math.random() < 0.5 ? -1 : 1) * 0.003,
      z: Math.random(),
      r: Math.random() * 1.8 + 1.2,
    }));
    let pulses = [];

    const size = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes.forEach((node) => {
        if (!node.rad) node.rad = (0.18 + Math.random() * 0.32) * Math.min(width, height);
      });
    };

    const loop = (now = 0) => {
      if (!active) {
        raf = requestAnimationFrame(loop);
        return;
      }
      if (now - lastFrame < 33) {
        raf = requestAnimationFrame(loop);
        return;
      }
      lastFrame = now;
      ctx.clearRect(0, 0, width, height);
      const points = nodes.map((node) => {
        node.a += node.sp;
        const wobble = Math.sin(node.a * 2 + node.z * 6) * 8;
        return {
          x: width / 2 + Math.cos(node.a) * (node.rad + wobble),
          y: height / 2 + Math.sin(node.a) * (node.rad * 0.82 + wobble),
          r: node.r,
        };
      });

      points.forEach((a, i) => {
        points.slice(i + 1).forEach((b) => {
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance < 120) {
            ctx.strokeStyle = `rgba(10,108,255,${0.16 * (1 - distance / 120)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        });
      });

      points.forEach((point) => {
        const glow = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, point.r * 3);
        glow.addColorStop(0, 'rgba(34,211,238,.9)');
        glow.addColorStop(1, 'rgba(10,108,255,0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.r * 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,.95)';
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.r * 0.7, 0, Math.PI * 2);
        ctx.fill();
      });

      if (Math.random() < 0.04 && pulses.length < 6 && points.length > 1) {
        const a = Math.floor(Math.random() * points.length);
        const b = Math.floor(Math.random() * points.length);
        if (a !== b) pulses.push({ a, b, t: 0 });
      }

      pulses.forEach((pulse) => {
        pulse.t += 0.02;
        const a = points[pulse.a];
        const b = points[pulse.b];
        const x = a.x + (b.x - a.x) * pulse.t;
        const y = a.y + (b.y - a.y) * pulse.t;
        ctx.fillStyle = 'rgba(34,211,238,.95)';
        ctx.beginPath();
        ctx.arc(x, y, 2.4, 0, Math.PI * 2);
        ctx.fill();
      });
      pulses = pulses.filter((pulse) => pulse.t < 1);
      raf = requestAnimationFrame(loop);
    };

    size();
    const observer = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting;
    }, { rootMargin: '160px' });
    observer.observe(canvas);
    addEventListener('resize', size);
    loop();
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      removeEventListener('resize', size);
    };
  }, [ref]);
}

function useSpotNet(ref) {
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const nodes = Array.from({ length: 40 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0006,
      vy: (Math.random() - 0.5) * 0.0006,
    }));
    let width = 0;
    let height = 0;
    let raf = 0;
    let active = false;
    let lastFrame = 0;

    const size = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const loop = (now = 0) => {
      if (!active) {
        raf = requestAnimationFrame(loop);
        return;
      }
      if (now - lastFrame < 40) {
        raf = requestAnimationFrame(loop);
        return;
      }
      lastFrame = now;
      ctx.clearRect(0, 0, width, height);
      const points = nodes.map((node) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > 1) node.vx *= -1;
        if (node.y < 0 || node.y > 1) node.vy *= -1;
        return { x: node.x * width, y: node.y * height };
      });
      points.forEach((a, i) => {
        points.slice(i + 1).forEach((b) => {
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance < 130) {
            ctx.strokeStyle = `rgba(34,211,238,${0.14 * (1 - distance / 130)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        });
      });
      points.forEach((point) => {
        ctx.fillStyle = 'rgba(120,200,255,.6)';
        ctx.beginPath();
        ctx.arc(point.x, point.y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(loop);
    };

    size();
    const observer = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting;
    }, { rootMargin: '160px' });
    observer.observe(canvas);
    addEventListener('resize', size);
    loop();
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      removeEventListener('resize', size);
    };
  }, [ref]);
}

function useInteractions() {
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = matchMedia('(pointer: fine)').matches;
    const nav = document.querySelector('.nav');
    let scrollTicking = false;
    const onScroll = () => {
      if (scrollTicking) return;
      scrollTicking = true;
      requestAnimationFrame(() => {
        nav?.classList.toggle('scrolled', scrollY > 24);
        scrollTicking = false;
      });
    };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });

    const revealEls = document.querySelectorAll('[data-reveal],[data-stagger]');
    if (reduce) {
      revealEls.forEach((el) => el.classList.add('in'));
    } else {
      const reveal = (el) => {
        if (el.classList.contains('in')) return;
        const delay = Number.parseInt(el.getAttribute('data-delay') || '0', 10);
        if (el.hasAttribute('data-stagger')) {
          const step = Number.parseInt(el.getAttribute('data-stagger') || '80', 10) || 80;
          [...el.children].forEach((child, index) => {
            child.style.transitionDelay = `${index * step}ms`;
          });
        }
        setTimeout(() => el.classList.add('in'), delay);
      };
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });
      revealEls.forEach((el) => observer.observe(el));
    }

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const raw = el.getAttribute('data-count');
        const end = Number.parseFloat(raw);
        const suffix = el.getAttribute('data-suffix') || '';
        const decimals = raw.includes('.') ? raw.split('.')[1].length : 0;
        let start = null;
        const tick = (now) => {
          if (!start) start = now;
          const progress = Math.min((now - start) / 1700, 1);
          const eased = 1 - (1 - progress) ** 3;
          el.textContent = `${(end * eased).toFixed(decimals)}${suffix}`;
          if (progress < 1 && !reduce) requestAnimationFrame(tick);
        };
        if (reduce) el.textContent = `${end.toFixed(decimals)}${suffix}`;
        else requestAnimationFrame(tick);
        counterObserver.unobserve(el);
      });
    }, { threshold: 0.6 });
    document.querySelectorAll('[data-count]').forEach((el) => counterObserver.observe(el));

    const fillObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('filled');
          fillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35 });
    document.querySelectorAll('[data-fill]').forEach((el) => fillObserver.observe(el));

    const cleanupFns = [];
    document.querySelectorAll('[data-compare]').forEach((container) => {
      const top = container.querySelector('.cmp-top');
      const handle = container.querySelector('.cmp-handle');
      let dragging = false;
      const set = (percent) => {
        const value = Math.max(0, Math.min(100, percent));
        top.style.clipPath = `inset(0 ${100 - value}% 0 0)`;
        handle.style.left = `${value}%`;
      };
      const fromEvent = (event) => {
        const rect = container.getBoundingClientRect();
        set(((event.clientX - rect.left) / rect.width) * 100);
      };
      const down = (event) => { dragging = true; fromEvent(event); };
      const move = (event) => { if (dragging) fromEvent(event); };
      const up = () => { dragging = false; };
      container.addEventListener('pointerdown', down);
      addEventListener('pointermove', move);
      addEventListener('pointerup', up);
      cleanupFns.push(() => {
        container.removeEventListener('pointerdown', down);
        removeEventListener('pointermove', move);
        removeEventListener('pointerup', up);
      });
      set(50);
    });

    document.querySelectorAll('[data-drag]').forEach((el) => {
      let startX = 0;
      let startY = 0;
      let offsetX = 0;
      let offsetY = 0;
      let dragging = false;
      const down = (event) => {
        dragging = true;
        el.setPointerCapture(event.pointerId);
        el.style.transition = 'none';
        el.style.zIndex = 50;
        el.classList.add('dragging');
        startX = event.clientX;
        startY = event.clientY;
      };
      const move = (event) => {
        if (!dragging) return;
        el.style.transform = `translate(${offsetX + event.clientX - startX}px,${offsetY + event.clientY - startY}px) scale(1.03)`;
      };
      const up = () => {
        if (!dragging) return;
        dragging = false;
        el.classList.remove('dragging');
        const match = /translate\(([-\d.]+)px,\s*([-\d.]+)px\)/.exec(el.style.transform);
        if (match) {
          offsetX = Number.parseFloat(match[1]);
          offsetY = Number.parseFloat(match[2]);
        }
        el.style.transition = 'transform .5s var(--ease)';
        el.style.transform = `translate(${offsetX}px,${offsetY}px)`;
      };
      el.addEventListener('pointerdown', down);
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerup', up);
      el.addEventListener('pointercancel', up);
      cleanupFns.push(() => {
        el.removeEventListener('pointerdown', down);
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerup', up);
        el.removeEventListener('pointercancel', up);
      });
    });

    if (fine && !reduce) {
      document.querySelectorAll('[data-tilt]').forEach((card) => {
        const inner = card.querySelector('.tilt-inner') || card;
        const max = Number.parseFloat(card.getAttribute('data-tilt')) || 8;
        const move = (event) => {
          const rect = card.getBoundingClientRect();
          const px = (event.clientX - rect.left) / rect.width - 0.5;
          const py = (event.clientY - rect.top) / rect.height - 0.5;
          inner.style.transform = `perspective(800px) rotateX(${-py * max}deg) rotateY(${px * max}deg)`;
        };
        const leave = () => { inner.style.transform = 'perspective(800px) rotateX(0) rotateY(0)'; };
        card.addEventListener('mousemove', move);
        card.addEventListener('mouseleave', leave);
        cleanupFns.push(() => {
          card.removeEventListener('mousemove', move);
          card.removeEventListener('mouseleave', leave);
        });
      });
    }

    return () => {
      removeEventListener('scroll', onScroll);
      cleanupFns.forEach((fn) => fn());
    };
  }, []);
}

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav className="nav">
        <div className="wrap">
          <a href="#home" className="brand" onClick={() => setOpen(false)}>
            <Logo />
            <b>Flow<span>Sync</span></b>
          </a>
          <div className="nav-links">
            {navLinks.map(([label, href], index) => (
              <a className={`nav-link ${index === 0 ? 'active' : ''}`} href={href} key={label}>{label}</a>
            ))}
          </div>
          <div className="nav-cta">
            <a href="#demo" className="btn btn-primary">Request a Demo <ArrowIcon /></a>
          </div>
          <button className={`burger ${open ? 'open' : ''}`} aria-label="Menu" onClick={() => setOpen(!open)}>
            <span /><span /><span />
          </button>
        </div>
      </nav>
      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        {navLinks.map(([label, href]) => <a href={href} key={label} onClick={() => setOpen(false)}>{label}</a>)}
        <a href="#demo" className="mm-cta" onClick={() => setOpen(false)}>Request a Demo -&gt;</a>
      </div>
    </>
  );
}

function Hero() {
  const orbRef = useRef(null);
  useCanvasOrb(orbRef);

  return (
    <header className="hero" id="home">
      <div className="hero-mesh"><span className="mesh-blob m1" /><span className="mesh-blob m2" /><span className="mesh-blob m3" /></div>
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">AI-Powered Hospital Workflow Intelligence</span>
          <h1 className="display"><span className="grad-text">FlowSync</span></h1>
          <p className="hero-sub">Smarter Healthcare Operations, in Real Time</p>
          <p className="lead">FlowSync is an intelligent healthcare operations platform that helps hospitals monitor patient movement, improve operational visibility, and optimize healthcare workflows through connected technologies and predictive analytics.</p>
          <p className="sec-line">Gain real-time insight into hospital activity, identify operational inefficiencies, and make better decisions for improved patient experiences.</p>
          <div className="hero-actions">
            <a href="#demo" className="btn btn-primary btn-lg">Request a Demo <ArrowIcon /></a>
            <a href="how-it-works.html" className="btn btn-ghost btn-lg">See How It Works</a>
          </div>
          <div className="trust">
            {['Secure by design', 'Real-time telemetry', 'Predictive analytics'].map((item) => <div className="t" key={item}><span className="dot-live" />{item}</div>)}
          </div>
        </div>
        <div className="stage">
          <div className="orb-wrap">
            <span className="orb-ring" /><span className="orb-ring r2" />
            <canvas id="orb" ref={orbRef} />
          </div>
          <div className="glass chip-live float"><span className="dot-live" />LIVE - 2,481 patients tracked</div>
          <div className="glass dash-card float">
            <div className="dh"><b>Patient Flow</b><span className="pill"><span className="dot-live" />Live</span></div>
            <svg className="spark" viewBox="0 0 240 54" preserveAspectRatio="none" fill="none">
              <path d="M0 40 L30 36 L60 42 L90 26 L120 30 L150 16 L180 22 L210 10 L240 14 L240 54 L0 54Z" fill="rgba(10,108,255,.12)" />
              <path d="M0 40 L30 36 L60 42 L90 26 L120 30 L150 16 L180 22 L210 10 L240 14" stroke="var(--blue)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="row">
              <div className="stat"><div className="n" data-count="68" data-suffix="%">0%</div><div className="l">OCCUPANCY</div></div>
              <div className="stat"><div className="n" data-count="24" data-suffix="m">0m</div><div className="l">AVG WAIT</div></div>
            </div>
          </div>
          <div className="wear-card float">
            <img src="assets/wearable-xray.jpg" alt="FlowSync smart wearable internal architecture" />
            <span className="cap">FlowSync Smart Wearable</span>
          </div>
        </div>
      </div>
    </header>
  );
}

function CompareSection() {
  return (
    <section className="section-pad">
      <div className="wrap">
        <div className="grid-2">
          <div data-reveal="left">
            <span className="eyebrow">What is FlowSync?</span>
            <h2 className="h-xl mt-4 mb-6">A Connected Healthcare Ecosystem</h2>
            <div className="stack">
              <p className="lead">Healthcare facilities often experience challenges such as overcrowding, long waiting times, inefficient resource utilization, and limited operational visibility.</p>
              <p className="muted">FlowSync addresses these challenges by creating a connected healthcare ecosystem where operational information can be monitored, analyzed, and transformed into actionable insights.</p>
              <p className="muted">The platform supports hospitals in achieving more efficient workflows, better resource management, and improved service delivery.</p>
            </div>
          </div>
          <div data-reveal="right">
            <div className="cmp" data-compare>
              <div className="cmp-panel cmp-bottom">
                <div className="ttl"><span className="dot-live" />With FlowSync - clarity</div>
                <ComparisonTiles good />
              </div>
              <div className="cmp-panel cmp-top">
                <div className="ttl">Without FlowSync - chaos</div>
                <ComparisonTiles />
              </div>
              <div className="cmp-handle"><span className="gr">||</span></div>
              <div className="cmp-hint">&lt;- Drag to compare -&gt;</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ComparisonTiles({ good = false }) {
  const data = good
    ? [['68%', 'Occupancy - monitored'], ['24m', 'Avg wait - down 25%'], ['0', 'Bottlenecks - cleared'], ['98%', 'Visibility - live']]
    : [['??%', 'Occupancy - unknown'], ['2:14h', 'Avg wait - rising'], ['7', 'Bottlenecks - unseen'], ['-', 'Visibility - limited']];
  return (
    <div className="panel-grid">
      {data.map(([big, label]) => (
        <div className="tile" key={label}>
          <div>
            <div className={`big ${good ? 'ok' : 'bad'}`}>{big}</div>
            <div className="lab">{label}</div>
          </div>
          <div className="bars"><i /><i /><i /><i /><i /></div>
        </div>
      ))}
    </div>
  );
}

function Features() {
  return (
    <section id="features" className="section-pad bg-[#EDF3FB]">
      <div className="wrap">
        <div className="sec-head" data-reveal>
          <span className="eyebrow">Key Features</span>
          <h2 className="h-xl">Everything you need for total operational clarity</h2>
        </div>
        <div className="bento">
          {features.map(([title, copy, size], index) => (
            <div className={`glass tilt bcard ${size}`} data-tilt="8" data-reveal data-delay={(index % 3) * 80} key={title}>
              <div className="glowedge" />
              <div className="tilt-inner">
                <span className="ic"><FeatureIcon /></span>
                <h3>{title}</h3>
                <p>{copy}</p>
                {index === 0 && <div className="mini-live"><i /><i /><i /><i /><i /><i /><i /></div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Dashboard() {
  return (
    <section className="showcase section-pad">
      <div className="wrap">
        <div className="sec-head" data-reveal>
          <span className="eyebrow">Live Dashboard</span>
          <h2 className="h-xl">One Dashboard. Total Operational Clarity.</h2>
          <p className="lead">Every signal from across the hospital, unified into a single real-time view. Drag the cards - rearrange your command center.</p>
        </div>
        <div className="board" data-reveal>
          <span className="board-hint">drag any card to rearrange</span>
          <div className="dcard d-flow" data-drag>
            <div className="dt">Patient Flow <span className="dot-live" /></div>
            <svg viewBox="0 0 280 70" preserveAspectRatio="none" fill="none">
              <path d="M0 52 L35 46 L70 54 L105 32 L140 40 L175 20 L210 28 L245 12 L280 18 L280 70 L0 70Z" fill="rgba(34,211,238,.16)" />
              <path d="M0 52 L35 46 L70 54 L105 32 L140 40 L175 20 L210 28 L245 12 L280 18" stroke="var(--cyan)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="dcard d-util" data-drag>
            <div className="dt">Department Utilization</div>
            <div className="bargrid" data-fill>
              {['OPD', 'ER', 'Radiology', 'Pharmacy'].map((label, index) => (
                <div className="b" key={label}>{label}<span className="track"><i style={{ '--w': `${[82, 64, 48, 71][index]}%` }} /></span></div>
              ))}
            </div>
          </div>
          <div className="dcard d-count" data-drag>
            <div className="dt">Live Movement</div>
            <div className="big" data-count="2481">0</div>
            <div className="trend">+128 last hour</div>
          </div>
          <div className="dcard d-alert" data-drag>
            <div className="dt">Bottleneck Alert</div>
            <div className="flex items-center gap-3">
              <span className="ico">!</span>
              <div><div className="font-display font-semibold text-white">Cardiology</div><div className="font-mono text-[.64rem] text-[#caa86a]">High congestion - review</div></div>
            </div>
          </div>
          <div className="dcard d-wait" data-drag>
            <div className="dt">Avg Wait Time</div>
            <div className="big" data-count="24" data-suffix="m">0m</div>
            <div className="trend">down 25% vs last week</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Team() {
  const [flipped, setFlipped] = useState(null);
  return (
    <section className="section-pad">
      <div className="wrap">
        <div className="sec-head center" data-reveal>
          <span className="eyebrow justify-center">The Team</span>
          <h2 className="h-xl">The people behind FlowSync</h2>
          <p className="lead mx-auto max-w-[54ch]">A team focused on renewable thinking, smart monitoring, and practical product design for connected healthcare.</p>
        </div>
        <div className="team-grid" data-stagger="100">
          {team.map(({ src, name, role, bio, linkedin }, index) => {
            const isFlipped = flipped === index;
            return (
              <div className="tmember" key={name}>
                <button
                  type="button"
                  className={`photo-flip ${isFlipped ? 'is-flipped' : ''}`}
                  aria-pressed={isFlipped}
                  aria-label={`${name} — tap to ${isFlipped ? 'hide' : 'read'} bio`}
                  onClick={() => setFlipped(isFlipped ? null : index)}
                >
                  <div className="flip-inner">
                    <div className="flip-front photo">
                      <img src={src} alt={name} />
                      <span className="flip-cue">i</span>
                    </div>
                    <div className="flip-back">
                      <p className="tbio">{bio}</p>
                      <a
                        href={linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="tlink"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <LinkedInIcon /> Connect
                      </a>
                    </div>
                  </div>
                </button>
                <h4 className="ph-name">{name}</h4>
                <div className="role">{role}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Spotlight() {
  const spotRef = useRef(null);
  useSpotNet(spotRef);
  return (
    <section id="demo" className="spotlight section-pad">
      <span className="spot-glow" />
      <canvas id="spotnet" ref={spotRef} />
      <div className="wrap">
        <div data-reveal>
          <span className="eyebrow justify-center">Closing Statement</span>
          <h2 className="h-xl">A Step Toward Smarter Healthcare Operations</h2>
          <p>FlowSync represents a step toward smarter healthcare operations by combining connected technologies, operational intelligence, and data-driven insights into a unified platform.</p>
          <p>Through continuous innovation and intelligent healthcare solutions, FlowSync aims to support more efficient workflows, enhanced operational visibility, and improved healthcare experiences.</p>
          <div className="spot-actions">
            <a href="mailto:react@kct.ac.in" className="btn btn-primary btn-lg">Request a Demo <ArrowIcon /></a>
            <a href="mailto:react@kct.ac.in" className="btn btn-ghost btn-lg">Contact Us</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const columns = [
    ['Platform', ['What is FlowSync', 'How It Works', 'Features', 'Technology']],
    ['Solutions', ['Hospitals', 'OPD', 'Diagnostics', 'Emergency']],
    ['Company', ['About', 'Careers', 'News', 'Contact']],
    ['Legal', ['Privacy', 'Terms', 'Security', 'Compliance']],
  ];
  return (
    <footer className="footer">
      <span className="footer-glow" />
      <div className="wrap">
        <div className="footer-top">
          <div className="foot-brand-col">
            <div className="foot-brand"><Logo small />FlowSync</div>
            <p className="foot-desc">Smarter healthcare operations through connected intelligence.</p>
          </div>
          {columns.map(([title, links]) => (
            <div className="foot-col" key={title}>
              <h4>{title}</h4>
              <ul>{links.map((link) => <li key={link}><a href="#home">{link}</a></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>Copyright 2026 FlowSync. All rights reserved.</span>
          <span>react@kct.ac.in</span>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  useInteractions();
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <CompareSection />
        <Features />
        <Dashboard />
        <Team />
        <Spotlight />
      </main>
      <Footer />
    </>
  );
}
