'use client';

import { useState } from 'react';

import styles from './search-form.module.css';

export function SearchForm() {
  const [inputValue, setInputValue] = useState('');

  return (
    <form
      role='search'
      className={`flex w-full max-w-125 items-center gap-x-3 rounded-sm border border-black px-3 py-2 ${styles.form}`}
    >
      <label htmlFor='search-input' className='visually-hidden'>
        Поиск
      </label>
      <input
        type='search'
        id='search-input'
        name='search'
        onChange={(event) => setInputValue(event.currentTarget.value)}
        value={inputValue}
        placeholder='Поиск...'
        className='w-full text-sm font-light outline-0'
      />
    </form>
  );
}
