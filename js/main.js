document.addEventListener('DOMContentLoaded', function() {

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('visible');
    });
    
    const nameHeader = document.getElementById('name-header');
    nameHeader.classList.add('visible-header');
    const header = document.querySelector('header');
    header.style.background = 'rgba(0, 0, 0, 0.9)';
    
    const roles = [
        "Full Stack Developer",
        "Software Engineer",
        "Backend Developer",
        "Frontend Developer",
        "Cloud Engineer"
    ];
    
    let currentIndex = 0;
    const animatedText = document.getElementById('animated-text');
    const profileImage = document.querySelector('.profile-image');
    const namePSection = document.getElementById('nameP');
    const aboutSection = document.getElementById('about');
    const technologiesGrid = document.querySelector('.technology-grid');
    
    function typeRole() {
        let role = roles[currentIndex];
        let charIndex = 0;
        animatedText.innerHTML = "";
        
        function typeChar() {
            if (charIndex < role.length) {
                animatedText.innerHTML += role.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, 70);
            } else {
                currentIndex = (currentIndex + 1) % roles.length;
                setTimeout(() => {
                    animatedText.innerHTML = "";
                    typeRole();
                }, 1500);
            }
        }
        
        typeChar();
    }

    function animateSections(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            } else {
                entry.target.classList.remove('animate');
            }
        });
    }

    const observer = new IntersectionObserver(animateSections, {
        threshold: 0.1
    });

    observer.observe(profileImage);
    observer.observe(namePSection);
    observer.observe(aboutSection);

    typeRole();

    // Load technology data from JSON file
    fetch('data/technologies.json')
        .then(response => response.json())
        .then(data => {
            data.technologies.forEach(technology => {
                const techIcon = document.createElement('div');
                techIcon.className = 'technology-icon';
                techIcon.innerHTML = `
                    <i class="${technology.type} fa-${technology.icon}"></i>
                    <p>${technology.name}</p>
                `;
                technologiesGrid.appendChild(techIcon);
            });
        });

    // Load project data from JSON file
    fetch('data/projects.json')
        .then(response => response.json())
        .then(data => {
            const projectGrid = document.querySelector('.project-grid');
            data.projects.forEach(project => {
                const projectBox = document.createElement('div');
                projectBox.className = 'project-box';
                projectBox.innerHTML = `
                    <img src="${project.image}" alt="${project.name}">
                    <h2>${project.name}</h2>
                    <p>${project.description}</p>
                    <a href="${project.link}" target="_blank">View Project</a>
                `;
                projectGrid.appendChild(projectBox);
            });
        });

    // Load experience data from JSON file
    fetch('data/experience.json')
        .then(response => response.json())
        .then(data => {
            const experienceTimeline = document.querySelector('.experience-timeline');
            data.experience.forEach(entry => {
                const experienceEntry = document.createElement('div');
                experienceEntry.className = 'experience-entry';
                experienceEntry.innerHTML = `
                    <h2>${entry.title}</h2>
                    <p>${entry.description}</p>
                    <p>${entry.date}</p>
                `;
                experienceTimeline.appendChild(experienceEntry);
            });
        });
});

// function to handle scrolling to the target div
function scrollToDiv(targetId) {
    document.getElementById(targetId).scrollIntoView({
        behavior: 'smooth'
    });
}

//scroll event to reveal sections and display name in header
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const header = document.querySelector('header');
    const nameHeader = document.getElementById('name-header');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollTop > sectionTop - window.innerHeight + 100) {
            section.classList.add('visible');
        }
    });

    if (scrollTop > document.getElementById('nameP').offsetTop) {
        nameHeader.classList.add('visible-header');
        header.style.background = 'rgba(0, 0, 0, 0.9)';
    } else {
        nameHeader.classList.remove('visible-header');
        header.style.background = 'rgba(0, 0, 0, 0.8)';
    }
});

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// event listener for high contrast mode
document.addEventListener('keydown', event => {
    if (event.key === 'h' && event.ctrlKey) {
        document.body.classList.toggle('high-contrast-mode');
    }
});
