import React from 'react';
import style from './style.module.scss';

const Option = ({option, round = false, selected, handleSelect, multipleSelect}) => {
  return (
    <li className={`${style.option} 
        ${round ? style.optionRound : ''} 
        ${selected ? style.optionActive : ''}
      `} 
      onClick={() => handleSelect(option)}
    >
      <span className={style.optionText}>{option.type}</span>
      <span className={style.price}>{option.price}</span>
    </li>
  )
}

export default Option;
