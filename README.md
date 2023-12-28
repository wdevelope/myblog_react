## 🔥 개인 블로그 프로젝트 (Typescript 마이그레이션)

- 개인 종합 블로그 프로젝트
- express, javascript, typescript 함수형 서버구현
- 3 layed 아키텍처 패턴 (controller, service, repository)
- 기능에 문제 없는 선에서, 최대한 간결하게

<br>

## 🔥 ERD

<details>
  <summary>ERD</summary>  
  <br>

![ERD](https://ifh.cc/g/abA16w.png)

1. users : 유저
2. posts : 게시글
3. categories : 게시글 카테고리
4. subCategories : 카테고리 내 서브 카테고리
5. images : 이미지 업로드
6. visitors : 방명록
7. visitorComments : 방명록 댓글

</details>

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

1. 생성 (POST) = api/visitor
2. 조회 (GET) = 전체 : /post , 특정 : api/visitor/:id
3. 수정 (PUT) = api/visitor/:id
4. 삭제 (DELETE) = api/visitor/:id

<br>

<br>

# 🔥 주요기능

<details>
  <summary>게시글 작성</summary>
   <br>
  <img src="./src/static/photo/stock.png" width=100%>
</details>
<br>
<details>
  <summary>방명록 작성</summary>
   <br>
  <img src="./src/static/photo/community.png" width=100%>
</details>
<br>
<details>
  <summary>카테고리 생성</summary>
    <br>
  <img src="./src/static/photo/new.png" width=100%>
</details>
<br>

## 👨‍⚖️ 기술적 의사결정

<details>
  <summary><b>1. Redis DB 사용 (이메일 인증번호)</b></summary>
  <div markdown="1">
    </br>
    <ul>
      <li><b>도입 배경:</b></li>
        <ul>
          <li>회원가입 시 인증번호는 일시적으로만 필요한 정보입니다. 대부분의 사이트에서는 이러한 인증번호에 시간 제한을 두고, 그 시간이 지나면 인증번호는 무효화됩니다.</li>
          <li>관계형 데이터베이스에 이러한 일시적이고 소멸성을 가진 데이터를 영구적으로 저장하는 것은 부적합하다고 생각하였습니다.</li>
          <li>쿠키를 사용하는 방식도 고려했으나, 쿠키는 클라이언트 사이드에 저장되기 때문에 보안 상 취약하다고 판단하였습니다.</li>
        </ul>
      <li><b>결정:</b></li>
        <ul>
          <li>Redis는 데이터의 TTL(Time-To-Live) 설정이 간단하여, 인증번호의 유효 시간을 설정하기에 적합하다고 생각했습니다. 또한, 빠른 데이터 접근 속도를 제공하기 때문에 Redis, 즉 인메모리 데이터베이스를 선택하게 되었습니다.</li>
        </ul>
    </ul>
  </div>
</details>
<br>
<details>
  <summary><b>2. 텍스트 에디터 사용</b></summary>
  <div markdown="1">
    </br>
    <ul>
      <li><b>도입 배경:</b></li>   
  </div>
</details>
<br>

## 🗂 프로젝트 구조

  <summary><b>Back-End (node.js)</b></summary>
  <br />
  
```html
 ┃ 📂public          # 
📦src
 ┣ 📂components      # 컴포넌트                            
  ┣ 📂common         # 공통 컴포넌트
  ┣ 📂pages          # 페이지 컴포넌트
 ┣ 📂store           # react 상태 관리
  ┗ 📜UserContext.js # 회원 상태관리
 ┗ 📜App.css         # 전역 css
 ┗ 📜App.js          #    
 ┗ 📜index.css       # 전역 css
 ┗ 📜index.js        #   
``` 
<br>
