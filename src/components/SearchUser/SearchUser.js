import React, { useEffect, useRef } from 'react';
import './SearchUser.scss';
import { useInput } from '../../hooks/useInput';
import searchIcon from '../../images/Asset 100.svg';

export default function SearchUser({ login, setLogin, setPrevUser }) {
  const currentUser = useRef(login);
  const [searchTermProps, clearSearchTerm] = useInput(login);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLogin(searchTermProps.value);
    clearSearchTerm();
  };

  useEffect(() => {
    setPrevUser(currentUser.current);
    currentUser.current = login;
  }, [login, setPrevUser]);

  return (
    <form className='searchForm'>
      <div className='searchForm__input'>
        <img src={searchIcon} alt='search icon' />
        <input
          {...searchTermProps}
          type='text'
          placeholder='Enter Github Username'
          required
        />
      </div>

      <button
        className='searchForm__button'
        type='submit'
        onClick={handleSubmit}
        disabled={searchTermProps.value ? false : true}
      >
        SEARCH
      </button>
    </form>
  );
}
