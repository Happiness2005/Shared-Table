const APP = {
    elements: {
        menuToggle: document.querySelector('.menu-toggle'),
        navLinks: document.querySelector('.nav-links'),
        joinForm: document.getElementById('join-form'),
        donateForm: document.getElementById('donate-food-form'),
        receiveForm: document.getElementById('receive-food-form'),
        joinSelection: document.getElementById('join-selection'),
        donateButton: document.getElementById('donate-button'),
        receiveButton: document.getElementById('receive-button')
    },

    init() {
        this.setupEventListeners();
        this.setupFormValidation();
    },

    setupEventListeners() {
        this.elements.menuToggle?.addEventListener('click', () => this.toggleMenu());
        this.elements.joinForm?.addEventListener('submit', (e) => this.handleFormSubmit(e));
        this.elements.donateForm?.addEventListener('submit', (e) => this.handleFormSubmit(e, 'donation'));
        this.elements.receiveForm?.addEventListener('submit', (e) => this.handleFormSubmit(e, 'request'));
        this.elements.donateButton?.addEventListener('click', () => this.showForm('donate'));
        this.elements.receiveButton?.addEventListener('click', () => this.showForm('receive'));
    },

    toggleMenu() {
        this.elements.navLinks?.classList.toggle('active');
    },

    showForm(type) {
        // Hide the selection buttons
        if (this.elements.joinSelection) {
            this.elements.joinSelection.style.display = 'none';
        }

        // Show the form
        if (this.elements.joinForm) {
            this.elements.joinForm.style.display = 'block';

            // Update the form based on the selection
            const formTitle = document.createElement('h3');
            formTitle.textContent = type === 'donate' ? 'Donate Food' : 'Receive Food';
            this.elements.joinForm.prepend(formTitle);

            // Add a hidden input to indicate the user's choice
            const typeInput = document.createElement('input');
            typeInput.type = 'hidden';
            typeInput.name = 'user-type';
            typeInput.value = type;
            this.elements.joinForm.appendChild(typeInput);
        }
    },

    setupFormValidation() {
        const forms = [this.elements.donateForm, this.elements.receiveForm];
        forms.forEach(form => {
            if (!form) return;

            // Add validation styles on input
            form.querySelectorAll('input').forEach(input => {
                input.addEventListener('input', () => {
                    if (input.value.trim()) {
                        input.classList.add('valid');
                        input.classList.remove('invalid');
                    } else {
                        input.classList.remove('valid');
                        input.classList.add('invalid');
                    }
                });
            });
        });
    },

    async handleFormSubmit(event, type) {
        event.preventDefault();
        const form = event.target;

        // Collect form data
        const formData = {
            name: form.querySelector('#name').value,
            email: form.querySelector('#email').value,
            location: form.querySelector('#location').value,
            foodType: form.querySelector('#food-type')?.value || form.querySelector('#food-needs')?.value,
            quantity: form.querySelector('#quantity').value,
            type: type
        };

        try {
            // Show loading state
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="ph ph-spinner"></i>Processing...';
            submitButton.disabled = true;

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Show success message
            const message = type === 'donation'
                ? 'Thank you for your generous food donation! We will contact you shortly with next steps.'
                : 'Thank you for your food request! We will match you with available donations soon.';

            alert(message);
            form.reset();

            // Remove validation styles
            form.querySelectorAll('input').forEach(input => {
                input.classList.remove('valid', 'invalid');
            });

        } catch (error) {
            alert('Something went wrong. Please try again.');
        } finally {
            // Restore button state
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    }
};

document.addEventListener('DOMContentLoaded', () => APP.init());