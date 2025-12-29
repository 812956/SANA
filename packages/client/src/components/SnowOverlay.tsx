import React, { useEffect, useRef } from 'react';

interface Snowflake {
  x: number;
  y: number;
  radius: number;
  speed: number;
  wind: number;
  opacity: number;
  blur: number;
}

export const SnowOverlay: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        let animationFrameId: number;
        let snowflakes: Snowflake[] = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initSnowflakes();
        };

        const initSnowflakes = () => {
            snowflakes = [];
            // Responsive count - more snow on larger screens
            const count = Math.min(Math.floor(window.innerWidth / 3), 200);
            for (let i = 0; i < count; i++) {
                snowflakes.push(createSnowflake());
            }
        };

        const createSnowflake = (resetY = false): Snowflake => {
            const radius = Math.random() * 3 + 0.5; // 0.5 - 3.5px (larger variety)
            return {
                x: Math.random() * canvas.width,
                y: resetY ? -10 : Math.random() * canvas.height,
                radius,
                speed: Math.random() * 0.5 + 0.3, // 0.3 - 0.8 (slower, more natural)
                wind: Math.random() * 0.3 - 0.15, // Gentle horizontal drift
                opacity: Math.random() * 0.4 + 0.2, // 0.2 - 0.6 opacity
                blur: radius > 2 ? 1 : 0, // Larger flakes have slight blur for depth
            };
        };

        const update = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            snowflakes.forEach((flake) => {
                flake.y += flake.speed;
                flake.x += flake.wind;

                // Wrap around
                if (flake.y > canvas.height + 10) {
                    Object.assign(flake, createSnowflake(true));
                }
                if (flake.x > canvas.width + 10) {
                    flake.x = -10;
                } else if (flake.x < -10) {
                    flake.x = canvas.width + 10;
                }

                // Apply blur for larger flakes (depth effect)
                if (flake.blur > 0) {
                    ctx.filter = `blur(${flake.blur}px)`;
                }

                ctx.beginPath();
                ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
                ctx.fill();

                // Reset filter
                if (flake.blur > 0) {
                    ctx.filter = 'none';
                }
            });

            animationFrameId = requestAnimationFrame(update);
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        update();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-0"
            style={{ width: '100%', height: '100%' }}
        />
    );
};
