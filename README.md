# Kim Minsu Portfolio

GitHub Pages 배포용 개인 CV/Resume 포트폴리오입니다. `instruction.md` 요구사항에 맞춰 HTML, CSS, JavaScript만 사용했습니다.

## 구성

- `index.html`: About, Education, Skills, Projects, Experience, Resume, Contact 본문
- `styles.css`: 반응형 레이아웃, 이미지 카드, 스크롤/커서/터치 인터랙션 스타일
- `script.js`: 스크롤 진행률, 섹션 애니메이션, 커서/터치 효과, 카드 틸트, GitHub 프로필 연동
- `resource/`: 프로젝트 썸네일, 활동 이미지, VA-AFS 보고서 PDF
- `resource/moveon-thumbnail.png`: Moveon 프로젝트용 생성 이미지
- `resume.md`: PDF 생성용 간단 이력서 원본
- `resume.pdf`: 제출용 이력서 PDF

## 반영 정보

- GitHub: <https://github.com/Kiim-Miin-Su>
- Email: `kms545487@gmail.com`
- Notion: <https://www.notion.so/My_Study-24ce54b2d72f8067ae2af57883c0c8e1>
- Portfolio focus: AI Backend Developer, ML Inference Service Engineer
- Moveon integration: <https://www.notion.so/Project-Move-on-346e54b2d72f80af9318e3a1ca513137>
- Ownership focus: 기획, 기술 개발, 통합 설계, Jira-Notion workflow

## 수정 가이드

- 새 프로젝트는 `index.html`의 `.project-card` 블록을 복사한 뒤 이미지, 제목, 설명, `.project-facts`, `.project-links`만 바꿉니다.
- 새 기술은 `#skills`의 `.skill-card`를 복사해서 제목, 진행도 `width`, 설명을 바꿉니다.
- 색상과 전체 폭은 `styles.css`의 `:root` 변수에서 수정합니다.
- 이력서 내용은 `resume.md`를 수정한 뒤 `cupsfilter -i text/plain -m application/pdf resume.md > resume.pdf`로 다시 생성합니다.

## 참고한 GitHub Pages 포트폴리오

- Jo Jae-sung: <https://jojoldu.github.io/>
- Xu Lin: <https://islinxu.github.io/>
- Aravind V P: <https://vparavind.github.io/>
- Nikhil Chowdary Paleti: <https://nikhil-paleti.github.io/>
- Omkar Thorve: <https://chashmishcoder.github.io/>

## 배포

GitHub 저장소에 push한 뒤 `Settings > Pages`에서 배포 소스를 선택합니다.

- Repository URL: `https://github.com/Kiim-Miin-Su/portfolio`
- GitHub Pages URL: `https://kiim-miin-su.github.io/portfolio`

사용자 계정 페이지 저장소 이름을 `Kiim-Miin-Su.github.io`로 만들 경우 URL은 `https://kiim-miin-su.github.io`입니다.

## 제출 전 확인

- PDF에는 주민등록번호, 상세 주소 등 민감한 개인정보를 포함하지 않는 것을 권장합니다.
