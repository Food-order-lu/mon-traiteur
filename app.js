// Router - Simple hash-based routing
class Router {
    constructor() {
        this.routes = {};
        this.currentPath = window.location.hash.slice(1) || '/';

        window.addEventListener('hashchange', () => {
            this.currentPath = window.location.hash.slice(1) || '/';
            this.render();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    route(path, handler) {
        this.routes[path] = handler;
    }

    render() {
        const handler = this.routes[this.currentPath] || this.routes['/'];
        if (handler) {
            handler();
        }
    }
}

// Helper function to create elements
function createElement(tag, attributes = {}, ...children) {
    const element = document.createElement(tag);

    Object.entries(attributes).forEach(([key, value]) => {
        if (key === 'className') {
            element.className = value;
        } else if (key === 'style' && typeof value === 'object') {
            Object.assign(element.style, value);
        } else if (key.startsWith('on') && typeof value === 'function') {
            element.addEventListener(key.slice(2).toLowerCase(), value);
        } else {
            element.setAttribute(key, value);
        }
    });

    children.forEach(child => {
        if (typeof child === 'string') {
            element.appendChild(document.createTextNode(child));
        } else if (child instanceof Node) {
            element.appendChild(child);
        }
    });

    return element;
}

// Header Component
function createHeader() {
    const nav = createElement('nav', { className: 'nav', id: 'mainNav' },
        createElement('a', { href: '#/' }, 'Accueil'),
        createElement('a', { href: '#/services' }, 'Services'),
        createElement('a', { href: '#/contact' }, 'Contact'),
        createElement('a', { href: 'tel:+352691393199', className: 'phone-link' },
            '📞 +352 691 393 199'
        ),
        createElement('a', { href: '#/devis', className: 'btn btn-primary btn-sm' }, 'Obtenir un Devis')
    );

    const hamburger = createElement('button', {
        className: 'hamburger',
        id: 'hamburgerBtn',
        'aria-label': 'Toggle menu'
    },
        createElement('span'),
        createElement('span'),
        createElement('span')
    );

    const header = createElement('header', { className: 'header' },
        createElement('div', { className: 'header-content' },
            createElement('a', { href: '#/', className: 'logo' }, 'Mon Traiteur'),
            hamburger,
            nav
        )
    );

    // Toggle menu on hamburger click
    setTimeout(() => {
        const btn = document.getElementById('hamburgerBtn');
        const navEl = document.getElementById('mainNav');
        if (btn && navEl) {
            btn.addEventListener('click', () => {
                btn.classList.toggle('active');
                navEl.classList.toggle('active');
            });

            // Close menu when clicking a link
            navEl.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    btn.classList.remove('active');
                    navEl.classList.remove('active');
                });
            });
        }
    }, 0);

    return header;
}

// Footer Component
function createFooter() {
    return createElement('footer', { className: 'footer' },
        createElement('div', { className: 'footer-content' },
            createElement('div', { className: 'footer-section' },
                createElement('h3', {}, 'Mon Traiteur'),
                createElement('p', {}, 'Service traiteur de prestige au Luxembourg depuis plus de 20 ans.')
            ),
            createElement('div', { className: 'footer-section' },
                createElement('h3', {}, 'Nos Services'),
                createElement('a', { href: '#/entreprise' }, 'Entreprise'),
                createElement('a', { href: '#/food-truck' }, 'Food Truck'),
                createElement('a', { href: '#/evenements-sociaux' }, 'Événements Sociaux'),
                createElement('a', { href: '#/anniversaires' }, 'Anniversaires')
            ),
            createElement('div', { className: 'footer-section' },
                createElement('h3', {}, 'Contact'),
                createElement('p', {}, 'Tél: +352 691 393 199'),
                createElement('p', {}, 'Email: contact@montraiteur.lu'),
                createElement('p', {}, 'Luxembourg et environs')
            )
        ),
        createElement('div', { className: 'footer-bottom' },
            createElement('p', {}, '© 2025 Mon Traiteur Luxembourg - Fait avec passion. Tous droits réservés.')
        )
    );
}

// Setup fade-in observer
function setupFadeInObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up').forEach(el => {
        observer.observe(el);
    });
}

