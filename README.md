# SM TECH — Corporate Website

(주)에스엠테크 공식 홈페이지 — 정밀가공·방산·항공·우주 산업 전문기업.

## 🌐 Live
- **Production**: (배포 후 URL 추가)
- **Preview**: (Vercel preview 링크)

## 🛠 Stack
- **Static HTML/CSS/JS** — Vanilla, no build step required
- **Hosting**: Vercel
- **Backend (예정)**: Firebase (Firestore + Auth + Cloud Functions)

## 📁 Structure
```
smtec/
├── index.html              # 메인
├── css/style.css           # 디자인 시스템
├── js/main.js              # 인터랙션 (slider / nav / counters)
├── img/                    # 이미지 자산
│   ├── company/            # 회사 사진
│   ├── facility/           # 공장 / 시설
│   ├── instruments/        # 계측기
│   ├── process/            # 공정 사진
│   ├── products/           # 방산 / 항공 / 위성 부품
│   ├── certs/              # 인증서
│   └── clients/            # 고객사 로고
├── pages/                  # 16개 서브 페이지
│   ├── greeting / philosophy / history / certifications / organization / location
│   ├── business / clients
│   ├── defense / aerospace / satellite
│   ├── equipment / instruments
│   ├── process
│   └── notices / inquiry
├── admin/                  # 관리자 (UI 데모 — 백엔드 연결 필요)
│   ├── login.html
│   └── dashboard.html
├── vercel.json             # Vercel 배포 설정
├── robots.txt
└── sitemap.xml
```

## 🚀 Deployment

### Vercel
```bash
git push    # GitHub로 push 시 자동 배포
```
또는 Vercel CLI:
```bash
vercel --prod
```

## 🔐 Security Notes
- `/admin/` 경로는 `noindex,nofollow` + `Cache-Control: no-store` 적용
- 관리자 로그인은 **UI 데모** — 운영 시 Firebase Auth 등 백엔드 인증 필수
- 폼 제출, 공지사항 CRUD는 향후 Firebase Firestore + Cloud Functions로 연결 예정

## 📞 Contact
- 주소: 경상북도 칠곡군 약목면 무림4길 51
- TEL: 054-977-9113~4
- FAX: 054-977-9115
- E-MAIL: smtec@smtec.or.kr
