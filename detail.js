import {parseProjectHash} from './tour-state.js?v=20261026-framework';
import {evidence, evidenceMarkup} from './evidence.js?v=20261026-framework';
export function initDetails(projects, stopTour) {
  const dialog=document.querySelector('#detail');
  const ids=projects.map(p=>p.id);let renderedId=null,opener=null,pendingFocus=null;
  function restoreFocus(id,reveal=false){
    const target=opener?.isConnected&&opener.dataset.project===id?opener:document.querySelector(`.project-row[data-project="${id}"]`);
    // Fragment history can move focus after the native dialog restores it.
    requestAnimationFrame(()=>{if(dialog.open)return;target?.focus({preventScroll:true});if(reveal)target?.scrollIntoView({block:'center',behavior:'instant'})});
  }
  function render(id){
    const p=projects.find(p=>p.id===id);if(!p)return;
    stopTour();renderedId=id;
    const e=evidence[id];
    document.querySelector('#detail-content').innerHTML=`<p class="section-kicker">PROJECT ${p.n} / ${p.category}</p><h2 id="detail-title">${p.title}</h2><p>${p.subtitle}</p><p class="detail-meta">${p.year}<br>${p.role}</p><div class="tags">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div><div class="detail-actions"><button id="copy-project" class="outline">이 프로젝트 링크 복사</button>${p.repo?`<a class="text-link" href="${p.repo}" target="_blank" rel="noopener">GitHub 코드 ↗</a>`:''}</div><span id="project-copy-status" role="status"></span><h3>문제 · 무엇이 어려웠나요?</h3><p>${p.problem}</p><h3>역할 · 무엇을 했나요?</h3><p>${p.work}</p>${e?`<h3>선택 · 왜 이 방법인가요?</h3><p>${e.decision}</p>`:''}<h3>결과 · 무엇이 달라졌나요?</h3><p>${p.outcome}</p><p class="detail-result">↗ ${p.result}</p>${e?evidenceMarkup(id,true):''}`;
    document.querySelector('#copy-project').onclick=async()=>{
      const url=new URL(location.href);url.hash=`project/${id}`;
      try{await navigator.clipboard.writeText(url.href);document.querySelector('#project-copy-status').textContent='프로젝트 링크를 복사했습니다.'}
      catch{document.querySelector('#project-copy-status').textContent=url.href}
    };
    if(!dialog.open)dialog.showModal();dialog.scrollTop=0;
  }
  function open(id,trigger){
    if(!ids.includes(id))return;
    opener=trigger||document.activeElement;
    if(parseProjectHash(location.hash,ids)!==id)history.pushState({portfolioProject:true},'',`#project/${id}`);
    render(id);
  }
  function sync(){
    const id=parseProjectHash(location.hash,ids);
    if(id){if(id!==renderedId||!dialog.open)render(id)}
    else if(dialog.open)dialog.close();
    else if(pendingFocus){restoreFocus(pendingFocus);pendingFocus=null}
  }
  document.addEventListener('click',e=>{const b=e.target.closest('[data-project]');if(b)open(b.dataset.project,b)});
  document.querySelector('.close').onclick=()=>dialog.close();
  dialog.addEventListener('click',e=>{const r=dialog.getBoundingClientRect();if(e.target===dialog&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))dialog.close()});
  dialog.addEventListener('close',()=>{
    dialog.querySelectorAll('video').forEach(v=>v.pause());const id=renderedId;renderedId=null;
    if(parseProjectHash(location.hash,ids)){
      if(history.state?.portfolioProject){pendingFocus=id;history.back()}
      else {history.replaceState(null,'',location.pathname+location.search+'#work');restoreFocus(id,true)}
    }else restoreFocus(id);
  });
  window.addEventListener('hashchange',sync);sync();return {open};
}
