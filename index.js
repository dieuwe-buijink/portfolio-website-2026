const state = {
    angry: { dLeft: "M 175 146 C 130 110, 60 90, 35 100 C 30 150, 110 185, 175 146 Z", dRight: "M 225 146 C 270 110, 340 90, 365 100 C 370 150, 290 185, 225 146 Z", dNose: "M 190 196 C 195 192, 205 192, 210 196 L 200 206 Z", pupilLX: 103, pupilLY: 118, pupilRX: 292, pupilRY: 118, pupilRXval: 7.5, pupilRYval: 20, highLX: 115, highLY: 130, highRX: 280, highRY: 130, highR: 2.5, rotL: -5, rotR: 5, blur1: 3, blur2: 10, colorMid: '#ffaa00', colorEnd: '#cc3300' },
    blep: { dLeft: "M 170 140 C 170 75, 60 75, 60 140 C 60 205, 170 205, 170 140 Z", dRight: "M 230 140 C 230 75, 340 75, 340 140 C 340 205, 230 205, 230 140 Z", dNose: "M 190 194 C 196 189, 204 189, 210 194 L 200 204 Z", pupilLX: 115, pupilLY: 140, pupilRX: 285, pupilRY: 140, pupilRXval: 38, pupilRYval: 38, highLX: 130, highLY: 120, highRX: 300, highRY: 120, highR: 6.5, rotL: 0, rotR: 0, blur1: 5, blur2: 15, colorMid: '#ffcc00', colorEnd: '#cc6600' }
};

const els = {
    cat: document.getElementById('cat-container'), catSvg: document.getElementById('cat-svg'),
    baseL: document.getElementById('baseL'), baseR: document.getElementById('baseR'),
    pathL: document.getElementById('pathL'), pathR: document.getElementById('pathR'),
    pupilL: document.getElementById('pupilL'), pupilR: document.getElementById('pupilR'),
    highL: document.getElementById('highL'), highR: document.getElementById('highR'),
    nose: document.getElementById('nose'), tongue: document.getElementById('tongue'), tongueSlit: document.getElementById('tongueSlit'),
    blur1: document.getElementById('blur1'), blur2: document.getElementById('blur2'),
    gradL1: document.getElementById('gradLeftMid'), gradL2: document.getElementById('gradLeftEnd'),
    gradR1: document.getElementById('gradRightMid'), gradR2: document.getElementById('gradRightEnd'),
    textWrap: document.getElementById('text-wrap'), nameTag: document.getElementById('name-tag'),
    topNav: document.getElementById('top-nav'), main: document.getElementById('main-content'),
    floorGrid: document.getElementById('floor-grid'),
    phTL: document.getElementById('placeholder-tl'), 
    phBR: document.getElementById('placeholder-br'),
    replayBtn: document.getElementById('replay'),
    footerPupilL: document.getElementById('footer-pupilL'), footerPupilR: document.getElementById('footer-pupilR'),
    footerHighL: document.getElementById('footer-highL'), footerHighR: document.getElementById('footer-highR')
};

let currentMode = 'angry';
let mouseX = 0; let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = (Math.min(1, Math.max(0, e.clientX / window.innerWidth)) - 0.5) * 2;
    mouseY = (Math.min(1, Math.max(0, e.clientY / window.innerHeight)) - 0.5) * 2;
    updatePupils();
});

function updatePupils() {
    const d = state[currentMode];
    const dx = Math.max(-1, Math.min(1, mouseX)) * 10;
    const dy = Math.max(-1, Math.min(1, mouseY)) * 12;
    els.pupilL.setAttribute('transform', `translate(${dx}, ${dy}) rotate(${d.rotL} ${d.pupilLX} ${d.pupilLY})`);
    els.pupilR.setAttribute('transform', `translate(${dx}, ${dy}) rotate(${d.rotR} ${d.pupilRX} ${d.pupilRY})`);
    els.highL.setAttribute('transform', `translate(${dx}, ${dy})`); els.highR.setAttribute('transform', `translate(${dx}, ${dy})`);
    if(els.footerPupilL) els.footerPupilL.setAttribute('transform', `translate(${dx}, ${dy})`);
    if(els.footerPupilR) els.footerPupilR.setAttribute('transform', `translate(${dx}, ${dy})`);
    if(els.footerHighL) els.footerHighL.setAttribute('transform', `translate(${dx}, ${dy})`);
    if(els.footerHighR) els.footerHighR.setAttribute('transform', `translate(${dx}, ${dy})`);
}

