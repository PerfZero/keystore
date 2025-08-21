function showGamesSidebar() {
  const gamesSidebar = document.getElementById('games-sidebar');
  const itemsSidebar = document.getElementById('items-sidebar');
  const subscriptionsSidebar = document.getElementById('subscriptions-sidebar');
  
  if (gamesSidebar) gamesSidebar.style.display = 'flex';
  if (itemsSidebar) itemsSidebar.style.display = 'none';
  if (subscriptionsSidebar) subscriptionsSidebar.style.display = 'none';
}

function showItemsSidebar() {
  const gamesSidebar = document.getElementById('games-sidebar');
  const itemsSidebar = document.getElementById('items-sidebar');
  const subscriptionsSidebar = document.getElementById('subscriptions-sidebar');
  
  if (gamesSidebar) gamesSidebar.style.display = 'none';
  if (itemsSidebar) itemsSidebar.style.display = 'flex';
  if (subscriptionsSidebar) subscriptionsSidebar.style.display = 'none';
}

function showSubscriptionsSidebar() {
  const gamesSidebar = document.getElementById('games-sidebar');
  const itemsSidebar = document.getElementById('items-sidebar');
  const subscriptionsSidebar = document.getElementById('subscriptions-sidebar');
  
  if (gamesSidebar) gamesSidebar.style.display = 'none';
  if (itemsSidebar) itemsSidebar.style.display = 'none';
  if (subscriptionsSidebar) subscriptionsSidebar.style.display = 'flex';
}

