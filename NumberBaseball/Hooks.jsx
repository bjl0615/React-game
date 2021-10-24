import React, {useCallback, useState} from "react";
import Try from "./HooksTry";

function getNumbers() {
    const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const array = [];
    for (let i = 0; i < 4; i += 1) {
        const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
}; 

const NumberBaseball = () => {
    const [ result , setResult ] = useState('');
    const [ value , setValue ] = useState('');
    const [ answer, setAnswer ] = useState(getNumbers);
    cosnt [ tries , setTries ] = useState([]);

    const onSubmitForm = (e) => {
        e.preventDefault();
        if(value === answer.join('')){
            setTries((t) => {[
                ...t,
                {
                    try : value,
                    result : '홈런!',
                }
            ]});
            setResult('홈런!');
            alert('게임을 다시 시작합니다.');
            setValue('');
            setAnswer(getNumbers());
            setTries([]);
        }else { // 답 틀렸으면
            const answerArray = value.split('').map( (v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if(tries.length >= 9) { //10번이상 틀렸을 때
                setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`); // state set은 비동기
                alert('게임을 다시 시작합니다.');
                setValue('');
                setAnswer('');
                setTries([]);
            } else {
                console.log('답은', answer.join(''));
                for(let i =0; i < 4; i += 1) {
                    if(answerArray[i] === answer[i]) {
                        strike += 1;
                    } else if (answer.includes(answerArray[i])) {
                        console.log('ball', answerArray[i], answer.indexOf(answerArray[i]));
                        ball += 1;
                    }
                }
                setTries( t =>([
                    ...t, 
                    {
                        try: value,
                        result: `${strike} 스트라이크 , ${ball} 볼입니다.`
                    }
                ]));
                setValue('');
            }
        }
    };

    const onChangeInput = useCallback((e) => setValue(e.target.value), []);
    
    return (
        <>
            <h1>{result}</h1>
            <form onSubmit = {onSubmitForm}>
                <input 
                maxLength = {4}  
                value = {value} 
                onChange={onChangeInput}
            />
            </form>
            <button>입력 ! </button>
            <div>시도 : {tries.length}</div>
            <ul>
                {tries.map( (v , i) => {
                    return (
                    <Try key={`${i + 1}차 시도 : ${v.try}`} tryInfo={v}/>
                    )
                })}
                <li></li>
            </ul>
        </>
    );
};   
export default NumberBaseball;