function setFace(mode) {
    currentMode = mode; const d = state[mode]; const isAngry = mode === 'angry';
    els.baseL.setAttribute('d', d.dLeft); els.baseR.setAttribute('d', d.dRight);
    els.pathL.setAttribute('d', d.dLeft); els.pathR.setAttribute('d', d.dRight);
    els.nose.setAttribute('d', d.dNose); els.nose.setAttribute('fill', isAngry ? '#4a2e1b' : '#2a1a10');
    els.pupilL.setAttribute('cx', d.pupilLX); els.pupilL.setAttribute('cy', d.pupilLY);
    els.pupilL.setAttribute('rx', d.pupilRXval); els.pupilL.setAttribute('ry', d.pupilRYval);
    els.pupilR.setAttribute('cx', d.pupilRX); els.pupilR.setAttribute('cy', d.pupilRY);
    els.pupilR.setAttribute('rx', d.pupilRXval); els.pupilR.setAttribute('ry', d.pupilRYval);
    els.pupilL.style.transition = els.pupilR.style.transition = els.highL.style.transition = els.highR.style.transition = "all 1s ease";
    updatePupils();

    setTimeout(() => {
        els.pupilL.style.transition = els.pupilR.style.transition = "cx 1s, cy 1s, rx 1s, ry 1s, transform 0.1s ease-out";
        els.highL.style.transition = els.highR.style.transition = "cx 1s, cy 1s, r 1s, transform 0.1s ease-out";
    }, 1000);

    els.highL.setAttribute('cx', d.highLX); els.highL.setAttribute('cy', d.highLY); els.highL.setAttribute('r', d.highR);
    els.highR.setAttribute('cx', d.highRX); els.highR.setAttribute('cy', d.highRY); els.highR.setAttribute('r', d.highR);
    els.blur1.setAttribute('stdDeviation', d.blur1); els.blur2.setAttribute('stdDeviation', d.blur2);
    els.gradL1.setAttribute('stop-color', d.colorMid); els.gradR1.setAttribute('stop-color', d.colorMid);
    els.gradL2.setAttribute('stop-color', d.colorEnd); els.gradR2.setAttribute('stop-color', d.colorEnd);

    if (!isAngry) {
        els.tongue.style.opacity = "1"; els.tongue.style.transform = "translateY(0)";
        els.tongueSlit.style.opacity = "0.7"; els.tongueSlit.style.transform = "translateY(0)";
    } else {
        els.tongue.style.opacity = "0"; els.tongue.style.transform = "translateY(-25px)";
        els.tongueSlit.style.opacity = "0"; els.tongueSlit.style.transform = "translateY(-25px)";
    }
}

let glitchTimeout; let randomLoop;
function triggerRandomGlitch() {
    clearTimeout(glitchTimeout);
    els.nameTag.classList.remove('font-audiowide');
    els.nameTag.classList.add('font-press-start', 'glitch');
    els.nameTag.style.fontSize = window.innerWidth < 768 ? "24px" : "48px";
    glitchTimeout = setTimeout(() => {
        els.nameTag.classList.remove('glitch', 'font-press-start');
        els.nameTag.classList.add('font-audiowide');
        els.nameTag.style.fontSize = ""; 
        randomLoop = setTimeout(triggerRandomGlitch, Math.random() * 4000 + 2000);
    }, Math.random() * 400 + 200);
}

function initBrokenScreenFlicker() {
    const screens = document.querySelectorAll('.behind-screen-content');
    screens.forEach(screen => {
        function triggerFlicker() {
            screen.classList.add('show-image');
            
            setTimeout(() => {
                screen.classList.remove('show-image');
                setTimeout(triggerFlicker, Math.random() * 5000 + 2000);
            }, Math.random() * 2000 + 500);
        }
        setTimeout(triggerFlicker, Math.random() * 3000 + 1000);
    });
}

