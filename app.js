// ─── TABS ───
document.querySelectorAll('.tab-nav').forEach(nav => {
  nav.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const panel = document.getElementById(btn.dataset.target);
      if (!panel) return;
      const container = btn.closest('.tab-container');
      container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      container.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      panel.classList.add('active');
    });
  });
});

// ─── NAVBAR SCROLL ───
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.background = window.scrollY > 60
    ? 'rgba(8,14,26,0.97)'
    : 'rgba(8,14,26,0.85)';
});

// ─── PARTICLES ───
(function() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const container = document.getElementById('particles');
  container.appendChild(canvas);
  let W, H, particles = [];

  function resize() {
    W = canvas.width = container.offsetWidth;
    H = canvas.height = container.offsetHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: -Math.random() * 0.4 - 0.1,
      a: Math.random() * 0.5 + 0.1
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212,168,67,${p.a})`;
      ctx.fill();
      p.x += p.dx; p.y += p.dy;
      if (p.y < -5) { p.y = H + 5; p.x = Math.random() * W; }
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

// ─── CHART: P&L WATERFALL ───
const plCtx = document.getElementById('plWaterfall');
if (plCtx) {
  new Chart(plCtx, {
    type: 'bar',
    data: {
      labels: ['Revenue', '− COGS', 'Contribution Margin', '− Op. Salaries', 'Gross Profit', '− OPEX', 'EBITDA'],
      datasets: [{
        label: '₹ (in Lakhs)',
        data: [100, -25, 75, -20, 55, -18, 37],
        backgroundColor: [
          'rgba(16,185,129,0.75)',
          'rgba(239,68,68,0.65)',
          'rgba(59,130,246,0.65)',
          'rgba(239,68,68,0.65)',
          'rgba(59,130,246,0.65)',
          'rgba(239,68,68,0.65)',
          'rgba(212,168,67,0.8)'
        ],
        borderColor: [
          '#10b981','#ef4444','#3b82f6','#ef4444','#3b82f6','#ef4444','#d4a843'
        ],
        borderWidth: 1.5,
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => ` ₹${Math.abs(ctx.raw)} L (illustrative)`
          }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: { color: '#94a3b8', font: { size: 12 } }
        },
        y: {
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: { color: '#94a3b8', font: { size: 12 }, callback: v => '₹' + v + 'L' }
        }
      }
    }
  });
}

// ─── CHART: EXPENSE DONUT ───
const expCtx = document.getElementById('expenseDonut');
if (expCtx) {
  new Chart(expCtx, {
    type: 'doughnut',
    data: {
      labels: ['Professional Charges', 'S&M Expenses', 'G&A Overheads'],
      datasets: [{
        data: [20, 35, 45],
        backgroundColor: ['rgba(212,168,67,0.75)','rgba(59,130,246,0.75)','rgba(16,185,129,0.75)'],
        borderColor: ['#d4a843','#3b82f6','#10b981'],
        borderWidth: 1.5
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: '#94a3b8', padding: 14, font: { size: 12 } }
        },
        tooltip: { callbacks: { label: ctx => ` ${ctx.label}: ${ctx.raw}% (illustrative)` } }
      },
      cutout: '60%'
    }
  });
}

// ─── CHART: BURN & RUNWAY ───
const burnCtx = document.getElementById('burnRunwayChart');
if (burnCtx) {
  new Chart(burnCtx, {
    type: 'bar',
    data: {
      labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
      datasets: [
        {
          type: 'bar',
          label: 'Net Burn (₹ L)',
          data: [18, 22, 15, 19, 17, 14, 21, 16, 13, 12],
          backgroundColor: 'rgba(239,68,68,0.5)',
          borderColor: '#ef4444',
          borderWidth: 1.5,
          borderRadius: 4,
          yAxisID: 'yBurn'
        },
        {
          type: 'line',
          label: 'Runway (months)',
          data: [14, 12, 14, 13, 14, 15, 13, 15, 17, 18],
          borderColor: '#d4a843',
          backgroundColor: 'rgba(212,168,67,0.12)',
          borderWidth: 2.5,
          pointBackgroundColor: '#d4a843',
          pointRadius: 4,
          fill: true,
          tension: 0.4,
          yAxisID: 'yRunway'
        }
      ]
    },
    options: {
      responsive: true,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { labels: { color: '#94a3b8', font: { size: 12 } } },
        tooltip: {
          callbacks: {
            label: ctx => ctx.dataset.label === 'Net Burn (₹ L)'
              ? ` Net Burn: ₹${ctx.raw}L`
              : ` Runway: ${ctx.raw} months`
          }
        }
      },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } },
        yBurn: {
          position: 'left',
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: { color: '#f87171', callback: v => '₹' + v + 'L' }
        },
        yRunway: {
          position: 'right',
          grid: { drawOnChartArea: false },
          ticks: { color: '#d4a843', callback: v => v + ' mo' }
        }
      }
    }
  });
}

// ─── CHART: CASHFLOW INFLOWS VS OUTFLOWS ───
const cfCtx = document.getElementById('cfChart');
if (cfCtx) {
  new Chart(cfCtx, {
    type: 'bar',
    data: {
      labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
      datasets: [
        {
          label: 'Inflows (₹ L)',
          data: [45, 60, 55, 70, 65, 80, 72, 85, 90, 95],
          backgroundColor: 'rgba(16,185,129,0.55)',
          borderColor: '#10b981', borderWidth: 1.5, borderRadius: 4
        },
        {
          label: 'Outflows (₹ L)',
          data: [55, 68, 62, 72, 70, 75, 78, 80, 82, 84],
          backgroundColor: 'rgba(239,68,68,0.45)',
          borderColor: '#ef4444', borderWidth: 1.5, borderRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { color: '#94a3b8', font: { size: 12 } } }
      },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8', font: { size: 11 } } },
        y: {
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: { color: '#94a3b8', font: { size: 11 }, callback: v => '₹' + v + 'L' }
        }
      }
    }
  });
}

// ─── SCROLL ANIMATIONS ───
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.sop-card, .doc-info-card, .driver-card, .info-block, .dash-section-card, .ds-card, .cs-step, .wf-step').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(18px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// ─── NOTE: Charts use illustrative data — structure matches SOP exactly ───
console.log('TMC SOP Hub loaded. Prepared by SRF Capital Studio.');
