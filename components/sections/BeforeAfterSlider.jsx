"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Sparkles, MoveHorizontal, CheckCircle2 } from "lucide-react";
import { clinicInfo } from "../../data/clinicInfo";
import { SlideDown, ZoomIn } from "../ui/MotionWrappers";
import SplitText from "../ui/SplitText";

export default function BeforeAfterSlider() {
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);

  const activeCase = clinicInfo.beforeAfter[selectedCaseIdx] || clinicInfo.beforeAfter[0];

  // Measure container width for pixel-perfect before/after overlay
  useEffect(() => {
    if (!containerRef.current) return;
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMove = useCallback(
    (clientX) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    },
    []
  );

  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <section id="results" className="scroll-mt-24 py-[60px] bg-brand-plum-deep text-white bg-dots-dark border-b border-brand-violet/20 overflow-hidden relative">
      {/* Ambient Radial Lighting */}
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-brand-coral/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -left-32 w-96 h-96 bg-brand-violet/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <SlideDown className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-brand-violet/40 text-brand-rose text-xs font-bold tracking-widest uppercase mb-3 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-brand-coral" />
            <span>Clinical Transformations</span>
          </div>

          {/* Split-Text Word Reveal */}
          <SplitText
            tag="h2"
            className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold text-white block"
          >
            Real Patient Outcomes
          </SplitText>

          <p className="text-cream-200/80 text-sm sm:text-base mt-2 font-normal">
            Drag the interactive slider below to inspect the before and after clinical improvements.
          </p>

          {/* Case Study Switcher */}
          <div className="flex flex-wrap justify-center gap-2.5 mt-8">
            {clinicInfo.beforeAfter.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedCaseIdx(idx);
                  setSliderPosition(50);
                }}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold tracking-wide transition-all cursor-pointer ${
                  selectedCaseIdx === idx
                    ? "bg-brand-coral text-white shadow-lg shadow-brand-coral/30 scale-105"
                    : "bg-white/10 text-cream-200/80 hover:bg-white/20 hover:text-white border border-white/15"
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>
        </SlideDown>

        {/* Interactive Comparison Slider */}
        <ZoomIn initialScale={0.93} duration={0.8} className="max-w-2xl mx-auto">
          <div className="bg-charcoal-950/80 backdrop-blur-xl rounded-3xl p-4 sm:p-5 border border-white/15 shadow-2xl">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3.5 pb-3 border-b border-white/10">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">{activeCase.title}</h3>
                <p className="text-xs text-brand-coral font-bold mt-0.5">{activeCase.treatment}</p>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-brand-rose bg-white/10 px-3 py-1 rounded-full border border-white/15 w-fit">
                <MoveHorizontal className="w-3.5 h-3.5 animate-pulse text-brand-coral" />
                <span>Drag left & right</span>
              </div>
            </div>

            {/* Slider Container - Compact & Proportional */}
            <div
              ref={containerRef}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="relative w-full h-[260px] sm:h-[320px] md:h-[360px] rounded-2xl overflow-hidden cursor-ew-resize select-none border border-white/20 shadow-inner"
            >
              {/* After Image */}
              <img
                src={activeCase.after}
                alt={`${activeCase.title} After Treatment`}
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
              />
              <div className="absolute top-3 right-3 bg-brand-plum/95 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase border border-brand-violet/40 pointer-events-none shadow-md">
                After
              </div>

              {/* Before Image (Clipped) */}
              <div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={activeCase.before}
                  alt={`${activeCase.title} Before Treatment`}
                  className="absolute inset-0 w-full h-full object-cover object-center max-w-none pointer-events-none"
                  style={{
                    width: containerWidth ? `${containerWidth}px` : "100%",
                    height: "100%",
                  }}
                />
                <div className="absolute top-3 left-3 bg-charcoal-950/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase border border-white/30 shadow-md">
                  Before
                </div>
              </div>

              {/* Divider Line with Grab Handle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl pointer-events-none"
                style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                  <span className="absolute -inset-2 rounded-full bg-brand-coral opacity-60 animate-pulse-ring pointer-events-none" />
                  
                  <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-coral text-white border-2 border-white shadow-2xl flex items-center justify-center pointer-events-auto hover:scale-110 active:scale-95 transition-transform">
                    <MoveHorizontal className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Doctor Note */}
            <div className="mt-3.5 flex items-center gap-2 text-xs text-cream-200/90 bg-white/[0.05] p-3 rounded-xl border border-white/10 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-brand-coral shrink-0" />
              <span><strong className="text-white font-bold">Clinical Assessment:</strong> {activeCase.notes}</span>
            </div>
          </div>
        </ZoomIn>
        </div>
      </section>
  );
}
