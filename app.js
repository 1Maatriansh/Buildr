let active="all", saved=JSON.parse(localStorage.getItem("buildrSaved")||"[]");

const catGrid=document.getElementById("catGrid");
categories.forEach((c,i)=>{
 const el=document.createElement("div"); el.className="cat"+(i===0?" wide":""); el.style.cssText=c[4];
 el.innerHTML=`<div class="emoji">${c[1]}</div><div><strong>${c[2]}</strong><br><small>${c[3]}</small></div>`;
 el.onclick=()=>selectCat(c[0],c[2]); catGrid.appendChild(el);
});
const filters=document.getElementById("filters");
categories.slice(0,6).forEach(c=>{let b=document.createElement("button");b.className="filterbtn"+(c[0]==="all"?" active":"");b.textContent=c[2];b.onclick=()=>selectCat(c[0],c[2]);filters.appendChild(b)});

function selectCat(id,name){
 active=id; document.querySelectorAll(".filterbtn").forEach(x=>x.classList.remove("active"));
 [...document.querySelectorAll(".filterbtn")].find(x=>x.textContent===name)?.classList.add("active");
 document.getElementById("feedTitle").textContent=id==="all"?"Fresh ideas.":name+".";
 render();
 document.getElementById("ideasSection").scrollIntoView({behavior:"smooth"});
}
function render(){
 const box=document.getElementById("ideas");box.innerHTML="";
 let list=ideas.filter(x=>active==="all"||x[0]===active);
 list.forEach((x,i)=>{
  const idx=ideas.indexOf(x), isSaved=saved.includes(idx);
  const el=document.createElement("article");el.className="card";
  el.innerHTML=`<div class="visual" style="--visual:${["#141b12","#171219","#12151c","#18151d"][i%4]}"><span style="font-size:50px;opacity:.55">${["✦","◉","△","⌁","◌"][i%5]}</span></div>
  <div class="card-body"><div class="tagrow"><span class="tag">${x[3]}</span><span class="tag">${x[4]}</span><span class="tag">${x[5]}</span></div>
  <h3>${x[1]}</h3><p class="hook">${x[2]}</p><div class="actions"><button class="build" onclick="build(${idx})">Build this →</button><button class="save ${isSaved?"saved":""}" onclick="toggleSave(${idx},this)">${isSaved?"✓":"♡"}</button></div></div>`;
  box.appendChild(el);
 });
 document.getElementById("empty").style.display=list.length?"none":"block";
 updateCount();
}
function toggleSave(i,btn){
 if(saved.includes(i)) saved=saved.filter(x=>x!==i); else saved.push(i);
 localStorage.setItem("buildrSaved",JSON.stringify(saved));btn.classList.toggle("saved");btn.textContent=saved.includes(i)?"✓":"♡";updateCount();toast(saved.includes(i)?"Saved to My Build List":"Removed");
}
function updateCount(){document.getElementById("count").textContent=`(${saved.length})`;document.getElementById("buildCount").textContent=`(${saved.length})`}
function build(i){toast("Nice. Now actually build it. 🚀");}
function surprise(){
 const i=Math.floor(Math.random()*ideas.length),x=ideas[i];
 active="all";document.getElementById("feedTitle").textContent="You got this.";
 render();setTimeout(()=>{document.getElementById("ideasSection").scrollIntoView({behavior:"smooth"});setTimeout(()=>document.querySelectorAll(".card")[ideas.indexOf(x)].scrollIntoView({behavior:"smooth",block:"center"}),500)},50);
}
function scrollToBuilds(){document.getElementById("builds").scrollIntoView({behavior:"smooth"});toast(saved.length?`${saved.length} build${saved.length>1?"s":""} waiting for you.`:"Your list is empty. Save something first.")}
function toast(t){let e=document.getElementById("toast");e.textContent=t;e.classList.add("show");clearTimeout(window.tt);window.tt=setTimeout(()=>e.classList.remove("show"),1800)}
document.addEventListener("mousemove",e=>{
 const x=e.clientX,y=e.clientY;document.getElementById("cursor").style.left=x+"px";document.getElementById("cursor").style.top=y+"px";
 document.getElementById("heroBg").style.setProperty("--mx",(x-innerWidth/2)/18+"px");document.getElementById("heroBg").style.setProperty("--my",(y-innerHeight/2)/18+"px");
});
render();
