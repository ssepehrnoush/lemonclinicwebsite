import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Fixed-position, full-viewport three.js particle field rendered behind page content.
 * - Two layers of points (near + far) for depth
 * - Slow ambient drift + scroll-driven camera dolly + parallax
 * - Additive blending for a photon/glow look
 * - Respects prefers-reduced-motion
 */
export function PhotonField() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const w = () => window.innerWidth;
    const h = () => window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w() / h(), 0.1, 1000);
    camera.position.z = 60;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.setSize(w(), h());
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Soft circular sprite (no external asset)
    const makeSprite = () => {
      const size = 64;
      const c = document.createElement("canvas");
      c.width = c.height = size;
      const ctx = c.getContext("2d")!;
      const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      g.addColorStop(0, "rgba(255,236,170,1)");
      g.addColorStop(0.25, "rgba(220,200,120,0.55)");
      g.addColorStop(0.55, "rgba(120,200,170,0.18)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, size, size);
      const tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    };
    const sprite = makeSprite();

    const makeLayer = (count: number, spread: number, size: number, color: number, opacity: number) => {
      const geo = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const offsets = new Float32Array(count); // per-particle phase
      for (let i = 0; i < count; i++) {
        positions[i * 3 + 0] = (Math.random() - 0.5) * spread;
        positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
        positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
        offsets[i] = Math.random() * Math.PI * 2;
      }
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const mat = new THREE.PointsMaterial({
        size,
        map: sprite,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        color,
        opacity,
      });
      const points = new THREE.Points(geo, mat);
      (points.userData as any).offsets = offsets;
      (points.userData as any).basePositions = positions.slice();
      return points;
    };

    // Tune count for mobile
    const mobile = w() < 768;
    const farCount = mobile ? 90 : 180;
    const nearCount = mobile ? 40 : 80;

    const farLayer = makeLayer(farCount, 220, 1.6, 0xc9a84c, 0.55);
    const nearLayer = makeLayer(nearCount, 100, 2.6, 0xf0d78c, 0.85);
    scene.add(farLayer);
    scene.add(nearLayer);

    // Pointer parallax
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointer = (e: PointerEvent) => {
      pointer.tx = (e.clientX / w()) - 0.5;
      pointer.ty = (e.clientY / h()) - 0.5;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    // Scroll-driven motion
    let scrollY = window.scrollY;
    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => {
      camera.aspect = w() / h();
      camera.updateProjectionMatrix();
      renderer.setSize(w(), h());
    };
    window.addEventListener("resize", onResize);

    let raf = 0;
    const start = performance.now();
    let last = start;
    let running = true;

    const onVisibility = () => {
      running = !document.hidden;
      if (running) { last = performance.now(); tick(last); }
    };
    document.addEventListener("visibilitychange", onVisibility);

    const tick = (now: number) => {
      if (!running) return;
      const dt = Math.min(50, now - last) / 1000;
      last = now;
      const t = (now - start) / 1000;

      // Smooth pointer
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;

      const scrollPx = scrollY;
      // Camera dolly + small tilt from pointer
      camera.position.x = pointer.x * 6;
      camera.position.y = -pointer.y * 4 - scrollPx * 0.01;
      camera.position.z = 60 - Math.min(scrollPx * 0.012, 30);
      camera.lookAt(0, 0, 0);

      // Ambient drift: gentle rotation per layer
      if (!reduced) {
        farLayer.rotation.y = t * 0.012;
        farLayer.rotation.x = Math.sin(t * 0.07) * 0.08;
        nearLayer.rotation.y = -t * 0.02;
        nearLayer.rotation.x = Math.cos(t * 0.09) * 0.1;

        // Per-vertex floating (sinusoidal Y) on near layer
        const geo = nearLayer.geometry as THREE.BufferGeometry;
        const pos = geo.getAttribute("position") as THREE.BufferAttribute;
        const base = (nearLayer.userData as any).basePositions as Float32Array;
        const offs = (nearLayer.userData as any).offsets as Float32Array;
        for (let i = 0; i < pos.count; i++) {
          const phase = offs[i] + t * 0.6;
          pos.array[i * 3 + 1] = base[i * 3 + 1] + Math.sin(phase) * 1.6;
        }
        pos.needsUpdate = true;
      }

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      renderer.dispose();
      sprite.dispose();
      [farLayer, nearLayer].forEach((p) => {
        (p.geometry as THREE.BufferGeometry).dispose();
        (p.material as THREE.Material).dispose();
      });
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background:
          "radial-gradient(80% 60% at 50% 0%, rgba(13,122,95,0.10), transparent 70%), radial-gradient(60% 50% at 50% 100%, rgba(201,168,76,0.08), transparent 70%)",
      }}
    />
  );
}