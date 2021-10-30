import React, {Component} from "react";
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

class Lotto extends Component {
    state = {
        winNumbers : getWinNumbers(), // 당첨 숫자들
        winBalls : [],
        bouns : null, // 보너스 공
        redo : false,
    };

    timeouts = [];

    onClickRedo = () => {
        console.log('onClickRedo');
        this.setState ({
            winNumbers : getWinNumbers(),
            winBalls : [],
            bouns : null,
            redo : false,
        });
    };
    timeouts = [];
    
    runTimeouts = () => {
        console.log('runTimeouts');
        const { winNumbers } = this.state; 
        for (let i = 0; i < this.state.winNumbers.length - 1; i++ ){
            this.timeouts[i] = setTimeout(() => {
                this.setState((prevState) => {
                    return {
                        winBalls: [...prevState.winBalls, winNumbers[i]],
                    };
                });
            }, (i+1) * 1000);
        }
        this.timeouts[6] = setTimeout(() => {
            this.setState ({
                bouns : winNumbers[6],
                redo : true,
            });
        }, 7000);
    }

    componentDidMount() {
        this.runTimeouts();
        console.log("로또 숫자를 생성합니다.")
    };

    componentDidUpdate(prevProps, prevState) {
        console.log('didUpdate');
        if(this.state.winBalls.length === 0) {
            this.runTimeouts();
        }
    }

    componentWillUnmount() {
        this.timeouts.forEach((v) => {
            clearTimeout(v);
        })
    }

    render() {
        const { winBalls , bouns , redo } = this.state;
        return (
            <>
                <div>당첨 숫자</div>
                <div id ="결과창">
                    {winBalls.map((v) => <Ball key={v} number={v} />)}
                </div>
                <div>보너스</div>
                {bouns && <Ball number={bouns} />}
                { redo && <button onClick={this.onClickRedo}>한번 더!</button> }
            </>
        );
    }
}

export default Lotto;