import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';

interface SolarSystemBackgroundProps {
  mode?: 'portal' | 'full';
  className?: string;
}

interface CelestialBody {
  id: string;
  name: string;
  subTitle: string;
  distanceAU: string;
  period: string;
  orbitalRadius: number; // visual pixels in reference viewport
  speed: number;         // rad / sec (graceful, realistic celestial pace)
  radius: number;        // sphere radius in pixels
  colorLight: string;
  colorMid: string;
  colorDark: string;
  rimColor: string;
  hasRings?: boolean;
  hasMoon?: boolean;
}

// Physically grounded astronomical bodies
const BODIES: CelestialBody[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    subTitle: 'Terrestrial / Cratered Regolith',
    distanceAU: '0.39 AU',
    period: '88 Days',
    orbitalRadius: 92,
    speed: 0.16,
    radius: 6,
    colorLight: '#f1f5f9',
    colorMid: '#94a3b8',
    colorDark: '#0f172a',
    rimColor: 'rgba(203, 213, 225, 0.25)',
  },
  {
    id: 'venus',
    name: 'Venus',
    subTitle: 'Dense Greenhouse Atmosphere',
    distanceAU: '0.72 AU',
    period: '225 Days',
    orbitalRadius: 138,
    speed: 0.11,
    radius: 9.5,
    colorLight: '#fef9c3',
    colorMid: '#d97706',
    colorDark: '#1c0a00',
    rimColor: 'rgba(250, 204, 21, 0.35)',
  },
  {
    id: 'earth',
    name: 'Earth',
    subTitle: 'Habitable Ocean World & Luna',
    distanceAU: '1.00 AU',
    period: '365.25 Days',
    orbitalRadius: 195,
    speed: 0.08,
    radius: 11.5,
    colorLight: '#e0f2fe',
    colorMid: '#0284c7',
    colorDark: '#020617',
    rimColor: 'rgba(56, 189, 248, 0.75)',
    hasMoon: true,
  },
  {
    id: 'mars',
    name: 'Mars',
    subTitle: 'Oxidized Basalt & Polar Ice',
    distanceAU: '1.52 AU',
    period: '687 Days',
    orbitalRadius: 252,
    speed: 0.062,
    radius: 8,
    colorLight: '#ffedd5',
    colorMid: '#ea580c',
    colorDark: '#180404',
    rimColor: 'rgba(249, 115, 22, 0.35)',
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    subTitle: 'Grand Banded Gas Giant',
    distanceAU: '5.20 AU',
    period: '11.86 Years',
    orbitalRadius: 345,
    speed: 0.035,
    radius: 22,
    colorLight: '#fff7ed',
    colorMid: '#c2410c',
    colorDark: '#1b0802',
    rimColor: 'rgba(251, 146, 60, 0.3)',
  },
  {
    id: 'saturn',
    name: 'Saturn',
    subTitle: 'Golden Gas Giant & Ring System',
    distanceAU: '9.58 AU',
    period: '29.45 Years',
    orbitalRadius: 440,
    speed: 0.024,
    radius: 18,
    colorLight: '#fef08a',
    colorMid: '#ca8a04',
    colorDark: '#1c1102',
    rimColor: 'rgba(234, 179, 8, 0.35)',
    hasRings: true,
  },
  {
    id: 'uranus',
    name: 'Uranus',
    subTitle: 'Tilted Ice Giant & Methane Sheen',
    distanceAU: '19.22 AU',
    period: '84 Years',
    orbitalRadius: 525,
    speed: 0.016,
    radius: 13.5,
    colorLight: '#cffafe',
    colorMid: '#0284c7',
    colorDark: '#021827',
    rimColor: 'rgba(103, 232, 249, 0.45)',
  },
  {
    id: 'neptune',
    name: 'Neptune',
    subTitle: 'Deep Azure Ice Giant',
    distanceAU: '30.05 AU',
    period: '164.8 Years',
    orbitalRadius: 605,
    speed: 0.011,
    radius: 13,
    colorLight: '#dbeafe',
    colorMid: '#1d4ed8',
    colorDark: '#020617',
    rimColor: 'rgba(96, 165, 250, 0.55)',
  },
];

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  life: number;
  duration: number;
  colorHead: string;
  colorTail: string;
  thickness: number;
}

