// 모바일 크기 네비게이션 토글
function toggleMenu() {
  const $navMenu = document.getElementById("nav__menu");
  $navMenu.classList.toggle("show");
}

function handleFloatingButton() {
  // 플로팅 버튼
  const $floationButton = document.getElementById("floationg-button");
  $floationButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      // behavior: "smooth",
    });
  });
}

// 초기화 함수
function init() {
  const $navToggle = document.getElementById("nav-toggle");
  $navToggle.addEventListener("click", () => {
    // Menu Toggle
    toggleMenu();
  });

  const $navLinkList = document.querySelectorAll(".nav__link ");
  $navLinkList.forEach((el) => el.addEventListener("click", toggleMenu));

  handleFloatingButton();
}

init();

// 화면 감지 네비게이션 바

const options = {
  threshold: 1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const sectionId = entry.target.id;
    if (entry.isIntersecting) {
      document
        .querySelector(`.nav__link[href*=${sectionId}]`)
        .classList.add("active-link");

      const $items = document.querySelectorAll(
        `.nav__link:not([href*=${sectionId}])`,
      );
      $items.forEach((el) => el.classList.remove("active-link"));
    }
  });
}, options);

const $sectionList = document.querySelectorAll(".section");
$sectionList.forEach((el) => observer.observe(el));

// 스크롤 애니메이션
const scrollReveal = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2000,
  delay: 200,
});
scrollReveal.reveal(
  ".home__data, .about__container, .certificate__data, .skills__stack, .skills__menu,.work__card",
);
scrollReveal.reveal(".about__data, .work__info-img", { delay: 400 });
scrollReveal.reveal(" .contact__input, .work__detail-btn, .work__stack", {
  interval: 200,
});

// skills 창

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".skills__button");
  const stackContents = document.querySelectorAll(".skills__stack > div");

  // 페이지 로드 시 첫 번째 영역(Frontend)만 활성화
  if (stackContents.length > 0) {
    stackContents[0].classList.add("active");
  }

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      // 1. 모든 버튼에서 활성화 클래스 제거 후 클릭된 버튼만 활성화
      buttons.forEach((btn) => btn.classList.remove("skills__active"));
      button.classList.add("skills__active");

      // 2. Frontend를 포함한 모든 스택 영역에서 active 클래스 제거 (전체 숨김)
      stackContents.forEach((content) => content.classList.remove("active"));

      // 3. 클릭한 메뉴의 순서와 일치하는 스택 영역에만 active 클래스 추가 (단일 노출)
      if (stackContents[index]) {
        stackContents[index].classList.add("active");
      }
    });
  });
});

const typeit = new TypeIt("#typeit", {
  speed: 70,
  startDelay: 1300,
  waitUntilVisible: true,
});

// 타이핑 액션
typeit
  .type("안녕하세요.<br/>")
  .type(
    '<strong class="home__title-color">사용자의 경험을 고려하는</strong><br />',
  )
  .type('<strong class="home__title-color-2">NohMyeongjin</strong>', {
    delay: 300,
  })
  .delete(12)
  .type(
    '웹&nbsp;개발자&nbsp;<strong class="home__title-color-2">노명진</strong>입니다.',
  )
  .go();

// 안녕하세요. <br />
// <strong class="home__title-color">사용자의 경험을 고려하는</strong><br />
// 웹&nbsp;개발자&nbsp;<strong class="home__title-color-2">노명진</strong>입니다.

// 이메일 클라이언트 열기
const $contactForm = document.getElementById("contactForm");

$contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // 폼 하위 정보를 갖고
  const name = $contactForm.name.value;
  const subject = $contactForm.subject.value;
  const message = $contactForm.message.value;
  const to = "mjnoh.dev@gmail.com";

  // 이메일 클라이언트 열기
  location.href =
    "mailto:" +
    encodeURIComponent(to) +
    "?subject=" +
    encodeURIComponent(`[${name}님 문의]${subject}`) +
    "&body=" +
    encodeURIComponent(message);
});

// work 버튼 접기
function toggleDetail(buttonElement) {
  const parentCard = buttonElement.closest(".work__card");
  const content = parentCard.querySelector(".work__detail-content");
  const arrow = parentCard.querySelector(".btn-icon");

  // collapsed 클래스 토글 (내용 펼치기/접기)
  const isCollapsed = content.classList.toggle("collapsed");

  // 아이콘 180도 회전용 active 클래스 토글
  arrow.classList.toggle("active");

  // 버튼 텍스트 변경
  if (isCollapsed) {
    buttonElement.textContent = "주요 성과 및 기능 보기";
  } else {
    buttonElement.textContent = "주요 성과 및 기능 접기";
  }
}
