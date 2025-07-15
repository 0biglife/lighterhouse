## <i>Update</i>

### <i>15.July.2025</i>

- Next.js 15 App Router + API Route + AWS Amplify 로 구성되어 Next.js 서버에서 Google API를 호출하던 방식을 별개 백엔드 프로젝트로 분리하였습니다. 과정을 다음과 같습니다.

- 문제 원인: 일부 url 호출 시 10초 이상 넘어가면 자동 타임아웃 발생.

- - AWS Amplify는 자체 lambda 서비스 정책으로 타임아웃 설정을 10초로 해두며, 이를 수정하는 기능은 제공되지 않음

- 문제 해결: [Java 기반 백엔드 프로젝트](https://github.com/0biglife/lighterhouse-back)를 새로 구성하여 재배포하였습니다.

- - 이로써, PSI KEY 값을 Amplify 에서 App Runner로 이전시켰습니다.

<br />

## <i>Lighterhouse Service</i>

Google Lighthouse 기반 웹 성능 분석 도구입니다.

기존 Ligthhouse에서는 부족했던 개선사항을 제공합니다.

1. Web Vitals 지표별 Google 우수/권장/부족 가이드 수치 제공

2. 우선순위 기반 개선 항목 자동 필터링(Critial/General 분류)

3. 항목별 개선 시 예상 향상 점수 가중치 제공

4. 개선 항목별 관련 가이드 링크 연동

5. 위 데이터를 사용자 친화적인 UI/UX로 제공

### <i>사용법</i>

1. [Listerhouse](https://lighterhouse.0biglife.com/)에 접속

2. https 프로토콜 선택

- - http/https 는 현재 기획 보류중

3. 성능 분석하고자 하는 url 입력

## <i>To Do</i>

- 다국어 지원 추가(api로 i18n 받아오기 가능)

- json 단일 파일로 관리

## <i>Getting Started</i>

```bash
yarn # or yarn install
yarn build
yarn dev
```
