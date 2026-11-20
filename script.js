/* Accessible mobile navigation */
const siteToggle=document.querySelector('.menu-toggle');
const siteNav=document.querySelector('.nav-links');
function closeSiteNav(){if(!siteNav||!siteToggle)return;siteNav.classList.remove('open');siteToggle.setAttribute('aria-expanded','false');siteToggle.setAttribute('aria-label','Open navigation')}
if(siteToggle&&siteNav){siteToggle.addEventListener('click',()=>{const open=siteNav.classList.toggle('open');siteToggle.setAttribute('aria-expanded',String(open));siteToggle.setAttribute('aria-label',open?'Close navigation':'Open navigation')});siteNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeSiteNav));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&siteNav.classList.contains('open')){closeSiteNav();siteToggle.focus()}});document.addEventListener('click',e=>{if(siteNav.classList.contains('open')&&!siteNav.contains(e.target)&&!siteToggle.contains(e.target))closeSiteNav()})}

/* Require at least one support channel while retaining native Formspree submission. */
document.querySelectorAll('.channel-fieldset').forEach(group=>{const form=group.closest('form');const boxes=[...group.querySelectorAll('input[type="checkbox"]')];const error=group.querySelector('.channel-error');if(!form||!boxes.length||!error)return;const validate=()=>{const valid=boxes.some(box=>box.checked);error.hidden=valid;group.setAttribute('aria-invalid',String(!valid));return valid};form.addEventListener('submit',event=>{if(!validate()){event.preventDefault();boxes[0].focus()}});boxes.forEach(box=>box.addEventListener('change',validate))});

/* Animate content only when visible; keep content accessible without JS */
if('IntersectionObserver' in window && window.matchMedia('(prefers-reduced-motion: no-preference)').matches){
const items=[...document.querySelectorAll('.section-heading,.audience-card,.service-card,.split>div,.step,.cta')];
const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}})},{threshold:.08,rootMargin:'0px 0px -25px 0px'});
items.forEach(el=>{el.classList.add('reveal-ready');observer.observe(el)});
}
