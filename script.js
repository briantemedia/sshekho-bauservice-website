/**
 * Consolidated JavaScript File
 *
 * This script combines the functionality from all page-specific JavaScript files
 * into a single, optimized file. It handles:
 * - Global site features (header, mobile menu, modals, page transitions)
 * - Page-specific logic for Home, Leistungen, Projekte, Über Uns, and Kontakt pages
 * - Animations using GSAP and ScrollTrigger
 * - Dynamic content rendering for projects and sliders
 * - Interactive form handling
 */
document.addEventListener('DOMContentLoaded', () => {
    // -----------------------------------------------------------------------------
    // --- INITIALIZATION & PLUGIN REGISTRATION ---
    // -----------------------------------------------------------------------------

    // Initialize Lucide icons if the library is present
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Register GSAP plugins if GSAP is present
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    // -----------------------------------------------------------------------------
    // --- GLOBAL DOM ELEMENT SELECTORS ---
    // -----------------------------------------------------------------------------

    const mainHeader = document.querySelector('.main-header');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenuCloseButton = document.querySelectorAll('#mobile-menu-close-button, #mobile-menu button')[0];
    const pageLinks = document.querySelectorAll('.page-link');
    const impressumModal = document.getElementById('impressum-modal');
    const datenschutzModal = document.getElementById('datenschutz-modal');
    const impressumLink = document.querySelector('.impressum-link');
    const datenschutzLink = document.querySelector('.datenschutz-link');
    const closeModalBtns = document.querySelectorAll('.close-modal-btn');
    const glowCards = document.querySelectorAll('.glow-card');

    // -----------------------------------------------------------------------------
    // --- GLOBAL FUNCTIONS & BEHAVIORS ---
    // -----------------------------------------------------------------------------

    // Set current year in the footer
    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // Header scroll behavior
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        if (mainHeader) {
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                mainHeader.classList.add('header-hidden');
            } else {
                mainHeader.classList.remove('header-hidden');
            }
            if (window.scrollY > 50) {
                mainHeader.classList.add('header-scrolled');
            } else {
                mainHeader.classList.remove('header-scrolled');
            }
        }
        lastScrollY = currentScrollY;
    });

    // Mobile menu toggle
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.remove('hidden');
            mobileMenuButton.setAttribute('aria-expanded', 'true');
        });
    }
    if (mobileMenuCloseButton && mobileMenu) {
        mobileMenuCloseButton.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
        });
    }

    // Page transition effect
    pageLinks.forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            const currentPath = window.location.pathname.split('/').pop();
            if (href && href.endsWith('.html') && href !== currentPath) {
                e.preventDefault();
                document.body.classList.add('is-leaving');
                setTimeout(() => {
                    window.location.href = href;
                }, 400);
            }
        });
    });

    // Modal (Impressum/Datenschutz) functionality
    function openModal(modal) {
        if (!modal) return;
        modal.classList.remove('hidden');
        document.body.classList.add('modal-open');
    }

    function closeModal() {
        if (impressumModal) impressumModal.classList.add('hidden');
        if (datenschutzModal) datenschutzModal.classList.add('hidden');
        document.body.classList.remove('modal-open');
    }

    if (impressumLink) impressumLink.addEventListener('click', e => {
        e.preventDefault();
        openModal(impressumModal);
    });
    if (datenschutzLink) datenschutzLink.addEventListener('click', e => {
        e.preventDefault();
        openModal(datenschutzModal);
    });
    closeModalBtns.forEach(btn => btn.addEventListener('click', closeModal));

    // Glow card effect on mouse move
    glowCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        });
    });

    // Global Footer Parallax Background Effect
    const footerBg = document.getElementById('footer-bg-image');
    if (footerBg && typeof gsap !== 'undefined') {
        gsap.to(footerBg, {
            yPercent: -20,
            ease: "none",
            scrollTrigger: {
                trigger: "#kontakt, .footer-content",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    }

    // -----------------------------------------------------------------------------
    // --- PAGE-SPECIFIC LOGIC ---
    // -----------------------------------------------------------------------------

    // --- LOGIC FOR HOME PAGE (script.js) ---
    if (document.body.id === 'home-page') {
        const backgroundImages = [
            'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop',
            'images/Startseite/handwerk-praezision-metallbearbeitung-sbs-rhein-main-01.webp',
            'https://images.unsplash.com/photo-1581294078723-836b859556a3?q=80&w=1974&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1600271655358-1d74a7479a2c?q=80&w=2070&auto=format&fit=crop'
        ];
        const bg1 = document.getElementById('hero-bg-1');
        const bg2 = document.getElementById('hero-bg-2');
        if (bg1 && bg2) {
            let currentImageIndex = 0;
            let activeBg = bg1;
            let inactiveBg = bg2;
            activeBg.style.backgroundImage = `url('${backgroundImages[0]}')`;
            setInterval(() => {
                currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
                inactiveBg.style.backgroundImage = `url('${backgroundImages[currentImageIndex]}')`;
                activeBg.style.opacity = 0;
                inactiveBg.style.opacity = 1;
                [activeBg, inactiveBg] = [inactiveBg, activeBg];
            }, 10000);
        }

        const accordionItems = document.querySelectorAll('.service-accordion-item');
        accordionItems.forEach(item => {
            const question = item.querySelector('.service-accordion-question');
            if (question) {
                question.addEventListener('click', () => {
                    const wasActive = item.classList.contains('active');
                    accordionItems.forEach(other => other.classList.remove('active'));
                    if (!wasActive) item.classList.add('active');
                });
            }
        });
    }

    // --- LOGIC FOR LEISTUNGEN PAGE (leistungen.js) ---
    if (document.body.id === 'leistungen-page') {
    // ... (your existing intersection observer and smooth scroll code) ...

    const sliderTrack = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.portfolio-slide');

    if (sliderTrack && slides.length > 0) {
        const prevButton = document.getElementById('prev-slide');
        const nextButton = document.getElementById('next-slide');
        const indicatorsContainer = document.getElementById('slide-indicators');
        let currentSlide = 0;

        // Create indicator dots
        slides.forEach((_, i) => {
            const indicator = document.createElement('button');
            indicator.setAttribute('aria-label', `Go to slide ${i + 1}`);
            indicator.className = `h-3 rounded-full transition-all duration-300 ${i === 0 ? 'bg-yellow-400 w-8' : 'bg-slate-400 w-3'}`;
            indicator.addEventListener('click', () => showSlide(i));
            if (indicatorsContainer) indicatorsContainer.appendChild(indicator);
        });
        
        const indicators = indicatorsContainer ? indicatorsContainer.querySelectorAll('button') : [];

        function showSlide(index) {
            // Boundary check
            if (index >= slides.length) index = 0;
            if (index < 0) index = slides.length - 1;

            // Move the track
            sliderTrack.style.transform = `translateX(-${index * 100}%)`;

            // Update indicators
            if (indicators.length > 0) {
                indicators[currentSlide].className = 'h-3 w-3 rounded-full transition-all duration-300 bg-slate-400';
                indicators[index].className = 'h-3 w-8 rounded-full transition-all duration-300 bg-yellow-400';
            }
            
            currentSlide = index;
        }

        if (prevButton) prevButton.addEventListener('click', () => showSlide(currentSlide - 1));
        if (nextButton) nextButton.addEventListener('click', () => showSlide(currentSlide + 1));
        
        // Initialize first slide
        showSlide(0);
    }

    // ... (the rest of your JavaScript for this page) ...
}

    // --- LOGIC FOR PROJEKTE PAGE (projekte.js) ---
    if (document.body.id === 'projekte-page') {
        const projectData = {
            '1': { 
                title: 'Gestaltung von Außenanlagen', 
                category: 'Galabau', 
                categoryClass: 'text-green-500', 
                description: 'Professionelle Gestaltung von Außenbereichen inklusive Erdbewegung mit moderner Technik und Minibagger.', 
                tasks: ['Beratung & Planung', 'Einsatz von Minibagger', 'Anlegen von Wegen', 'Bepflanzung'], 
                gallery: [ 'images/projekte/aussenanlagen-gestaltung-team-minibagger-sbs-rhein-main-06.webp' ] 
            },
            '2': { 
                title: 'Präzise Pflasterarbeiten', 
                category: 'Tiefbau', 
                categoryClass: 'text-amber-500', 
                description: 'Fachmännisches Setzen von Pflastersteinen durch erfahrene Steinsetzer für langlebige und ästhetische Flächen.', 
                tasks: ['Handwerkliches Setzen', 'Erstellung des Feinplanums', 'Verfugen und Verdichten'], 
                gallery: [ 'images/projekte/pflasterarbeiten-steinsetzer-handwerk-sbs-rhein-main-05.webp' ] 
            },
            '3': { 
                title: 'Vorbereitung des Unterbaus', 
                category: 'Tiefbau', 
                categoryClass: 'text-amber-500', 
                description: 'Die Grundlage für haltbare Wege und Plätze: die sorgfältige Vorbereitung und Verdichtung des Unterbaus.', 
                tasks: ['Aushub und Planierung', 'Einbringen von Schotter', 'Präzise Verdichtung'], 
                gallery: [ 'images/projekte/pflasterarbeiten-vorbereitung-unterbau-sbs-rhein-main-02.webp' ] 
            },
            '4': { 
                title: 'Teamarbeit auf der Baustelle', 
                category: 'Tiefbau', 
                categoryClass: 'text-amber-500', 
                description: 'Unser eingespieltes Team bei der Durchführung von Pflasterarbeiten auf einer Baustelle im Rhein-Main-Gebiet.', 
                tasks: ['Team-Koordination', 'Materiallogistik', 'Qualitätssicherung vor Ort'], 
                gallery: [ 'images/projekte/team-sbs-bauservice-pflasterarbeiten-baustelle-rhein-main-04.webp' ] 
            },
            '5': { 
                title: 'Erdbewegung mit Minibagger', 
                category: 'Tiefbau', 
                categoryClass: 'text-amber-500', 
                description: 'Effiziente Erdbewegung und Aushubarbeiten mit unserem wendigen Minibagger, bedient von einer ausgebildeten Fachkraft.', 
                tasks: ['Aushub von Gräben', 'Modellierung des Geländes', 'Laden und Transport'], 
                gallery: [ 'images/projekte/tiefbau-erdbewegung-fachkraft-minibagger-sbs-rhein-main-03.webp' ] 
            },
            '6': { 
                title: 'Glasfaserverlegung in Gießen', 
                category: 'Tiefbau', 
                categoryClass: 'text-amber-500', 
                description: 'Umfassende Tiefbauarbeiten für den Glasfaserausbau in Gießen, inklusive der fachgerechten Verlegung von Leerrohren und der Wiederherstellung der Oberflächen.', 
                tasks: ['Präzise Grabenführung', 'Fachgerechte Rohrverlegung', 'Oberflächen-Wiederherstellung', 'Endabnahme'], 
                gallery: [ 'images/projekte/tiefbau-leerrohr-kabelverlegung-sbs-rhein-main-01.webp' ] 
            }
        };

        const modal = document.getElementById('project-modal');
        const modalContent = document.getElementById('project-modal-content');
        const modalCloseBtn = document.getElementById('modal-close-btn');

        function openProjectModal(projectId) {
            const project = projectData[projectId];
            if (!project || !modal) return;
            
            modal.querySelector('#modal-title').textContent = project.title;
            const categoryEl = modal.querySelector('#modal-category');
            categoryEl.textContent = project.category;
            categoryEl.className = `text-sm font-bold uppercase tracking-wider ${project.categoryClass}`;
            modal.querySelector('#modal-description').textContent = project.description;
            const tasksList = modal.querySelector('#modal-tasks');
            tasksList.innerHTML = project.tasks.map(task => `<li class="flex items-start"><i data-lucide="check" class="w-4 h-4 mr-2 mt-1 text-green-500"></i><span>${task}</span></li>`).join('');
            const gallery = modal.querySelector('#modal-gallery');
            gallery.innerHTML = project.gallery.map(imgUrl => `<div class="rounded-md overflow-hidden aspect-video"><img src="${imgUrl}" class="w-full h-full object-cover"></div>`).join('');
            
            if (typeof lucide !== 'undefined') lucide.createIcons();
            
            modal.classList.remove('hidden');
            document.body.classList.add('modal-open');
        }

        function closeModal() {
            if (!modal) return;
            modal.classList.add('hidden');
            document.body.classList.remove('modal-open');
        }

        if(modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
        if(modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

        const featuredBtn = document.getElementById('featured-project-details-btn');
        if (featuredBtn) {
            featuredBtn.addEventListener('click', (e) => {
                e.preventDefault();
                openProjectModal('6'); 
            });
        }
    }

    // --- LOGIC FOR KONTAKT PAGE (kontakt.js) ---
    if (document.body.id === 'kontakt-page') {
        const surveySteps = document.querySelectorAll('.survey-step');
        const formWrapper = document.getElementById('contact-form-wrapper');
        const hiddenInputIds = ['survey-service', 'survey-scale', 'survey-timeline'];

        const showStep = (stepElement) => {
            if (stepElement && typeof gsap !== 'undefined') {
                gsap.to(stepElement, {
                    display: 'block',
                    opacity: 1,
                    duration: 0.5,
                    ease: 'power2.out',
                    onStart: () => setTimeout(() => stepElement.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100)
                });
            }
        };

        const hideStep = (stepElement, onCompleteCallback) => {
             if (stepElement && typeof gsap !== 'undefined') {
                gsap.to(stepElement, {
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.in',
                    onComplete: () => {
                        stepElement.style.display = 'none';
                        if (onCompleteCallback) onCompleteCallback();
                    }
                });
            }
        };

        surveySteps.forEach((step, index) => {
            const options = step.querySelectorAll('.survey-option');
            options.forEach(option => {
                option.addEventListener('click', () => {
                    options.forEach(opt => opt.classList.remove('active'));
                    option.classList.add('active');
                    document.getElementById(hiddenInputIds[index]).value = option.dataset.value;
                    hideStep(step, () => {
                        if (index < surveySteps.length - 1) {
                            showStep(surveySteps[index + 1]);
                        } else {
                            if (formWrapper && typeof gsap !== 'undefined') {
                                gsap.to(formWrapper, {
                                    height: 'auto',
                                    opacity: 1,
                                    duration: 0.8,
                                    ease: 'expo.out',
                                    onStart: () => setTimeout(() => formWrapper.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100)
                                });
                            }
                        }
                    });
                });
            });
        });

        if (surveySteps.length > 0) {
            showStep(surveySteps[0]);
        }
    }


    // -----------------------------------------------------------------------------
    // --- GSAP ANIMATIONS (RUNS ON ALL PAGES WHERE SELECTORS ARE FOUND) ---
    // -----------------------------------------------------------------------------

    if (typeof gsap !== 'undefined') {
        const animateOnScroll = (selector, options) => {
            const elements = document.querySelectorAll(selector);
            if (elements.length > 0) {
                const { trigger, ...restOptions } = options || {};
                gsap.from(elements, {
                    scrollTrigger: {
                        trigger: trigger || elements[0].parentElement,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    },
                    duration: 0.8,
                    y: 50,
                    opacity: 0,
                    stagger: 0.15,
                    ease: "power3.out",
                    ...restOptions
                });
            }
        };
        
        // --- Animations for specific pages ---
        if (document.body.id === 'home-page') {
            gsap.from(".hero-content > *", { duration: 1, y: 50, opacity: 0, stagger: 0.2, ease: "power3.out", delay: 0.5 });
            animateOnScroll(".section-title");
            animateOnScroll(".competency-card", { trigger: ".competency-cards-wrapper", stagger: 0.2 });
            animateOnScroll(".about-image", { x: -80 });
            animateOnScroll(".about-text", { x: 80 });
            animateOnScroll(".services-col-1", { x: -80 });
            animateOnScroll(".services-col-2", { x: 80 });
            animateOnScroll("#projects .project-card", { trigger: "#projects", scale: 0.9, stagger: 0.15 });
            animateOnScroll(".projects-button");
            animateOnScroll(".usp-cards > div", { stagger: 0.1 });
            const processSection = document.querySelector("#process");
            if (processSection) {
                const tl = gsap.timeline({ scrollTrigger: { trigger: processSection, start: "top 60%" } });
                tl.from(".process-step", { opacity: 0, y: 50, stagger: 0.2, duration: 0.8, ease: "power3.out" })
                  .from(".connector-h", { width: 0, stagger: 0.2, duration: 0.6, ease: "power2.inOut" }, "-=0.6")
                  .from(".connector-v", { height: 0, stagger: 0.2, duration: 0.6, ease: "power2.inOut" }, "<");
            }
        }
        
        if (document.body.id === 'leistungen-page' || document.body.id === 'projekte-page' || document.body.id === 'ueber-uns-page') {
             animateOnScroll('.hero-content > *');
        }

        if (document.body.id === 'leistungen-page') {
            animateOnScroll('#service-nav');
            animateOnScroll('.service-section-card');
            animateOnScroll('#portfolio-slider');
            animateOnScroll('.safety-card');
            animateOnScroll('.faq-list > .faq-item');
            animateOnScroll('.faq-contact-card');
        }
        
        if (document.body.id === 'projekte-page') {
            animateOnScroll('.stats-container > .stat-item');
            animateOnScroll('#about-cta > div');
            const statsSection = document.getElementById('stats');
            if (statsSection) {
                ScrollTrigger.create({
                    trigger: statsSection,
                    start: "top 80%",
                    once: true,
                    onEnter: () => {
                        statsSection.querySelectorAll("[data-value]").forEach(counter => {
                            const targetValue = parseInt(counter.dataset.value, 10);
                            const suffix = counter.dataset.suffix || '';
                            let proxy = { val: 0 };
                            gsap.to(proxy, {
                                val: targetValue,
                                duration: 2,
                                ease: "power2.out",
                                onUpdate: () => {
                                    counter.textContent = Math.round(proxy.val) + suffix;
                                }
                            });
                        });
                    }
                });
            }
        }
        
        if (document.body.id === 'ueber-uns-page') {
            animateOnScroll('#mission .grid > div');
            animateOnScroll('.manifest-card');
            animateOnScroll('#team .grid > div');
            animateOnScroll('.founder-text-panel > div', { x: -50 });
            animateOnScroll('.founder-image-panel .relative', { x: 50, scale: 0.9 });
        }
        
        // --- Common animations (e.g., footer) ---
        animateOnScroll('footer .footer-col', { trigger: ".footer-content" });
    }
});