## Beacon Service

- 성능 분석을 원하는 사이트를 입력하면 분석 + 피드백 주는 Lighthouse 기반 서비스

- 성능 분석 시각화 + 브라우저 성능 지표 분석 + 개선사항 제안 기능

## Getting Started

```bash
yarn # or yarn install
yarn build
yarn dev
```

## Progress

- Lighthouse API Route 지원 X -> 실패

- Google PageSpeed API 호출 -> 테스트중

```bash
사용자 브라우저
   ↓ 입력
Next.js 클라이언트 (useState, fetch)
   ↓ API 요청
Next.js 서버(API Route) → Lighthouse 직접 실행 불가
   ↘
    ✅ 외부 Node.js 서버 or
    ✅ Google PageSpeed API 호출
         ↓
      Lighthouse 데이터 응답
         ↓
   클라이언트에 결과 표시
```

## Architecture

- 아직 적용중

```bash
src/
├── app/
│   └── api/
│       └── audit/
│           └── route.ts         ← API Route
├── components/
│   └── MainPanel.tsx            ← URL 입력 및 결과 표시
├── lib/
│   └── lighthouse.ts            ← PSI 호출 유틸
│   └── types.ts                 ← 타입 정의
├── __tests__/
│   └── api/audit.test.ts        ← API 테스트
│   └── MainPanel.test.tsx       ← 컴포넌트 테스트
```
