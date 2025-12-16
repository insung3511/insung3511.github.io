# insung3511.github.io

이 저장소는 InSung Bahk 개인 포트폴리오 사이트(깃허브 페이지)용입니다. Vite로 빌드된 정적 파일(`dist/`)을 GitHub Actions를 통해 자동으로 GitHub Pages에 배포하도록 설정되어 있습니다.

배포 방법
- `main` 또는 `master` 브랜치에 푸시하면 자동으로 빌드 후 배포됩니다.
- 또는 GitHub Actions 탭에서 `Build and Deploy to GitHub Pages` 워크플로우를 수동 실행할 수 있습니다.

요구사항
- Node.js 20
- 루트에 있는 `package.json`에서 `build` 스크립트가 `vite build`로 정의되어 있어야 합니다 (현재 있음).

로컬 빌드 및 로컬 확인
```bash
npm install
npm run build
npm run preview
```

워크플로우 파일
- 경로: `.github/workflows/deploy.yml`
- 동작: `npm ci` → `npm run build` → `dist/` 업로드 → GitHub Pages 배포

참고
- GitHub 저장소의 기본 브랜치 이름이 `main`이 아닌 경우 `deploy.yml`의 `push.branches`에 해당 브랜치를 추가하세요.
- Gemini API 키 등 민감한 값은 클라이언트 코드에 직접 두지 말고 GitHub Secrets / 서버 환경으로 관리하세요.

문의: 변경이나 추가 기능(커스텀 도메인, SSL, CI 테스트 등)을 원하시면 알려주세요.
