import React, { useState, useMemo } from 'react';
import './reset.css';

const hasLetter = (s) => /[A-Za-z]/.test(s);
const hasNumber = (s) => /[0-9]/.test(s);

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [infoMsg, setInfoMsg] = useState('');

  const minLen = password.length >= 8;
  const letter = hasLetter(password);
  const number = hasNumber(password);
  const meetsPolicy = minLen && letter && number;
  const matches = confirm.length > 0 && password === confirm;
  const canSubmit = meetsPolicy && matches;

  const strength = useMemo(() => {
    let s = 0;
    if (minLen) s++;
    if (letter) s++;
    if (number) s++;
    return s; // 0..3
  }, [minLen, letter, number]);

  function toggle(field) {
    if (field === 'pw') setShowPassword((v) => !v);
    if (field === 'confirm') setShowConfirm((v) => !v);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg('');

    if (!meetsPolicy) {
      setErrorMsg('Password doesn’t meet requirements.');
      return;
    }
    if (!matches) {
      setErrorMsg('Passwords must match.');
      return;
    }

    setInfoMsg('Your password has been reset. You may now log in.');
    setPassword('');
    setConfirm('');
  }

  return (
    <div id="reset-page-case">
      <form className="form" onSubmit={handleSubmit} noValidate>
        {errorMsg ? <div className="error-message">{errorMsg}</div> : null}
        {infoMsg ? <div className="info-message">{infoMsg}</div> : null}

        <div className="signup-box">
          <span className="label">New Password</span>
          <div id="password-case">
            <div>
              <img className="lock" src="/src/assets/Lock.png" alt="" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="name"
                style={{ marginLeft: '10px' }}
                placeholder="Create Password"
                autoComplete="new-password"
              />
            </div>
            <img
              className="show-password-button"
              onClick={() => toggle('pw')}
              src="/src/assets/ShowPass.png"
              alt="toggle"
            />
          </div>
          <div className="line"></div>

          <ul className="criteria">
            <li className={minLen ? 'valid' : ''}>At least 8 characters</li>
            <li className={letter ? 'valid' : ''}>Contains a letter (A–Z)</li>
            <li className={number ? 'valid' : ''}>Contains a number (0–9)</li>
          </ul>

          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              paddingTop: '12px',
            }}
          >
            <span className="password-tip">Choose a strong password.</span>
          </div>

          <span style={{ marginTop: '15px' }} className="label">
            Confirm Password
          </span>
          <div id="password-case">
            <div>
              <img className="lock" src="/src/assets/Lock.png" alt="" />
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="confirm"
                style={{ marginLeft: '10px' }}
                placeholder="Confirm Password"
                autoComplete="new-password"
              />
            </div>
            <img
              className="show-confirm-button"
              onClick={() => toggle('confirm')}
              src="/src/assets/ShowPass.png"
              alt="toggle"
            />
          </div>
          <div className="line"></div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '40px',
          }}
        >
          <button className="signup-button" type="submit" disabled={!canSubmit}>
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
