class GradeTable {
  constructor(tableElement) {
    this.tableElement = tableElement;
  }

  updateGrades(grades) {
    // console.log(grades);
    var tbody = this.tableElement.querySelector("tbody");
    tbody.innerHTML = "";
    // if (tbody.hasChildNodes()) {
    //   tbody.removeChild(tbody.childNodes[0]);
    // }

    for (var student of grades) {
      var studentRowElement = document.createElement('tr');
      var studentName = document.createElement('td');
      studentName.textContent = student.name;
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

  onDeleteClick(deleteGrade) {
    this.deleteGrade = deleteGrade;
  }

  renderGradeRow(data, deleteGrade) {
    var studentRowElement = document.createElement('tr');
    var studentName = document.createElement('td');
    studentName.textContent = data.name;
    var course = document.createElement('td');
    course.textContent = data.course;
    var grade = document.createElement('td');
    grade.textContent = data.grade;
    studentRowElement.append(studentName);
    studentRowElement.append(course);
    studentRowElement.append(grade);
    var btnTd = document.createElement('td');
    var btn = document.createElement('button');
    btn.className = "btn btn-warning";
    btnTd.append(btn);
    studentRowElement.append(btnTd);
    return studentRowElement;
  }
}
