import React from 'react';
import 'components/Appointment/styles.scss';
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form"
import useVisualMode from "hooks/useVisualMode";
import Status from './Status';

export default function Appointment(props){
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );



  const save = async function(name, interviewer){
    transition(SAVING);
    console.log("SAVE CALL", name, interviewer);
    const interview = {
      student: name,
      interviewer: interviewer
    }

    await props.bookInterview(props.id, interview);

      
    transition(SHOW)

  }


 
  //console.log(props.interview);  



  return(
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE) } />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
        />
        )
      }
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={() => back()} onSave={save}     />
      )}
      {mode === SAVING && (
        <Status>Saving...</Status>
      )}
      

    </article>
  )
}