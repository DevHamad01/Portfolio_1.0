import { useState, useRef, useEffect } from 'react';
import './App.css';

// Project interface
interface Project {
  id: string;
  name: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  layout: string;
  disabled?: boolean;
}

// Project data
const projects: Project[] = [
  {
    id: 'TypeRush',
    name: 'TypeRush',
    description: 'Modern typing speed test app with React, Vite & Firebase. Track WPM, unlock achievements, and improve your typing skills with real-time performance analytics.',
    image: '/TypeRush.png',
    buttonText: 'View on GitHub',
    buttonLink: 'https://github.com/DevHamad01',
    layout: 'image-left'
  },
  {
    id: 'pathfinding',
    name: 'Pathfinding Visualizer',
    description: 'Built an interactive visualizer for pathfinding algorithms (A*, Dijkstra, BFS, DFS) to demonstrate algorithm flow in real time.',
    image: '/PathFind.png',
    buttonText: 'View on GitHub',
    buttonLink: 'https://github.com/DevHamad01',
    layout: 'text-left',
  },
  {
    id: 'admission-lylo',
    name: 'Admission Lylo Platform',
    description: 'Developed a student admission management portal with dynamic form handling and admin dashboard using Angular and ASP.NET API.',
    image: '/Admissionlylo.png',
    buttonText: 'View on GitHub',
    buttonLink: 'https://github.com/DevHamad01',
    layout: 'image-left'
  },
  {
    id: 'cmax-panels',
    name: 'C-Max & Call Mining',
    description: 'Created admin and analytics panels to manage leads, calls, and reports efficiently through real-time data dashboards.',
    image: '/callmining.png',
    buttonText: 'View on GitHub',
    buttonLink: 'https://github.com/DevHamad01',
    layout: 'text-left'
  },
  {
    id: 'findcare-app',
    name: 'FindCare - Doctor Appointment App',
    description: 'FindCare is a simple Android-based doctor appointment booking application built for academic purposes using Java, XML, and a local database. It focuses on clean UI, usability, and basic healthcare appointment flow.',
    image: '/FindCare.png',
    buttonText: 'View on GitHub',
    buttonLink: 'https://github.com/DevHamad01',
    layout: 'image-left'
  }
];

// Drawing colors
const drawingColors = [
  { name: 'pink', value: '#faa7d0' }, { name: 'mint', value: '#99f6d3' }, { name: 'blue', value: '#93c5fd' }, { name: 'black', value: '#1f2937' }
];

