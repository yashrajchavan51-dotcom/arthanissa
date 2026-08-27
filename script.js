const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const menuPanel = document.querySelector('.menu-panel');

function setHeaderState(){
  if(!header) return;
  header.classList.toggle('is-scrolled', window.scrollY > 36);
}
setHeaderState();
window.addEventListener('scroll', setHeaderState, {passive:true});

function setMenu(open){
  if(!menuToggle || !menuPanel) return;
  menuToggle.classList.toggle('is-active', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuPanel.classList.toggle('is-open', open);
  menuPanel.setAttribute('aria-hidden', String(!open));
  document.body.classList.toggle('menu-open', open);
}

if(menuToggle && menuPanel){
  menuToggle.addEventListener('click', () => {
    setMenu(!menuPanel.classList.contains('is-open'));
  });
  menuPanel.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenu(false));
  });
  document.addEventListener('keydown', e => {
    if(e.key === 'Escape') setMenu(false);
  });
}

const revealEls = document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:.12, rootMargin:'0px 0px -45px 0px'});
  revealEls.forEach(el => observer.observe(el));
}else{
  revealEls.forEach(el => el.classList.add('is-visible'));
}

/* Projects filter */
const filters = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.editorial-project');
if(filters.length){
  filters.forEach(button => {
    button.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('is-active'));
      button.classList.add('is-active');
      const filter = button.dataset.filter;
      projects.forEach(project => {
        project.classList.toggle('is-hidden', filter !== 'all' && project.dataset.cat !== filter);
      });
    });
  });
}

/* Contact demo */
const form = document.querySelector('#contact-form');
if(form){
  form.addEventListener('submit', e => {
    e.preventDefault();
    const button = form.querySelector('button[type="submit"]');
    if(!button) return;
    const original = button.innerHTML;
    button.textContent = 'Message sent';
    button.disabled = true;
    setTimeout(() => {
      form.reset();
      button.innerHTML = original;
      button.disabled = false;
    }, 2400);
  });
}
