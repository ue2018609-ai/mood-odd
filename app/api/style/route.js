import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { image } = await request.json();

    if (!image?.startsWith("data:image/")) {
      return Response.json({ error: "옷 사진을 먼저 골라줘." }, { status: 400 });
    }

    const response = await openai.responses.create({
      model: "gpt-5.6-sol",
      instructions:
        "너는 스트리트 패션 사이트 MOOD ODD의 스타일리스트다. 차분하지만 낯설고 개성 있는 스트리트 무드를 유지한다. 사용자가 올린 옷을 중심으로 실제 입을 수 있는 코디를 한국어로 추천한다.",
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: "사진 속 옷을 중심으로 코디를 만들어줘. 상의, 하의, 신발, 액세서리를 각각 한 줄로 쓰고 마지막에 전체 무드를 한 문장으로 설명해줘. 새깅 스타일이 어울리면 자연스럽게 반영해줘.",
            },
            {
              type: "input_image",
              image_url: image,
              detail: "auto",
            },
          ],
        },
      ],
    });

    return Response.json({ recommendation: response.output_text });
  } catch (error) {
    console.error("AI stylist request failed:", error?.status || error?.name);
    if (error?.status === 401) {
      return Response.json(
        { error: "저장한 API 키를 다시 확인해줘." },
        { status: 500 },
      );
    }
    if (error?.status === 429) {
      return Response.json(
        { error: "OpenAI 사용 한도가 비어 있어. 결제 설정을 확인해줘." },
        { status: 500 },
      );
    }
    return Response.json(
      { error: "AI가 잠깐 멈췄어. 잠시 후 다시 눌러줘." },
      { status: 500 },
    );
  }
}
