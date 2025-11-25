export default function Home() {
  return (
    <>
      <div className="content-container">
        <h1>Welcome</h1>
        <p>Your content goes here.</p>
      </div>

      <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4 mt-auto">
        <aside>
          <p>
            Last edited {new Date().toLocaleDateString()} - God bless the
            hustle, Made with ❤️ Alex Shibu
          </p>
        </aside>
      </footer>
    </>
  );
}
