(() => {
    function setFooterEyeTracking(e) {
        const pupilL = document.getElementById('footer-pupilL');
        const pupilR = document.getElementById('footer-pupilR');
        const highL = document.getElementById('footer-highL');
        const highR = document.getElementById('footer-highR');
        if (!pupilL || !pupilR || !highL || !highR) return;

        const x = (e.clientX / window.innerWidth - 0.5) * 12;
        const y = (e.clientY / window.innerHeight - 0.5) * 12;
        const translate = `translate(${x}, ${y})`;

        pupilL.setAttribute('transform', translate);
        pupilR.setAttribute('transform', translate);
        highL.setAttribute('transform', translate);
        highR.setAttribute('transform', translate);
    }

    function setupFooterTracking() {
        window.addEventListener('mousemove', setFooterEyeTracking);
        window.addEventListener('touchmove', (e) => {
            if (e.touches.length) setFooterEyeTracking(e.touches[0]);
        }, { passive: true });
    }

    function setupBurgerMenu() {
        const navToggle = document.getElementById('nav-toggle');
        const navLinks = document.querySelector('#top-nav .nav-links');
        const navOverlay = document.getElementById('nav-overlay');
        if (!navToggle || !navLinks || !navOverlay) return;

        const closeMenu = () => {
            navLinks.classList.remove('open');
            navOverlay.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        };

        navToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');
            navOverlay.classList.toggle('active', isOpen);
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        navOverlay.addEventListener('click', closeMenu);
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) closeMenu();
        });
        document.querySelectorAll('#top-nav .nav-links a').forEach((link) => {
            link.addEventListener('click', closeMenu);
        });
    }

    function markActiveNav() {
        const links = document.querySelectorAll('#top-nav .nav-links a');
        if (!links.length) return;

        const path = window.location.pathname.split('/').pop() || 'index.html';

        links.forEach((link) => {
            const href = link.getAttribute('href');
            if (!href) return;

            const hrefFile = href.split('/').pop();
            const isActive = hrefFile === path || (hrefFile === 'index.html' && path === '');

            if (isActive) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
    }

    function setupFooterMorph() {
        const path = window.location.pathname.split('/').pop() || 'index.html';
        if (path !== 'skills.html' && path !== 'work.html') return;

        const footerCatLink = document.querySelector('.footer-cat-link');
        if (!footerCatLink) return;

        const footerEls = {
            pupilL: document.getElementById('footer-pupilL'),
            pupilR: document.getElementById('footer-pupilR'),
            highL: document.getElementById('footer-highL'),
            highR: document.getElementById('footer-highR'),
            baseL: document.getElementById('footer-baseL'),
            baseR: document.getElementById('footer-baseR'),
            pathL: document.getElementById('footer-pathL'),
            pathR: document.getElementById('footer-pathR'),
            nose: document.getElementById('footer-nose'),
            tongue: document.getElementById('footer-tongue'),
            tongueSlit: document.getElementById('footer-tongueSlit'),
            gradL1: document.getElementById('footer-gradLeftMid'),
            gradL2: document.getElementById('footer-gradLeftEnd'),
            gradR1: document.getElementById('footer-gradRightMid'),
            gradR2: document.getElementById('footer-gradRightEnd')
        };

        if (!footerEls.pupilL || !footerEls.pupilR || !footerEls.highL || !footerEls.highR || !footerEls.baseL || !footerEls.baseR || !footerEls.pathL || !footerEls.pathR || !footerEls.nose || !footerEls.tongue || !footerEls.tongueSlit || !footerEls.gradL1 || !footerEls.gradL2 || !footerEls.gradR1 || !footerEls.gradR2) {
            return;
        }

        const state = {
            angry: { dLeft: "M 175 146 C 130 110, 60 90, 35 100 C 30 150, 110 185, 175 146 Z", dRight: "M 225 146 C 270 110, 340 90, 365 100 C 370 150, 290 185, 225 146 Z", dNose: "M 190 196 C 195 192, 205 192, 210 196 L 200 206 Z", pupilLX: 103, pupilLY: 118, pupilRX: 292, pupilRY: 118, pupilRXval: 7.5, pupilRYval: 20, highLX: 115, highLY: 130, highRX: 280, highRY: 130, highR: 2.5, rotL: -5, rotR: 5, colorMid: '#ffaa00', colorEnd: '#cc3300' },
            blep: { dLeft: "M 170 140 C 170 75, 60 75, 60 140 C 60 205, 170 205, 170 140 Z", dRight: "M 230 140 C 230 75, 340 75, 340 140 C 340 205, 230 205, 230 140 Z", dNose: "M 190 194 C 196 189, 204 189, 210 194 L 200 204 Z", pupilLX: 115, pupilLY: 140, pupilRX: 285, pupilRY: 140, pupilRXval: 38, pupilRYval: 38, highLX: 130, highLY: 120, highRX: 300, highRY: 120, highR: 6.5, rotL: 0, rotR: 0, colorMid: '#ffcc00', colorEnd: '#cc6600' }
        };

        const setFooterCatFace = (mode) => {
            const d = state[mode];
            footerEls.baseL.setAttribute('d', d.dLeft);
            footerEls.baseR.setAttribute('d', d.dRight);
            footerEls.pathL.setAttribute('d', d.dLeft);
            footerEls.pathR.setAttribute('d', d.dRight);
            footerEls.nose.setAttribute('d', d.dNose);
            footerEls.nose.setAttribute('fill', mode === 'angry' ? '#4a2e1b' : '#2a1a10');

            footerEls.pupilL.setAttribute('cx', d.pupilLX);
            footerEls.pupilL.setAttribute('cy', d.pupilLY);
            footerEls.pupilL.setAttribute('rx', d.pupilRXval);
            footerEls.pupilL.setAttribute('ry', d.pupilRYval);
            footerEls.pupilR.setAttribute('cx', d.pupilRX);
            footerEls.pupilR.setAttribute('cy', d.pupilRY);
            footerEls.pupilR.setAttribute('rx', d.pupilRXval);
            footerEls.pupilR.setAttribute('ry', d.pupilRYval);
            footerEls.highL.setAttribute('cx', d.highLX);
            footerEls.highL.setAttribute('cy', d.highLY);
            footerEls.highL.setAttribute('r', d.highR);
            footerEls.highR.setAttribute('cx', d.highRX);
            footerEls.highR.setAttribute('cy', d.highRY);
            footerEls.highR.setAttribute('r', d.highR);
            footerEls.gradL1.setAttribute('stop-color', d.colorMid);
            footerEls.gradL2.setAttribute('stop-color', d.colorEnd);
            footerEls.gradR1.setAttribute('stop-color', d.colorMid);
            footerEls.gradR2.setAttribute('stop-color', d.colorEnd);

            if (mode === 'angry') {
                footerEls.tongue.style.opacity = '0';
                footerEls.tongue.style.transform = 'translateY(-25px)';
                footerEls.tongueSlit.style.opacity = '0';
                footerEls.tongueSlit.style.transform = 'translateY(-25px)';
            } else {
                footerEls.tongue.style.opacity = '1';
                footerEls.tongue.style.transform = 'translateY(0)';
                footerEls.tongueSlit.style.opacity = '0.7';
                footerEls.tongueSlit.style.transform = 'translateY(0)';
            }
        };

        footerCatLink.addEventListener('mouseenter', () => setFooterCatFace('angry'));
        footerCatLink.addEventListener('mouseleave', () => setFooterCatFace('blep'));
        footerCatLink.addEventListener('click', (e) => {
            e.preventDefault();
            const curtain = document.getElementById('page-transition-curtain');
            if (curtain) curtain.classList.add('curtain-active');
            setTimeout(() => { window.location.href = 'index.html'; }, 600);
        });

        setFooterCatFace('blep');
    }

    setupFooterTracking();
    setupBurgerMenu();
    markActiveNav();
    setupFooterMorph();
})();