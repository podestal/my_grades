import React from 'react'

const Student = ({ student, grades, competence, assiganure }) => {
  return (
    <div>
        <p>{student?.first_name}{student?.last_name}</p>
        {grades
            .filter(grade => grade.student.id == student.id)
            .filter(grade => grade.activity.competence == competence.id)
            .map( grade => <p key={grade.id}>{grade.calification}</p>)
        }
    </div>
  )
}

export default Student