document.addEventListener('DOMContentLoaded', function() {
  initializeCheckout();
});

function initializeCheckout() {
  initializeTimer();
  initializeCopyButtons();
  initializePaymentCheck();
  initializeErrorReport();
}

function initializeTimer() {
  const timerElement = document.querySelector('.timer-text');
  if (!timerElement) return;

  let timeLeft = 24 * 60 + 56;
  
  function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerElement.textContent = '00:00';
      showPaymentExpired();
      return;
    }
    
    timeLeft--;
  }
  
  updateTimer();
  const timerInterval = setInterval(updateTimer, 1000);
}

function initializeCopyButtons() {
  const copyButtons = document.querySelectorAll('.copy-btn');
  
  copyButtons.forEach(button => {
    button.addEventListener('click', function() {
      const textToCopy = this.getAttribute('data-copy');
      copyToClipboard(textToCopy);
      showCopySuccess(this);
    });
  });
  
  const walletAddress = document.querySelector('.wallet-address');
  if (walletAddress) {
    walletAddress.addEventListener('click', function() {
      copyToClipboard(this.textContent);
      showCopySuccess(this);
    });
  }
}

function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Текст скопирован в буфер обмена');
    }).catch(err => {
      console.error('Ошибка при копировании:', err);
      fallbackCopyTextToClipboard(text);
    });
  } else {
    fallbackCopyTextToClipboard(text);
  }
}

function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    document.execCommand('copy');
    console.log('Текст скопирован в буфер обмена (fallback)');
  } catch (err) {
    console.error('Ошибка при копировании (fallback):', err);
  }
  
  document.body.removeChild(textArea);
}

function showCopySuccess(element) {
  const originalContent = element.innerHTML;
  const originalText = element.textContent;
  
  if (element.classList.contains('copy-btn')) {
    element.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M16.707 5.293L7.293 14.707L3.293 10.707L4.707 9.293L7.293 11.879L15.293 3.879L16.707 5.293Z" fill="#A4F40F"/>
      </svg>
    `;
  } else {
    element.textContent = 'Скопировано!';
  }
  
  setTimeout(() => {
    if (element.classList.contains('copy-btn')) {
      element.innerHTML = originalContent;
    } else {
      element.textContent = originalText;
    }
  }, 2000);
}

function initializePaymentCheck() {
  const checkButton = document.querySelector('.check-payment-btn');
  if (!checkButton) return;
  
  checkButton.addEventListener('click', function() {
    this.disabled = true;
    this.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" class="spinner">
        <circle cx="10" cy="10" r="8" stroke="white" stroke-width="2" stroke-dasharray="20" stroke-dashoffset="20"/>
      </svg>
      <span>Проверяем платёж...</span>
    `;
    
    setTimeout(() => {
      checkPaymentStatus();
    }, 2000);
  });
}

function checkPaymentStatus() {
  const checkButton = document.querySelector('.check-payment-btn');
  const statusBadge = document.querySelector('.status-badge');
  const statusText = document.querySelector('.status-text');
  
  const random = Math.random();
  
  if (random > 0.7) {
    statusText.textContent = 'Оплачен';
    statusText.style.color = '#A4F40F';
    checkButton.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M16.707 5.293L7.293 14.707L3.293 10.707L4.707 9.293L7.293 11.879L15.293 3.879L16.707 5.293Z" fill="white"/>
      </svg>
      <span>Платёж подтверждён</span>
    `;
    checkButton.style.background = '#A4F40F';
    checkButton.style.color = '#1A1A1F';
    
    setTimeout(() => {
      showPaymentSuccess();
    }, 1500);
  } else {
    statusText.textContent = 'Ожидает оплаты';
    statusText.style.color = '#F4E50F';
    checkButton.disabled = false;
    checkButton.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2C5.58 2 2 5.58 2 10C2 14.42 5.58 18 10 18C14.42 18 18 14.42 18 10C18 5.58 14.42 2 10 2ZM10 16C6.69 16 4 13.31 4 10C4 6.69 6.69 4 10 4C13.31 4 16 6.69 16 10C16 13.31 13.31 16 10 16Z" fill="white"/>
        <path d="M9 7H11V9H9V7ZM9 11H11V13H9V11Z" fill="white"/>
      </svg>
      <span>Проверить платёж</span>
    `;
    
    showPaymentPending();
  }
}

function initializeErrorReport() {
  const errorButton = document.querySelector('.report-error-btn');
  if (!errorButton) return;
  
  errorButton.addEventListener('click', function() {
    showErrorReportModal();
  });
}

