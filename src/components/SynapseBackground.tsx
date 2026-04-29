import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

export default function SynapseBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- CURSOR LOGIC ---
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
    };
    document.addEventListener('mousemove', moveCursor);

    // --- THREE.JS LOGIC ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x00000a);
    scene.fog = new THREE.FogExp2(0x00000f, 0.022);

    const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 8, 45);

    const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.04;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.7;
    controls.enablePan = false;
    controls.maxDistance = 80;

    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
    bloomPass.threshold = 1.0;
    bloomPass.strength = 1.5;
    bloomPass.radius = 0.8;

    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    const vertexShader = `
        attribute float aIsInput;
        varying vec2 vUv;
        varying vec3 vWorldPos;
        varying vec3 vNormal;
        varying float vIsInput;
        varying float vDist;

        void main() {
            vUv = uv;
            vIsInput = aIsInput;
            vec4 worldPos = modelMatrix * vec4(position, 1.0);
            vWorldPos = worldPos.xyz;
            vDist = length(worldPos.xyz);
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
    `;

    const fragmentShader = `
        uniform float uTime;
        uniform float uPulseProgress;
        uniform float uActivation;
        uniform vec3 uCameraPos;

        varying vec2 vUv;
        varying vec3 vWorldPos;
        varying vec3 vNormal;
        varying float vIsInput;
        varying float vDist;

        float hash(vec3 p) {
            p = fract(p * 0.3183099 + .1);
            p *= 17.0;
            return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
        }
        float noise(vec3 x) {
            vec3 i = floor(x);
            vec3 f = fract(x);
            f = f*f*(3.0-2.0*f);
            return mix(
                mix(mix(hash(i+vec3(0,0,0)),hash(i+vec3(1,0,0)),f.x),
                    mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),
                mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),
                    mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);
        }
        vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
            return a + b * cos(6.28318*(c*t+d));
        }

        void main() {
            vec3 viewDir = normalize(uCameraPos - vWorldPos);
            float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 3.0);
            float n1 = noise(vWorldPos * 0.5 + uTime * 0.2);
            float n2 = noise(vWorldPos * 2.0 - uTime * 0.5);

            vec3 baseColor = vec3(0.01, 0.018, 0.03) + (vec3(0.08, 0.22, 0.28) * fresnel * n1);
            baseColor *= (0.5 + 0.5 * n2);

            vec3 pulseColor = vec3(0.0);
            if (vIsInput > 0.5 && uPulseProgress > -5.0) {
                float pDist  = abs(vDist - uPulseProgress);
                float core   = exp(-pDist * pDist * 3.0);
                float trail  = smoothstep(6.0, 0.0, vDist - uPulseProgress) * smoothstep(-2.0, 0.0, uPulseProgress - vDist);
                float pi     = max(core * 3.0, trail * 1.5);
                pulseColor   = vec3(3.5, 1.0, 0.1) * pi * (0.8 + 0.2*n2);
            }

            vec3 actColor = vec3(0.0);
            if (uActivation > 0.0) {
                float distFromWave = vDist - uActivation;
                float waveFront    = exp(-pow(distFromWave, 2.0) * 0.2) * step(0.0, -distFromWave);
                float residual     = smoothstep(uActivation, uActivation - 25.0, vDist);
                float actIntensity = waveFront * 4.0 + residual * 1.5;
                actIntensity      *= (0.6 + 0.4 * noise(vWorldPos * 1.5 - uTime * 2.0));

                vec3 dir    = normalize(vWorldPos);
                float angle = atan(dir.z, dir.x);
                vec3 rainbow = palette(
                    angle * 0.15 + vDist * 0.05 - uTime * 0.5,
                    vec3(0.5,0.5,0.5), vec3(0.5,0.5,0.5),
                    vec3(1.0,1.0,1.0), vec3(0.00,0.33,0.67)
                );
                actColor = rainbow * actIntensity * 1.5;
                if (vDist < 4.0) {
                    float somaFlash = exp(-pow(uActivation * 0.2, 2.0)) * 2.5;
                    actColor += vec3(1.0, 0.9, 0.8) * somaFlash;
                }
            }

            gl_FragColor = vec4(baseColor + pulseColor + actColor, 1.0);
        }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uPulseProgress: { value: -10.0 },
        uActivation: { value: 0 },
        uCameraPos: { value: new THREE.Vector3() }
      },
      transparent: false,
      depthWrite: true,
      side: THREE.FrontSide
    });

    const structureGroup = new THREE.Group();
    scene.add(structureGroup);

    function createWanderingPath(start: THREE.Vector3, dir: THREE.Vector3, length: number, segments: number, jitterScale: number, endPoint?: THREE.Vector3) {
      let pts = [start.clone()];
      let curr = start.clone();
      let cDir = dir.clone().normalize();
      for (let i = 0; i < segments; i++) {
        cDir.x += (Math.random() - 0.5) * jitterScale;
        cDir.y += (Math.random() - 0.5) * jitterScale;
        cDir.z += (Math.random() - 0.5) * jitterScale;
        cDir.normalize();
        curr = curr.clone().add(cDir.clone().multiplyScalar(length / segments));
        pts.push(curr);
      }
      if (endPoint) {
        const approach = endPoint.clone().add(new THREE.Vector3(-1.5, 0, 0));
        pts[pts.length - 1] = approach;
        pts.push(endPoint.clone());
      }
      return new THREE.CatmullRomCurve3(pts);
    }

    function taperGeometry(geo: THREE.BufferGeometry, baseRadius: number, isInput: boolean) {
      const pos = geo.attributes.position;
      const norm = geo.attributes.normal;
      const uv = geo.attributes.uv;
      for (let i = 0; i < pos.count; i++) {
        const u = uv.getX(i);
        let t = isInput ? 1.0 : (1.0 - u);
        const taper = Math.pow(t, 0.6);
        const shrink = baseRadius * (1.0 - taper);
        pos.setXYZ(i,
          pos.getX(i) - norm.getX(i) * shrink,
          pos.getY(i) - norm.getY(i) * shrink,
          pos.getZ(i) - norm.getZ(i) * shrink
        );
      }
      geo.computeVertexNormals();
    }

    function addBranch(curve: THREE.CatmullRomCurve3, radius: number, isInput: boolean) {
      const geo = new THREE.TubeGeometry(curve, Math.floor(curve.getLength() * 3), radius, 12, false);
      taperGeometry(geo, radius, isInput);
      const arr = new Float32Array(geo.attributes.position.count).fill(isInput ? 1.0 : 0.0);
      geo.setAttribute('aIsInput', new THREE.BufferAttribute(arr, 1));
      structureGroup.add(new THREE.Mesh(geo, material));
      return { curve };
    }

    const somaRadius = 3.3;
    const somaGeo = new THREE.IcosahedronGeometry(somaRadius, 16);
    const somaPos = somaGeo.attributes.position;
    for (let i = 0; i < somaPos.count; i++) {
      let v = new THREE.Vector3().fromBufferAttribute(somaPos, i);
      let n = Math.sin(v.x * 2) * Math.cos(v.y * 2) * Math.sin(v.z * 2) * 0.5 + Math.sin(v.x * 5 + v.y * 3) * 0.2;
      v.add(v.clone().normalize().multiplyScalar(n));
      somaPos.setXYZ(i, v.x, v.y, v.z);
    }
    somaGeo.computeVertexNormals();
    const somaIsInput = new Float32Array(somaPos.count).fill(0.0);
    somaGeo.setAttribute('aIsInput', new THREE.BufferAttribute(somaIsInput, 1));
    structureGroup.add(new THREE.Mesh(somaGeo, material));

    const inputCurve = createWanderingPath(
      new THREE.Vector3(-45, 0, 0), new THREE.Vector3(1, 0, 0), 46, 30, 0.05,
      new THREE.Vector3(-somaRadius * 0.1, 0, 0)
    );
    addBranch(inputCurve, 0.6, true);

    for (let i = 0; i < 18; i++) {
      let phi = Math.random() * Math.PI * 2;
      let theta = Math.acos(Math.random() * 2 - 1);
      if (Math.cos(phi) * Math.sin(theta) < -0.3)
        phi = phi > Math.PI ? phi - Math.PI : phi + Math.PI;

      let startDir = new THREE.Vector3(
        Math.cos(phi) * Math.sin(theta),
        Math.sin(phi) * Math.sin(theta),
        Math.cos(theta)
      );
      let start = startDir.clone().multiplyScalar(somaRadius * 0.8);
      let length = 20 + Math.random() * 30;
      let mainRadius = 0.4 + Math.random() * 0.3;
      let { curve: mainCurve } = addBranch(
        createWanderingPath(start, startDir, length, 25, 0.4),
        mainRadius, false
      );

      let numSec = Math.floor(Math.random() * 4) + 2;
      for (let j = 0; j < numSec; j++) {
        let t = 0.2 + Math.random() * 0.6;
        let bStart = mainCurve.getPoint(t);
        let tangent = mainCurve.getTangent(t);
        let rv = new THREE.Vector3(Math.random() - .5, Math.random() - .5, Math.random() - .5).normalize();
        let bDir = tangent.clone().cross(rv).normalize().add(tangent.multiplyScalar(0.5)).normalize();
        addBranch(
          createWanderingPath(bStart, bDir, (1 - t) * length * (0.4 + Math.random() * 0.4), 15, 0.6),
          mainRadius * (1 - t) * 0.8, false
        );
      }
    }

    const makeParticles = (count: number, spread: number, colorHex: number, size: number, opacity: number) => {
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * spread;
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({
        color: colorHex,
        size,
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true
      });
      return new THREE.Points(geo, mat);
    };

    const dustA = makeParticles(1200, 120, 0x224466, 0.08, 0.25);
    const dustB = makeParticles(400, 90, 0x003355, 0.16, 0.18);
    const dustC = makeParticles(120, 60, 0x00aacc, 0.30, 0.12);
    scene.add(dustA, dustB, dustC);

    // --- UI UPDATE LOGIC ---
    const elMv = document.getElementById('tele-mv');
    const elProp = document.getElementById('tele-prop');
    const elSignal = document.getElementById('bar-signal');
    const elAxon = document.getElementById('bar-axon');
    const elStatus = document.getElementById('status-msg');
    const elDot = document.getElementById('status-dot');
    const elCoordX = document.getElementById('coord-x');
    const elCoordY = document.getElementById('coord-y');
    const elCoordZ = document.getElementById('coord-z');

    let state = 0;
    let pulseProg = -10.0;
    let actProg = 0.0;
    const INPUT_LENGTH = 45.0;

    let mvBase = -70.0;
    let mvTarget = -70.0;

    const handleClick = () => {
      if (state !== 0) return;
      state = 1;
      pulseProg = INPUT_LENGTH;
      actProg = 0.0;
      material.uniforms.uActivation.value = 0.0;
      document.body.classList.add('active');
      setTimeout(() => document.body.classList.remove('active'), 300);
      mvTarget = 40.0;
    };

    window.addEventListener('click', handleClick);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    const clock = new THREE.Clock();
    let frameCount = 0;

    const animate = () => {
      const id = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      frameCount++;

      controls.update();

      dustA.rotation.y += delta * 0.008;
      dustA.rotation.x += delta * 0.003;
      dustB.rotation.y -= delta * 0.005;
      dustB.rotation.z += delta * 0.002;
      dustC.rotation.y += delta * 0.015;

      material.uniforms.uTime.value += delta;
      material.uniforms.uCameraPos.value.copy(camera.position);

      mvBase += (Math.random() - 0.5) * 0.4;
      mvBase = Math.max(-80, Math.min(-55, mvBase));
      mvTarget += (mvBase - mvTarget) * 0.05;

      if (state === 1) {
        pulseProg -= delta * 35.0;
        material.uniforms.uPulseProgress.value = pulseProg;
        mvTarget = 40.0 * (1.0 - pulseProg / INPUT_LENGTH);

        if (pulseProg <= 2.0) {
          state = 2;
          pulseProg = -10.0;
          material.uniforms.uPulseProgress.value = -10.0;
          actProg = 0.0;
          camera.position.y += 0.5;
        }
      } else if (state === 2) {
        actProg += delta * 20.0;
        material.uniforms.uActivation.value = actProg;

        if (actProg > 75.0) {
          state = 0;
          material.uniforms.uActivation.value = 0.0;
          mvTarget = -70.0;
          if (elStatus) {
            elStatus.textContent = '▸ RETRIGGER AVAILABLE';
            elStatus.className = 'status-line ready';
          }
          if (elDot) {
            elDot.style.background = '#00ffc8';
            elDot.style.boxShadow = '0 0 6px #00ffc8';
          }
        }
      }

      if (frameCount % 6 === 0) {
        const mv = state === 0 ? mvBase : mvTarget;
        if (elMv) {
          elMv.textContent = (mv >= 0 ? '+' : '') + mv.toFixed(1) + ' mV';
          elMv.className = 'tele-val' + (mv > 0 ? ' alert' : '');
        }

        if (state === 0) {
          if (elProp) { elProp.textContent = 'STANDBY'; elProp.className = 'tele-val'; }
          if (elStatus) { elStatus.textContent = '▸ AWAITING STIMULUS'; elStatus.className = 'status-line idle'; }
          if (elSignal) elSignal.style.width = (6 + Math.random() * 4) + '%';
          if (elDot) { elDot.style.background = '#00ffc8'; elDot.style.boxShadow = '0 0 6px #00ffc8'; }
        } else if (state === 1) {
          const pct = Math.max(0, Math.min(100, (1 - pulseProg / INPUT_LENGTH) * 100));
          if (elProp) { elProp.textContent = 'PROPAGATING'; elProp.className = 'tele-val alert'; }
          if (elStatus) { elStatus.textContent = '▸ SIGNAL INCOMING'; elStatus.className = 'status-line firing'; }
          if (elSignal) {
            elSignal.style.width = pct + '%';
            elSignal.style.background = 'linear-gradient(90deg, rgba(255,80,0,0.6), rgba(255,200,0,0.9))';
          }
          if (elDot) { elDot.style.background = '#ff6000'; elDot.style.boxShadow = '0 0 8px #ff4000'; }
        } else if (state === 2) {
          const pct = Math.min(100, actProg / 75 * 100);
          if (elProp) { elProp.textContent = 'FIRING'; elProp.className = 'tele-val active'; }
          if (elStatus) { elStatus.textContent = '▸ ACTION POTENTIAL'; elStatus.className = 'status-line firing'; }
          if (elSignal) {
            elSignal.style.width = (100 - pct * 0.7) + '%';
            elSignal.style.background = 'linear-gradient(90deg, rgba(0,255,120,0.6), rgba(0,200,255,0.9))';
          }
          if (elAxon) elAxon.style.width = Math.max(0, 100 - pct) + '%';
          if (elDot) { elDot.style.background = '#ff00aa'; elDot.style.boxShadow = '0 0 10px #ff00aa'; }
        }
      }

      if (frameCount % 10 === 0) {
        if (elCoordX) elCoordX.textContent = 'X: ' + camera.position.x.toFixed(3);
        if (elCoordY) elCoordY.textContent = 'Y: ' + camera.position.y.toFixed(3);
        if (elCoordZ) elCoordZ.textContent = 'Z: ' + camera.position.z.toFixed(3);
      }

      composer.render();
    };
    animate();

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="synapse-bg-container">
      <div ref={containerRef} className="three-canvas-container" />
      <div id="cursor" ref={cursorRef}></div>
      <div id="vignette"></div>
      <div id="scanlines"></div>
      <div className="corner c-tl"></div>
      <div className="corner c-tr"></div>
      <div className="corner c-bl"></div>
      <div className="corner c-br"></div>

      <div id="ui-panel">
        <div className="border-wrap">
          <div className="glass-inner">
            <div className="panel-header">
              <div className="status-dot" id="status-dot"></div>
              <span className="panel-title">Neural Synapse</span>
              <span className="panel-id">NS-7A</span>
            </div>

            <div className="telemetry">
              <div className="tele-row">
                <span className="tele-label">Membrane V</span>
                <span className="tele-val" id="tele-mv">−70.0 mV</span>
              </div>
              <div className="tele-row">
                <span className="tele-label">Dendrites</span>
                <span className="tele-val active" id="tele-dend">247</span>
              </div>
              <div className="tele-row">
                <span className="tele-label">Propagation</span>
                <span className="tele-val" id="tele-prop">STANDBY</span>
              </div>
            </div>

            <div className="divider"></div>

            <div className="bar-row">
              <span className="bar-label">Signal</span>
              <div className="bar-track"><div className="bar-fill" id="bar-signal" style={{ width: '8%' }}></div></div>
            </div>
            <div className="bar-row" style={{ marginTop: '4px' }}>
              <span className="bar-label">Axon</span>
              <div className="bar-track"><div className="bar-fill" id="bar-axon" style={{ width: '100%', background: 'linear-gradient(90deg, rgba(255,80,0,0.5), rgba(255,160,0,0.8))' }}></div></div>
            </div>

            <div className="divider"></div>

            <div className="status-line idle" id="status-msg">▸ AWAITING STIMULUS</div>
          </div>
        </div>
      </div>

      <div id="coords">
        <span id="coord-x">X: 0.000</span>
        <span id="coord-y">Y: 8.000</span>
        <span id="coord-z">Z: 45.000</span>
        <span style={{ marginTop: '4px', opacity: 0.6 }}>CAM · ORBIT MODE</span>
      </div>
    </div>
  );
}
