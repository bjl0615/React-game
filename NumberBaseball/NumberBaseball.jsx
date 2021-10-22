import React, { Component } from "react";
import Try from "./Try";

function  getNumbers() {

}    

class NumberBaseball extends Component {
        state = {
            result : '',
            value : '' ,
            answer : getNumbers(),
            tries : [],
        };

   

    // Arrow function을 안 쓰면 this를 쓰지 못한다.
    onSubmitForm = (e) => {
        e.preventDefault();
        console.log(this.state.value);
    };

    onChangeInput = (e) => {
        this.setState( {
            value : e.target.value,
        });
    };

    fruits = [
        { fruit : '사과', taste : '맛있다'},
        { fruit : '감', taste : ''},
        { fruit : '귤', taste : ''},
        { fruit : '밤', taste : ''},
        { fruit : '배', taste : ''},
        { fruit : '무', taste : ''},
        { fruit : '사과', taste : ''},
    ]


    render() {
        return (
            <>
                <h1>{this.state.result}</h1>
                <form onSubmit = {this.onSubmitForm}>
                    <input maxLength = {4}  value = {this.state.value} onChange={this.onChangeInput}/>
                </form>
                <div>시도 : {this.state.tries.length}</div>
                <ul>
                    {/* React에서는 반복문이 map이다. */}
                    {this.fruits.map( (v , i) => {
                            // 리엑트가 key를 보고 같은 컴포넌트인지 아닌지 판단한다.
                            // key 값은 고유한 값만 가져야 한다.
                            // Arrow function 에서는 return을 생략해도 된다.
                        return (
                            // 여기서 문제가 생기는데 Try에 값을 전달하지 못한다 이럴때 쓰이는 것이 props이다.
                            // props로 값을 전달해주는 대가로 Try는 NumberBaseball의 자식이 된다.
                            <Try key={v.fruit + v.taste} value={v} index={i}/>
                        )
                    })}
                    <li></li>
                </ul>
            </>
        );
    }
}

export default NumberBaseball;

