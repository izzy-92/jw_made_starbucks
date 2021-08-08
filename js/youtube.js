// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
function onYouTubeIframeAPIReady() {
    /* Player라는 메소드가 실행되고 있는데 거기에 첫번째 인수로 'player'라고 지정되어있는 부분은 
       <div id="player"></div> 지정한 id의 속성값이 들어가는것. */
    new YT.Player('player', {
        videoId: 'An6LvWQuj_8', //최초 재생할 유튜브 영상 ID
        playerVars: {       // 영상을 재생하기위한 여러가지 변수들 , 객체데이터 생성
            autoplay: true, // 자동 재생 유무
            loop: true,     // 반복 재생 유무
            playlist: 'An6LvWQuj_8' // 반복 재생할 비디오 id값을 다시 넣어주어야함.
        },
        //추가적인 옵션을 넣는다. (위에 콤마 주의!)
        events: {
            //위에 영상이 준비가 되면..
            onReady: function(event) {  //익명의 함수 하나 할당.(=onReady라는 메소드가 실행되면..)
                event.target.mute()     //음소거 처리
            }
        }
    });
}