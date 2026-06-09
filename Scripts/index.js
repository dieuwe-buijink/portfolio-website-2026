
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
            phTL: document.getElementById('placeholder-tl'), 
            phBR: document.getElementById('placeholder-br'),
            footerPupilL: document.getElementById('footer-pupilL'), footerPupilR: document.getElementById('footer-pupilR'),
            footerHighL: document.getElementById('footer-highL'), footerHighR: document.getElementById('footer-highR')
        };

        let currentMode = 'angry';
        let footerCatMode = 'blep';
        let mouseX = 0; let mouseY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = (Math.min(1, Math.max(0, e.clientX / window.innerWidth)) - 0.5) * 2;
            mouseY = (Math.min(1, Math.max(0, e.clientY / window.innerHeight)) - 0.5) * 2;
            updatePupils();
        });

        function updatePupils() {
            const d = state[currentMode];
            const df = (typeof footerCatMode !== 'undefined') ? state[footerCatMode] : state['blep'];
            const dx = Math.max(-1, Math.min(1, mouseX)) * 10;
            const dy = Math.max(-1, Math.min(1, mouseY)) * 12;
            els.pupilL.setAttribute('transform', `translate(${dx}, ${dy}) rotate(${d.rotL} ${d.pupilLX} ${d.pupilLY})`);
            els.pupilR.setAttribute('transform', `translate(${dx}, ${dy}) rotate(${d.rotR} ${d.pupilRX} ${d.pupilRY})`);
            els.highL.setAttribute('transform', `translate(${dx}, ${dy})`); els.highR.setAttribute('transform', `translate(${dx}, ${dy})`);
            if(els.footerPupilL) els.footerPupilL.setAttribute('transform', `translate(${dx}, ${dy}) rotate(${df.rotL} ${df.pupilLX} ${df.pupilLY})`);
            if(els.footerPupilR) els.footerPupilR.setAttribute('transform', `translate(${dx}, ${dy}) rotate(${df.rotR} ${df.pupilRX} ${df.pupilRY})`);
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
                els.nameTag.classList.remove('font-press-start', 'glitch'); els.nameTag.classList.add('font-audiowide'); els.nameTag.style.fontSize = "";
                if (els.phTL) els.phTL.style.opacity = "1";
                if (els.phBR) els.phBR.style.opacity = "1";

                setFace('blep'); randomLoop = setTimeout(triggerRandomGlitch, 3000);
                setTimeout(() => { const aboutSection = document.getElementById('about'); if(aboutSection) aboutSection.scrollIntoView({ behavior: 'smooth' }); }, 100);
                return; 
            }

            document.body.style.overflow = "hidden";
            els.main.classList.add('hidden'); els.main.style.opacity = "0";
            els.catSvg.classList.remove('shrink-corner'); els.cat.style.opacity = "0";
            els.textWrap.style.opacity = "0"; els.textWrap.style.transform = "scale(0.95)";
            els.topNav.style.opacity = "0"; els.topNav.style.transform = "translateY(-100%)";
            els.nameTag.classList.remove('font-press-start', 'glitch'); els.nameTag.classList.add('font-audiowide'); els.nameTag.style.fontSize = "";
            if (els.phTL) els.phTL.style.opacity = "0";
            if (els.phBR) els.phBR.style.opacity = "0";

            setFace('angry');
            setTimeout(() => els.cat.style.opacity = "1", 500);
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
                    if (els.phTL) els.phTL.style.opacity = "1";
                    if (els.phBR) els.phBR.style.opacity = "1";
                }, 100);
                randomLoop = setTimeout(triggerRandomGlitch, 3000);
            }, 7800);
        }

        if (els.catSvg) {
            els.catSvg.onclick = triggerSequence;
            els.catSvg.addEventListener('mouseenter', () => {
                if (els.catSvg.classList.contains('shrink-corner')) setFace('angry');
            });
            els.catSvg.addEventListener('mouseleave', () => {
                if (els.catSvg.classList.contains('shrink-corner')) setFace('blep');
            });
        }

        // Footer Cat Morphing and Click Handling
        const footerCatLink = document.querySelector('.footer-cat-link');
        
        if (footerCatLink) {
            const footerEls = {
                pupilL: els.footerPupilL, pupilR: els.footerPupilR,
                highL: els.footerHighL, highR: els.footerHighR,
                baseL: document.getElementById('footer-baseL'), baseR: document.getElementById('footer-baseR'),
                pathL: document.getElementById('footer-pathL'), pathR: document.getElementById('footer-pathR'),
                nose: document.getElementById('footer-nose'),
                tongue: document.getElementById('footer-tongue'), tongueSlit: document.getElementById('footer-tongueSlit'),
                gradL1: document.getElementById('footer-gradLeftMid'), gradL2: document.getElementById('footer-gradLeftEnd'),
                gradR1: document.getElementById('footer-gradRightMid'), gradR2: document.getElementById('footer-gradRightEnd')
            };

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
                
                footerEls.gradL1.setAttribute('stop-color', d.colorMid); footerEls.gradR1.setAttribute('stop-color', d.colorMid);
                footerEls.gradL2.setAttribute('stop-color', d.colorEnd); footerEls.gradR2.setAttribute('stop-color', d.colorEnd);

                if (!isAngry) {
                    footerEls.tongue.style.opacity = "1"; footerEls.tongue.style.transform = "translateY(0)";
                    footerEls.tongueSlit.style.opacity = "0.7"; footerEls.tongueSlit.style.transform = "translateY(0)";
                } else {
                    footerEls.tongue.style.opacity = "0"; footerEls.tongue.style.transform = "translateY(-25px)";
                    footerEls.tongueSlit.style.opacity = "0"; footerEls.tongueSlit.style.transform = "translateY(-25px)";
                }
                
                updatePupils();
            }
            
            // Morph on hover - ONLY footer cat
            footerCatLink.addEventListener('mouseenter', () => setFooterCatFace('angry'));
            footerCatLink.addEventListener('mouseleave', () => setFooterCatFace('blep'));
            
            // Handle click with page transition
            footerCatLink.addEventListener('click', (e) => {
                e.preventDefault();
                const curtain = document.getElementById('page-transition-curtain');
                if (curtain) curtain.classList.add('curtain-active');
                setTimeout(() => window.location.href = 'index.html', 600);
            });
        }
        
        // Navigation Toggle Logic
        const navToggleBtn = document.getElementById('nav-toggle');
        const navLinksContainer = document.querySelector('#top-nav .nav-links');
        const navOverlayEl = document.getElementById('nav-overlay');

        if (navToggleBtn && navLinksContainer) {
            navToggleBtn.addEventListener('click', () => {
                navLinksContainer.classList.toggle('open');
                if (navOverlayEl) navOverlayEl.classList.toggle('active');
            });
        }

        if (navOverlayEl) {
            navOverlayEl.addEventListener('click', () => {
                navLinksContainer.classList.remove('open');
                navOverlayEl.classList.remove('active');
            });
        }

        document.querySelectorAll('#top-nav .nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('open');
                if (navOverlayEl) navOverlayEl.classList.remove('active');
            });
        });

        window.onload = () => {
            triggerSequence();
            initBrokenScreenFlicker();
            initDraggableSkills();
        };

        const projectsData = [
            {
                id: 1,
                name: "Virtual humans project",
                desc1: "During my internship at Mindlabs Tilburg, I engineered 'Noa', an adaptive Virtual Human for the Digireal project—a collaborative initiative between Fontys ICT and BUas. Projected inside a life-sized Holobox, the avatar was designed to foster meaningful, autonomous interactions for children aged 8 to 12. My process began by synthesizing extensive background research into MetaHuman capabilities, non-verbal communication, and character design principles to establish a solid psychological and technical foundation.",
                img1: { src: "pictures/work page/virtual human img 1.jpeg" },
                img2: { src: "pictures/work page/virtual humans 2.mp4" },
                img3: { src: "pictures/work page/virtual humans 3.mp4" },
                img4: { src: "pictures/work page/virtual human img 4.mp4" },
                desc2: "Using Unreal Engine, I brought the avatar to life by blending fluid MetaHuman Creator animations with dynamic Niagara VFX, such as an attention-grabbing smoke simulation. I engineered complex interaction pipelines integrating gaze tracking, socket systems, and precise gesture recognition. After observing user tests, I noticed children struggling with specific inputs, prompting me to develop intuitive UI video guides and robust reset-gestures that significantly lowered the interaction threshold.",
                desc3: "Beyond immediate development, I focused heavily on project performance and longevity. I optimized the demanding Unreal project into stable, validated builds suitable for the Holobox and demo hardware. Wrapping up the internship, I delivered a comprehensive handover via Git, structured agile sprint documentation, and a strategic advisory report for the Fontys IXD-lectoraat, advocating for more accessible XR alternatives like Looking-Glass displays to expand the project's future reach.",
                theme: { primary: '#00e5ff', hover: '#d946ef', glow1: 'rgba(0, 229, 255, 0.15)', glow2: 'rgba(217, 70, 239, 0.15)', shadow: 'rgba(0, 229, 255, 0.4)' }
            },
            {
                id: 2,
                name: "Jägermeister Health campaign",
                desc1: "I worked on a project where i wanted to strategize and execute a complete brand campaign for 'Jägermeister Health' a fictional health-focused sub-brand reimagining Jägermeister's iconic herbal formula as a cough syrup. Our approach flipped the brand's notorious party image into an April Fools paradox: marketing therapeutic remedies in bottles designed to mimic the original liqueur shots. This required deep audience analysis, competitor positioning (Otrivin, Dampo), and packaging design that maintained the brand's bold visual identity while signaling health-conscious positioning.",
                img1: { src: "pictures/work page/Jager health img 1.png" },
                img2: { src: "pictures/work page/jager health image 2.png" },
                img3: { src: "pictures/work page/jager health img 3.png" },
                img4: { src: "pictures/work page/jager health image 4.glb" },
                img5: { src: "pictures/work page/jager health image 5.png" },
                desc2: "Our target demographic—young adults aged 21–38—represented a unique intersection: established drinkers seeking wellness solutions without sacrificing brand identity. By positioning the products as recovery essentials for the morning after, we created a compelling value proposition that spoke directly to our audience's lifestyle contradictions. To bring this vision to market, I spearheaded the creation of an interactive campaign website featuring a Three.js-powered rhythm game (Guitar Hero-style mechanic) that rewarded players reaching a combo of 30 with a 15% discount coupon. The website showcased looping product videos, a 3D rotating product model built in Blender, and custom interactive animations—all running on our FHICT server.",
                desc3: "Deliverables spanned both physical and digital: custom 3D-modeled product bottles (GLB files optimized for web), professional packaging designs for Cough Syrup, Throat Lozenges, and Cold Balm with custom label textures in Blender, branded video content with seamless crossfade transitions, and a fully functional interactive website combining Tailwind CSS, Three.js rendering, and Vanilla JavaScript. I conducted two rounds of user testing on the rhythm game (~10 participants total), iterating on difficulty balancing—reducing note speed and lowering the win condition based on feedback. The final deliverable hosted at <a href=\"https://i512001.luna.fhict.nl/jagermeister-Health/\" target=\"_blank\" rel=\"noopener noreferrer\">i512001.luna.fhict.nl/jagermeister-Health/</a> demonstrated how interactive storytelling and gamification can drive engagement in brand campaigns.",
                theme: { primary: '#a3e635', hover: '#fde047', glow1: 'rgba(163, 230, 53, 0.15)', glow2: 'rgba(253, 224, 71, 0.15)', shadow: 'rgba(163, 230, 53, 0.4)' }
            },
            {
                id: 6,
                name: "Photo portfolio",
                desc1: "Welcome to my photography portfolio. This space is a curated collection of my visual storytelling, focused on capturing authentic moments, exploring the delicate balance of light and shadow, and finding beauty in the everyday. Below is a selection of my recent work.",
                desc2: "",
                desc3: "",
                photos: [
                    "pictures/work page/photoportfolio img 1.JPG",
                    "pictures/work page/photoportfolio img 2.JPG",
                    "pictures/work page/photoportfolio img 3.jpg",
                    "pictures/work page/photoportfolio img 4.jpg.jpeg",
                    "pictures/work page/photoportfolio img 5.jpg.jpeg",
                    "pictures/work page/photoportfolio img 6.jpeg",
                    "pictures/work page/photoportfolio img 7.jpeg",
                    "pictures/work page/photoportfolio img 8.jpeg",
                    "pictures/work page/photoportfolio img 9.jpeg"
                ],
                theme: { primary: '#f97316', hover: '#fbbf24', glow1: 'rgba(249, 115, 22, 0.15)', glow2: 'rgba(251, 191, 36, 0.15)', shadow: 'rgba(249, 115, 22, 0.4)' } 
            }
        ];

        const projectModalOverlay = document.getElementById('project-modal-overlay');
        const closeProjectModalBtn = document.getElementById('close-project-modal');
        const modalBox = document.getElementById('dynamic-modal-box');
        const photoLightboxOverlay = document.getElementById('photo-lightbox-overlay');
        const photoLightboxImg = document.getElementById('photo-lightbox-img');
        const closePhotoLightboxBtn = document.getElementById('close-photo-lightbox');

        function openPhotoLightbox(src, alt) {
            if (!photoLightboxOverlay || !photoLightboxImg) return;
            photoLightboxImg.src = src;
            photoLightboxImg.alt = alt || 'Photo preview';
            photoLightboxOverlay.classList.add('active');
            photoLightboxOverlay.setAttribute('aria-hidden', 'false');
        }

        function closePhotoLightbox() {
            if (!photoLightboxOverlay || !photoLightboxImg) return;
            photoLightboxOverlay.classList.remove('active');
            photoLightboxOverlay.setAttribute('aria-hidden', 'true');
            photoLightboxImg.src = '';
            photoLightboxImg.alt = '';
        }

        if (closePhotoLightboxBtn) closePhotoLightboxBtn.addEventListener('click', closePhotoLightbox);
        if (photoLightboxOverlay) {
            photoLightboxOverlay.addEventListener('click', (event) => {
                if (event.target === photoLightboxOverlay) closePhotoLightbox();
            });
        }

        function openProjectModal(project) {
            clearTimeout(randomLoop); // Pause glitch effect
            document.getElementById('modal-title').innerText = project.name;
            document.getElementById('modal-desc-1').innerHTML = project.desc1 || '';
            
            const desc2Container = document.getElementById('modal-desc-2-container');
            const desc2Text = document.getElementById('modal-desc-2');
            if (project.desc2) {
                if (desc2Container) desc2Container.style.display = 'flex';
                if (desc2Text) desc2Text.innerHTML = project.desc2;
            } else {
                if (desc2Container) desc2Container.style.display = 'none';
            }

            const techSection = document.getElementById('modal-tech-section');
            const desc3Text = document.getElementById('modal-desc-3');
            if (project.desc3) {
                if (techSection) techSection.style.display = 'block';
                if (desc3Text) desc3Text.innerHTML = project.desc3;
            } else {
                if (techSection) techSection.style.display = 'none';
            }

            const imagesContainer = document.getElementById('modal-images-container');
            const bottomImagesContainer = document.getElementById('modal-bottom-images-container');
            
            const setMedia = (id, mediaData, defaultAlt) => {
                const el = document.getElementById(id);
                if (!el) return;
                const parent = el.parentElement;
                const src = mediaData?.src || '';
                
                const cn = el.className;
                
                const existingElements = parent.querySelectorAll(`img#${id}, video#${id}, model-viewer#${id}`);
                existingElements.forEach(e => e.remove());
                
                if (!src) {
                    const img = document.createElement('img');
                    img.id = id;
                    img.className = cn;
                    parent.insertBefore(img, parent.firstChild);
                    parent.style.display = 'none';
                    return;
                } else {
                    parent.style.display = '';
                }

                let newEl;
                const isVideo = src.toLowerCase().endsWith('.mp4');
                const isModel = src.toLowerCase().endsWith('.glb');

                if (isVideo) {
                    newEl = document.createElement('video');
                    newEl.autoplay = true;
                    newEl.loop = true;
                    newEl.muted = true;
                    newEl.playsInline = true;
                    newEl.style.width = '100%';
                    newEl.style.height = '100%';
                    newEl.style.objectFit = 'cover';
                } else if (isModel) {
                    newEl = document.createElement('model-viewer');
                    newEl.setAttribute('camera-controls', 'true');
                    newEl.setAttribute('auto-rotate', 'true');
                    newEl.setAttribute('shadow-intensity', '1');
                    newEl.style.width = '100%';
                    newEl.style.height = '100%';
                    newEl.style.maxHeight = '700px';
                    newEl.style.minHeight = '420px';
                } else {
                    newEl = document.createElement('img');
                    newEl.alt = mediaData.alt || defaultAlt || '';
                    newEl.style.width = '100%';
                    newEl.style.height = '100%';
                    newEl.style.objectFit = 'contain';
                }

                newEl.id = id;
                newEl.src = src;
                newEl.className = cn;

                parent.insertBefore(newEl, parent.firstChild);
            };

            setMedia('modal-top-img-1', project.img1, project.name);
            setMedia('modal-top-img-2', project.img2, project.name);
            setMedia('modal-small-img', project.img3, '');
            setMedia('modal-bottom-img-1', project.img4, project.name);
            setMedia('modal-bottom-img-2', project.img5, project.name);

            if (bottomImagesContainer) {
                if (!project.img5?.src) {
                    bottomImagesContainer.style.gridTemplateColumns = '1fr';
                } else {
                    bottomImagesContainer.style.gridTemplateColumns = 'repeat(2, minmax(0, 1fr))';
                }
            }

            const extendedGrid = document.getElementById('modal-extended-photo-grid');
            
            if (project.photos && project.photos.length > 0) {
                if (imagesContainer) imagesContainer.style.display = 'none';
                if (bottomImagesContainer) {
                    bottomImagesContainer.style.display = 'none';
                    bottomImagesContainer.classList.remove('grid');
                    bottomImagesContainer.classList.add('hidden');
                }
                if (extendedGrid) {
                    extendedGrid.style.display = 'grid';
                    extendedGrid.innerHTML = project.photos.map(photoUrl => `
                        <figure class="modal-image-card photo-portfolio-thumb" tabindex="0" role="button" aria-label="Open photo preview">
                            <img src="${photoUrl}" alt="Portfolio Photo" class="w-full h-auto rounded-lg">
                        </figure>
                    `).join('');
                    extendedGrid.querySelectorAll('.photo-portfolio-thumb').forEach((figure, index) => {
                        const photoUrl = project.photos[index];
                        const openHandler = () => openPhotoLightbox(photoUrl, `Portfolio photo ${index + 1}`);
                        figure.addEventListener('click', openHandler);
                        figure.addEventListener('keydown', (event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                                event.preventDefault();
                                openHandler();
                            }
                        });
                    });
                }
            } else {
                if (extendedGrid) extendedGrid.style.display = 'none';
                if (imagesContainer) imagesContainer.style.display = 'grid';
                if (bottomImagesContainer) {
                    bottomImagesContainer.style.display = 'grid';
                    bottomImagesContainer.classList.remove('hidden');
                    bottomImagesContainer.classList.add('grid');
                }
            }

            modalBox.style.setProperty('--theme-primary', project.theme.primary);
            modalBox.style.setProperty('--theme-hover', project.theme.hover);
            modalBox.style.setProperty('--theme-glow-1', project.theme.glow1);
            modalBox.style.setProperty('--theme-glow-2', project.theme.glow2);
            modalBox.style.setProperty('--theme-shadow', project.theme.shadow);
            const scrollArea = modalBox.querySelector('.modal-scroll-area');
            if(scrollArea) scrollArea.scrollTop = 0;
            projectModalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Suspend smooth scrolling if present globally
            if (typeof window.lenis !== 'undefined') window.lenis.stop();
            else if (typeof lenis !== 'undefined') lenis.stop();
        }

        function closeProjectModal() {
            closePhotoLightbox();
            projectModalOverlay.classList.remove('active');
            
            // Reset to auto to perfectly match the intro animation's unlocked state
            document.body.style.overflow = 'auto';
            
            // Resume smooth scrolling if present globally
            if (typeof window.lenis !== 'undefined') window.lenis.start();
            else if (typeof lenis !== 'undefined') lenis.start();
            
            randomLoop = setTimeout(triggerRandomGlitch, 3000); // Resume glitch effect
        }

        if(closeProjectModalBtn) closeProjectModalBtn.addEventListener('click', closeProjectModal);
        if(projectModalOverlay) projectModalOverlay.addEventListener('click', (e) => { if (e.target === projectModalOverlay) closeProjectModal(); });
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && photoLightboxOverlay?.classList.contains('active')) {
                closePhotoLightbox();
            }
        });

        // Physics Engine for Floating Skills
        function initDraggableSkills() {
            const nodes = document.querySelectorAll('.skill-node');
            const physicsArea = document.getElementById('skills-physics-area');
            const displayTitle = document.getElementById('skill-display');

            const nodeData = Array.from(nodes).map(node => ({
                el: node,
                x: Math.random() * (physicsArea.clientWidth - 80),
                y: Math.random() * (physicsArea.clientHeight - 80),
                vx: (Math.random() - 0.5) * 1.5, // Slow float
                vy: (Math.random() - 0.5) * 1.5,
                isDragging: false,
                width: node.offsetWidth || 80,
                height: node.offsetHeight || 80
            }));

            nodeData.forEach((data) => {
                const node = data.el;
                const label = node.querySelector('.skill-label');
                const skillName = node.getAttribute('data-skill');
                const color = node.style.getPropertyValue('--node-color');

                const startDrag = (clientX, clientY) => {
                    data.isDragging = true;
                    node.classList.add('z-50', 'scale-110', 'is-dragged');
                    displayTitle.textContent = skillName.toUpperCase();
                    displayTitle.style.color = color;
                    if(label) label.style.opacity = '1';

                    data.startX = clientX;
                    data.startY = clientY;
                    data.initialX = data.x;
                    data.initialY = data.y;
                };

                const drag = (clientX, clientY) => {
                    if (!data.isDragging) return;
                    const dx = clientX - data.startX;
                    const dy = clientY - data.startY;

                    const maxLeft = physicsArea.clientWidth - data.width;
                    const maxTop = physicsArea.clientHeight - data.height;
                    
                    data.x = Math.max(0, Math.min(data.initialX + dx, maxLeft));
                    data.y = Math.max(0, Math.min(data.initialY + dy, maxTop));
                    
                    node.style.left = `${data.x}px`;
                    node.style.top = `${data.y}px`;
                };

                const endDrag = () => {
                    if (!data.isDragging) return;
                    data.isDragging = false;
                    node.classList.remove('z-50', 'scale-110', 'is-dragged');
                    displayTitle.textContent = "GRAB AN ICON";
                    displayTitle.style.color = "#ffaa00";
                    if(label) label.style.opacity = '0';
                    
                    // Give it a random new gentle velocity when dropped
                    data.vx = (Math.random() - 0.5) * 1.5;
                    data.vy = (Math.random() - 0.5) * 1.5;
                };

                node.addEventListener('mousedown', (e) => {
                    e.preventDefault();
                    startDrag(e.clientX, e.clientY);
                    const onMouseMove = (e) => drag(e.clientX, e.clientY);
                    const onMouseUp = () => {
                        endDrag();
                        document.removeEventListener('mousemove', onMouseMove);
                        document.removeEventListener('mouseup', onMouseUp);
                    };
                    document.addEventListener('mousemove', onMouseMove);
                    document.addEventListener('mouseup', onMouseUp);
                });

                node.addEventListener('touchstart', (e) => {
                    e.preventDefault(); 
                    const touch = e.touches[0];
                    startDrag(touch.clientX, touch.clientY);
                    const onTouchMove = (e) => {
                        const touch = e.touches[0];
                        drag(touch.clientX, touch.clientY);
                    };
                    const onTouchEnd = () => {
                        endDrag();
                        document.removeEventListener('touchmove', onTouchMove);
                        document.removeEventListener('touchend', onTouchEnd);
                    };
                    document.addEventListener('touchmove', onTouchMove, { passive: false });
                    document.addEventListener('touchend', onTouchEnd);
                }, { passive: false });
            });

            // The animation loop making them wander and bounce off walls AND each other
            function animate() {
                nodeData.forEach(data => {
                    if (!data.isDragging) {
                        data.x += data.vx;
                        data.y += data.vy;

                        const maxLeft = physicsArea.clientWidth - data.width;
                        const maxTop = physicsArea.clientHeight - data.height;

                        if (data.x <= 0) { data.x = 0; data.vx *= -1; }
                        if (data.x >= maxLeft) { data.x = maxLeft; data.vx *= -1; }
                        if (data.y <= 0) { data.y = 0; data.vy *= -1; }
                        if (data.y >= maxTop) { data.y = maxTop; data.vy *= -1; }
                    }
                });

                // Circle Collision Detection and Resolution
                for (let i = 0; i < nodeData.length; i++) {
                    for (let j = i + 1; j < nodeData.length; j++) {
                        let n1 = nodeData[i];
                        let n2 = nodeData[j];
                        
                        let c1x = n1.x + n1.width / 2;
                        let c1y = n1.y + n1.height / 2;
                        let c2x = n2.x + n2.width / 2;
                        let c2y = n2.y + n2.height / 2;
                        
                        let dx = c2x - c1x;
                        let dy = c2y - c1y;
                        let dist = Math.sqrt(dx * dx + dy * dy);
                        let minDist = (n1.width / 2 + n2.width / 2) + 2; // +2px padding
                        
                        if (dist < minDist && dist > 0) {
                            // Normalize the normal vector
                            let nx = dx / dist;
                            let ny = dy / dist;
                            
                            // Push apart to prevent them getting stuck
                            let overlap = minDist - dist;
                            let pushX = nx * overlap * 0.5;
                            let pushY = ny * overlap * 0.5;
                            
                            if (!n1.isDragging) { n1.x -= pushX; n1.y -= pushY; }
                            if (!n2.isDragging) { n2.x += pushX; n2.y += pushY; }
                            
                            // Calculate velocity response (elastic bounce)
                            let k = (n1.vx - n2.vx) * nx + (n1.vy - n2.vy) * ny;
                            
                            // Only bounce if they are moving towards each other
                            if (k > 0) {
                                if (!n1.isDragging) { n1.vx -= k * nx; n1.vy -= k * ny; }
                                if (!n2.isDragging) { n2.vx += k * nx; n2.vy += k * ny; }
                            }
                        }
                    }
                }

                nodeData.forEach(data => {
                    data.el.style.left = `${data.x}px`;
                    data.el.style.top = `${data.y}px`;
                });
                
                requestAnimationFrame(animate);
            }
            animate();
        }

  