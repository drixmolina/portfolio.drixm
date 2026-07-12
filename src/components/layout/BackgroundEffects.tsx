import { useEffect, useRef } from "react";

export function BackgroundEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current, glow = glowRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touchOnly = matchMedia("(hover: none), (pointer: coarse)").matches;
    let width = innerWidth, height = innerHeight, raf = 0, visible = !document.hidden;
    const count = width < 640 ? 0 : width < 1024 ? 22 : 40;
    const points = Array.from({ length: count }, () => ({ x: Math.random() * width, y: Math.random() * height, vx: (Math.random()-.5)*.24, vy: (Math.random()-.5)*.24 }));
    const resize = () => { width = innerWidth; height = innerHeight; canvas.width = width * devicePixelRatio; canvas.height = height * devicePixelRatio; canvas.style.width = `${width}px`; canvas.style.height = `${height}px`; ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0); };
    const draw = () => {
      ctx.clearRect(0,0,width,height);
      for (let i=0;i<points.length;i++) { const p=points[i]; if (!reduce) { p.x+=p.vx; p.y+=p.vy; if(p.x<0||p.x>width)p.vx*=-1; if(p.y<0||p.y>height)p.vy*=-1; }
        ctx.fillStyle="rgba(215,35,35,.7)"; ctx.beginPath(); ctx.arc(p.x,p.y,1.2,0,Math.PI*2); ctx.fill();
        for(let j=i+1;j<points.length;j++){ const q=points[j], d=Math.hypot(p.x-q.x,p.y-q.y); if(d<135){ctx.strokeStyle=`rgba(215,35,35,${.14*(1-d/135)})`;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();}}
      }
      if (visible && !reduce) raf=requestAnimationFrame(draw);
    };
    const onVisibility = () => { visible=!document.hidden; cancelAnimationFrame(raf); if(visible&&!reduce) raf=requestAnimationFrame(draw); };
    let glowFrame=0; const onPointer=(e:PointerEvent)=>{ if(touchOnly||reduce||!glow)return; cancelAnimationFrame(glowFrame); glowFrame=requestAnimationFrame(()=>{glow.style.transform=`translate3d(${e.clientX-180}px,${e.clientY-180}px,0)`;}); };
    const interactiveSelector=".project-card, .hero-visual, .skills-grid article, .credential-card, .button.primary";
    const onInteractivePointer=(event:PointerEvent)=>{if(touchOnly||reduce)return;const target=(event.target as HTMLElement).closest<HTMLElement>(interactiveSelector);if(!target)return;const rect=target.getBoundingClientRect(),x=(event.clientX-rect.left)/rect.width-.5,y=(event.clientY-rect.top)/rect.height-.5;if(target.matches(".project-card, .hero-visual, .skills-grid article, .credential-card"))target.style.transform=`perspective(900px) rotateX(${-y*3}deg) rotateY(${x*3}deg) translateY(-3px)`;else target.style.transform=`translate3d(${x*5}px,${y*5}px,0)`;};
    const onInteractiveLeave=(event:PointerEvent)=>{const target=(event.target as HTMLElement).closest<HTMLElement>(interactiveSelector);if(target)target.style.transform="";};
    resize(); draw(); addEventListener("resize",resize); document.addEventListener("visibilitychange",onVisibility); addEventListener("pointermove",onPointer,{passive:true});document.addEventListener("pointermove",onInteractivePointer,{passive:true});document.addEventListener("pointerout",onInteractiveLeave,{passive:true});
    return()=>{cancelAnimationFrame(raf);cancelAnimationFrame(glowFrame);removeEventListener("resize",resize);document.removeEventListener("visibilitychange",onVisibility);removeEventListener("pointermove",onPointer);document.removeEventListener("pointermove",onInteractivePointer);document.removeEventListener("pointerout",onInteractiveLeave);};
  },[]);
  return <><canvas ref={canvasRef} className="neural-canvas" aria-hidden="true"/><div ref={glowRef} className="cursor-glow" aria-hidden="true"/></>;
}
