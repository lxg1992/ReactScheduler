import React from 'react';
import 'components/Appointment/styles.scss';
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form"
import useVisualMode from "hooks/useVisualMode";
import Status from './Status';
import Confirm from './Confirm';
import Error from "./Error";

export default function Appointment(props){
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVING = "ERROR_SAVING";
  const ERROR_DELETING = "ERROR_DELETING";

  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  //
  const save = function(name, interviewer){
    transition(SAVING);    
    const interview = {
      student: name,
      interviewer: interviewer
    }
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((err) => transition(ERROR_SAVING, true));
  }


  const onDeleteConfirm = function(id){
    transition(DELETING, true);

    props
      .cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch((err) => transition(ERROR_DELETING, true));


  }


 
  //console.log(props.interview);  



  return(
    <article className="appointment" data-testid="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE) } />}
      {mode === SHOW &&  props.interview && (
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
      {mode === ERROR_SAVING && (<Error onClose={() => back()} message="Error Saving"></Error>)}
      {mode === ERROR_DELETING && (<Error onClose={() => back()} message="Error Deleting"></Error>)}


    </article>
  )
}