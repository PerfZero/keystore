document.addEventListener('DOMContentLoaded', function() {
  const headerSearchInput = document.getElementById('headerSearchInput');
  const searchDropdown = document.getElementById('searchDropdown');
  const searchOverlay = document.getElementById('searchOverlay');
  const searchEnterBtn = document.querySelector('.search-enter-btn');
  const filterBtns = document.querySelectorAll('.search-filter-btn');
  const mobileSearchItem = document.querySelector('.mobile-nav-item:first-child');
  const currencyBtn = document.querySelector('.currency-btn');
  const currencyModal = document.getElementById('currencyModal');
  const currencyModalClose = document.getElementById('currencyModalClose');
  const currencyOptions = document.querySelectorAll('.currency-option');
  const cookieBanner = document.getElementById('cookieBanner');
  const cookieAcceptBtn = document.getElementById('cookieAcceptBtn');
  const profileDropdown = document.querySelector('.profile-dropdown');
  const profileTrigger = document.querySelector('.profile-trigger');
  const mobileSearchBottomClose = document.getElementById('mobileSearchBottomClose');
  const mobileProfileDropdown = document.querySelector('.mobile-profile-dropdown');
  const mobileProfileTrigger = document.querySelector('.mobile-profile-trigger');

  function openSearchDropdown() {
    searchDropdown.classList.add('active');
    searchOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSearchDropdown() {
    searchDropdown.classList.remove('active');
    searchOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function toggleEnterButton() {
    if (headerSearchInput.value.length > 0) {
      searchEnterBtn.classList.add('active');
    } else {
      searchEnterBtn.classList.remove('active');
    }
  }

  headerSearchInput.addEventListener('focus', function() {
    this.classList.add('search');
    openSearchDropdown();
  });
  
  headerSearchInput.addEventListener('blur', function() {
    this.classList.remove('search');
  });
  
  headerSearchInput.addEventListener('input', function() {
    toggleEnterButton();
    if (this.value.length > 0) {
      openSearchDropdown();
    } else {
      closeSearchDropdown();
    }
  });

  searchOverlay.addEventListener('click', closeSearchDropdown);

  document.addEventListener('click', function(e) {
    if (!e.target.closest('.search-bar')) {
      closeSearchDropdown();
    }
  });

  mobileSearchItem.addEventListener('click', function(e) {
    e.preventDefault();
    const mobileSearch = document.getElementById('mobileSearch');
    mobileSearch.classList.toggle('active');
    if (mobileSearch.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });

  function openCurrencyModal() {
    currencyModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCurrencyModal() {
    currencyModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  currencyBtn.addEventListener('click', function(e) {
    e.preventDefault();
    openCurrencyModal();
  });

  currencyModalClose.addEventListener('click', closeCurrencyModal);

  currencyModal.addEventListener('click', function(e) {
    if (e.target === currencyModal) {
      closeCurrencyModal();
    }
  });

  currencyOptions.forEach(option => {
    option.addEventListener('click', function() {
      const section = this.closest('.currency-section');
      const sectionOptions = section.querySelectorAll('.currency-option');
      sectionOptions.forEach(opt => opt.classList.remove('active'));
      this.classList.add('active');
    });
  });

  function showCookieBanner() {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (!cookiesAccepted) {
      cookieBanner.classList.add('active');
    }
  }

  function acceptCookies() {
    localStorage.setItem('cookiesAccepted', 'true');
    cookieBanner.classList.remove('active');
  }

  cookieAcceptBtn.addEventListener('click', acceptCookies);

  function toggleProfileDropdown() {
    profileDropdown.classList.toggle('active');
  }

  function closeProfileDropdown() {
    profileDropdown.classList.remove('active');
  }

  function toggleMobileProfileDropdown() {
    mobileProfileDropdown.classList.toggle('active');
  }

  function closeMobileProfileDropdown() {
    mobileProfileDropdown.classList.remove('active');
  }

  profileTrigger.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleProfileDropdown();
  });

  document.addEventListener('click', function(e) {
    if (!e.target.closest('.profile-dropdown')) {
      closeProfileDropdown();
    }
  });

  mobileProfileTrigger.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleMobileProfileDropdown();
  });

  document.addEventListener('click', function(e) {
    if (!e.target.closest('.mobile-profile-dropdown')) {
      closeMobileProfileDropdown();
    }
  });

  // Mobile filter buttons
  const mobileFilterBtns = document.querySelectorAll('.mobile-filter-btn');
  mobileFilterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      mobileFilterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Close mobile search when clicking outside
  document.addEventListener('click', function(e) {
    const mobileSearch = document.getElementById('mobileSearch');
    if (mobileSearch && !e.target.closest('.mobile-search') && !e.target.closest('#mobileSearchItem')) {
      mobileSearch.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Close mobile search with bottom close button
  mobileSearchBottomClose.addEventListener('click', function() {
    const mobileSearch = document.getElementById('mobileSearch');
    mobileSearch.classList.remove('active');
    document.body.style.overflow = '';
  });

  showCookieBanner();

  const heroSwiper = new Swiper('.hero-swiper', {
    loop: true,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    speed: 800,
  });

  const popularSwiper = new Swiper('.popular-swiper', {
    slidesPerView: 'auto',
    spaceBetween: 20,
    pagination: {
      el: '.popular-swiper .swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.popular-swiper .swiper-button-next',
      prevEl: '.popular-swiper .swiper-button-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1.2,
        spaceBetween: 16,
      },
      480: {
        slidesPerView: 1.5,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 5,
        spaceBetween: 20,
      }
    }
  });

  const gamesSwiper = new Swiper('.games-swiper', {
    slidesPerView: 'auto',
    spaceBetween: 20,
    pagination: {
      el: '.games-swiper .swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.games-swiper .swiper-button-next',
      prevEl: '.games-swiper .swiper-button-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 'auto',

        spaceBetween: 4,
      },
      480: {
        slidesPerView: 'auto',
        spaceBetween: 4,
      },
      768: {
        slidesPerView: 3.2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 4.2,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 6,
        spaceBetween: 6,
      }
    }
  });

  const platformBtns = document.querySelectorAll('.platform-btn');
  const navArrowPrev = document.querySelector('.nav-arrow.prev');
  const navArrowNext = document.querySelector('.nav-arrow.next');

  platformBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      if (this.classList.contains('locked')) return;
      
      platformBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });

  if (navArrowPrev && navArrowNext) {
    navArrowPrev.addEventListener('click', () => {
      gamesSwiper.slidePrev();
    });

    navArrowNext.addEventListener('click', () => {
      gamesSwiper.slideNext();
    });
  }

  const genresSwiper = new Swiper('.genres-swiper', {
    slidesPerView: 'auto',
    spaceBetween: 20,
    pagination: {
      el: '.genres-swiper .swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.genres-swiper .swiper-button-next',
      prevEl: '.genres-swiper .swiper-button-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1.5,
        spaceBetween: 4,
      },
      480: {
        slidesPerView: 3.2,
        spaceBetween: 4,
      },
      768: {
        slidesPerView: 4.2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 6,
        spaceBetween: 20,
      }
    }
  });
});