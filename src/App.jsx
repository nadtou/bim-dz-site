import React, { useState } from 'react';
import { Menu, X, ChevronRight, Download, PlayCircle, ShieldCheck, Code, Settings, Layers, Lock, Video, Cpu, Wrench, Bot, User, Key, BookOpen, LogOut, Copy, CheckCircle, DownloadCloud } from 'lucide-react';

// --- Styles CSS personnalisés pour les animations ---
const styleSheet = `
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
    100% { transform: translateY(0px); }
  }
  @keyframes float-delayed {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
  @keyframes dash {
    to { stroke-dashoffset: -20; }
  }
  @keyframes spin-slow {
    100% { transform: rotate(360deg); }
  }
  @keyframes spin-slow-reverse {
    100% { transform: rotate(-360deg); }
  }

  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-float-delayed { animation: float-delayed 5s ease-in-out infinite 2s; }
  .animate-dash { animation: dash 2s linear infinite; }
  .animate-spin-slow { animation: spin-slow 12s linear infinite; transform-origin: center; }
  .animate-spin-slow-reverse { animation: spin-slow-reverse 12s linear infinite; transform-origin: center; }

  /* Bouton style BD/Croquis */
  .sketch-btn {
    border: 2px solid #0f172a;
    box-shadow: 4px 4px 0px 0px #0f172a;
    transition: all 0.2s ease;
  }
  .sketch-btn:hover {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0px 0px #0f172a;
  }
  .sketch-btn:active {
    transform: translate(4px, 4px);
    box-shadow: 0px 0px 0px 0px #0f172a;
  }

  /* Carte style BD/Croquis */
  .sketch-card {
    border: 2px solid #0f172a;
    box-shadow: 6px 6px 0px 0px #0f172a;
    transition: all 0.3s ease;
  }
  .sketch-card:hover {
    transform: translate(-2px, -2px);
    box-shadow: 10px 10px 0px 0px #ea580c;
  }

  /* --- Effet Rayons X (Hover) --- */
  .xray-container .xray-shell {
    transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s ease;
    transform-origin: center;
  }
  .xray-container .xray-labels-arch {
    transition: opacity 0.4s ease;
  }
  .xray-container .xray-labels-mep {
    opacity: 0;
    transition: opacity 0.6s ease 0.2s;
    transform: translateY(10px);
  }
  .xray-container:hover .xray-shell {
    opacity: 0.1;
  }
  .xray-container:hover .xray-labels-arch {
    opacity: 0;
  }
  .xray-container:hover .xray-labels-mep {
    opacity: 1;
    transform: translateY(0);
  }
  .xray-container:hover .xray-core-glow {
    filter: drop-shadow(0px 0px 15px rgba(234, 88, 12, 0.6));
  }

  /* Fennec Logo */
  @keyframes fennecDraw {
    from { stroke-dasharray: 0 1000; }
    to   { stroke-dasharray: 1000 0; }
  }
  @keyframes fennecParticle {
    0%   { opacity: 0; }
    3%   { opacity: 1; }
    88%  { opacity: 1; }
    100% { opacity: 0; }
  }
  @keyframes fennecEyeIn {
    0%   { opacity: 0; transform: scale(0.3); }
    60%  { opacity: 1; transform: scale(1.35); }
    100% { opacity: 1; transform: scale(1); }
  }
  @keyframes fennecBlink {
    0%, 88%, 100% { transform: scaleY(1); }
    94%           { transform: scaleY(0.07); }
  }
  .fennec-outline {
    stroke-dasharray: 0 1000;
    filter: drop-shadow(0 0 3px #C9921A) drop-shadow(0 0 6px rgba(201,146,26,0.45));
    animation: fennecDraw 2s cubic-bezier(0.4,0,0.2,1) forwards;
  }
  .fennec-particle {
    opacity: 0;
    filter: drop-shadow(0 0 5px #FFD700) drop-shadow(0 0 10px #FFD700);
    animation: fennecParticle 2s ease-in-out forwards;
  }
  .fennec-eye-glow {
    filter: drop-shadow(0 0 4px #FFD700) drop-shadow(0 0 8px rgba(255,215,0,0.8));
  }
  .fennec-eye-group {
    opacity: 0;
    animation: fennecEyeIn 0.6s ease-out 1.9s forwards;
  }
  .fennec-eye-blink {
    animation: fennecBlink 5s ease-in-out 3s infinite;
  }
`;

// --- LOGO FENNEC ANIMÉ ---
const FENNEC_PATH = "M 78,2 L 92,32 L 95,55 C 93,72 85,86 70,94 L 50,100 L 30,94 C 15,86 7,72 5,55 L 8,32 L 22,2 C 24,16 28,28 32,38 C 38,33 44,30 50,30 C 56,30 62,33 68,38 C 72,28 76,16 78,2 Z";

const FennecLogo = ({ className = "w-9 h-11" }) => (
  <svg viewBox="0 0 100 105" className={className} aria-label="BIM-DZ Fennec Logo">
    {/* Silhouette noire */}
    <path d={FENNEC_PATH} fill="#0f172a" />

    {/* Contour doré animé droite → gauche */}
    <path
      d={FENNEC_PATH}
      fill="none"
      stroke="#C9921A"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      pathLength="1000"
      className="fennec-outline"
    />

    {/* Particule de lumière qui trace le chemin */}
    <circle r="3.5" fill="#FFD700" className="fennec-particle">
      <animateMotion dur="2s" fill="freeze" path={FENNEC_PATH} />
    </circle>

    {/* Œil gauche */}
    <g className="fennec-eye-group" style={{ transformOrigin: '33px 65px' }}>
      <g className="fennec-eye-blink" style={{ transformOrigin: '33px 65px' }}>
        <ellipse cx="33" cy="65" rx="5" ry="4" fill="#C9921A" className="fennec-eye-glow" />
        <ellipse cx="33" cy="65" rx="2.5" ry="2" fill="#0f172a" />
      </g>
    </g>

    {/* Œil droit */}
    <g className="fennec-eye-group" style={{ transformOrigin: '67px 65px' }}>
      <g className="fennec-eye-blink" style={{ transformOrigin: '67px 65px' }}>
        <ellipse cx="67" cy="65" rx="5" ry="4" fill="#C9921A" className="fennec-eye-glow" />
        <ellipse cx="67" cy="65" rx="2.5" ry="2" fill="#0f172a" />
      </g>
    </g>
  </svg>
);

