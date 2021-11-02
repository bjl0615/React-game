import React , {useEffect, useRef, useState, memo} from 'react';

const rspCoords = {
    바위 : '0',
    가위 : '-142px',
    보 : '-284px',
}

const scores = {
    가위 : 1,
    바위 : 0,
    보 : -1,
}

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find( function(v) {
        return v[1] === imgCoord;
    })[0]; // 두 번째 인수 배열에 넣은 값( 여기선 imgCoord)들이 바뀔 때 useEffect가 실행된다.
};

//                     result , imgCoord , score
// componentDidMount
// componentDidUpdate
// componentWillUnmount 

/*
    class 에서는 한번에 다 처리가 가능하다
    componentDidMount() {
        this.setState ({
            imgCoord : 3,
            score : 1,
            result : 2,
        })
    }
*/

/*
    Hooks에선 나뉘어서 처리를 해야한다.
    useEffect(() => {
        setImgCoord();
        setScore();
    }), [imgCoord, score]

    useEffect(() => {
        setResult();
    }), [result]
*/

const RSP = memo(() => {
    const [ result , setResult ] = useState('');
    const [ imgCoord , setImgCoord ] = useState(rspCoords.바위);
    const [ score , setScore ] = useState(0);
    const Interval = useRef();

    useEffect(() => { // componentDidMount, componentDidUpdate 역할(1대1 대응은 아님)
        console.log('다시 실행');
        Interval.current = setInterval(changeHand, 100);
        return () => { // componentWillUnmount 역할
            console.log('종료');
            clearInterval(Interval.current);
        }
    }, [imgCoord]); //배열에다 값을 안 넣으면 componentDidMount 값을 넣으면 componentDidUpdate
    // 배열엔 꼭 useEffect를 다시 실행할 값만 넣어야 된다.

    const changeHand = () => {
        if (imgCoord === rspCoords.바위){
            setImgCoord(rspCoords.가위);
        } else if (imgCoord === rspCoords.가위) {
            setImgCoord(rspCoords.보);
        } else if (imgCoord === rspCoords.보) {
            setImgCoord(rspCoords.바위);
        }
    }

    const onClickBtn = (choice) => () => {
        clearInterval(Interval.current);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if ( diff === 0) {
            setResult('비겼습니다.');
        } else if ([-1, 2 ].includes(diff)) {
            setResult('이겼습니다.');
            setScore((prevScore) => prevScore + 1);
        } else {
            setResult('졌습니다.');
            setScore((prevScore) => prevScore - 1);
        }
        setTimeout(() => {
            Interval.current = setInterval(changeHand, 100);
        }, 1000);
    }
    
    return (
        <>
            <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
            <div>
                <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
                <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
                <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
            </div>
            <div>{result}</div>
            <div>현재 {score}점</div>
        </>
    );
});

    // 컴포넌트가 첫 렌더링 된 후. 여기에 비동기 요청을 많이 한다.
    // componentDidMount() {
    //     this.interval = setInterval(this.changeHand, 100);
    // }

    // 리렌더링 후 
    // componentDidUpdate() {

    // }

    // 컴포넌트가 제거되기 직전, 비동기 요청 정리
    // componentWillUnmount() {
    //     clearInterval(this.interval);
    // }

export default RSP;