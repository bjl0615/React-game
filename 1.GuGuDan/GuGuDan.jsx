const React = require('react');
const { useState, useRef } = React; 

const GuGuDan = () => {
    const [first, setFirst] = useState(Math.ceil(Math.random() * 9 ));
    const [second, setsecond] = useState(Math.ceil(Math.random() * 9 ));
    const [value, setValue] = useState('');
    const [result, setresult] = useState('');
    const InputRef = useRef(null);
  
    const onSubmitForm = (e) => {
        e.preventDefault();
  if ( parseInt(value) === first * second
  ) {
    setresult('정답: ' + value);
    setFirst(Math.ceil(Math.random() * 9 ));
    setsecond(Math.ceil(Math.random() * 9 ));
    setValue('');
    InputRef.current.focus();
  } else {
    setresult('땡');
    setValue('');
    InputRef.current.focus();
  }
    }

    const onChangeInput = (e) => {
      setValue(e.target.value);
    };
    
    console.log('렌더링');
    return (
    <>
        <div>{first} 곱하기 {second} 는?</div>
        <form onSubmit={onSubmitForm}>
            <input ref={InputRef} onChange={onChangeInput} value={value} />
            <div id="result">{result}</div>
        </form>
    </>
    );
};

module.exports = GuGuDan;