function initializeTabs() {
  const headerMain = document.querySelector('.header-main');
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
  const skinMarketDropdown = document.querySelector('.nav-link.dropdown');
  const skinMarketTrigger = document.querySelector('.dropdown-trigger');

  function handleHeaderScroll() {
    if (window.scrollY >= 51) {
      headerMain.classList.add('fixed');
    } else {
      headerMain.classList.remove('fixed');
    }
  }

  window.addEventListener('scroll', handleHeaderScroll);

  function openSearchDropdown() {
    searchDropdown.classList.add('active');
    searchOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSearchDropdown() {
    if (searchDropdown) searchDropdown.classList.remove('active');
    if (searchOverlay) searchOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function toggleEnterButton() {
    if (headerSearchInput.value.length > 0) {
      searchEnterBtn.classList.add('active');
    } else {
      searchEnterBtn.classList.remove('active');
    }
  }

  if (headerSearchInput) {
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
  }

  if (searchOverlay) {
    searchOverlay.addEventListener('click', closeSearchDropdown);
  }

  document.addEventListener('click', function(e) {
    if (!e.target.closest('.search-bar')) {
      closeSearchDropdown();
    }
  });

  if (mobileSearchItem) {
    mobileSearchItem.addEventListener('click', function(e) {
      e.preventDefault();
      const mobileSearch = document.getElementById('mobileSearch');
      if (mobileSearch) {
        mobileSearch.classList.toggle('active');
        if (mobileSearch.classList.contains('active')) {
          document.body.classList.add('mobile-search-open');
        } else {
          document.body.classList.remove('mobile-search-open');
        }
      }
    });
  }

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
      });
    });
  }

  function openCurrencyModal() {
    currencyModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCurrencyModal() {
    currencyModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (currencyBtn) {
    currencyBtn.addEventListener('click', function(e) {
      e.preventDefault();
      openCurrencyModal();
    });
  }

  if (currencyModalClose) {
    currencyModalClose.addEventListener('click', closeCurrencyModal);
  }

  if (currencyModal) {
    currencyModal.addEventListener('click', function(e) {
      if (e.target === currencyModal) {
        closeCurrencyModal();
      }
    });
  }

  if (currencyOptions.length > 0) {
    currencyOptions.forEach(option => {
      option.addEventListener('click', function() {
        const section = this.closest('.currency-section');
        const sectionOptions = section.querySelectorAll('.currency-option');
        sectionOptions.forEach(opt => opt.classList.remove('active'));
        this.classList.add('active');
      });
    });
  }

  function showCookieBanner() {
    if (!cookieBanner) return;
    
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (!cookiesAccepted) {
      cookieBanner.classList.add('active');
    }
  }

  function acceptCookies() {
    localStorage.setItem('cookiesAccepted', 'true');
    cookieBanner.classList.remove('active');
  }

  if (cookieAcceptBtn) {
    cookieAcceptBtn.addEventListener('click', acceptCookies);
  }

  function toggleProfileDropdown() {
    profileDropdown.classList.toggle('active');
  }

  function closeProfileDropdown() {
    if (profileDropdown) profileDropdown.classList.remove('active');
  }

  function toggleMobileProfileDropdown() {
    mobileProfileDropdown.classList.toggle('active');
  }

  function closeMobileProfileDropdown() {
    if (mobileProfileDropdown) mobileProfileDropdown.classList.remove('active');
  }

  if (profileTrigger) {
    profileTrigger.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleProfileDropdown();
    });
  }

  document.addEventListener('click', function(e) {
    if (!e.target.closest('.profile-dropdown')) {
      closeProfileDropdown();
    }
  });

  if (mobileProfileTrigger) {
    mobileProfileTrigger.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleMobileProfileDropdown();
    });
  }

  document.addEventListener('click', function(e) {
    if (!e.target.closest('.mobile-profile-dropdown')) {
      closeMobileProfileDropdown();
    }
  });

  // Mobile filter buttons
  const mobileFilterBtns = document.querySelectorAll('.mobile-filter-btn');
  if (mobileFilterBtns.length > 0) {
    mobileFilterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        mobileFilterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
      });
    });
  }

  // Close mobile search when clicking outside
  document.addEventListener('click', function(e) {
    const mobileSearch = document.getElementById('mobileSearch');
    if (mobileSearch && !e.target.closest('.mobile-search') && !e.target.closest('#mobileSearchItem')) {
      mobileSearch.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Close mobile search with bottom close button
  if (mobileSearchBottomClose) {
    mobileSearchBottomClose.addEventListener('click', function() {
      const mobileSearch = document.getElementById('mobileSearch');
      if (mobileSearch) {
        mobileSearch.classList.remove('active');
        document.body.classList.remove('mobile-search-open');
      }
    });
  }

  // Close mobile search with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const mobileSearch = document.getElementById('mobileSearch');
      if (mobileSearch.classList.contains('active')) {
        mobileSearch.classList.remove('active');
        document.body.classList.remove('mobile-search-open');
      }
    }
  });

  showCookieBanner();

  const heroSwiperElement = document.querySelector('.hero-swiper');
  if (heroSwiperElement) {
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
  }

  const popularSwiperElement = document.querySelector('.popular-swiper');
  if (popularSwiperElement) {
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
  }

          const onlineServicesSwiperElement = document.querySelector('.online-services-swiper');
          if (onlineServicesSwiperElement) {
            const onlineServicesSwiper = new Swiper('.online-services-swiper', {
              slidesPerView: 1,
              spaceBetween: 20,

              pagination: {
                el: '.online-services-swiper .swiper-pagination',
                clickable: true,
              },

              autoplay: {
                delay: 3000, // время между слайдами в миллисекундах
                disableOnInteraction: false // не останавливать после взаимодействия
              },
            

                
              loop: true,
              breakpoints: {
                320: {
                  slidesPerView: 1,
                  spaceBetween: 16,
                },
                480: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                }
              }
            });
          }

        const thumbnailsContainer = document.querySelector('.online-services-thumbnails');
        let progressInterval;

        if (thumbnailsContainer && onlineServicesSwiperElement) {
          const thumbnails = thumbnailsContainer.querySelectorAll('.online-services-thumbnail');
          thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', () => {
              const slideIndex = parseInt(thumbnail.dataset.slideIndex);
              if (onlineServicesSwiper) {
                onlineServicesSwiper.slideTo(slideIndex);
              }
            });
          });
        }

        function updateProgress() {
          if (!thumbnailsContainer || !onlineServicesSwiperElement) return;
          
          const thumbnails = thumbnailsContainer.querySelectorAll('.online-services-thumbnail');
          const activeIndex = onlineServicesSwiper ? onlineServicesSwiper.activeIndex : 0;
          
          thumbnails.forEach((thumbnail, index) => {
            thumbnail.classList.remove('active');
            thumbnail.style.setProperty('--progress', '0%');
          });
          
          if (thumbnails[activeIndex]) {
            thumbnails[activeIndex].classList.add('active');
          }
        }

                 function startProgressAnimation() {
           if (!thumbnailsContainer) return;
           
           clearInterval(progressInterval);
           const activeThumbnail = thumbnailsContainer.querySelector('.online-services-thumbnail.active');
           if (!activeThumbnail) return;
           
           let progress = 0;
           const duration = 3000;
           const interval = 5;
           const increment = (interval / duration) * 100;
           
           progressInterval = setInterval(() => {
             progress += increment;
             if (progress >= 100) {
               progress = 100;
               clearInterval(progressInterval);
             }
             activeThumbnail.style.setProperty('--progress', progress + '%');
           }, interval);
         }

        if (onlineServicesSwiperElement) {
          onlineServicesSwiper.on('slideChange', function() {
            updateProgress();
            startProgressAnimation();
          });

          onlineServicesSwiper.on('init', function() {
            updateProgress();
            startProgressAnimation();
          });
        }

  const gamesSwiperElement = document.querySelector('.games-swiper');
  if (gamesSwiperElement) {
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
  }

  function initGameImageSwipers() {
    const gameImageSwipers = document.querySelectorAll('.game-image-swiper');
    gameImageSwipers.forEach((swiperEl, index) => {
      if (!swiperEl.swiper) {
        const swiper = new Swiper(swiperEl, {
          slidesPerView: 1,
          spaceBetween: 0,
          loop: true,
          pagination: {
            el: swiperEl.querySelector('.game-image-pagination'),
            clickable: true,
            renderBullet: function (index, className) {
              return '<span class="' + className + ' game-image-pagination-bullet"></span>';
            },
          },
        });
      }
    });
  }

  initGameImageSwipers();

  const platformBtns = document.querySelectorAll('.platform-btn');
  const gamesNavArrowPrev = document.querySelector('.games-nav .nav-arrow.prev');
  const gamesNavArrowNext = document.querySelector('.games-nav .nav-arrow.next');
  const onlineServicesNavArrowPrev = document.querySelector('.online-services-nav .nav-arrow.prev');
  const onlineServicesNavArrowNext = document.querySelector('.online-services-nav .nav-arrow.next');

  platformBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      if (this.classList.contains('locked')) return;
      
      platformBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });

  if (gamesNavArrowPrev && gamesNavArrowNext) {
    gamesNavArrowPrev.addEventListener('click', () => {
      gamesSwiper.slidePrev();
    });

    gamesNavArrowNext.addEventListener('click', () => {
      gamesSwiper.slideNext();
    });
  }

  if (onlineServicesNavArrowPrev && onlineServicesNavArrowNext) {
    onlineServicesNavArrowPrev.addEventListener('click', () => {
      onlineServicesSwiper.slidePrev();
    });

    onlineServicesNavArrowNext.addEventListener('click', () => {
      onlineServicesSwiper.slideNext();
    });
  }

  if (skinMarketDropdown && skinMarketTrigger) {
    skinMarketTrigger.addEventListener('click', function(e) {
      e.preventDefault();
      const dropdownMenu = skinMarketDropdown.querySelector('.dropdown-menu');
      dropdownMenu.classList.toggle('active');
    });

    document.addEventListener('click', function(e) {
      if (!skinMarketDropdown.contains(e.target)) {
        const dropdownMenu = skinMarketDropdown.querySelector('.dropdown-menu');
        dropdownMenu.classList.remove('active');
      }
    });
  }

  const genresSwiperElement = document.querySelector('.genres-swiper');
  if (genresSwiperElement) {
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
          slidesPerView: 4,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 6,
          spaceBetween: 20,
        }
      }
    });
  }

  const thumbnailsSwiperElement = document.querySelector('.thumbnails-swiper');
  if (thumbnailsSwiperElement) {
    const thumbnailsSwiper = new Swiper('.thumbnails-swiper', {
      slidesPerView: 'auto',
      spaceBetween: 12,
      navigation: {
        nextEl: '.thumbnails-swiper .swiper-button-next',
        prevEl: '.thumbnails-swiper .swiper-button-prev',
      },
      breakpoints: {
        320: {
          slidesPerView: 2.5,
          spaceBetween: 8,
        },
        480: {
          slidesPerView: 3.5,
          spaceBetween: 12,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 12,
        }
      }
    });
  }

  const platformOptions = document.querySelectorAll('.platform-option');
  if (platformOptions.length > 0) {
    platformOptions.forEach(option => {
      option.addEventListener('click', function() {
        platformOptions.forEach(opt => {
          opt.classList.remove('active');
          const checkmark = opt.querySelector('.checkmark');
          if (checkmark) checkmark.style.display = 'none';
        });
        this.classList.add('active');
        const checkmark = this.querySelector('.checkmark');
        if (checkmark) checkmark.style.display = 'flex';
      });
    });

    const activeOption = document.querySelector('.platform-option.active');
    if (activeOption) {
      const checkmark = activeOption.querySelector('.checkmark');
      if (checkmark) checkmark.style.display = 'flex';
    }
  }

  const addToCartBtn = document.querySelector('.add-to-cart-btn');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function() {
      if (this.classList.contains('added-to-cart')) {
        return;
      }
      
      const btnText = this.querySelector('.btn-text');
      const loadingDots = this.querySelector('.loading-dots');
      const successState = this.querySelector('.success-state');
      
      btnText.style.display = 'none';
      loadingDots.style.display = 'flex';
      
      setTimeout(() => {
        loadingDots.style.display = 'none';
        successState.style.display = 'flex';
        this.classList.add('added-to-cart');
        
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
          const currentCount = parseInt(cartCount.textContent);
          cartCount.textContent = currentCount + 1;
        }
      }, 1500);
    });
  }

  const videoOverlay = document.querySelector('.video-overlay');
  const mainVideo = document.querySelector('.video-preview');
  
  if (videoOverlay && mainVideo) {
    videoOverlay.addEventListener('click', function() {
      this.style.display = 'none';
    });
  }

  const thumbnailItems = document.querySelectorAll('.thumbnail-item');
  if (thumbnailItems.length > 0) {
    thumbnailItems.forEach(item => {
      item.addEventListener('click', function() {
        thumbnailItems.forEach(thumb => thumb.classList.remove('active'));
        this.classList.add('active');
        
        const img = this.querySelector('img');
        const dataType = this.getAttribute('data-type');
        
        if (img && mainVideo) {
          mainVideo.src = img.src;
          
          if (dataType === 'video') {
            if (videoOverlay) {
              videoOverlay.style.display = 'flex';
            }
          } else {
            if (videoOverlay) {
              videoOverlay.style.display = 'none';
            }
          }
        }
      });
    });
  }

  const customSelect = document.querySelector('.custom-select');
  if (customSelect) {
    const selectHeader = customSelect.querySelector('.select-header');
    const selectDropdown = customSelect.querySelector('.select-dropdown');
    const selectOptions = customSelect.querySelectorAll('.select-option');
    const selectText = customSelect.querySelector('.select-text');
    const selectArrow = customSelect.querySelector('.select-arrow');

    function toggleDropdown() {
      const isActive = selectHeader.classList.contains('active');
      
      if (isActive) {
        selectHeader.classList.remove('active');
        selectDropdown.classList.remove('active');
      } else {
        selectHeader.classList.add('active');
        selectDropdown.classList.add('active');
      }
    }

    function selectOption(option) {
      const flag = option.querySelector('img');
      const text = option.querySelector('span');
      const value = option.getAttribute('data-value');
      
      selectOptions.forEach(opt => opt.classList.remove('selected'));
      option.classList.add('selected');
      
      const currentFlag = selectHeader.querySelector('img');
      currentFlag.src = flag.src;
      currentFlag.alt = flag.alt;
      selectText.textContent = text.textContent;
      
      selectHeader.classList.remove('active');
      selectDropdown.classList.remove('active');
    }

    selectHeader.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleDropdown();
    });

    selectOptions.forEach(option => {
      option.addEventListener('click', function(e) {
        e.stopPropagation();
        selectOption(this);
      });
    });

    document.addEventListener('click', function(e) {
      if (!customSelect.contains(e.target)) {
        selectHeader.classList.remove('active');
        selectDropdown.classList.remove('active');
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        selectHeader.classList.remove('active');
        selectDropdown.classList.remove('active');
      }
    });
  }

  const catalogCustomSelect = document.querySelector('.catalog-filters .custom-select');
  if (catalogCustomSelect) {
    const catalogSelectHeader = catalogCustomSelect.querySelector('.select-header');
    const catalogSelectDropdown = catalogCustomSelect.querySelector('.select-dropdown');
    const catalogSelectOptions = catalogCustomSelect.querySelectorAll('.select-option');
    const catalogSelectText = catalogCustomSelect.querySelector('.select-text');

    function toggleCatalogDropdown() {
      const isActive = catalogSelectHeader.classList.contains('active');
      
      if (isActive) {
        catalogSelectHeader.classList.remove('active');
        catalogSelectDropdown.classList.remove('active');
      } else {
        catalogSelectHeader.classList.add('active');
        catalogSelectDropdown.classList.add('active');
      }
    }

    function selectCatalogOption(option) {
      const flag = option.querySelector('img');
      const text = option.querySelector('span');
      const value = option.getAttribute('data-value');
      
      catalogSelectOptions.forEach(opt => opt.classList.remove('selected'));
      option.classList.add('selected');
      
      const currentFlag = catalogSelectHeader.querySelector('img');
      currentFlag.src = flag.src;
      currentFlag.alt = flag.alt;
      catalogSelectText.textContent = text.textContent;
      
      catalogSelectHeader.classList.remove('active');
      catalogSelectDropdown.classList.remove('active');
    }

    catalogSelectHeader.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleCatalogDropdown();
    });

    catalogSelectOptions.forEach(option => {
      option.addEventListener('click', function(e) {
        e.stopPropagation();
        selectCatalogOption(this);
      });
    });

    document.addEventListener('click', function(e) {
      if (!catalogCustomSelect.contains(e.target)) {
        catalogSelectHeader.classList.remove('active');
        catalogSelectDropdown.classList.remove('active');
      }
    });
  }

  const resetFiltersBtn = document.querySelector('.reset-filters-btn');
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', function() {
      const checkboxes = document.querySelectorAll('.catalog-filters input[type="checkbox"]');
      checkboxes.forEach(checkbox => {
        checkbox.checked = false;
      });
      
      const platformCheckboxes = document.querySelectorAll('.platform-filters input[type="checkbox"]');
      platformCheckboxes.forEach(checkbox => {
        checkbox.checked = true;
      });
    });
  }

  const filterSearchInputs = document.querySelectorAll('.filter-search');
  filterSearchInputs.forEach(input => {
    input.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      const filterOptions = this.closest('.filter-section').querySelectorAll('.filter-option');
      
      filterOptions.forEach(option => {
        const text = option.querySelector('span').textContent.toLowerCase();
        if (text.includes(searchTerm)) {
          option.style.display = 'flex';
        } else {
          option.style.display = 'none';
        }
      });
    });
  });

  const filterSections = document.querySelectorAll('.filter-section');
  filterSections.forEach(section => {
    const filterHeader = section.querySelector('.filter-header');
    const filterContent = section.querySelector('.filter-content');
    const filterArrow = section.querySelector('.filter-arrow');
    
    if (filterHeader && filterContent) {
      section.classList.add('active');
      filterContent.style.maxHeight = filterContent.scrollHeight + 'px';
      filterArrow.style.transform = 'rotate(180deg)';
      
      filterHeader.addEventListener('click', function() {
        const isActive = section.classList.contains('active');
        
        if (isActive) {
          section.classList.remove('active');
          filterContent.style.maxHeight = '0';
          filterArrow.style.transform = 'rotate(0deg)';
        } else {
          section.classList.add('active');
          filterContent.style.maxHeight = filterContent.scrollHeight + 'px';
          filterArrow.style.transform = 'rotate(180deg)';
        }
      });
    }
    

  });

  const sortDropdown = document.querySelector('.sort-dropdown');
  if (sortDropdown) {
    const sortHeader = sortDropdown.querySelector('.sort-header');
    const sortOptions = sortDropdown.querySelectorAll('.sort-option');
    const sortText = sortDropdown.querySelector('.sort-text');
    const sortIcon = sortDropdown.querySelector('.sort-icon');

    function toggleSortDropdown() {
      const isActive = sortDropdown.classList.contains('active');
      
      if (isActive) {
        sortDropdown.classList.remove('active');
      } else {
        sortDropdown.classList.add('active');
      }
    }

    function selectSortOption(option) {
      const sortType = option.getAttribute('data-sort');
      const text = option.querySelector('span').textContent;
      const icon = option.querySelector('.sort-option-icon').outerHTML;
      
      sortOptions.forEach(opt => opt.classList.remove('active'));
      option.classList.add('active');
      
      sortText.textContent = text;
      sortIcon.outerHTML = icon;
      
      sortDropdown.classList.remove('active');
      
      sortGames(sortType);
    }

    function sortGames(sortType) {
      const gamesGrid = document.querySelector('.games-grid');
      if (!gamesGrid) return;
      
      const gameCards = Array.from(gamesGrid.querySelectorAll('.game-card'));
      
      gameCards.sort((a, b) => {
        const priceA = parseFloat(a.querySelector('.current-price').textContent.replace(/[^\d]/g, ''));
        const priceB = parseFloat(b.querySelector('.current-price').textContent.replace(/[^\d]/g, ''));
        
        switch(sortType) {
          case 'price-high':
            return priceB - priceA;
          case 'price-low':
            return priceA - priceB;
          case 'default':
          default:
            return 0;
        }
      });
      
      gameCards.forEach(card => gamesGrid.appendChild(card));
    }

    sortHeader.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleSortDropdown();
    });

    sortOptions.forEach(option => {
      option.addEventListener('click', function(e) {
        e.stopPropagation();
        selectSortOption(this);
      });
    });

    document.addEventListener('click', function(e) {
      if (!sortDropdown.contains(e.target)) {
        sortDropdown.classList.remove('active');
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        sortDropdown.classList.remove('active');
      }
    });
  }

  const loadMoreBtn = document.querySelector('.load-more-btn');
  const paginationArrows = document.querySelectorAll('.pagination-arrow');
  const pageNumbers = document.querySelectorAll('.page-number');

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function() {
      const btnText = this.querySelector('span');
      const originalText = btnText.textContent;
      
      btnText.textContent = 'Загрузка...';
      this.disabled = true;
      
      setTimeout(() => {
        btnText.textContent = originalText;
        this.disabled = false;
      }, 2000);
    });
  }

  paginationArrows.forEach(arrow => {
    arrow.addEventListener('click', function() {
      const isPrev = this.classList.contains('prev');
      const currentActive = document.querySelector('.page-number.active');
      const allNumbers = Array.from(pageNumbers);
      const currentIndex = allNumbers.indexOf(currentActive);
      
      if (isPrev && currentIndex > 0) {
        currentActive.classList.remove('active');
        allNumbers[currentIndex - 1].classList.add('active');
      } else if (!isPrev && currentIndex < allNumbers.length - 1) {
        currentActive.classList.remove('active');
        allNumbers[currentIndex + 1].classList.add('active');
      }
    });
  });

  pageNumbers.forEach(number => {
    number.addEventListener('click', function() {
      pageNumbers.forEach(num => num.classList.remove('active'));
      this.classList.add('active');
    });
  });

  const categoriesSwiperElement = document.querySelector('.categories-swiper');
  if (categoriesSwiperElement) {
    const categoriesSwiper = new Swiper('.categories-swiper', {
      slidesPerView: 'auto',
      spaceBetween: 4,
      navigation: {
        nextEl: '.category-nav-btn.next',
        prevEl: '.category-nav-btn.prev',
      },
      breakpoints: {
        320: {
          slidesPerView: 2.5,
          spaceBetween: 4,
        },
        480: {
          slidesPerView: 3.5,
          spaceBetween: 4,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 4,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 4,
        }
      }
    });
  }

          const cartTabs = document.querySelectorAll('.cart-tab');
        if (cartTabs.length > 0) {
          cartTabs.forEach((tab, index) => {
            tab.addEventListener('click', function() {
              cartTabs.forEach(t => t.classList.remove('active'));
              this.classList.add('active');
              
              const tabContents = document.querySelectorAll('.cart-tab-content');
              tabContents.forEach(content => {
                content.classList.remove('active');
              });
              
              if (index === 0) {
                const gamesTab = document.getElementById('games-tab');
                if (gamesTab) {
                  gamesTab.classList.add('active');
                }
                showGamesSidebar();
              } else if (index === 1) {
                const itemsTab = document.getElementById('items-tab');
                if (itemsTab) {
                  itemsTab.classList.add('active');
                }
                showItemsSidebar();
              } else if (index === 2) {
                const subscriptionsTab = document.getElementById('subscriptions-tab');
                if (subscriptionsTab) {
                  subscriptionsTab.classList.add('active');
                }
                showSubscriptionsSidebar();
              }
            });
          });
        }

  const paymentTabs = document.querySelectorAll('.payment-tab');
  if (paymentTabs.length > 0) {
    paymentTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        paymentTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
      });
    });
  }

  const paymentOptions = document.querySelectorAll('.payment-option');
  if (paymentOptions.length > 0) {
    paymentOptions.forEach(option => {
      option.addEventListener('click', function() {
        paymentOptions.forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
      });
    });
  }

  const quantityBtns = document.querySelectorAll('.quantity-btn');
  if (quantityBtns.length > 0) {  
    quantityBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const quantitySpan = this.closest('.item-quantity').querySelector('.quantity');
        let currentQuantity = parseInt(quantitySpan.textContent);
        
        if (this.classList.contains('minus')) {
          if (currentQuantity > 1) {
            currentQuantity--;
          }
        } else if (this.classList.contains('plus')) {
          currentQuantity++;
        }
        
        quantitySpan.textContent = currentQuantity;
      });
    });
  }

  const marketQuantityBtns = document.querySelectorAll('.market-quantity-btn');
  if (marketQuantityBtns.length > 0) {
    marketQuantityBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const quantitySpan = this.closest('.market-item-actions').querySelector('.market-quantity');
        let currentQuantity = parseInt(quantitySpan.textContent);
        
        if (this.classList.contains('minus')) {
          if (currentQuantity > 1) {
            currentQuantity--;
          }
        } else if (this.classList.contains('plus')) {
          currentQuantity++;
        }
        
        quantitySpan.textContent = currentQuantity;
      });
    });
  }
  
  function initializeDropdowns() {
    const dropdowns = document.querySelectorAll('.subscription-form .dropdown-input');
    
    dropdowns.forEach(dropdown => {
      const dropdownMenu = dropdown.querySelector('.dropdown-menu');
      const dropdownItems = dropdown.querySelectorAll('.dropdown-item');
      
      dropdown.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('active');
      });
      
      dropdownItems.forEach(item => {
        item.addEventListener('click', (e) => {
          e.stopPropagation();
          
          const region = item.getAttribute('data-region');
          const flag = item.getAttribute('data-flag');
          const text = item.querySelector('span').textContent;
          
          const flagIcon = dropdown.querySelector('.dropdown-flag img');
          const dropdownText = dropdown.querySelector('.dropdown-text');
          
          flagIcon.src = flag;
          flagIcon.alt = text;
          dropdownText.textContent = text;
          
          dropdown.classList.remove('active');
        });
      });
    });
    
    document.addEventListener('click', () => {
      dropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
      });
    });
  }

  initializeDropdowns();
  
  function initializeSubscriptionCards() {
    const subscriptionCards = document.querySelectorAll('.ps-plus-card');
    
    subscriptionCards.forEach(card => {
      card.addEventListener('click', () => {
        subscriptionCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
      });
    });
  }

  function initializePsPlusTabs() {
    const psPlusTabs = document.querySelectorAll('.ps-plus-tab');
    const psPlusCards = document.querySelectorAll('.ps-plus-cards');
    
    psPlusTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        if (tab.classList.contains('disabled')) {
          return;
        }
        
        psPlusTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        const tabType = tab.querySelector('.ps-tab-text').textContent.toLowerCase();
        
        psPlusCards.forEach(cardsContainer => {
          const cards = cardsContainer.querySelectorAll('.ps-plus-card');
          cards.forEach(card => {
            const cardTab = card.getAttribute('data-tab');
            if (cardTab === tabType) {
              card.style.display = 'block';
            } else {
              card.style.display = 'none';
            }
          });
        });
      });
    });
  }
  
  initializeSubscriptionCards();
  initializePsPlusTabs();
  
  function initializeServiceItems() {
    const serviceItems = document.querySelectorAll('.service-item');
    const psPlusForm = document.getElementById('ps-plus-form');
    const steamForm = document.getElementById('steam-form');
    
    if (psPlusForm && steamForm) {
      const url = window.location.href;
      const isSteamPage = url.includes('steam') || document.title.includes('Steam');
      
      if (isSteamPage) {
        psPlusForm.style.display = 'none';
        steamForm.style.display = 'flex';
      } else {
        psPlusForm.style.display = 'flex';
        steamForm.style.display = 'none';
      }
    }
    
    serviceItems.forEach(item => {
      item.addEventListener('click', () => {
        serviceItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        
        const serviceName = item.querySelector('.service-name').textContent;
        
        if (serviceName === 'PlayStation Plus') {
          psPlusForm.style.display = 'flex';
          steamForm.style.display = 'none';
        } else if (serviceName === 'Steam') {
          psPlusForm.style.display = 'none';
          steamForm.style.display = 'flex';
        }
      });
    });
  }
  
  initializeServiceItems();
}

document.addEventListener('DOMContentLoaded', function() {
  initializeTabs();
  showGamesSidebar();
});