// --- SVG HERO PAGE OUTILS & PLUGINS ---
const ToolsHeroSketch = () => (
  <svg viewBox="0 0 800 600" className="w-full h-full font-sans" fill="none" stroke="#0f172a" strokeLinecap="round" strokeLinejoin="round">
    {/* Fond Grille Légère */}
    <g strokeWidth="1" stroke="#94a3b8" className="opacity-30">
      <path d="M 100 0 L 100 600 M 200 0 L 200 600 M 300 0 L 300 600 M 400 0 L 400 600 M 500 0 L 500 600 M 600 0 L 600 600 M 700 0 L 700 600" />
      <path d="M 0 100 L 800 100 M 0 200 L 800 200 M 0 300 L 800 300 M 0 400 L 800 400 M 0 500 L 800 500" />
    </g>

    {/* Ordinateur (Station de travail BIM) */}
    <g className="animate-float-delayed">
      {/* Base Clavier (Isométrique) */}
      <polygon points="150,500 450,350 650,450 350,600" fill="#f8fafc" strokeWidth="4" />
      <polygon points="150,500 350,600 350,620 150,520" fill="#e2e8f0" strokeWidth="4" />
      <polygon points="350,600 650,450 650,470 350,620" fill="#cbd5e1" strokeWidth="4" />
      {/* Touches clavier stylisées */}
      <polygon points="250,490 400,415 550,490 400,565" fill="#e2e8f0" strokeWidth="2" />
      <line x1="300" y1="465" x2="450" y2="540" strokeWidth="2" />
      <line x1="350" y1="440" x2="500" y2="515" strokeWidth="2" />

      {/* Écran */}
      <polygon points="170,470 430,340 430,120 170,250" fill="white" strokeWidth="5" />
      {/* Cadre de l'écran (épaisseur) */}
      <polygon points="150,490 170,470 170,250 150,270" fill="#cbd5e1" strokeWidth="4" />
      <polygon points="150,270 170,250 430,120 410,140" fill="#e2e8f0" strokeWidth="4" />

      {/* Interface IDE (Code) sur l'écran */}
      <rect x="220" y="220" width="160" height="180" transform="skewY(-26)" fill="#0f172a" stroke="none" />
      <line x1="230" y1="210" x2="300" y2="175" stroke="#ea580c" strokeWidth="4" />
      <line x1="230" y1="230" x2="280" y2="205" stroke="#38bdf8" strokeWidth="4" />
      <line x1="230" y1="250" x2="340" y2="195" stroke="#a78bfa" strokeWidth="4" />
      <line x1="230" y1="270" x2="260" y2="255" stroke="#ea580c" strokeWidth="4" />
      <line x1="230" y1="310" x2="320" y2="265" stroke="#38bdf8" strokeWidth="4" />
      <line x1="230" y1="330" x2="290" y2="300" stroke="#a78bfa" strokeWidth="4" />
    </g>

    {/* Nœud d'Intelligence Artificielle (Flottant) */}
    <g transform="translate(480, 150)">
      <g className="animate-float">
        {/* Connexions pointillées */}
        <path d="M 0 0 L -150 100" strokeWidth="3" strokeDasharray="8 6" className="animate-dash" />
        <path d="M 0 0 L -100 250" strokeWidth="3" strokeDasharray="8 6" className="animate-dash" />

        {/* Tête de Robot / Cerveau IA */}
        <circle cx="0" cy="0" r="60" fill="white" strokeWidth="4" />
        <path d="M -40 -10 Q 0 -30 40 -10" strokeWidth="4" />
        <circle cx="-20" cy="10" r="8" fill="#ea580c" stroke="none" className="animate-pulse" />
        <circle cx="20" cy="10" r="8" fill="#ea580c" stroke="none" className="animate-pulse" />
        <line x1="-15" y1="35" x2="15" y2="35" strokeWidth="4" />

        {/* Réseau de neurones autour */}
        <circle cx="90" cy="-40" r="15" fill="white" strokeWidth="3" />
        <circle cx="80" cy="60" r="10" fill="#0f172a" stroke="none" />
        <circle cx="-50" cy="-70" r="12" fill="#ea580c" stroke="none" />

        <line x1="45" y1="-25" x2="75" y2="-35" strokeWidth="3" />
        <line x1="40" y1="35" x2="70" y2="55" strokeWidth="3" />
        <line x1="-25" y1="-45" x2="-40" y2="-60" strokeWidth="3" />

        {/* Label IA */}
        <rect x="50" y="-10" width="80" height="30" fill="#ea580c" stroke="#0f172a" strokeWidth="2" />
        <text x="60" y="12" fill="white" stroke="none" fontSize="16" fontWeight="900">AGENT IA</text>
      </g>
    </g>

    {/* Engrenages (Plugins / C#) */}
    <g transform="translate(160, 160)">
      {/* Engrenage Principal */}
      <g className="animate-spin-slow">
        <circle cx="0" cy="0" r="40" fill="white" strokeWidth="4" />
        <circle cx="0" cy="0" r="15" fill="#0f172a" stroke="none" />
        {/* Dents */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <rect key={angle} x="-8" y="-55" width="16" height="15" fill="white" strokeWidth="4" transform={`rotate(${angle})`} />
        ))}
      </g>
      {/* Engrenage Secondaire (Orange) */}
      <g transform="translate(70, -30) scale(0.6)">
        <g className="animate-spin-slow-reverse">
          <circle cx="0" cy="0" r="40" fill="#ea580c" strokeWidth="4" />
          <circle cx="0" cy="0" r="15" fill="white" stroke="none" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <rect key={angle} x="-8" y="-55" width="16" height="15" fill="#ea580c" strokeWidth="4" transform={`rotate(${angle})`} />
          ))}
        </g>
      </g>
      {/* Label Plugin */}
      <rect x="-80" y="-80" width="120" height="30" fill="white" stroke="#0f172a" strokeWidth="2" />
      <text x="-70" y="-60" fill="#0f172a" stroke="none" fontSize="16" fontWeight="900">PLUGIN API C#</text>
    </g>
  </svg>
);

