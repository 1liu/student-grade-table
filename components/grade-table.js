class GradeTable {
  constructor(tableElement, noGradesElement) {
    this.tableElement = tableElement;
    this.noGradesElement = noGradesElement;
  }

  updateGrades(grades) {
    var tbody = this.tableElement.querySelector("tbody");
    if (grades.length == 0) {
      tbody.innerHTML = "";
      this.noGradesElement.classList.remove("d-none");
    } else {
      tbody.innerHTML = "";
      for (var student of grades) {
        tbody.append(this.renderGradeRow(student, this.deleteGrade, this.editGradeClicked));
      }
      this.noGradesElement.classList.add("d-none");
    }
  }

  onDeleteClick(deleteGrade) {
    this.deleteGrade = deleteGrade;
  }

  onEditClick(editGradeClicked) {
    this.editGradeClicked = editGradeClicked;
  }

  renderGradeRow(data, deleteGrade, editGradeClicked) {
    var studentRowElement = document.createElement('tr');
    // studentRowElement.className = "row";
    var studentName = document.createElement('td');
    studentName.textContent = data.name;
    // studentName.classList.add('col-3');
    var course = document.createElement('td');
    course.textContent = data.course;
    // course.classList.add('col-3');
    var grade = document.createElement('td');
    grade.textContent = data.grade;
    // grade.classList.add('col-3');
    studentRowElement.append(studentName);
    studentRowElement.append(course);
    studentRowElement.append(grade);
    var buttons = document.createElement('td');
    buttons.className = "d-flex justify-content-end";
    var editBtn = document.createElement('i');
    editBtn.addEventListener("click", function () {
      editGradeClicked(data);
    })
    editBtn.className = "fas fa-edit text-success ml-3";
    buttons.appendChild(editBtn);
    var delBtn = document.createElement('i');
    delBtn.addEventListener("click", function () {
      deleteGrade(data);
    })
    delBtn.className = "fas fa-trash text-danger ml-3";
    buttons.appendChild(delBtn);
    studentRowElement.append(buttons);
    return studentRowElement;
  }
}
