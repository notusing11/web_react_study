import React, { useState } from 'react'
import { user } from '../../type/userInfo'
import { passwordReg, passwordValidator } from '../../policy/signUpPolicy'

const passwordErrorMessage = `영문자 및 숫자, 특수문자 포함 8 ~ 42자로 설정해주세요`;

type ItemProps = {
  currentInfo: user;
  setItem: (a:user) => void;
}

const SignUpPassword :React.FC<ItemProps> = ({currentInfo, setItem}) => {
  const [valid, setValid] = useState(true);
  const onChangePassword = (e:React.ChangeEvent<HTMLInputElement>) =>{
    setValid(passwordValidator(e.currentTarget.value));
  }
  const onFocusPassword = (e:React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.validity.patternMismatch)
      e.currentTarget.setCustomValidity(passwordErrorMessage);
  }
  const onBlurPassword = (e:React.ChangeEvent<HTMLInputElement>) => {
    const newData = passwordValidator(e.currentTarget.value) ? e.currentTarget.value : "";
    const updatedItem = { ...currentInfo, password: newData };
    if (JSON.stringify(currentInfo) !== JSON.stringify(updatedItem))
      setItem(updatedItem)
    }
  
  const [equal, setEqual] = useState(true);
  const onChangePwCheck = (e:React.ChangeEvent<HTMLInputElement>) => {
    setEqual(currentInfo.password === e.currentTarget.value);
  }
  const onBlurPwCheck = (e:React.ChangeEvent<HTMLInputElement>) => {
    const isSamePw = currentInfo.password === e.currentTarget.value;
    if (isSamePw !== currentInfo.pwCheck)
      setItem({ ...currentInfo, pwCheck: isSamePw });
  }

  return (
    <>
      <div className='sign-input'>
        <label className='sign-input__title' htmlFor='password'>비밀번호</label>
        <input 
          id='password'
          type='password' 
          className='sign-input__box'
          pattern={passwordReg.source}
          onChange={onChangePassword}
          onFocus={onFocusPassword}
          onBlur={onBlurPassword}
          required
        />
        {!valid && <label className='sign-input__error' htmlFor='password'>{passwordErrorMessage}</label>}
      </div>
      <div className='sign-input'>
        <label className='sign-input__title' htmlFor='pwCheck'>비밀번호 확인</label>
        <input 
          id='pwCheck'
          type='password' 
          className='sign-input__box' 
          onChange={onChangePwCheck} 
          onBlur={onBlurPwCheck} 
          required
        />
        {!equal && <label className='sign-input__error' htmlFor='pwCheck'>비밀번호와 일치하지 않습니다</label>}
      </div>
    </>
  )
}

export default SignUpPassword