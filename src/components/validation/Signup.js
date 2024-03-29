/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useTheme } from '../../ThemeContext';
// import SignupForm from "./signupForm/SignupForm";
import { ImEyeBlocked, ImEye } from 'react-icons/im';

function SignUpForm() {
  const { setCurrentUser, backendUrl } = useTheme();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [payload, setPayload] = useState({});
  const [passwordsInputType, setPasswordsInputType] = useState('password');
  const [userNameIsValid, setUserNameIsValid] = useState(false);
  const [password1IsValid, setPassword1IsValid] = useState(false);
  const [password2IsValid, setPassword2IsValid] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  // useEffect(() => {
  //   setNavActive([false, false, true, false]);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const clearPayload = () => {
    if (Object.keys(payload).length !== 0) {
      setPayload((prev) => ({}));
    }
  };

  useEffect(() => {
    clearPayload();
  }, [userName, password1, password2]);

  useEffect(() => {
    setFormIsValid(
      userNameIsValid &&
        password1IsValid &&
        password2IsValid &&
        password1 === password2
    );
  }, [
    userNameIsValid,
    password1IsValid,
    password2IsValid,
    password1,
    password2,
  ]);

  const handleUserName = (e) => {
    let _userName = e.target.value;
    _userName.length >= 5 && _userName.length <= 15
      ? setUserNameIsValid(true)
      : setUserNameIsValid(false);
    setUserName(_userName);
  };

  const handleEmail = (e) => {
    let _email = e.target.value;
    if (_email !== "" && /(.+)@(.+){2,}\.(.+){2,}/.test(_email)) {
      setEmailIsValid(true);
    } else {
      setEmailIsValid(false);
    }
    setEmail(_email);
  };


  const handlePassword1 = (e) => {
    let _password1 = e.target.value;
    // _password1.length >= 8 && /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(_password1)
    _password1.length >= 8
      ? setPassword1IsValid(true)
      : setPassword1IsValid(false);
    setPassword1(_password1);
  };

  const handlePassword2 = (e) => {
    let _password2 = e.target.value;
    _password2.length >= 8
      ? setPassword2IsValid(true)
      : setPassword2IsValid(false);
    setPassword2(_password2);
  };

  const handleShowPasswordButton = () => {
    setPasswordsInputType(
      passwordsInputType === 'password' ? 'text' : 'password'
    );
  };

  const handleButton = (e) => {
    e.preventDefault();
    setPayload((prev) => ({
      ...prev,
      userName,
      password1,
      password2,
    }));
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName,
        email,
        password1,
        password2,
      }),
    };
    (async () => {
      const response = await fetch(
        `${backendUrl}/signup/create`,
        requestOptions
      );
      const data = await response.json();
      setCurrentUser((prev) => data.savedDBUser);
      if (response.ok) {
        const _currentUser = await data;
        setCurrentUser((prev) => ({ ...prev, ..._currentUser }));
        setUserName('');
        setEmail('');
        setPassword1('');
        setPassword2('');
      }
    })();
  };

  return (
    <div className='Signup'>
      {/* <SignupForm signupProps={SignupForm}/> */}
      <form>
        <fieldset>
          <legend>Sign up</legend>
          <div className={`row ${userNameIsValid ? 'valid' : 'invalid'}`}>
            <label htmlFor='userName'>User Name</label>
            <input
              type='text'
              id='userName'
              placeholder="username"
              value={userName}
              autoComplete='username'
              onChange={handleUserName}
            />
          </div>
          <br />
          <div className={`note ${userNameIsValid ? 'valid' : 'invalid'}`}>
            <p>allowed: 5 - 20 characters</p>
          </div>
          <div className={`row ${emailIsValid ? "valid" : "invalid"}`}>
            <label htmlFor="email">E-Mail</label>
            <input
              type="text"
              id="email"
              value={email}
              placeholder="email"
              onChange={handleEmail}
            />
          </div>
          <div className={`row ${password1IsValid ? 'valid' : 'invalid'}`}>
            <label htmlFor='password'>Password</label>
            <input
              onPaste={(e) => {
                e.preventDefault();
                return false;
              }}
              onCopy={(e) => {
                e.preventDefault();
                return false;
              }}
              placeholder='password'
              type={passwordsInputType}
              id='pas1'
              value={password1}
              autoComplete='new-password'
              onChange={handlePassword1}
            />
            <span className='eyes-icon' onClick={handleShowPasswordButton}>
              {passwordsInputType === 'password' ? <ImEye /> : <ImEyeBlocked />}
            </span>
          </div>

          <div className={`note ${password1IsValid ? 'valid' : 'invalid'}`}>
            <p>min 8 characters</p>
          </div>
          <div className={`row ${password2IsValid ? 'valid' : 'invalid'}`}>
            <label htmlFor='password'>Password</label>
            <input
              onPaste={(e) => {
                e.preventDefault();
                return false;
              }}
              onCopy={(e) => {
                e.preventDefault();
                return false;
              }}
              placeholder='password'
              type={passwordsInputType}
              id='pas2'
              value={password2}
              autoComplete='new-password'
              onChange={handlePassword2}
            />
            <span className='eyes-icon' onClick={handleShowPasswordButton}>
              {passwordsInputType === 'password' ? <ImEye /> : <ImEyeBlocked />}
            </span>
          </div>
          <div className={`note ${password2IsValid ? 'valid' : 'invalid'}`}>
            <p>repeat your password</p>
          </div>
          <div className='buttonRow'>
            <button disabled={!formIsValid} onClick={handleButton}>
              Register
            </button>
          </div>
        </fieldset>
      </form>

      {Object.keys(payload).length !== 0 && (
        <pre>Saved: {JSON.stringify(payload, null, 2)}</pre>
      )}
    </div>
  );
}

export default SignUpForm;