const XRayBuildingSketch = () => (
  <svg viewBox="0 -120 800 920" className="w-full h-full font-sans" fill="none" stroke="#0f172a" strokeLinecap="round" strokeLinejoin="round">
    {/* --- ÉLÉMENTS D'ARRIÈRE-PLAN (Notes de croquis, cotes) --- */}
    <g strokeWidth="1" stroke="#94a3b8" className="opacity-50">
      {/* Grille isométrique de fond */}
      <path d="M 0 400 L 800 0 M 0 500 L 800 100 M 0 600 L 800 200 M 0 700 L 800 300" strokeDasharray="4 8" />
      <path d="M 800 400 L 0 0 M 800 500 L 0 100 M 800 600 L 0 200 M 800 700 L 0 300" strokeDasharray="4 8" />

      {/* Cotes de mesure à gauche */}
      <line x1="50" y1="350" x2="50" y2="650" strokeWidth="2" />
      <line x1="40" y1="350" x2="60" y2="350" strokeWidth="2" />
      <line x1="40" y1="650" x2="60" y2="650" strokeWidth="2" />
      <text x="30" y="500" transform="rotate(-90 30 500)" fill="#64748b" stroke="none" fontSize="12" fontWeight="bold">H = 14.50m</text>
    </g>

    {/* --- SOUS-COUCHE : STRUCTURE & MEP (Le "Cœur" Détaillé) --- */}
    <g className="xray-core-glow transition-all duration-700">
      {/* 1. Noyau central (Ascenseur/Escaliers) */}
      <g strokeWidth="3" stroke="#1e293b" fill="#f1f5f9">
        <polygon points="350,225 450,175 450,575 350,625" />
        <polygon points="450,175 500,200 500,600 450,575" fill="#e2e8f0" />
        <polygon points="350,225 450,175 500,200 400,250" fill="#cbd5e1" />
        {/* Lignes du noyau */}
        <line x1="375" y1="212" x2="375" y2="612" strokeWidth="1" />
        <line x1="400" y1="200" x2="400" y2="600" strokeWidth="1" />
        <line x1="425" y1="187" x2="425" y2="587" strokeWidth="1" />
      </g>

      {/* 2. Charpente Métallique (Structure arrière et interne) */}
      <g strokeWidth="3" stroke="#0f172a">
        {/* Poteaux arrières */}
        <line x1="200" y1="300" x2="200" y2="500" strokeWidth="5" />
        <line x1="600" y1="300" x2="600" y2="500" strokeWidth="5" />
        {/* Poutres maîtresses plancher 2 */}
        <line x1="200" y1="400" x2="400" y2="500" />
        <line x1="600" y1="400" x2="400" y2="500" />
        <line x1="200" y1="400" x2="400" y2="300" />
        <line x1="600" y1="400" x2="400" y2="300" />
        {/* Contreventements (X-Bracing) arrières */}
        <path d="M 200 300 L 400 400 M 200 400 L 400 300" strokeWidth="2" />
        <path d="M 600 300 L 400 400 M 600 400 L 400 300" strokeWidth="2" />
      </g>

      {/* 3. Dalles de plancher (Slabs) */}
      <g fill="rgba(15, 23, 42, 0.05)" stroke="#0f172a" strokeWidth="2">
        {/* Plancher 1 (RDC) */}
        <polygon points="100,650 400,800 700,650 400,500" />
        <polygon points="100,650 400,800 400,820 100,670" fill="rgba(15, 23, 42, 0.1)" />
        <polygon points="400,800 700,650 700,670 400,820" fill="rgba(15, 23, 42, 0.2)" />
        {/* Plancher 2 */}
        <polygon points="100,450 400,600 700,450 400,300" />
        <polygon points="100,450 400,600 400,620 100,470" fill="rgba(15, 23, 42, 0.1)" />
        <polygon points="400,600 700,450 700,470 400,620" fill="rgba(15, 23, 42, 0.2)" />
        {/* Dalle Toit */}
        <polygon points="100,250 400,400 700,250 400,100" />
        <polygon points="100,250 400,400 400,420 100,270" fill="rgba(15, 23, 42, 0.1)" />
        <polygon points="400,400 700,250 700,270 400,420" fill="rgba(15, 23, 42, 0.2)" />
      </g>

      {/* 4. SYSTÈMES MEP (HYPER DÉTAILLÉS EN ORANGE) */}
      <g stroke="#ea580c">
        {/* --- Unité de Toit (HVAC / Chiller) --- */}
        <g strokeWidth="2" fill="white">
          <polygon points="420,200 520,150 580,180 480,230" fill="#fff7ed" strokeWidth="3" />
          <polygon points="420,200 480,230 480,270 420,240" fill="#ffedd5" strokeWidth="3" />
          <polygon points="480,230 580,180 580,220 480,270" fill="#fed7aa" strokeWidth="3" />
          {/* Ventilateurs sur le toit de l'unité */}
          <ellipse cx="460" cy="190" rx="15" ry="7" transform="rotate(-26 460 190)" fill="#ea580c" />
          <ellipse cx="520" cy="160" rx="15" ry="7" transform="rotate(-26 520 160)" fill="#ea580c" />
          {/* Grilles de ventilation sur le côté */}
          <line x1="430" y1="215" x2="470" y2="235" />
          <line x1="430" y1="225" x2="470" y2="245" />
          <line x1="430" y1="235" x2="470" y2="255" />
        </g>

        {/* --- Gaine Principale (Ductwork) --- */}
        <g strokeWidth="2" fill="none">
          {/* Descente verticale */}
          <path d="M 460 260 L 460 480" strokeWidth="6" />
          <path d="M 450 255 L 450 475" strokeWidth="6" />
          {/* Ramification Plancher 2 */}
          <polygon points="450,475 460,480 350,535 340,530" fill="#fff7ed" strokeWidth="2" />
          <polygon points="340,530 350,535 350,555 340,550" fill="#fed7aa" strokeWidth="2" />
          <polygon points="450,475 340,530 340,550 450,495" fill="#ffedd5" strokeWidth="2" />
          {/* Nervures sur la gaine (Détail sketch) */}
          <line x1="430" y1="485" x2="430" y2="505" strokeWidth="1" />
          <line x1="410" y1="495" x2="410" y2="515" strokeWidth="1" />
          <line x1="390" y1="505" x2="390" y2="525" strokeWidth="1" />
          <line x1="370" y1="515" x2="370" y2="535" strokeWidth="1" />
        </g>

        {/* --- Tuyauterie & Plomberie --- */}
        <g strokeWidth="4" fill="none" strokeLinejoin="round">
          {/* Tuyaux parallèles descendant */}
          <path d="M 520 225 L 520 340 L 650 405" />
          <path d="M 540 215 L 540 330 L 670 395" />
          {/* Vannes/Valves esquissées */}
          <circle cx="520" cy="300" r="6" fill="white" strokeWidth="2" />
          <path d="M 510 295 L 530 305 M 510 305 L 530 295" strokeWidth="2" />
          <circle cx="540" cy="290" r="6" fill="white" strokeWidth="2" />
          <path d="M 530 285 L 550 295 M 530 295 L 550 285" strokeWidth="2" />
        </g>

        {/* --- Réseaux Électriques (Chemins de câbles) --- */}
        <g strokeWidth="1" fill="none">
          <path d="M 150 485 L 350 585 L 350 780" strokeWidth="3" strokeDasharray="6 3" />
          <path d="M 160 490 L 360 590 L 360 780" strokeWidth="3" strokeDasharray="6 3" />
          {/* Échelons du chemin de câble */}
          <line x1="170" y1="505" x2="180" y2="500" strokeWidth="2" />
          <line x1="190" y1="515" x2="200" y2="510" strokeWidth="2" />
          <line x1="210" y1="525" x2="220" y2="520" strokeWidth="2" />
          <line x1="230" y1="535" x2="240" y2="530" strokeWidth="2" />
          <line x1="250" y1="545" x2="260" y2="540" strokeWidth="2" />
        </g>
      </g>

      {/* 5. Charpente Métallique (Poteaux Avants) */}
      <g strokeWidth="5" stroke="#0f172a">
        {/* Colonnes principales */}
        <line x1="100" y1="250" x2="100" y2="650" />
        <line x1="400" y1="400" x2="400" y2="800" />
        <line x1="700" y1="250" x2="700" y2="650" />
        {/* Contreventements (X-Bracing) avants */}
        <path d="M 100 450 L 400 600 M 100 600 L 400 450" strokeWidth="3" />
        <path d="M 400 400 L 700 250 M 400 250 L 700 400" strokeWidth="3" />
        {/* Détails de connexion (Plaques) */}
        <circle cx="100" cy="450" r="4" fill="white" />
        <circle cx="400" cy="600" r="4" fill="white" />
        <circle cx="400" cy="400" r="4" fill="white" />
        <circle cx="700" cy="250" r="4" fill="white" />
      </g>
    </g>

    {/* --- COUCHE EXTERNE : L'ARCHITECTURE (Mur-Rideau / Shell) --- */}
    <g className="xray-shell" strokeWidth="3">
      {/* Face supérieure (Toit) */}
      <polygon points="400,100 700,250 400,400 100,250" fill="#ffffff" />
      {/* Acrotère / Parapet */}
      <polygon points="400,100 700,250 700,265 400,415 100,265 100,250" fill="#f8fafc" />

      {/* Face Gauche (Mur-Rideau) */}
      <polygon points="100,265 400,415 400,815 100,665" fill="#ffffff" />
      <g strokeWidth="1.5" stroke="#64748b">
        {/* Meneaux Verticaux */}
        <line x1="160" y1="295" x2="160" y2="695" />
        <line x1="220" y1="325" x2="220" y2="725" />
        <line x1="280" y1="355" x2="280" y2="755" />
        <line x1="340" y1="385" x2="340" y2="785" />
        {/* Traverses Horizontales */}
        <line x1="100" y1="365" x2="400" y2="515" />
        <line x1="100" y1="465" x2="400" y2="615" />
        <line x1="100" y1="565" x2="400" y2="715" />
        {/* Reflets Vitrage (Sketch) */}
        <path d="M 120 310 L 140 280 M 120 330 L 150 280" stroke="#cbd5e1" strokeWidth="2" />
        <path d="M 240 470 L 260 440 M 240 490 L 270 440" stroke="#cbd5e1" strokeWidth="2" />
        <path d="M 300 600 L 320 570 M 300 620 L 330 570" stroke="#cbd5e1" strokeWidth="2" />
      </g>
      {/* Contours épais de la face gauche */}
      <polygon points="100,265 400,415 400,815 100,665" fill="none" stroke="#0f172a" strokeWidth="4" />

      {/* Entrée Principale Architecturale */}
      <g stroke="#0f172a" strokeWidth="3">
        {/* Cadre Noir */}
        <polygon points="240,615 360,675 360,795 240,735" fill="#0f172a" />
        {/* Portes Orange */}
        <polygon points="250,630 350,680 350,790 250,740" fill="#ea580c" />
        {/* Séparation portes */}
        <line x1="300" y1="655" x2="300" y2="765" stroke="white" strokeWidth="2" />
        {/* Auvent d'entrée projeté vers l'extérieur */}
        <polygon points="230,610 370,680 340,695 200,625" fill="#ffffff" strokeWidth="4" />
      </g>

      {/* Face Droite (Mur-Rideau) */}
      <polygon points="400,415 700,265 700,665 400,815" fill="#ffffff" />
      <g strokeWidth="1.5" stroke="#64748b">
        {/* Meneaux Verticaux */}
        <line x1="460" y1="385" x2="460" y2="785" />
        <line x1="520" y1="355" x2="520" y2="755" />
        <line x1="580" y1="325" x2="580" y2="725" />
        <line x1="640" y1="295" x2="640" y2="695" />
        {/* Traverses Horizontales */}
        <line x1="400" y1="515" x2="700" y2="365" />
        <line x1="400" y1="615" x2="700" y2="465" />
        <line x1="400" y1="715" x2="700" y2="565" />
        {/* Reflets Vitrage */}
        <path d="M 550 430 L 530 460 M 560 430 L 530 480" stroke="#cbd5e1" strokeWidth="2" />
        <path d="M 660 370 L 640 400 M 670 370 L 640 420" stroke="#cbd5e1" strokeWidth="2" />
      </g>

      {/* Contours épais de la face droite */}
      <polygon points="400,415 700,265 700,665 400,815" fill="none" stroke="#0f172a" strokeWidth="4" />
    </g>

    {/* --- TEXTES & LABELS --- */}

    {/* Labels Architecture (Visibles par défaut) */}
    <g className="xray-labels-arch">
      {/* Label principal flottant */}
      <rect x="180" y="100" width="220" height="40" fill="white" stroke="#0f172a" strokeWidth="3" transform="skewY(-26)" />
      <text x="200" y="128" fill="#0f172a" stroke="none" fontSize="22" fontWeight="900" transform="skewY(-26)" letterSpacing="2">ARCHITECTURE</text>

      <text x="500" y="150" fill="#0f172a" stroke="none" fontSize="18" fontWeight="bold" transform="skewY(26)">ENVELOPPE VITRÉE</text>

      {/* Flèches indicatives (Sketchy) */}
      <path d="M 280 180 Q 320 150 400 200" strokeWidth="3" strokeDasharray="6 6" fill="none" />
      <polygon points="405,202 395,190 390,200" fill="#0f172a" />
    </g>

    {/* Labels MEP & Structure (Visibles au hover) */}
    <g className="xray-labels-mep transition-all duration-500">
      {/* Label Structure */}
      <rect x="50" y="400" width="160" height="35" fill="#0f172a" stroke="white" strokeWidth="2" transform="skewY(-26)" />
      <text x="65" y="425" fill="white" stroke="none" fontSize="20" fontWeight="900" transform="skewY(-26)" letterSpacing="1">STRUCTURE</text>
      <circle cx="200" cy="400" r="8" fill="#0f172a" />
      <line x1="200" y1="400" x2="100" y2="400" strokeWidth="3" strokeDasharray="6 4" />

      {/* Label Mécanique */}
      <rect x="550" y="150" width="160" height="35" fill="#ea580c" stroke="#0f172a" strokeWidth="2" transform="skewY(26)" />
      <text x="565" y="175" fill="white" stroke="none" fontSize="20" fontWeight="900" transform="skewY(26)" letterSpacing="1">MÉCANIQUE</text>
      <circle cx="480" cy="230" r="8" fill="#ea580c" stroke="none" />
      <line x1="480" y1="230" x2="600" y2="280" strokeWidth="3" stroke="#ea580c" strokeDasharray="6 4" />

      {/* Label Électricité */}
      <text x="550" y="550" fill="#0f172a" stroke="none" fontSize="18" fontWeight="bold" transform="skewY(-26)">ÉLECTRICITÉ</text>
      <circle cx="360" cy="590" r="6" fill="#0f172a" />
      <path d="M 360 590 Q 450 550 540 600" strokeWidth="2" strokeDasharray="4 4" fill="none" />
    </g>

  </svg>
);

