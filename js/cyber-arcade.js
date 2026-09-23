(()=>{"use strict";
const KEY="hephzibah_arcade_scores_v2";
const esc=s=>String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[m]));
const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const bank={
" SOC TRIAGE ":[["Five failed logins from one account in 60 seconds.","Suspicious","Benign","Malicious"],["A scheduled backup writes to its normal destination.","Benign","Suspicious","Malicious"],["An unknown process encrypts hundreds of files.","Malicious","Benign","Suspicious"],["An MFA prompt appears without the user attempting to sign in.","Suspicious","Benign","Malicious"],["An approved scanner runs during a maintenance window.","Benign","Malicious","Suspicious"],["A new admin account appears outside the change window.","Suspicious","Benign","Malicious"],["Endpoint protection reports a blocked ransomware sample.","Malicious","Benign","Suspicious"],["A user opens a normal internal dashboard at the start of work.","Benign","Suspicious","Malicious"],["A login succeeds from an unusual country immediately after a login from Germany.","Suspicious","Benign","Malicious"],["A security analyst isolates a host after confirmed malware execution.","Benign","Suspicious","Malicious"]],
" PACKET SORT ":[["Port 443 with encrypted web traffic.","HTTPS","DNS","SSH"],["Resolves a hostname to an IP address.","DNS","DHCP","HTTP"],["Secure remote terminal session.","SSH","FTP","DNS"],["Transfers a web resource using the standard web protocol.","HTTP","SSH","DHCP"],["Automatically assigns IP configuration.","DHCP","DNS","HTTPS"],["Maps an IPv4 address to a local MAC address.","ARP","DNS","TLS"],["Reliable connection-oriented transport protocol.","TCP","UDP","ICMP"],["Connectionless transport commonly used for DNS queries.","UDP","TCP","SSH"],["Transfers files over an encrypted remote session.","SFTP","HTTP","ARP"],["Monitors and captures network packets for analysis.","PCAP","DNS","DHCP"]],
" INCIDENT TIMELINE ":[["Limit the spread of a confirmed incident.","Contain","Prepare","Recover"],["Restore clean systems after eradication.","Recover","Contain","Prepare"],["Prepare contacts, tools and procedures before an incident.","Prepare","Eradicate","Recover"],["Remove malicious persistence after containment.","Eradicate","Prepare","Contain"],["Review what happened and improve controls afterward.","Lessons Learned","Contain","Eradicate"],["Confirm what systems and accounts are affected.","Identify","Recover","Prepare"],["Collect evidence while preserving relevant context.","Investigate","Recover","Prepare"],["Return validated services to normal operation.","Recover","Identify","Contain"],["Document controls and contacts before an incident occurs.","Prepare","Identify","Lessons Learned"],["Confirm that the threat has been removed from affected systems.","Eradicate","Contain","Prepare"]]
};
const words=["HELLO","CYBER","CODE","NETWORK","SECURE","LINUX","PACKET","SERVER","FIREWALL","PYTHON","HASH","LOGIN","THREAT","ACCESS","DATA","PROXY","SCRIPT","TOKEN","DOMAIN","SOCKET"];
function enc(w,n){return w.split("").map(c=>String.fromCharCode((c.charCodeAt(0)-65+n)%26+65)).join("")}
function load(){try{return JSON.parse(localStorage.getItem(KEY)||"{}")}catch{return {}}}
function save(x){try{localStorage.setItem(KEY,JSON.stringify(x))}catch{}}
function open(){
 let old=document.getElementById("arcadeConsole");if(old){old.classList.add("open");return}
 const m=document.createElement("div");m.id="arcadeConsole";m.className="lab-modal open";
 m.innerHTML='<div class="lab-modal-backdrop"></div><div class="lab-modal-sheet arcade-sheet"><div class="lab-modal-head"><div><span class="lab-kicker">CYBER ARCADE / SKILL LAB</span><h2>CYBER ARCADE</h2></div><button class="lab-close" aria-label="Close">×</button></div><div id="arcadeArea"></div></div>';
 document.body.appendChild(m);const a=m.querySelector("#arcadeArea");let timer=null;
 const close=()=>{clearInterval(timer);m.classList.remove("open")};m.querySelector(".lab-close").onclick=close;m.querySelector(".lab-modal-backdrop").onclick=close;
 function menu(){
  clearInterval(timer);const scores=load();
  a.innerHTML='<div class="arcade-status"><span>LOCAL PROGRESS</span><b>Best scores stay in this browser</b></div><div class="arcade-grid">'+[
   ["01","SOC TRIAGE","Decide whether an alert is benign, suspicious or malicious.","triage"],
   ["02","PACKET SORT","Identify protocols and network concepts from clues.","packet"],
   ["03","CIPHER LAB","Decode simple Caesar ciphers and identify the shift.","cipher"],
   ["04","INCIDENT TIMELINE","Map response actions to the correct incident phase.","timeline"]
  ].map(x=>'<button class="arcade-card" data-mode="'+x[3]+'"><span>'+x[0]+'</span><b>'+x[1]+'</b><small>'+x[2]+'</small><i>BEST '+(scores[x[3]]??0)+'/10</i></button>').join("")+'</div><p class="game-foot">10 rounds per run • keyboard-friendly • progress stored locally • simulation only</p>';
  a.querySelectorAll(".arcade-card").forEach(b=>b.onclick=()=>play(b.dataset.mode));
 }
 function makeRound(mode,round){
  if(mode==="cipher"){const word=words[Math.floor(Math.random()*words.length)],shift=1+Math.floor(Math.random()*12),cipher=enc(word,shift),opts=shuffle([shift,1+Math.floor(Math.random()*12),13+Math.floor(Math.random()*5)]).map(String);return {q:'Decode "'+cipher+'" from "'+word+'" to identify the Caesar shift.',answer:String(shift),opts:opts,extra:"CAESAR / ROTATION"}}
  const key=mode==="triage"?" SOC TRIAGE ":mode==="packet"?" PACKET SORT ":" INCIDENT TIMELINE ";
  const item=bank[key][round%bank[key].length],opts=shuffle(item.slice(1));return {q:item[0],answer:item[1],opts:opts,extra:key.trim()};
 }
 function play(mode){
  let round=0,score=0,streak=0,best=0;
  const label={triage:"SOC TRIAGE",packet:"PACKET SORT",cipher:"CIPHER LAB",timeline:"INCIDENT TIMELINE"}[mode];
  function render(){
   clearInterval(timer);if(round>=10){const scores=load();best=Math.max(best,score,scores[mode]||0);scores[mode]=best;save(scores);a.innerHTML='<div class="game-result"><div class="game-kicker">RUN COMPLETE</div><h3>'+score+' / 10</h3><p>Best local score: '+best+' / 10</p><button id="retry">PLAY AGAIN</button><button id="menu">ARCADE MENU</button></div>';a.querySelector("#retry").onclick=()=>{round=0;score=0;streak=0;render()};a.querySelector("#menu").onclick=menu;return}
   const r=makeRound(mode,round),limit=15;let left=limit,locked=false;
   a.innerHTML='<div class="game-meta"><span>'+label+' / ROUND '+(round+1)+' / 10</span><span>SCORE '+score+' • STREAK '+streak+'</span></div><div class="arcade-timer"><span>TIME</span><b id="time">'+left+'s</b><i><em id="bar"></em></i></div><div class="game-kicker">'+r.extra+'</div><h3>'+esc(r.q)+'</h3><div class="game-options">'+r.opts.map((x,i)=>'<button data-i="'+i+'">'+String.fromCharCode(65+i)+'. '+esc(x)+'</button>').join("")+'</div><button class="arcade-back" id="back">ARCADE MENU</button>';
   const finish=(ok,index)=>{if(locked)return;locked=true;clearInterval(timer);if(ok){score++;streak++;a.querySelectorAll(".game-options button")[index].classList.add("correct")}else{streak=0;a.querySelectorAll(".game-options button")[index]?.classList.add("wrong");[...a.querySelectorAll(".game-options button")].find(x=>x.textContent.slice(3)===r.answer)?.classList.add("correct")}a.querySelectorAll(".game-options button").forEach(x=>x.disabled=true);setTimeout(()=>{round++;render()},350)};
   a.querySelectorAll(".game-options button").forEach(b=>b.onclick=()=>finish(b.textContent.slice(3)===r.answer,+b.dataset.i));
   a.querySelector("#back").onclick=menu;
   timer=setInterval(()=>{left--;const t=a.querySelector("#time"),bar=a.querySelector("#bar");if(t)t.textContent=left+"s";if(bar)bar.style.width=(left/limit*100)+"%";if(left<=0)finish(false,-1)},1000);
  }
  render();
 }
 menu();
}
window.CyberArcade={open};
})();