
---

## **1. `.windsurfrules` 파일의 역할**

- **AI 동작 제어**: 코드 자동완성, 코드 스타일, 보안 검사 등 AI의 다양한 기능을 프로젝트에 맞게 설정합니다.
- **프로젝트별 규칙 정의**: 특정 프로젝트의 요구 사항에 맞는 규칙을 설정하여 일관된 코딩 스타일과 품질을 유지합니다.

---

## **2. `.windsurfrules` 파일 생성 및 설정 방법**

1. **프로젝트 루트 디렉토리에 `.windsurfrules` 파일 생성**
    
    - 프로젝트의 최상위 폴더에 `.windsurfrules`라는 이름의 파일을 만듭니다.
2. **규칙 작성**
    
    - `.windsurfrules` 파일에 프로젝트에 필요한 규칙을 작성합니다.
        
    - 예를 들어, Next.js 프로젝트에서 `next.config.mjs`를 설정 파일로 사용하고, TailwindCSS를 `tailwind.config.ts`로 설정하려면 다음과 같이 작성할 수 있습니다.
        
        ```markdown
        markdown
        코드 복사
        For Next.js, use `next.config.mjs` as the configuration file.
        For TailwindCSS, use `tailwind.config.ts` as the configuration file.
        
        ```
        
3. **Windsurf AI 재시작 또는 설정 재로드**
    
    - `.windsurfrules` 파일을 수정한 후에는 Windsurf AI를 재시작하거나 설정을 재로드하여 변경 사항을 적용합니다.

---

## **3. `.windsurfrules` 파일의 예시**

```markdown
markdown
코드 복사
# 프로젝트별 AI 규칙 설정

## Next.js 설정
- `next.config.mjs` 파일을 구성 파일로 사용합니다.

## TailwindCSS 설정
- `tailwind.config.ts` 파일을 구성 파일로 사용합니다.

## PostCSS 설정
- `postcss.config.mjs` 파일을 구성 파일로 사용합니다.

## 코드 스타일
- 모든 JavaScript 파일은 세미콜론으로 끝나야 합니다.
- 들여쓰기는 스페이스 2칸을 사용합니다.

## 보안 검사
- 하드코딩된 비밀번호나 API 키가 없는지 확인합니다.
- SQL 인젝션 및 XSS 취약점 검사를 수행합니다.

```

이러한 규칙을 설정하면, Windsurf AI는 프로젝트의 특성에 맞게 AI 기능을 조정하여 개발 효율성과 코드 품질을 향상시킬 수 있습니다.

---

## **4. 추가 참고 사항**

- **규칙의 우선순위**: `.windsurfrules` 파일에 정의된 규칙은 해당 프로젝트 내에서 우선적으로 적용됩니다.
- **글로벌 규칙 설정**: 여러 프로젝트에서 공통으로 적용할 규칙은 글로벌 설정 파일에 정의할 수 있습니다.
- **규칙 파일의 크기 제한**: `.windsurfrules` 파일은 최대 6,000자까지 작성할 수 있으며, 글로벌 규칙 파일도 동일한 제한이 있습니다. 따라서 총 12,000자의 규칙을 설정할 수 있습니다.

---

이렇게 `.windsurfrules` 파일을 활용하여 프로젝트별로 AI의 동작을 세밀하게 조정함으로써, 개발 효율성과 코드 품질을 향상시킬 수 있습니다.