"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Home() {
  const page = useRef();
  const [openLook, setOpenLook] = useState(null);

  const looks = [
    {
      id: "look-01",
      number: "LOOK 01",
      title: "Quiet Distortion",
      image: "/looks/mood-odd-look-02.png",
      alt: "Black oversized tee, denim shorts, and black white sneakers street outfit",
      mood: "차분한 블랙에 낯선 비율을 섞은 스트릿 룩.",
      items: [
        ["TOP", "Balenciaga black tee"],
        ["BOTTOM", "Denim sagging shorts"],
        ["SHOES", "Louis Vuitton black and white sneaker"],
      ],
    },
    {
      id: "look-02",
      number: "LOOK 02",
      title: "Low Signal",
      image: "/looks/mood-odd-look-03-bape.png",
      alt: "Black zip hoodie, navy striped shorts, and Bape sneakers street outfit",
      mood: "새깅 실루엣에 선명한 라인을 얹은 스트릿 룩.",
      items: [
        ["TOP", "Black zip hoodie"],
        ["BOTTOM", "Thom Browne navy shorts"],
        ["SHOES", "Bape black and white sneaker"],
      ],
    },
  ];

  useGSAP(() => {
    const motion = gsap.matchMedia();

    motion.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "+=90%",
          scrub: 1,
          pin: true,
        },
      })
        .to(".hero-title", {
          letterSpacing: "0.5em",
          opacity: 0,
          scale: 0.96,
          ease: "none",
        })
        .to(".scroll-hint", { opacity: 0, ease: "none" }, 0);

      gsap.utils.toArray(".look-card").forEach((card) => {
        const image = card.querySelector(".look");
        const info = card.querySelector(".look-info");

        gsap.from(card, {
          clipPath: "inset(14% 0 0 0)",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            end: "top 35%",
            scrub: 1,
          },
        });

        gsap.from(image, {
          scale: 1.08,
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            end: "top 35%",
            scrub: 1,
          },
        });

        gsap.from(info, {
          y: 48,
          opacity: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 65%",
          },
        });
      });
    });

    return () => motion.revert();
  }, { scope: page });

  return (
    <main ref={page}>
      <section className="hero">
        <h1 className="hero-title">MOOD ODD</h1>
        <span className="scroll-hint">SCROLL TO DISCOVER</span>
      </section>

      {looks.map((look) => (
        <section className="look-card" id={look.id} key={look.id}>
          <button className="look-frame" type="button" onClick={() => setOpenLook(look)}>
            <img className="look" src={look.image} alt={look.alt} />
          </button>
          <div className="look-info">
            <span>{look.number}</span>
            <h1>{look.title}</h1>
            <p>{look.mood}</p>
            <dl>
              {look.items.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      ))}

      {openLook && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setOpenLook(null)}>
          <button className="lightbox-close" type="button" aria-label="Close image">
            CLOSE
          </button>
          <img src={openLook.image} alt={openLook.alt} />
        </div>
      )}
    </main>
  );
}
