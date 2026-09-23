(()=>{"use strict";
const data=window.CYBER_TREE,viewport=document.getElementById("treeViewport"),svg=d3.select("#treeSvg"),panel=document.getElementById("detailPanel"),panelTitle=document.getElementById("panelTitle"),panelType=document.getElementById("panelType"),panelBody=document.getElementById("panelBody"),status=document.getElementById("treeStatus");
let root,zoom,searchTerm="",lastFocused=null;
function esc(v){return String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
function safeUrl(url){try{const u=new URL(url,location.href);return["https:","http:"].includes(u.protocol)?u.href:"#"}catch{return"#"}}
function panelFor(d){lastFocused=document.activeElement;
if(d.data.id==="terminal"&&window.CyberLabTerminal){window.CyberLabTerminal.open();return}
if(d.data.id==="quizzes"&&window.CyberGame){window.CyberGame.open();return}if(d.data.id==="arcade"&&window.CyberArcade){window.CyberArcade.open();return}
panelTitle.textContent=d.data.name;panelType.textContent=(d.data.type==="branch"||d.data.type==="root")?"SYSTEM NODE":"LEAF NODE";
let html='<div class="panel-content">';
if(d.data.description)html+=`<p>${esc(d.data.description)}</p>`;
if(d.data.content)d.data.content.forEach(x=>html+=`<p>${esc(x)}</p>`);
if(d.data.tags?.length)html+=`<div class="tag-list">${d.data.tags.map(x=>`<span class="tag">${esc(x)}</span>`).join("")}</div>`;
if(d.data.ethics)html+=`<div class="ethics"><strong>AUTHORIZED USE:</strong> ${esc(d.data.ethics)}</div>`;
if(d.data.links?.length)d.data.links.forEach(x=>html+=`<a class="panel-link" href="${safeUrl(x.url)}" target="_blank" rel="noopener noreferrer">${esc(x.label||x.url)} <i class="fa-solid fa-arrow-up-right-from-square"></i></a>`);
if(d.data.id==="email")html+=`<a class="panel-link" href="mailto:isaacadigunoluwole@gmail.com">Send email <i class="fa-solid fa-envelope"></i></a>`;
html+="</div>";panelBody.innerHTML=html;panel.classList.add("open");panel.setAttribute("aria-hidden","false");document.getElementById("closePanel").focus()}
function closePanel(){panel.classList.remove("open");panel.setAttribute("aria-hidden","true");if(lastFocused?.focus)lastFocused.focus()}
function matches(d){const q=searchTerm;return!q||[d.data.name,d.data.description||"",...(d.data.tags||[]),...(d.data.content||[])].join(" ").toLowerCase().includes(q)}
function revealMatches(){if(!searchTerm)return;const needed=new Set();root.descendants().filter(matches).forEach(d=>{let p=d.parent;while(p){needed.add(p.data.id);p=p.parent}});root.descendants().forEach(d=>{if(needed.has(d.data.id)&&d._children){d.children=d._children;d._children=null}})}
function collapseAll(){root.descendants().filter(d=>d.children&&d.depth>0).forEach(d=>{d._children=d.children;d.children=null});update();status.textContent="Tree collapsed."}
function expandAll(){root.descendants().forEach(d=>{if(d._children){d.children=d._children;d._children=null}});update();status.textContent="Tree expanded."}
function reset(){root=d3.hierarchy(data);searchTerm="";document.getElementById("treeSearch").value="";update();fit();status.textContent="Tree reset.";closePanel()}
function update(){if(searchTerm)revealMatches();const tree=d3.tree().nodeSize([58,205]);tree(root);const links=root.links(),nodes=root.descendants();const g=svg.select("g.scene").empty()?svg.append("g").attr("class","scene"):svg.select("g.scene");
g.selectAll("path.tree-link").data(links,d=>d.target.data.id).join(e=>e.append("path").attr("class","tree-link").attr("d",elbow),u=>u.attr("d",elbow),e=>e.remove());
const node=g.selectAll("g.tree-node").data(nodes,d=>d.data.id);const enter=node.enter().append("g").attr("class","tree-node").attr("role","treeitem").attr("tabindex",0).on("click",(e,d)=>handleNode(e,d)).on("keydown",(e,d)=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();handleNode(e,d)}});
enter.append("rect").attr("x",-78).attr("y",-19).attr("width",156).attr("height",38);enter.append("text").attr("text-anchor","middle").attr("dy","3").text(d=>d.data.name.length>23?d.data.name.slice(0,22)+"…":d.data.name);enter.append("text").attr("class","node-meta").attr("text-anchor","middle").attr("dy","29");
node.merge(enter).attr("class",d=>`tree-node ${d.data.category||"blue"} ${d.depth===0?"root":""} ${d._children?"collapsed":""} ${searchTerm?(matches(d)?"match":"dim"):""}`).attr("transform",d=>`translate(${d.y},${d.x})`).attr("aria-label",d=>`${d.data.name}. ${d.children?"Expanded":d._children?"Collapsed":"Leaf"}`).attr("aria-expanded",d=>d.children?"true":d._children?"false":undefined);
node.merge(enter).select(".node-meta").text(d=>d.children?"COLLAPSE":d._children?"EXPAND":"OPEN");node.exit().remove()}
function elbow(l){return`M${l.source.y+78},${l.source.x}H${(l.source.y+l.target.y)/2}V${l.target.x}H${l.target.y-78}`}
function handleNode(e,d){e.stopPropagation();if(d.children||d._children){if(d.children){d._children=d.children;d.children=null;status.textContent=`${d.data.name} collapsed.`}else{d.children=d._children;d._children=null;status.textContent=`${d.data.name} expanded.`}update()}else panelFor(d)}
function fit(){const scene=svg.select("g.scene");if(scene.empty())return;const box=scene.node().getBBox(),w=viewport.clientWidth,h=viewport.clientHeight;if(!box.width||!box.height)return;const scale=Math.min(w/(box.width+100),h/(box.height+100),1.05),tx=w/2-(box.x+box.width/2)*scale,ty=h/2-(box.y+box.height/2)*scale;svg.transition().duration(350).call(zoom.transform,d3.zoomIdentity.translate(tx,ty).scale(scale))}
function init(){root=d3.hierarchy(data);zoom=d3.zoom().scaleExtent([.18,2.8]).filter(e=>!e.button||e.type==="wheel").on("zoom",e=>svg.select("g.scene").attr("transform",e.transform));svg.call(zoom).on("dblclick.zoom",null);update();requestAnimationFrame(fit);
document.getElementById("fitBtn").onclick=fit;document.getElementById("homeBtn").onclick=reset;document.getElementById("expandBtn").onclick=expandAll;document.getElementById("collapseBtn").onclick=collapseAll;document.getElementById("resetBtn").onclick=reset;document.getElementById("closePanel").onclick=closePanel;panel.querySelector("[data-close-panel]").onclick=closePanel;document.getElementById("legendBtn").onclick=()=>{const l=document.getElementById("legend");l.hidden=!l.hidden};
document.getElementById("terminalBtn").onclick=()=>window.CyberLabTerminal?.open();document.getElementById("gameBtn").onclick=()=>window.CyberGame?.open();document.getElementById("arcadeBtn").onclick=()=>window.CyberArcade?.open();
const search=document.getElementById("treeSearch");search.addEventListener("input",e=>{searchTerm=e.target.value.trim().toLowerCase();update();if(searchTerm){const n=root.descendants().filter(matches).length;status.textContent=`${n} matching node${n===1?"":"s"} found.`}else status.textContent="Search cleared."});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closePanel();if(e.key==="/"&&document.activeElement!==search){e.preventDefault();search.focus()}});
window.addEventListener("resize",()=>{update();fit()})}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();