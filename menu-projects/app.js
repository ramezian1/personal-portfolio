const menu = [
    {
      id: 1,
      title: "Pancakes",
      category: "breakfast",
      price: 15.99,
      img: "./images/item-1.jpg",
      desc: `Delicious fluffy pancakes served with syrup and butter.`,
    },
    {
      id: 2,
      title: "Burger",
      category: "lunch",
      price: 12.99,
      img: "./images/item-2.jpg",
      desc: `Juicy beef burger served with fries.`,
    },
    {
      id: 3,
      title: "Milkshake",
      category: "shakes",
      price: 8.99,
      img: "./images/item-3.jpg",
      desc: `Creamy vanilla milkshake topped with whipped cream.`,
    },

    {
      id: 4,
      title: "French Toast",
      category: "breakfast",
      price: 10.99,
      img: "./images/item-4.jpg",
      desc: `Golden brown French toast served with maple syrup.`,
    },
    {
      id: 5,
      title: "Caesar Salad",
      category: "lunch",
      price: 9.99,
      img: "./images/item-5.jpg",
      desc: `Crisp romaine lettuce with Caesar dressing and croutons.`,
    },
    {
      id: 6,
      title: "Chocolate Cake",
      category: "desserts",
      price: 6.99,
      img: "./images/item-6.jpg",
      desc: `Rich chocolate cake topped with creamy chocolate frosting.`,
    },
  ];
  // Add more menu items here
  
  // Select the section where menu items will be displayed
  const sectionCenter = document.querySelector('.section-center');
  
  // Select all filter buttons
  const filterBtns = document.querySelectorAll('.filter-btn');
  
  // Load all items on page load
  window.addEventListener('DOMContentLoaded', function () {
    displayMenuItems(menu);
  });
  
  // Filter items based on category
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      const category = e.currentTarget.dataset.id;
      const menuCategory = menu.filter(function (menuItem) {
        if (menuItem.category === category) {
          return menuItem;
        }
      });
      if (category === 'all') {
        displayMenuItems(menu);
      } else {
        displayMenuItems(menuCategory);
      }
    });
  });
  
// Function to display menu items
function displayMenuItems(menuItems) {
    let displayMenu = menuItems.map(function (item) {
      return `<article class="menu-item">
                <img src=${item.img} alt=${item.title} class="menu-img" />
                <div class="item-info">
                  <header>
                    <h4>${item.title}</h4>
                    <h4 class="price">$${item.price}</h4>
                  </header>
                  <p class="item-text">${item.desc}</p>
                </div>
              </article>`;
    });
    displayMenu = displayMenu.join('');
    sectionCenter.innerHTML = displayMenu;
  
    // Ensure every .menu-item gets the full width, even after filtering
    const menuItemsDisplay = document.querySelectorAll('.menu-item');
    menuItemsDisplay.forEach(function (item) {
      item.style.width = '100%';
    });
  }
  