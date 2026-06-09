const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
});

const canvas = document.getElementById('model-canvas');
const warpContainer = document.getElementById('warp-container');
let loadedModel = null;

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100); 
camera.position.set(0, 2, 8); 

const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(5, 10, 5);
scene.add(dirLight);

const pointLight = new THREE.PointLight(0x00ffcc, 1.5, 10);
pointLight.position.set(-2, 2, 2);
scene.add(pointLight);

function resizeCanvas() {
    if(!warpContainer) return;
    const width = warpContainer.clientWidth;
    const height = warpContainer.clientHeight;
    if (canvas.width !== width || canvas.height !== height) {
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const loader = new THREE.GLTFLoader();
loader.load('pictures/work page/fluxs_pit_stop.glb', (gltf) => {
    const rawModel = gltf.scene;
    const box = new THREE.Box3().setFromObject(rawModel);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const targetSize = 4.4; 
    const scale = targetSize / maxDim;
    rawModel.scale.set(scale, scale, scale);
    rawModel.position.sub(center.multiplyScalar(scale));
    
    loadedModel = new THREE.Group();
    loadedModel.add(rawModel);
    scene.add(loadedModel);
    document.getElementById('model-loading').style.display = 'none';
    resizeCanvas(); 
}, undefined, (error) => {
    console.error('Error loading model:', error);
    document.getElementById('model-loading').innerHTML = '<span class="text-red-500">Failed to load model</span>';
});

function animate(time) {
    requestAnimationFrame(animate);
    lenis.raf(time);
    renderer.render(scene, camera);
}
animate();

const warpSection = document.getElementById('scroll-warp-section');
const scrollWords = document.querySelectorAll('.scroll-word');
const totalWords = scrollWords.length;
const warpContainerShell = document.getElementById('warp-container');
const revealPointRatio = 0.18;

function updateWorkReveal(shouldReveal) {
    if (!warpContainerShell) return;
    warpContainerShell.classList.toggle('is-visible', shouldReveal);
}

function updateScrollWords(progress, shouldReveal) {
    if (!scrollWords.length) return;
    if (!shouldReveal) {
        scrollWords.forEach((word) => {
            word.classList.remove('active', 'exit');
            word.classList.add('enter');
        });
        return;
    }
    const segment = 1 / totalWords;
    const activeIndex = Math.min(totalWords - 1, Math.floor(progress / segment));
    scrollWords.forEach((word, index) => {
        word.classList.remove('enter', 'active', 'exit');
        if (index === activeIndex) word.classList.add('active');
        else if (index < activeIndex) word.classList.add('exit');
        else word.classList.add('enter');
    });
}

window.addEventListener('scroll', () => {
    if(!warpSection || !warpContainer) return;
    const rect = warpSection.getBoundingClientRect();
    const sectionTop = rect.top;
    const sectionHeight = rect.height;
    const windowHeight = window.innerHeight;
    const revealPoint = windowHeight * revealPointRatio;
    const shouldReveal = window.scrollY > revealPoint;
    
    let progress = 0;
    if (sectionTop <= 0) {
        const scrollableDistance = sectionHeight - windowHeight;
        progress = Math.abs(sectionTop) / scrollableDistance;
    }
    progress = Math.max(0, Math.min(1, progress));

    updateWorkReveal(shouldReveal);
    updateScrollWords(progress, shouldReveal);

    if (loadedModel) {
        loadedModel.rotation.y = progress * Math.PI * 2; 
        camera.position.x = Math.sin(progress * Math.PI) * 4; 
        camera.position.y = 2 + Math.sin(progress * Math.PI) * 4; 
        camera.position.z = 8 - (progress * 2.2); 
        camera.lookAt(0, 0, 0);
    }
});

const projectsData = [
  {
    id: 1,
    name: "Virtual humans project",
    img: "pictures/work page/Virtual humans.png",
    imgSmall: "pictures/work page/virtual human img 4.mp4",
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
    img: "pictures/work page/Jagermeister health.png",
    imgSmall: "pictures/work page/jager health image 5.png",
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
    id: 3,
    name: "Desertion game",
    img: "pictures/work page/Dessertion.png",
    imgSmall: "pictures/work page/desertion 4.png",
    imgSmallCaption: "Play the demo at dieuwebuijink.itch.io/desertion.",
    desc1: "Desertion is a challenging 2D pixel-art action platformer built in collaboration with a peer over a semester at school. set in a post-apocalyptic, resource-scarce world where navigation and timing are survival.",
    desc2: "I designed and blocked out the first level using box colliders to establish platform flow, sightlines, and enemy spawning zones. I researched responsive character movement using the GMTK platformer toolkit, then implemented a snappy control scheme in Unity that balanced speed with precision. I engineered two distinct enemy archetypes: stationary patrol enemies and proximity-triggered chasers, each with health pools and damage feedback.",
    desc3: "I sourced and integrated ambient music from Fesliyan Studios to match our deserted aesthetic, then implemented contextual sound effects (footsteps, jump/land, weapon attacks) using Freesound.org samples edited and normalized in Audacity. I supported level iteration through Git with established team protocols (shared scenes, logical file hierarchy, disciplined commits), and contributed pixel art for character animation and environment details. The polished demo shipped at <a href=\"https://dieuwebuijink.itch.io/desertion\" target=\"_blank\" rel=\"noopener noreferrer\">dieuwebuijink.itch.io/desertion</a> after two rounds of playtest-driven refinement.",
    img1: { src: "pictures/work page/desertion 4.png" },
    img2: { src: "pictures/work page/Desertion 1 .png" },
    img3: { src: "pictures/work page/desertion 3.png" },
    img4: { src: "pictures/work page/Dessertion.png" },
    img5: { src: "pictures/work page/Desertion 2.png" },
    theme: { primary: '#3b82f6', hover: '#60a5fa', glow1: 'rgba(59, 130, 246, 0.15)', glow2: 'rgba(96, 165, 250, 0.15)', shadow: 'rgba(59, 130, 246, 0.4)' }
  },
  {
    id: 4,
    name: "AVK: Prompt Fabriek & Website Redesign",
    img: "pictures/work page/AVK.png",
    imgSmall: "pictures/work page/AVK img (2).png",
    topFullWidth: true,
    desc1: "During my 4.5-month internship at AVK a digital transformation consultancy specializing in AI training and business optimization—I led two parallel UX/UI design projects that fundamentally modernized the company's digital presence. AVK specializes in helping enterprises master Microsoft 365 and AI tools like ChatGPT and Copilot through innovative training methods. Recognizing that their own digital footprint lagged behind their expertise, AVK brought me on with a mandate to refresh their brand identity and conceptualize an interactive AI training game. The internship spanned 8 methodical sprints, combining deep user research, iterative prototyping, stakeholder management, and real-world implementation.",
    img1: { src: "pictures/work page/AVK img (1).png" },
    img3: { src: "pictures/work page/AVK img 2.png" },
    img4: { src: "pictures/work page/AVK img (3).png" },
    img5: { src: "pictures/work page/AVK img (4).png" },
    desc2: "Project 1: Prompt Fabriek (AI Educational Game) AVK envisioned an escape-room-style training game where users solve challenges using correctly-crafted AI prompts. The game, set in the fictional company universe 'Ambachtelijke Vliegende Koekjes', featured a charismatic AI-generated character named Professor Zoetendaal who guided players through prompt engineering lessons. I conducted extensive user research across trainers, office workers, and tech enthusiasts—capturing 10+ user test sessions with 85% positive feedback on the gameplay concept. My design process included: 4 comprehensive research reports on game UI best practices, wireframes with multiple stakeholder feedback iterations, mid-fidelity prototypes for validation, and high-fidelity interactive Figma designs across both desktop and mobile platforms. When project scope constraints emerged mid-way (a 2-person team couldn't fully build and deploy within the timeline), I pivoted strategically: instead of delivering a half-built product, I created a complete, professional-grade design system with detailed documentation, organized Figma components, and comprehensive handoff materials for the external development team . This design-first approach proved equally valuable—it provided developers with crystal-clear specifications and reduced rework cycles.",
    desc3: "<strong>Project 2: Brand & Website Optimization</strong><br>AVK managed two primary websites: <a href=\"https://avk.nl\" target=\"_blank\" rel=\"noopener noreferrer\">avk.nl</a> (corporate site) and <a href=\"https://trainen.online\" target=\"_blank\" rel=\"noopener noreferrer\">trainen.online</a> (training platform). Both were functionally sound but visually dated and difficult to navigate. I executed a comprehensive 4-question research framework investigating user navigation patterns, pain points, competitor benchmarks, and UX improvement opportunities. Key finding: the navigation was overwhelming with 80+ links causing decision paralysis. My solution involved meticulous link categorization, hierarchical restructuring, and a phased rollout strategy. I delivered live improvements including: <a href=\"https://avk.nl\" target=\"_blank\" rel=\"noopener noreferrer\">AVK.nl</a> navigation completely restructured (50% reduction in visible menu items), <a href=\"https://trainen.online\" target=\"_blank\" rel=\"noopener noreferrer\">trainen.online</a> UX audit with 15+ actionable improvements, and a bonus project—RVS marketing campaign landing pages for Microsoft Copilot training events, deployed across three sector-specific variants (education, government, healthcare). Quick wins were implemented immediately to build momentum before the major navigation redesign went live. Throughout both projects, I learned the critical importance of stakeholder communication: switching from email coordination to weekly phone calls and documented agreements prevented major rework and ensured alignment. User testing was conducted in two rounds, with feedback directly driving design refinements. Both projects shipped successfully: the Prompt Fabriek design documentation is now guiding the development team, and AVK's websites reflect a modern, cohesive brand identity that accurately represents their innovative mission.",
    theme: { primary: '#ef4444', hover: '#fca5a5', glow1: 'rgba(239, 68, 68, 0.15)', glow2: 'rgba(252, 165, 165, 0.15)', shadow: 'rgba(239, 68, 68, 0.4)' },
    topFullWidth: true
  },
  { 
    id: 5, 
    name: "Bits & Bobs", 
    img: "pictures/work page/bits and bobs.gif", 
    imgSmall: "pictures/work page/bits and bobs img 1.mp4", 
    topFullWidth: true,
    desc1: "<strong>Jasmin Gum — Website I built for a friend's brand</strong><br>I implemented the responsive campaign website and landing pages for 'Jasmin', translating Figma designs into production-ready HTML/CSS and interactive JS components (animated headers, product showcases, responsive breakpoints). See the portfolio folders 'Building a website' and 'website Jasmin gum' for design iterations, 3D assets, and hosting evidence.",
    img1: { src: "pictures/work page/bits and bobs img 1.mp4" },
    img2: { src: "pictures/work page/bits and bobs.gif" },
    img3: { src: "pictures/work page/bits and bobs img 3.png" },
    img4: { src: "pictures/work page/bits and bobs.gif" },
    img5: { src: "" },
    desc2: "<strong>3D Spinning Gum Bottle — Unreal Engine Product Visualization</strong><br>As the centerpiece of the Jasmin website, I developed a premium 3D product showcase using Unreal Engine. Starting with a free base model, I assembled and modified individual components, then created custom wrapper designs by leveraging AI iteration in Figma—rapidly producing two distinct aesthetic options. The preferred design was a cherry-mint inspired wrapper that better captured Jasmin's brand identity. Using Unreal's Sequencer tool, I choreographed a multi-axis rotation (yaw, pitch, roll) to reveal the full product form, then recorded the animation via OBS into a perfectly looped video. The result delivers a high-fidelity, premium-feeling product display embedded on the live website at <a href=\"https://i512001.luna.fhict.nl/Brand-a-friend/\" target=\"_blank\" rel=\"noopener noreferrer\">i512001.luna.fhict.nl/Brand-a-friend/</a>.",
    desc3: "<strong>Technical Implementation — Pac‑Man</strong><br>The embedded Pac‑Man is implemented in Vanilla JavaScript and HTML5 Canvas: tile-based collision, multiple ghost AIs, touch + keyboard controls, score/level/lives state, power-mode mechanics, and optimized 60 FPS rendering. Click 'START GAME' below to play—use arrow keys on desktop or swipe on mobile.",
    hasEmbeddedGame: true,
    gameType: "pacman",
    theme: { primary: '#8b5cf6', hover: '#c4b5fd', glow1: 'rgba(139, 92, 246, 0.15)', glow2: 'rgba(196, 181, 253, 0.15)', shadow: 'rgba(139, 92, 246, 0.4)' },
    topFullWidth: true
  },
  { 
    id: 6, 
    name: "Photo portfolio", 
    img: "pictures/work page/photo album.jpg", 
    imgSmall: "pictures/work page/photo album.jpg", 
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

function initProjects() {
    const grid = document.getElementById('project-grid');
    if(!grid) return;
    const layoutHeights = ['h-[450px]', 'h-[350px]', 'h-[250px]', 'h-[250px]', 'h-[350px]', 'h-[450px]'];
    projectsData.forEach((project, index) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'flex flex-col gap-2';
        const block = document.createElement('div');
        block.className = `project-block-img w-full ${layoutHeights[index % layoutHeights.length]}`;
        block.onclick = () => openProjectModal(project);
        block.innerHTML = `<img src="${project.img}" alt="${project.name}">`;
        const title = document.createElement('h3');
        title.className = 'text-white font-normal-sans text-lg mt-1';
        title.innerText = project.name;
        wrapper.appendChild(block);
        wrapper.appendChild(title);
        grid.appendChild(wrapper);
    });
}

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

    const pacmanContainer = document.getElementById('embedded-pacman-container');
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
            newEl.autoplay = true; newEl.loop = true; newEl.muted = true; newEl.playsInline = true;
            newEl.style.width = '100%'; newEl.style.height = '100%'; newEl.style.objectFit = 'cover';
        } else if (isModel) {
            newEl = document.createElement('model-viewer');
            newEl.setAttribute('camera-controls', 'true'); newEl.setAttribute('auto-rotate', 'true'); newEl.setAttribute('shadow-intensity', '1');
            newEl.style.width = '100%'; newEl.style.height = '100%'; newEl.style.maxHeight = '700px'; newEl.style.minHeight = '420px';
        } else {
            newEl = document.createElement('img');
            newEl.alt = mediaData.alt || defaultAlt || '';
            newEl.style.width = '100%'; newEl.style.height = '100%'; newEl.style.objectFit = 'contain';
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
        if (!project.img5?.src) bottomImagesContainer.style.gridTemplateColumns = '1fr';
        else bottomImagesContainer.style.gridTemplateColumns = 'repeat(2, minmax(0, 1fr))';
    }

    const topImg2 = document.getElementById('modal-top-img-2');
    const topCap1 = document.getElementById('modal-top-caption-1');
    const topCap2 = document.getElementById('modal-top-caption-2');
    const botCap1 = document.getElementById('modal-bottom-caption-1');
    const botCap2 = document.getElementById('modal-bottom-caption-2');

    if (topCap1) topCap1.innerText = project.img1?.caption || '';
    if (topCap2) topCap2.innerText = project.img2?.caption || '';
    if (botCap1) botCap1.innerText = project.img4?.caption || project.imgSmallCaption || '';
    if (botCap2) botCap2.innerText = project.img5?.caption || '';

    if (project.topFullWidth) {
        if (imagesContainer) { imagesContainer.style.gridTemplateColumns = '1fr'; imagesContainer.style.display = 'grid'; }
        if (topCap1) topCap1.innerText = project.img1?.caption || project.img1?.alt || '';
        if (topImg2) { const f = topImg2.closest('figure'); if (f) f.style.display = 'none'; }
    } else {
        if (imagesContainer) imagesContainer.style.gridTemplateColumns = '';
        if (topImg2) { const f = topImg2.closest('figure'); if (f) f.style.display = ''; }
    }

    const extendedGrid = document.getElementById('modal-extended-photo-grid');
    
    if (project.photos && project.photos.length > 0) {
        if (pacmanContainer) pacmanContainer.style.display = 'none';
        if (imagesContainer) imagesContainer.style.display = 'none';
        if (bottomImagesContainer) { bottomImagesContainer.style.display = 'none'; bottomImagesContainer.classList.remove('grid'); bottomImagesContainer.classList.add('hidden'); }
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
                figure.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openHandler(); } });
            });
        }
    } else if (project.hasEmbeddedGame && project.gameType === 'pacman') {
        if (extendedGrid) extendedGrid.style.display = 'none';
        if (pacmanContainer) pacmanContainer.style.display = 'none';
        if (imagesContainer) imagesContainer.style.display = 'grid';
        if (bottomImagesContainer) { bottomImagesContainer.style.display = 'none'; bottomImagesContainer.classList.remove('grid'); bottomImagesContainer.classList.add('hidden'); }
        setTimeout(() => { if (pacmanContainer) { pacmanContainer.style.display = 'block'; initEmbeddedPacMan(); } }, 150);
    } else {
        if (extendedGrid) extendedGrid.style.display = 'none';
        if (pacmanContainer) pacmanContainer.style.display = 'none';
        if (imagesContainer) imagesContainer.style.display = 'grid';
        if (bottomImagesContainer) { bottomImagesContainer.style.display = 'grid'; bottomImagesContainer.classList.remove('hidden'); bottomImagesContainer.classList.add('grid'); }
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
    lenis.stop();
}

