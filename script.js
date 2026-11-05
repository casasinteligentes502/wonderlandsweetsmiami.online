/* Wonderland Sweets: accessible interactions, lightweight motion and WhatsApp quotes. */
(()=>{'use strict';
 const root=document.documentElement,body=document.body,lang=body.dataset.lang||'en';
 const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>Array.from(c.querySelectorAll(s));
 const messages={
  en:{photos:'moments',name:'Please enter your name.',occasion:'Please choose a type of celebration.',copied:'Link copied to clipboard',share:'Wonderland Sweets | Event Planning in Miami',whatsapp:'Hi Wonderland Sweets! I would love to request an event quote.',nameField:'Name',phone:'Phone',event:'Event',date:'Preferred date',guests:'Guests',location:'Event location',services:'Services of interest',notes:'Additional details',undecided:'To be confirmed',optional:'Not provided'},
  es:{photos:'momentos',name:'Escribe tu nombre, por favor.',occasion:'Selecciona un tipo de celebración.',copied:'Enlace copiado',share:'Wonderland Sweets | Eventos en Miami',whatsapp:'¡Hola Wonderland Sweets! Me gustaría solicitar una cotización para un evento.',nameField:'Nombre',phone:'Teléfono',event:'Evento',date:'Fecha preferida',guests:'Invitados',location:'Lugar del evento',services:'Servicios de interés',notes:'Detalles adicionales',undecided:'Por confirmar',optional:'No indicado'}
 }[lang];
 // Light/dark switch, persisted across English/Spanish pages.
 const themeBtn=$('[data-theme-toggle]');
 function setTheme(theme){root.dataset.theme=theme;themeBtn?.setAttribute('aria-pressed',String(theme==='dark'));try{localStorage.setItem('wonderland-theme',theme)}catch(_){}}
 setTheme(root.dataset.theme==='dark'?'dark':'light');
 themeBtn?.addEventListener('click',()=>setTheme(root.dataset.theme==='dark'?'light':'dark'));
 const menu=$('.mobile-menu'),nav=$('.primary-nav'),header=$('.site-header');
 function menuState(open){menu?.setAttribute('aria-expanded',String(open));nav?.classList.toggle('open',open);body.classList.toggle('menu-open',open)}
 menu?.addEventListener('click',()=>menuState(menu.getAttribute('aria-expanded')!=='true'));
 $$('.primary-nav a').forEach(a=>a.addEventListener('click',()=>menuState(false)));
 document.addEventListener('click',e=>{if(nav?.classList.contains('open')&&!e.target.closest('.nav-shell'))menuState(false)});
 window.addEventListener('resize',()=>{if(window.innerWidth>930)menuState(false)});
 window.addEventListener('scroll',()=>header?.classList.toggle('scrolled',window.scrollY>18),{passive:true});
 // IntersectionObserver stagger/reveal, but do not hide content if unsupported.
 const animated=$$('[data-reveal]');
 if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches){animated.forEach(el=>el.classList.add('revealed'))}
 else{const obs=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('revealed');obs.unobserve(entry.target)}})},{threshold:.05,rootMargin:'0px 0px 50px 0px'});animated.forEach(el=>obs.observe(el))}
 const sectionLinks=$$('.primary-nav>a[href^="#"]');
 if('IntersectionObserver' in window){const navObs=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)sectionLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+entry.target.id))})},{rootMargin:'-18% 0px -65% 0px'});$$('main section[id]').forEach(s=>navObs.observe(s))}
 // Gallery category filter, visible card count and accessible lightbox.
 const cards=$$('.portfolio-card'),filters=$$('.filter-pill'),count=$('#gallery-count');
 function updateCount(){const n=cards.filter(c=>!c.hidden).length;if(count)count.textContent=`${n} ${messages.photos}`}
 filters.forEach(btn=>btn.addEventListener('click',()=>{const key=btn.dataset.filter;filters.forEach(b=>{let active=b===btn;b.classList.toggle('is-active',active);b.setAttribute('aria-pressed',String(active))});cards.forEach(c=>c.hidden=key!=='all'&&c.dataset.category!==key);updateCount()}));updateCount();
 const dialog=$('#photo-dialog'),dialogImg=$('img',dialog),dialogCaption=$('.dialog-caption',dialog);
 let activeIndex=0,previousFocus=null;
 function visibleCards(){return cards.filter(c=>!c.hidden)}
 function showImage(card){if(!card)return;dialogImg.src=card.dataset.full;dialogImg.alt=card.dataset.alt||'';dialogCaption.textContent=card.dataset.caption||'';activeIndex=visibleCards().indexOf(card)}
 cards.forEach(card=>card.addEventListener('click',()=>{previousFocus=card;showImage(card);if(typeof dialog.showModal==='function')dialog.showModal();else dialog.setAttribute('open','');$('.dialog-close',dialog)?.focus()}));
 function closeDialog(){if(!dialog.open)return;if(typeof dialog.close==='function')dialog.close();else dialog.removeAttribute('open');previousFocus?.focus()}
 function nextImage(step){const visible=visibleCards();if(!visible.length)return;activeIndex=(activeIndex+step+visible.length)%visible.length;showImage(visible[activeIndex])}
 $('.dialog-close',dialog)?.addEventListener('click',closeDialog);
 $('.dialog-next',dialog)?.addEventListener('click',()=>nextImage(1));$('.dialog-prev',dialog)?.addEventListener('click',()=>nextImage(-1));
 dialog?.addEventListener('click',e=>{if(e.target===dialog)closeDialog()});
 dialog?.addEventListener('close',()=>previousFocus?.focus());
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){menuState(false);if(dialog.open)closeDialog()}if(dialog.open&&e.key==='ArrowRight')nextImage(1);if(dialog.open&&e.key==='ArrowLeft')nextImage(-1)});
 // Preselect services when a visitor comes from a specific service card.
 $$('[data-select-service]').forEach(a=>a.addEventListener('click',()=>{const v=a.dataset.selectService;const chip=$$('input[name="services"]').find(el=>el.value===v);if(chip)chip.checked=true}));
 // The form never submits user data to the website: it prepares a WhatsApp message.
 const form=$('#quote-form'),status=$('#form-status');
 form?.addEventListener('submit',e=>{
   e.preventDefault();const fd=new FormData(form),name=String(fd.get('name')||'').trim(),occasion=String(fd.get('occasion')||'').trim();
   if(name.length<2){status.textContent=messages.name;status.classList.add('error');form.elements.name.focus();return}
   if(!occasion){status.textContent=messages.occasion;status.classList.add('error');form.elements.occasion.focus();return}
   status.classList.remove('error');
   const value=(key)=>String(fd.get(key)||'').trim();
   const chosen=fd.getAll('services');
   const bodyText=[messages.whatsapp,'',`${messages.nameField}: ${name}`,`${messages.phone}: ${value('phone')||messages.optional}`,`${messages.event}: ${occasion}`,`${messages.date}: ${value('date')||messages.undecided}`,`${messages.guests}: ${value('guests')||messages.undecided}`,`${messages.location}: ${value('location')||messages.undecided}`,`${messages.services}: ${chosen.length?chosen.join(', '):messages.undecided}`,`${messages.notes}: ${value('notes')||messages.optional}`].join('\n');
   const link=`https://wa.me/17863122784?text=${encodeURIComponent(bodyText)}`;
   const popup=window.open(link,'_blank','noopener,noreferrer');if(!popup){window.location.href=link}
 });
 // Native share on mobile, clipboard fallback on desktop.
 const toast=$('.toast');let toastTimeout;
 function showToast(message){if(!toast)return;toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>toast.classList.remove('show'),2400)}
 $('[data-share]')?.addEventListener('click',async()=>{try{if(navigator.share){await navigator.share({title:messages.share,url:location.href})}else if(navigator.clipboard){await navigator.clipboard.writeText(location.href);showToast(messages.copied)}else{showToast(location.href)}}catch(_){}});
 const year=$('#year');if(year)year.textContent=String(new Date().getFullYear());
})();
