// menu mobile
const btn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
btn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  btn.setAttribute('aria-expanded', open);
  btn.textContent = open ? '✕' : '☰';
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open'); btn.textContent = '☰'; btn.setAttribute('aria-expanded', false);
}));

// retrait des évènements passés (data-fin="AAAA-MM-JJ", visible jusqu'à ce jour inclus)
const d = new Date();
const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
document.querySelectorAll('[data-fin]').forEach(el => { if (el.dataset.fin < today) el.remove(); });

// révélation au scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
}, { threshold:.14 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