let embeddedGameInstance = null;

function initEmbeddedPacMan() {
    const embeddedCanvas = document.getElementById('embeddedGameCanvas');
    if (!embeddedCanvas) return;
    if (embeddedGameInstance) embeddedGameInstance.destroy();
    embeddedGameInstance = createPacManGame(embeddedCanvas);
}

function createPacManGame(canvas) {
    const ctx = canvas.getContext('2d');
    const startBtn = document.getElementById('pm-startBtn');
    const overlay = document.getElementById('pm-overlay');
    const scoreEl = document.querySelector('#pm-score span');
    const levelEl = document.querySelector('#pm-level span');
    const overlayTitle = document.querySelector('#pm-overlay h1');
    const skinInput = document.getElementById('pm-skinInput');

    const TILE_SIZE = 20, ROW_COUNT = 20, COL_COUNT = 19;
    const PACMAN_SPEED_BASE = 0.10, GHOST_SPEED_BASE = 0.06;
    const WALL_COLOR = '#1919A6', PELLET_COLOR = '#ffb8ae', POWER_PELLET_COLOR = '#ffb8ae', PACMAN_COLOR = '#FFFF00';
    
    let score = 0, level = 1, gameRunning = false, animationId, powerModeTime = 0, lives = 3, customSkinImg = null;
    const mapTemplate = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1],
        [1,3,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,3,1],
        [1,2,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,2,1],
        [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
        [1,2,1,1,2,1,2,1,1,1,1,1,2,1,2,1,1,2,1],
        [1,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,2,1],
        [1,1,1,1,2,1,1,1,0,1,0,1,1,1,2,1,1,1,1],
        [0,0,0,1,2,1,0,0,0,0,0,0,0,1,2,1,0,0,0],
        [1,1,1,1,2,1,0,1,1,4,1,1,0,1,2,1,1,1,1],
        [0,2,2,2,2,0,0,1,0,0,0,1,0,0,2,2,2,2,0], 
        [1,1,1,1,2,1,0,1,1,1,1,1,0,1,2,1,1,1,1],
        [0,0,0,1,2,1,0,0,0,0,0,0,0,1,2,1,0,0,0],
        [1,1,1,1,2,1,2,1,1,1,1,1,2,1,2,1,1,1,1],
        [1,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1],
        [1,2,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,2,1],
        [1,3,2,1,2,2,2,2,2,0,2,2,2,2,2,1,2,3,1], 
        [1,1,2,1,2,1,2,1,1,1,1,1,2,1,2,1,2,1,1],
        [1,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,2,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ];

    let map = [];
    const UP = { x: 0, y: -1, id: 'up' }, DOWN = { x: 0, y: 1, id: 'down' }, LEFT = { x: -1, y: 0, id: 'left' }, RIGHT = { x: 1, y: 0, id: 'right' }, STOP = { x: 0, y: 0, id: 'stop' };

    const handleSkinChange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const img = new Image();
                img.onload = function() { customSkinImg = img; if (startBtn) startBtn.innerText = "START (WITH FACE)"; }
                img.src = event.target.result;
            }
            reader.readAsDataURL(file);
        }
    };
    if (skinInput) skinInput.addEventListener('change', handleSkinChange);

    class Entity {
        constructor(x, y, speed) { this.x = x + 0.5; this.y = y + 0.5; this.speed = speed; this.dir = STOP; this.nextDir = STOP; this.radius = TILE_SIZE * 0.45; }
        isWall(tx, ty, isGhost = false) {
            if (ty === 10 && (tx < 0 || tx >= COL_COUNT)) return false;
            if (tx < 0 || tx >= COL_COUNT || ty < 0 || ty >= ROW_COUNT) return true;
            const tile = map[ty][tx]; return isGhost ? tile === 1 : tile === 1 || tile === 4;
        }
        move(speedMultipler = 1.0, isGhost = false) {
            const spd = this.speed * speedMultipler;
            const cx = Math.floor(this.x), cy = Math.floor(this.y), centerX = cx + 0.5, centerY = cy + 0.5;
            const distToCenter = Math.sqrt(Math.pow(this.x - centerX, 2) + Math.pow(this.y - centerY, 2));
            if (this.nextDir !== STOP && distToCenter < spd) {
                const nextTx = cx + this.nextDir.x, nextTy = cy + this.nextDir.y;
                if (!this.isWall(nextTx, nextTy, isGhost)) { this.x = centerX; this.y = centerY; this.dir = this.nextDir; this.nextDir = STOP; return; }
            }
            if (this.dir === STOP) return;
            const nextTx = cx + this.dir.x, nextTy = cy + this.dir.y;
            if (this.isWall(nextTx, nextTy, isGhost)) {
                let distToStop = 0;
                if (this.dir === RIGHT) distToStop = centerX - this.x; else if (this.dir === LEFT) distToStop = this.x - centerX; else if (this.dir === DOWN) distToStop = centerY - this.y; else if (this.dir === UP) distToStop = this.y - centerY;
                if (distToStop <= spd) { this.x = centerX; this.y = centerY; if(isGhost) this.hitWall = true; else this.dir = STOP; } 
                else { this.x += this.dir.x * spd; this.y += this.dir.y * spd; }
            } else { this.x += this.dir.x * spd; this.y += this.dir.y * spd; }
            if (this.x < 0) this.x = COL_COUNT; if (this.x > COL_COUNT) this.x = 0;
        }
    }

    class Pacman extends Entity {
        constructor(x, y) { super(x, y, PACMAN_SPEED_BASE); this.mouthOpen = 0; this.mouthSpeed = 0.2; this.rotation = 0; }
        update() {
            if (this.dir === RIGHT || (this.dir === STOP && this.rotation === 0)) this.rotation = 0; else if (this.dir === DOWN) this.rotation = Math.PI / 2; else if (this.dir === LEFT) this.rotation = Math.PI; else if (this.dir === UP) this.rotation = -Math.PI / 2;
            this.move(1.0, false);
            const cx = Math.floor(this.x), cy = Math.floor(this.y);
            if (cx >= 0 && cx < COL_COUNT && cy >= 0 && cy < ROW_COUNT) {
                const tile = map[cy][cx];
                if (tile === 2) { map[cy][cx] = 0; score += 10; checkLevelComplete(); } 
                else if (tile === 3) { map[cy][cx] = 0; score += 50; activatePowerMode(); checkLevelComplete(); }
            }
            if (this.dir !== STOP) { this.mouthOpen += this.mouthSpeed; if (this.mouthOpen > 0.25 || this.mouthOpen < 0) this.mouthSpeed = -this.mouthSpeed; }
        }
        draw() {
            ctx.save(); ctx.translate(this.x * TILE_SIZE, this.y * TILE_SIZE); ctx.rotate(this.rotation); ctx.beginPath();
            const angle = 0.2 * Math.PI * Math.sin(this.mouthOpen * Math.PI * 2);
            ctx.arc(0, 0, this.radius, angle, 2 * Math.PI - angle); ctx.lineTo(0, 0); ctx.closePath();
            if (customSkinImg) { ctx.clip(); ctx.drawImage(customSkinImg, -this.radius, -this.radius, this.radius * 2, this.radius * 2); } 
            else { ctx.fillStyle = PACMAN_COLOR; ctx.fill(); }
            ctx.restore();
        }
    }

    class Ghost extends Entity {
        constructor(x, y, color) { super(x, y, GHOST_SPEED_BASE); this.color = color; this.isDead = false; this.isScared = false; this.hitWall = false; this.lastDecisionX = -1; this.lastDecisionY = -1; this.reviveDelay = 0; }
        isInHouse() { return this.y > 8 && this.y <= 10 && this.x >= 8 && this.x <= 10; }
        getValidDirs() {
            const cx = Math.floor(this.x), cy = Math.floor(this.y), valids = [];
            [UP, DOWN, LEFT, RIGHT].forEach(d => {
                if (d.x === -this.dir.x && d.y === -this.dir.y && !this.hitWall) return;
                if (!this.isWall(cx + d.x, cy + d.y, true)) valids.push(d);
            });
            return valids;
        }
        update() {
            if (this.isDead && this.isInHouse()) { if (this.reviveDelay === 0) this.reviveDelay = 180; }
            if (this.reviveDelay > 0) { this.reviveDelay--; if (this.reviveDelay <= 0) this.isDead = false; }
            let speedMult = 1.0 + (level * 0.05);
            if (this.isScared) speedMult *= 0.6;
            if (this.isDead) { if (this.reviveDelay > 0) speedMult = 0.5; else speedMult *= 2.0; }
            this.hitWall = false; this.move(speedMult, true);

            const cx = Math.floor(this.x), cy = Math.floor(this.y), centerX = cx + 0.5, centerY = cy + 0.5;
            const distToCenter = Math.sqrt(Math.pow(this.x - centerX, 2) + Math.pow(this.y - centerY, 2));
            const atCenter = distToCenter < (this.speed * speedMult);
            const isNewTile = cx !== this.lastDecisionX || cy !== this.lastDecisionY;

            if (this.hitWall || (atCenter && isNewTile)) {
                if (atCenter && !this.hitWall) { this.x = centerX; this.y = centerY; }
                this.lastDecisionX = cx; this.lastDecisionY = cy;
                const valids = this.getValidDirs();
                if (valids.length > 0) {
                    let target = null;
                    if (this.isInHouse()) {
                        if (this.isDead && this.reviveDelay > 0) target = { x: 9, y: 9.5 };
                        else { target = { x: 9, y: 8 }; if (Math.abs(this.x - 9) > 0.1) target = { x: 9, y: 10 }; else target = { x: 9, y: 8 }; }
                    } else if (this.isDead) target = { x: 9, y: 8 };
                    else if (this.isScared) target = null;
                    else {
                        if (this.color === '#FF0000') { const dist = Math.hypot(this.x - pacman.x, this.y - pacman.y); if (dist < 7) target = { x: pacman.x, y: pacman.y }; else target = null; } 
                        else if (this.color === '#FFB852') { const dist = Math.hypot(this.x - pacman.x, this.y - pacman.y); if (dist < 5) target = { x: pacman.x, y: pacman.y }; else target = null; } 
                        else target = null;
                    }
                    if (target) {
                        valids.sort((a, b) => { return Math.hypot((cx + a.x) - target.x, (cy + a.y) - target.y) - Math.hypot((cx + b.x) - target.x, (cy + b.y) - target.y); });
                        this.dir = valids[0];
                    } else this.dir = valids[Math.floor(Math.random() * valids.length)];
                } else this.dir = { x: -this.dir.x, y: -this.dir.y };
            }
        }
        draw() {
            const cx = this.x * TILE_SIZE, cy = this.y * TILE_SIZE;
            ctx.fillStyle = this.isScared ? (Math.floor(Date.now() / 200) % 2 === 0 ? '#fff' : '#0000FF') : this.color;
            ctx.beginPath(); ctx.arc(cx, cy - 2, this.radius, Math.PI, 0); ctx.lineTo(cx + this.radius, cy + this.radius);
            for(let i=1; i<=3; i++) ctx.lineTo(cx + this.radius - (2*this.radius/3)*i, cy + this.radius - (i%2==0 ? 2 : 0));
            ctx.lineTo(cx - this.radius, cy + this.radius); ctx.fill();

            if (!this.isScared) {
                ctx.fillStyle = 'white'; ctx.beginPath(); ctx.arc(cx - 4, cy - 4, 3, 0, Math.PI*2); ctx.arc(cx + 4, cy - 4, 3, 0, Math.PI*2); ctx.fill();
                ctx.fillStyle = 'blue'; ctx.beginPath(); ctx.arc(cx - 4 + this.dir.x*2, cy - 4 + this.dir.y*2, 1.5, 0, Math.PI*2); ctx.arc(cx + 4 + this.dir.x*2, cy - 4 + this.dir.y*2, 1.5, 0, Math.PI*2); ctx.fill();
            } else {
                ctx.fillStyle = '#ffb8ae'; ctx.beginPath(); ctx.fillRect(cx - 4, cy - 2, 2, 2); ctx.fillRect(cx + 2, cy - 2, 2, 2); ctx.fillRect(cx - 4, cy + 2, 8, 1); ctx.fill();
            }
        }
    }

    let pacman, ghosts = [];
    function initLevel() { map = mapTemplate.map(row => [...row]); resetPositions(); }
    function resetPositions() {
        pacman = new Pacman(9, 16); pacman.nextDir = LEFT; 
        ghosts = [new Ghost(9, 8, '#FF0000'), new Ghost(8, 10, '#FFB8FF'), new Ghost(10, 10, '#00FFFF'), new Ghost(9, 9, '#FFB852')];
        ghosts[0].dir = LEFT; ghosts[1].dir = UP; ghosts[2].dir = UP; ghosts[3].dir = RIGHT;
    }
    function activatePowerMode() { powerModeTime = 600; ghosts.forEach(g => { if (!g.isDead) g.isScared = true; }); }
    function checkLevelComplete() {
        for(let row of map) for(let tile of row) if (tile === 2 || tile === 3) return;
        level++; if (levelEl) levelEl.innerText = level; initLevel(); showMessage(`LEVEL ${level}`);
    }
    function showMessage(text) { gameRunning = false; if (overlayTitle) overlayTitle.innerText = text; if (startBtn) startBtn.innerText = "CONTINUE"; if (overlay) overlay.style.display = 'flex'; }
    function gameOver() { gameRunning = false; if (overlayTitle) overlayTitle.innerText = "GAME OVER"; if (startBtn) startBtn.innerText = "RESTART"; if (overlay) overlay.style.display = 'flex'; }

    function update() {
        if (!gameRunning) return;
        pacman.update();
        if (powerModeTime > 0) { powerModeTime--; if (powerModeTime <= 0) ghosts.forEach(g => g.isScared = false); }
        ghosts.forEach(g => {
            g.update();
            if (Math.hypot(pacman.x - g.x, pacman.y - g.y) < 0.6) { 
                if (g.isScared && !g.isDead) { g.isDead = true; g.isScared = false; g.reviveDelay = 0; g.x = Math.round(g.x); g.y = Math.round(g.y); score += 200; } 
                else if (!g.isDead) {
                    lives--; if (lives <= 0) gameOver(); else { resetPositions(); gameRunning = false; setTimeout(() => gameRunning = true, 1000); }
                }
            }
        });
        if (scoreEl) scoreEl.innerText = score;
    }

    function draw() {
        ctx.fillStyle = 'black'; ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (let y = 0; y < ROW_COUNT; y++) {
            for (let x = 0; x < COL_COUNT; x++) {
                const tile = map[y][x], px = x * TILE_SIZE, py = y * TILE_SIZE;
                if (tile === 1) { ctx.fillStyle = WALL_COLOR; ctx.fillRect(px, py, TILE_SIZE, TILE_SIZE); } 
                else if (tile === 2) { ctx.fillStyle = PELLET_COLOR; ctx.fillRect(px + TILE_SIZE/2 - 2, py + TILE_SIZE/2 - 2, 4, 4); } 
                else if (tile === 3) { if (Math.floor(Date.now() / 200) % 2 === 0) { ctx.fillStyle = POWER_PELLET_COLOR; ctx.beginPath(); ctx.arc(px + TILE_SIZE/2, py + TILE_SIZE/2, 6, 0, Math.PI*2); ctx.fill(); } } 
                else if (tile === 4) { ctx.strokeStyle = '#ffb8ae'; ctx.beginPath(); ctx.moveTo(px, py + TILE_SIZE/2); ctx.lineTo(px + TILE_SIZE, py + TILE_SIZE/2); ctx.stroke(); }
            }
        }
        pacman.draw(); ghosts.forEach(g => g.draw());
    }

    function loop() { update(); draw(); animationId = requestAnimationFrame(loop); }

    const onKeyDown = e => {
        if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) e.preventDefault();
        if (e.key === 'ArrowUp') pacman.nextDir = UP; if (e.key === 'ArrowDown') pacman.nextDir = DOWN; if (e.key === 'ArrowLeft') pacman.nextDir = LEFT; if (e.key === 'ArrowRight') pacman.nextDir = RIGHT;
    };
    window.addEventListener('keydown', onKeyDown);

    let tX = 0, tY = 0;
    const onTouchStart = e => { tX = e.touches[0].clientX; tY = e.touches[0].clientY; };
    const onTouchMove = e => { e.preventDefault(); };
    const onTouchEnd = e => {
        let dX = e.changedTouches[0].clientX - tX, dY = e.changedTouches[0].clientY - tY;
        if(Math.abs(dX) > Math.abs(dY) && Math.abs(dX) > 30) pacman.nextDir = dX > 0 ? RIGHT : LEFT;
        else if(Math.abs(dY) > 30) pacman.nextDir = dY > 0 ? DOWN : UP;
    };
    canvas.addEventListener('touchstart', onTouchStart, {passive:false});
    canvas.addEventListener('touchmove', onTouchMove, {passive:false});
    canvas.addEventListener('touchend', onTouchEnd, {passive:false});

    function resize() {
        const containerWidth = canvas.parentElement.clientWidth || 380;
        canvas.width = COL_COUNT * TILE_SIZE; canvas.height = ROW_COUNT * TILE_SIZE;
        let scale = containerWidth / canvas.width;
        canvas.style.width = `${canvas.width * scale}px`; canvas.style.height = `${canvas.height * scale}px`;
    }
    
    window.addEventListener('resize', resize);
    
    const onStartClick = () => {
        if (startBtn.innerText === "RESTART") { score = 0; level = 1; lives = 3; if (scoreEl) scoreEl.innerText = "0"; if (levelEl) levelEl.innerText = "1"; initLevel(); } else initLevel();
        if (overlay) overlay.style.display = 'none';
        gameRunning = true;
    };
    if (startBtn) startBtn.addEventListener('click', onStartClick);

    resize(); initLevel(); draw(); loop();

    return {
        destroy: () => {
            cancelAnimationFrame(animationId); window.removeEventListener('keydown', onKeyDown); window.removeEventListener('resize', resize);
            canvas.removeEventListener('touchstart', onTouchStart); canvas.removeEventListener('touchmove', onTouchMove);
            if (startBtn) startBtn.removeEventListener('click', onStartClick); if (skinInput) skinInput.removeEventListener('change', handleSkinChange);
        }
    };
}

function closeProjectModal() {
    closePhotoLightbox();
    projectModalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    lenis.start();
    if (embeddedGameInstance) {
        embeddedGameInstance.destroy();
        embeddedGameInstance = null;
    }
    const pacmanContainerClose = document.getElementById('embedded-pacman-container');
    if (pacmanContainerClose) pacmanContainerClose.style.display = 'none';
}

closeProjectModalBtn.addEventListener('click', closeProjectModal);
projectModalOverlay.addEventListener('click', (e) => { if (e.target === projectModalOverlay) closeProjectModal(); });
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && photoLightboxOverlay?.classList.contains('active')) {
        closePhotoLightbox();
    }
});
document.addEventListener('DOMContentLoaded', initProjects);