export const SolarSystemBackground: React.FC<SolarSystemBackgroundProps> = ({
  mode = 'full',
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [hoveredBody, setHoveredBody] = useState<CelestialBody | null>(null);

  // Runtime animation state
  const stateRef = useRef({
    angles: BODIES.map((_, i) => i * 1.05 + 0.5),
    moonAngle: 0,
    time: 0,
    mouseX: -9999,
    mouseY: -9999,
    canvasW: 1920,
    canvasH: 1080,
    hoveredId: null as string | null,
    lastTime: performance.now(),
    shootingStars: [] as ShootingStar[],
    nextShootingStarTime: 0.6,
  });

  // Pre-generate deep space starfield
  const stars = useMemo(() => {
    return Array.from({ length: 180 }, (_, i) => ({
      x: (i * 47.93 + 13) % 1,
      y: (i * 61.27 + 29) % 1,
      size: i % 14 === 0 ? 2.2 : i % 5 === 0 ? 1.4 : 0.85,
      alpha: 0.12 + ((i * 19) % 65) / 100,
      twinkleFreq: 0.8 + (i % 6) * 0.4,
      phase: i * 0.7,
    }));
  }, []);

  // Pre-generate asteroid belt chondrites
  const asteroids = useMemo(() => {
    return Array.from({ length: 110 }, (_, i) => ({
      dist: 290 + ((i * 17) % 36),
      angle: (i / 110) * Math.PI * 2 + ((i * 11) % 10) * 0.04,
      speed: 0.045 + ((i * 7) % 10) * 0.002,
      size: i % 7 === 0 ? 1.8 : 1.1,
      alpha: 0.18 + ((i * 13) % 35) / 100,
    }));
  }, []);

  const asteroidAnglesRef = useRef<number[]>(asteroids.map((a) => a.angle));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;

    const handleResize = () => {
      const parent = containerRef.current;
      const w = parent ? parent.clientWidth : window.innerWidth;
      const h = parent ? parent.clientHeight : window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);

      stateRef.current.canvasW = w;
      stateRef.current.canvasH = h;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Camera 3D parameters:
    // A natural, cinematic orbital inclination (pitch angle = 26 degrees)
    const pitch = 0.46; // ~26.4 degrees
    const cosPitch = Math.cos(pitch);
    const sinPitch = Math.sin(pitch);
    const cameraDist = 1300; // perspective focal distance

    const render = (now: number) => {
      const dt = Math.min((now - stateRef.current.lastTime) / 1000, 0.1);
      stateRef.current.lastTime = now;
      stateRef.current.time += dt;

      const w = stateRef.current.canvasW;
      const h = stateRef.current.canvasH;
      const cx = w * 0.5;
      const cy = h * 0.5;

      ctx.clearRect(0, 0, w, h);

      // 1. Deep Space Starfield
      const t = stateRef.current.time;
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const twinkle = 0.7 + 0.3 * Math.sin(t * s.twinkleFreq + s.phase);
        ctx.fillStyle = `rgba(255, 255, 255, ${(s.alpha * twinkle).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(s.x * w, s.y * h, s.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Subtle Interstellar Dust & Ambient Radial Depth
      const nebula = ctx.createRadialGradient(cx, cy, 30, cx, cy, Math.max(w, h) * 0.65);
      nebula.addColorStop(0, 'rgba(6, 182, 212, 0.035)');
      nebula.addColorStop(0.4, 'rgba(14, 165, 233, 0.015)');
      nebula.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = nebula;
      ctx.fillRect(0, 0, w, h);

      // 2b. Atmospheric Shooting Stars (Celestial Meteors)
      if (t >= stateRef.current.nextShootingStarTime) {
        // Spawn 1 or occasionally 2 shooting stars
        const startX = Math.random() * (w * 0.85) + w * 0.05;
        const startY = Math.random() * (h * 0.4);
        const isRightFacing = Math.random() > 0.18;
        const angle = isRightFacing
          ? (30 + Math.random() * 24) * (Math.PI / 180)
          : (146 + Math.random() * 24) * (Math.PI / 180);

        const palettes = [
          { head: 'rgba(255, 255, 255, 1)', tail: 'rgba(56, 189, 248, 0.85)' },  // Icy cyan-white
          { head: 'rgba(255, 255, 255, 1)', tail: 'rgba(14, 165, 233, 0.85)' },  // Electric sky-blue
          { head: 'rgba(254, 240, 138, 1)', tail: 'rgba(245, 158, 11, 0.85)' },  // Warm solar-amber
          { head: 'rgba(236, 253, 245, 1)', tail: 'rgba(16, 185, 129, 0.85)' },  // Emerald ion trail
        ];
        const col = palettes[Math.floor(Math.random() * palettes.length)];

        stateRef.current.shootingStars.push({
          x: startX,
          y: startY,
          length: 120 + Math.random() * 150,
          speed: 750 + Math.random() * 500,
          angle,
          life: 0,
          duration: 0.75 + Math.random() * 0.65,
          colorHead: col.head,
          colorTail: col.tail,
          thickness: 1.4 + Math.random() * 0.9,
        });

        // Schedule next shooting star between 1.4s and 3.2s
        stateRef.current.nextShootingStarTime = t + 1.4 + Math.random() * 1.8;
      }

      // Update and draw shooting stars
      const activeShootingStars: ShootingStar[] = [];
      for (let sIdx = 0; sIdx < stateRef.current.shootingStars.length; sIdx++) {
        const star = stateRef.current.shootingStars[sIdx];
        star.life += dt / star.duration;
        star.x += Math.cos(star.angle) * star.speed * dt;
        star.y += Math.sin(star.angle) * star.speed * dt;

        if (star.life < 1) {
          activeShootingStars.push(star);
          const alpha = Math.sin(star.life * Math.PI);
          const tailX = star.x - Math.cos(star.angle) * star.length;
          const tailY = star.y - Math.sin(star.angle) * star.length;

          ctx.save();
          // Luminous tail ionization trail
          const meteorGrad = ctx.createLinearGradient(tailX, tailY, star.x, star.y);
          meteorGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
          meteorGrad.addColorStop(0.65, star.colorTail.replace('0.85', (alpha * 0.45).toFixed(3)));
          meteorGrad.addColorStop(1, star.colorHead.replace('1', alpha.toFixed(3)));

          ctx.strokeStyle = meteorGrad;
          ctx.lineWidth = star.thickness;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(star.x, star.y);
          ctx.stroke();

          // Radiant luminous meteor head flare
          const flareR = star.thickness * 4.5;
          const flare = ctx.createRadialGradient(
            star.x,
            star.y,
            0,
            star.x,
            star.y,
            flareR
          );
          flare.addColorStop(0, `rgba(255, 255, 255, ${alpha.toFixed(3)})`);
          flare.addColorStop(0.35, star.colorTail.replace('0.85', (alpha * 0.6).toFixed(3)));
          flare.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.fillStyle = flare;
          ctx.beginPath();
          ctx.arc(star.x, star.y, flareR, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }
      stateRef.current.shootingStars = activeShootingStars;

      // 3D Perspective Projection Function:
      // Translates orbital coordinates (R, angle) into screen (x, y), depth (z), and perspective scale
      const project3D = (radius: number, angle: number) => {
        const x3d = radius * Math.cos(angle);
        const y3d = 0; // orbits lie on ecliptic plane Y=0
        const z3d = radius * Math.sin(angle);

        // Rotate by camera pitch
        const rotY = y3d * cosPitch - z3d * sinPitch;
        const rotZ = y3d * sinPitch + z3d * cosPitch;

        // Perspective depth scale
        const scale = cameraDist / (cameraDist + rotZ);
        const screenX = cx + x3d * scale;
        const screenY = cy + rotY * scale;

        return {
          screenX,
          screenY,
          depthZ: rotZ,
          scale,
        };
      };

      // 3. Hairline Orbital Trajectory Traces (Clean, architectural lines)
      ctx.lineWidth = 1;
      for (let i = 0; i < BODIES.length; i++) {
        const b = BODIES[i];
        const isHovered = stateRef.current.hoveredId === b.id;

        ctx.strokeStyle = isHovered
          ? 'rgba(56, 189, 248, 0.28)'
          : 'rgba(255, 255, 255, 0.035)';

        ctx.beginPath();
        const steps = 72;
        for (let j = 0; j <= steps; j++) {
          const a = (j / steps) * Math.PI * 2;
          const pt = project3D(b.orbitalRadius, a);
          if (j === 0) ctx.moveTo(pt.screenX, pt.screenY);
          else ctx.lineTo(pt.screenX, pt.screenY);
        }
        ctx.stroke();
      }

      // 4. Subtle Asteroid Belt Particles
      for (let i = 0; i < asteroids.length; i++) {
        asteroidAnglesRef.current[i] += asteroids[i].speed * dt;
        const pt = project3D(asteroids[i].dist, asteroidAnglesRef.current[i]);
        ctx.fillStyle = `rgba(203, 213, 225, ${asteroids[i].alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(pt.screenX, pt.screenY, asteroids[i].size * pt.scale, 0, Math.PI * 2);
        ctx.fill();
      }

      // 5. Central Sun (Natural, Luminous Stellar Core)
      const sunPulse = 1 + 0.03 * Math.sin(t * 0.8);
      const sunR = 24 * sunPulse;

      // Outer ethereal corona (subtle, non-distracting)
      const sunCorona = ctx.createRadialGradient(cx, cy, sunR * 0.7, cx, cy, sunR * 3.2);
      sunCorona.addColorStop(0, 'rgba(254, 240, 138, 0.45)');
      sunCorona.addColorStop(0.35, 'rgba(245, 158, 11, 0.16)');
      sunCorona.addColorStop(0.7, 'rgba(234, 88, 12, 0.04)');
      sunCorona.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = sunCorona;
      ctx.beginPath();
      ctx.arc(cx, cy, sunR * 3.2, 0, Math.PI * 2);
      ctx.fill();

      // Incandescent Stellar Core Sphere
      const sunSphere = ctx.createRadialGradient(
        cx - sunR * 0.2,
        cy - sunR * 0.2,
        sunR * 0.1,
        cx,
        cy,
        sunR
      );
      sunSphere.addColorStop(0, '#ffffff');
      sunSphere.addColorStop(0.3, '#fef08a');
      sunSphere.addColorStop(0.7, '#f59e0b');
      sunSphere.addColorStop(1, '#c2410c');

      ctx.fillStyle = sunSphere;
      ctx.beginPath();
      ctx.arc(cx, cy, sunR, 0, Math.PI * 2);
      ctx.fill();

      // 6. Calculate Planet Orbital Positions
      let currentHovered: CelestialBody | null = null;
      const planetProjected: Array<{
        body: CelestialBody;
        screenX: number;
        screenY: number;
        depthZ: number;
        scale: number;
        radius: number;
      }> = [];

      for (let i = 0; i < BODIES.length; i++) {
        const b = BODIES[i];
        stateRef.current.angles[i] += b.speed * dt;

        const proj = project3D(b.orbitalRadius, stateRef.current.angles[i]);
        const renderedR = b.radius * proj.scale;

        planetProjected.push({
          body: b,
          screenX: proj.screenX,
          screenY: proj.screenY,
          depthZ: proj.depthZ,
          scale: proj.scale,
          radius: renderedR,
        });

        // Mouse hover detection (with comfortable hit buffer)
        const mouseDist = Math.hypot(
          stateRef.current.mouseX - proj.screenX,
          stateRef.current.mouseY - proj.screenY
        );
        if (mouseDist <= Math.max(renderedR + 14, 22)) {
          currentHovered = b;
        }
      }

      stateRef.current.hoveredId = currentHovered ? currentHovered.id : null;

      // Update Moon angle
      stateRef.current.moonAngle += dt * 0.9;

      // Sort planets from deepest (far in Z) to closest (near in Z)
      // for 100% physically authentic 3D spatial layering
      planetProjected.sort((a, b) => a.depthZ - b.depthZ);

      // 7. Render Celestial Spheres with Pure Photorealistic Volumetric Lighting
      for (let i = 0; i < planetProjected.length; i++) {
        const item = planetProjected[i];
        const { body: b, screenX: px, screenY: py, radius: r, scale } = item;
        const isHovered = stateRef.current.hoveredId === b.id;

        // Calculate sunlight incidence vector from Sun (cx, cy) to planet
        const dx = cx - px;
        const dy = cy - py;
        const dist = Math.hypot(dx, dy) || 1;
        const sunNormX = dx / dist;
        const sunNormY = dy / dist;

        // Specular highlight offset towards the Sun
        const hx = px + sunNormX * (r * 0.36);
        const hy = py + sunNormY * (r * 0.36);

        // SATURN'S RINGS: Render Back Half (behind planet sphere)
        if (b.hasRings) {
          const ringInner = r * 1.55;
          const ringOuter = r * 2.5;

          ctx.save();
          ctx.translate(px, py);
          ctx.scale(1, sinPitch); // tilted in same plane as solar system

          // Clip to back half only (Y <= 0)
          ctx.save();
          ctx.beginPath();
          ctx.rect(-ringOuter * 1.2, -ringOuter * 1.2, ringOuter * 2.4, ringOuter * 1.2);
          ctx.clip();

          const ringGrad = ctx.createRadialGradient(0, 0, ringInner, 0, 0, ringOuter);
          ringGrad.addColorStop(0, 'rgba(254, 240, 138, 0.7)');
          ringGrad.addColorStop(0.48, 'rgba(202, 138, 4, 0.6)');
          ringGrad.addColorStop(0.53, 'rgba(4, 7, 14, 0.15)'); // Cassini Gap
          ringGrad.addColorStop(0.57, 'rgba(254, 240, 138, 0.65)');
          ringGrad.addColorStop(0.88, 'rgba(202, 138, 4, 0.25)');
          ringGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.fillStyle = ringGrad;
          ctx.beginPath();
          ctx.arc(0, 0, ringOuter, 0, Math.PI * 2);
          ctx.arc(0, 0, ringInner, 0, Math.PI * 2, true);
          ctx.fill();
          ctx.restore();
          ctx.restore();
        }

        // LUNA (Earth's Moon): Back half if behind Earth
        if (b.hasMoon) {
          const moonDist = r * 2.3;
          const moonX = px + Math.cos(stateRef.current.moonAngle) * moonDist;
          const moonY = py + Math.sin(stateRef.current.moonAngle) * (moonDist * sinPitch);
          const isMoonBehind = Math.sin(stateRef.current.moonAngle) < 0;

          if (isMoonBehind) {
            drawMoon(ctx, moonX, moonY, 2.8 * scale, cx, cy);
          }
        }

        // --- DRAW 3D SPHERE ---
        ctx.save();

        // 1. Natural Volumetric Radial Gradient
        const sphereGrad = ctx.createRadialGradient(
          hx,
          hy,
          r * 0.08,
          px,
          py,
          r * 1.08
        );
        sphereGrad.addColorStop(0, b.colorLight);
        sphereGrad.addColorStop(0.28, b.colorLight);
        sphereGrad.addColorStop(0.62, b.colorMid);
        sphereGrad.addColorStop(0.92, b.colorDark);
        sphereGrad.addColorStop(1, '#020408');

        ctx.fillStyle = sphereGrad;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();

        // 2. Atmospheric Fresnel Rim Glow (Limb Scattering)
        const rim = ctx.createRadialGradient(px, py, r * 0.72, px, py, r);
        rim.addColorStop(0, 'rgba(0, 0, 0, 0)');
        rim.addColorStop(0.88, 'rgba(0, 0, 0, 0)');
        rim.addColorStop(1, b.rimColor);

        ctx.fillStyle = rim;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();

        // 3. Realistic Surface Accent Details
        if (b.id === 'earth') {
          // Subtle continental patterns and cloud swirls (soft, organic, non-cartoony)
          ctx.save();
          ctx.beginPath();
          ctx.arc(px, py, r, 0, Math.PI * 2);
          ctx.clip();

          // Continents: muted emerald-ochre
          ctx.fillStyle = 'rgba(22, 101, 52, 0.4)';
          ctx.beginPath();
          ctx.arc(px - r * 0.2, py - r * 0.15, r * 0.38, 0, Math.PI * 2);
          ctx.arc(px + r * 0.32, py + r * 0.2, r * 0.3, 0, Math.PI * 2);
          ctx.fill();

          // High-altitude translucent atmospheric clouds
          ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
          ctx.beginPath();
          ctx.ellipse(px - r * 0.1, py + r * 0.1, r * 0.7, r * 0.14, -0.2, 0, Math.PI * 2);
          ctx.ellipse(px + r * 0.15, py - r * 0.22, r * 0.55, r * 0.12, 0.15, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else if (b.id === 'mars') {
          // Mars: subtle glistening North Polar ice cap
          ctx.save();
          ctx.beginPath();
          ctx.arc(px, py, r, 0, Math.PI * 2);
          ctx.clip();
          ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
          ctx.beginPath();
          ctx.arc(px, py - r * 0.82, r * 0.25, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else if (b.id === 'jupiter') {
          // Jupiter: soft, harmonic cloud bands
          ctx.save();
          ctx.beginPath();
          ctx.arc(px, py, r, 0, Math.PI * 2);
          ctx.clip();
          ctx.fillStyle = 'rgba(124, 45, 18, 0.35)';
          ctx.fillRect(px - r, py - r * 0.35, r * 2, r * 0.18);
          ctx.fillRect(px - r, py + r * 0.15, r * 2, r * 0.18);

          // Subtle Great Red Spot
          ctx.fillStyle = 'rgba(220, 38, 38, 0.75)';
          ctx.beginPath();
          ctx.ellipse(px + r * 0.35, py + r * 0.24, r * 0.22, r * 0.14, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        ctx.restore();

        // SATURN'S RINGS: Render Front Half (in front of planet sphere)
        if (b.hasRings) {
          const ringInner = r * 1.55;
          const ringOuter = r * 2.5;

          ctx.save();
          ctx.translate(px, py);
          ctx.scale(1, sinPitch);

          // Clip to front half only (Y > 0)
          ctx.save();
          ctx.beginPath();
          ctx.rect(-ringOuter * 1.2, 0, ringOuter * 2.4, ringOuter * 1.2);
          ctx.clip();

          const frontRingGrad = ctx.createRadialGradient(0, 0, ringInner, 0, 0, ringOuter);
          frontRingGrad.addColorStop(0, 'rgba(254, 240, 138, 0.7)');
          frontRingGrad.addColorStop(0.48, 'rgba(202, 138, 4, 0.6)');
          frontRingGrad.addColorStop(0.53, 'rgba(4, 7, 14, 0.15)');
          frontRingGrad.addColorStop(0.57, 'rgba(254, 240, 138, 0.65)');
          frontRingGrad.addColorStop(0.88, 'rgba(202, 138, 4, 0.25)');
          frontRingGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.fillStyle = frontRingGrad;
          ctx.beginPath();
          ctx.arc(0, 0, ringOuter, 0, Math.PI * 2);
          ctx.arc(0, 0, ringInner, 0, Math.PI * 2, true);
          ctx.fill();
          ctx.restore();
          ctx.restore();
        }

        // LUNA (Earth's Moon): Front half
        if (b.hasMoon) {
          const moonDist = r * 2.3;
          const moonX = px + Math.cos(stateRef.current.moonAngle) * moonDist;
          const moonY = py + Math.sin(stateRef.current.moonAngle) * (moonDist * sinPitch);
          const isMoonInFront = Math.sin(stateRef.current.moonAngle) >= 0;

          if (isMoonInFront) {
            drawMoon(ctx, moonX, moonY, 2.8 * scale, cx, cy);
          }
        }

        // 8. Elegant Astronomical Indicator on Hover (Refined, Non-Gimmicky)
        if (isHovered) {
          ctx.save();
          // Delicate cyan focus ring
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(px, py, r + 7, 0, Math.PI * 2);
          ctx.stroke();

          // Ultra-fine pointer tick
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
          ctx.beginPath();
          ctx.moveTo(px, py - r - 7);
          ctx.lineTo(px, py - r - 15);
          ctx.stroke();

          ctx.restore();
        }
      }

      // Sync hover state to React
      if (currentHovered?.id !== hoveredBody?.id) {
        setHoveredBody(currentHovered);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [stars, asteroids, hoveredBody]);

  // Helper function to draw Moon as a soft volumetric sphere
  const drawMoon = (
    ctx: CanvasRenderingContext2D,
    mx: number,
    my: number,
    mr: number,
    sunX: number,
    sunY: number
  ) => {
    const dx = sunX - mx;
    const dy = sunY - my;
    const dist = Math.hypot(dx, dy) || 1;
    const hx = mx + (dx / dist) * (mr * 0.35);
    const hy = my + (dy / dist) * (mr * 0.35);

    const mGrad = ctx.createRadialGradient(hx, hy, mr * 0.1, mx, my, mr * 1.05);
    mGrad.addColorStop(0, '#f8fafc');
    mGrad.addColorStop(0.35, '#94a3b8');
    mGrad.addColorStop(0.85, '#334155');
    mGrad.addColorStop(1, '#020617');

    ctx.fillStyle = mGrad;
    ctx.beginPath();
    ctx.arc(mx, my, mr, 0, Math.PI * 2);
    ctx.fill();
  };

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    stateRef.current.mouseX = e.clientX - rect.left;
    stateRef.current.mouseY = e.clientY - rect.top;
  }, []);

  const handleMouseLeave = useCallback(() => {
    stateRef.current.mouseX = -9999;
    stateRef.current.mouseY = -9999;
    setHoveredBody(null);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`fixed inset-0 overflow-hidden select-none z-0 pointer-events-auto ${className} ${
        mode === 'portal'
          ? 'opacity-95'
          : 'opacity-65 hover:opacity-85 transition-opacity duration-1000'
      }`}
      aria-label="Astronomical Deep Space Solar Background"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-default"
      />

      {/* Subtle, Architectural Telemetry Badge on Hover (Quiet Luxury) */}
      {hoveredBody && (
        <div
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-30 pointer-events-none px-5 py-2.5 rounded-full liquid-glass-glow border border-cyan-400/30 text-xs font-mono text-cyan-200 shadow-2xl backdrop-blur-2xl animate-fade-rise flex items-center gap-3"
        >
          <div
            className="w-2.5 h-2.5 rounded-full shrink-0 shadow-[0_0_8px_rgba(56,189,248,0.8)]"
            style={{ backgroundColor: hoveredBody.colorLight }}
          />
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white tracking-wide">
              {hoveredBody.name.toUpperCase()}
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-cyan-300 text-[11px]">
              {hoveredBody.distanceAU}
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-300 text-[11px] hidden sm:inline">
              {hoveredBody.subTitle}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
