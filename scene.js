import * as T from './vendor/three.module.min.js?v=20261026-framework';
export function initIsland(initialPaused, initialFocus=-1){
const el=document.querySelector('#world');let paused=initialPaused,visible=true;
let frameId=null,contextLost=false,last=performance.now();
const dialog=document.querySelector('#detail');
function canRender(){return visible&&!document.hidden&&!contextLost&&!dialog?.open}
function requestFrame(){if(frameId===null&&canRender())frameId=requestAnimationFrame(frame)}
function refreshRendering(){
 if(frameId!==null){cancelAnimationFrame(frameId);frameId=null}
 requestFrame();
}
const scene=new T.Scene();const camera=new T.PerspectiveCamera(33,1,.1,100);camera.position.set(14,14,19);camera.lookAt(0,0,0);
const renderer=new T.WebGLRenderer({alpha:true,antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;renderer.setClearColor(0,0);el.append(renderer.domElement);el.classList.add('scene-ready');
scene.add(new T.HemisphereLight(0xfff8e9,0x71876a,3));const sun=new T.DirectionalLight(0xfff8e5,4);sun.position.set(-6,15,9);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-12,right:12,top:12,bottom:-12});sun.shadow.normalBias=.035;scene.add(sun);
const island=new T.Group();scene.add(island);const mats={};function mat(color){return mats[color]??=new T.MeshStandardMaterial({color,roughness:.85})}
function mesh(geo,color,x,y,z,parent=island){const m=new T.Mesh(geo,mat(color));m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m}
function box(w,h,d,color,x,y,z,parent){return mesh(new T.BoxGeometry(w,h,d),color,x,y,z,parent)}
function cyl(r1,r2,h,color,x,y,z,parent,n=48){return mesh(new T.CylinderGeometry(r1,r2,h,n),color,x,y,z,parent)}
function ball(r,color,x,y,z,parent){return mesh(new T.IcosahedronGeometry(r,1),color,x,y,z,parent)}
// An original low-poly factory campus, built from geometry rather than reference assets.
cyl(7.5,7.2,.45,0xc6d3a1,0,-.4,0);cyl(7.2,7.2,.18,0xdde3bc,0,-.09,0);
for(let i=0;i<3;i++){const ring=new T.Mesh(new T.RingGeometry(7.7+i*.36,7.74+i*.36,96),new T.MeshBasicMaterial({color:0x9fc6b3,transparent:true,opacity:.35-i*.07,side:T.DoubleSide}));ring.rotation.x=-Math.PI/2;ring.position.y=-.48;island.add(ring)}
box(11,.04,1.05,0xece7ce,0,.025,0);box(1.05,.04,11,0xece7ce,0,.028,0);for(let i=-5;i<=5;i++){box(.22,.015,.06,0xaaa98c,i,.055,0);box(.06,.015,.22,0xaaa98c,0,.056,i)}
const buildings=[];
function building(x,z,w,d,h,color,id){const g=new T.Group();g.position.set(x,0,z);island.add(g);g.userData.project=id;box(w,h,d,0xf6edce,0,h/2,0,g);box(w+.18,.2,d+.18,color,0,h+.1,0,g);for(let i=0;i<3;i++){box(.36,.5,.035,0x749f9b,-w*.32+i*w*.32,h*.6,d/2+.03,g);box(.035,.5,.36,0x749f9b,w/2+.03,h*.6,-d*.3+i*d*.3,g)}box(.45,.8,.05,0x446d5d,0,.4,d/2+.04,g);buildings.push(g);return g}
const factory=building(-2.6,-2.3,3.1,2.2,1.7,0x60856b,'dic2');for(let i=0;i<3;i++){const roof=box(.95,.09,1.6,0x456c62,-1+i,.0,0,factory);roof.position.y=1.95;roof.rotation.z=-.22}cyl(.22,.28,2.7,0xb3baa3,-1,1.35,-.6,factory);cyl(.27,.27,.15,0x70866a,-1,2.75,-.6,factory);
const twin=building(2.4,-2.3,2.1,2.1,2.2,0x7fa9a0,'twin');box(2.2,.1,2.2,0xf9f4df,0,1.1,0,twin);box(1.7,.7,.06,0x91c6b8,0,1.68,1.1,twin);box(1.5,.1,1.1,0x4f7e78,0,2.4,0,twin);
const quality=building(-2.8,2.2,2.2,1.8,1.15,0xd29966,'dic1');const roof=mesh(new T.ConeGeometry(1.7,.75,4),0xbe8458,0,1.57,0,quality);roof.rotation.y=Math.PI/4;roof.scale.z=.85;box(.45,.25,.4,0xe5c59c,1.4,.15,.65,quality);box(.4,.4,.4,0xd6ac79,1.4,.35,.2,quality);
const vision=building(2.4,2.4,1.8,1.8,1.6,0x738b73,'tracking');const dome=mesh(new T.SphereGeometry(.85,24,12,0,Math.PI*2,0,Math.PI/2),0xb6c4ad,0,1.8,0,vision);const telescope=box(.25,.25,1.2,0x496758,.2,2.3,.3,vision);telescope.rotation.x=-.5;
for(const x of [-4.9,4.9]){for(const z of [-1,1]){cyl(.045,.065,1.6,0x536c57,x,.8,z);box(.36,.13,.28,0xf7edc9,x,1.6,z)}}
function tree(x,z,scale=1){const g=new T.Group();g.position.set(x,0,z);g.scale.setScalar(scale);island.add(g);cyl(.09,.13,.7,0x9b8661,0,.35,0,g,7);ball(.55,0x688c5b,0,1,0,g);ball(.4,0x7e9b64,.2,1.35,0,g)}
for(let i=0;i<28;i++){const a=i*2.39996;const r=5.5+(i%3)*.4;const x=Math.cos(a)*r,z=Math.sin(a)*r;if(Math.abs(x)>.65&&Math.abs(z)>.65)tree(x,z,.6+(i%4)*.14)}
for(let i=0;i<5;i++){box(.6,.14,.3,0xb69665,-1.1+i*.55,.2,4.5);box(.04,.3,.04,0x53694e,-1.3+i*.55,.1,4.5)}
// Small autonomous transporter, moving through the central route.
const truck=new T.Group();island.add(truck);box(.75,.26,.4,0xc5a169,0,.25,0,truck);box(.25,.3,.4,0xf1e4bd,.4,.3,0,truck);box(.04,.14,.32,0x719b99,.54,.34,0,truck);for(const x of [-.25,.35])for(const z of [-.23,.23]){const wheel=cyl(.1,.1,.08,0x4f5d4f,x,.13,z,truck,12);wheel.rotation.x=Math.PI/2}
const workers=[];for(let i=0;i<6;i++){const g=new T.Group();island.add(g);cyl(.06,.09,.25,i%2?0xc08453:0x567d85,0,.24,0,g,8);ball(.09,0xdfbd94,0,.44,0,g);box(.13,.04,.13,0xf2d380,0,.51,0,g);g.position.set(-4+i*1.5,0,.65);workers.push(g)}
// Floating clouds and the campus sign.
const clouds=[];for(let i=0;i<3;i++){const c=new T.Group();scene.add(c);for(let j=0;j<4;j++){const m=ball(.5+(j%2)*.17,0xfffdf1,j*.45,0,0,c);m.scale.y=.48;m.castShadow=false}c.position.set(-6+i*5,4.8+i*.5,-4-i);clouds.push(c)}
const ray=new T.Raycaster(),pointer=new T.Vector2();const hitables=buildings.flatMap(g=>{const a=[];g.traverse(m=>{if(m.isMesh)a.push(m)});return a});
function hit(event){const r=renderer.domElement.getBoundingClientRect();pointer.set((event.clientX-r.left)/r.width*2-1,-(event.clientY-r.top)/r.height*2+1);ray.setFromCamera(pointer,camera);let obj=ray.intersectObjects(hitables,false)[0]?.object;while(obj&&!obj.userData.project)obj=obj.parent;return obj?.userData.project}
renderer.domElement.addEventListener('pointermove',e=>{renderer.domElement.style.cursor=hit(e)?'pointer':'default'});renderer.domElement.addEventListener('click',e=>{const id=hit(e);if(id)window.dispatchEvent(new CustomEvent('island-navigate',{detail:['dic2','twin','dic1','tracking'].indexOf(id)}))});
// The camera travels to the selected building while the scene remains sticky.
const focusPositions=[new T.Vector3(-2.6,.8,-2.3),new T.Vector3(2.4,1,-2.3),new T.Vector3(-2.8,.6,2.2),new T.Vector3(2.4,.9,2.4)];
const overview=new T.Vector3(0,.35,0);
const viewOffsets=[new T.Vector3(8.5,9,12),new T.Vector3(10,9,11),new T.Vector3(8.5,9,12),new T.Vector3(10,9,11)];
let active=initialFocus;
const targetLook=new T.Vector3(),currentLook=new T.Vector3();
const targetCamera=new T.Vector3();
const focusRing=new T.Mesh(new T.RingGeometry(1.75,1.82,64),new T.MeshBasicMaterial({color:0x467c50,transparent:true,opacity:.7,side:T.DoubleSide,depthWrite:false}));focusRing.rotation.x=-Math.PI/2;focusRing.position.y=.075;island.add(focusRing);
function changeFocus(index){
 active=index;
 if(index<0){targetLook.copy(overview);targetCamera.set(14,14,19);focusRing.visible=false}
 else {targetLook.copy(focusPositions[index]);targetCamera.copy(focusPositions[index]).add(viewOffsets[index]);focusRing.position.set(focusPositions[index].x,.075,focusPositions[index].z);focusRing.visible=true}
 if(paused||matchMedia('(prefers-reduced-motion: reduce)').matches){camera.position.copy(targetCamera);currentLook.copy(targetLook)}
 requestFrame();
}
changeFocus(initialFocus);currentLook.copy(targetLook);
window.addEventListener('island-focus',e=>changeFocus(e.detail));
window.addEventListener('island-pause',e=>{paused=e.detail;if(paused){camera.position.copy(targetCamera);currentLook.copy(targetLook)}requestFrame()});
new IntersectionObserver(([e])=>{visible=e.isIntersecting;refreshRendering()}).observe(el);
document.addEventListener('visibilitychange',refreshRendering);
if(dialog)new MutationObserver(refreshRendering).observe(dialog,{attributes:true,attributeFilter:['open']});
const labels=[...document.querySelectorAll('.map-label')];
const projected=new T.Vector3();
function positionLabels(){
 const r=renderer.domElement.getBoundingClientRect(),wrap=el.parentElement.getBoundingClientRect();
 for(let i=0;i<labels.length;i++){
  if(active>=0&&active!==i)continue;
  const g=buildings[i];projected.copy(g.position);projected.y=[3.2,2.9,2.4,3.1][i];projected.project(camera);
  const x=(projected.x*.5+.5)*r.width+r.left-wrap.left;
  const y=(-projected.y*.5+.5)*r.height+r.top-wrap.top;
  const width=labels[i].offsetWidth;
  labels[i].style.left=`${Math.max(width/2+3,Math.min(wrap.width-width/2-3,x))}px`;
  labels[i].style.top=`${Math.max(55,Math.min(wrap.height-50,y))}px`;
 }
}
function resize(){const r=el.getBoundingClientRect();if(!r.width||!r.height)return;renderer.setSize(r.width,r.height);camera.aspect=r.width/r.height;camera.updateProjectionMatrix();requestFrame()}
new ResizeObserver(resize).observe(el);resize();
document.fonts?.ready.then(requestFrame);
renderer.domElement.addEventListener('webglcontextlost',event=>{
 event.preventDefault();contextLost=true;refreshRendering();
 el.classList.remove('scene-ready');document.querySelector('.map-labels').classList.add('fallback-labels');document.querySelector('#motion').hidden=true;
});
renderer.domElement.addEventListener('webglcontextrestored',()=>{
 contextLost=false;el.classList.add('scene-ready');
 document.querySelector('.map-labels').classList.remove('fallback-labels');document.querySelector('#motion').hidden=false;
 resize();
});
let time=0;
function frame(now){
 frameId=null;if(!canRender())return;
 const dt=Math.min((now-last)/1000,.05);last=now;
 if(!paused){
  time+=dt;const blend=1-Math.exp(-dt*4);
  camera.position.lerp(targetCamera,blend);currentLook.lerp(targetLook,blend);
  truck.position.set(Math.sin(time*.25)*5,.04,0);truck.rotation.y=Math.cos(time*.25)>0?0:Math.PI;
  workers.forEach((g,i)=>{g.position.z=.7+Math.sin(time*.4+i)*.07});
  clouds.forEach((c,i)=>{c.position.y=4.8+i*.5+Math.sin(time*.3+i)*.08});
 }
 camera.lookAt(currentLook);renderer.render(scene,camera);positionLabels();
 if(!paused)requestFrame();
}
requestFrame();
}