function showPaymentExpired() {
  const paymentCard = document.querySelector('.payment-card');
  const expiredMessage = document.createElement('div');
  expiredMessage.className = 'payment-expired';
  expiredMessage.innerHTML = `
    <div class="expired-content">
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M24 4C12.95 4 4 12.95 4 24C4 35.05 12.95 44 24 44C35.05 44 44 35.05 44 24C44 12.95 35.05 4 24 4ZM24 40C15.18 40 8 32.82 8 24C8 15.18 15.18 8 24 8C32.82 8 40 15.18 40 24C40 32.82 32.82 40 24 40Z" fill="#FF1D0D"/>
        <path d="M22 22H26V26H22V22ZM22 30H26V34H22V30Z" fill="#FF1D0D"/>
      </svg>
      <h3>Время оплаты истекло</h3>
      <p>Заказ был автоматически отменён. Вы можете создать новый заказ.</p>
      <button class="new-order-btn">Создать новый заказ</button>
    </div>
  `;
  
  paymentCard.innerHTML = '';
  paymentCard.appendChild(expiredMessage);
}

function showPaymentSuccess() {
  const paymentCard = document.querySelector('.payment-card');
  const successMessage = document.createElement('div');
  successMessage.className = 'payment-success';
  successMessage.innerHTML = `
    <div class="success-content">
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M24 4C12.95 4 4 12.95 4 24C4 35.05 12.95 44 24 44C35.05 44 44 35.05 44 24C44 12.95 35.05 4 24 4ZM20 32L10 22L12.83 19.17L20 26.34L35.17 11.17L38 14L20 32Z" fill="#A4F40F"/>
      </svg>
      <h3>Платёж успешно выполнен!</h3>
      <p>Ваш заказ обрабатывается. Ключи будут отправлены на указанный email.</p>
      <button class="view-orders-btn">Посмотреть заказы</button>
    </div>
  `;
  
  paymentCard.innerHTML = '';
  paymentCard.appendChild(successMessage);
}

function showPaymentPending() {
  const notification = document.createElement('div');
  notification.className = 'payment-notification';
  notification.innerHTML = `
    <div class="notification-content">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="#F4E50F"/>
      </svg>
      <span>Платёж ещё не поступил. Попробуйте проверить позже.</span>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 5000);
}

function showErrorReportModal() {
  const modal = document.createElement('div');
  modal.className = 'error-modal';
  modal.innerHTML = `
    <div class="modal-overlay">
      <div class="modal-content">
        <h3>Сообщить об ошибке</h3>
        <p>Опишите проблему, с которой вы столкнулись:</p>
        <textarea placeholder="Опишите проблему..." rows="4"></textarea>
        <div class="modal-buttons">
          <button class="cancel-btn">Отмена</button>
          <button class="send-btn">Отправить</button>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  const cancelBtn = modal.querySelector('.cancel-btn');
  const sendBtn = modal.querySelector('.send-btn');
  
  cancelBtn.addEventListener('click', () => modal.remove());
  sendBtn.addEventListener('click', () => {
    modal.remove();
    showSuccessMessage('Сообщение об ошибке отправлено');
  });
}