function triggerSequence() {
    clearTimeout(glitchTimeout); clearTimeout(randomLoop);
    
    if (window.location.hash === '#about') {
        document.body.style.overflow = "auto";
        els.main.classList.remove('hidden'); els.main.style.opacity = "1";
        els.topNav.style.opacity = "1"; els.topNav.style.transform = "translateY(0)";
        els.catSvg.classList.add('shrink-corner'); els.cat.style.opacity = "1";
        els.textWrap.style.opacity = "1"; els.textWrap.style.transform = "scale(1)";
        els.floorGrid.style.opacity = "1";
        els.nameTag.classList.remove('font-press-start', 'glitch'); els.nameTag.classList.add('font-audiowide'); els.nameTag.style.fontSize = "";
        if (els.phTL) els.phTL.style.opacity = "1";
        if (els.phBR) els.phBR.style.opacity = "1";
        if (els.replayBtn) els.replayBtn.style.opacity = "1";

        setFace('blep'); randomLoop = setTimeout(triggerRandomGlitch, 3000);
        setTimeout(() => { const aboutSection = document.getElementById('about'); if(aboutSection) aboutSection.scrollIntoView({ behavior: 'smooth' }); }, 100);
        return; 
    }

    document.body.style.overflow = "hidden";
    els.main.classList.add('hidden'); els.main.style.opacity = "0";
    els.catSvg.classList.remove('shrink-corner'); els.cat.style.opacity = "0";
    els.textWrap.style.opacity = "0"; els.textWrap.style.transform = "scale(0.95)";
    els.topNav.style.opacity = "0"; els.topNav.style.transform = "translateY(-100%)";
    els.floorGrid.style.opacity = "0";
    els.nameTag.classList.remove('font-press-start', 'glitch'); els.nameTag.classList.add('font-audiowide'); els.nameTag.style.fontSize = "";
    if (els.phTL) els.phTL.style.opacity = "0";
    if (els.phBR) els.phBR.style.opacity = "0";
    if (els.replayBtn) els.replayBtn.style.opacity = "0";

    setFace('angry');
    setTimeout(() => els.cat.style.opacity = "1", 500);
    setTimeout(() => els.floorGrid.style.opacity = "1", 1000);
    setTimeout(() => setFace('blep'), 3000);
    setTimeout(() => els.catSvg.classList.add('shrink-corner'), 5500);
    setTimeout(() => { els.textWrap.style.opacity = "1"; els.textWrap.style.transform = "scale(1)"; }, 5900);
    setTimeout(() => { els.nameTag.classList.remove('font-audiowide'); els.nameTag.classList.add('font-press-start', 'glitch'); els.nameTag.style.fontSize = window.innerWidth < 768 ? "24px" : "48px"; }, 7300);
    setTimeout(() => {
        els.nameTag.classList.remove('glitch', 'font-press-start'); els.nameTag.classList.add('font-audiowide'); els.nameTag.style.fontSize = "";
        els.topNav.style.opacity = "1"; els.topNav.style.transform = "translateY(0)";
        els.main.classList.remove('hidden');
        setTimeout(() => { 
            els.main.style.opacity = "1"; document.body.style.overflow = "auto";
            if (els.replayBtn) els.replayBtn.style.opacity = "1";
            if (els.phTL) els.phTL.style.opacity = "1";
            if (els.phBR) els.phBR.style.opacity = "1";
        }, 100);
        randomLoop = setTimeout(triggerRandomGlitch, 3000);
    }, 7800);
}

if (els.replayBtn) els.replayBtn.onclick = triggerSequence;
if (els.catSvg) els.catSvg.onclick = triggerSequence;
window.onload = () => {
    triggerSequence();
    initBrokenScreenFlicker();
};

const modalOverlay = document.getElementById('modal-overlay');
const modalBg = document.getElementById('modal-bg');
const modalContentEl = document.getElementById('modal-content');
const modalClose = document.getElementById('modal-close');
function openModal(title, desc, imgText) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-desc').textContent = desc;
    document.getElementById('modal-img-text').textContent = imgText;
    modalOverlay.classList.remove('hidden'); modalOverlay.classList.add('flex');
    setTimeout(() => { modalBg.classList.remove('opacity-0'); modalBg.classList.add('opacity-100'); modalContentEl.classList.remove('scale-95', 'opacity-0'); modalContentEl.classList.add('scale-100', 'opacity-100'); }, 10);
    clearTimeout(randomLoop);
}
function closeModal() {
    modalBg.classList.remove('opacity-100'); modalBg.classList.add('opacity-0');
    modalContentEl.classList.remove('scale-100', 'opacity-100'); modalContentEl.classList.add('scale-95', 'opacity-0');
    setTimeout(() => { modalOverlay.classList.add('hidden'); modalOverlay.classList.remove('flex'); randomLoop = setTimeout(triggerRandomGlitch, 3000); }, 300);
}
document.body.addEventListener('click', (e) => {
    const trigger = e.target.closest('.popup-trigger');
    if (trigger) { e.preventDefault(); openModal(trigger.getAttribute('data-title'), trigger.getAttribute('data-desc'), trigger.getAttribute('data-img')); }
});
if(modalClose) modalClose.addEventListener('click', closeModal);
if(modalBg) modalBg.addEventListener('click', closeModal);

