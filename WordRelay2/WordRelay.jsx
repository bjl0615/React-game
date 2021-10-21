const React = require('react');
const { useState, useRef } = React;

// Hooks를 사용하면 this를 사용하지 않는다.
const WordRelay = () => {
    const [word, setWord] = useState('이봉준');
    const [value , setValue ] = useState('');
    const [result , setResult ] = useState('');
    const InputRef = useRef(null);

    // state = {
    //     word : '이봉준',
    //     value : '',
    //     result : '',
    // };

    const onSubmitForm = (e) => {
        e.preventDefault();
        if ( word[word.length - 1] === value[0]) {
            setResult("딩동댕");
            setWord(value);
            setValue('');
            InputRef.current.focus();
            // this.setState({
            //     result : '딩동댕',
            //     word : this.state.value,
            //     value : '',
            // }) 
            // this.input.focus();
        } else {
            setResult('땡');
            setValue('');
            InputRef.current.focus();
            // this.setState({
            //     result : '땡',
            //     value: '',
            // });
            // this.input.focus();
        }
    }
    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

    // input;
    // onRefInput = (c) => {
    //     this.input = c;
    // };

    
        return (
            <>
                <div>{word}</div>
                <form onSubmit={onSubmitForm}>
                    <label htmlFor="wordInput">글자를 입력해주세요.</label>
                    <input ref={InputRef} value = {value} onChange={onChangeInput} />
                    <button id="wordInput" className="wordInput" >입력!</button> 
                </form>
                <div>{result}</div>
            </>
        )
}

module.exports = WordRelay;