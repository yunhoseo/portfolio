import {projects} from './data.js?v=20261026-framework';
import {evidence,evidenceMarkup} from './evidence.js?v=20261026-framework';
import {initTour} from './tour.js?v=20261026-framework';
import {initDetails} from './detail.js?v=20261026-framework';
const $=s=>document.querySelector(s);
document.querySelectorAll('[data-project-count]').forEach(el=>{el.textContent=String(projects.length)});
// Native details keeps the mobile menu usable even before JavaScript loads.
const mobileMenu=$('.mobile-menu');
if(mobileMenu){
  document.addEventListener('click',event=>{
    if(!mobileMenu.open)return;
    if(!mobileMenu.contains(event.target)||event.target.closest('a'))mobileMenu.open=false;
  });
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&mobileMenu.open){
      mobileMenu.open=false;
      mobileMenu.querySelector('summary').focus();
    }
  });
  matchMedia('(min-width: 901px)').addEventListener('change',()=>{mobileMenu.open=false});
}
const cases=Object.entries(evidence);
$('#evidence-content').innerHTML=`<nav class="evidence-nav" aria-label="결과물 바로가기">${cases.map(([id,item],i)=>`<a href="#case-${id}"><span>${String(i+1).padStart(2,'0')}</span>${item.label}</a>`).join('')}</nav>`+cases.map(([id])=>`<article class="case-study" id="case-${id}">${evidenceMarkup(id)}<button class="case-detail text-link" data-project="${id}">프로젝트 전체 이야기 ↗</button></article>`).join('');
const tour=initTour(projects);initDetails(projects,tour.stop);
function renderProjects(filter='전체') {
  const list=projects.filter(p=>filter==='전체'||p.category===filter);
  $('#projects').innerHTML=list.map(p=>`<button class="project-row" data-project="${p.id}"><span class="project-n">${p.n}</span><div><small>${p.category} / ${p.year}</small><h3>${p.title}</h3><p>${p.subtitle}</p></div><span class="project-result">${p.result}</span><span class="project-arrow" aria-hidden="true">↗</span></button>`).join('');
  $('#filter-status').textContent=`${filter} 프로젝트 ${list.length}개`;
}
$('.filters').addEventListener('click',e=>{const b=e.target.closest('[data-filter]');if(!b)return;document.querySelectorAll('[data-filter]').forEach(x=>x.setAttribute('aria-pressed',x===b));renderProjects(b.dataset.filter)});
$('#copy-email').onclick=async()=>{try{await navigator.clipboard.writeText('yunho.seo@kyonggi.ac.kr');$('#copy-status').textContent='이메일 주소를 복사했습니다.'}catch{$('#copy-status').textContent='yunho.seo@kyonggi.ac.kr 주소를 선택해 복사해 주세요.'}};
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let paused=reduced.matches;
function setMotion(){ $('#motion').textContent=paused?'▷ 움직임 재생':'Ⅱ 움직임 멈추기';$('#motion').setAttribute('aria-pressed',String(paused));window.dispatchEvent(new CustomEvent('island-pause',{detail:paused}))}
$('#motion').onclick=()=>{paused=!paused;setMotion()};reduced.addEventListener('change',e=>{paused=e.matches;setMotion()});
// Avoid simultaneous video playback, including videos opened in a detail dialog.
document.addEventListener('play',e=>{if(e.target.tagName==='VIDEO')document.querySelectorAll('video').forEach(v=>{if(v!==e.target)v.pause()})},true);
renderProjects();setMotion();
import('./scene.js?v=20261026-framework').then(m=>m.initIsland(paused,tour.getActive())).catch(()=>{$('#motion').hidden=true;$('.map-labels').classList.add('fallback-labels');$('#island-caption').textContent='장소 버튼으로 프로젝트를 둘러보세요';});
