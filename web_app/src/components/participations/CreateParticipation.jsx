import ParticipationForm from "./ParticipationForm"

const CreateParticipation = ({ student, assignature, setOpenCreate }) => {

  return (
    <ParticipationForm 
        student={student}
        assignature={assignature}
        setOpenCreate={setOpenCreate}
    />
  )
}

export default CreateParticipation