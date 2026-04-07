// Navigation scroll effect
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}

// Fade-in animation on scroll
const fadeElements = document.querySelectorAll('.fade-in');
if (fadeElements.length > 0) {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => observer.observe(el));
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// Back to top
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

// Search modal
const searchBtn = document.getElementById('searchBtn');
const searchModal = document.getElementById('searchModal');
const searchClose = document.getElementById('searchClose');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

if (searchBtn && searchModal) {
  searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    searchModal.classList.add('active');
    setTimeout(() => searchInput && searchInput.focus(), 100);
  });

  if (searchClose) {
    searchClose.addEventListener('click', () => {
      searchModal.classList.remove('active');
    });
  }

  searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) {
      searchModal.classList.remove('active');
    }
  });

  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        searchModal.classList.remove('active');
      }
    });

    // Simple search (requires search index)
    let searchIndex = null;
    
    async function loadSearchIndex() {
      if (!searchIndex) {
        try {
          const res = await fetch('/index.json');
          searchIndex = await res.json();
        } catch (e) {
          console.log('Search index not available');
        }
      }
      return searchIndex;
    }

    let debounceTimer;
    searchInput.addEventListener('input', async (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(async () => {
        const query = e.target.value.toLowerCase().trim();
        if (!query || !searchResults) {
          if (searchResults) searchResults.innerHTML = '';
          return;
        }

        const index = await loadSearchIndex();
        if (!index) return;

        const results = index.filter(item => 
          item.title?.toLowerCase().includes(query) ||
          item.content?.toLowerCase().includes(query)
        ).slice(0, 10);

        searchResults.innerHTML = results.map(item => `
          <div class="search-result-item">
            <a href="${item.permalink}">${item.title}</a>
          </div>
        `).join('');
      }, 300);
    });
  }
}

// Article item hover effect
document.querySelectorAll('.article-item').forEach(item => {
  item.addEventListener('mouseenter', function() {
    this.style.borderBottomColor = 'var(--accent)';
  });
  item.addEventListener('mouseleave', function() {
    this.style.borderBottomColor = 'var(--border)';
  });
});
