/* Must Agence — Main JS */
let cP='home';
window.addEventListener('load',()=>setTimeout(()=>document.getElementById('loader').classList.add('done'),1700));

const cdd=document.getElementById('cd'),crr=document.getElementById('cr');
if(cdd&&crr&&matchMedia('(hover:hover)').matches){
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cdd.style.left=mx+'px';cdd.style.top=my+'px'});
  !function l(){rx+=(mx-rx)*.13;ry+=(my-ry)*.13;crr.style.left=rx+'px';crr.style.top=ry+'px';requestAnimationFrame(l)}();
  document.querySelectorAll('a,button,.pc,.tm,.sc2,.cc').forEach(el=>{el.addEventListener('mouseenter',()=>crr.classList.add('on'));el.addEventListener('mouseleave',()=>crr.classList.remove('on'))});
}

const nv=document.getElementById('nav');
window.addEventListener('scroll',()=>nv.classList.toggle('scrolled',scrollY>50),{passive:true});

const bu=document.getElementById('bur'),mn=document.getElementById('mnav');
bu.addEventListener('click',()=>{bu.classList.toggle('on');mn.classList.toggle('on');document.body.style.overflow=mn.classList.contains('on')?'hidden':''});
function cM(){bu.classList.remove('on');mn.classList.remove('on');document.body.style.overflow=''}

function goPage(p){
  if(p===cP)return;
  const pt=document.getElementById('pt');
  pt.className='ptr go';
  setTimeout(()=>{
    document.querySelectorAll('.pg').forEach(x=>x.classList.remove('act'));
    const t=document.getElementById('pg-'+p);
    if(t){t.classList.add('act');t.style.opacity='1'}
    cP=p;scrollTo(0,0);
    const nl=document.getElementById('nLogo'),fl=document.getElementById('fLogo');
    if(typeof LOGO_WHITE!=='undefined'&&typeof LOGO_GREEN!=='undefined'){
      if(p==='artiste'){nl.src=LOGO_WHITE;fl.src=LOGO_WHITE}
      else{nl.src=LOGO_GREEN;fl.src=LOGO_GREEN}
    }
    document.body.classList.toggle('ent-active',p==='entreprise');
    document.querySelectorAll('.pg.act .rv:not(.vis)').forEach(el=>rO.observe(el));
    document.querySelectorAll('.pg.act .sts').forEach(el=>cO.observe(el));
    pt.className='ptr ex';
    setTimeout(()=>pt.className='ptr',500);
  },500);
}

function goSec(id){
  const shared=['equipe','portfolio','contact'];
  if(shared.includes(id)&&cP!=='home'){goPage('home');setTimeout(()=>{const e=document.getElementById(id);if(e)e.scrollIntoView({behavior:'smooth',block:'start'})},1100);return}
  const e=document.getElementById(id);if(e)e.scrollIntoView({behavior:'smooth',block:'start'});
}

const rO=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vis');rO.unobserve(e.target)}})},{threshold:.08,rootMargin:'0px 0px -30px 0px'});
document.querySelectorAll('.rv').forEach(el=>rO.observe(el));

const cO=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.querySelectorAll('[data-count]').forEach(c=>{const t=+c.dataset.count,s=c.dataset.suffix||'';let cur=0;const step=t/45,timer=setInterval(()=>{cur+=step;if(cur>=t){c.textContent=t+s;clearInterval(timer)}else c.textContent=Math.floor(cur)},28)});cO.unobserve(e.target)}})},{threshold:.25});
document.querySelectorAll('.sts').forEach(el=>cO.observe(el));

function fSub(b){const o=b.textContent;b.textContent='Envoyé ✓';b.style.opacity='.7';setTimeout(()=>{b.textContent=o;b.style.opacity=''},2500)}

document.addEventListener('mousemove',e=>{document.querySelectorAll('.horb').forEach(o=>{const x=(e.clientX/innerWidth-.5)*30,y=(e.clientY/innerHeight-.5)*30;o.style.transform=`translate(${x}px,${y}px)`})});
