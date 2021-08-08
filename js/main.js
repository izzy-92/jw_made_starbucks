const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');

// 클릭이벤트 추가
searchEl.addEventListener('click', function() {
    //Logic..
    searchInputEl.focus(); 
});
// input요소에 focus가 적용되었을때
searchInputEl.addEventListener('focus', function(){
    searchEl.classList.add('focused'); 
    searchInputEl.setAttribute('placeholder' , '통합검색'); 
});
// input 요소에 focus가 해제되었을때
searchInputEl.addEventListener('blur', function(){
    searchEl.classList.remove('focused'); //제거
    searchInputEl.setAttribute('placeholder' , ''); 
});
// 스크롤의 값이 일정값이상 커졌을때 우측배지가 화면에서 사라지도록 만들기 위함.
const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');
/*
gsap.to('#to-top' 이라는 선택자를 대신해서 toTopEl 변수로 대체해서 사용해준다.
*/

window.addEventListener('scroll', _.throttle(function () {
    console.log(window.scrollY);
    // 만약에 window.scrollY 이라는 값이 500보다 커지면
    if (window.scrollY > 500) { 
        // 배지 숨기기
        // gsap.to(요소, 지속시간, 옵션);을 추가한다.
        gsap.to(badgeEl, .6, {
            opacity: 0,
            display: 'none' // 실제 요소를 제거해주기 위해 display 속성 추가.
        });
        // 버튼 보이기!(우측 페이지상단버튼)
        gsap.to(toTopEl, .2, {
            x: 0 /* 원래 위치인 0으로 설정. */
        });
    } else {
        // 500이하인 경우 배지 보이기
        gsap.to(badgeEl, .6, {
            opacity: 1,
            display: 'block'
        });
        // 버튼 숨기기! (우측 페이지상단버튼)
        gsap.to(toTopEl, .2, {
            x: 100  /*오른쪽으로 100px 움직이게 해준다. */
        });
    }
 }, 300));
 //_.throttle(함수, 시간)

// 상단 스크롤 클릭이벤트
 toTopEl.addEventListener('click', function() {
     //하나의 창 의미, js라이브러리가 window 객체를 통해서 화면자체를 특정한위치로 옮겨줄수있다.
     gsap.to(window, .7, { //0.7초동안
         scrollTo: 0       // 스크롤의 위치(=화면의위치)를 0으로 옮겨준다. 
     });
 });

//  순차적 애니메이션 설정을 위한 변수 선언 시작
const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function (fadeEl, index) { // 두개의 매개변수
    // gsap.to(요소, 지속시간, 옵션);
    gsap.to(fadeEl, 1, {
        delay: (index + 1)*.7, // 0.7, 1.4, 2.1, 2.7
        opacity: 1
    });
});


// Swiper(슬라이드 기능 정의)

// new Swiper(선택자, 옵션)
new Swiper('.notice-line .swiper-container', {
    direction: 'vertical',
    autoplay: true,
    loop: true
});

new Swiper('.promotion .swiper-container', {  //객체 데이터 생성(={})후 옵션 추가.
    slidesPerView: 3, // 한 페이지에 한번에 보여줄 슬라이드 개수
    spaceBetween: 10, // 슬라이드 사이 여백(10px)
    centeredSlides: true, // 1번 슬라이드가 가운데 보이기
    loop: true,
    autoplay: {
        delay: 5000
    },
// pagination 이라는 옵션을 추가한 후 객체 데이터를 하나 할당함.
    pagination: {
        el: '.promotion .swiper-pagination',  // 페이지 번호 요소 선택자
        clickable: true // 사용자의 페이지 번호 요소 제어 가능 여부 (클릭이 가능한지에 대한 여부)
    },
    navigation: {
        prevEl: '.promotion .swiper-prev', //문자 데이터 할당
        nextEl: '.promotion .swiper-next'
    }
});

// 다중 요소 슬라이드 기능
new Swiper('.awards .swiper-container',{
    autoplay: true,  /* 자동 재생 */
    loop: true,      /* 반복 재생 */
    spaceBetween: 30, /* 사이사이의 여백 30px 설정 */
    slidesPerView: 5,  /* 하나의 슬라이드에 몇개까지 보여줄건지 개수설정. */
    // swiper-prev와 swiper-next를 실제로 슬라이드를 제어하는 용도로 사용하겠다고 선언해주기 위해 아래 옵션 추가.
    navigation: {
        prevEl: '.awards .swiper-prev',
        nextEl: '.awards .swiper-next'
    }
});

// 프로모션 토글 슬라이드 정의
const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false; 
promotionToggleBtn.addEventListener('click', function() {
    isHidePromotion = !isHidePromotion
    if (isHidePromotion) {
      // 숨김 처리! (true)
      promotionEl.classList.add('hide');
    } else {
      // 보임 처리! (false)
      promotionEl.classList.remove('hide');
    }
}); 
// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
    // `.toFixed()`를 통해 반환된 문자 데이터를,
    // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
    return parseFloat((Math.random() * (max - min) + min).toFixed(2))
  }
  
// youtube 반복 애니메이션
function floatingObject(selector, delay, size) {
    gsap.to(
        selector, // 선택자
        random(1.5, 2.5), { // 애니메이션 동작시간 / random(최소값,최대값)
        // 옵션
        y: size,
        repeat: -1,
        yoyo: true,
        ease: Power1.easeInOut, //easing 함수적용
        delay: random(0, delay)
    });

}
floatingObject('.floating1',1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3',1.5, 20); // 지연시간 1.5초 ,위아래 움직이는 범위는 20px지정.

// ScrollMagic
const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function (spyEl) {
    new ScrollMagic
     .Scene({
         triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 triggerElement에 지정.
         triggerHook: .8

     })
     .setClassToggle(spyEl,'show') 
     .addTo(new ScrollMagic.Controller()); /* ScrollMagic에서 기본적으로 우리가 추가한 옵션들을
                                내부의 컨트롤러에 내용을 할당해서 실제 동작할수있는 구조를 만들어줌.*/
});

// 올해가 몇년도인지 자동계산
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear();






 