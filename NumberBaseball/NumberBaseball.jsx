import React, { Component, createRef } from "react";
import Try from "./Try";

function getNumbers() {
    const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const array = [];
    for (let i = 0; i < 4; i += 1) {
        const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
}; 

class NumberBaseball extends Component {
        state = {
            result : '',
            value : '' ,
            answer : getNumbers(), // ex) {1,3,5,7}
            tries : [], //push를 쓰면 안됨
        };

   

    // Arrow function을 안 쓰면 this를 쓰지 못한다.
    onSubmitForm = (e) => {
        const { value , tries , answer} = this.state;
        e.preventDefault();
        if(value === answer.join('')){
            this.setState((prevState) => {
                return{
                    result : '홈런',
                    tries : [...prevState.tries, {try: value, result : '홈런!'}],
                }
            });
            alert('게임을 다시 시작합니다.');
                this.setState( {
                    value : '',
                    answer: getNumbers(),
                    tries : []
            })
        }else { // 답 틀렸으면
            const answerArray = value.split('').map( (v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if(tries.length >= 9) { //10번이상 틀렸을 때
                this.setState({
                    result : `10번 넘게 풀어서 실패! 답은 ${answer.join(',')}였습니다!`
                });
                alert('게임을 다시 시작합니다.');
                this.setState( {
                    value : '',
                    answer: getNumbers(),
                    tries : []
                })
            } else {
                for(let i =0; i < 4; i += 1) {
                    if(answerArray[i] === answer[i]) {
                        strike += 1;
                    } else if (answer.includes(answerArray[i])) {
                        console.log('ball', answerArray[i], answer.indexOf(answerArray[i]));
                        ball += 1;
                    }
                }
                this.setState((prevState) => {
                    return {
                        tries: [...prevState.tries, {try : value, result : `${strike} 스트라이크, ${ball} 볼입니다.`}],
                        value : '',
                    };
                });
                this.inputRef.currend.focus();
            }
        }
    };

    onChangeInput = (e) => {
        const { answer } = this.state;
        console.log(answer);
        this.setState( {
            value : e.target.value,
        });
    };

    inputRef = createRef();

    render() {
        const { result , value , tries } = this.state;
        return (
            <>
                <h1>{result}</h1>
                <form onSubmit = {this.onSubmitForm}>
                    <input ref={this.inputRef} maxLength = {4}  value = {value} onChange={this.onChangeInput}/>
                </form>
                <div>시도 : {tries.length}</div>
                <ul>
                    {/* React에서는 반복문이 map이다. */}
                    {tries.map( (v , i) => {
                            // 리엑트가 key를 보고 같은 컴포넌트인지 아닌지 판단한다.
                            // key 값은 고유한 값만 가져야 한다.
                            // Arrow function 에서는 return을 생략해도 된다.
                        return (
                            // 여기서 문제가 생기는데 Try에 값을 전달하지 못한다 이럴때 쓰이는 것이 props이다.
                            // props로 값을 전달해주는 대가로 Try는 NumberBaseball의 자식이 된다.
                            <Try key={`${i + 1}차 시도 : `} tryInfo={v}/>
                        )
                    })}
                    <li></li>
                </ul>
            </>
        );
    }
}

export default NumberBaseball;

