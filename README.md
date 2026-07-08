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

현재 데이터는 브라우저 `localStorage`에 저장됩니다.

- `healing_submissions` - 진단 신청 및 관리자 대시보드 데이터
- `healing_interviews` - 인터뷰 응답 데이터

브라우저 또는 기기가 바뀌면 데이터가 공유되지 않습니다. 실제 운영 환경에서는 Firebase, Supabase, Airtable, Google Sheets API 같은 외부 DB 연동이 필요합니다.

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

## Deployment

GitHub Pages, Vercel, Netlify 같은 정적 호스팅에 바로 배포할 수 있습니다.

GitHub Pages 기준:

1. Repository Settings로 이동
2. Pages 메뉴 선택
3. Source를 `main` branch / root로 설정
4. 배포 URL에서 `index.html` 확인

## Notes

- PDF 기능은 브라우저 인쇄 기능을 사용합니다. 버튼을 누른 뒤 인쇄 창에서 `PDF로 저장`을 선택하면 됩니다.
- `admin.html`은 별도 인증이 없으므로 공개 배포 시 접근 제어가 필요합니다.
