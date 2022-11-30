import React, { useState, useEffect , useReducer, useContext} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import AuthContext from '../../store/AuthContext';

const emailReducer = (state,action) => {
  if(action.type === 'User_Input'){
    return {value:action.val, isValid:action.val.includes('@')}
  }
  if(action.type === 'Input_Blur'){
    return{value:state.value , isValid:state.value.includes('@')}
  }
   return { value : '' , isValid: false}
}

const passwordReducer = (state,action) =>{
  if(action.type === 'User_Input'){
    return {value: action.val , isValid:action.val.trim().length > 6}
  } 
  if(action.type === 'Input_Blur'){
    return {value:state.value , isValid:state.value.trim().length > 6}
  }
   return {value:'' , isValid: false}
}

const collegenameReducer = (state,action) =>{
  if(action.type === 'User_Input'){
    return {value: action.val , isValid:action.val.trim().length > 6}
  } 
  if(action.type === 'Input_Blur'){
    return {value:state.value , isValid:state.value.trim().length > 6}
  }
   return {value:'' , isValid: false}
}


const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredcollegename, setenteredcollegename] = useState('');
  // const [enteredcollegenameValid, setenteredcollegenameValid] = useState('');
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer,{value:'' , isValid:null});
  const [passwordState , dispatchPassword] = useReducer(passwordReducer, {value: '' , isValid: null})
  const [collegenameState , dispatchCollegename] = useReducer(collegenameReducer, {value: '' , isValid: null})

  const authCtx = useContext(AuthContext);

const {isValid : emailIsValid} = emailState
const {isValid: passwordIsValid} = passwordState
const {isValid: collegenameIsValid} = collegenameState

  useEffect(()=>{
   const identifier =  setTimeout(()=>{
      console.log('checking for validity')
      setFormIsValid(
        emailIsValid && passwordIsValid  && collegenameIsValid
      );
    },500);

    return () =>{
      console.log('CLEAN UP ');
      clearTimeout(identifier)
    }

  },[emailIsValid, passwordIsValid ,collegenameIsValid])
  
  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({type: 'User_Input', val:event.target.value})

    setFormIsValid(
      event.target.value.includes('@') && passwordState.isValid && collegenameState.isValid
          );
 
  };

  const collegenamechangeHandler = (event) =>{
    // setenteredcollegename(event.target.value)
    dispatchCollegename({type: 'User_Input' , val: event.target.value})
    setFormIsValid(
      event.target.value.includes('@') && passwordState.isValid && collegenameState.isValid
          );
  }

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({type: 'User_Input' , val: event.target.value})

    setFormIsValid(
      emailState.isValid && passwordState.isValid && collegenameState.isValid
          );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({type: 'Input_Blur'})
  };

  const validateCollegeNameHandler = () => {
    // setenteredcollegenameValid(enteredcollegename.trim().length > 6);
    dispatchCollegename({type:'Input_Blur'})
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({type:'Input_Blur'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passwordState.value , collegenameState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input id = "email" label = "E-mail" type = "email" isValid = {emailIsValid} value = {emailState.value} onChange={emailChangeHandler} onBlur ={validateEmailHandler}/>
        <Input id = "password" label = "password" type = "password" isValid = {passwordIsValid} value = {passwordState.value} onChange={passwordChangeHandler} onBlur ={validatePasswordHandler}/>
        <Input id = "college" label = "college" type = "text" isValid = {collegenameIsValid} value = {collegenameState.value} onChange={collegenamechangeHandler} onBlur ={validateCollegeNameHandler}/>

       
          
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
