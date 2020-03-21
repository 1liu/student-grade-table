class GradeTable{
  constructor(tableElement){
    this.tableElement = tableElement;
  }

  updateGrades(grades){
    // console.log(grades);
    var tbody = this.tableElement.querySelector("tbody");
    if (tbody.hasChildNodes()) {
      tbody.removeChild(tbody.childNodes[0]);
    }

    for (var student of grades){
      var studentRowElement = document.createElement('tr');
      var studentName = document.createElement('td');
      studentName.textContent  = student.name;
      var course = document.createElement('td');
      course.textContent = student.course;
      var grade = document.createElement('td');
      grade.textContent = student.grade;
      studentRowElement.append(studentName);
      studentRowElement.append(course);
      studentRowElement.append(grade);
      tbody.appendChild(studentRowElement);

    }
  }
}