// Home Page
function createHomePage() {
    const page = createElement('div', {},
        // Hero Section
        createElement('section', { className: 'hero' },
            createElement('div', { className: 'hero-bg' },
                createElement('img', {
                    src: 'assets/entreprise.png',
                    alt: 'Catering Background',
                    style: { width: '100%', height: '100%', objectFit: 'cover' }
                })
            ),
            createElement('div', { className: 'hero-overlay' }),
            createElement('div', { className: 'hero-content' },
                createElement('h1', {},
                    'Service Traiteur ',
                    createElement('span', { className: 'accent' }, 'de Prestige')
                ),
                createElement('p', {}, 'Des repas délicieux et sur mesure pour tous vos événements au Luxembourg'),
                createElement('div', { className: 'hero-buttons' },
                    createElement('a', { href: '#/devis', className: 'btn btn-primary' }, 'Obtenir un Devis'),
                    createElement('a', { href: '#/services', className: 'btn btn-outline' }, 'Nos Services')
                )
            )
        ),

        // Stats Section
        createElement('div', { className: 'container' },
            createElement('div', { className: 'stats' },
                createElement('div', { className: 'stat-card fade-in-up' },
                    createElement('span', { className: 'stat-number' }, '20+'),
                    createElement('span', { className: 'stat-label' }, "Années d'expérience")
                ),
                createElement('div', { className: 'stat-card fade-in-up' },
                    createElement('span', { className: 'stat-number' }, '70+'),
                    createElement('span', { className: 'stat-label' }, 'Prestations par an')
                ),
                createElement('div', { className: 'stat-card fade-in-up' },
                    createElement('span', { className: 'stat-number' }, '500+'),
                    createElement('span', { className: 'stat-label' }, 'Clients satisfaits')
                ),
                createElement('div', { className: 'stat-card fade-in-up' },
                    createElement('span', { className: 'stat-number' }, '100%'),
                    createElement('span', { className: 'stat-label' }, 'Satisfaction garantie')
                )
            )
        ),

        // Nos 4 Points Forts Section
        createElement('section', { className: 'section advantages-section' },
            createElement('div', { className: 'container' },
                createElement('div', { className: 'text-center mb-xl fade-in-up' },
                    createElement('h2', {}, 'Nos Points Forts'),
                    createElement('p', {}, "Ce qui fait de nous le choix numéro 1 pour votre traiteur au Luxembourg")
                ),
                createElement('div', { className: 'advantages-grid' },
                    createElement('div', { className: 'advantage-card fade-in-up' },
                        createElement('img', { src: 'assets/icon-plat-chaud.png', alt: 'Qualité Premium', className: 'advantage-icon-img' }),
                        createElement('h3', {}, 'Qualité Premium'),
                        createElement('p', {}, "Ingrédients frais sélectionnés quotidiennement auprès de producteurs locaux. Nous garantissons une qualité irréprochable pour chaque prestation.")
                    ),
                    createElement('div', { className: 'advantage-card fade-in-up' },
                        createElement('img', { src: 'assets/icon-chef.png', alt: 'Équipe Expérimentée', className: 'advantage-icon-img' }),
                        createElement('h3', {}, 'Équipe Expérimentée'),
                        createElement('p', {}, "Nos chefs et serveurs professionnels possèdent plus de 20 ans d'expérience dans la restauration haut de gamme et le service événementiel.")
                    ),
                    createElement('div', { className: 'advantage-card fade-in-up' },
                        createElement('img', { src: 'assets/icon-assiette.png', alt: 'Sur Mesure', className: 'advantage-icon-img' }),
                        createElement('h3', {}, 'Sur Mesure'),
                        createElement('p', {}, "Chaque menu est personnalisé selon vos goûts, vos besoins diététiques et le thème de votre événement. Flexibilité totale garantie.")
                    ),
                    createElement('div', { className: 'advantage-card fade-in-up' },
                        createElement('img', { src: 'assets/icon-qualite.png', alt: 'Service Certifié', className: 'advantage-icon-img' }),
                        createElement('h3', {}, 'Service Certifié'),
                        createElement('p', {}, "Certifications et respect strict des normes d'hygiène et de sécurité alimentaire. Votre satisfaction est notre priorité absolue.")
                    ),
                    createElement('div', { className: 'advantage-card fade-in-up' },
                        createElement('img', { src: 'assets/icon-livraison.png', alt: 'Livraison Soignée', className: 'advantage-icon-img' }),
                        createElement('h3', {}, 'Livraison Soignée'),
                        createElement('p', {}, "Livraison et installation complètes. Nos équipes gèrent tout de A à Z pour que vous puissiez profiter pleinement de votre événement.")
                    )
                )
            )
        ),

        // Events Section
        createElement('section', { className: 'section' },
            createElement('div', { className: 'container' },
                createElement('div', { className: 'text-center mb-lg fade-in-up' },
                    createElement('h2', {}, 'Événements pris en charge'),
                    createElement('p', {}, "Que ce soit pour un service Food Truck, un anniversaire, un événement d'entreprise ou une fête privée, nous vous proposons des repas délicieux et sur mesure")
                ),
                createElement('div', { className: 'events-grid' },
                    createEventCard(
                        '#/entreprise',
                        'assets/entreprise.png',
                        'Service Entreprise',
                        'Entreprise',
                        "Service traiteur professionnel pour vos événements d'entreprise, séminaires et réunions."
                    ),
                    createEventCard(
                        '#/food-truck',
                        'assets/foodtruck.png',
                        'Food Truck',
                        'Food Truck',
                        'Notre food truck mobile pour vos événements extérieurs. Cuisine variée et service rapide.'
                    ),
                    createEventCard(
                        '#/evenements-sociaux',
                        'assets/social.png',
                        'Événements Sociaux',
                        'Événements Sociaux',
                        "Des prestations élégantes pour mariages, galas et événements d'exception."
                    ),
                    createEventCard(
                        '#/anniversaires',
                        'assets/anniversaires.png',
                        'Anniversaires',
                        'Anniversaires',
                        'Célébrez vos moments spéciaux avec nos services de traiteur personnalisés.'
                    )
                )
            )
        ),

        // Notre Processus Section
        createElement('section', { className: 'section process-section' },
            createElement('div', { className: 'container' },
                createElement('div', { className: 'text-center mb-xl fade-in-up' },
                    createElement('h2', {}, 'Notre Processus'),
                    createElement('p', {}, "De la prise de contact à la réalisation de votre événement")
                ),
                createElement('div', { className: 'process-grid' },
                    createElement('div', { className: 'process-step fade-in-up' },
                        createElement('div', { className: 'process-number' }, '1'),
                        createElement('h3', {}, 'Consultation'),
                        createElement('p', {}, "Nous discutons ensemble de vos besoins, du type d'événement, du nombre d'invités et de vos préférences culinaires.")
                    ),
                    createElement('div', { className: 'process-step fade-in-up' },
                        createElement('div', { className: 'process-number' }, '2'),
                        createElement('h3', {}, 'Menu Personnalisé'),
                        createElement('p', {}, "Nos chefs créent un menu sur mesure adapté à vos goûts, votre budget et aux contraintes alimentaires de vos invités.")
                    ),
                    createElement('div', { className: 'process-step fade-in-up' },
                        createElement('div', { className: 'process-number' }, '3'),
                        createElement('h3', {}, 'Préparation'),
                        createElement('p', {}, "Nous préparons tous les plats avec soin en utilisant des ingrédients frais de première qualité sélectionnés le jour même.")
                    ),
                    createElement('div', { className: 'process-step fade-in-up' },
                        createElement('div', { className: 'process-number' }, '4'),
                        createElement('h3', {}, 'Service Impeccable'),
                        createElement('p', {}, "Notre équipe professionnelle assure un service irréprochable le jour J pour que votre événement soit parfait.")
                    )
                )
            )
        ),

        // Satisfaction Section (Why Choose Us)
        createElement('section', { className: 'satisfaction-section' },
            createElement('div', { className: 'container' },
                createElement('div', { className: 'text-center mb-xl fade-in-up' },
                    createElement('h2', {}, 'Pourquoi Nous Choisir'),
                    createElement('p', {}, "Plus de 20 ans d'excellence culinaire au service de vos événements")
                ),
                createElement('div', { className: 'satisfaction-grid' },
                    createElement('div', { className: 'fade-in-up' },
                        createElement('h3', {}, 'Notre Engagement Qualité'),
                        createElement('p', {}, "Avec plus de 20 ans d'expérience dans le domaine de la restauration au Luxembourg, nous mettons notre savoir-faire à votre service pour faire de votre événement un moment unique et inoubliable."),
                        createElement('p', {}, 'Notre équipe de chefs passionnés utilise uniquement des ingrédients frais et de saison pour créer des menus qui raviront vos invités. Chaque plat est préparé avec soin et attention aux détails.'),
                        createElement('ul', { className: 'satisfaction-list' },
                            createElement('li', {}, 'Ingrédients frais et de qualité supérieure'),
                            createElement('li', {}, 'Menus personnalisés selon vos préférences'),
                            createElement('li', {}, 'Service professionnel et ponctuel'),
                            createElement('li', {}, 'Cuisine internationale variée'),
                            createElement('li', {}, 'Équipe expérimentée et passionnée'),
                            createElement('li', {}, 'Prix compétitifs et transparents'),
                            createElement('li', {}, 'Vaisselle et décoration incluses'),
                            createElement('li', {}, 'Respect des normes d\'hygiène strictes')
                        )
                    ),
                    createElement('div', { className: 'testimonial-card fade-in-up' },
                        createElement('span', { className: 'testimonial-percentage' }, '100%'),
                        createElement('h3', {}, 'Satisfaction Client'),
                        createElement('p', { className: 'testimonial-text' }, '"Service impeccable et nourriture délicieuse. Nos invités étaient ravis! Mon Traiteur a transformé notre événement d\'entreprise en une expérience gastronomique exceptionnelle."'),
                        createElement('div', { className: 'stars' }, '★★★★★'),
                        createElement('p', { className: 'testimonial-author' }, '— Sophie M., Manager Luxembourg')
                    )
                )
            )
        ),

        // Testimonials Section
        createElement('section', { className: 'section testimonials-section' },
            createElement('div', { className: 'container' },
                createElement('div', { className: 'text-center mb-xl fade-in-up' },
                    createElement('h2', {}, 'Ce que disent nos clients'),
                    createElement('p', {}, "Des centaines de clients satisfaits nous font confiance pour leurs événements")
                ),
                createElement('div', { className: 'testimonials-grid' },
                    createElement('div', { className: 'testimonial-box fade-in-up' },
                        createElement('div', { className: 'stars' }, '★★★★★'),
                        createElement('p', {}, '"Un service exceptionnel du début à la fin. Les plats étaient délicieux et magnifiquement présentés. Nos invités parlent encore de notre mariage 6 mois après!"'),
                        createElement('p', { className: 'testimonial-author' }, '— Marie & Jean-Luc')
                    ),
                    createElement('div', { className: 'testimonial-box fade-in-up' },
                        createElement('div', { className: 'stars' }, '★★★★★'),
                        createElement('p', {}, '"Le food truck a été un énorme succès lors de notre festival d\'entreprise. Service rapide, nourriture de qualité, et l\'équipe était formidable!"'),
                        createElement('p', { className: 'testimonial-author' }, '— Thomas K., DRH')
                    ),
                    createElement('div', { className: 'testimonial-box fade-in-up' },
                        createElement('div', { className: 'stars' }, '★★★★★'),
                        createElement('p', {}, '"Professionnels, ponctuels et d\'une gentillesse remarquable. Le buffet pour les 50 ans de maman était parfait. Merci pour tout!"'),
                        createElement('p', { className: 'testimonial-author' }, '— Isabelle D.')
                    )
                )
            )
        ),

        // CTA Section
        createElement('section', { className: 'cta-section' },
            createElement('div', { className: 'container' },
                createElement('div', { className: 'cta-content fade-in-up' },
                    createElement('h2', {}, 'Prêt à organiser votre événement ?'),
                    createElement('p', {}, "Contactez-nous dès aujourd'hui pour un devis gratuit et personnalisé"),
                    createElement('div', { className: 'cta-buttons' },
                        createElement('a', { href: '#/devis', className: 'btn btn-primary' }, 'Demander un Devis Gratuit'),
                        createElement('a', { href: 'tel:+352691393199', className: 'btn btn-outline' }, '📞 +352 691 393 199')
                    )
                )
            )
        )
    );

    return page;
}

