import React, { useState } from 'react'
import { user } from '../../type/userInfo'

const reqMessage1 = `이 페이지는 페이지 구현 연습용일 뿐입니다`;
const reqMessage2 = `개인정보를 수집하지는 않지만 반드시 동의해주셔야 합니다`;
const optMessage = `마케팅 용도로 연락드릴 수도 있는 선택 약관입니다`;

type signUpAgreeProps = {
    currentInfo: user;
    setItem: (a:user) => void;
}

const SignUpUserAgree:React.FC<signUpAgreeProps> = ({currentInfo, setItem}) => {
  const [req1, setReq1] = useState(false);
  const [req2, setReq2] = useState(false);
  const [opt, setOpt] = useState(false);

  const allChecked = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = req1 && req2 && opt ? false : true;
    setReq1(value);
    setReq2(value);
    setOpt(value);
    const updateItem = {
      'agreement1' : value, 
      'agreement2': value 
    };
    setItem({ ...currentInfo, ...updateItem });
  }
  const onChangeReq1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReq1(!req1);
    const updateItem = {  'agreement1': req1 && req2 };
    setItem({ ...currentInfo, ...updateItem });
  }

  const onChangeReq2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReq2(!req2);
    const updateItem = {  'agreement1': req1 && req2 };
    setItem({ ...currentInfo, ...updateItem });
  }

  const onChangeAgree3 = (e: React.ChangeEvent<HTMLInputElement>) => {
      setOpt(!opt);
      const updateItem = {  'agreement2': opt };
      setItem({ ...currentInfo, ...updateItem });
  }
  return (
    <div className='sign-agree'>
        <p>※ 서비스 약관 동의 (필수)
        
        <label htmlFor='all' className='sign-agree__all'>
          <input type='checkbox' id='all' checked={req1 && req2 && opt} onChange={allChecked}/>모두 동의
          </label>
          </p> 
        <label htmlFor='require1' className='sign-agree__check'>
          <input type='checkbox' id='require1' checked={req1} onChange={onChangeReq1}/>{reqMessage1}
        </label>
        <label htmlFor='require2' className='sign-agree__check'>
          <input type='checkbox' id='require2' checked={req2} onChange={onChangeReq2}/>{reqMessage2}
        </label>
        <p>※ 마케팅 용도 개인정보 제공 동의</p>
        
        <label htmlFor='option1' className='sign-agree__check'>
          <input type='checkbox' id ='option1' checked={opt} onChange={onChangeAgree3}/>{optMessage}
        </label>
    </div>
  )
}

export default SignUpUserAgree