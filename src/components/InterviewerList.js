import React from 'react';
import 'components/InterviewerList.scss'
import InterviewerListItem from 'components/InterviewerListItem';
import classNames from 'classnames';


export default function InterviewerList(props){
  const interviewerClass = classNames("interviewers");

  const interviewers = props.interviewers.map(interviewer => {
    return(
      <InterviewerListItem 
        key={interviewer.id}
        name={interviewer.name}
        setInterviewer={(event) => props.setInterviewer(interviewer.id)}
        selected = {props.interviewer === interviewer.id}
        avatar= {interviewer.avatar}
      />
    )
  })
  return (
    <section className={interviewerClass}>
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers}
      </ul>

    </section>
    
  );
}