// Services Page
function createServicesPage() {
    const page = createElement('div', {},
        // Hero Section
        createElement('section', { className: 'hero', style: { height: '60vh', minHeight: '400px' } },
            createElement('div', { className: 'hero-bg' }),
            createElement('div', { className: 'hero-overlay' }),
            createElement('div', { className: 'hero-content' },
                createElement('h1', {}, 'Nos Services'),
                createElement('p', {}, 'Des prestations traiteur professionnelles pour tous vos événements au Luxembourg')
            )
        ),

        // 4 Types d'événements Section
        createElement('section', { className: 'section' },
            createElement('div', { className: 'container' },
                createElement('div', { className: 'text-center mb-lg fade-in-up' },
                    createElement('h2', {}, 'Types d\'Événements'),
                    createElement('p', {}, "Découvrez nos services de traiteur adaptés à chaque occasion")
                ),
                createElement('div', { className: 'events-grid' },
                    createEventCard(
                        '#/entreprise',
                        'assets/entreprise.png',
                        'Service Entreprise',
                        'Entreprise',
                        "Service traiteur professionnel pour vos événements d'entreprise, séminaires et réunions."
                    ),
                    createEventCard(
                        '#/food-truck',
                        'assets/foodtruck.png',
                        'Food Truck',
                        'Food Truck',
                        'Notre food truck mobile pour vos événements extérieurs. Cuisine variée et service rapide.'
                    ),
                    createEventCard(
                        '#/evenements-sociaux',
                        'assets/social.png',
                        'Événements Sociaux',
                        'Événements Sociaux',
                        "Des prestations élégantes pour mariages, galas et événements d'exception."
                    ),
                    createEventCard(
                        '#/anniversaires',
                        'assets/anniversaires.png',
                        'Anniversaires',
                        'Anniversaires',
                        'Célébrez vos moments spéciaux avec nos services de traiteur personnalisés.'
                    )
                )
            )
        ),

        // Satisfaction Section
        createElement('section', { className: 'satisfaction-section' },
            createElement('div', { className: 'container' },
                createElement('div', { className: 'text-center mb-xl fade-in-up' },
                    createElement('h2', {}, 'Satisfaction Garantie'),
                    createElement('p', {}, "Nous mettons notre expertise à votre service pour créer des moments inoubliables")
                ),
                createElement('div', { className: 'satisfaction-grid' },
                    createElement('div', { className: 'fade-in-up' },
                        createElement('h3', {}, 'Notre Engagement'),
                        createElement('p', {}, "Avec plus de 20 ans d'expérience, nous garantissons la qualité et le professionnalisme à chaque étape de votre événement."),
                        createElement('ul', { className: 'satisfaction-list' },
                            createElement('li', {}, 'Ingrédients frais et de qualité supérieure'),
                            createElement('li', {}, 'Menus personnalisés selon vos préférences'),
                            createElement('li', {}, 'Service professionnel et ponctuel'),
                            createElement('li', {}, 'Cuisine internationale variée'),
                            createElement('li', {}, 'Équipe expérimentée et passionnée'),
                            createElement('li', {}, 'Prix compétitifs et transparents')
                        )
                    ),
                    createElement('div', { className: 'testimonial-card fade-in-up' },
                        createElement('span', { className: 'testimonial-percentage' }, '100%'),
                        createElement('h3', {}, 'Satisfaction Client'),
                        createElement('p', { className: 'testimonial-text' }, '"Un service de qualité exceptionnelle qui a ravi tous nos invités!"'),
                        createElement('div', { className: 'stars' }, '★★★★★')
                    )
                )
            )
        ),

        // CTA Section
        createElement('section', { className: 'cta-section' },
            createElement('div', { className: 'container' },
                createElement('div', { className: 'cta-content fade-in-up' },
                    createElement('h2', {}, 'Prêt à organiser votre événement ?'),
                    createElement('p', {}, "Contactez-nous pour discuter de votre projet et recevoir un devis personnalisé"),
                    createElement('div', { className: 'cta-buttons' },
                        createElement('a', { href: '#/devis', className: 'btn btn-primary' }, 'Obtenir un Devis Gratuit'),
                        createElement('a', { href: 'tel:+352691393199', className: 'btn btn-outline' }, '📞 +352 691 393 199')
                    )
                )
            )
        )
    );

    return page;
}

