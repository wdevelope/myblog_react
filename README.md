## 🔥 개인 블로그 프로젝트 (Typescript 마이그레이션)

- 개인 종합 블로그 프로젝트
- express, javascript, typescript 함수형 서버구현
- 3 layed 아키텍처 패턴 (controller, service, repository)
- 기능에 문제 없는 선에서, 최대한 간결하게

<br>

## 🔥 ERD

![ERD](https://ifh.cc/g/abA16w.png)

1. users : 유저
2. posts : 게시글
3. categories : 게시글 카테고리
4. subCategories : 카테고리 내 서브 카테고리
5. images : 이미지 업로드
6. visitors : 방명록
7. visitorComments : 방명록 댓글

<br>

# 🔥 api 가이드 (/api)

### user (유저)

1. 회원가입 (POST) = api/user/register
2. 로그인 (POST) = api/user/login
3. 회원정보 (GET) = api/user/userInfo
4. 유저상태 수정 (PUT) = api/user/status
5. 로그아웃 (post) = api/user/logout
6. 로그아웃 확인 (GET) = api/user/check

### category (게시판 카테고리)

1. 생성 (POST) = api/category
2. 조회 (GET) = 전체 : api/category , 특정 : api/category/:id
3. 수정 (PUT) = api/category/:id
4. 삭제 (DELETE) = api/category/:id

### subcategory (카테고리 내 서브카테고리)

1. 생성 (POST) = api/subCategory
2. 조회 (GET) = 전체 : /subCategory , 특정 : api/subCategory/:categoryId
3. 수정 (PUT) = api/subCategory/:id
4. 삭제 (DELETE) = api/subCategory/:id

### post (게시글)

1. 생성 (POST) = api/post
2. 조회 (GET) = 전체 : /post , 특정 : api/post/:id
3. 수정 (PUT) = api/post/:id
4. 삭제 (DELETE) = api/post/:id

### image (이미지)

1. 업로드 (POST) = api/image
2. 불러오기 (GET) = api/:id

### visitor (방명록)

<br>

<br>

# 🔥 주요기능

1. 카테고리, 서브카테고리 생성
2. 방명록 생성

# 🔥 기술적 의사결정

1. react
2. 라이브러리

# 🔥 폴더 구조
