document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    const mainAccordionItems = document.querySelectorAll('.main-accordion-item');
    
    mainAccordionItems.forEach(item => {
        const header = item.querySelector('.main-accordion-header');
        
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            mainAccordionItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});

document.getElementById('customer-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
    this.reset();
});

document.getElementById('carrier-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Заявка на партнёрство отправлена! Мы свяжемся с вами в ближайшее время.');
    this.reset();
});