// Event Card Component
function createEventCard(href, imgSrc, imgAlt, title, description) {
    return createElement('a', { href, className: 'event-card fade-in-up' },
        createElement('img', { src: imgSrc, alt: imgAlt, className: 'event-image' }),
        createElement('div', { className: 'event-content' },
            createElement('h3', { className: 'event-title' }, title),
            createElement('span', { className: 'event-link' }, 'En savoir plus')
        )
    );
}

// Event Page Template
function createEventPage(config) {
    const { title, subtitle, image, description, features, cta } = config;

    const featuresElements = features.map(feature =>
        createElement('li', { style: { color: 'var(--text-dark)' } }, feature)
    );

    return createElement('div', {},
        createElement('section', { className: 'hero', style: { height: '60vh', minHeight: '400px' } },
            createElement('div', { className: 'hero-bg' },
                createElement('img', { src: image, alt: title })
            ),
            createElement('div', { className: 'hero-overlay' }),
            createElement('div', { className: 'hero-content' },
                createElement('h1', {}, title),
                createElement('p', {}, subtitle)
            )
        ),
        createElement('section', { className: 'section' },
            createElement('div', { className: 'container' },
                createElement('div', { className: 'fade-in-up' },
                    createElement('h2', { className: 'mb-md' }, description.title),
                    createElement('p', { className: 'mb-lg', style: { fontSize: '1.125rem', maxWidth: '800px' } }, description.text)
                ),
                createElement('div', { className: 'fade-in-up' },
                    createElement('h3', { className: 'mb-md' }, 'Ce que nous proposons'),
                    createElement('ul', { className: 'satisfaction-list', style: { color: 'var(--text-dark)' } },
                        ...featuresElements
                    )
                ),
                createElement('div', { className: 'text-center mt-xl fade-in-up' },
                    createElement('h3', { className: 'mb-md' }, cta.title),
                    createElement('p', { className: 'mb-md' }, cta.text),
                    createElement('a', { href: '#/devis', className: 'btn btn-primary' }, cta.button)
                )
            )
        )
    );
}

