# Healing Survey Landing

20-30대 사용자를 위한 풀스크린 타입폼 스타일 힐링 진단 웹앱입니다. 유언 프로젝트, 무드 진단, 아로마 북 테라피 중 하나를 선택하면 맞춤 질문을 통해 힐링 유형과 체험 키트를 추천하고, 관리자 페이지에서 신청 및 인터뷰 데이터를 확인할 수 있습니다.

## Pages

- `index.html` - 메인 힐링 진단 폼
- `interview.html` - 참여자 힐링 경험 인터뷰 폼
- `admin.html` - 관리자 대시보드

## Features

- 풀스크린 설문 UX와 단계별 진행 바
- 서비스별 동적 배경 테마
- 32가지 힐링 결과 타입 진단
- 체험단 신청 정보 저장
- 인터뷰 작성 및 아카이브 표시
- 관리자 상세 보기, 삭제, CSV 다운로드
- 관리자 페이지 내 진단 결과지 PDF / 인터뷰 결과지 PDF 출력

## File Structure

```text
.
├── index.html
├── app.js
├── interview.html
├── interview.js
├── admin.html
├── admin.js
├── firebase-config.js
├── firebase-service.js
├── firebase.json
├── firestore.rules
├── style.css
├── hero_background.jpg
└── hero_background.webp
```

## Run Locally

정적 사이트라 별도 빌드 과정은 없습니다.

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/index.html
```

## Data Storage

운영 데이터는 Firebase Firestore에 저장됩니다. Firebase SDK 로딩 또는 네트워크가 실패할 때만 브라우저 `localStorage`를 fallback으로 사용합니다.

- `healing_submissions` - 진단 신청 및 관리자 대시보드 데이터
- `healing_interviews` - 인터뷰 응답 데이터

배포용 자동 샘플 데이터 주입은 제거되어 있습니다. 테스트 데이터가 필요하면 관리자 페이지의 `Mock 데이터 생성` 버튼을 사용하면 됩니다.

## Admin

관리자 페이지:

```text
admin.html
```

관리자 페이지에서 할 수 있는 작업:

- 전체 신청자 통계 확인
- 서비스별 필터링
- 이름/연락처 검색
- 신청 상세 보기
- 신청 삭제
- CSV 다운로드
- 진단 결과지 PDF 출력
- 인터뷰 상세 보기
- 인터뷰 삭제
- 인터뷰 결과지 PDF 출력

## Firebase Deployment

Firebase Hosting과 Firestore Rules 배포:

```bash
firebase deploy --only hosting,firestore:rules --project social-type-form-8293
```

현재 Firebase 구성:

- Firebase project: `social-type-form-8293`
- Web app name: `healing`
- Hosting site: `healing-f581d`
- Firestore location: `asia-northeast3`

## GitHub Deployment

`main` 브랜치에 push하면 Firebase Hosting 배포를 실행하는 GitHub Actions workflow가 포함되어 있습니다.

GitHub repo secret에 아래 값을 추가해야 자동 배포가 동작합니다.

```text
FIREBASE_SERVICE_ACCOUNT_SOCIAL_TYPE_FORM_8293
```

## Notes

- PDF 기능은 브라우저 인쇄 기능을 사용합니다. 버튼을 누른 뒤 인쇄 창에서 `PDF로 저장`을 선택하면 됩니다.
- `admin.html`과 Firestore Rules는 현재 운영 테스트를 위해 공개 읽기/쓰기로 열려 있습니다. 실제 공개 운영 전에는 Firebase Auth 또는 관리자 비밀번호 기반 접근 제어가 필요합니다.
