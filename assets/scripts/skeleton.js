document.addEventListener('DOMContentLoaded', function() {
  const gameItems = document.querySelectorAll('.game-item');
  
  gameItems.forEach(item => {
    item.addEventListener('click', function() {
      // Переключаем активный класс (toggle)
      this.classList.toggle('active');
    });
  });

  // Dropdown functionality
  const sortDropdown = document.getElementById('skeletonSortDropdown');
  const dropdownMenu = document.getElementById('skeletonDropdownMenu');
  const dropdownItems = document.querySelectorAll('.skeleton-dropdown-item');
  const dropdownText = document.querySelector('.skeleton-dropdown-text');

  sortDropdown.addEventListener('click', function(e) {
    e.stopPropagation();
    this.classList.toggle('active');
  });

  dropdownItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.stopPropagation();
      
      // Убираем активный класс со всех элементов
      dropdownItems.forEach(dropdownItem => {
        dropdownItem.classList.remove('active');
      });
      
      // Добавляем активный класс к выбранному элементу
      this.classList.add('active');
      
      // Обновляем текст в dropdown
      const selectedText = this.querySelector('.skeleton-item-text').textContent;
      dropdownText.textContent = selectedText;
      
      // Закрываем dropdown
      sortDropdown.classList.remove('active');
    });
  });

  // Закрытие dropdown при клике вне его
  document.addEventListener('click', function() {
    sortDropdown.classList.remove('active');
  });
});