const HeroSketch = () => (
  <svg viewBox="0 0 600 500" className="w-full h-full font-sans" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <g className="animate-pulse">
      <path d="M 50 150 Q 60 150 60 140 Q 60 150 70 150 Q 60 150 60 160 Q 60 150 50 150" fill="#ea580c" stroke="none" />
    </g>
    <g className="animate-pulse" style={{ animationDelay: '1s' }}>
      <path d="M 530 220 Q 540 220 540 210 Q 540 220 550 220 Q 540 220 540 230 Q 540 220 530 220" fill="#ea580c" stroke="none" />
    </g>
    <path d="M 140 50 Q 160 30 180 40" strokeWidth="3" />
    <path d="M 130 70 Q 150 50 170 70" strokeWidth="3" />
    <path d="M 220 380 Q 180 440 270 460" strokeDasharray="8 8" className="animate-dash" />
    <polygon points="265,455 275,461 262,467" fill="#0f172a" />
    <path d="M 430 430 Q 480 380 430 330" strokeDasharray="8 8" className="animate-dash" style={{ animationDirection: 'reverse' }} />
    <polygon points="432,338 428,328 438,332" fill="#0f172a" />
    <g className="animate-float">
      <path d="M 120 120 Q 320 90 500 130 L 480 300 Q 300 340 100 290 Z" fill="white" strokeWidth="4" />
      <circle cx="150" cy="150" r="5" fill="#0f172a" stroke="none"/>
      <circle cx="170" cy="150" r="5" fill="#0f172a" stroke="none"/>
      <circle cx="190" cy="150" r="5" fill="#0f172a" stroke="none"/>
      <text x="140" y="190" fill="#0f172a" stroke="none" fontSize="26" fontWeight="bold">BIM</text>
      <g transform="translate(180, 180) scale(0.9)">
        <polygon points="60,110 110,80 160,110 110,140" fill="#ea580c" strokeWidth="3" />
        <polygon points="60,110 110,140 110,210 60,180" fill="white" strokeWidth="3" />
        <polygon points="110,140 160,110 160,180 110,210" fill="#ea580c" strokeWidth="3" />
        <rect x="75" y="135" width="12" height="15" fill="#0f172a" transform="skewY(30)" stroke="none" />
        <rect x="90" y="143" width="12" height="15" fill="#0f172a" transform="skewY(30)" stroke="none" />
        <rect x="120" y="132" width="12" height="15" fill="white" transform="skewY(-30)" stroke="none" />
        <rect x="135" y="123" width="12" height="15" fill="white" transform="skewY(-30)" stroke="none" />
      </g>
      <g transform="translate(340, 170)">
        <rect x="0" y="0" width="120" height="110" fill="white" strokeWidth="2" />
        <line x1="40" y1="20" x2="100" y2="20" strokeWidth="3" />
        <line x1="40" y1="50" x2="90" y2="50" strokeWidth="3" />
        <line x1="40" y1="80" x2="110" y2="80" strokeWidth="3" />
        <rect x="10" y="10" width="20" height="20" fill="#ea580c" strokeWidth="2" />
        <path d="M 13 20 L 18 25 L 27 15" stroke="white" strokeWidth="2" />
        <rect x="10" y="40" width="20" height="20" fill="#ea580c" strokeWidth="2" />
        <path d="M 13 50 L 18 55 L 27 45" stroke="white" strokeWidth="2" />
        <rect x="10" y="70" width="20" height="20" fill="#ea580c" strokeWidth="2" />
        <path d="M 13 80 L 18 85 L 27 75" stroke="white" strokeWidth="2" />
      </g>
      <circle cx="150" cy="265" r="8" fill="#0f172a" />
      <line x1="150" y1="265" x2="220" y2="265" strokeWidth="3" />
    </g>

    {/* Le cube éclaté */}
    <g transform="translate(300, 370)">
      <g className="animate-float-delayed">
        <polygon points="0,0 -90,-45 0,-90 90,-45" fill="white" strokeWidth="3" />
        <polygon points="-90,-45 0,0 0,100 -90,55" fill="white" strokeWidth="3" />
        <polygon points="0,0 90,-45 90,55 0,100" fill="white" strokeWidth="3" />
        <text x="-80" y="0" fill="#0f172a" stroke="none" fontSize="13" fontWeight="bold" transform="skewY(26)">STRUCTURE</text>
        <text x="5" y="-35" fill="#0f172a" stroke="none" fontSize="13" fontWeight="bold" transform="skewY(-26)">MÉCANIQUE</text>
        <text x="10" y="45" fill="#0f172a" stroke="none" fontSize="11" fontWeight="bold" transform="skewY(-26)">ÉLECTRICITÉ</text>
        <path d="M-70,15 L-20,40 M-70,30 L-20,55 M-70,45 L-20,70" stroke="#ea580c" strokeWidth="2" />
        <path d="M-60,20 L-60,60 M-30,35 L-30,75" stroke="#ea580c" strokeWidth="2" />
        <circle cx="30" cy="-5" r="10" stroke="#ea580c" strokeWidth="2" fill="none" transform="scale(1, 0.5) skewY(-26)" />
        <path d="M20,10 L70,-15 M20,25 L70,0" stroke="#ea580c" strokeWidth="2" />
        <path d="M40,-5 L40,15 M60,-15 L60,5" stroke="#ea580c" strokeWidth="2" />
        <line x1="0" y1="40" x2="90" y2="-5" strokeWidth="2" strokeDasharray="4 4" />
      </g>
    </g>
  </svg>
);

