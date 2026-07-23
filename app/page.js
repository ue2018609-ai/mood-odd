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
      alt: "검정 오버핏 티셔츠와 데님 반바지, 검흰 운동화를 조합한 스트릿 코디",
      mood: "차분한 검정에 낯선 비율을 얹은 스트릿 룩.",
      items: [
        ["상의", "발렌시아가 블랙 티셔츠"],
        ["하의", "데님 새깅 반바지"],
        ["신발", "루이비통 검흰 스니커즈"],
      ],
    },
    {
      id: "look-02",
      number: "LOOK 02",
      title: "Low Signal",
      image: "/looks/mood-odd-look-03-bape.png",
      alt: "블랙 후드집업과 네이비 반바지, 베이프 운동화를 조합한 스트릿 코디",
      mood: "새깅 실루엣에 선명한 흰 라인을 얹은 스트릿 룩.",
      items: [
        ["상의", "블랙 후드집업"],
        ["하의", "톰브라운 네이비 반바지"],
        ["신발", "베이프 검흰 스니커즈"],
      ],
    },
    {
      id: "look-03",
      number: "LOOK 03",
      title: "Cap Shadow",
      image: "/looks/mood-odd-look-04-cap.png",
      alt: "검정 폴로티와 그레이 카고 데님, 루이비통 신발과 검정 모자를 조합한 스트릿 코디",
      mood: "검정 모자로 시선을 낮추고, 넓은 카고 데님으로 무게를 만든 룩.",
      items: [
        ["모자", "블랙 볼캡"],
        ["상의", "블랙 폴로티"],
        ["하의", "그레이 카고 데님 팬츠"],
        ["신발", "루이비통 검흰 스니커즈"],
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
        <img className="hero-image" src="/looks/mood-odd-look-03-bape.png" alt="" aria-hidden="true" />
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
          <button className="lightbox-close" type="button" aria-label="이미지 닫기">
            닫기
          </button>
          <img src={openLook.image} alt={openLook.alt} />
        </div>
      )}
    </main>
  );
}