function setupInfiniteCarousel(wrapperId, containerId, toggleBtnId, carouselClass, gridClassesArr, prevBtnId, nextBtnId) {
    const wrapper = document.getElementById(wrapperId), container = document.getElementById(containerId), toggleBtn = document.getElementById(toggleBtnId), prevBtn = document.getElementById(prevBtnId), nextBtn = document.getElementById(nextBtnId);
    if(!container || !toggleBtn || !wrapper) return;
    Array.from(container.children).forEach(item => { const clone = item.cloneNode(true); clone.classList.add('carousel-clone'); container.appendChild(clone); });
    let isDown = false, startX, scrollLeft, isCarousel = true, autoScrollSpeed = 0.5;
    container.addEventListener('mousedown', (e) => { if(!isCarousel) return; isDown = true; container.classList.add('cursor-grabbing'); container.classList.remove('cursor-grab'); startX = e.pageX - container.offsetLeft; scrollLeft = container.scrollLeft; container.style.scrollBehavior = 'auto'; });
    window.addEventListener('mouseup', () => { isDown = false; container.classList.remove('cursor-grabbing'); if (isCarousel) container.classList.add('cursor-grab'); });
    window.addEventListener('mousemove', (e) => { if (!isDown || !isCarousel) return; e.preventDefault(); container.scrollLeft = scrollLeft - ((e.pageX - container.offsetLeft) - startX) * 1.5; });
    const smoothScroll = (amount) => { container.style.scrollBehavior = 'smooth'; container.scrollLeft += amount; setTimeout(() => { if (isCarousel) container.style.scrollBehavior = 'auto'; }, 400); };
    if(prevBtn) prevBtn.addEventListener('click', () => smoothScroll(-(window.innerWidth > 768 ? 400 : 300)));
    if(nextBtn) nextBtn.addEventListener('click', () => smoothScroll(window.innerWidth > 768 ? 400 : 300));
    function loop() {
        if (isCarousel) {
            const origWidth = container.scrollWidth / 2;
            if (!isDown && !wrapper.matches(':hover')) { container.style.scrollBehavior = 'auto'; container.scrollLeft += autoScrollSpeed; }
            if (container.scrollLeft >= origWidth) { container.style.scrollBehavior = 'auto'; container.scrollLeft -= origWidth; } 
            else if (container.scrollLeft <= 0) { container.style.scrollBehavior = 'auto'; container.scrollLeft += origWidth; }
        }
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
    toggleBtn.addEventListener('click', () => {
        isCarousel = container.classList.contains(carouselClass);
        if (isCarousel) {
            container.classList.remove(carouselClass, 'cursor-grab', 'cursor-grabbing', 'overflow-x-auto'); container.classList.add('grid', ...gridClassesArr); toggleBtn.innerText = "SHOW LESS";
            if(prevBtn) prevBtn.parentElement.style.display = 'none'; if(nextBtn) nextBtn.parentElement.style.display = 'none';
            container.querySelectorAll('.carousel-clone').forEach(el => el.classList.add('hidden')); isCarousel = false;
        } else {
            container.classList.add(carouselClass, 'cursor-grab', 'overflow-x-auto'); container.classList.remove('grid', ...gridClassesArr); toggleBtn.innerText = "SHOW ALL";
            if(prevBtn) prevBtn.parentElement.style.display = ''; if(nextBtn) nextBtn.parentElement.style.display = '';
            container.querySelectorAll('.carousel-clone').forEach(el => el.classList.remove('hidden')); isCarousel = true; container.scrollLeft = 0; 
        }
    });
}
setupInfiniteCarousel('work-wrapper', 'work-container', 'work-toggle', 'carousel-mode-work', ['grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3'], 'work-prev', 'work-next');
setupInfiniteCarousel('skills-wrapper', 'skills-container', 'skills-toggle', 'carousel-mode-skills', ['grid-cols-1', 'md:grid-cols-2'], 'skills-prev', 'skills-next');