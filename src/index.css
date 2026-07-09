@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

@theme inline {
    --font-heading: 'Arial Black', sans-serif;
    --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
    --color-background: hsl(var(--background));
    --color-foreground: hsl(var(--foreground));
    --color-card: hsl(var(--card));
    --color-card-foreground: hsl(var(--foreground));
    --color-popover: hsl(var(--card));
    --color-popover-foreground: hsl(var(--foreground));
    --color-primary: hsl(var(--primary));
    --color-primary-foreground: hsl(var(--primary-foreground));
    --color-secondary: hsl(var(--secondary));
    --color-secondary-foreground: hsl(var(--foreground));
    --color-muted: hsl(var(--muted));
    --color-muted-foreground: hsl(var(--muted-foreground));
    --color-accent: hsl(var(--secondary));
    --color-accent-foreground: hsl(var(--foreground));
    --color-destructive: hsl(var(--destructive));
    --color-border: hsl(var(--border));
    --color-input: hsl(var(--border));
    --color-ring: hsl(var(--ring));
    --radius-sm: calc(var(--radius) * 0.6);
    --radius-md: calc(var(--radius) * 0.8);
    --radius-lg: var(--radius);
    --radius-xl: calc(var(--radius) * 1.4);
    --radius-2xl: calc(var(--radius) * 1.8);
    --radius-3xl: calc(var(--radius) * 2.2);
    --radius-4xl: calc(var(--radius) * 2.6);
}

:root {
  --background: 0 0% 0%;            /* Preto puro */
  --foreground: 0 0% 100%;          /* Branco */
  --card: 220 20% 6%;
  --primary: 39 100% 50%;           /* Laranja neon #FFA500 */
  --primary-foreground: 0 0% 0%;
  --secondary: 220 20% 12%;
  --muted: 220 10% 55%;
  --border: 220 15% 18%;
  --ring: 39 100% 50%;
  --destructive: 0 84.2% 60.2%;
  --radius: 0.75rem;

  --neon-glow: 0 0 20px hsla(39, 100%, 50%, 0.4), 0 0 60px hsla(39, 100%, 50%, 0.15);
  --neon-glow-strong: 0 0 20px hsla(39, 100%, 50%, 0.6), 0 0 80px hsla(39, 100%, 50%, 0.25);
}

.dark {
  /* same as root, pure dark app */
  --background: 0 0% 0%;
  --foreground: 0 0% 100%;
  --card: 220 20% 6%;
  --primary: 39 100% 50%;
  --primary-foreground: 0 0% 0%;
  --secondary: 220 20% 12%;
  --muted: 220 10% 55%;
  --border: 220 15% 18%;
  --ring: 39 100% 50%;
  --destructive: 0 84.2% 60.2%;
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
  html {
    @apply font-sans;
    color-scheme: dark;
  }
}

@layer utilities {
  .neon-text {
    @apply text-primary;
    text-shadow: 0 0 10px hsl(39 100% 50% / 0.5), 0 0 20px hsl(39 100% 50% / 0.3);
  }

  .neon-button {
    @apply flex items-center justify-center rounded-xl font-heading font-bold uppercase tracking-widest text-[#000] transition-all duration-300;
    background: linear-gradient(135deg, hsl(39 100% 45%), hsl(39 100% 55%));
    box-shadow: var(--neon-glow);
  }
  
  .neon-button:not(:disabled):hover {
    transform: translateY(-1px);
    box-shadow: var(--neon-glow-strong);
  }
  
  .neon-button:disabled {
    @apply opacity-50 cursor-not-allowed;
    background: hsl(39 100% 30%);
    box-shadow: none;
    color: hsl(0 0% 100% / 0.5);
  }

  .glass-card {
    @apply rounded-[1rem] bg-card/95 border border-primary/50 relative overflow-hidden;
    backdrop-filter: blur(20px);
    box-shadow: 0 0 30px hsl(39 100% 50% / 0.15), inset 0 1px 0 hsl(39 100% 50% / 0.1);
    background: linear-gradient(145deg, hsl(220 20% 8% / 0.95), hsl(39 50% 6% / 0.95));
  }

  .bg-glow { 
    position: absolute; 
    top: -100px; left: 50%; 
    transform: translateX(-50%); 
    width: 600px; 
    height: 400px; 
    background: radial-gradient(circle, hsla(39, 100%, 50%, 0.15) 0%, transparent 70%); 
    filter: blur(60px); 
    pointer-events: none; 
  }

  /* Fade in up animation */
  .fade-in-up {
    animation: fade-in-up 0.6s ease-out forwards;
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}