const IconSketch = ({ children }) => (
  <svg viewBox="0 0 100 100" className="w-16 h-16 mb-6 text-slate-900" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

// --- COMPOSANT PAGE : OUTILS ET PLUGINS ---
const ToolsPage = () => {
  return (
    <div className="animate-in fade-in duration-500 pb-24">
      {/* Hero Section Outils */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#0f172a 2px, transparent 2px), linear-gradient(90deg, #0f172a 2px, transparent 2px)', backgroundSize: '40px 40px' }}></div>

        <div className="flex flex-col lg:flex-row items-center gap-16 relative z-10">
          <div className="lg:w-5/12 space-y-8">
            <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 font-bold uppercase shadow-[4px_4px_0_0_#ea580c] transform -rotate-1 border-2 border-slate-900">
              <Cpu size={18} /> Prestations B2B
            </div>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.1] uppercase">
              Automatisation <br />
              <span className="text-orange-600 relative inline-block">
                Sur Mesure.
                <svg className="absolute w-full h-4 -bottom-2 left-0 text-slate-900" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 2" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
              </span>
            </h1>
            <p className="text-xl text-slate-800 font-medium border-l-4 border-orange-600 pl-4">
              Nous concevons des plugins Revit personnalisés et développons des agents IA exclusifs pour décupler la productivité et la rigueur de votre agence d'architecture.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="sketch-btn flex items-center justify-center gap-2 bg-orange-600 text-white px-8 py-4 text-lg font-bold uppercase tracking-wide">
                Demander un devis
              </button>
            </div>
          </div>

          <div className="lg:w-7/12 w-full">
            <div className="relative w-full h-auto aspect-square">
              <ToolsHeroSketch />
            </div>
          </div>
        </div>
      </section>

      {/* Grille des Services Outils & IA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex justify-between items-end mb-12 border-b-4 border-slate-900 pb-4">
          <h2 className="text-4xl font-black uppercase tracking-tight text-slate-900">Nos Solutions Entreprises</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Service 1: Plugins Revit */}
          <div className="sketch-card bg-white p-8 flex flex-col relative overflow-hidden group">
            <Wrench size={40} strokeWidth={2.5} className="text-slate-900 mb-6" />
            <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase leading-tight">Création de Plugins Revit (C#)</h3>
            <p className="text-slate-700 font-medium mb-6 flex-grow">
              Fini les tâches répétitives. Nous développons des compléments Revit sur mesure : gestion de paramètres en lot, vérification de standards BIM, et intégration avec vos ERP internes.
            </p>
            <ul className="space-y-2 mb-8 font-bold text-sm text-slate-600">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div> Interfaces WPF dédiées</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div> Scripts Dynamo compilés</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div> Outils de renommage automatiques</li>
            </ul>
            <span className="text-orange-600 font-bold flex items-center gap-1 group-hover:gap-3 transition-all uppercase">
              En savoir plus <ChevronRight size={20} strokeWidth={3} />
            </span>
          </div>

          {/* Service 2: Agents IA */}
          <div className="sketch-card bg-orange-50 border-orange-600 p-8 flex flex-col relative overflow-hidden group transform md:-translate-y-4">
            <div className="absolute top-0 right-0 p-2 bg-orange-600 text-white font-bold text-[10px] uppercase border-b-2 border-l-2 border-slate-900">
              Nouveau
            </div>
            <Bot size={40} strokeWidth={2.5} className="text-orange-600 mb-6 animate-bounce" />
            <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase leading-tight">Développement d'Agents IA</h3>
            <p className="text-slate-700 font-medium mb-6 flex-grow">
              L'intelligence artificielle au service de vos projets. Intégration de LLM pour auditer vos maquettes et assister vos équipes de conception via le langage naturel.
            </p>
            <ul className="space-y-2 mb-8 font-bold text-sm text-slate-600">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-slate-900 rounded-full"></div> Audit de données Revit via IA</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-slate-900 rounded-full"></div> Design Génératif & Algorithmes</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-slate-900 rounded-full"></div> Chatbots internes formés sur vos normes</li>
            </ul>
            <span className="text-slate-900 font-bold flex items-center gap-1 group-hover:gap-3 transition-all uppercase">
              Découvrir <ChevronRight size={20} strokeWidth={3} />
            </span>
          </div>

          {/* Service 3: Outils existants */}
          <div className="sketch-card bg-white p-8 flex flex-col relative overflow-hidden group">
            <Download size={40} strokeWidth={2.5} className="text-slate-900 mb-6" />
            <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase leading-tight">Outils & Gabarits Prêts à l'Emploi</h3>
            <p className="text-slate-700 font-medium mb-6 flex-grow">
              Accédez à notre catalogue de ressources premium. Gagnez des centaines d'heures grâce à nos utilitaires Windows et nos gabarits Revit optimisés.
            </p>
            <ul className="space-y-2 mb-8 font-bold text-sm text-slate-600">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div> Numéroteur de Dossiers (.exe)</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div> Templates QTO (Quantités)</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div> Scripts Dynamo d'exportation</li>
            </ul>
            <span className="text-orange-600 font-bold flex items-center gap-1 group-hover:gap-3 transition-all uppercase">
              Voir la boutique <ChevronRight size={20} strokeWidth={3} />
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

// --- COMPOSANT PAGE : FORMATIONS ---
const FormationsPage = () => {
  const courses = [
    {
      title: "Masterclass API Revit & C#",
      description: "Apprenez à développer vos propres plugins Revit. De zéro à la création d'interfaces WPF professionnelles.",
      level: "Avancé",
      icon: <Code size={32} strokeWidth={2.5} className="text-orange-600 mb-4" />,
      modules: 45
    },
    {
      title: "Automatisation Dynamo",
      description: "Optimisez la gestion des données de votre agence. Scripts QTO, nomenclatures et nettoyage de maquettes.",
      level: "Intermédiaire",
      icon: <Settings size={32} strokeWidth={2.5} className="text-orange-600 mb-4" />,
      modules: 28
    },
    {
      title: "Coordination BIM & Navisworks",
      description: "Maîtrisez la détection de conflits (Clash Detection) entre l'Architecture, la Structure et les MEP.",
      level: "Tous niveaux",
      icon: <Layers size={32} strokeWidth={2.5} className="text-orange-600 mb-4" />,
      modules: 32
    }
  ];

  return (
    <div className="animate-in fade-in duration-500 pb-24">
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#0f172a 2px, transparent 2px), linear-gradient(90deg, #0f172a 2px, transparent 2px)', backgroundSize: '40px 40px' }}></div>
        <div className="flex flex-col lg:flex-row items-center gap-16 relative z-10">
          <div className="lg:w-5/12 space-y-8">
            <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 font-bold uppercase shadow-[4px_4px_0_0_#ea580c] transform -rotate-1 border-2 border-slate-900">
              <Video size={18} /> Académie BIM
            </div>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.1] uppercase">
              Comprendre <br />
              <span className="text-orange-600 relative inline-block">
                L'Invisible.
                <svg className="absolute w-full h-4 -bottom-2 left-0 text-slate-900" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 2" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
              </span>
            </h1>
            <p className="text-xl text-slate-800 font-medium border-l-4 border-orange-600 pl-4">
              Passez sous la surface. Nos formations vous apprennent à maîtriser non seulement l'enveloppe architecturale, mais aussi les données, la structure et la mécanique qui animent le bâtiment.
            </p>
            <div className="bg-orange-50 border-2 border-slate-900 p-4 font-bold flex items-start gap-4 sketch-card">
              <span className="text-2xl">👉</span>
              <p className="text-slate-800">
                <span className="text-orange-600">Interactif :</span> Passez votre souris sur le bâtiment ci-contre pour révéler les systèmes cachés (Structure & MEP).
              </p>
            </div>
          </div>
          <div className="lg:w-7/12 w-full">
            <div className="xray-container group relative w-full h-auto aspect-square cursor-crosshair">
              <XRayBuildingSketch />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex justify-between items-end mb-12 border-b-4 border-slate-900 pb-4">
          <h2 className="text-4xl font-black uppercase tracking-tight text-slate-900">Parcours Disponibles</h2>
          <span className="font-bold text-slate-500 uppercase tracking-widest hidden sm:block">Mise à jour: Octobre</span>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {courses.map((course, idx) => (
            <div key={idx} className="sketch-card bg-white p-8 flex flex-col relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3 bg-slate-900 text-white font-bold text-xs uppercase border-b-2 border-l-2 border-slate-900 rounded-bl-xl z-10">
                {course.level}
              </div>
              {course.icon}
              <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase leading-tight">{course.title}</h3>
              <p className="text-slate-700 font-medium mb-8 flex-grow">{course.description}</p>
              <div className="flex items-center justify-between mt-auto pt-6 border-t-2 border-dashed border-slate-300">
                <span className="font-bold text-slate-500">{course.modules} Leçons vidéo</span>
                <button className="w-10 h-10 bg-orange-100 flex items-center justify-center border-2 border-slate-900 rounded-full group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <Lock size={16} strokeWidth={3} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// --- COMPOSANT PAGE : ESPACE CLIENT (DASHBOARD) ---
const ClientDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('licenses');
  const [copiedKey, setCopiedKey] = useState(false);

  const handleCopy = () => {
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="animate-in fade-in duration-500 bg-slate-50 min-h-[80vh] border-y-4 border-slate-900">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row">

        {/* Sidebar / Menu Latéral */}
        <aside className="w-full md:w-64 bg-white border-r-4 border-slate-900 flex flex-col">
          <div className="p-8 border-b-4 border-slate-900 bg-orange-600 text-white flex flex-col items-center">
            <div className="w-20 h-20 bg-white border-4 border-slate-900 rounded-full flex items-center justify-center mb-4 shadow-[4px_4px_0_0_#0f172a]">
              <User size={40} className="text-slate-900" strokeWidth={2.5} />
            </div>
            <h2 className="font-black text-xl uppercase tracking-tight text-center">Studio Vigeant</h2>
            <p className="font-bold text-xs text-orange-200">Licence PRO</p>
          </div>

          <nav className="flex-grow p-4 space-y-2">
            <button
              onClick={() => setActiveTab('licenses')}
              className={`w-full flex items-center gap-3 px-4 py-3 font-bold uppercase transition-all ${activeTab === 'licenses' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-orange-50 hover:text-orange-600'}`}
            >
              <Key size={20} strokeWidth={2.5} /> Mes Licences
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`w-full flex items-center gap-3 px-4 py-3 font-bold uppercase transition-all ${activeTab === 'courses' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-orange-50 hover:text-orange-600'}`}
            >
              <BookOpen size={20} strokeWidth={2.5} /> Mes Formations
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 font-bold uppercase text-slate-600 hover:bg-orange-50 hover:text-orange-600 transition-all">
              <Settings size={20} strokeWidth={2.5} /> Paramètres
            </button>
          </nav>

          <div className="p-4 border-t-4 border-slate-900">
            <button className="w-full flex items-center gap-3 px-4 py-3 font-bold uppercase text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all">
              <LogOut size={20} strokeWidth={2.5} /> Déconnexion
            </button>
          </div>
        </aside>

        {/* Contenu Principal */}
        <main className="flex-grow p-4 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#0f172a 2px, transparent 2px), linear-gradient(90deg, #0f172a 2px, transparent 2px)', backgroundSize: '40px 40px' }}></div>

          {/* TAB: LICENCES & PLUGINS */}
          {activeTab === 'licenses' && (
            <div className="relative z-10 animate-in slide-in-from-right-4 duration-300">
              <h2 className="text-4xl font-black uppercase tracking-tight text-slate-900 mb-8">Logiciels & Plugins</h2>

              <div className="space-y-6">
                {/* Plugin Item 1 */}
                <div className="sketch-card bg-white p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-orange-100 border-2 border-slate-900 flex items-center justify-center flex-shrink-0 shadow-[4px_4px_0_0_#0f172a]">
                      <Wrench size={32} strokeWidth={2.5} className="text-orange-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-black text-slate-900 uppercase">BIM-DZ Renamer</h3>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-bold uppercase border-2 border-slate-900">Actif</span>
                      </div>
                      <p className="text-slate-600 font-medium mb-4">Numéroteur automatique de dossiers (.exe) avec gestion des séparateurs.</p>

                      {/* Key Box */}
                      <div className="inline-flex flex-col sm:flex-row items-start sm:items-center bg-slate-100 border-2 border-slate-900 p-1">
                        <div className="px-4 py-2 font-mono font-bold text-slate-800 text-lg tracking-wider">
                          BIMDZ-SV24-8X9A-QW3R
                        </div>
                        <button
                          onClick={handleCopy}
                          className="sm:ml-2 flex items-center gap-2 bg-slate-900 text-white px-4 py-2 font-bold uppercase text-sm hover:bg-orange-600 transition-colors"
                        >
                          {copiedKey ? <CheckCircle size={16} /> : <Copy size={16} />}
                          {copiedKey ? 'Copiée !' : 'Copier Clé'}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-auto">
                    <button className="w-full sketch-btn flex items-center justify-center gap-2 bg-orange-600 text-white px-6 py-4 font-bold uppercase tracking-wide">
                      <DownloadCloud size={20} strokeWidth={2.5} />
                      Télécharger .EXE
                    </button>
                    <p className="text-center text-xs text-slate-500 font-bold mt-2">Dernière version : v2.1.4</p>
                  </div>
                </div>

                {/* Plugin Item 2 (Revit Plugin) */}
                <div className="sketch-card bg-white p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-slate-100 border-2 border-slate-900 flex items-center justify-center flex-shrink-0 shadow-[4px_4px_0_0_#0f172a]">
                      <Cpu size={32} strokeWidth={2.5} className="text-slate-900" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-black text-slate-900 uppercase">QTO Automator (Revit)</h3>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-bold uppercase border-2 border-slate-900">Actif</span>
                      </div>
                      <p className="text-slate-600 font-medium mb-4">Plugin C# pour l'automatisation des nomenclatures d'estimation.</p>

                      <div className="inline-flex items-center bg-slate-100 border-2 border-slate-900 p-1">
                        <div className="px-4 py-2 font-mono font-bold text-slate-800 text-lg tracking-wider">
                          BIMDZ-QTO9-PLM2-XXXX
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-auto">
                    <button className="w-full sketch-btn flex items-center justify-center gap-2 bg-white text-slate-900 px-6 py-4 font-bold uppercase tracking-wide">
                      <DownloadCloud size={20} strokeWidth={2.5} />
                      Télécharger .ADDIN
                    </button>
                    <p className="text-center text-xs text-slate-500 font-bold mt-2">Pour Revit 2023-2025</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: FORMATIONS */}
          {activeTab === 'courses' && (
            <div className="relative z-10 animate-in slide-in-from-right-4 duration-300">
              <h2 className="text-4xl font-black uppercase tracking-tight text-slate-900 mb-8">Mes Formations</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Course 1 */}
                <div className="sketch-card bg-white p-6 flex flex-col">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-orange-600 border-2 border-slate-900 flex items-center justify-center shadow-[2px_2px_0_0_#0f172a]">
                      <Code size={24} className="text-white" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 uppercase">Masterclass API Revit & C#</h3>
                  </div>

                  <div className="mb-6 flex-grow">
                    <div className="flex justify-between items-end mb-2">
                      <span className="font-bold text-slate-600 uppercase text-sm">Progression</span>
                      <span className="font-black text-2xl text-slate-900">45%</span>
                    </div>
                    <div className="w-full h-6 border-2 border-slate-900 bg-slate-100 p-0.5">
                      <div className="h-full bg-orange-600 border-r-2 border-slate-900" style={{ width: '45%' }}></div>
                    </div>
                    <p className="text-xs font-bold text-slate-500 mt-2 text-right">20 / 45 Leçons terminées</p>
                  </div>

                  <button className="w-full sketch-btn bg-slate-900 text-white py-3 font-bold uppercase tracking-wide hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
                    <PlayCircle size={20} />
                    Reprendre le cours
                  </button>
                </div>

                {/* Course 2 */}
                <div className="sketch-card bg-white p-6 flex flex-col">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-slate-100 border-2 border-slate-900 flex items-center justify-center shadow-[2px_2px_0_0_#0f172a]">
                      <Settings size={24} className="text-slate-900" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 uppercase">Automatisation Dynamo</h3>
                  </div>

                  <div className="mb-6 flex-grow">
                    <div className="flex justify-between items-end mb-2">
                      <span className="font-bold text-slate-600 uppercase text-sm">Progression</span>
                      <span className="font-black text-2xl text-slate-900">100%</span>
                    </div>
                    <div className="w-full h-6 border-2 border-slate-900 bg-slate-100 p-0.5">
                      <div className="h-full bg-green-500 border-r-2 border-slate-900" style={{ width: '100%' }}></div>
                    </div>
                    <p className="text-xs font-bold text-slate-500 mt-2 text-right">28 / 28 Leçons terminées</p>
                  </div>

                  <button className="w-full sketch-btn bg-white text-slate-900 py-3 font-bold uppercase tracking-wide flex items-center justify-center gap-2 border-2 border-slate-900 shadow-[4px_4px_0_0_#0f172a]">
                    <DownloadCloud size={20} />
                    Télécharger Certificat
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

// --- COMPOSANT PAGE : ACCUEIL ---
const HomePage = ({ navigateTo }) => (
  <div className="animate-in fade-in duration-500">
    <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 flex flex-col lg:flex-row items-center gap-12 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#0f172a 2px, transparent 2px), linear-gradient(90deg, #0f172a 2px, transparent 2px)', backgroundSize: '40px 40px' }}></div>
      <div className="lg:w-1/2 space-y-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 border-2 border-slate-900 text-slate-900 text-sm font-bold tracking-wide uppercase shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transform -rotate-1">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-600 animate-pulse border border-slate-900"></span>
          Plateforme Officielle
        </div>
        <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.1] uppercase">
          L'Architecture <br className="hidden lg:block" />
          <span className="text-orange-600 relative inline-block">
            Augmentée.
            <svg className="absolute w-full h-4 -bottom-2 left-0 text-slate-900" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 10 100 2" stroke="currentColor" strokeWidth="3" fill="none" />
            </svg>
          </span>
        </h1>
        <p className="text-xl text-slate-800 max-w-lg font-medium border-l-4 border-orange-600 pl-4">
          Élevez votre pratique architecturale. Formations expertes Revit & C#, plugins sur mesure et design algorithmique par IA pour les créateurs de demain.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 pt-4">
          <button onClick={() => navigateTo('outils')} className="sketch-btn flex items-center justify-center gap-2 bg-orange-600 text-white px-8 py-4 text-lg font-bold uppercase tracking-wide group">
            Nos Solutions B2B
            <ChevronRight size={24} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button onClick={() => navigateTo('formations')} className="sketch-btn flex items-center justify-center gap-2 bg-white text-slate-900 px-8 py-4 text-lg font-bold uppercase tracking-wide hover:bg-slate-50">
            <PlayCircle size={24} strokeWidth={2.5} />
            Voir les cours
          </button>
        </div>
      </div>
      <div className="lg:w-1/2 w-full max-w-lg lg:max-w-full relative z-10">
        <div className="relative w-full h-auto aspect-square">
          <HeroSketch />
        </div>
      </div>
    </section>

    <section className="bg-orange-50 border-y-4 border-slate-900 py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6 uppercase inline-block relative">
            Notre Écosystème
            <svg className="absolute w-12 h-12 -top-6 -right-10 text-orange-600 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
               <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" />
            </svg>
          </h2>
          <p className="text-slate-800 text-xl font-medium">Trois piliers pour automatiser, apprendre et concevoir plus intelligemment.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div onClick={() => navigateTo('formations')} className="sketch-card bg-white p-8 cursor-pointer flex flex-col group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-orange-100 rounded-bl-full -z-0"></div>
            <IconSketch>
              <rect x="20" y="20" width="60" height="60" rx="4" />
              <polygon points="40,35 65,50 40,65" fill="#ea580c" stroke="#ea580c" />
              <path d="M20 80 L80 80" strokeDasharray="4 4" />
            </IconSketch>
            <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase relative z-10">Académie BIM</h3>
            <p className="text-slate-700 mb-8 flex-grow font-medium relative z-10">
              Maîtrisez les workflows avancés. Cours vidéo structurés sur Revit, Dynamo, Python et l'API C#.
            </p>
            <span className="text-orange-600 font-bold flex items-center gap-1 group-hover:gap-3 transition-all uppercase relative z-10">
              Voir les cours <ChevronRight size={20} strokeWidth={3} />
            </span>
          </div>
          <div onClick={() => navigateTo('outils')} className="sketch-card bg-white p-8 cursor-pointer flex flex-col group relative overflow-hidden transform md:-translate-y-4">
            <div className="absolute top-0 right-0 w-16 h-16 bg-slate-100 rounded-bl-full -z-0"></div>
            <IconSketch>
              <rect x="20" y="30" width="60" height="40" rx="2" fill="#0f172a" />
              <path d="M30 20 L30 30 M50 20 L50 30 M70 20 L70 30" />
              <path d="M30 70 L30 80 M50 70 L50 80 M70 70 L70 80" />
              <circle cx="50" cy="50" r="8" fill="#ea580c" stroke="none" />
              <path d="M20 50 L35 50 M65 50 L80 50" strokeDasharray="4 4" stroke="white" />
            </IconSketch>
            <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase relative z-10">Outils & Plugins</h3>
            <p className="text-slate-700 mb-8 flex-grow font-medium relative z-10">
              Développement de plugins Revit sur mesure et distribution de nos logiciels d'automatisation exclusifs.
            </p>
            <span className="text-orange-600 font-bold flex items-center gap-1 group-hover:gap-3 transition-all uppercase relative z-10">
              Découvrir <ChevronRight size={20} strokeWidth={3} />
            </span>
          </div>
          <div onClick={() => navigateTo('outils')} className="sketch-card bg-white p-8 cursor-pointer flex flex-col group relative overflow-hidden">
             <div className="absolute top-0 right-0 w-16 h-16 bg-orange-100 rounded-bl-full -z-0"></div>
            <IconSketch>
              <circle cx="50" cy="50" r="20" />
              <circle cx="20" cy="30" r="6" fill="#ea580c" stroke="none" />
              <circle cx="80" cy="30" r="6" fill="#ea580c" stroke="none" />
              <circle cx="20" cy="70" r="6" fill="#ea580c" stroke="none" />
              <circle cx="80" cy="70" r="6" fill="#ea580c" stroke="none" />
              <line x1="25" y1="35" x2="40" y2="45" />
              <line x1="75" y1="35" x2="60" y2="45" />
              <line x1="25" y1="65" x2="40" y2="55" />
              <line x1="75" y1="65" x2="60" y2="55" />
              <path d="M50 30 L50 20" strokeDasharray="4 4" />
            </IconSketch>
            <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase relative z-10">Design & IA</h3>
            <p className="text-slate-700 mb-8 flex-grow font-medium relative z-10">
              Création d'agents IA pour l'audit automatisé de vos maquettes et l'optimisation des flux de travail.
            </p>
            <span className="text-orange-600 font-bold flex items-center gap-1 group-hover:gap-3 transition-all uppercase relative z-10">
              Voir l'expertise <ChevronRight size={20} strokeWidth={3} />
            </span>
          </div>
        </div>
      </div>
    </section>

    <section className="py-24 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sketch-card bg-slate-900 text-white p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-orange-600 text-white px-3 py-1 text-xs font-bold uppercase mb-6 border-2 border-slate-900 shadow-[2px_2px_0_0_#fff] transform rotate-2">
                <ShieldCheck size={16} /> Protection Anti-Piratage
              </div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6 uppercase">Distribution Sécurisée</h2>
              <p className="text-slate-300 text-lg mb-8 font-medium">
                Nos plugins Revit et logiciels Windows sont protégés par un système de licence propriétaire. Achetez, téléchargez votre fichier .exe et recevez votre clé unique instantanément.
              </p>
              <ul className="space-y-4 font-medium">
                {['Paiement international & local (Algérie)', 'Téléchargement direct via espace client', 'Mises à jour des scripts garanties'].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-slate-200">
                    <div className="w-6 h-6 border-2 border-orange-600 flex items-center justify-center bg-slate-800 transform rotate-3">
                      <div className="w-2 h-2 bg-orange-600"></div>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-64 md:h-full min-h-[300px] border-4 border-slate-700 bg-slate-800 p-6 flex items-center justify-center">
               <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
               <div className="relative z-10 text-center space-y-6">
                 <div className="sketch-btn bg-white text-slate-900 p-4 inline-block mb-4 animate-bounce border-4 border-slate-900">
                   <Download size={48} className="mx-auto text-orange-600" strokeWidth={2.5} />
                 </div>
                 <div className="bg-orange-500 border-2 border-slate-900 px-6 py-3 font-mono text-sm text-slate-900 font-bold shadow-[4px_4px_0_0_#fff]">
                   BIM-DZ_Renamer_v2.1.exe
                 </div>
                 <div className="text-sm text-slate-300 font-mono font-bold">STATUT: SÉCURISÉ & AUTHENTIFIÉ</div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

// --- APP PRINCIPALE ---
export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-orange-200">
      <style dangerouslySetInnerHTML={{ __html: styleSheet }} />
      <nav className="sticky top-0 z-50 bg-white border-b-4 border-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div onClick={() => setCurrentPage('home')} className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
              <FennecLogo className="w-9 h-11" />
              <span className="font-black text-2xl tracking-tight text-slate-900 uppercase">BIM-DZ</span>
            </div>
            <div className="hidden md:flex space-x-8 items-center font-bold">
              <button
                onClick={() => setCurrentPage('formations')}
                className={`uppercase hover:-translate-y-1 transition-transform ${currentPage === 'formations' ? 'text-orange-600 border-b-2 border-orange-600' : 'hover:text-orange-600'}`}
              >
                Formations
              </button>
              <button
                onClick={() => setCurrentPage('outils')}
                className={`uppercase hover:-translate-y-1 transition-transform ${currentPage === 'outils' ? 'text-orange-600 border-b-2 border-orange-600' : 'hover:text-orange-600'}`}
              >
                Outils & Plugins
              </button>
              <button
                onClick={() => setCurrentPage('dashboard')}
                className={`sketch-btn px-6 py-2.5 font-bold uppercase tracking-wide ${currentPage === 'dashboard' ? 'bg-orange-600 text-white' : 'bg-white text-slate-900'}`}
              >
                Espace Client
              </button>
            </div>
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-900 hover:text-orange-600"
              >
                {isMenuOpen ? <X size={32} strokeWidth={3} /> : <Menu size={32} strokeWidth={3} />}
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-orange-50 border-b-4 border-slate-900 p-6">
            <div className="flex flex-col space-y-6">
              <button onClick={() => { setCurrentPage('formations'); setIsMenuOpen(false); }} className="text-left text-lg font-bold text-slate-900 uppercase">Formations</button>
              <button onClick={() => { setCurrentPage('outils'); setIsMenuOpen(false); }} className="text-left text-lg font-bold text-slate-900 uppercase">Outils & Plugins</button>
              <button
                onClick={() => { setCurrentPage('dashboard'); setIsMenuOpen(false); }}
                className="sketch-btn bg-white text-slate-900 px-4 py-3 font-bold uppercase w-full text-center"
              >
                Espace Client
              </button>
            </div>
          </div>
        )}
      </nav>
      <main>
        {currentPage === 'home' && <HomePage navigateTo={setCurrentPage} />}
        {currentPage === 'formations' && <FormationsPage />}
        {currentPage === 'outils' && <ToolsPage />}
        {currentPage === 'dashboard' && <ClientDashboardPage />}
      </main>
      <footer className="bg-white border-t-4 border-slate-900 pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <FennecLogo className="w-7 h-9" />
            <span className="font-black text-xl tracking-tight text-slate-900 uppercase">BIM-DZ</span>
          </div>
          <div className="text-sm text-slate-600 font-bold">
            © {new Date().getFullYear()} BIM-DZ. DESIGN & CODE.
          </div>
          <div className="flex gap-6 font-bold text-sm uppercase">
            <a href="#" className="text-slate-600 hover:text-orange-600 hover:-translate-y-1 transition-all">LinkedIn</a>
            <a href="#" className="text-slate-600 hover:text-orange-600 hover:-translate-y-1 transition-all">GitHub</a>
            <a href="#" className="text-slate-600 hover:text-orange-600 hover:-translate-y-1 transition-all">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
