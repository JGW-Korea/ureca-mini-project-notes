// Youtube iframe API
const tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api"; // youtube iframe API 가져오기

const firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag); // insertBefore( '추가할 태그', '어느 위치 뒤에 추가할 것인지' );

function onYouTubeIframeAPIReady() {
  // Iframe의 YT 클래스의 정적 메서드 Player("Id 속성값", 옵션(Object))
  new YT.Player("player", {
    videoId: "xg1gNlxto2M",

    playerVars: {
      autoplay: true, // 자동 재생 유무
      loop: true, // 반복 재생 유무
      playlist: "u9vK5utTcxE", // 반복 재생할 유튜브 영상 ID 목록
      controls: 0,
      disablekb: 1,
    },

    events: {
      onReady(event) {
        event.target.mute(); // mute -> 음소거
      },
    },
  });
}
