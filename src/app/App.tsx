import { useCallback, useEffect, useState } from "react";
import { BackgroundEffects } from "../components/layout/BackgroundEffects";
import { CommandPalette } from "../components/navigation/CommandPalette";
import { Navbar } from "../components/navigation/Navbar";
import type { Theme } from "../components/navigation/ThemeToggle";
import { AboutSection, CapstoneSection, ContactSection, CredentialsSection, ExperienceSection, Footer, HeroSection, ProjectsSection, ResumeSection, SkillsSection } from "../components/sections/PortfolioSections";
import { FeedbackSection } from "../components/sections/FeedbackSection";

function Loader({ onDone }:{onDone:()=>void}){useEffect(()=>{const id=setTimeout(onDone,600);return()=>clearTimeout(id)},[onDone]);return <div className="loader" role="status"><span>DM<span>.</span></span><span className="sr-only">Loading portfolio</span></div>}

export default function App(){const[loading,setLoading]=useState(()=>{if(matchMedia("(prefers-reduced-motion: reduce)").matches)return false;return sessionStorage.getItem("portfolio-loaded")!=="true"});const[command,setCommand]=useState(false);const[theme,setTheme]=useState<Theme>(()=>{const saved=localStorage.getItem("portfolio-theme");return saved==="light"||saved==="dark"?saved:(matchMedia("(prefers-color-scheme: light)").matches?"light":"dark")});
  const finish=useCallback(()=>{sessionStorage.setItem("portfolio-loaded","true");setLoading(false)},[]);
  useEffect(()=>{const key=(e:KeyboardEvent)=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();setCommand(true)}};addEventListener("keydown",key);return()=>removeEventListener("keydown",key)},[]);
  useEffect(()=>{document.documentElement.dataset.theme=theme;document.documentElement.style.colorScheme=theme;localStorage.setItem("portfolio-theme",theme);document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.setAttribute("content",theme==="light"?"#F7F2EE":"#000000")},[theme]);
  if(loading)return <Loader onDone={finish}/>;
  return <div className="app"><a href="#main-content" className="skip-link">Skip to content</a><BackgroundEffects/><div className="scroll-progress" aria-hidden="true"/><Navbar onCommand={()=>setCommand(true)} theme={theme} onThemeToggle={()=>setTheme(current=>current==="dark"?"light":"dark")}/><CommandPalette open={command} onClose={()=>setCommand(false)}/><main id="main-content"><HeroSection/><ProjectsSection/><ExperienceSection/><AboutSection/><SkillsSection/><CapstoneSection/><CredentialsSection/><ResumeSection/><FeedbackSection/><ContactSection/></main><Footer/></div>}
