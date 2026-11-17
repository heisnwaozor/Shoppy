'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function OrvantePage() {
  const statementRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Check motion preferences & recorder param
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isRecorder = window.location.search.includes('rec=1');

    // 2. Nav sliding pill
    const navLinks = document.querySelectorAll<HTMLElement>('.nav-link');
    const navSlider = document.getElementById('nav-slider');

    function updateNavSlider(targetEl: HTMLElement) {
      if (!targetEl || !navSlider) return;
      const rect = targetEl.getBoundingClientRect();
      const parentRect = targetEl.parentElement?.getBoundingClientRect();
      if (!parentRect) return;
      navSlider.style.width = rect.width + 'px';
      navSlider.style.transform = `translateX(${rect.left - parentRect.left - 4}px)`;
    }

    navLinks.forEach((link) => {
      link.addEventListener('mouseenter', () => updateNavSlider(link));
      link.addEventListener('click', () => {
        navLinks.forEach((l) => l.classList.remove('active'));
        link.classList.add('active');
        updateNavSlider(link);
      });
    });

    const activeLink = document.querySelector<HTMLElement>('.nav-link.active');
    if (activeLink) updateNavSlider(activeLink);

    // 3. Counter Helper
    function animateCounter(id: string, target: number, duration = 1400) {
      const el = document.getElementById(id);
      if (!el) return;
      if (isReducedMotion) {
        el.innerText = target.toString();
        return;
      }
      let startTime: number | null = null;
      function step(timestamp: number) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        if (el) el.innerText = Math.floor(easeOut * target).toString();
        if (progress < 1) {
          requestAnimationFrame(step);
        } else if (el) {
          el.innerText = target.toString();
        }
      }
      requestAnimationFrame(step);
    }

    // 4. Initial Load Animations
    if (!isReducedMotion && !isRecorder) {
      const heroNav = document.getElementById('hero-nav');
      if (heroNav) {
        heroNav.animate(
          [
            { transform: 'translateY(-20px)', opacity: 0 },
            { transform: 'translateY(0)', opacity: 1 },
          ],
          { duration: 800, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)', fill: 'forwards' }
        );
      }

      const titleLines = document.querySelectorAll<HTMLElement>('.hero-title');
      titleLines.forEach((line, idx) => {
        line.animate(
          [
            { transform: 'translateY(100%)', opacity: 0 },
            { transform: 'translateY(0)', opacity: 1 },
          ],
          {
            duration: 1000,
            delay: idx * 110,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            fill: 'forwards',
          }
        );
      });

      if (photoRef.current) {
        photoRef.current.animate(
          [
            { transform: 'translateY(40px)', filter: 'blur(10px)', opacity: 0 },
            { transform: 'translateY(0)', filter: 'blur(0)', opacity: 1 },
          ],
          { duration: 1300, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)', fill: 'forwards' }
        );
      }

      const heroElements = [
        document.getElementById('hero-date'),
        document.getElementById('hero-contact'),
        document.getElementById('hero-year'),
        document.getElementById('hero-about'),
        document.getElementById('hero-stats'),
        document.getElementById('hero-plate'),
        document.getElementById('hero-growth'),
        document.getElementById('hero-avail'),
        document.getElementById('hero-q'),
        document.getElementById('hero-logos'),
      ].filter(Boolean) as HTMLElement[];

      heroElements.forEach((el, idx) => {
        el.animate(
          [
            { transform: 'translateY(14px)', opacity: 0 },
            { transform: 'translateY(0)', opacity: 1 },
          ],
          {
            duration: 800,
            delay: 200 + idx * 55,
            easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
            fill: 'forwards',
          }
        );
      });

      setTimeout(() => {
        const qProg = document.getElementById('q-progress');
        if (qProg) qProg.style.width = '100%';
      }, 600);

      setTimeout(() => {
        animateCounter('counter-400', 400, 1400);
        animateCounter('counter-230', 230, 1400);
      }, 300);
    } else {
      const qProg = document.getElementById('q-progress');
      if (qProg) qProg.style.width = '100%';
      const c400 = document.getElementById('counter-400');
      if (c400) c400.innerText = '400';
      const c230 = document.getElementById('counter-230');
      if (c230) c230.innerText = '230';
    }

    // 5. Scroll Interaction: Parallax & Word fill
    let trustAnimated = false;
    const wordSpans = Array.from(document.querySelectorAll<HTMLElement>('.word'));

    function handleScroll() {
      if (isReducedMotion || isRecorder) return;
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;

      // Photo drift
      if (photoRef.current && scrollY < window.innerHeight) {
        photoRef.current.style.transform = `translateY(${scrollY * 0.12}px)`;
      }

      // Word fill
      if (statementRef.current && wordSpans.length > 0) {
        const rect = statementRef.current.getBoundingClientRect();
        const winHeight = window.innerHeight;
        const startOffset = winHeight * 0.75;
        const currentDist = winHeight - rect.top - startOffset;
        const progress = Math.max(0, Math.min(1, currentDist / (rect.height * 0.65)));
        const activeIndex = progress * wordSpans.length;

        wordSpans.forEach((span, i) => {
          if (i <= activeIndex - 2) {
            span.style.color = '#f4f4f4';
          } else if (i <= activeIndex) {
            span.style.color = '#bbbbbb';
          } else {
            span.style.color = '#6f6f6f';
          }
        });
      }

      // Trust panel entry
      if (trustRef.current && !trustAnimated) {
        const tRect = trustRef.current.getBoundingClientRect();
        if (tRect.top < window.innerHeight * 0.8) {
          trustAnimated = true;
          animateCounter('counter-56', 56, 1200);
          animateCounter('counter-10', 10, 1000);

          const avatars = document.querySelectorAll<HTMLElement>('.avatar-img');
          avatars.forEach((av, idx) => {
            av.style.transform = 'scale(0.4)';
            av.style.opacity = '0';
            setTimeout(() => {
              av.style.transform = 'scale(1)';
              av.style.opacity = '1';
            }, idx * 60);
          });
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 6. Recorder Mode (?rec=1)
    if (isRecorder) {
      setTimeout(() => {
        let sStart = performance.now();
        function fillStep(now: number) {
          const p = Math.min((now - sStart) / 2900, 1);
          const activeIndex = p * wordSpans.length;
          wordSpans.forEach((span, i) => {
            span.style.color = i <= activeIndex ? '#f4f4f4' : '#6f6f6f';
          });
          if (p < 1) requestAnimationFrame(fillStep);
        }
        requestAnimationFrame(fillStep);
      }, 1300);

      setTimeout(() => {
        animateCounter('counter-56', 56, 1700);
        animateCounter('counter-10', 10, 1500);
        const avatars = document.querySelectorAll<HTMLElement>('.avatar-img');
        avatars.forEach((av, idx) => {
          setTimeout(() => {
            av.style.transform = 'scale(1)';
            av.style.opacity = '1';
          }, idx * 60);
        });
      }, 3500);

      setTimeout(() => {
        const awardsCard = document.getElementById('awards-card');
        if (awardsCard) awardsCard.style.transform = 'translateY(-6px)';
      }, 5300);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* External Fonts Link */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@100..900&family=Archivo:wdth,wght@62..125,100..900&display=swap"
      />

      <div className="orvante-root">
        {/* ====================================================================
             HERO SECTION (1440 x 938u)
             ==================================================================== */}
        <section className="hero" id="hero">
          <div className="hero-canvas">
            
            {/* Model Photo in Dark Technical Jacket */}
            <div className="hero-photo-wrap" ref={photoRef} id="hero-photo">
              <img
                src="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/7dc8b8f3-4ccb-4599-8ce4-7f7c7881bad9.webp"
                alt="Orvante Studio Model in Technical Jacket"
                className="hero-photo"
              />
            </div>

            {/* Segmented Pill Navigation */}
            <nav className="hero-nav" id="hero-nav" aria-label="Main Navigation">
              <div className="nav-slider" id="nav-slider"></div>
              <a href="#hero" className="nav-link active">Home</a>
              <a href="#statement" className="nav-link">Studio</a>
              <a href="#trust" className="nav-link">Works</a>
              <Link href="/store" className="nav-link store-link">
                <span>Shop Drop</span>
                <span className="store-pill">Solana</span>
              </Link>
            </nav>

            {/* Top Right: Date & Contact */}
            <div className="hero-date" id="hero-date">Sunday / 17.06 – 27 June 2026</div>
            <Link href="/store" className="hero-contact-btn" id="hero-contact">
              <span>Contact Us</span>
              <span>↗</span>
            </Link>

            {/* Title: PURE / DESIGN ('25) */}
            <div className="hero-title-group" id="hero-title-group">
              <div className="title-line-mask">
                <span className="hero-title">PURE</span>
              </div>
              <div className="title-line-mask">
                <span className="hero-title">DESIGN</span>
              </div>
            </div>
            <div className="hero-year" id="hero-year">(’25)</div>

            {/* About Copy */}
            <div className="hero-about" id="hero-about">
              <div className="about-tag">(ABOUT)</div>
              <p className="about-desc">
                Building stunning website that every brand deserves to be seen.
              </p>
              <Link href="/store" className="hero-book-btn">
                <span>Book A Call</span>
                <span>↗</span>
              </Link>
            </div>

            {/* Stats Frame (341 x 208u) */}
            <div className="hero-stats-frame" id="hero-stats">
              {/* Dark Card */}
              <div className="stats-card-dark">
                <div>
                  <div className="stats-card-dark-title">
                    <span id="counter-400">0</span>+<br />Trusted Partner
                  </div>
                  <div className="stats-partner-glyphs">
                    <span className="partner-glyph">▲ Halcyon</span>
                    <span className="partner-glyph">◆ Ostra</span>
                    <span className="partner-glyph">■ Fenwick</span>
                    <span className="partner-glyph">● Monolo</span>
                    <span className="partner-glyph">✶ Kitefly</span>
                    <span className="partner-glyph">▼ Arbor</span>
                  </div>
                </div>
                <Link href="/store" className="stats-bar-btn">
                  <span>Book a call</span>
                  <span>↗</span>
                </Link>
              </div>

              {/* Photo Card (Cap photo) */}
              <div className="stats-card-photo">
                <img
                  src="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/a9d3641f-d629-46e5-8d2d-5f75386b803d.webp"
                  alt="Studio Feed Young Man in Black Cap"
                  className="stats-card-bg"
                />
                <div className="stats-photo-top">
                  <span>Studio Feed</span>
                  <span>05/06</span>
                </div>
                <div className="stats-photo-bottom">
                  <div className="stats-photo-num"><span id="counter-230">0</span>+</div>
                  <div className="stats-photo-sub">Projects successfully launched worldwide</div>
                </div>
              </div>
            </div>

            {/* Brand Plate over Man's Back (364 x 73u) */}
            <div className="hero-brand-plate" id="hero-plate">
              <div className="brand-mark">
                <svg className="mark-tri" viewBox="0 0 24 24">
                  <polygon points="12,2 22,22 2,22" />
                </svg>
              </div>
              <div className="brand-plate-name">ORVANTE</div>
              <div className="brand-menu-icon" aria-label="Menu">
                <div className="brand-menu-line"></div>
                <div className="brand-menu-line"></div>
              </div>
            </div>

            {/* Logos across jacket */}
            <div className="hero-logos-row" id="hero-logos">
              <span>Lumon</span>
              <span>·</span>
              <span>Paperfold</span>
              <span>·</span>
              <span>Northwind</span>
            </div>

            {/* Right Column: True Growth Pill */}
            <div className="hero-growth-pill" id="hero-growth">
              <div className="growth-check-disc">✓</div>
              <span>True Growth</span>
            </div>

            {/* Right Column: Availability */}
            <div className="hero-avail" id="hero-avail">
              <div>We’re available</div>
              <div><span className="avail-dot">●</span>for you</div>
            </div>

            {/* Right Column: Out Now / Q Industrial Card */}
            <div className="hero-q-card" id="hero-q">
              <div className="q-card-meta">
                <span>Out Now</span>
                <span>[2025]</span>
              </div>
              <div className="q-card-image-box">
                <img
                  src="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/9340eb08-877d-4d08-91fb-b70754541d98.webp"
                  alt="Q Industrial Monochrome Motion Blur"
                  className="q-card-img"
                />
                <div className="q-card-btn">↗</div>
              </div>
              <div className="q-card-progress">
                <div className="q-card-progress-bar" id="q-progress"></div>
              </div>
            </div>

          </div>
        </section>

        {/* ====================================================================
             BAR SECTION (111u)
             ==================================================================== */}
        <div className="bar-section">
          <div className="bar-inner">
            <div>EST <span className="bar-year-grey">2019</span></div>
            <a href="#statement" className="bar-scroll">
              <span>SCROLL DOWN</span>
              <div className="bar-arrow-circle">↓</div>
            </a>
            <div><span className="bar-live-grey">LIVE IN DETAILS</span></div>
          </div>
        </div>

        {/* ====================================================================
             STATEMENT SECTION (Grey -> White Scroll Fill)
             ==================================================================== */}
        <section className="statement-section" id="statement" ref={statementRef}>
          <div className="statement-text">
            {`We believe the strongest brands are built through strategy, not just aesthetics. Every campaign is designed to capture attention, inspire action, and create lasting business growth.`
              .split(/\s+/)
              .map((word, i) => (
                <span key={i} className="word">
                  {word}{' '}
                </span>
              ))}
          </div>

          <div className="statement-subline">
            Performance-driven marketing, from<br />
            strategy to execution. <span className="subline-grey">Built for growing brands.</span>
          </div>
        </section>

        {/* ====================================================================
             TRUST PANEL SECTION
             ==================================================================== */}
        <section className="trust-section" id="trust" ref={trustRef}>
          <div className="trust-panel" id="trust-panel">
            
            {/* Overlapping Frosted Tiles */}
            <div className="trust-tile-asterisk">✶</div>
            <div className="trust-tile-dots">
              <div className="grid-dot"></div>
              <div className="grid-dot"></div>
              <div className="grid-dot"></div>
              <div className="grid-dot"></div>
            </div>

            {/* Left Column */}
            <div className="trust-left">
              <h2 className="trust-heading">
                Trusted by<br />
                Hundreds of<br />
                Growing<br />
                Businesses
              </h2>
              <p className="trust-para">
                Partnering with ambitious founders and global market leaders to engineer enduring brands and memorable digital experiences.
              </p>
            </div>

            {/* Right Cards Row */}
            <div className="trust-cards-row">
              
              {/* Card 1: 56M+ & Avatars */}
              <div className="trust-card card-avatars">
                <div className="avatars-grid" id="avatars-grid">
                  <img className="avatar-img" src="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/300f41b1-3de5-4153-afde-06e15e753ad0.webp" alt="Avatar 1" />
                  <img className="avatar-img" src="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/bfff4cdf-4fda-4491-ada6-62f3b6236492.webp" alt="Avatar 2" />
                  <img className="avatar-img" src="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/943b121e-fe72-479f-93ae-aa8cd1650f69.webp" alt="Avatar 3" />
                  <img className="avatar-img" src="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/c673306f-2b81-4c3d-a7d2-3df61d481abb.webp" alt="Avatar 4" />
                  <img className="avatar-img" src="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/2e4fcf11-d0fc-4f31-8f7a-dfe751777141.webp" alt="Avatar 5" />
                  <img className="avatar-img" src="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/ab458fcd-4c2c-426f-8213-21cc3c7274be.webp" alt="Avatar 6" />
                  <img className="avatar-img" src="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/c1fcd833-5ac9-41e9-9352-fead7e64fa24.webp" alt="Avatar 7" />
                  <img className="avatar-img" src="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/4c2b3307-e555-4633-949c-efd3b7e09d82.webp" alt="Avatar 8" />
                </div>
                <div className="avatars-bottom">
                  <div className="avatars-stat-num"><span id="counter-56">0</span>M+</div>
                  <div className="avatars-stat-label">Global Collaborations</div>
                </div>
              </div>

              {/* Card 2: 10+ Industry Awards */}
              <div className="trust-card card-awards" id="awards-card">
                <div>
                  <div className="awards-top-num"><span id="counter-10">0</span>+</div>
                  <div className="awards-top-label">Industry Awards</div>
                </div>
                <div className="awards-laurel-badge">
                  <svg className="laurel-svg" viewBox="0 0 100 60">
                    <path d="M20,50 C15,40 10,25 25,10 C20,20 22,35 32,45 Z" />
                    <path d="M80,50 C85,40 90,25 75,10 C80,20 78,35 68,45 Z" />
                    <circle cx="50" cy="30" r="12" fill="none" stroke="#ffffff" stroke-width="2" />
                  </svg>
                  <div className="laurel-text">BEST GROWTH PARTNER 2026</div>
                </div>
                <div className="awards-note">
                  Recognized internationally for transformative digital identity and market execution.
                </div>
              </div>

              {/* Card 3: Portrait Card (Cut off by right panel edge) */}
              <div className="trust-card card-portrait">
                <img
                  src="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/addecc7d-666f-4342-8290-ed7f7cbbffd6.webp"
                  alt="Side Profile Portrait"
                  className="card-portrait-img"
                />
              </div>

            </div>

          </div>
        </section>
      </div>

      <style jsx global>{`
        :root {
          --u: min(100vw / 1440, 1.333px);
          --c-paper: #dadada;
          --c-ink: #111111;
          --c-black: #000000;
          --c-text: #f4f4f4;
          --c-stmt-grey: #6f6f6f;
          --border-14: rgba(255, 255, 255, 0.14);
          --border-28: rgba(255, 255, 255, 0.28);
          --font-ui: 'Inter Tight', -apple-system, BlinkMacSystemFont, sans-serif;
          --font-display: 'Archivo', sans-serif;
        }

        @media (max-width: 760px) {
          :root {
            --u: calc(100vw / 390);
          }
        }

        .orvante-root {
          width: 100%;
          background-color: var(--c-black);
          color: var(--c-text);
          font-family: var(--font-ui);
          overflow-x: hidden;
        }

        .hero {
          position: relative;
          width: 100%;
          height: calc(938 * var(--u));
          background-color: var(--c-paper);
          color: var(--c-ink);
          overflow: hidden;
        }

        .hero-canvas {
          position: relative;
          width: 100%;
          max-width: calc(1440 * var(--u));
          height: 100%;
          margin: 0 auto;
        }

        .hero-photo-wrap {
          position: absolute;
          left: calc(338 * var(--u));
          top: calc(-86 * var(--u));
          width: calc(764 * var(--u));
          height: calc(1024 * var(--u));
          z-index: 1;
          pointer-events: none;
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%);
          will-change: transform;
        }

        .hero-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .hero-nav {
          position: absolute;
          left: calc(57 * var(--u));
          top: calc(61 * var(--u));
          height: calc(48 * var(--u));
          background: #ffffff;
          border-radius: 9999px;
          padding: calc(4 * var(--u));
          display: flex;
          align-items: center;
          z-index: 20;
          box-shadow: 0 calc(2 * var(--u)) calc(12 * var(--u)) rgba(0,0,0,0.06);
        }

        .nav-slider {
          position: absolute;
          top: calc(4 * var(--u));
          left: calc(4 * var(--u));
          height: calc(40 * var(--u));
          background: #111111;
          border-radius: 9999px;
          transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), width 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          z-index: 1;
          pointer-events: none;
        }

        .nav-link {
          position: relative;
          z-index: 2;
          padding: 0 calc(18 * var(--u));
          height: calc(40 * var(--u));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: calc(14 * var(--u));
          font-weight: 500;
          color: #6f6f6f;
          transition: color 0.25s ease;
          cursor: pointer;
        }

        .nav-link.active,
        .nav-link:hover {
          color: #ffffff;
        }

        .store-pill {
          font-size: calc(9 * var(--u));
          padding: calc(1 * var(--u)) calc(5 * var(--u));
          border-radius: calc(4 * var(--u));
          background: #14F195;
          color: #000000;
          font-weight: 700;
          margin-left: calc(4 * var(--u));
        }

        .hero-date {
          position: absolute;
          left: calc(1038 * var(--u));
          top: calc(70 * var(--u));
          font-size: calc(13 * var(--u));
          font-weight: 500;
          color: #6f6f6f;
          z-index: 20;
          letter-spacing: -0.01em;
        }

        .hero-contact-btn {
          position: absolute;
          left: calc(1237 * var(--u));
          top: calc(63 * var(--u));
          width: calc(144 * var(--u));
          height: calc(46 * var(--u));
          background: #111111;
          color: #ffffff;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: calc(6 * var(--u));
          font-size: calc(14 * var(--u));
          font-weight: 500;
          z-index: 20;
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .hero-contact-btn:hover {
          transform: translateY(-1px);
          background: #000000;
        }

        .hero-title-group {
          position: absolute;
          left: calc(57 * var(--u));
          top: calc(246 * var(--u));
          z-index: 10;
        }

        .title-line-mask {
          overflow: hidden;
          display: block;
        }

        .hero-title {
          font-family: var(--font-display);
          font-size: calc(90 * var(--u));
          line-height: 0.86;
          font-variation-settings: 'wdth' 104, 'wght' 640;
          letter-spacing: -0.06em;
          color: #111111;
          text-transform: uppercase;
          display: block;
        }

        .hero-year {
          position: absolute;
          left: calc(339 * var(--u));
          top: calc(272 * var(--u));
          font-family: var(--font-ui);
          font-size: calc(18 * var(--u));
          font-weight: 500;
          color: #6f6f6f;
          z-index: 10;
        }

        .hero-about {
          position: absolute;
          left: calc(57 * var(--u));
          top: calc(458 * var(--u));
          width: calc(270 * var(--u));
          z-index: 10;
        }

        .about-tag {
          font-size: calc(13 * var(--u));
          font-weight: 600;
          color: #111111;
          display: flex;
          align-items: center;
          gap: calc(6 * var(--u));
          margin-bottom: calc(14 * var(--u));
        }

        .about-tag::before {
          content: '●';
          font-size: calc(9 * var(--u));
          color: #111111;
        }

        .about-desc {
          font-size: calc(14 * var(--u));
          line-height: 1.4;
          color: #444444;
          margin-bottom: calc(24 * var(--u));
          font-weight: 450;
        }

        .hero-book-btn {
          width: calc(140 * var(--u));
          height: calc(44 * var(--u));
          background: #111111;
          color: #ffffff;
          border-radius: 9999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: calc(6 * var(--u));
          font-size: calc(13 * var(--u));
          font-weight: 500;
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .hero-book-btn:hover {
          transform: translateY(-1px);
          background: #000000;
        }

        .hero-stats-frame {
          position: absolute;
          left: calc(57 * var(--u));
          top: calc(693 * var(--u));
          width: calc(341 * var(--u));
          height: calc(208 * var(--u));
          background: #cdcdcd;
          border-radius: calc(12 * var(--u));
          padding: calc(10 * var(--u));
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: calc(10 * var(--u));
          z-index: 10;
        }

        .stats-card-dark {
          background: #151515;
          color: #ffffff;
          border-radius: calc(8 * var(--u));
          padding: calc(12 * var(--u));
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .stats-card-dark-title {
          font-size: calc(16 * var(--u));
          font-weight: 600;
          font-family: var(--font-display);
          font-variation-settings: 'wdth' 100, 'wght' 600;
          line-height: 1.15;
        }

        .stats-partner-glyphs {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: calc(6 * var(--u));
          margin: calc(8 * var(--u)) 0;
          opacity: 0.8;
        }

        .partner-glyph {
          font-size: calc(9 * var(--u));
          font-family: var(--font-ui);
          letter-spacing: -0.02em;
          white-space: nowrap;
          color: #aaaaaa;
        }

        .stats-bar-btn {
          height: calc(26 * var(--u));
          background: #ffffff;
          color: #111111;
          border-radius: 9999px;
          font-size: calc(10 * var(--u));
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: calc(4 * var(--u));
        }

        .stats-card-photo {
          position: relative;
          border-radius: calc(8 * var(--u));
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: calc(10 * var(--u));
          color: #ffffff;
        }

        .stats-card-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(1) brightness(0.65);
          z-index: 1;
        }

        .stats-photo-top {
          position: relative;
          z-index: 2;
          font-size: calc(10 * var(--u));
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid rgba(255,255,255,0.3);
          padding-top: calc(4 * var(--u));
        }

        .stats-photo-bottom {
          position: relative;
          z-index: 2;
          text-align: right;
        }

        .stats-photo-num {
          font-size: calc(18 * var(--u));
          font-weight: 700;
          font-family: var(--font-display);
          font-variation-settings: 'wdth' 100, 'wght' 700;
          line-height: 1;
        }

        .stats-photo-sub {
          font-size: calc(9 * var(--u));
          line-height: 1.2;
          color: #cccccc;
          margin-top: calc(2 * var(--u));
        }

        .hero-growth-pill {
          position: absolute;
          left: calc(1216 * var(--u));
          top: calc(258 * var(--u));
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.7);
          border-radius: 9999px;
          padding: calc(6 * var(--u)) calc(14 * var(--u)) calc(6 * var(--u)) calc(8 * var(--u));
          display: flex;
          align-items: center;
          gap: calc(8 * var(--u));
          font-size: calc(13 * var(--u));
          font-weight: 500;
          color: #111111;
          z-index: 15;
        }

        .growth-check-disc {
          width: calc(20 * var(--u));
          height: calc(20 * var(--u));
          border-radius: 50%;
          background: #111111;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: calc(10 * var(--u));
        }

        .hero-avail {
          position: absolute;
          right: calc(57 * var(--u));
          top: calc(442 * var(--u));
          text-align: right;
          font-size: calc(13 * var(--u));
          line-height: 1.4;
          font-weight: 500;
          color: #333333;
          z-index: 15;
        }

        .avail-dot {
          display: inline-block;
          color: #111111;
          margin-right: calc(4 * var(--u));
        }

        .hero-q-card {
          position: absolute;
          right: calc(57 * var(--u));
          top: calc(510 * var(--u));
          width: calc(190 * var(--u));
          z-index: 15;
        }

        .q-card-meta {
          display: flex;
          justify-content: space-between;
          font-size: calc(11 * var(--u));
          font-weight: 500;
          color: #444444;
          margin-bottom: calc(6 * var(--u));
          text-transform: uppercase;
        }

        .q-card-image-box {
          position: relative;
          width: 100%;
          height: calc(196 * var(--u));
          border-radius: calc(10 * var(--u));
          overflow: hidden;
          background: #000;
          cursor: pointer;
        }

        .q-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 62% 45%;
          transform: scale(1.55);
          transition: transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .q-card-image-box:hover .q-card-img {
          transform: scale(1.68);
        }

        .q-card-btn {
          position: absolute;
          right: calc(10 * var(--u));
          top: calc(10 * var(--u));
          width: calc(34 * var(--u));
          height: calc(34 * var(--u));
          border-radius: 50%;
          background: rgba(255,255,255,0.4);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-size: calc(14 * var(--u));
          transition: transform 0.3s ease;
          z-index: 2;
        }

        .q-card-image-box:hover .q-card-btn {
          transform: rotate(45deg);
        }

        .q-card-progress {
          width: 100%;
          height: calc(2 * var(--u));
          background: rgba(255, 255, 255, 0.35);
          margin-top: calc(8 * var(--u));
          border-radius: 9999px;
          overflow: hidden;
        }

        .q-card-progress-bar {
          width: 0%;
          height: 100%;
          background: #ffffff;
          transition: width 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .hero-brand-plate {
          position: absolute;
          left: calc(532 * var(--u));
          top: calc(444 * var(--u));
          width: calc(364 * var(--u));
          height: calc(73 * var(--u));
          background: rgba(18, 18, 18, 0.72);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: calc(14 * var(--u));
          padding: 0 calc(24 * var(--u));
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #ffffff;
          z-index: 12;
          box-shadow: 0 calc(8 * var(--u)) calc(30 * var(--u)) rgba(0,0,0,0.3);
        }

        .brand-mark {
          display: flex;
          align-items: center;
          gap: calc(4 * var(--u));
        }

        .mark-tri {
          width: calc(14 * var(--u));
          height: calc(14 * var(--u));
          fill: #ffffff;
        }

        .brand-plate-name {
          font-family: var(--font-display);
          font-size: calc(25 * var(--u));
          font-variation-settings: 'wdth' 125, 'wght' 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .brand-menu-icon {
          display: flex;
          flex-direction: column;
          gap: calc(4 * var(--u));
          cursor: pointer;
        }

        .brand-menu-line {
          width: calc(18 * var(--u));
          height: calc(1.5 * var(--u));
          background: #ffffff;
        }

        .hero-logos-row {
          position: absolute;
          left: calc(490 * var(--u));
          top: calc(864 * var(--u));
          display: flex;
          align-items: center;
          gap: calc(24 * var(--u));
          color: rgba(255, 255, 255, 0.85);
          font-family: var(--font-display);
          font-size: calc(14 * var(--u));
          font-variation-settings: 'wdth' 110, 'wght' 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          z-index: 10;
          text-shadow: 0 1px 4px rgba(0,0,0,0.4);
        }

        .bar-section {
          width: 100%;
          height: calc(111 * var(--u));
          background-color: var(--c-black);
          border-bottom: 1px solid var(--border-14);
          display: flex;
          align-items: center;
          color: var(--c-text);
          font-family: var(--font-display);
          font-size: calc(14 * var(--u));
          font-variation-settings: 'wdth' 115, 'wght' 500;
          letter-spacing: 0.05em;
        }

        .bar-inner {
          width: 100%;
          max-width: calc(1302 * var(--u));
          margin: 0 auto;
          padding: 0 calc(20 * var(--u));
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .bar-year-grey {
          color: var(--c-stmt-grey);
        }

        .bar-scroll {
          display: flex;
          align-items: center;
          gap: calc(10 * var(--u));
          cursor: pointer;
        }

        .bar-arrow-circle {
          width: calc(28 * var(--u));
          height: calc(28 * var(--u));
          border-radius: 50%;
          background: #ffffff;
          color: #000000;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: calc(12 * var(--u));
        }

        .bar-live-grey {
          color: var(--c-stmt-grey);
        }

        .statement-section {
          width: 100%;
          background-color: var(--c-black);
          padding-top: calc(170 * var(--u));
          padding-bottom: calc(230 * var(--u));
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .statement-text {
          width: calc(830 * var(--u));
          max-width: 90vw;
          font-size: calc(52 * var(--u));
          line-height: 1.33;
          letter-spacing: -0.028em;
          font-weight: 500;
          color: var(--c-stmt-grey);
          margin: 0 auto;
        }

        .statement-text .word {
          display: inline-block;
          transition: color 0.15s ease;
          color: var(--c-stmt-grey);
        }

        .statement-subline {
          margin-top: calc(150 * var(--u));
          font-size: calc(23 * var(--u));
          line-height: 1.4;
          font-weight: 450;
          color: #f4f4f4;
        }

        .subline-grey {
          color: var(--c-stmt-grey);
          font-style: italic;
        }

        .trust-section {
          width: 100%;
          background-color: var(--c-black);
          padding-bottom: calc(150 * var(--u));
          display: flex;
          justify-content: center;
        }

        .trust-panel {
          position: relative;
          width: calc(1302 * var(--u));
          max-width: calc(100vw - calc(40 * var(--u)));
          min-height: calc(429 * var(--u));
          border: 1px solid var(--border-28);
          border-radius: calc(14 * var(--u));
          background: #0d0d0d;
          padding: calc(48 * var(--u)) calc(44 * var(--u));
          display: flex;
          justify-content: space-between;
          align-items: center;
          overflow: hidden;
          gap: calc(30 * var(--u));
        }

        .trust-left {
          position: relative;
          width: calc(420 * var(--u));
          flex-shrink: 0;
        }

        .trust-heading {
          font-size: calc(55 * var(--u));
          line-height: 1.05;
          font-weight: 500;
          letter-spacing: -0.03em;
          color: #ffffff;
          margin-bottom: calc(24 * var(--u));
          position: relative;
        }

        .trust-tile-asterisk {
          position: absolute;
          top: calc(-12 * var(--u));
          right: calc(40 * var(--u));
          width: calc(88 * var(--u));
          height: calc(88 * var(--u));
          border-radius: calc(12 * var(--u));
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-size: calc(32 * var(--u));
          z-index: 5;
        }

        .trust-tile-dots {
          position: absolute;
          bottom: calc(-16 * var(--u));
          left: calc(140 * var(--u));
          width: calc(88 * var(--u));
          height: calc(88 * var(--u));
          border-radius: calc(12 * var(--u));
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          place-items: center;
          padding: calc(22 * var(--u));
          z-index: 5;
        }

        .grid-dot {
          width: calc(10 * var(--u));
          height: calc(10 * var(--u));
          border-radius: 50%;
          background: #ffffff;
        }

        .trust-para {
          font-size: calc(14.5 * var(--u));
          line-height: 1.5;
          color: #888888;
          max-width: calc(340 * var(--u));
        }

        .trust-cards-row {
          display: flex;
          align-items: center;
          gap: calc(16 * var(--u));
          position: relative;
        }

        .trust-card {
          height: calc(326 * var(--u));
          border-radius: calc(8 * var(--u));
          padding: calc(24 * var(--u));
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          flex-shrink: 0;
        }

        .trust-card:hover {
          transform: translateY(calc(-6 * var(--u)));
        }

        .card-avatars {
          width: calc(293 * var(--u));
          background-color: #d6d6d6;
          color: #111111;
        }

        .avatars-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: calc(10 * var(--u));
          margin-bottom: calc(20 * var(--u));
        }

        .avatar-img {
          width: calc(48 * var(--u));
          height: calc(48 * var(--u));
          border-radius: 50%;
          object-fit: cover;
          filter: grayscale(1);
          border: 2px solid #ffffff;
          transform: scale(1);
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .avatars-bottom {
          margin-top: auto;
        }

        .avatars-stat-num {
          font-family: var(--font-display);
          font-size: calc(43 * var(--u));
          font-variation-settings: 'wdth' 100, 'wght' 700;
          line-height: 1;
          letter-spacing: -0.04em;
        }

        .avatars-stat-label {
          font-size: calc(13 * var(--u));
          font-weight: 500;
          color: #555555;
          margin-top: calc(4 * var(--u));
        }

        .card-awards {
          width: calc(298 * var(--u));
          background-color: #262626;
          color: #ffffff;
          border: 1px solid rgba(255,255,255,0.06);
        }

        .awards-top-num {
          font-family: var(--font-display);
          font-size: calc(36 * var(--u));
          font-variation-settings: 'wdth' 100, 'wght' 700;
          line-height: 1;
        }

        .awards-top-label {
          font-size: calc(13 * var(--u));
          color: #999999;
          margin-top: calc(4 * var(--u));
        }

        .awards-laurel-badge {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: calc(20 * var(--u)) 0;
          text-align: center;
        }

        .laurel-svg {
          width: calc(64 * var(--u));
          height: calc(40 * var(--u));
          fill: #ffffff;
          margin-bottom: calc(8 * var(--u));
        }

        .laurel-text {
          font-family: var(--font-display);
          font-size: calc(10 * var(--u));
          font-variation-settings: 'wdth' 115, 'wght' 600;
          letter-spacing: 0.14em;
          color: #ffffff;
        }

        .awards-note {
          font-size: calc(12 * var(--u));
          line-height: 1.35;
          color: #888888;
        }

        .card-portrait {
          width: calc(200 * var(--u));
          padding: 0;
          overflow: hidden;
          border-radius: calc(8 * var(--u));
          background: #111111;
        }

        .card-portrait-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(1);
        }

        @media (max-width: 760px) {
          .hero {
            height: auto;
            min-height: 100vh;
            padding-bottom: calc(60 * var(--u));
          }

          .hero-nav {
            left: calc(20 * var(--u));
            top: calc(24 * var(--u));
            height: calc(42 * var(--u));
          }

          .nav-slider {
            height: calc(34 * var(--u));
          }

          .nav-link {
            padding: 0 calc(12 * var(--u));
            font-size: calc(12 * var(--u));
          }

          .hero-date {
            display: none;
          }

          .hero-contact-btn {
            left: auto;
            right: calc(20 * var(--u));
            top: calc(24 * var(--u));
            width: calc(40 * var(--u));
            height: calc(40 * var(--u));
            border-radius: 50%;
            padding: 0;
            font-size: 0;
          }

          .hero-contact-btn::after {
            content: '↗';
            font-size: calc(18 * var(--u));
          }

          .hero-title-group {
            left: calc(20 * var(--u));
            top: calc(100 * var(--u));
            position: relative;
          }

          .hero-title {
            font-size: calc(62 * var(--u));
          }

          .hero-year {
            left: calc(230 * var(--u));
            top: calc(118 * var(--u));
          }

          .hero-about {
            left: calc(20 * var(--u));
            top: auto;
            position: relative;
            margin-top: calc(30 * var(--u));
            width: calc(350 * var(--u));
          }

          .hero-photo-wrap {
            position: relative;
            left: 0;
            top: 0;
            width: 100vw;
            height: calc(470 * var(--u));
            margin-top: calc(40 * var(--u));
            -webkit-mask-image: none;
            mask-image: none;
          }

          .hero-brand-plate {
            left: calc(20 * var(--u));
            top: calc(360 * var(--u));
            width: calc(350 * var(--u));
            height: calc(60 * var(--u));
          }

          .hero-logos-row {
            left: calc(20 * var(--u));
            top: calc(435 * var(--u));
            font-size: calc(11 * var(--u));
          }

          .hero-growth-pill {
            left: calc(20 * var(--u));
            top: auto;
            position: relative;
            margin-top: calc(20 * var(--u));
            display: inline-flex;
          }

          .hero-avail {
            position: relative;
            right: auto;
            top: auto;
            text-align: left;
            margin: calc(16 * var(--u)) calc(20 * var(--u));
          }

          .hero-stats-frame {
            position: relative;
            left: calc(20 * var(--u));
            top: auto;
            width: calc(350 * var(--u));
            margin-top: calc(20 * var(--u));
          }

          .hero-q-card {
            position: relative;
            right: auto;
            top: auto;
            width: calc(350 * var(--u));
            margin: calc(24 * var(--u)) calc(20 * var(--u));
          }

          .statement-section {
            padding-top: calc(100 * var(--u));
            padding-bottom: calc(120 * var(--u));
          }

          .statement-text {
            width: 90vw;
            font-size: calc(28 * var(--u));
          }

          .statement-subline {
            margin-top: calc(80 * var(--u));
            font-size: calc(16 * var(--u));
            padding: 0 calc(20 * var(--u));
          }

          .trust-panel {
            flex-direction: column;
            align-items: flex-start;
            height: auto;
            padding: calc(30 * var(--u)) calc(20 * var(--u));
          }

          .trust-left {
            width: 100%;
          }

          .trust-heading {
            font-size: calc(36 * var(--u));
          }

          .trust-tile-dots {
            display: none;
          }

          .trust-cards-row {
            flex-direction: column;
            width: 100%;
            margin-top: calc(30 * var(--u));
          }

          .card-avatars, .card-awards, .card-portrait {
            width: 100%;
            height: auto;
          }

          .card-portrait {
            height: calc(200 * var(--u));
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
          .statement-text .word {
            color: #f4f4f4 !important;
          }
        }
      `}</style>
    </>
  );
}
