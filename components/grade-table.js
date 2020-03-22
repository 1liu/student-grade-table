class GradeTable {
  constructor(tableElement) {
    this.tableElement = tableElement;
  }

  updateGrades(grades) {
    // console.log(grades);
    var tbody = this.tableElement.querySelector("tbody");
    tbody.innerHTML = "";

    for (var student of grades) {
      tbody.append(this.renderGradeRow(student, this.deleteGrade));
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
    btn.textContent = "DELETE";
    btn.className = "btn btn-danger";
    btnTd.append(btn);
    studentRowElement.append(btnTd);
    btn.addEventListener("click", function () {
      deleteGrade(data.id);
    })
    return studentRowElement;
  }
}