// Contact Page
function createContactPage() {
    const formData = {
        name: '',
        email: '',
        phone: '',
        date: '',
        message: ''
    };

    const form = createElement('form', { id: 'contactForm' },
        createElement('div', { className: 'form-group' },
            createElement('label', { for: 'name' }, 'Prénom + Nom *'),
            createElement('input', {
                type: 'text',
                id: 'name',
                name: 'name',
                required: true
            })
        ),
        createElement('div', { className: 'form-group' },
            createElement('label', { for: 'email' }, 'Email *'),
            createElement('input', {
                type: 'email',
                id: 'email',
                name: 'email',
                required: true
            })
        ),
        createElement('div', { className: 'form-group' },
            createElement('label', { for: 'phone' }, 'Numéro de téléphone *'),
            createElement('input', {
                type: 'tel',
                id: 'phone',
                name: 'phone',
                placeholder: '+352 ...',
                required: true
            })
        ),
        createElement('div', { className: 'form-group' },
            createElement('label', { for: 'message' }, 'Votre message *'),
            createElement('textarea', {
                id: 'message',
                name: 'message',
                placeholder: 'Écrivez votre message...',
                required: true
            })
        ),
        createElement('div', { id: 'contactStatus', className: 'form-status' }),
        createElement('button', { type: 'submit', className: 'btn btn-primary', style: { width: '100%' } },
            'Envoyer le message'
        )
    );

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const statusDiv = document.getElementById('contactStatus');

        // Collecter les données du formulaire
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };

        // Envoi via EmailJS
        emailjs.send('service_yby0s41', 'template_awpwg28', formData)
            .then(() => {
                statusDiv.innerHTML = '<div class="success-message">✓ Message envoyé avec succès! Nous vous contacterons bientôt.</div>';
                form.reset();
            })
            .catch(() => {
                statusDiv.innerHTML = '<div class="error-message">✗ Erreur lors de l\'envoi. Veuillez réessayer ou nous appeler directement.</div>';
            });
    });

    return createElement('div', {},
        createElement('section', { className: 'hero', style: { height: '50vh', minHeight: '300px' } },
            createElement('div', { className: 'hero-bg' }),
            createElement('div', { className: 'hero-overlay' }),
            createElement('div', { className: 'hero-content' },
                createElement('h1', {}, 'Contactez-nous'),
                createElement('p', {}, 'Une question ? Un projet ? Nous sommes là pour vous aider')
            )
        ),
        createElement('section', { className: 'contact-section section' },
            createElement('div', { className: 'container' },
                createElement('div', { className: 'contact-grid' },
                    createElement('div', { className: 'fade-in-up' },
                        createElement('h2', { className: 'mb-md' }, 'Envoyez-nous un message'),
                        createElement('p', { className: 'mb-lg' }, 'Remplissez le formulaire et nous vous répondrons rapidement'),
                        form
                    ),
                    createElement('div', { className: 'fade-in-up' },
                        createElement('div', { className: 'contact-info-cards' },
                            createElement('div', { className: 'info-card' },
                                createElement('div', { className: 'info-icon' }, '📞'),
                                createElement('div', { className: 'info-content' },
                                    createElement('h4', {}, 'Téléphone'),
                                    createElement('p', {}, '+352 691 393 199')
                                )
                            ),
                            createElement('div', { className: 'info-card' },
                                createElement('div', { className: 'info-icon' }, '✉️'),
                                createElement('div', { className: 'info-content' },
                                    createElement('h4', {}, 'Email'),
                                    createElement('p', {}, 'contact@montraiteur.lu')
                                )
                            ),
                            createElement('div', { className: 'info-card' },
                                createElement('div', { className: 'info-icon' }, '📍'),
                                createElement('div', { className: 'info-content' },
                                    createElement('h4', {}, 'Localisation'),
                                    createElement('p', {}, 'Luxembourg et environs')
                                )
                            ),
                            createElement('div', { className: 'info-card' },
                                createElement('div', { className: 'info-icon' }, '🕒'),
                                createElement('div', { className: 'info-content' },
                                    createElement('h4', {}, "Horaires d'ouverture"),
                                    createElement('p', {}, 'Lundi - Vendredi: 9h00 - 18h00'),
                                    createElement('p', {}, 'Samedi: 10h00 - 16h00'),
                                    createElement('p', {}, 'Dimanche: Fermé')
                                )
                            )
                        )
                    )
                )
            )
        )
    );
}

