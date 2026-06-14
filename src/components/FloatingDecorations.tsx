import { Heart, Sparkle } from 'lucide-react';

const floatingItems = [
  { left: '8%', delay: '0s', duration: 14, size: 15, type: 'heart' },
  { left: '18%', delay: '4s', duration: 17, size: 11, type: 'sparkle' },
  { left: '29%', delay: '2s', duration: 13, size: 18, type: 'heart' },
  { left: '42%', delay: '7s', duration: 18, size: 12, type: 'sparkle' },
  { left: '57%', delay: '1s', duration: 16, size: 16, type: 'heart' },
  { left: '69%', delay: '5s', duration: 15, size: 10, type: 'sparkle' },
  { left: '81%', delay: '3s', duration: 19, size: 17, type: 'heart' },
  { left: '92%', delay: '8s', duration: 14, size: 13, type: 'sparkle' },
];

const bokehItems = [
  { left: '8%', top: '10%', size: 180, delay: '0s' },
  { left: '76%', top: '8%', size: 220, delay: '1.2s' },
  { left: '18%', top: '70%', size: 260, delay: '2.4s' },
  { left: '64%', top: '68%', size: 180, delay: '0.8s' },
  { left: '44%', top: '32%', size: 150, delay: '3s' },
];

export default function FloatingDecorations() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(255,183,196,0.34),transparent_26%),radial-gradient(circle_at_80%_18%,rgba(180,126,255,0.28),transparent_28%),radial-gradient(circle_at_52%_88%,rgba(255,204,141,0.28),transparent_35%),linear-gradient(135deg,#241030_0%,#542343_45%,#1b1029_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,5,21,0.1),rgba(12,5,21,0.62))]" />
      <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.13)_1px,transparent_1px)] [background-size:68px_68px]" />

      {bokehItems.map((item) => (
        <span
          key={`${item.left}-${item.top}`}
          className="absolute rounded-full bg-[#fff2d8]/30 blur-3xl animate-pulse"
          style={{
            left: item.left,
            top: item.top,
            width: item.size,
            height: item.size,
            animationDelay: item.delay,
          }}
        />
      ))}

      {floatingItems.map((item) => {
        const Icon = item.type === 'sparkle' ? Sparkle : Heart;
        return (
          <span
            key={`${item.left}-${item.delay}`}
            className="absolute bottom-[-70px] text-[#ffd6e8]/45"
            style={{
              left: item.left,
              animation: `floatUp ${item.duration}s linear infinite`,
              animationDelay: item.delay,
            }}
          >
            <Icon size={item.size} fill={item.type === 'heart' ? 'currentColor' : 'none'} strokeWidth={1.6} />
          </span>
        );
      })}
    </div>
  );
}
