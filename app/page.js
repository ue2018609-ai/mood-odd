"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Home() {
  const page = useRef();

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

      <section className="look-card">
        <img
          className="look"
          src="/looks/mood-odd-look-02.png"
          alt="검정 오버핏 셔츠와 데님 반바지, 흰색과 검정 운동화를 조합한 코디"
        />
        <div className="look-info">
          <span>LOOK 01</span>
          <h1>Quiet Distortion</h1>
          <p>차분한 검정 안에 낯선 비율을 얹은 스트리트 룩</p>
          <dl>
            <div><dt>TOP</dt><dd>블랙 오버핏 셔츠</dd></div>
            <div><dt>BOTTOM</dt><dd>와이드 데님 쇼츠</dd></div>
            <div><dt>SHOES</dt><dd>화이트 &amp; 블랙 스니커즈</dd></div>
          </dl>
        </div>
      </section>

      <section className="look-card">
        <img
          className="look"
          src="/looks/mood-odd-look-03-bape.png"
          alt="차콜 후드집업과 네이비 스트라이프 쇼츠, 베이프 신발을 조합한 새깅 코디"
        />
        <div className="look-info">
          <span>LOOK 02</span>
          <h1>Low Signal</h1>
          <p>낮게 떨어지는 실루엣에 선명한 흰색 선을 섞은 스트리트 룩</p>
          <dl>
            <div><dt>TOP</dt><dd>블랙 차콜 후드집업</dd></div>
            <div><dt>BOTTOM</dt><dd>네이비 스트라이프 쇼츠</dd></div>
            <div><dt>SHOES</dt><dd>블랙 &amp; 화이트 베이프 스타</dd></div>
          </dl>
        </div>
      </section>

    </main>
  );
}
