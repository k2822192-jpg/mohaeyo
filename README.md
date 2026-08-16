# Mohaeyo — 사전예약 랜딩페이지

한국 남성 × 글로벌 여성 매칭 서비스 "Mohaeyo"의 사전예약(pre-launch) 랜딩페이지.
순수 HTML/CSS/JS로 만들어져 있어 별도 빌드 과정 없이 바로 배포 가능합니다.

## 파일 구성
- `index.html` — 페이지 구조
- `style.css` — 디자인 (다크 톤 + 코랄 포인트, Fraunces/Manrope 폰트)
- `i18n.js` — 10개 언어(한/영/중/일/이/불/스/포/러/독) 번역 데이터
- `app.js` — 언어 자동감지·전환, 사전예약 폼 처리

## 로컬에서 확인하기
```bash
cd mohaeyo
python3 -m http.server 8000
# 브라우저에서 http://localhost:8000 접속
```

## ⚠️ 사전예약 폼에 대해
지금 폼은 **이메일 형식만 검증하고 실제로 어디에도 저장하지 않습니다** (콘솔 로그만 남김).
실제로 이메일을 수집하려면 아래 중 하나로 `app.js`의 `wireForm` 함수 안 TODO 부분을 교체하세요:
- Formspree / Getform 같은 폼 백엔드 서비스 (가장 빠름)
- Mailchimp / Buttondown 같은 이메일 마케팅 툴의 API
- Supabase 테이블 + 서버리스 함수 (추후 실제 앱과 같은 인프라를 쓸 계획이면 이 방법 추천)

## 배포 순서 (GitHub → Vercel → 도메인 연결)

### 1. GitHub에 올리기
```bash
cd mohaeyo
git init
git add .
git commit -m "Mohaeyo landing page"
git branch -M main
gh repo create mohaeyo --public --source=. --remote=origin --push
# gh CLI가 없다면 github.com에서 저장소를 먼저 만든 뒤:
# git remote add origin https://github.com/<사용자명>/mohaeyo.git
# git push -u origin main
```

### 2. Vercel에 배포
1. https://vercel.com 에서 GitHub 계정으로 로그인
2. "Add New Project" → 방금 만든 `mohaeyo` 저장소 선택
3. Framework Preset은 "Other"(정적 사이트)로 두고 Deploy
4. `xxx.vercel.app` 임시 주소 발급 확인

### 3. 커스텀 도메인 연결
1. Vercel 프로젝트 → Settings → Domains → 구매한 도메인 입력 (예: mohaeyo.com)
2. 화면에 뜨는 A 레코드 / CNAME 레코드 값을 기록
3. 스퀘어스페이스 도메인 대시보드(빌더 아님, 도메인 관리 화면) → DNS Settings
4. 기존 Squarespace 기본값 삭제 → Vercel이 알려준 A/CNAME 레코드로 교체 → 저장
5. DNS 전파까지 몇 분~최대 24시간 소요
