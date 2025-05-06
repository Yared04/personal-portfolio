import { useRef, useState } from 'react';

type CardKey = 'backend' | 'frontend' | 'other';

export function useRandomHoverMotion(cards: CardKey[]) {
  const [isHovered, setIsHovered] = useState<Record<CardKey, boolean>>(
    Object.fromEntries(cards.map(card => [card, false])) as Record<CardKey, boolean>
  );

  const [mouseSpeed, setMouseSpeed] = useState<Record<CardKey, number>>(
    Object.fromEntries(cards.map(card => [card, 0])) as Record<CardKey, number>
  );

  const [lastMousePosition, setLastMousePosition] = useState<
    Record<CardKey, { x: number; y: number }>
  >(
    Object.fromEntries(cards.map(card => [card, { x: 0, y: 0 }])) as Record<
      CardKey,
      { x: number; y: number }
    >
  );

  const [lastUpdateTime, setLastUpdateTime] = useState<Record<CardKey, number>>(
    Object.fromEntries(cards.map(card => [card, 0])) as Record<CardKey, number>
  );

  const [iconPosition, setIconPosition] = useState<Record<CardKey, { x: number; y: number }>>(
    Object.fromEntries(cards.map(card => [card, { x: 0, y: 0 }])) as Record<
      CardKey,
      { x: number; y: number }
    >
  );

  const animationRefs = useRef<Record<CardKey, number | null>>(
    Object.fromEntries(cards.map(card => [card, null])) as Record<CardKey, number | null>
  );

  const handleMouseEnter = (card: CardKey) => {
    setIsHovered(prev => ({ ...prev, [card]: true }));

    const animate = () => {
      setIconPosition(prev => {
        const speed = mouseSpeed[card] * 0.1 || 1;
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * speed;
        return {
          ...prev,
          [card]: {
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
          },
        };
      });

      animationRefs.current[card] = requestAnimationFrame(animate);
    };

    if (!animationRefs.current[card]) {
      animate();
    }
  };

  const handleMouseLeave = (card: CardKey) => {
    setIsHovered(prev => ({ ...prev, [card]: false }));
    setMouseSpeed(prev => ({ ...prev, [card]: 0 }));
    if (animationRefs.current[card]) {
      cancelAnimationFrame(animationRefs.current[card]!);
      animationRefs.current[card] = null;
    }
    setIconPosition(prev => ({ ...prev, [card]: { x: 0, y: 0 } }));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, card: CardKey) => {
    if (!isHovered[card]) return;

    const currentTime = Date.now();
    const timeDiff = currentTime - lastUpdateTime[card];

    if (timeDiff > 16) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const dx = x - lastMousePosition[card].x;
      const dy = y - lastMousePosition[card].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const speed = (distance / timeDiff) * 1000;

      setMouseSpeed(prev => ({ ...prev, [card]: speed }));
      setLastMousePosition(prev => ({ ...prev, [card]: { x, y } }));
      setLastUpdateTime(prev => ({ ...prev, [card]: currentTime }));
    }
  };

  return {
    handleMouseEnter,
    handleMouseLeave,
    handleMouseMove,
    iconPosition,
  };
}