function showSuccessMessage(message) {
  const notification = document.createElement('div');
  notification.className = 'success-notification';
  notification.innerHTML = `
    <div class="notification-content">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="#A4F40F"/>
      </svg>
      <span>${message}</span>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

function checkPayment() {
  document.querySelector('.checkout-left.checkout-state-payment').style.display = 'none';
  document.querySelector('.checkout-right.checkout-state-payment').style.display = 'none';
  document.querySelector('.checkout-left.checkout-state-failed').style.display = 'flex';
  document.querySelector('.checkout-right.checkout-state-failed').style.display = 'block';
}

function retryPayment() {
  document.querySelector('.checkout-left.checkout-state-failed').style.display = 'none';
  document.querySelector('.checkout-right.checkout-state-failed').style.display = 'none';
  document.querySelector('.checkout-left.checkout-state-payment').style.display = 'flex';
  document.querySelector('.checkout-right.checkout-state-payment').style.display = 'block';
}

function toggleExchange(element) {
  const isExpanded = element.classList.contains('step2-expanded');
  
  if (isExpanded) {
    element.classList.remove('step2-expanded');
    const expandIcon = element.querySelector('.step2-expand-icon');
    if (expandIcon) {
      expandIcon.classList.remove('step2-expanded');
    }
  } else {
    element.classList.add('step2-expanded');
    const expandIcon = element.querySelector('.step2-expand-icon');
    if (expandIcon) {
      expandIcon.classList.add('step2-expanded');
    }
  }
}

function setRating(rating) {
  const stars = document.querySelectorAll('.step3-star');
  const ratingText = document.querySelector('.step3-rating-text');
  
  stars.forEach((star, index) => {
    if (index < rating) {
      star.classList.add('active');
      star.querySelector('svg path').setAttribute('fill', '#F4E50F');
    } else {
      star.classList.remove('active');
      star.querySelector('svg path').setAttribute('fill', '#3D3D4A');
    }
  });
  
  const ratingTexts = [
    'Ужасно!',
    'Плохо',
    'Нормально',
    'Мне понравилось, но есть над чем поработать!',
    'Отлично!'
  ];
  
  if (ratingText) {
    ratingText.textContent = ratingTexts[rating - 1] || '';
  }
}

function copyDealNumber() {
  const dealNumber = document.querySelector('.step3-deal-number');
  if (dealNumber) {
    copyToClipboard(dealNumber.textContent);
    showCopySuccess(dealNumber);
  }
}

function submitRating() {
  const ratingCard = document.querySelector('.step3-state-rating');
  const thanksCard = document.querySelector('.step3-state-thanks');
  
  if (ratingCard && thanksCard) {
    ratingCard.style.display = 'none';
    thanksCard.style.display = 'flex';
  }
}

function goHome() {
  window.location.href = 'index.html';
}

function continueSell() {
  const phoneInput = document.querySelector('.sell-form-input');
  if (!phoneInput || !phoneInput.value.trim()) {
    alert('Пожалуйста, введите номер телефона СБП');
    return;
  }
  
  alert('Форма отправлена! Переход к следующему шагу...');
}

const additionalStyles = `
  .payment-expired,
  .payment-success {
    text-align: center;
    padding: 40px 20px;
  }
  
  .expired-content,
  .success-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
  
  .expired-content h3,
  .success-content h3 {
    font: 600 24px / 1.3 var(--font-family);
    color: var(--white-400);
    margin: 0;
  }
  
  .expired-content p,
  .success-content p {
    font: 400 14px / 1.6 var(--font-family);
    color: var(--white-400);
    opacity: 0.7;
    margin: 0;
  }
  
  .new-order-btn,
  .view-orders-btn {
    background: var(--toxic-green-400);
    color: var(--dark-400);
    border: none;
    border-radius: 12px;
    padding: 12px 24px;
    font: 600 14px var(--font-family);
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .new-order-btn:hover,
  .view-orders-btn:hover {
    background: var(--toxic-green-300);
  }
  
  .payment-notification,
  .success-notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--dark-400);
    border: 1px solid var(--dark-300);
    border-radius: 12px;
    padding: 16px;
    z-index: 1000;
    animation: slideIn 0.3s ease;
  }
  
  .notification-content {
    display: flex;
    align-items: center;
    gap: 12px;
    font: 400 14px var(--font-family);
    color: var(--white-400);
  }
  
  .error-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
  }
  
  .modal-overlay {
    background: rgba(0, 0, 0, 0.8);
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .modal-content {
    background: var(--dark-400);
    border: 1px solid var(--dark-300);
    border-radius: 12px;
    padding: 24px;
    width: 90%;
    max-width: 400px;
  }
  
  .modal-content h3 {
    font: 600 20px var(--font-family);
    color: var(--white-400);
    margin: 0 0 16px 0;
  }
  
  .modal-content p {
    font: 400 14px var(--font-family);
    color: var(--white-400);
    opacity: 0.7;
    margin: 0 0 16px 0;
  }
  
  .modal-content textarea {
    width: 100%;
    background: var(--dark-300);
    border: 1px solid var(--dark-200);
    border-radius: 8px;
    padding: 12px;
    color: var(--white-400);
    font: 400 14px var(--font-family);
    resize: vertical;
    margin-bottom: 16px;
  }
  
  .modal-buttons {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
  }
  
  .cancel-btn {
    background: var(--dark-300);
    color: var(--white-400);
    border: 1px solid var(--dark-200);
    border-radius: 8px;
    padding: 8px 16px;
    font: 500 14px var(--font-family);
    cursor: pointer;
  }
  
  .send-btn {
    background: var(--toxic-green-400);
    color: var(--dark-400);
    border: none;
    border-radius: 8px;
    padding: 8px 16px;
    font: 500 14px var(--font-family);
    cursor: pointer;
  }
  
  .spinner {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  .wallet-address {
    cursor: pointer;
    user-select: all;
  }
  
  .wallet-address:hover {
    color: var(--toxic-green-400);
  }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

