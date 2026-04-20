/* ===== NAV: 스크롤 감지 ===== */
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav__link');

window.addEventListener('scroll', () => {
  nav.classList.toggle('is-scrolled', window.scrollY > 8);
}, { passive: true });

/* ===== NAV: IntersectionObserver 활성 섹션 하이라이트 ===== */
const sections = document.querySelectorAll('section[id]');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    navLinks.forEach(link => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
    });
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(sec => navObserver.observe(sec));

/* ===== SECTION: fadeInUp 등장 애니메이션 ===== */
const fadeTargets = document.querySelectorAll(
  '.section__title, .section__desc, .tab-group, .pattern-split, .card-grid, .accordion, .card'
);

fadeTargets.forEach(el => el.classList.add('fade-in-up'));

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { rootMargin: '0px 0px -60px 0px' });

fadeTargets.forEach(el => fadeObserver.observe(el));

/* ===== TAB: 도안 보는 법 ===== */
const patternTabs = document.querySelectorAll('[data-tab]');
const tabPanels = document.querySelectorAll('.tab-panel');

patternTabs.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;

    patternTabs.forEach(b => b.classList.remove('tab-btn--active'));
    btn.classList.add('tab-btn--active');

    tabPanels.forEach(panel => {
      const isTarget = panel.id === `tab-${target}`;
      panel.classList.toggle('tab-panel--active', isTarget);
    });
  });
});

/* ===== FILTER TAB: 튜토리얼 ===== */
const filterBtns = document.querySelectorAll('#tutorial-tabs [data-filter]');
const tutorialCards = document.querySelectorAll('#tutorial-grid .card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    filterBtns.forEach(b => b.classList.remove('tab-btn--active'));
    btn.classList.add('tab-btn--active');

    tutorialCards.forEach(card => {
      const cat = card.dataset.category;
      const show = filter === 'all' || cat === filter;
      card.style.display = show ? '' : 'none';
      /* 와이드 카드가 숨겨질 때 grid-column 초기화 */
      if (!show && card.classList.contains('card--wide')) {
        card.style.gridColumn = '';
      }
    });
  });
});

/* ===== ACCORDION: FAQ ===== */
const accordionHeaders = document.querySelectorAll('.accordion__header');

accordionHeaders.forEach(header => {
  header.addEventListener('click', () => {
    const isOpen = header.getAttribute('aria-expanded') === 'true';
    const body = header.nextElementSibling;

    /* 열려있는 것 닫기 */
    accordionHeaders.forEach(h => {
      h.setAttribute('aria-expanded', 'false');
      h.nextElementSibling.classList.remove('is-open');
    });

    /* 클릭한 것이 닫혀있었으면 열기 */
    if (!isOpen) {
      header.setAttribute('aria-expanded', 'true');
      body.classList.add('is-open');
    }
  });
});

/* ===== SMOOTH SCROLL: CTA 버튼 ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = nav.offsetHeight + 16;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
