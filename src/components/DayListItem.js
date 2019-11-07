import React from 'react';
import 'components/DayListItem.scss';
import classNames from 'classnames';

export default function DayListItem(props){
  const formatSpots = (spots) => spots === 0 ? "no spots remaining" : spots === 1 ? "1 spot remaining" : `${spots} spots remaining`


  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0 
  });

  return(
    <li className={dayClass} onClick={props.setDay} data-testid="day">
      <h2>{props.name}</h2>
      <h3>{formatSpots(props.spots)}</h3>
    </li>
  )
}