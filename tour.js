import {activeChapter, chapterDestination} from './tour-state.js?v=20261026-framework';
const names=['이상탐지 공장','디지털 트윈 랩','품질 검사실','비전 관측소'];
export function initTour(projects) {
  const chapters=document.querySelector('#chapters');
  const selected=projects.slice(0,4);
  const decision=[
    '공정마다 데이터와 불량 특성이 달라, 하나의 모델을 일괄 적용하기보다 지도·비지도 방식을 비교했습니다.',
    'OPC UA로 산업 표준 연결을 유지하고, TCP/IP로 Unity와 실시간 연동하는 두 단계 구조를 구현했습니다.',
    '판정 기준을 한 가지 값으로 제시하기보다, 현업이 기준을 바꾸며 오판정의 변화를 직접 확인하도록 만들었습니다.',
    '검출·추적 산출물을 고정하고 위치 기반 연결 방법을 비교해, 연관 단계의 영향을 살펴봅니다.'
  ];
  const thumbs={twin:['assets/twin-unity.png','실제 Unity 디지털 트윈 실행 화면'],tracking:['assets/tracking-results.png','공개 선행 연구의 카메라 쌍별 비교 결과']};
  chapters.innerHTML=selected.map((p,i)=>`<article class="tour-chapter" id="stop-${p.id}" data-scene="${i}" aria-labelledby="chapter-title-${i}"><p class="section-kicker">${p.n} / ${names[i]}</p><p class="chapter-subtitle">${p.subtitle}</p><h2 id="chapter-title-${i}">${p.title}</h2><p class="chapter-problem">${p.problem}</p><div class="chapter-decision"><span>제가 선택한 접근</span><p>${decision[i]}</p></div>${thumbs[p.id]?`<a class="chapter-preview" href="#case-${p.id}"><img src="${thumbs[p.id][0]}" alt="${thumbs[p.id][1]}" loading="lazy"><span>실제 결과물 보기 ↗</span></a>`:`<div class="flow" aria-label="프로젝트 작업 흐름">${p.flow.map((s,j)=>`${j?'<i aria-hidden="true">→</i>':''}<span>${s}</span>`).join('')}</div>`}<p class="chapter-outcome">${p.result}</p><button class="chapter-detail text-link" data-project="${p.id}">역할과 구현 과정 자세히 보기 ↗</button></article>`).join('');
  document.querySelector('.tour-tabs').innerHTML=selected.map((p,i)=>`<button data-go-stop="${i}" aria-pressed="false"><b>${p.n}</b><span>${names[i]}</span></button>`).join('');
  const sections=[...document.querySelectorAll('.tour-chapter')];
  const status=document.querySelector('#tour-status');
  const button=document.querySelector('#tour');
  let active=-2, timer=null, scheduled=false;
  function mobile(){return window.matchMedia('(max-width: 900px)').matches}
  function stickyStage(){const stage=document.querySelector('.island-sticky');return mobile()&&getComputedStyle(stage).position==='sticky'?stage:null}
  function readingLine(){const stage=stickyStage();return stage?Math.min(window.innerHeight-40,stage.getBoundingClientRect().bottom+50):window.innerHeight*.48}
  function publish(){
    scheduled=false;
    const current=activeChapter(sections.map(s=>s.getBoundingClientRect().top),readingLine());
    if(current===active)return;
    active=current;
    document.querySelectorAll('[data-go-stop]').forEach(b=>{const on=Number(b.dataset.goStop)===active;b.setAttribute('aria-pressed',String(on));b.classList.toggle('active',on)});
    sections.forEach((s,i)=>s.classList.toggle('is-active',active===i));
    const title=active<0?'마을 입구 · 전체 보기':`${String(active+1).padStart(2,'0')} / ${names[active]}`;
    status.textContent=title;
    document.querySelector('#place-counter').textContent=active<0?'OVERVIEW':`${String(active+1).padStart(2,'0')} / 04`;
    document.querySelector('#island-caption').textContent=active<0?'스크롤하거나 장소를 눌러 둘러보세요':names[active];
    document.querySelector('.tour-progress span').style.width=`${Math.max(0,active+1)/4*100}%`;
    document.querySelector('.world-wrap').dataset.focus=active;
    window.dispatchEvent(new CustomEvent('island-focus',{detail:active}));
  }
  function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(publish)}}
  function goTo(index) {
    if(index<0||index>=sections.length)return;
    const header=document.querySelector('.header').getBoundingClientRect().height;
    const stage=stickyStage()?.getBoundingClientRect().height||0;
    const top=sections[index].getBoundingClientRect().top+window.scrollY;
    window.scrollTo({top:chapterDestination(top,header+stage+24),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  }
  function stop(){clearInterval(timer);timer=null;button.textContent='▷ 자동으로 둘러보기';button.setAttribute('aria-pressed','false')}
  button.onclick=()=>{
    if(timer){stop();return}
    let next=active<0||active===3?0:active;
    goTo(next);button.textContent='Ⅱ 자동 투어 멈추기';button.setAttribute('aria-pressed','true');
    timer=setInterval(()=>{if(document.hidden)return;if(next===3){stop();return}goTo(++next)},9000);
  };
  document.addEventListener('click',e=>{const b=e.target.closest('[data-go-stop]');if(b){stop();goTo(Number(b.dataset.goStop))}else if(e.target.closest('a[href]'))stop()});
  window.addEventListener('island-navigate',e=>{stop();goTo(e.detail)});
  window.addEventListener('wheel',stop,{passive:true});
  // Let the toggle handle its own activation; stopping on touchstart or Space
  // first would make its subsequent click restart a tour the user meant to stop.
  window.addEventListener('touchstart',e=>{if(!e.target.closest?.('#tour'))stop()},{passive:true});
  window.addEventListener('keydown',e=>{
    const editing=e.target.closest?.('input,select,textarea,[contenteditable]:not([contenteditable="false"]),video,audio');
    const activating=e.key===' '&&e.target.closest?.('button,summary');
    if(!editing&&!activating&&['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '].includes(e.key))stop();
  });
  window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);
  document.fonts?.ready.then(schedule);publish();
  return {stop,getActive:()=>active};
}
