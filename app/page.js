export default function Home() {
  return (
    <main>
      <p className="title">MOOD ODD</p>
      <section className="look-card">
        <img
          className="look"
          src="/looks/mood-odd-look-02.png"
          alt="검정 오버핏 티셔츠와 데님 반바지, 흰색과 검정 운동화를 조합한 코디"
        />
        <div className="look-info">
          <span>LOOK 01</span>
          <h1>Quiet Distortion</h1>
          <p>차분한 검정 안에 낯선 비율을 섞은 스트리트 룩</p>
          <dl>
            <div><dt>TOP</dt><dd>워싱 오버핏 티셔츠</dd></div>
            <div><dt>BOTTOM</dt><dd>와이드 데님 쇼츠</dd></div>
            <div><dt>SHOES</dt><dd>화이트 &amp; 블랙 스니커즈</dd></div>
          </dl>
        </div>
      </section>
    </main>
  );
}
