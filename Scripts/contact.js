const state = {
    angry: { dLeft: "M 175 146 C 130 110, 60 90, 35 100 C 30 150, 110 185, 175 146 Z", dRight: "M 225 146 C 270 110, 340 90, 365 100 C 370 150, 290 185, 225 146 Z", dNose: "M 190 196 C 195 192, 205 192, 210 196 L 200 206 Z", pupilLX: 103, pupilLY: 118, pupilRX: 292, pupilRY: 118, pupilRXval: 7.5, pupilRYval: 20, highLX: 115, highLY: 130, highRX: 280, highRY: 130, highR: 2.5, rotL: -5, rotR: 5, colorMid: '#ffaa00', colorEnd: '#cc3300' },
    blep: { dLeft: "M 170 140 C 170 75, 60 75, 60 140 C 60 205, 170 205, 170 140 Z", dRight: "M 230 140 C 230 75, 340 75, 340 140 C 340 205, 230 205, 230 140 Z", dNose: "M 190 194 C 196 189, 204 189, 210 194 L 200 204 Z", pupilLX: 115, pupilLY: 140, pupilRX: 285, pupilRY: 140, pupilRXval: 38, pupilRYval: 38, highLX: 130, highLY: 120, highRX: 300, highRY: 120, highR: 6.5, rotL: 0, rotR: 0, colorMid: '#ffcc00', colorEnd: '#cc6600' }
};

let footerCatMode = 'blep';
let mouseX = 0; let mouseY = 0;

const footerEls = {
    pupilL: document.getElementById('footer-pupilL'), pupilR: document.getElementById('footer-pupilR'),
    highL: document.getElementById('footer-highL'), highR: document.getElementById('footer-highR'),
    baseL: document.getElementById('footer-baseL'), baseR: document.getElementById('footer-baseR'),
    pathL: document.getElementById('footer-pathL'), pathR: document.getElementById('footer-pathR'),
    nose: document.getElementById('footer-nose'),
    tongue: document.getElementById('footer-tongue'), tongueSlit: document.getElementById('footer-tongueSlit'),
    gradL1: document.getElementById('footer-gradLeftMid'), gradL2: document.getElementById('footer-gradLeftEnd'),
    gradR1: document.getElementById('footer-gradRightMid'), gradR2: document.getElementById('footer-gradRightEnd')
};

document.addEventListener('mousemove', (e) => {
    mouseX = (Math.min(1, Math.max(0, e.clientX / window.innerWidth)) - 0.5) * 2;
    mouseY = (Math.min(1, Math.max(0, e.clientY / window.innerHeight)) - 0.5) * 2;
    updatePupils();
});

function updatePupils() {
    const df = state[footerCatMode];
    const dx = Math.max(-1, Math.min(1, mouseX)) * 10;
    const dy = Math.max(-1, Math.min(1, mouseY)) * 12;
    
    if(footerEls.pupilL) footerEls.pupilL.setAttribute('transform', `translate(${dx}, ${dy}) rotate(${df.rotL} ${df.pupilLX} ${df.pupilLY})`);
    if(footerEls.pupilR) footerEls.pupilR.setAttribute('transform', `translate(${dx}, ${dy}) rotate(${df.rotR} ${df.pupilRX} ${df.pupilRY})`);
    if(footerEls.highL) footerEls.highL.setAttribute('transform', `translate(${dx}, ${dy})`);
    if(footerEls.highR) footerEls.highR.setAttribute('transform', `translate(${dx}, ${dy})`);
}

function setFooterCatFace(mode) {
    footerCatMode = mode;
    const d = state[mode];
    const isAngry = mode === 'angry';
    
    if(!footerEls.baseL) return;

    footerEls.baseL.setAttribute('d', d.dLeft); footerEls.baseR.setAttribute('d', d.dRight);
    footerEls.pathL.setAttribute('d', d.dLeft); footerEls.pathR.setAttribute('d', d.dRight);
    footerEls.nose.setAttribute('d', d.dNose); footerEls.nose.setAttribute('fill', isAngry ? '#4a2e1b' : '#2a1a10');
    
    footerEls.pupilL.setAttribute('cx', d.pupilLX); footerEls.pupilL.setAttribute('cy', d.pupilLY);
    footerEls.pupilL.setAttribute('rx', d.pupilRXval); footerEls.pupilL.setAttribute('ry', d.pupilRYval);
    footerEls.pupilR.setAttribute('cx', d.pupilRX); footerEls.pupilR.setAttribute('cy', d.pupilRY);
    footerEls.pupilR.setAttribute('rx', d.pupilRXval); footerEls.pupilR.setAttribute('ry', d.pupilRYval);
    
    footerEls.pupilL.style.transition = footerEls.pupilR.style.transition = footerEls.highL.style.transition = footerEls.highR.style.transition = "all 1s ease";
    
    setTimeout(() => {
        if(!footerEls.pupilL) return;
        footerEls.pupilL.style.transition = footerEls.pupilR.style.transition = "cx 1s, cy 1s, rx 1s, ry 1s, transform 0.1s ease-out";
        footerEls.highL.style.transition = footerEls.highR.style.transition = "cx 1s, cy 1s, r 1s, transform 0.1s ease-out";
        updatePupils();
    }, 1000);

    footerEls.highL.setAttribute('cx', d.highLX); footerEls.highL.setAttribute('cy', d.highLY); footerEls.highL.setAttribute('r', d.highR);
    footerEls.highR.setAttribute('cx', d.highRX); footerEls.highR.setAttribute('cy', d.highRY); footerEls.highR.setAttribute('r', d.highR);
    
    if(footerEls.gradL1) footerEls.gradL1.setAttribute('stop-color', d.colorMid); 
    if(footerEls.gradR1) footerEls.gradR1.setAttribute('stop-color', d.colorMid);
    if(footerEls.gradL2) footerEls.gradL2.setAttribute('stop-color', d.colorEnd); 
    if(footerEls.gradR2) footerEls.gradR2.setAttribute('stop-color', d.colorEnd);

    if (!isAngry) {
        footerEls.tongue.style.opacity = "1"; footerEls.tongue.style.transform = "translateY(0)";
        footerEls.tongueSlit.style.opacity = "0.7"; footerEls.tongueSlit.style.transform = "translateY(0)";
    } else {
        footerEls.tongue.style.opacity = "0"; footerEls.tongue.style.transform = "translateY(-25px)";
        footerEls.tongueSlit.style.opacity = "0"; footerEls.tongueSlit.style.transform = "translateY(-25px)";
    }
    
    updatePupils();
}

const footerCatLink = document.querySelector('.footer-cat-link');
if (footerCatLink) {
    footerCatLink.addEventListener('mouseenter', () => setFooterCatFace('angry'));
    footerCatLink.addEventListener('mouseleave', () => setFooterCatFace('blep'));
    footerCatLink.addEventListener('click', (e) => {
        e.preventDefault();
        const curtain = document.getElementById('page-transition-curtain');
        if (curtain) curtain.classList.add('curtain-active');
        setTimeout(() => window.location.href = 'index.html', 600);
    });
}

const starShape = document.getElementById('star-shape');

if(starShape) {
    window.addEventListener('mousemove', (e) => {
        starShape.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });

    window.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            const touch = e.touches[0];
            starShape.style.transform = `translate(${touch.clientX}px, ${touch.clientY}px)`;
        }
    }, { passive: true });
}