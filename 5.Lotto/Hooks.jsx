import React, { useEffect, useRef, useState, useMemo , useCallback} from "react";
import Ball from "./Ball";

function getWinNumbers() {
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v,i) => i + 1);
    const shuffle = [];
    while(candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bounsNumber = shuffle[shuffle.length - 1];
    const winNumber = shuffle.slice(0,6).sort((p,c) => p - c);
    return [...winNumber, bounsNumber];
    
}

/*
    useMemo : 복잡한 함수 결괏값을 기억
    useRef : 일반 값을 기억
    useCallback : 복집힌 힘수를 기억
*/

// 조건문 안에 절대 넣으면 안 되고 함수난 반복문 안에도 웬만하면 안 넣는 게 좋다.
const Lotto = () => {
    const [ winBalls , setWinBalls ] = useState([]);
    const lottoNumbers = useMemo(() => getWinNumbers(), [winBalls]);
    // useMemo는 [] 값이 바뀌기 전 까지 값을 기억한다
    const [winNumbers , setWinNumbers ] = useState(lottoNumbers);
    const [ bonus , setBonus ] = useState(null);
    const [ redo , setRedo ] = useState(false);
    const timeouts = useRef([]);

    
    useEffect(()=> {
        console.log('useEffect');
        for (let i = 0; i < winNumbers.length - 1; i++ ){
            timeouts.current[i] = setTimeout(() => {
                setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
            }, (i+1) * 1000);
        }
        timeouts.current[6] = setTimeout(() => {
            setBonus(winNumbers[6]);
            setRedo(true);
        }, 7000);
        return () => {
            timeouts.current.forEach((v) => clearTimeout(v));
        }
    // useEffect는 [timeouts.current]가 바뀔때 코드들을 실행한다
    }, [timeouts.current] ); // 빈 배열이면 ComponentDidMount랑 똑같은 개념
    // 배얄에 요소가 있으면 ComponentDitUpdate 랑 ComponentDidMount 둘 다 실행

    /*
    componentDidUpdate 만 , componentDidMount는 X
    const mounted = useRef(false);
    useEffect(() => {
        if(!mounted.current ){
            mounted = true;
        }
    }, [바뀌는값]); 
    */

    const onClickRedo = useCallback(() => {
        console.log('onClickRedo');
        console.log(winNumbers);
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current= [];
    // useCallback은 [winNumbers]가 바뀌기 전까지 함수를 기억한다.
    }, [winNumbers]);

    return (
        <>
            <div>당첨 숫자</div>
            <div id ="결과창">
                {winBalls.map((v) => <Ball key={v} number={v} />)}
            </div>
            <div>보너스</div>
            {bonus && <Ball number={bonus} onClick = {onClickRedo}/>}
            { redo && <button onClick={onClickRedo}>한번 더!</button> }
        </>
    )

}

export default Lotto;