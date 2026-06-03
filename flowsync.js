/* ============================================================
   FLOWSYNC — interaction engine
   ============================================================ */
(function(){
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(pointer: fine)").matches;
  var isTouch = window.matchMedia("(pointer: coarse)").matches;
  var FS = window.FS = {};

  /* ---------- native scroll ---------- */

  /* ---------- nav ---------- */
  var nav = document.querySelector(".nav");
  function onScroll(){ if(nav) nav.classList.toggle("scrolled", window.scrollY > 24); }
  onScroll(); window.addEventListener("scroll", onScroll, {passive:true});

  var burger = document.querySelector(".burger"), menu = document.querySelector(".mobile-menu");
  if(burger && menu){
    burger.addEventListener("click", function(){
      var open = menu.classList.toggle("open"); burger.classList.toggle("open", open);
      document.body.style.overflow = open ? "hidden" : "";
    });
    menu.querySelectorAll("a").forEach(function(a){ a.addEventListener("click", function(){
      menu.classList.remove("open"); burger.classList.remove("open"); document.body.style.overflow="";
    });});
  }

  /* ---------- reveal (with in-view safety sweep) ---------- */
  var revealEls = document.querySelectorAll("[data-reveal],[data-stagger]");
  if(reduce){ revealEls.forEach(function(el){ el.classList.add("in"); }); }
  else {
    var revealNow = function(el){
      if(el.classList.contains("in")) return;
      var delay = parseInt(el.getAttribute("data-delay")||"0",10);
      if(el.hasAttribute("data-stagger")){
        var step = parseInt(el.getAttribute("data-stagger")||"80",10)||80;
        Array.prototype.forEach.call(el.children,function(c,i){ c.style.transitionDelay=(i*step)+"ms"; });
      }
      setTimeout(function(){ el.classList.add("in"); }, delay);
    };
    var rio = new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ revealNow(e.target); rio.unobserve(e.target); } });
    },{threshold:0.16, rootMargin:"0px 0px -8% 0px"});
    revealEls.forEach(function(el){ rio.observe(el); });
    var sweep = function(){ revealEls.forEach(function(el){
      if(el.classList.contains("in")) return;
      var r = el.getBoundingClientRect();
      if(r.top < innerHeight*0.92 && r.bottom > 0){ rio.unobserve(el); revealNow(el); }
    });};
    requestAnimationFrame(sweep); setTimeout(sweep,250); window.addEventListener("load",sweep);
  }

  /* ---------- counters ---------- */
  function countUp(el){
    var raw = el.getAttribute("data-count"), end = parseFloat(raw);
    var dec = raw.indexOf(".")>-1 ? raw.split(".")[1].length : 0;
    var suf = el.getAttribute("data-suffix")||"", pre = el.getAttribute("data-prefix")||"", dur=1700, s=null;
    if(reduce){ el.textContent = pre+end.toFixed(dec)+suf; return; }
    function t(n){ if(!s)s=n; var p=Math.min((n-s)/dur,1); var e=1-Math.pow(1-p,3);
      el.textContent = pre+(end*e).toFixed(dec)+suf; if(p<1) requestAnimationFrame(t); }
    requestAnimationFrame(t);
  }
  var counters = document.querySelectorAll("[data-count]");
  if(counters.length){
    var cio = new IntersectionObserver(function(es){ es.forEach(function(e){
      if(e.isIntersecting){ countUp(e.target); cio.unobserve(e.target); } }); },{threshold:0.6});
    counters.forEach(function(el){ cio.observe(el); });
  }

  /* ---------- value fills (bars/gauges) ---------- */
  var fills = document.querySelectorAll("[data-fill]");
  if(fills.length){
    var fio = new IntersectionObserver(function(es){ es.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add("filled"); fio.unobserve(e.target); } }); },{threshold:0.35});
    fills.forEach(function(el){ fio.observe(el); });
  }

  /* ---------- SVG path draw on scroll ---------- */
  var paths = document.querySelectorAll("[data-draw]");
  paths.forEach(function(p){
    try{ var len = p.getTotalLength(); p.style.strokeDasharray = len; p.style.strokeDashoffset = reduce?0:len;
      p.style.transition = "stroke-dashoffset 1.6s var(--ease)"; }catch(e){}
  });
  if(paths.length && !reduce){
    var pio = new IntersectionObserver(function(es){ es.forEach(function(e){
      if(e.isIntersecting){ e.target.style.strokeDashoffset = 0; pio.unobserve(e.target); } }); },{threshold:0.3});
    paths.forEach(function(p){ pio.observe(p); });
  }

  /* ---------- magnetic ---------- */
  if(fine && !reduce){
    document.querySelectorAll("[data-magnetic]").forEach(function(b){
      b.addEventListener("mousemove", function(e){
        var r=b.getBoundingClientRect();
        b.style.transform="translate("+((e.clientX-r.left-r.width/2)*0.3)+"px,"+((e.clientY-r.top-r.height/2)*0.4)+"px)";
      });
      b.addEventListener("mouseleave", function(){ b.style.transform=""; });
    });
  }

  /* ---------- 3D tilt ---------- */
  if(fine && !reduce){
    document.querySelectorAll("[data-tilt]").forEach(function(card){
      var inner = card.querySelector(".tilt-inner") || card;
      var max = parseFloat(card.getAttribute("data-tilt"))||8;
      card.addEventListener("mousemove", function(e){
        var r=card.getBoundingClientRect();
        var px=(e.clientX-r.left)/r.width-0.5, py=(e.clientY-r.top)/r.height-0.5;
        inner.style.transform="perspective(800px) rotateX("+(-py*max)+"deg) rotateY("+(px*max)+"deg) translateZ(0)";
      });
      card.addEventListener("mouseleave", function(){ inner.style.transform="perspective(800px) rotateX(0) rotateY(0)"; });
    });
  }

  /* ---------- pointer parallax ---------- */
  if(fine && !reduce){
    var pe = document.querySelectorAll("[data-parallax]");
    if(pe.length){ window.addEventListener("mousemove", function(e){
      var nx=e.clientX/innerWidth-0.5, ny=e.clientY/innerHeight-0.5;
      pe.forEach(function(el){ var d=parseFloat(el.getAttribute("data-parallax"))||20;
        el.style.transform="translate("+(nx*d)+"px,"+(ny*d)+"px)"; });
    }); }
  }

  /* ---------- scroll parallax (translateY) ---------- */
  if(!reduce){
    var sy = document.querySelectorAll("[data-scroll-y]");
    if(sy.length){ var tick=false;
      function paint(){ var vh=innerHeight;
        sy.forEach(function(el){ var r=el.getBoundingClientRect(); var amt=parseFloat(el.getAttribute("data-scroll-y"))||0.1;
          var c=r.top+r.height/2-vh/2; el.style.transform="translateY("+(c*-amt)+"px)"; }); tick=false; }
      window.addEventListener("scroll",function(){ if(!tick){tick=true;requestAnimationFrame(paint);} },{passive:true}); paint();
    }
  }

  /* ---------- custom cursor ---------- */
  if(fine && !reduce){
    var dot=document.createElement("div"), ring=document.createElement("div");
    dot.className="cursor-dot"; ring.className="cursor-ring";
    document.body.appendChild(dot); document.body.appendChild(ring); document.body.classList.add("has-cursor");
    var mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
    window.addEventListener("mousemove",function(e){ mx=e.clientX;my=e.clientY; dot.style.transform="translate("+mx+"px,"+my+"px) translate(-50%,-50%)"; });
    (function loop(){ rx+=(mx-rx)*0.18; ry+=(my-ry)*0.18; ring.style.transform="translate("+rx+"px,"+ry+"px) translate(-50%,-50%)"; requestAnimationFrame(loop); })();
    document.querySelectorAll("a,button,[data-magnetic],[data-tilt],.app-tile,.cmp-handle").forEach(function(el){
      el.addEventListener("mouseenter",function(){ring.classList.add("hot");});
      el.addEventListener("mouseleave",function(){ring.classList.remove("hot");});
    });
  }

  /* ---------- draggable cards ---------- */
  document.querySelectorAll("[data-drag]").forEach(function(el){
    var sx,sy2,ox=0,oy=0,drag=false;
    el.style.touchAction="none";
    el.addEventListener("pointerdown",function(e){
      if(e.target.closest("a,button")) return;
      drag=true; el.setPointerCapture(e.pointerId); el.style.transition="none"; el.style.zIndex=50;
      el.classList.add("dragging"); sx=e.clientX; sy2=e.clientY;
    });
    el.addEventListener("pointermove",function(e){ if(!drag)return;
      el.style.transform="translate("+(ox+e.clientX-sx)+"px,"+(oy+e.clientY-sy2)+"px) scale(1.03)"; });
    function end(){ if(!drag)return; drag=false; el.classList.remove("dragging");
      var m=/translate\(([-\d.]+)px,\s*([-\d.]+)px\)/.exec(el.style.transform);
      if(m){ ox=parseFloat(m[1]); oy=parseFloat(m[2]); }
      el.style.transition="transform .5s var(--ease)"; el.style.transform="translate("+ox+"px,"+oy+"px)"; }
    el.addEventListener("pointerup",end); el.addEventListener("pointercancel",end);
  });

  /* ---------- before/after comparison slider ---------- */
  document.querySelectorAll("[data-compare]").forEach(function(c){
    var top=c.querySelector(".cmp-top"), handle=c.querySelector(".cmp-handle"); var v=50,drag=false;
    function set(p){ v=Math.max(0,Math.min(100,p)); top.style.clipPath="inset(0 "+(100-v)+"% 0 0)"; handle.style.left=v+"%"; }
    set(50);
    function fromEv(e){ var r=c.getBoundingClientRect(); var x=(e.touches?e.touches[0].clientX:e.clientX)-r.left; set(x/r.width*100); }
    c.addEventListener("pointerdown",function(e){ drag=true; fromEv(e); });
    window.addEventListener("pointermove",function(e){ if(drag) fromEv(e); });
    window.addEventListener("pointerup",function(){ drag=false; });
  });

  /* ---------- node-network orb (canvas) ---------- */
  var orb = document.getElementById("orb");
  if(orb && !reduce){
    var ctx=orb.getContext("2d"), W,H,DPR=Math.min(devicePixelRatio||1,2), nodes=[], pulses=[];
    function size(){ var r=orb.getBoundingClientRect(); W=r.width;H=r.height; orb.width=W*DPR;orb.height=H*DPR; ctx.setTransform(DPR,0,0,DPR,0,0); }
    size(); window.addEventListener("resize",size);
    var N=isTouch?16:30, cx=function(){return W/2;}, cy=function(){return H/2;};
    for(var i=0;i<N;i++){ var a=Math.random()*Math.PI*2, rad=(0.18+Math.random()*0.32)*Math.min(W,H);
      nodes.push({a:a,rad:rad,sp:(Math.random()*0.4+0.1)*(Math.random()<.5?-1:1)*0.003,z:Math.random(),r:Math.random()*1.8+1.2}); }
    function loop(){
      ctx.clearRect(0,0,W,H);
      var pts=nodes.map(function(n){ n.a+=n.sp; var wob=Math.sin(n.a*2+n.z*6)*8;
        return {x:cx()+Math.cos(n.a)*(n.rad+wob), y:cy()+Math.sin(n.a)*(n.rad*0.82+wob), r:n.r, z:n.z}; });
      // edges
      for(var i=0;i<pts.length;i++){ for(var j=i+1;j<pts.length;j++){
        var dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y, d=Math.hypot(dx,dy);
        if(d<120){ ctx.strokeStyle="rgba(10,108,255,"+(0.16*(1-d/120))+")"; ctx.lineWidth=1; ctx.beginPath();
          ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y); ctx.stroke(); } } }
      // nodes
      pts.forEach(function(p){ var g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*3);
        g.addColorStop(0,"rgba(34,211,238,.9)"); g.addColorStop(1,"rgba(10,108,255,0)");
        ctx.fillStyle=g; ctx.beginPath(); ctx.arc(p.x,p.y,p.r*3,0,7); ctx.fill();
        ctx.fillStyle="rgba(255,255,255,.95)"; ctx.beginPath(); ctx.arc(p.x,p.y,p.r*0.7,0,7); ctx.fill(); });
      // travelling pulses
      if(Math.random()<0.04 && pulses.length<6 && pts.length>1){ var a=Math.floor(Math.random()*pts.length),b=Math.floor(Math.random()*pts.length);
        if(a!==b) pulses.push({a:a,b:b,t:0}); }
      pulses.forEach(function(pu){ pu.t+=0.02; var A=pts[pu.a],B=pts[pu.b]; if(!A||!B)return;
        var x=A.x+(B.x-A.x)*pu.t, y=A.y+(B.y-A.y)*pu.t;
        ctx.fillStyle="rgba(34,211,238,.95)"; ctx.beginPath(); ctx.arc(x,y,2.4,0,7); ctx.fill(); });
      pulses=pulses.filter(function(p){return p.t<1;});
      requestAnimationFrame(loop);
    }
    loop();
  }
})();
