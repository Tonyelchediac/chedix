document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navList.classList.contains('active')) {
                hamburger.classList.remove('active');
                navList.classList.remove('active');
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 60,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Sticky header on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Testimonial slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        testimonials[index].classList.add('active');
    }
    
    prevBtn.addEventListener('click', function() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    });
    
    nextBtn.addEventListener('click', function() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    });
    
    // Auto-rotate testimonials
    setInterval(function() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);

    // Initialize the first testimonial
    showTestimonial(0);
});



// Custom Alert Dialogs for Privacy Policy and Terms of Service
document.addEventListener('DOMContentLoaded', function() {
    const privacyPolicyLinks = document.querySelectorAll('a[href="#privacy-policy"]');
    privacyPolicyLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showCustomAlert(
                'Privacy Policy',
                `ElChediac Software Solutions is committed to protecting your privacy. We collect only the necessary personal information required to provide our services. Your data will never be sold or shared with third parties without your consent, except as required by law. We implement industry-standard security measures to protect your information. By using our services, you agree to the collection and use of information in accordance with this policy. For more details, please contact us at info.ecss.lb@gmail.com.`,
                'blue'
            );
        });
    });

    // Terms of Service Alert
    const termsLinks = document.querySelectorAll('a[href="#terms-of-service"]');
    termsLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showCustomAlert(
                'Terms of Service',
                `By accessing and using ElChediac Software Solutions' services, you agree to be bound by these terms. All content and software provided are the property of ElChediac Software Solutions and protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our permission. We reserve the right to modify these terms at any time. Services are provided "as is" without warranties of any kind. For questions, contact info.ecss.lb@gmail.com.`,
                'primary'
            );
        });
    });

    // Function to create and show custom alert
    function showCustomAlert(title, message, color) {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'custom-alert-overlay';
        
        // Create alert box
        const alertBox = document.createElement('div');
        alertBox.className = 'custom-alert';
        
        // Create title
        const alertTitle = document.createElement('h3');
        alertTitle.className = 'custom-alert-title';
        alertTitle.textContent = title;
        
        // Create message
        const alertMessage = document.createElement('div');
        alertMessage.className = 'custom-alert-message';
        alertMessage.innerHTML = message;
        
        // Create close button
        const closeButton = document.createElement('button');
        closeButton.className = `btn btn-${color}`;
        closeButton.textContent = 'I Understand';
        closeButton.addEventListener('click', function() {
            document.body.removeChild(overlay);
        });
        
        // Assemble the alert
        alertBox.appendChild(alertTitle);
        alertBox.appendChild(alertMessage);
        alertBox.appendChild(closeButton);
        overlay.appendChild(alertBox);
        
        // Add to body
        document.body.appendChild(overlay);
        
        // Close when clicking outside
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
            }
        });
    }
});