// Quote Page
function createQuotePage() {
    const form = createElement('form', { id: 'quoteForm' },
        createElement('p', { className: 'mb-md' }, 'Les champs marqués d\'un * sont obligatoires'),

        // Prénom + Nom
        createElement('div', { className: 'form-group' },
            createElement('label', { for: 'quoteName' }, 'Prénom + Nom *'),
            createElement('input', { type: 'text', id: 'quoteName', name: 'name', required: true })
        ),

        // Email
        createElement('div', { className: 'form-group' },
            createElement('label', { for: 'quoteEmail' }, 'Email *'),
            createElement('input', { type: 'email', id: 'quoteEmail', name: 'email', required: true })
        ),

        // Téléphone
        createElement('div', { className: 'form-group' },
            createElement('label', { for: 'quotePhone' }, 'Numéro de téléphone *'),
            createElement('input', { type: 'tel', id: 'quotePhone', name: 'phone', required: true })
        ),

        // Date
        createElement('div', { className: 'form-group' },
            createElement('label', { for: 'quoteDate' }, 'Date du Catering'),
            createElement('input', { type: 'date', id: 'quoteDate', name: 'date' })
        ),

        // Quantité
        createElement('div', { className: 'form-group' },
            createElement('label', { for: 'quoteGuests' }, 'Quantité de personnes *'),
            createElement('input', { type: 'number', id: 'quoteGuests', name: 'guests', min: '1', required: true })
        ),

        // Besoin d'un Catering (Checkboxes)
        createElement('div', { className: 'form-group' },
            createElement('label', {}, 'Besoin d\'un Catering *'),
            createElement('div', { className: 'checkbox-group' },
                ...['Amuse bouche', 'Entrées', 'Plats', 'Desserts'].map(item =>
                    createElement('label', { className: 'checkbox-label' },
                        createElement('input', { type: 'checkbox', name: 'catering_needs', value: item }),
                        createElement('span', {}, item)
                    )
                )
            )
        ),

        // Budget
        createElement('div', { className: 'form-group' },
            createElement('label', { for: 'quoteBudget' }, 'Budget par personne? (Min. 20€) *'),
            createElement('input', { type: 'number', id: 'quoteBudget', name: 'budget', placeholder: '20', min: '20', required: true })
        ),

        // Besoin de location (Checkboxes)
        createElement('div', { className: 'form-group' },
            createElement('label', {}, 'Besoin de location?'),
            createElement('div', { className: 'checkbox-group' },
                ...[
                    "Besoin d'un DJ", "Besoin d'équipements de DJ", "Location d'une limousine",
                    "Location de couverts", "Location de tables basses", "Location de tables haute (ronde)",
                    "Location de bans", "Location de chaises"
                ].map(item =>
                    createElement('label', { className: 'checkbox-label' },
                        createElement('input', { type: 'checkbox', name: 'rental_needs', value: item }),
                        createElement('span', {}, item)
                    )
                )
            )
        ),

        // Message
        createElement('div', { className: 'form-group' },
            createElement('label', { for: 'quoteMessage' }, 'Votre message'),
            createElement('textarea', { id: 'quoteMessage', name: 'message', rows: '4' })
        ),

        createElement('div', { id: 'quoteStatus', className: 'form-status' }),

        createElement('button', { type: 'submit', className: 'btn btn-primary', style: { width: '100%' } },
            'Soumettre la demande'
        )
    );

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const statusDiv = document.getElementById('quoteStatus');

        // Collect Checkbox values
        const getCheckedValues = (name) => {
            return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`))
                .map(cb => cb.value).join(', ');
        };

        const formData = {
            name: document.getElementById('quoteName').value,
            email: document.getElementById('quoteEmail').value,
            phone: document.getElementById('quotePhone').value,
            date: document.getElementById('quoteDate').value,
            guests: document.getElementById('quoteGuests').value,
            catering_needs: getCheckedValues('catering_needs'),
            budget: document.getElementById('quoteBudget').value,
            rental_needs: getCheckedValues('rental_needs'),
            message: document.getElementById('quoteMessage').value
        };

        // Envoi via EmailJS
        emailjs.send('service_yby0s41', 'template_awpwg28', formData)
            .then(() => {
                statusDiv.innerHTML = '<div class="success-message">✓ Devis envoyé avec succès! Nous vous contacterons bientôt.</div>';
                form.reset();
            })
            .catch(() => {
                statusDiv.innerHTML = '<div class="error-message">✗ Erreur lors de l\'envoi. Veuillez réessayer ou nous appeler directement.</div>';
            });
    });

    return createElement('div', {},
        createElement('section', { className: 'hero', style: { height: '40vh', minHeight: '300px' } },
            createElement('div', { className: 'hero-bg' }),
            createElement('div', { className: 'hero-overlay' }),
            createElement('div', { className: 'hero-content' },
                createElement('h1', {}, 'Obtenir un Devis'),
                createElement('p', {}, 'Remplissez le formulaire ci-dessous pour recevoir une offre personnalisée')
            )
        ),
        createElement('section', { className: 'section' },
            createElement('div', { className: 'container', style: { maxWidth: '800px' } },
                createElement('div', { className: 'contact-grid', style: { gridTemplateColumns: '1fr' } },
                    createElement('div', { className: 'fade-in-up' },
                        form
                    )
                )
            )
        )
    );
}

// Individual Event Pages
const entrepriseConfig = {
    title: "Service Entreprise",
    subtitle: "Traiteur professionnel pour vos événements d'entreprise",
    image: "assets/entreprise.png",
    description: {
        title: "Un service adapté à vos besoins professionnels",
        text: "Nous comprenons l'importance de vos événements d'entreprise. Nos prestations traiteur sont conçues pour impressionner vos clients et collaborateurs avec une cuisine raffinée et un service impeccable."
    },
    features: [
        "Buffets professionnels pour séminaires et conférences",
        "Pauses café et déjeuners d'affaires",
        "Cocktails dînatoires pour événements corporate",
        "Service en salle ou buffet selon vos préférences",
        "Menus adaptés aux régimes alimentaires spécifiques",
        "Vaisselle et décoration incluses",
        "Personnel expérimenté et discret"
    ],
    cta: {
        title: "Prêt à organiser votre événement d'entreprise?",
        text: "Contactez-nous pour discuter de vos besoins et obtenir un devis personnalisé",
        button: "Demander un Devis"
    }
};

const foodTruckConfig = {
    title: "Food Truck Mobile",
    subtitle: "La solution parfaite pour vos événements extérieurs",
    image: "assets/foodtruck.png",
    description: {
        title: "Cuisine de qualité, service mobile",
        text: "Notre food truck apporte une touche conviviale et originale à vos événements. Nous nous déplaçons où vous le souhaitez pour offrir une expérience culinaire unique à vos invités."
    },
    features: [
        "Cuisine fraîche préparée sur place",
        "Large choix de menus internationaux",
        "Service rapide et efficace",
        "Idéal pour festivals, marchés et événements privés",
        "Installation autonome complète",
        "Options végétariennes et véganes disponibles",
        "Personnel formé et professionnel"
    ],
    cta: {
        title: "Envie d'un food truck pour votre événement?",
        text: "Faites appel à notre food truck mobile pour une expérience culinaire mémorable",
        button: "Réserver le Food Truck"
    }
};

const evenementsSociauxConfig = {
    title: "Événements Sociaux",
    subtitle: "Des prestations d'exception pour vos moments précieux",
    image: "assets/social.png",
    description: {
        title: "Créez des souvenirs inoubliables",
        text: "Mariages, galas, anniversaires de mariage... Nous créons des expériences culinaires sur mesure qui subliment vos événements les plus importants avec élégance et raffinement."
    },
    features: [
        "Menu personnalisé en collaboration avec nos chefs",
        "Service à table avec personnel expérimenté",
        "Décoration de table élégante",
        "Coordination avec vos autres prestataires",
        "Options de menu dégustation",
        "Vin et champagne sélectionnés",
        "Desserts et pièce montée sur demande",
        "Service irréprochable du début à la fin"
    ],
    cta: {
        title: "Organisez l'événement de vos rêves",
        text: "Rencontrons-nous pour créer ensemble un menu unique qui ravira vos invités",
        button: "Planifier mon Événement"
    }
};

const anniversairesConfig = {
    title: "Anniversaires & Célébrations",
    subtitle: "Célébrez vos moments spéciaux avec style",
    image: "assets/anniversaires.png",
    description: {
        title: "Des fêtes mémorables pour tous les âges",
        text: "Qu'il s'agisse d'un anniversaire d'enfant ou d'une célébration entre adultes, nous créons des buffets colorés et savoureux qui raviront tous vos invités."
    },
    features: [
        "Menus adaptés à tous les âges",
        "Buffets festifs et colorés",
        "Gâteaux d'anniversaire personnalisés",
        "Options finger food et amuse-bouches",
        "Animations culinaires pour enfants",
        "Service flexible selon le nombre d'invités",
        "Décoration de table thématique",
        "Formules tout compris disponibles"
    ],
    cta: {
        title: "Prêt à célébrer?",
        text: "Contactez-nous pour créer une fête d'anniversaire inoubliable",
        button: "Organiser ma Fête"
    }
};

// Main App Render
function renderApp(content) {
    const app = document.getElementById('app');
    app.innerHTML = '';

    const main = createElement('main', { style: { marginTop: '80px' } }, content);

    app.appendChild(createHeader());
    app.appendChild(main);
    app.appendChild(createFooter());

    // Setup animations after content is added to DOM
    setTimeout(setupFadeInObserver, 100);
}

// Initialize Router
const router = new Router();

router.route('/', () => renderApp(createHomePage()));
router.route('/services', () => renderApp(createServicesPage()));
router.route('/entreprise', () => renderApp(createEventPage(entrepriseConfig)));
router.route('/food-truck', () => renderApp(createEventPage(foodTruckConfig)));
router.route('/evenements-sociaux', () => renderApp(createEventPage(evenementsSociauxConfig)));
router.route('/anniversaires', () => renderApp(createEventPage(anniversairesConfig)));
router.route('/contact', () => renderApp(createContactPage()));
router.route('/devis', () => renderApp(createQuotePage()));

// Initial render
router.render();
