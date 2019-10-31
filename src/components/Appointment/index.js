import React from 'react';
import 'components/Appointment/styles.scss';
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form"
import useVisualMode from "hooks/useVisualMode";
import Status from './Status';
import Confirm from './Confirm';

export default function Appointment(props){
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";

  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );



  const save = function(name, interviewer){
    transition(SAVING);    
    console.log("SAVE CALL", name, interviewer);
    const interview = {
      student: name,
      interviewer: interviewer
    }
    props.bookInterview(props.id, interview).then(() => transition(SHOW)).catch((err) => console.log(err));
  }


  const onDeleteConfirm = function(id){
    transition(DELETING);

    props.cancelInterview(id).then(() => transition(EMPTY)).catch((err) => console.log(err));


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
          onDelete={() => transition(CONFIRM)}
          onEdit={()=> transition(EDIT)}
        />
        )
      }
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={() => back()} onSave={save}     />
      )}
      {mode === SAVING && (<Status message="Saving"/>)}
      {mode === CONFIRM && (<Confirm onConfirm={() => onDeleteConfirm(props.id)} message="Delete?" onCancel={() => back()}/>)}
      {mode === DELETING && (<Status message="Deleting"/>)}
      {mode === EDIT && (<Form interviewers={props.interviewers} name={props.interview.student} interviewer={props.interview.interviewer.id} onCancel={() => back()} onSave={save}  ></Form>)}
      

    </article>
  )
}