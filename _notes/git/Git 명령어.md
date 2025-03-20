
---

## **🔹 1. Git 초기 설정**

먼저, Git을 처음 사용하는 경우 아래 설정을 진행해야 합니다.

### **1️⃣ 사용자 정보 설정**

GitHub에서 커밋을 생성할 때, **사용자 정보**를 설정합니다.

```
sh
코드 복사
git config --global user.name "내 GitHub 사용자 이름"
git config --global user.email "내 GitHub 이메일"

```

### **2️⃣ 설정 확인**

```
sh
코드 복사
git config --global --list

```

위 명령을 입력하면 설정된 `user.name`과 `user.email`을 확인할 수 있습니다.

---

## **🔹 2. GitHub 리포지토리 생성 및 연결**

### **1️⃣ GitHub에서 새로운 리포지토리 생성**

1. GitHub 웹사이트([https://github.com/](https://github.com/))에 접속
2. `New Repository` 버튼 클릭
3. 리포지토리 이름 입력 (예: `digital-garden-site`)
4. `Public` 또는 `Private` 설정 후 **리포지토리 생성**

### **2️⃣ 로컬 프로젝트와 GitHub 리포지토리 연결**

프로젝트 디렉토리로 이동 후, Git 초기화:

```
sh
코드 복사
cd 프로젝트_폴더
git init

```

GitHub 리포지토리를 원격 저장소로 추가:

```
sh
코드 복사
git remote add origin <https://github.com/내아이디/digital-garden-site.git>

```

원격 저장소 설정 확인:

```
sh
코드 복사
git remote -v

```

---

## **🔹 3. 프로젝트 파일 GitHub에 업로드**

### **1️⃣ 파일 추가**

현재 프로젝트 내 모든 파일을 Git 추적 대상으로 추가:

```
sh
코드 복사
git add .

```

### **2️⃣ 첫 번째 커밋 생성**

```
sh
코드 복사
git commit -m "첫 번째 커밋: Jekyll 기반 Digital Garden 업로드"

```

### **3️⃣ GitHub에 푸시 (업로드)**

```
sh
코드 복사
git branch -M main  # 기본 브랜치를 main으로 변경
git push -u origin main

```

✅ 이제 GitHub에서 프로젝트 파일을 확인할 수 있습니다.

---

## **🔹 4. 코드 변경 후 업데이트 (GitHub 반영)**

Jekyll 사이트를 수정한 후 GitHub에 업데이트하려면 아래 명령을 사용합니다.

1. 변경된 파일 확인:
    
    ```
    sh
    코드 복사
    git status
    
    ```
    
2. 변경된 파일을 Git에 추가:
    
    ```
    sh
    코드 복사
    git add .
    
    ```
    
3. 커밋 메시지와 함께 저장:
    
    ```
    sh
    코드 복사
    git commit -m "사이트 UI 수정 및 기능 개선"
    
    ```
    
4. 변경사항을 GitHub에 푸시:
    
    ```
    sh
    코드 복사
    git push origin main
    
    ```
    

---

## **🔹 5. GitHub에서 최신 코드 가져오기**

팀원과 협업하는 경우, 최신 코드를 가져와야 합니다.

### **1️⃣ 원격 저장소의 변경 사항 가져오기**

```
sh
코드 복사
git pull origin main

```

⚠️ 만약 로컬 파일과 충돌이 발생하면, 충돌을 해결하고 다시 커밋/푸시해야 합니다.

---

## **🔹 6. GitHub Pages를 이용한 사이트 배포**

GitHub Pages를 이용하여 Jekyll 사이트를 배포하려면 아래 단계를 따릅니다.

### **1️⃣ GitHub에서 Pages 설정**

1. GitHub 리포지토리 접속
2. **Settings → Pages** 이동
3. **Branch 선택 (`main`) → `Save`** 클릭

### **2️⃣ `_config.yml` 파일 수정**

GitHub Pages에서는 **커스텀 플러그인을 지원하지 않으므로**, `_config.yml` 파일을 수정해야 합니다.

```yaml
yaml
코드 복사
theme: jekyll-theme-minimal
markdown: kramdown
exclude:
  - Gemfile
  - Gemfile.lock
  - node_modules

```

---

## **🔹 7. 기타 유용한 Git 명령어**

### **1️⃣ 커밋 히스토리 확인**

```
sh
코드 복사
git log --oneline

```

### **2️⃣ 특정 커밋으로 되돌리기**

```
sh
코드 복사
git reset --hard 커밋ID

```

### **3️⃣ 브랜치 생성 및 변경**

새로운 브랜치 생성:

```
sh
코드 복사
git checkout -b feature-branch

```

브랜치 변경:

```
sh
코드 복사
git checkout main

```

### **4️⃣ 브랜치 삭제**

```
sh
코드 복사
git branch -d feature-branch

```

---

## **🔹 8. Git 명령어 요약**

|작업|명령어|
|---|---|
|Git 초기 설정|`git config --global user.name "이름"` `git config --global user.email "이메일"`|
|Git 초기화|`git init`|
|원격 저장소 추가|`git remote add origin URL`|
|파일 추가|`git add .`|
|커밋 생성|`git commit -m "메시지"`|
|원격 저장소에 푸시|`git push origin main`|
|최신 코드 가져오기|`git pull origin main`|
|GitHub Pages 배포|`_config.yml` 수정 후 GitHub `Settings → Pages`에서 `main` 브랜치 선택|

---

### **✅ 이제 GitHub를 이용하여 Digital Garden Jekyll 사이트를 효과적으로 관리할 수 있습니다! 🚀**

---

