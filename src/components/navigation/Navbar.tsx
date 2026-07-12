import { useEffect, useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { navigation } from "../../data/portfolioData";
import { ThemeToggle, type Theme } from "./ThemeToggle";

interface NavbarProps { onCommand: () => void; theme: Theme; onThemeToggle: () => void }
export function Navbar({ onCommand, theme, onThemeToggle }: NavbarProps) {
  const [open,setOpen]=useState(false), [active,setActive]=useState("hero"), [visible,setVisible]=useState(true), [scrolled,setScrolled]=useState(false);
  useEffect(()=>{ let last=scrollY; const onScroll=()=>{const now=scrollY;setVisible(now<80||now<last);setScrolled(now>24);last=now;}; addEventListener("scroll",onScroll,{passive:true});
    const observer=new IntersectionObserver(entries=>entries.forEach(e=>e.isIntersecting&&setActive(e.target.id)),{rootMargin:"-25% 0px -65%"}); navigation.forEach(n=>{const el=document.getElementById(n.id);if(el)observer.observe(el)}); return()=>{removeEventListener("scroll",onScroll);observer.disconnect()};},[]);
  const go=()=>setOpen(false);
  return <header className={`navbar ${visible?"nav-visible":"nav-hidden"} ${scrolled?"is-scrolled":""}`}><nav aria-label="Main navigation" className="nav-inner">
    <a href="#hero" className="brand" aria-label="Drix Molina portfolio home">DM<span>.</span></a>
    <div className="desktop-nav">{navigation.map(n=><a key={n.id} href={`#${n.id}`} aria-current={active===n.id?"page":undefined}>{n.label}</a>)}</div>
    <div className="nav-actions"><ThemeToggle theme={theme} onToggle={onThemeToggle}/><button type="button" className="icon-button" onClick={onCommand} aria-label="Open command palette"><Search/></button><button type="button" className="icon-button menu-button" onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open?"Close navigation menu":"Open navigation menu"}>{open?<X/>:<Menu/>}</button></div>
    {open&&<div id="mobile-navigation" className="mobile-nav glass">{navigation.map(n=><a key={n.id} href={`#${n.id}`} onClick={go} aria-current={active===n.id?"page":undefined}>{n.label}</a>)}</div>}
  </nav></header>;
}
