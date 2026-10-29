# 회의밥 — 무료 정적 사이트 배포용

예정 주소: https://moa-note.github.io/hoeui-bap/
현재는 로컬 패키지이며 아직 GitHub에 공개되지 않았습니다.

## 첫 게시
1. GitHub에서 New repository → 이름 hoeui-bap → Public → Add a README file 체크 → Create repository.
2. 이 폴더의 docs, app, lib, data, public, scripts 폴더와 package.json, package-lock.json, tsconfig.json, next.config.ts, next-env.d.ts, README.md를 업로드합니다. node_modules, .next-pages, out, .env 파일은 업로드하지 않습니다. 준비된 업로드 ZIP을 압축 해제하면 공개 가능한 파일만 들어 있습니다.
3. 저장소 Settings → Pages → Source: Deploy from a branch → Branch: main, 폴더: /docs → Save.
4. Pages 게시가 끝나면 위 예정 주소에서 확인합니다.

## 자료 수정
data/local-vendors.json을 수정하고 npm ci → npm run build. 생성된 docs를 포함해 변경 파일을 저장소에 업로드하면 Pages가 다시 게시됩니다. Google Forms 응답 시트는 공개하거나 자동으로 읽지 않습니다. 승인할 제안만 수동 반영합니다. 인안·아이엠·열두달 자료는 제보이며 업체 확인일은 별개입니다. 사진 사용 허락을 확인한 자료만 공개하세요.

## 로컬 검증
npm ci
npm run build
npm run preview
http://127.0.0.1:3200/hoeui-bap/

GitHub Pages에는 서버/API/로그인/업로드 처리기가 없습니다. 추천과 파일 업로드는 연결된 Google Forms에서 처리되며 Google 로그인이 필요합니다. 업로드·응답 시트는 운영자 계정에서만 관리합니다. 이 패키지에는 비밀키·.env.local·응답 원본·관리자 서버 코드를 포함하지 않았습니다. 코드와 공개 업체 자료는 공개 저장소에서 누구나 볼 수 있습니다.
