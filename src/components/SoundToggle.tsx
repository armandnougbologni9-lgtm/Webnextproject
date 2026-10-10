'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function SoundToggle() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const isPlayingRef = useRef<boolean>(false);
  const oscillatorIntervalRef = useRef<number | null>(null);

  // Charger la préférence utilisateur au montage (sans jamais autoplay)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('coctel_bonerris_sound');
      if (saved === 'active') {
        // Préférence notée, mais selon la directive : JAMAIS de lecture automatique
      }
    } catch {
      // Ignorer si localStorage n'est pas disponible
    }

    return () => {
      stopWaves();
    };
  }, []);

  const createPinkNoiseBuffer = (ctx: AudioContext) => {
    const bufferSize = ctx.sampleRate * 4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.08;
      b6 = white * 0.115926;
    }
    return buffer;
  };

  const startWaves = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      const noiseBuffer = createPinkNoiseBuffer(ctx);
      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;

      // Filtre passe-bas pour simuler le son feutré de l'eau
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, ctx.currentTime);

      // Nœud de gain principal (volume très doux)
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.01, ctx.currentTime);
      gainNodeRef.current = masterGain;

      noiseSource.connect(filter);
      filter.connect(masterGain);
      masterGain.connect(ctx.destination);
      noiseSource.start();

      // Modulation cyclique douce (ressac des vagues toutes les 5.5 secondes)
      const waveCycleTime = 5500;
      const swell = () => {
        if (!isPlayingRef.current || !ctx || ctx.state === 'closed') return;
        const now = ctx.currentTime;
        masterGain.gain.cancelScheduledValues(now);
        // Montée douce de la vague
        masterGain.gain.linearRampToValueAtTime(0.18, now + 2.5);
        filter.frequency.linearRampToValueAtTime(680, now + 2.5);
        // Descente apaisante
        masterGain.gain.linearRampToValueAtTime(0.02, now + 5.2);
        filter.frequency.linearRampToValueAtTime(260, now + 5.2);
      };

      swell();
      oscillatorIntervalRef.current = window.setInterval(swell, waveCycleTime);

      setIsPlaying(true);
      isPlayingRef.current = true;
      localStorage.setItem('coctel_bonerris_sound', 'active');
    } catch (e) {
      console.warn('Audio non supporté :', e);
    }
  };

  const stopWaves = () => {
    if (oscillatorIntervalRef.current) {
      clearInterval(oscillatorIntervalRef.current);
      oscillatorIntervalRef.current = null;
    }
    if (gainNodeRef.current && audioCtxRef.current) {
      try {
        const now = audioCtxRef.current.currentTime;
        gainNodeRef.current.gain.linearRampToValueAtTime(0.001, now + 0.5);
      } catch {
        // Ignorer
      }
    }
    setTimeout(() => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
      audioCtxRef.current = null;
      gainNodeRef.current = null;
      setIsPlaying(false);
      isPlayingRef.current = false;
      localStorage.setItem('coctel_bonerris_sound', 'muted');
    }, 500);
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopWaves();
    } else {
      startWaves();
    }
  };

  return (
    <button
      type="button"
      onClick={toggleSound}
      className="sound-toggle-btn"
      aria-pressed={isPlaying}
      aria-label={isPlaying ? 'Couper le son des vagues' : 'Activer le son des vagues'}
      title={isPlaying ? 'Couper le son des vagues' : 'Activer le son des vagues'}
    >
      <span className="sound-icon-wrap" aria-hidden="true">
        {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
      </span>
      <span className="sound-text">
        {isPlaying ? 'Son des vagues actif' : 'Activer le son des vagues'}
      </span>

      <style jsx>{`
        .sound-toggle-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          border: 1px solid rgba(14, 116, 144, 0.2);
          border-radius: 9999px;
          padding: 8px 18px;
          font-family: var(--font-sans);
          font-size: 0.82rem;
          color: var(--color-sea-blue);
          cursor: pointer;
          transition: all 400ms var(--ease-wave);
        }
        .sound-toggle-btn:hover {
          background-color: var(--color-sky-soft);
          border-color: var(--color-sea-blue);
        }
        .sound-toggle-btn[aria-pressed='true'] {
          background-color: var(--color-sky-soft);
          border-color: var(--color-sea-blue);
          color: var(--color-sea-blue);
          box-shadow: 0 0 16px rgba(56, 189, 248, 0.2);
        }
        .sound-icon-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @media (max-width: 640px) {
          .sound-text {
            font-size: 0.78rem;
          }
        }
      `}</style>
    </button>
  );
}
