/* ============================================
   Coffee Dezign — Interactive JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Navbar scroll effect ---------- */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');

  const handleScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('open');
  });

  // Close mobile menu on link click
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('open');
    });
  });

  /* ---------- Smooth scroll ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ---------- Menu filter tabs ---------- */
  const menuTabs = document.querySelectorAll('.menu-tab');
  const menuCards = document.querySelectorAll('.menu-card');

  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab
      menuTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;

      menuCards.forEach((card, index) => {
        const category = card.dataset.category;

        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          // Stagger animation
          card.style.animation = 'none';
          card.offsetHeight; // Trigger reflow
          card.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s both`;
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ---------- Testimonial slider ---------- */
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.testimonial-dot');
  let currentSlide = 0;
  let autoSlideTimer;

  const showSlide = (index) => {
    testimonialCards.forEach(card => {
      card.classList.remove('active');
      card.style.animation = '';
    });
    dots.forEach(dot => dot.classList.remove('active'));

    testimonialCards[index].classList.add('active');
    testimonialCards[index].style.animation = 'fadeInUp 0.6s ease both';
    dots[index].classList.add('active');
    currentSlide = index;
  };

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const slideIndex = parseInt(dot.dataset.slide);
      showSlide(slideIndex);
      resetAutoSlide();
    });
  });

  const nextSlide = () => {
    const next = (currentSlide + 1) % testimonialCards.length;
    showSlide(next);
  };

  const resetAutoSlide = () => {
    clearInterval(autoSlideTimer);
    autoSlideTimer = setInterval(nextSlide, 5000);
  };

  autoSlideTimer = setInterval(nextSlide, 5000);

  /* ---------- Scroll reveal animation ---------- */
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add delay for stagger effect
        const delay = index * 100;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, Math.min(delay, 500));
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ---------- Contact form ---------- */
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('.btn-primary');
    const originalText = btn.innerHTML;

    btn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="animation: spin 1s linear infinite">
        <path d="M21 12a9 9 0 11-6.219-8.56"/>
      </svg>
      กำลังส่ง...
    `;
    btn.style.opacity = '0.7';
    btn.disabled = true;

    // Simulate sending
    setTimeout(() => {
      btn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        ส่งเรียบร้อยแล้ว!
      `;
      btn.style.opacity = '1';
      btn.style.background = '#4A6741';
      btn.style.color = '#F5EBD8';

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.style.color = '';
        btn.disabled = false;
        contactForm.reset();
      }, 3000);
    }, 1500);
  });

  /* ---------- Parallax effect on hero ---------- */
  const heroBg = document.querySelector('.hero-bg img');
  window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
      const offset = window.scrollY * 0.4;
      heroBg.style.transform = `translateY(${offset}px) scale(1.1)`;
    }
  }, { passive: true });

  /* ---------- Counter animation ---------- */
  const animateCounter = (element, target, suffix = '') => {
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current).toLocaleString() + suffix;
    }, 16);
  };

  // Observe stat numbers
  const statNumbers = document.querySelectorAll('.stat-number');
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const text = entry.target.textContent;
        if (text.includes('1,200')) {
          animateCounter(entry.target, 1200, '+');
        }
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => statObserver.observe(el));

});

/* ---------- CSS animation keyframes injected via JS ---------- */
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);


/* ============================================
   RESERVATION SYSTEM
   ============================================ */

// Table configuration
const TABLES = {
  indoor: [
    { id: 'A1', seats: 2 },
    { id: 'A2', seats: 2 },
    { id: 'A3', seats: 4 },
    { id: 'A4', seats: 4 },
    { id: 'B1', seats: 2 },
    { id: 'B2', seats: 6 },
    { id: 'B3', seats: 4 },
    { id: 'B4', seats: 8 },
  ],
  outdoor: [
    { id: 'C1', seats: 2 },
    { id: 'C2', seats: 2 },
    { id: 'C3', seats: 4 },
    { id: 'C4', seats: 4 },
  ]
};

// Randomly occupied tables for demo
function getOccupiedTables(zone) {
  const tables = TABLES[zone];
  const count = Math.floor(tables.length * 0.3); // 30% occupied
  const shuffled = [...tables].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map(t => t.id);
}

// State
let rsvState = {
  currentStep: 1,
  date: '',
  time: '',
  guests: 2,
  zone: 'indoor',
  selectedTable: null,
  name: '',
  phone: '',
  email: '',
  note: '',
  occupiedTables: {}
};

// DOM elements
const rsvOverlay = document.getElementById('rsvOverlay');
const rsvModal = document.getElementById('rsvModal');
const rsvClose = document.getElementById('rsvClose');
const rsvStep1 = document.getElementById('rsvStep1');
const rsvStep2 = document.getElementById('rsvStep2');
const rsvStep3 = document.getElementById('rsvStep3');
const rsvNext1 = document.getElementById('rsvNext1');
const rsvNext2 = document.getElementById('rsvNext2');
const rsvBack2 = document.getElementById('rsvBack2');
const rsvDone = document.getElementById('rsvDone');
const rsvViewAll = document.getElementById('rsvViewAll');
const rsvListModal = document.getElementById('rsvListModal');
const rsvListClose = document.getElementById('rsvListClose');
const rsvListBack = document.getElementById('rsvListBack');
const rsvListWrapper = document.getElementById('rsvListWrapper');
const rsvDateInput = document.getElementById('rsvDate');
const rsvTimeSelect = document.getElementById('rsvTime');
const guestCount = document.getElementById('guestCount');
const guestMinus = document.getElementById('guestMinus');
const guestPlus = document.getElementById('guestPlus');
const tableMap = document.getElementById('tableMap');

// Set min date to today
const today = new Date();
const todayStr = today.toISOString().split('T')[0];
rsvDateInput.setAttribute('min', todayStr);
rsvDateInput.value = todayStr;
rsvState.date = todayStr;

// Generate occupied tables for each zone
rsvState.occupiedTables = {
  indoor: getOccupiedTables('indoor'),
  outdoor: getOccupiedTables('outdoor')
};

// Open reservation modal
function openReservation() {
  // Reset state
  rsvState.currentStep = 1;
  rsvState.selectedTable = null;
  rsvState.guests = 2;
  rsvState.zone = 'indoor';
  guestCount.textContent = '2';

  // Reset form fields
  document.getElementById('rsvName').value = '';
  document.getElementById('rsvPhone').value = '';
  document.getElementById('rsvEmail').value = '';
  document.getElementById('rsvNote').value = '';

  // Reset zone buttons
  document.querySelectorAll('.rsv-zone-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('.rsv-zone-btn[data-zone="indoor"]').classList.add('active');

  // Regenerate occupied tables
  rsvState.occupiedTables = {
    indoor: getOccupiedTables('indoor'),
    outdoor: getOccupiedTables('outdoor')
  };

  goToStep(1);
  renderTableMap();
  validateStep1();

  rsvOverlay.classList.add('open');
  rsvModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

// Close reservation modal
function closeReservation() {
  rsvOverlay.classList.remove('open');
  rsvModal.classList.remove('open');
  rsvListModal.classList.remove('open');
  document.body.style.overflow = '';
}

rsvClose.addEventListener('click', closeReservation);
rsvOverlay.addEventListener('click', closeReservation);

// Make openReservation available globally
window.openReservation = openReservation;

// Step navigation
function goToStep(step) {
  rsvState.currentStep = step;

  // Update step content
  [rsvStep1, rsvStep2, rsvStep3].forEach(s => s.classList.remove('active'));
  if (step === 1) rsvStep1.classList.add('active');
  if (step === 2) rsvStep2.classList.add('active');
  if (step === 3) rsvStep3.classList.add('active');

  // Update progress indicators
  document.querySelectorAll('.rsv-step-indicator').forEach(ind => {
    const s = parseInt(ind.dataset.step);
    ind.classList.remove('active', 'completed');
    if (s === step) ind.classList.add('active');
    if (s < step) ind.classList.add('completed');
  });

  // Update step lines
  const lines = document.querySelectorAll('.rsv-step-line');
  lines.forEach((line, i) => {
    line.classList.toggle('filled', i < step - 1);
  });

  // Scroll modal to top
  rsvModal.scrollTop = 0;
}

// Render table map
function renderTableMap() {
  const zone = rsvState.zone;
  const tables = TABLES[zone];
  const occupied = rsvState.occupiedTables[zone];

  tableMap.innerHTML = '';

  tables.forEach(table => {
    const isOccupied = occupied.includes(table.id);
    const isSelected = rsvState.selectedTable === table.id;

    const el = document.createElement('div');
    el.className = 'rsv-table';
    if (isOccupied) el.classList.add('occupied');
    if (isSelected) el.classList.add('selected');

    el.innerHTML = `
      <span class="rsv-table-number">${table.id}</span>
      <span class="rsv-table-seats">${table.seats} ที่นั่ง</span>
    `;

    if (!isOccupied) {
      el.addEventListener('click', () => {
        if (rsvState.selectedTable === table.id) {
          rsvState.selectedTable = null;
        } else {
          rsvState.selectedTable = table.id;
        }
        renderTableMap();
        validateStep1();
      });
    }

    tableMap.appendChild(el);
  });
}

// Validate step 1
function validateStep1() {
  const date = rsvDateInput.value;
  const time = rsvTimeSelect.value;
  const table = rsvState.selectedTable;

  const valid = date && time && table;
  rsvNext1.disabled = !valid;
}

// Guest counter
guestMinus.addEventListener('click', () => {
  if (rsvState.guests > 1) {
    rsvState.guests--;
    guestCount.textContent = rsvState.guests;
  }
});

guestPlus.addEventListener('click', () => {
  if (rsvState.guests < 20) {
    rsvState.guests++;
    guestCount.textContent = rsvState.guests;
  }
});

// Zone picker
document.querySelectorAll('.rsv-zone-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.rsv-zone-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    rsvState.zone = btn.dataset.zone;
    rsvState.selectedTable = null;
    renderTableMap();
    validateStep1();
  });
});

// Date / Time change listeners
rsvDateInput.addEventListener('change', () => {
  rsvState.date = rsvDateInput.value;
  // Regenerate occupied tables when date changes
  rsvState.occupiedTables = {
    indoor: getOccupiedTables('indoor'),
    outdoor: getOccupiedTables('outdoor')
  };
  rsvState.selectedTable = null;
  renderTableMap();
  validateStep1();
});

rsvTimeSelect.addEventListener('change', () => {
  rsvState.time = rsvTimeSelect.value;
  validateStep1();
});

// Step 1 -> Step 2
rsvNext1.addEventListener('click', () => {
  if (rsvNext1.disabled) return;
  rsvState.date = rsvDateInput.value;
  rsvState.time = rsvTimeSelect.value;
  goToStep(2);
});

// Step 2 -> Back to Step 1
rsvBack2.addEventListener('click', () => {
  goToStep(1);
});

// Step 2 -> Step 3 (Submit)
rsvNext2.addEventListener('click', () => {
  const nameInput = document.getElementById('rsvName');
  const phoneInput = document.getElementById('rsvPhone');

  // Clear errors
  nameInput.classList.remove('error');
  phoneInput.classList.remove('error');

  let valid = true;

  if (!nameInput.value.trim()) {
    nameInput.classList.add('error');
    nameInput.focus();
    valid = false;
  }

  if (!phoneInput.value.trim()) {
    phoneInput.classList.add('error');
    if (valid) phoneInput.focus();
    valid = false;
  }

  if (!valid) return;

  rsvState.name = nameInput.value.trim();
  rsvState.phone = phoneInput.value.trim();
  rsvState.email = document.getElementById('rsvEmail').value.trim();
  rsvState.note = document.getElementById('rsvNote').value.trim();

  // Generate reference number
  const ref = 'CD-' + String(Date.now()).slice(-6);

  // Save to localStorage
  const reservations = JSON.parse(localStorage.getItem('coffeedezign_reservations') || '[]');
  const newReservation = {
    ref: ref,
    date: rsvState.date,
    time: rsvState.time,
    guests: rsvState.guests,
    zone: rsvState.zone === 'indoor' ? 'ในร้าน' : 'กลางแจ้ง',
    table: rsvState.selectedTable,
    name: rsvState.name,
    phone: rsvState.phone,
    email: rsvState.email,
    note: rsvState.note,
    createdAt: new Date().toISOString()
  };
  reservations.push(newReservation);
  localStorage.setItem('coffeedezign_reservations', JSON.stringify(reservations));

  // Format date for display
  const dateObj = new Date(rsvState.date + 'T00:00:00');
  const thaiDays = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'];
  const thaiMonths = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
  const dateDisplay = `วัน${thaiDays[dateObj.getDay()]}ที่ ${dateObj.getDate()} ${thaiMonths[dateObj.getMonth()]} ${dateObj.getFullYear() + 543}`;

  // Update summary
  document.getElementById('rsvRefNumber').textContent = ref;
  document.getElementById('rsvSumDate').textContent = dateDisplay;
  document.getElementById('rsvSumTime').textContent = rsvState.time + ' น.';
  document.getElementById('rsvSumGuests').textContent = rsvState.guests + ' คน';
  document.getElementById('rsvSumTable').textContent = `${rsvState.selectedTable} (${newReservation.zone})`;
  document.getElementById('rsvSumName').textContent = rsvState.name;
  document.getElementById('rsvSumPhone').textContent = rsvState.phone;

  goToStep(3);
});

// Done - close modal
rsvDone.addEventListener('click', closeReservation);

// View all reservations
rsvViewAll.addEventListener('click', () => {
  rsvModal.classList.remove('open');
  renderReservationList();
  rsvListModal.classList.add('open');
});

rsvListClose.addEventListener('click', () => {
  rsvListModal.classList.remove('open');
  rsvOverlay.classList.remove('open');
  document.body.style.overflow = '';
});

rsvListBack.addEventListener('click', () => {
  rsvListModal.classList.remove('open');
  rsvOverlay.classList.remove('open');
  document.body.style.overflow = '';
});

// Render reservation list
function renderReservationList() {
  const reservations = JSON.parse(localStorage.getItem('coffeedezign_reservations') || '[]');

  if (reservations.length === 0) {
    rsvListWrapper.innerHTML = '<p class="rsv-empty">ยังไม่มีรายการจอง</p>';
    return;
  }

  // Sort by date descending
  reservations.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  rsvListWrapper.innerHTML = reservations.map((r, idx) => {
    const dateObj = new Date(r.date + 'T00:00:00');
    const thaiMonths = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    const dateStr = `${dateObj.getDate()} ${thaiMonths[dateObj.getMonth()]} ${dateObj.getFullYear() + 543}`;

    return `
      <div class="rsv-list-card">
        <div class="rsv-list-card-info">
          <h4>${r.name} — โต๊ะ ${r.table} (${r.zone})</h4>
          <p>${dateStr} เวลา ${r.time} น. • ${r.guests} คน</p>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <span class="rsv-list-card-ref">${r.ref}</span>
          <button class="rsv-list-card-cancel" onclick="cancelReservation('${r.ref}')">ยกเลิก</button>
        </div>
      </div>
    `;
  }).join('');
}

// Cancel reservation
function cancelReservation(ref) {
  if (!confirm('ต้องการยกเลิกการจองนี้หรือไม่?')) return;

  let reservations = JSON.parse(localStorage.getItem('coffeedezign_reservations') || '[]');
  reservations = reservations.filter(r => r.ref !== ref);
  localStorage.setItem('coffeedezign_reservations', JSON.stringify(reservations));
  renderReservationList();
}

window.cancelReservation = cancelReservation;

// Initialize table map
renderTableMap();
