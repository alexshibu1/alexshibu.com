"use client";

import Link from "next/link";

export default function EmailPage() {
  return (
    <main className="page-content">
      <h1 className="hero-heading" style={{ marginBottom: "0.5rem" }}>
        email
      </h1>
      <p className="text-base text-gray-600 mb-4">
        I&apos;ll add my favorite cold emails I&apos;ve sent and others found on
        internet rabbit holes.
      </p>

      <p className="text-sm text-gray-700">
        I was a tiny boy when I discovered the power of the internet. You are
        simply 1 email away from some of the post powerful people on earth. Keep
        in mind these are a few that worked out of a thousands of fails.
      </p>
      <div>
        <img
          src="/images/cold/cold1.png"
          alt="Email"
          style={{ width: "50%", height: "auto" }}
        />
        <img
          src="/images/cold/cold2.png"
          alt="Email"
          style={{ width: "50%", height: "auto" }}
        />
        <img
          src="/images/cold/cold3.png"
          alt="Email"
          style={{ width: "50%", height: "auto" }}
        />
        <div className="my-3 sm:my-4 px-3 sm:px-4 py-0.5 bg-neutral-100 border-l-4 border-neutral-300 rounded-r-lg text-neutral-600 italic text-sm leading-tight">
          <p className="m-0">this was awesome</p>
        </div>
        <div>
          <img
            src="/images/cold/cold4.png"
            alt="Email"
            style={{ width: "100%", height: "auto" }}
          />
          <div className="my-3 sm:my-4 px-3 sm:px-4 py-0.5 bg-neutral-100 border-l-4 border-neutral-300 rounded-r-lg text-neutral-600 italic text-sm leading-tight">
            <p className="m-0">
              this is the first time i realized cold emails work. I eventually
              met the nice lady who approved this. I got free tix for the
              conferance. This was my playground for networking and picking up
              coporate guys for coffee.{" "}
              <a
                href="https://www.youtube.com/watch?v=-vPNeo5_ZU4"
                target="_blank"
                rel="noopener noreferrer"
              >
                link to the video
              </a>
            </p>
          </div>
        </div>
        <div>
          <img
            src="/images/cold/cold5.png"
            alt="Brand deal email"
            style={{ width: "100%", height: "auto" }}
          />
          <div className="my-3 sm:my-4 px-3 sm:px-4 py-0.5 bg-neutral-100 border-l-4 border-neutral-300 rounded-r-lg text-neutral-600 italic text-sm leading-tight">
            <p className="m-0">
              one of my first working brand deals for my then YouTube channel.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
