import React from 'react'
import Grades from './Grades'

const Student = ({ student, grades, competence }) => {
  return (
    <div className='student-grades-container'>
        <p>{student?.first_name}{student?.last_name}</p>
        <div className='grades-container'>
            {grades
                .filter(grade => grade.student.id == student.id)
                .filter(grade => grade.activity.competence == competence.id)
                .map( grade => (
                    <Grades 
                        key={grade.id} 
                        grade={grade}
                    />))
            }
        </div>
    </div>
  )
}

export default Student