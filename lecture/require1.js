 // require란? 
//  node의 모듈 시스템이다.

export const hello = 'hello'; // import { hello }
export const bye = 'hello'; // import { hello,bye }
// module.exports에다가 NumberBaseball값을 할당해주면
// exports 되는 게 객체나 배열이면 구조 분해할 수 있다.

// module.exports = [ hello: 'a' ];
// export.hello = 'a'는 같다

// export.hello = 'hello';
// module.exports = NumberBaseball;