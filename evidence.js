// Only reviewed portfolio assets are listed here. Original application PDFs and
// corporate screenshots are intentionally absent from the deployment directory.
export const evidence = {
  dic2: {
    label: '이상탐지',
    eyebrow: '설명용 재구성 · 합성 예시',
    title: '이상 신호에서 확인할 조건까지.',
    description: '이상탐지 결과를 현장에서 확인할 정보로 연결하는 흐름을 재구성했습니다. 아래 화면은 실제 운영 UI나 데이터가 아니며, 기능 설명을 위한 예시입니다.',
    media: [{type:'demo',title:'01 / 이상 신호 확인 흐름',caption:'공정명·관측 패턴·상태는 모두 설명용입니다. 실제 수치, 설비 식별자, 사내 화면은 포함하지 않았습니다.'}],
    decision: '공정 데이터 분석과 이상탐지 결과를 대시보드로 연결해, 신호가 발생한 조건과 확인할 정보를 함께 볼 수 있도록 구성했습니다.',
    contribution: '공정 데이터 전처리·이상탐지 분석과 결과 시각화. 자세한 역할과 성과는 프로젝트 이야기에서 확인할 수 있습니다.',
    scope: '합성 예시는 실제 모델의 성능이나 운영 실적을 나타내지 않습니다.'
  },
  twin: {
    label: '디지털 트윈',
    eyebrow: '실제 실험 기록 · 2026.09',
    title: '카메라의 관측을 가상 공정의 상태로.',
    description: '축소 제조 모형의 탐지 화면과 Unity에서 실행한 디지털 트윈입니다. 두 영상은 각각의 실험 기록으로, 동기화된 비교 영상은 아닙니다.',
    media: [
      { type: 'video', src: 'assets/twin-detection.mp4', poster: 'assets/twin-detection.png', title: '01 / 실제 모형의 객체 탐지', caption: '실물 모형을 촬영한 화면에서 작업자·운반체·자재의 위치를 관측합니다. 원본 실험 영상 중 14초 발췌, 오디오 없음.' },
      { type: 'video', src: 'assets/twin-unity.mp4', poster: 'assets/twin-unity.png', title: '02 / Unity 디지털 트윈 실행', caption: '가상 공정의 객체 위치와 생산·운반 상태를 확인하는 실행 화면입니다. 원본 실험 영상 중 14초 발췌, 오디오 없음.' }
    ],
    decision: '산업 표준과 Unity 실시간 연동을 함께 확보하기 위해, 추적 결과를 OPC UA로 제공하고 TCP/IP로 Unity에 전달하는 구조를 사용했습니다.',
    contribution: '객체 추적, 좌표 보정, OPC UA·TCP/IP 연동과 C# 수신부, 생산 수량 집계·병목 감지 기능 구현.',
    scope: 'EPP 제조 공정 축소 모형에서 검증한 연구용 시스템입니다.'
  },
  tracking: {
    label: '다중 카메라 추적',
    eyebrow: '공개 연구 코드 · WILDTRACK',
    title: '어떤 연결을 남길지, 실험으로 비교합니다.',
    description: '위치·시간 정보로 카메라 간 객체를 연결하는 선행 연구의 실험 구성과 결과입니다. 현재 진행 중인 학위논문과는 실험 범위·평가 지표가 다릅니다.',
    media: [
      {type:'image',src:'assets/tracking-framework-aligned.png',width:3792,height:2022,title:'01 / 교차 카메라 연결 실험 구성',caption:'YOLOv8n·ByteTrack 산출물을 공통 바닥 좌표로 투영한 뒤 연결 방법을 비교합니다. 연관 단계에서는 외형 특징을 사용하지 않습니다.',alt:'WILDTRACK 7개 카메라 입력, YOLOv8n 검출, ByteTrack 추적, 바닥 평면 투영, 위치·시간 기반 연관, 카메라 쌍별 평가로 이어지는 연구 구성도'},
      {type:'image',src:'assets/tracking-results.png',width:2010,height:930,title:'02 / 카메라 쌍별 Exact-link F1',caption:'공개 저장소에 수록된 8개 카메라 쌍의 결과입니다. 무게이트 거리 방식과 원·사각·격자 게이트를 비교합니다. 실제 공장 성능이나 학위논문의 IDF1 결과를 뜻하지 않습니다.',alt:'8개 카메라 쌍에서 무게이트 거리 방식과 원형, 사각형, 격자 게이트의 Exact-link F1을 비교한 막대그래프'}
    ],
    decision: '검출·추적 산출물을 고정하고 연결 후보 제한 방식을 바꿔, 앞단 추적의 변화와 연관 단계의 영향을 구분했습니다.',
    contribution: '위치 기반 교차 카메라 연결 연구, 비교 실험과 재현 자료 정리. 저장소에 설정과 쌍별 결과를 공개했습니다.',
    scope: '공개 데이터 WILDTRACK에서의 연관 단계 실험입니다. 게이트 모양의 우열이나 동등성을 단정하지 않습니다.',
    source: 'https://github.com/yunhoseo/wildtrack-multicam-fusion'
  },
  pid: {
    label: 'PID 제어',
    eyebrow: '한국생산기술연구원 공동연구 · 2025 한국전자거래학회',
    title: 'PID 제어, 목표 정착시간에서 출발하다.',
    description: '정밀 이동 설비의 잔류 진동이 가라앉는 시간을 예측하고, 목표 시간에 가까워지는 PID 게인 조합을 찾는 연구입니다. 실제 설비 데이터로 예측 모델을 비교한 뒤, 모델을 활용해 제어값을 탐색했습니다.',
    media: [{type:'pid-results',title:'모션 데이터 → 정착시간 예측 → PID 게인 탐색',caption:'제공된 학회 원고의 표 1과 발표자료 10·13·14번째 슬라이드에 보고된 결과를 읽기 쉬운 표로 정리했습니다.'}],
    decision: '설비의 비선형 응답을 데이터로 학습하고, 예측 정착시간과 목표값의 차이를 목적함수로 삼아 Basinhopping 기반 탐색으로 Kp·Ki·Kd 조합을 도출하는 구조입니다.',
    contribution: '경기대학교·한국생산기술연구원 공동연구 참여 · 학회 논문 제2저자.',
    scope: '게인 탐색 오차는 목표값과 모델 예측값의 차이입니다. 탐색한 게인을 실제 설비에 재적용한 검증 결과나 생산성 개선 실적을 뜻하지 않습니다. 원고와 발표자료의 최종 모델 표기가 달라, 여기서는 일치하는 모델 비교 결과를 제시합니다.'
  }
};
function pidResultsMarkup() {
  const scores=[['다항회귀','5.89%','0.8631'],['Random Forest','2.38%','0.9797'],['XGBoost','2.29%','0.9859'],['MLP','3.61%','0.9567']];
  return `<div class="pid-results">
    <div class="pid-metrics"><div><strong>516<span>개</span></strong><p>발산 데이터 제외 후<br>유효 실험 데이터</p></div><div><strong>20<span>mm</span></strong><p>정밀 이동 설비의<br>단축 이동 조건</p></div><div><strong>23<span>개</span></strong><p>0.14~0.36초 구간의<br>목표 정착시간 조건</p></div></div>
    <div class="score-table-wrap" role="region" aria-label="정착시간 예측 모델 성능" tabindex="0"><table class="score-table"><caption>정착시간 예측 성능 비교</caption><thead><tr><th scope="col">모델</th><th scope="col">MAPE ↓</th><th scope="col">R² ↑</th></tr></thead><tbody>${scores.map(([model,mape,r2])=>`<tr${model==='XGBoost'?' class="best-score"':''}><th scope="row">${model}</th><td>${mape}</td><td>${r2}</td></tr>`).join('')}</tbody></table></div>
    <p class="metric-explanation">MAPE는 작을수록, R²는 클수록 예측 성능이 좋습니다. XGBoost가 비교 모델 중 가장 낮은 예측 오차를 기록했습니다.</p>
    <div class="pid-search-result"><h4>예측 모델을 활용한 PID 게인 탐색</h4><p>목표값과 예측값 사이 평균 오차는 <strong>1.8%</strong>로 보고됐습니다. 다만 목표 0.35초 조건에서는 <strong>11.5%</strong>의 오차가 나타나, 구간별 예측 한계도 확인했습니다.</p><p>이 수치는 실제 설비에 게인을 다시 적용해 측정한 오차가 아닙니다.</p></div>
  </div>`;
}
export function mediaMarkup(item, index=0) {
  const body = item.type === 'pid-results' ? pidResultsMarkup() : item.type === 'demo'
    ? `<div class="diagnostic-demo"><div class="demo-top"><span>PROCESS REVIEW</span><strong>합성 예시</strong></div><div class="demo-summary"><span>예시 공정 A</span><b>패턴 변화 확인</b></div><div class="demo-chart" role="img" aria-label="안정 구간 이후 상승하는 합성 관측 패턴"><span>관측 패턴 · 상대값</span><svg viewBox="0 0 600 140" aria-hidden="true"><path d="M0 50H600 M0 95H600" stroke="#d4dece" stroke-dasharray="6 6" fill="none"/><rect x="350" y="5" width="250" height="125" fill="#c7976430"/><path d="M0 80L40 75L80 84L120 76L160 81L200 74L240 80L280 78L320 70L360 49L400 35L440 23L480 37L520 22L560 30L600 18" fill="none" stroke="#557c60" stroke-width="4"/></svg><div><span>안정 구간</span><span>변화 구간 → 확인 필요</span></div></div><div class="demo-steps"><span>01 신호 포착</span><span>02 발생 조건 비교</span><span>03 원인 후보 확인</span></div><p>탐지 신호를 원인 확정으로 해석하지 않고, 추가 확인을 위한 정보로 제시합니다.</p></div>`
    : item.type === 'video'
    ? `<video controls playsinline preload="none" poster="${item.poster}" aria-label="${item.title}"><source src="${item.src}" type="video/mp4">이 브라우저에서는 영상을 재생할 수 없습니다. <a href="${item.src}">영상 열기</a></video>`
    : `<div class="figure-tools"><span>작은 화면에서는 그림을 좌우로 움직여 보세요.</span><a class="text-link" href="${item.src}" target="_blank" rel="noopener">원본 크게 보기 ↗</a></div><div class="figure-scroll" role="region" tabindex="0" aria-label="${item.title} 확대 그림, 좌우로 이동 가능"><a class="evidence-image-link" href="${item.src}" target="_blank" rel="noopener" aria-label="${item.title} 원본 크게 보기"><img src="${item.src}" alt="${item.alt}" width="${item.width}" height="${item.height}" style="aspect-ratio:${item.width}/${item.height}" loading="lazy" decoding="async"></a></div>`;
  return `<figure class="evidence-figure"><div class="media-title">${item.title}</div>${body}<figcaption>${item.caption}</figcaption></figure>`;
}
export function evidenceMarkup(id, compact=false) {
  const e = evidence[id]; if(!e) return '';
  return `<div class="evidence-block${compact?' compact':''}" data-evidence="${id}"><p class="section-kicker">${e.eyebrow}</p>${compact?'':`<h3>${e.title}</h3><p class="evidence-lead">${e.description}</p>`}<div class="evidence-media">${e.media.map(mediaMarkup).join('')}</div>${compact?'':`<div class="case-notes"><div><h4>왜 이 구조인가</h4><p>${e.decision}</p></div><div><h4>제가 맡은 범위</h4><p>${e.contribution}</p></div></div>`}<p class="evidence-scope">${e.scope}</p>${e.source?`<a class="text-link" href="${e.source}" target="_blank" rel="noopener">실험 코드와 원본 자료 ↗</a>`:''}</div>`;
}
