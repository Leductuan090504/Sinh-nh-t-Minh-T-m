import { Heart, Sparkle } from 'lucide-react';

const floatingItems = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  left: `${3 + Math.random() * 94}%`,
  delay: `${Math.random() * 9}s`,
  duration: 10 + Math.random() * 8,
  size: 10 + Math.random() * 18,
  type: index % 4 === 0 ? 'sparkle' : 'heart',
}));

const bokehItems = Array.from({ length: 12 }, (_, index) => ({
  id: index,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  size: 70 + Math.random() * 150,
  delay: `${Math.random() * 5}s`,
}));

export default function FloatingDecorations() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,230,214,0.9),transparent_26%),radial-gradient(circle_at_86%_12%,rgba(221,202,255,0.72),transparent_27%),radial-gradient(circle_at_52%_92%,rgba(255,210,225,0.8),transparent_34%),linear-gradient(135deg,#fffaf5_0%,#fff2f8_42%,#f7f0ff_100%)]" />
      <div className="absolute inset-0 opacity-[0.28] [background-image:linear-gradient(rgba(185,137,72,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(185,137,72,0.12)_1px,transparent_1px)] [background-size:64px_64px]" />
      {bokehItems.map((item) => (
        <span
          key={item.id}
          className="absolute rounded-full bg-white/45 blur-3xl animate-pulse"
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
            key={item.id}
            className="absolute bottom-[-70px] text-[#d9a7b8]/45"
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
