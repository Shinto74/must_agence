/* ══════════════════════════════════════════════════════
   Must Agence — Sections JS
   Artiste auto-scroll engine + Wizard engine
   Extracted from validated preview
══════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function() {

  /* ── ARTIST SCROLL ENGINE ──
     - Auto-scroll continu (NEVER pauses, not even on hover)
     - Scrollbar visible (3px neon)
     - Drag to accelerate
     - Tab click → scroll to START of category (pause auto 900ms)
     - Tabs auto-detect from center card
     - Single pass only (19 cards, no duplication)
  */
  var wrap = document.getElementById('artWrap');
  var track = document.getElementById('artTrack');
  var tabs = document.querySelectorAll('#catTabs .cat-tab');

  if (wrap && track && tabs.length) {
    var isDragging = false;
    var isSmoothing = false;
    var dragStartX, dragStartScroll;
    var trackEnd = 0;
    var lastCat = 'urbain';

    function measureTrack() { trackEnd = track.scrollWidth - wrap.offsetWidth; }
    setTimeout(measureTrack, 300);
    setTimeout(measureTrack, 1500);

    // Auto-scroll (rAF — NEVER stops)
    function autoLoop() {
      if (!isDragging && !isSmoothing) {
        wrap.scrollLeft += 0.7;
        if (trackEnd > 0 && wrap.scrollLeft >= trackEnd) {
          wrap.scrollLeft = 0;
        }
      }
      requestAnimationFrame(autoLoop);
    }

    // Start when visible
    var started = false;
    var obs = new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting && !started) {
        started = true;
        measureTrack();
        autoLoop();
      }
    }, {threshold: 0.05});
    obs.observe(wrap.closest('section'));

    // Drag to accelerate
    wrap.addEventListener('mousedown', function(e) {
      isDragging = true;
      dragStartX = e.pageX;
      dragStartScroll = wrap.scrollLeft;
      wrap.style.cursor = 'grabbing';
    });
    window.addEventListener('mouseup', function() {
      if (isDragging) { isDragging = false; wrap.style.cursor = 'grab'; }
    });
    wrap.addEventListener('mousemove', function(e) {
      if (!isDragging) return;
      e.preventDefault();
      wrap.scrollLeft = dragStartScroll - (e.pageX - dragStartX) * 1.8;
    });

    // Auto-detect category at center
    function detectCat() {
      var center = wrap.getBoundingClientRect().left + wrap.offsetWidth / 2;
      var cards = track.querySelectorAll('.art-card');
      var found = '';
      for (var i = 0; i < cards.length; i++) {
        var rect = cards[i].getBoundingClientRect();
        if (rect.left <= center && rect.right >= center) {
          found = cards[i].getAttribute('data-cat');
          break;
        }
      }
      if (found && found !== lastCat) {
        lastCat = found;
        tabs.forEach(function(t) {
          t.classList.toggle('active', t.getAttribute('data-cat') === found);
        });
      }
    }
    wrap.addEventListener('scroll', detectCat);

    // Tab click → scroll to START of that category
    // Build index map from data attributes
    var catStartIndex = {};
    var allCards = track.querySelectorAll('.art-card');
    var seenCats = {};
    allCards.forEach(function(card, i) {
      var cat = card.getAttribute('data-cat');
      if (!seenCats[cat]) {
        catStartIndex[cat] = i;
        seenCats[cat] = true;
      }
    });

    tabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        var cat = tab.getAttribute('data-cat');
        var startIdx = catStartIndex[cat] || 0;
        var targetCard = allCards[startIdx];
        if (!targetCard) return;
        isSmoothing = true;
        wrap.scrollTo({ left: targetCard.offsetLeft - 48, behavior: 'smooth' });
        setTimeout(function() { isSmoothing = false; }, 900);
      });
    });
  }

  /* ── WIZARD ENGINE (Form B) ── */
  var wizStep = 0;
  var wizTotal = 5;
  var stepTitles = ['Votre profil','Votre projet','Votre budget','Votre échéance','Vos attentes'];

  window.wizNav = function(dir) {
    var panel = document.querySelector('#wizB .wiz-panel');
    if (!panel) return;
    var slides = panel.querySelectorAll('.wiz-slide');

    if (dir === 1 && wizStep < wizTotal) {
      var cur = slides[wizStep];
      var radios = cur.querySelectorAll('input[type="radio"]');
      var textarea = cur.querySelector('textarea');
      var dateInput = cur.querySelector('input[type="date"]');
      var checks = cur.querySelectorAll('input[type="checkbox"]');
      var valid = true;
      if (radios.length > 0) valid = Array.from(radios).some(function(r){return r.checked});
      if (textarea) valid = textarea.value.trim().length > 0;
      if (dateInput) valid = dateInput.value.length > 0;
      if (checks.length > 0) valid = Array.from(checks).some(function(c){return c.checked});
      if (!valid) {
        panel.style.animation = 'none';
        panel.offsetHeight;
        panel.style.animation = 'shake .4s var(--ez)';
        return;
      }
    }

    wizStep = Math.max(0, Math.min(wizTotal, wizStep + dir));
    slides.forEach(function(sl, i) { sl.classList.toggle('on', i === wizStep); });

    var segs = document.querySelectorAll('#wizBBar .step-seg');
    segs.forEach(function(sg, i) {
      sg.classList.remove('on', 'done');
      if (i < wizStep) sg.classList.add('done');
      if (i === wizStep) sg.classList.add('on');
    });

    var curNum = document.getElementById('wizBCur');
    var titleEl = document.getElementById('wizBTitle');
    if (curNum) curNum.textContent = Math.min(wizStep + 1, wizTotal);
    if (titleEl) titleEl.textContent = stepTitles[Math.min(wizStep, wizTotal - 1)];

    var prev = document.getElementById('wizBPrev');
    var next = document.getElementById('wizBNext');
    var foot = document.getElementById('wizBFoot');
    if (prev) prev.disabled = wizStep === 0;
    if (next) {
      if (wizStep === wizTotal - 1) next.textContent = 'Envoyer ma demande';
      else next.textContent = 'Suivant';
    }
    if (wizStep >= wizTotal && foot) foot.style.display = 'none';
  };

});
