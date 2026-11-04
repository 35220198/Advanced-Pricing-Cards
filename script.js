document.addEventListener('DOMContentLoaded', () => {
    // Elements Selection
    const billingToggle = document.getElementById('billing-toggle');
    const monthlyLabel = document.getElementById('monthly-label');
    const yearlyLabel = document.getElementById('yearly-label');
    const amountElements = document.querySelectorAll('.amount');
    const periodElements = document.querySelectorAll('.period');
    const actionButtons = document.querySelectorAll('.card-footer .btn');

    // 1. Monthly / Yearly Pricing Toggle Logic
    billingToggle.addEventListener('change', () => {
        const isYearly = billingToggle.checked;

        // Toggle label highlights
        if (isYearly) {
            monthlyLabel.classList.remove('active');
            yearlyLabel.classList.add('active');
        } else {
            monthlyLabel.classList.add('active');
            yearlyLabel.classList.remove('active');
        }

        // Update amounts with a smooth fade effect
        amountElements.forEach((amountEl) => {
            amountEl.style.opacity = '0';
            setTimeout(() => {
                const targetValue = isYearly 
                    ? amountEl.getAttribute('data-yearly') 
                    : amountEl.getAttribute('data-monthly');
                
                amountEl.textContent = targetValue;
                amountEl.style.opacity = '1';
            }, 150);
        });

        // Update text period labels
        periodElements.forEach((periodEl) => {
            periodEl.textContent = isYearly ? '/month (billed annually)' : '/month';
        });
    });

    // Make monthly/yearly labels clickable to flip the switch
    monthlyLabel.addEventListener('click', () => {
        if (billingToggle.checked) {
            billingToggle.checked = false;
            billingToggle.dispatchEvent(new Event('change'));
        }
    });

    yearlyLabel.addEventListener('click', () => {
        if (!billingToggle.checked) {
            billingToggle.checked = true;
            billingToggle.dispatchEvent(new Event('change'));
        }
    });

    // 2. Interactive Button Feedback
    actionButtons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const planName = e.target.getAttribute('data-plan') || 'Selected';
            const originalText = btn.textContent;
            
            btn.textContent = 'Redirecting...';
            btn.style.opacity = '0.7';
            btn.disabled = true;

            setTimeout(() => {
                alert(`Thank you for choosing the ${planName} plan! Proceeding to checkout...`);
                btn.textContent = originalText;
                btn.style.opacity = '1';
                btn.disabled = false;
            }, 800);
        });
    });
});
