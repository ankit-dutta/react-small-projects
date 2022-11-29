import React, { useState, useEffect , useReducer} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

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
  if(action.type === 'User_Inp'){
    return {value: action.val , isValid:action.val.trim().length > 6}
  } 
  if(action.type === 'Input_Bl'){
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


  // useEffect(()=>{
  //  const identifier =  setTimeout(()=>{
  //     console.log('checking for validity')
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6 && enteredcollegename.trim().length>6
  //     );
  //   },500);

  //   return () =>{
  //     console.log('CLEAN UP ');
  //     clearTimeout(identifier)
  //   }

  // },[enteredEmail,enteredPassword,enteredcollegename])
  
  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({type: 'User_Input', val:event.target.value})

    setFormIsValid(
      event.target.value.includes('@') && passwordState.isValid && collegenameState.isValid
          );
 
  };

  const collegenamechangeHandler = (event) =>{
    // setenteredcollegename(event.target.value)
    dispatchCollegename({type: 'User_Inp' , val: event.target.value})
    setFormIsValid(
      event.target.value.includes('@') && event.target.value.trim().length > 6 && event.target.value.trim().length>6
          );
  }

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({type: 'User_Input' , val: event.target.value})

    setFormIsValid(
      emailState.isValid && event.target.value.trim().length > 6 && event.target.value.trim().length>6
          );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({type: 'Input_Blur'})
  };

  const validateCollegeNameHandler = () => {
    // setenteredcollegenameValid(enteredcollegename.trim().length > 6);
    dispatchCollegename({type:'Input_Bl'})
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({type:'Input_Blur'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value , collegenameState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
          </div>
          <div
          className={`${classes.control} ${
            collegenameState.isValid === false ? classes.invalid : ''
          }`}
        >
            <label htmlFor="">College Name</label>
          <input
            type="text"
            id="college"
            value={collegenameState.value}
            onChange={collegenamechangeHandler}
            onBlur={validateCollegeNameHandler}
          />
        </div>
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
