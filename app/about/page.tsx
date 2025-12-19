export default function ResumePage() {
  return (
    <main className="page-content">
      {/* Fixed heading */}
      <h1 className="hero-heading">about me ✌️</h1>

      {/* Micro Bio */}
      <section className="mb-8">
        <p className="text-lg text-gray-600 mb-4">
          I’m Alex. I’m a 21 y/o physics & CS student currently on a
          &apos;builder&apos; gap year. My goal is to ship 12 projects in 12
          months and get dangerous at full-stack development.
        </p>

        {/* Contact */}
        <div className="flex gap-4 text-sm text-gray-500">
          <a
            href="mailto:alexshibu04@gmail.com"
            className="hover:text-red-500 transition-colors"
          >
            alexshibu04@gmail.com
          </a>
          <span>•</span>
          <span>Toronto, ON</span>
        </div>
      </section>

      {/* Video Intro (Optional) */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4">Video Intro</h2>
        <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
          {/* Replace this div with your <video> or <iframe> tag later */}
          <p>Video coming soon...</p>
        </div>
      </section>

      {/* Resume Download */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">PDF Version</h2>
          <a
            /* Fixed path: removed /public */
            href="/resume/AlexShibu_2025_General.pdf"
            target="_blank"
            className="px-4 py-2 bg-white text-red-500 border border-red-500 rounded-md text-sm hover:bg-red-50 transition-colors"
          >
            Download PDF
          </a>
        </div>
      </section>
    </main>
  );
}
