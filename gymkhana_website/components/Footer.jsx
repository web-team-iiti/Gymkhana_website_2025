import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaCode,
} from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import Image from "next/image";

const Footer = () => {
  const footItemClasses = `flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-slate-300 transition-colors hover:border-amber-300 hover:bg-amber-300 hover:text-[#0d2234]`;

  return (
    <footer className="outfit-font w-full bg-[#0d2234] text-slate-200">
      <div className="mx-auto max-w-screen-xl px-6 py-10 sm:px-8 md:py-12 lg:px-12">
        <div className="grid gap-10 border-b border-amber-200/50 pb-9 md:grid-cols-[1.15fr_1fr_0.85fr] md:gap-12">
          <div>
            <div className="flex items-center gap-4">
              <Image
                src="/main_logo.png"
                alt="IIT Indore Students' Gymkhana logo"
                width={72}
                height={72}
                className="h-[72px] w-[72px] bg-gray-500/50 rounded-full object-contain p-1.5"
              />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-300">
                  IIT Indore
                </p>
                <h2 className="mt-1 text-xl font-semibold leading-tight text-white sm:text-2xl">
                  Students&apos; Gymkhana
                </h2>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">
              The student body bringing campus communities, events, and
              initiatives together.
            </p>
          </div>

          <section aria-labelledby="footer-contact-heading">
            <h2
              id="footer-contact-heading"
              className="mb-5 text-sm font-semibold uppercase tracking-[0.14em] text-amber-300"
            >
              Contact Us
            </h2>
            <ul className="space-y-4 text-sm leading-6 text-slate-300">
              <li className="flex items-start gap-3">
                <MdEmail className="mt-1 shrink-0 text-lg text-amber-300" />
                <a
                  href="mailto:studentgym@iiti.ac.in"
                  className="transition-colors hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  studentgym@iiti.ac.in
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MdLocationOn className="mt-1 shrink-0 text-lg text-amber-300" />
                <a
                  href="https://www.google.com/maps/place/Indian+Institute+of+Technology+Indore/@22.5203748,75.9201363,15z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  Indian Institute of Technology Indore,
                  <br />
                  Khandwa Road, Simrol,
                  <br />
                  Indore 453552
                </a>
              </li>
            </ul>
          </section>

          <section aria-labelledby="footer-follow-heading">
            <h2
              id="footer-follow-heading"
              className="mb-5 text-sm font-semibold uppercase tracking-[0.14em] text-amber-300"
            >
              Follow Us
            </h2>
            <div className="flex items-center gap-2">
              <a
                href="https://www.facebook.com/iitindore/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className={footItemClasses}
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.instagram.com/iitindore/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={footItemClasses}
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.linkedin.com/school/iit-indore/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={footItemClasses}
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://twitter.com/IITIOfficial"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className={footItemClasses}
              >
                <FaTwitter />
              </a>
            </div>
            <a
              href="/dev-team"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-5 inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
            >
              <FaCode className="text-amber-300 transition-transform group-hover:scale-110" />
              Dev Team
            </a>
          </section>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 pt-6 text-center text-xs text-white sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} Students&apos; Gymkhana, IIT Indore.
            All Rights Reserved.
          </p>
          <span
            className="h-px w-12 bg-amber-200/70 sm:hidden"
            aria-hidden="true"
          />
          <p className="uppercase tracking-[0.12em]">
            A student-led initiative
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
