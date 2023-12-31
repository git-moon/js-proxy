# js-proxy

## 목차
```
1. 개요
2. 사용 기슬 및 툴
3. 실행 방법
4. 빌드
5. 수정예정 및 고민해볼 내용
```

## 개요
```
수개월 전 모회사 과제를 진행하던 중 공부했던 내용을 바탕으로 
연습용 프로젝트를 만들었습니다.



Vanilla js로 
SPA 프레임워크의 방식을 구현해보고자 하였습니다.

아직 부족한 점이 많고 고쳐나가는 중입니다.
javascript 문법을 익히고 적용하는 과정에 있고,
틀린 부분 혹은 새로 깨달은 부분들은 지속해서 수정중입니다.

구현 내용 및 특징
 - 프록시를 활용한 자동 렌더링

 - 컴포넌트 (클래스 및 상속)
  ㄴ 컴포넌트 생성시 해당 html 엘리먼트에 고유값 설정
  ㄴ 라이프사이클

 - 이벤트버스 (이벤트 발행 및 구독)

 - 메소드 레지스트리 (엘리먼트에 이벤트 등록)
  ㄴ 문제가 많음...
  ㄴ 엘리먼트에 연결한 메소드 이벤트 등록

```

## 사용 기술 및 툴
```
IDE: VSCode

javascript (Vanilla)
docker (VSCode devcontainer),
node v16
webpack

그 외
AWS S3
AWS cloudfront

https://d2zahfcbdjkfs7.cloudfront.net 에서 확인 가능
```

## 실행 방법
```
최상위 폴더 내 index.html 파일 실행
```

## 빌드
```
1. npm install (처음 1회)
2. npm run webpack
```

## 수정예정 및 고민해볼 내용
```
*** 프록시에 의한 자동 렌더링 과정 중
 data(react의 state)의 변경여부를 proxy에서 확인할 필요가 있는가
 object 및 array 타입의 경우 이전값과 다른지 비교하는 코드가 있는데 
 아무래도 중첩된 데이터가 있거나 하면 잡아내지 못한다. 
 (아무래도 vue를 따라하려다 보니 해당 코드를 넣었다.)
 react에서는 state를 변경할땐 기존값을 clone 후 교체하기 때문에 위 문제가 발생하지 않는다.

* 브라우저 크기를 변경하면 자동렌더링이 되지 않는다.
 새로고침 해야 된다...

* root 경로 alias
 vue에서 사용하는 @ 같은 걸로다가.

* 라이프사이클
 라이프사이클 따라하는 작업중에 있는데

* 메소드 레지스트리
 - re-render 마다 실행시켜주기 때문에 메소드 Set에 있는 모든 이벤트를 계속 등록한다.
 - 없어지는 메소드 삭제도 못한다.

* webpack dev server 및 hot reload 적용하기
 - 현재는 수정하고 다시 빌드해서 확인중이다.. 매우 비효율적

```
