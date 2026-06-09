  // --- SKILLS DATA & LOGIC WITH HEAVY FILLER CONTENT ---
        const skillsData = [
            { 
                id: 1, name: "Website development", 
                img: "pictures/skills/website development.jpeg", 
                support: "pictures/skills/website development image 1.png",
                carousel1: "pictures/skills/website development image 1.png",
                carousel2: "pictures/skills/webdevelopment img 2.png",
                desc1: "I build and update websites using the same kind of setup this portfolio uses: HTML, CSS, and JavaScript. I’m comfortable turning a layout into working pages, keeping sections responsive, and making sure the design still feels sharp on desktop, tablet, and mobile.", 
                desc2: "On projects like this one, I work directly with page structure, styling, image placement, and simple interactions such as section transitions and modal content. I also have a solid grasp of building and using 3D elements for visual projects, from shaping assets and refining presentation to keeping things lightweight and visually consistent.",
                desc3: "I also know WordPress well enough to work with it as a content management system. That includes editing pages and posts, using themes and blocks, making small template or styling changes, and adapting a site from static HTML into something easier to manage in WordPress when needed.",
                theme: { primary: '#00e5ff', hover: '#00ffcc', glow1: 'rgba(0, 229, 255, 0.15)', glow2: 'rgba(0, 255, 204, 0.15)', shadow: 'rgba(0, 229, 255, 0.4)' }
            },
            { 
                id: 2, name: "3D modelling", 
                img: "pictures/skills/bladerunnerfinal 3D moddeling.png", 
                support: "pictures/skills/3d model image 1.png",
                carousel1: "pictures/skills/3d model image 1.png",
                carousel2: "pictures/skills/3d model image 2.png",
                desc1: "I create 3D models in Blender for both visual projects and game assets, with a focus simplicity, and models that are practical to use in a real scene. I handle the process from blocking out forms to refining the final model so it works well in the finished piece.", 
                desc2: "A lot of my 3D work is tied to websites and game design, where I build elements that need to look good while still staying efficient. I also use Unreal Engine at times to animate these models and bring them to life in a more polished way.",
                desc3: "Blender is a skill I want to use more often and keep improving. I already understand the basics of modelling, shaping, and presenting assets, but I would like to get better at more advanced techniques, stronger detailing, and building more polished 3D work over time.",
                theme: { primary: '#d946ef', hover: '#f472b6', glow1: 'rgba(217, 70, 239, 0.15)', glow2: 'rgba(244, 114, 182, 0.15)', shadow: 'rgba(217, 70, 239, 0.4)' }
            },
            { 
                id: 3, name: "Game development", 
                img: "pictures/skills/game design.png", 
                support: "pictures/skills/game design image 1.png",
                carousel1: "pictures/skills/game design image 1.png",
                carousel2: "pictures/skills/game design image 2.mp4",
                desc1: "I have experience working in both Unity and Unreal Engine, and I’ve created projects in each one. In Unity, I built a pixel art game focused on platforming and fighting, which helped me understand movement, timing, collision, and how to make gameplay feel responsive.", 
                desc2: "In Unreal Engine, I worked more on world building, scenes, and animated characters. That gave me a better understanding of how to create environments that feel alive, how to place assets for stronger atmosphere, and how animation can help sell a scene.",
                desc3: "Working in both engines has helped me build a broader game development skill set. I’m comfortable switching between different tools and approaches depending on the project, whether the goal is tight gameplay in Unity or more cinematic scene work in Unreal Engine.",
                theme: { primary: '#a3e635', hover: '#fde047', glow1: 'rgba(163, 230, 53, 0.15)', glow2: 'rgba(253, 224, 71, 0.15)', shadow: 'rgba(163, 230, 53, 0.4)' }
            },
            { 
                id: 4, name: "UI / UX design", 
                img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=400", 
                support: "pictures/skills/ux image 1.png",
                carousel1: "pictures/skills/ux image 1.png",
                carousel2: "pictures/skills/UX image 2.png",
                desc1: "Designing intuitive user interfaces with a strong emphasis on user experience and accessibility. My process starts with user research, mapping the journey, and turning those insights into wireframes and prototypes that can be tested and refined.", 
                desc2: "Because I also understand frontend development, I can create designs that are realistic to build. In Figma, I keep layouts, typography, colors, and components organized so the design stays consistent and easy to translate into CSS and HTML.",
                desc3: "My files are usually structured with auto-layout, variants, and interactive components so everything stays clear and flexible. I also make sure handoff details are well documented, and I use feedback and testing results to keep improving the final design.",
                theme: { primary: '#f97316', hover: '#fbbf24', glow1: 'rgba(249, 115, 22, 0.15)', glow2: 'rgba(251, 191, 36, 0.15)', shadow: 'rgba(249, 115, 22, 0.4)' }
            },
            { 
                id: 5, name: "Photography", 
                img: "pictures/skills/photography.jpg", 
                support: "pictures/skills/photo image 1.jpeg",
                carousel1: "pictures/skills/photo image 1.jpeg",
                carousel2: "pictures/skills/photo image 2.jpeg",
                desc1: "Photography is more than a skill for me; it is a hobby I genuinely enjoy, and something I can also apply in professional work. I like capturing strong compositions, natural lighting, and moments that feel intentional, whether I am shooting people, objects, or spaces.", 
                desc2: "I work with DSLR and mirrorless cameras, and I’m comfortable shooting manually when I need more control over the image. I also pay attention to framing and detail so the final shot feels clean and usable, not just technically correct.",
                desc3: "Editing is a part I already know how to do, but it is also the part I want to keep improving. I use Lightroom and Photoshop to develop images, refine color, and clean things up, and I know I can get better at making the final result even stronger and more polished.",
                theme: { primary: '#ef4444', hover: '#fca5a5', glow1: 'rgba(239, 68, 68, 0.15)', glow2: 'rgba(252, 165, 165, 0.15)', shadow: 'rgba(239, 68, 68, 0.4)' }
            },
            { 
                id: 6, name: "Media marketing", 
                img: "pictures/skills/media marketing.png", 
                support: "pictures/skills/media marketing img 1.png",
                carousel1: "pictures/skills/media marketing img 1.png",
                carousel2: "pictures/skills/media marketing img2.png",
                desc1: "I have experience creating marketing campaigns in both school work and my internship, and that has shown me how important the visual side of a campaign is. A big part of the work is designing the elements that support the campaign so everything feels clear, consistent, and suited to the platform it is meant for.", 
                desc2: "I also spend a lot of time thinking about the different media platforms themselves, because each one works in its own way. Understanding the format, the audience, and the current trends helps me shape content that fits the platform instead of forcing the same idea everywhere, and it makes the campaign feel more natural overall.",
                desc3: "For me, the strongest part of media marketing is combining design with timing and context. I like building campaigns that feel visually strong while still matching what people are actually responding to, and I want to keep getting better at balancing those parts over time.",
                theme: { primary: '#6366f1', hover: '#a78bfa', glow1: 'rgba(99, 102, 241, 0.15)', glow2: 'rgba(167, 139, 250, 0.15)', shadow: 'rgba(99, 102, 241, 0.4)' }
            },
            { 
                id: 7, name: "Language & culture", 
                img: "pictures/skills/language and culture.jpg", 
                support: "pictures/skills/culture image 1.jpeg",
                carousel1: "pictures/skills/culture image 1.jpeg",
                carousel2: "pictures/skills/culture image 2.jpeg",
                desc1: "During my time at Fontys ICT I worked with people from across Europe and completed most of my studying and writing in English. That international classroom environment taught me to plan campaigns and content that communicate clearly to multicultural audiences.", 
                desc2: "I spent six months in South Korea for my minor, attending a partner university and connecting with Korean students and other exchange students from around the world. Living and studying there broadened my perspective and helped me adapt messaging, visuals, and creative choices for different cultural contexts.",
                desc3: "I'm fluent in English and Dutch, and with focused practice I can bring my German to the same level. I combine language fluency and cultural awareness to tailor tone, timing, and visuals so campaigns connect across regions, and I keep improving those skills through practice and international collaboration.",
                theme: { primary: '#14b8a6', hover: '#6ee7b7', glow1: 'rgba(20, 184, 166, 0.15)', glow2: 'rgba(110, 231, 183, 0.15)', shadow: 'rgba(20, 184, 166, 0.4)' }
            },
            { 
                id: 8, name: "Git and Scrum", 
                img: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?auto=format&fit=crop&q=80&w=400", 
                support: "pictures/skills/git and scrum image 1.png",
                carousel1: "pictures/skills/git and scrum image 1.png",
                carousel2: "pictures/skills/scrum and git image 2.png",
                desc1: "I keep version control active and practical: regular commits, clear messages, and disciplined branch use so the team always knows the current state of the project. I know how to handle merges and pull requests, and I keep the repository tidy so others can build on my work without extra friction.", 
                desc2: "Working in Scrum environments comes naturally to me — I collaborate well as a team member and can step into the Scrum Master role when needed. I contribute to sprint planning, attend daily stand-ups, and help remove blockers so the team can maintain steady velocity and focus on delivering value.",
                desc3: "I pair Git best-practices with Scrum routines to keep development predictable and transparent: up-to-date branches, frequent integration, and clear story acceptance criteria. This combination makes it easy to track progress, onboard others, and keep the product moving forward.",
                theme: { primary: '#eab308', hover: '#f87171', glow1: 'rgba(234, 179, 8, 0.15)', glow2: 'rgba(248, 113, 113, 0.15)', shadow: 'rgba(234, 179, 8, 0.4)' }
            }
        ];

        function createSkillCard(skill, imageSrc) {
            const card = document.createElement('div');
            card.className = 'skill-card';
            card.onclick = () => openModal(skill);
            const src = imageSrc || skill.img || skill.carousel1;
            card.innerHTML = `
                <img src="${src}" alt="${skill.name}">
                <div class="skill-card-text">${skill.name}</div>
            `;
            return card;
        }

        function initCarousels() {
            const trackDown = document.getElementById('track-down');
            const trackUp = document.getElementById('track-up');
            const half = Math.ceil(skillsData.length / 2);
            const col1Data = skillsData.slice(0, half);
            const col2Data = skillsData.slice(half);

            const populateTrack = (track, data) => {
                for (let i = 0; i < 4; i++) {
                    data.forEach(skill => track.appendChild(createSkillCard(skill)));
                }
            };

            populateTrack(trackDown, col1Data);
            populateTrack(trackUp, col2Data);

            const setShiftAmounts = () => {
                const isMobile = window.innerWidth < 768;
                const cardHeight = isMobile ? 180 : 260;
                const remValue = parseFloat(getComputedStyle(document.documentElement).fontSize);
                const gapSize = isMobile ? 1 * remValue : 2 * remValue;

                const singleSetHeight1 = col1Data.length * cardHeight + col1Data.length * gapSize;
                const singleSetHeight2 = col2Data.length * cardHeight + col2Data.length * gapSize;
                
                trackDown.style.setProperty('--shift-amount', `-${singleSetHeight1}px`);
                trackUp.style.setProperty('--shift-amount', `-${singleSetHeight2}px`);
            };

            setShiftAmounts();
            window.addEventListener('resize', setShiftAmounts);

            const viewList = document.getElementById('view-list');
            skillsData.forEach(skill => viewList.appendChild(createSkillCard(skill)));

            setupViewToggles();
        }

        function setupViewToggles() {
            const btnSlider = document.getElementById('toggle-slider');
            const btnList = document.getElementById('toggle-list');
            const viewSlider = document.getElementById('view-slider');
            const viewList = document.getElementById('view-list');

            btnSlider.addEventListener('click', () => {
                viewSlider.classList.remove('hidden'); viewSlider.classList.add('flex');
                viewList.classList.remove('grid'); viewList.classList.add('hidden');
                btnSlider.className = "cursor-pointer text-[#00ffcc] transition-colors";
                btnList.className = "cursor-pointer text-gray-500 hover:text-white transition-colors";
            });

            btnList.addEventListener('click', () => {
                viewSlider.classList.remove('flex'); viewSlider.classList.add('hidden');
                viewList.classList.remove('hidden'); viewList.classList.add('grid');
                btnList.className = "cursor-pointer text-[#00ffcc] transition-colors";
                btnSlider.className = "cursor-pointer text-gray-500 hover:text-white transition-colors";
            });
        }

        // --- MODAL LOGIC ---
        const modalOverlay = document.getElementById('skill-modal-overlay');
        const closeModalBtn = document.getElementById('close-modal');
        const modalBox = document.getElementById('dynamic-modal-box');

        function openModal(skill) {
            document.getElementById('modal-title').innerText = skill.name;
            document.getElementById('modal-desc-1').innerText = skill.desc1;
            document.getElementById('modal-desc-2').innerText = skill.desc2;
            document.getElementById('modal-desc-3').innerText = skill.desc3;
            
            // Inject skill-specific theme colors
            modalBox.style.setProperty('--theme-primary', skill.theme.primary);
            modalBox.style.setProperty('--theme-hover', skill.theme.hover);
            modalBox.style.setProperty('--theme-glow-1', skill.theme.glow1);
            modalBox.style.setProperty('--theme-glow-2', skill.theme.glow2);
            modalBox.style.setProperty('--theme-shadow', skill.theme.shadow);
            
            // Reset scroll position to top whenever a new modal is opened
            const scrollArea = modalBox.querySelector('.modal-scroll-area');
            if(scrollArea) scrollArea.scrollTop = 0;

            // Inject media into modal placeholders (primary + supporting)
            const primaryContainer = modalBox.querySelector('.modal-media-placeholder');
            const smallContainer = modalBox.querySelector('.modal-small-media');
            function renderMedia(container, src, altText, opts = {}) {
                if(!container) return;
                container.innerHTML = '';
                container.style.overflow = ''; // reset
                if(!src) { container.innerHTML = altText; return; }
                const ext = src.split('.').pop().toLowerCase();
                const fit = opts.fit || 'cover';

                if(ext === 'mp4') {
                    const video = document.createElement('video');
                    video.setAttribute('controls', '');
                    video.setAttribute('playsinline', '');
                    video.style.width = '100%';
                    video.style.height = '100%';
                    video.style.objectFit = fit;
                    video.style.borderRadius = '12px';
                    const source = document.createElement('source');
                    source.src = src; source.type = 'video/mp4';
                    video.appendChild(source);
                    container.appendChild(video);
                    return;
                }

                // For images, load and adjust the container to match image aspect ratio
                const img = new Image();
                img.src = src;
                img.alt = altText;
                img.style.borderRadius = '12px';
                img.style.display = 'block';
                img.style.background = '#000';

                img.onload = () => {
                    const nw = img.naturalWidth, nh = img.naturalHeight;
                    const containerWidth = container.clientWidth || (container.getBoundingClientRect().width || 600);
                    const desiredHeight = containerWidth * (nh / nw);
                    const maxHeight = Math.max(window.innerHeight * 0.85, 300);

                    if (opts.fit === 'contain') {
                        if (desiredHeight <= maxHeight) {
                            container.style.height = `${Math.round(desiredHeight)}px`;
                            img.style.width = '100%';
                            img.style.height = '100%';
                            img.style.objectFit = 'contain';
                        } else {
                            // image too tall for viewport - cap height and allow scroll inside container
                            container.style.height = `${Math.round(maxHeight)}px`;
                            container.style.overflow = 'auto';
                            img.style.width = 'auto';
                            img.style.maxHeight = '100%';
                            img.style.objectFit = 'contain';
                            img.style.margin = '0 auto';
                        }
                    } else {
                        container.style.height = `${Math.round(Math.min(desiredHeight, maxHeight))}px`;
                        img.style.width = '100%';
                        img.style.height = '100%';
                        img.style.objectFit = 'cover';
                    }

                    // append after sizing to avoid flashes
                    container.appendChild(img);
                };

                img.onerror = () => { container.innerHTML = altText; };
            }

            // Use carousel1 as the modal primary (top) and carousel2 for the small below it
            // Primary should show full image without being cropped
            renderMedia(primaryContainer, skill.carousel1 || skill.img, 'Primary Display', { fit: 'contain' });
            renderMedia(smallContainer, skill.carousel2 || skill.support || '', 'Supporting Asset', { fit: 'cover' });

            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; 
        }

        function closeModal() {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = ''; 
            // Clear injected media to release resources
            const primaryContainer = modalBox.querySelector('.modal-media-placeholder');
            const smallContainer = modalBox.querySelector('.modal-small-media');
            if(primaryContainer) { primaryContainer.innerHTML = 'Primary Display / Video / Interactive Element'; primaryContainer.style.height = ''; primaryContainer.style.overflow = ''; }
            if(smallContainer) { smallContainer.innerHTML = 'Supporting Asset'; smallContainer.style.height = ''; smallContainer.style.overflow = ''; }
        }

        closeModalBtn.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });

        // --- SOUNDBAR INITIALIZATION ---
        function initSoundBars() {
            const topBar = document.getElementById('soundbar-top');
            const bottomBar = document.getElementById('soundbar-bottom');
            const numBars = 120; // Enough bars to span screens
            
            const createBars = (container, isDown) => {
                if(!container) return;
                container.innerHTML = '';
                for(let i = 0; i < numBars; i++) {
                    const bar = document.createElement('div');
                    bar.className = `eq-bar ${isDown ? 'down' : ''}`;
                    
                    // Increased duration for a slower, smoother bounce (0.8s to 2.3s)
                    const duration = 0.8 + Math.random() * 1.5;
                    const delay = Math.random() * -3; 
                    
                    bar.style.animationDuration = `${duration}s`;
                    bar.style.animationDelay = `${delay}s`;
                    container.appendChild(bar);
                }
            }
            
            createBars(topBar, false);
            createBars(bottomBar, true);
        }

        document.addEventListener('DOMContentLoaded', () => {
            initCarousels();
            initSoundBars();
        });