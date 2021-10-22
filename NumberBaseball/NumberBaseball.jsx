import React, { Component } from "react";

    function getNumbers() { // 숫자 4개를 겹치지 않고 렌덤하게 뽑는 함수

    }

    onSubmitForm = () => {

    };

    onChangeInput = () => {

    };



class NumberBaseball extends Component {
    state = {
        result : '',
        value : '' ,
        answer : getNumbers(),
        tries : [],

    };

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
                    {[
                        { fruit : '사과', taste : '맛있다'},
                        { fruit : '감', taste : ''},
                        { fruit : '귤', taste : ''},
                        { fruit : '밤', taste : ''},
                        { fruit : '배', taste : ''},
                        { fruit : '무', taste : ''},
                        { fruit : '사과', taste : ''},
                    ].map( (v , i) => {
                            // 리엑트가 key를 보고 같은 컴포넌트인지 아닌지 판단한다.
                            // key 값은 고유한 값만 가져야 한다.
                            // Arrow   function 에서는 return을 생략해도 된다.
                            <li key={v.fruit + v.taste}><b>{v.fruit}</b> - {i}</li>
                    })}
                    <li></li>
                </ul>
            </>
        );
    }
}

export default NumberBaseball;

