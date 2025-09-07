document.addEventListener('DOMContentLoaded', function() {
    const notification = document.querySelector('.exchange-notification');
    const closeBtn = document.querySelector('.exchange-notification-close');
    const collapseBtn = document.querySelector('.exchange-notification-collapse');
    const notificationText = document.querySelector('.exchange-notification-text');
    const chevronIcon = document.querySelector('.exchange-chevron-icon');
    
    let isCollapsed = false;
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            notification.style.display = 'none';
        });
    }
    
    if (collapseBtn) {
        collapseBtn.addEventListener('click', function() {
            if (isCollapsed) {
                notificationText.style.display = 'block';
                chevronIcon.style.transform = 'rotate(0deg)';
                collapseBtn.querySelector('.exchange-collapse-text').textContent = 'Свернуть';
                isCollapsed = false;
            } else {
                notificationText.style.display = 'none';
                chevronIcon.style.transform = 'rotate(180deg)';
                collapseBtn.querySelector('.exchange-collapse-text').textContent = 'Развернуть';
                isCollapsed = true;
            }
        });
    }

    const paymentMethods = document.querySelectorAll('.exchange-payment-method');
    const tabs = document.querySelectorAll('.exchange-tab');
    
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            if (!this.classList.contains('exchange-payment-disabled')) {
                paymentMethods.forEach(m => m.classList.remove('exchange-payment-selected'));
                this.classList.add('exchange-payment-selected');
            }
        });
        
        method.addEventListener('mouseenter', function() {
            const tooltip = this.querySelector('.exchange-payment-tooltip');
            if (tooltip) {
                tooltip.classList.add('show');
            }
        });
        
        method.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.exchange-payment-tooltip');
            if (tooltip) {
                tooltip.classList.remove('show');
            }
        });
    });

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('exchange-tab-active'));
            this.classList.add('exchange-tab-active');
        });
    });
});
