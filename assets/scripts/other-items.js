document.addEventListener('DOMContentLoaded', function() {
  const otherItemsSwiper = new Swiper('.other-items-swiper', {
    slidesPerView: 'auto',
    spaceBetween: 4,
    freeMode: true,
    grabCursor: true,
    navigation: {
      nextEl: '.other-items-arrow-right',
      prevEl: '.other-items-arrow-left',
    },
    breakpoints: {
      320: {
        slidesPerView: 1.5,
        spaceBetween: 4,
      },
      480: {
        slidesPerView: 2.5,
        spaceBetween: 4,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 4,
      },
      1024: {
        slidesPerView: 5,
        spaceBetween: 4,
      },
      1400: {
        slidesPerView: 'auto',
        spaceBetween: 4,
      }
    }
  });

  // Cart functionality for other items
  const cartButtons = document.querySelectorAll('.other-item-add-btn:not(.disabled):not(.overstock):not(.not-available)');
  
  cartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const textElement = this.querySelector('.other-item-add-btn-text');
      const currentText = textElement.textContent;
      
      if (currentText === 'В корзину') {
        // Add to cart
        this.classList.add('pressed');
        textElement.textContent = '2';
        
        // Add minus and plus buttons
        const minusBtn = document.createElement('button');
        minusBtn.className = 'cart-control-btn minus-btn';
        minusBtn.innerHTML = `<img src="/assets/images/exclude-icon.svg" alt="Minus" class="cart-control-icon">`;
        
        const plusBtn = document.createElement('button');
        plusBtn.className = 'cart-control-btn plus-btn';
        plusBtn.innerHTML = `<img src="/assets/images/plus-icon.svg" alt="Plus" class="cart-control-icon">`;
        
        // Clear button content and add controls
        this.innerHTML = '';
        this.appendChild(minusBtn);
        this.appendChild(textElement);
        this.appendChild(plusBtn);
        
        // Add event listeners for controls
        minusBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          let count = parseInt(textElement.textContent);
          if (count > 1) {
            count--;
            textElement.textContent = count;
          } else {
            // Remove from cart
            button.classList.remove('pressed');
            button.innerHTML = '<span class="other-item-add-btn-text">В корзину</span>';
          }
        });
        
        plusBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          let count = parseInt(textElement.textContent);
          count++;
          textElement.textContent = count;
        });
      }
    });
  });
});
