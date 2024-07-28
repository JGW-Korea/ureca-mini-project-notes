// Tool Bar Options 지정
const toolbaroptions = [
  ["bold", "italic", "underline", "strike"], // 폰트 스타일 버튼 추가
  [
    { header: [1, 2, 3, 4, 5, 6, false] }, // 헤더 사이즈 지정 버튼 추가
  ],
  [{ list: "ordered" }, { list: "bullet" }], // 리스트 버튼 추가
  [{ indent: "+1" }, { indent: "-1" }], // 인덴트(띄어쓰기) 버튼 추가
  ["image", "video"], // 멀티 미디어 버튼 추가
];

export const quill = new Quill("#editor", {
  modules: {
    toolbar: toolbaroptions,
  },

  theme: "snow",
});

let seletedMemoNo;

// quill.on("text-change", function (delta, oldDelta, source) {});

export const setContent = (content, no) => {
  const delta = JSON.parse(content);
  seletedMemoNo = no;
  quill.setContents(delta);
};
