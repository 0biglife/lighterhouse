## Lighterhouse Service

- 성능 분석을 원하는 사이트를 입력하면 분석 + 피드백 주는 Lighthouse 기반 서비스

- 성능 분석 시각화 + 브라우저 성능 지표 분석 + 개선사항 제안 기능

### 기획 정리

#### 핵심 UX 목표

- 중요도와 점수 영향도 기반 우선순위 정렬

- 기대 점수 향상 폭 제시 (퍼포먼스 점수 예측)

- 간결한 설명 + 링크 제공

- 카테고리별/전체 요약 뷰 제공

### 데이터 가공 전략

1. Critical & General 개선 항목 분리

2. 점수 영향도 기반 우선순위 정렬

3. 예상 점수 향상량 계산

## To Do

- 다국어 지원 추가(api로 i18n 받아오기 가능)

- json 단일 파일로 관리

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