function App() {
  const [chaosEnabled, setChaosEnabled] = useState(false);
  const [drawingColor, setDrawingColor] = useState('#1f2937');
  // ... (keep existing state)
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      // Use scroll dimensions to cover entire page content
      canvas.width = document.documentElement.scrollWidth;
      canvas.height = document.documentElement.scrollHeight;

      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = 3;
    };

    // Initial resize
    resizeCanvas();

    // Add resize listener
    window.addEventListener('resize', resizeCanvas);

    // Also resize when content might shift (e.g. images load)
    const observer = new ResizeObserver(() => resizeCanvas());
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      observer.disconnect();
    };
  }, []);

  // Drawing handlers
  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if (!chaosEnabled) return;
    setIsDrawing(true);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = drawingColor;
    ctx.beginPath();

    const { x, y } = getCoordinates(e);
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !chaosEnabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();

    if ('touches' in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    }

    return {
      x: (e as React.MouseEvent).clientX - rect.left,
      y: (e as React.MouseEvent).clientY - rect.top
    };
  };

  // Clear canvas when disabling chaos
  useEffect(() => {
    if (!chaosEnabled) {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }
    }
  }, [chaosEnabled]);

  // Email handler function
  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.href = 'mailto:iammhamad8@gmail.com';
  };

  return (
    <div
      ref={containerRef}
      className={`min-h-screen bg-white relative ${chaosEnabled ? 'cursor-pen' : ''}`}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      onTouchMove={draw}
      onTouchEnd={stopDrawing}
    >
      {/* Drawing Canvas for Chaos Mode */}
      <canvas
        ref={canvasRef}
        className={`chaos-canvas ${chaosEnabled ? 'active' : ''}`}
        onMouseDown={startDrawing}
        onTouchStart={startDrawing}
      />

      {/* Header - Increased Z-index to sit ABOVE the canvas */}
      <header className="fixed top-0 left-0 right-0 z-[10005] bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Muhammad Hamad</h1>

          {/* Enable Chaos Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <span className="text-sm text-gray-600">Enable Chaos</span>
            <button
              onClick={() => setChaosEnabled(!chaosEnabled)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${chaosEnabled ? 'bg-gray-800' : 'bg-gray-300'
                }`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${chaosEnabled ? 'translate-x-6' : 'translate-x-0'
                  }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 relative z-0">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-12 md:py-20 lg:py-24">
          <div className="flex flex-col-reverse md:grid md:grid-cols-[1.1fr_0.9fr] gap-24 md:gap-16 items-center">
            {/* Left: Text Content */}
            <div className="space-y-8 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-snug tracking-tight">
                I'm a <span className="highlight-blue box-decoration-clone">Full Stack Developer</span>{' '}
                who builds scalable and user-friendly{' '}
                <span className="wavy-underline decoration-4 underline-offset-8">web applications</span>.
              </h2>

              <p className="text-gray-600 text-lg leading-loose max-w-lg z-10">
                Specializing in <strong>Angular</strong>, <strong>React</strong>, <strong>ASP.NET Core</strong>, and <strong>SQL Server</strong>.
                {' '}Check out my work below, find me on{' '}
                <a href="https://github.com/DevHamad01" target="_blank" rel="noopener noreferrer" className="link-underline text-gray-900 font-medium">GitHub</a> /{' '}
                <a href="https://www.linkedin.com/in/muhammad-hamad-5b6067352/" target="_blank" rel="noopener noreferrer" className="link-underline text-gray-900 font-medium">LinkedIn</a>,
                {' '}or just{' '}
                <a href="#" onClick={handleEmailClick} className="link-underline text-gray-900 font-medium cursor-pointer">send me an email</a>.
              </p>
            </div>

            {/* Right: Illustration */}
            <div className="flex justify-center md:justify-end md:ml-10 -mb-4 -mt-4 md:-mt-8">
              <img
                src="/hero.png"
                alt="Developer coding with tech stack icons"
                className="w-full max-w-2xl h-auto object-contain scale-150 transition-transform duration-300"
              />
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="max-w-6xl mx-auto px-6 py-16 space-y-32">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`grid md:grid-cols-2 gap-12 items-center ${project.layout === 'text-left' ? 'md:[direction:rtl]' : ''
                }`}
            >
              {/* Image */}
              <div className={`project-card ${project.layout === 'text-left' ? 'md:[direction:ltr]' : ''}`}>
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>

              {/* Text Content */}
              <div className={`space-y-4 ${project.layout === 'text-left' ? 'md:[direction:ltr]' : ''}`}>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {project.name}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {project.description}
                </p>
                <div className="pt-2">
                  <a
                    href={project.buttonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-block btn-outline ${project.disabled ? 'opacity-60 cursor-not-allowed pointer-events-none' : ''}`}
                  >
                    {project.buttonText}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* About Me Section */}
        <section className="max-w-6xl mx-auto px-6 py-24">
          <div className="space-y-8">
            {/* Heading with handwritten style */}
            <div className="relative inline-block">
              <span className="absolute -top-6 left-8 text-sm text-teal-500 font-medium rotate-[-5deg]">
                (Boring)
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 handwritten">
                About Me
              </h2>
            </div>

            {/* Two columns */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-16">
              <p className="text-gray-600 leading-relaxed">
                I am a Full Stack Developer at{' '}
                <a href="https://atgsolutions.co/" target="_blank" rel="noopener noreferrer" className="link-underline text-gray-900">ATG Solutions</a>
                {' '}with hands-on experience in building scalable web applications using{' '}
                <strong>Angular</strong>, <strong>React</strong>, <strong>ASP.NET Core</strong>, and <strong>SQL Server</strong>.
                {' '}I enjoy creating clean, user-friendly interfaces and developing efficient backend APIs that solve real business problems.
              </p>

              <p className="text-gray-600 leading-relaxed">
                I'm passionate about clean architecture, performance optimization, and writing maintainable code while collaborating with teams in agile environments.
                {' '}Outside of work, I explore AI-assisted development, automation, and modern tech trends to continuously sharpen my skills.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="max-w-6xl mx-auto px-6 py-16">
          <div className="space-y-8">
            {/* Email CTA */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Send me{' '}
              <a href="#" onClick={handleEmailClick} className="link-underline cursor-pointer">an email</a>
            </h2>

            {/* Copyright */}
            <div className="pt-8 text-sm text-gray-500">
              <p>
                Website designed by{' '}
                <a href="#" className="link-underline text-gray-700">Hamad</a>
                {' '}and developed by Hamad.
              </p>
              <p className="mt-1">© 2026 all rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>

      {/* Color Picker Dots (only visible when chaos is enabled) */}
      {chaosEnabled && (
        <div className="fixed bottom-6 left-6 z-[10000] flex gap-3">
          {drawingColors.map((color) => (
            <button
              key={color.name}
              onClick={() => setDrawingColor(color.value)}
              className={`w-8 h-8 rounded-full transition-transform duration-200 ${drawingColor === color.value
                ? 'scale-125 shadow-md ring-2 ring-gray-100'
                : 'hover:scale-110'
                }`}
              style={{ backgroundColor: color.value }}
              aria-label={`Select ${color.name} color`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
