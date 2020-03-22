class App {

  constructor(gradeTable, pageHeader, gradeForm) {
    this.grades = null;
    this.deleteId = null;
    this.gradeTable = gradeTable;
    this.pageHeader = pageHeader;
    this.gradeForm = gradeForm;
    this.handleGetGradesError = this.handleGetGradesError.bind(this);
    this.handleGetGradesSuccess = this.handleGetGradesSuccess.bind(this);
    this.createGrade = this.createGrade.bind(this);
    this.handleCreateGradeError = this.handleCreateGradeError.bind(this);
    this.handleCreateGradeSuccess = this.handleCreateGradeSuccess.bind(this);
    this.deleteGrade = this.deleteGrade.bind(this);
    this.handleDeleteGradeError = this.handleDeleteGradeError.bind(this);
    this.handleDeleteGradeSuccess = this.handleDeleteGradeSuccess.bind(this);
    this.editGrade = this.editGrade.bind(this);
    this.handleEditGradeError = this.handleEditGradeError.bind(this);
    this.handleEditGradeSuccess = this.handleEditGradeSuccess.bind(this);
    this.editGradeClicked = this.editGradeClicked.bind(this);
  }

  getGrades() {
    $.ajax({
      method: "GET",
      url: "https://sgt.lfzprototypes.com/api/grades",
      headers: { "X-Access-Token": "xDx3SQaY" },
      success: this.handleGetGradesSuccess,
      error: this.handleGetGradesError
    })
  }

  handleGetGradesError(error) {
    console.error(error);
  }

  handleGetGradesSuccess(grades) {
    this.grades = grades;
    this.update();

  }

  createGrade(name, course, grade) {
    $.ajax({
      method: "POST",
      url: "https://sgt.lfzprototypes.com/api/grades",
      headers: { "X-Access-Token": "xDx3SQaY" },
      data: {
        "name": name,
        "course": course,
        "grade": grade
      },
      complete: function () {
        console.log("Grade Added");
      },
      success: this.handleCreateGradeSuccess,
      error: this.handleCreateGradeError
    })
  }

  handleCreateGradeError(error) {
    console.error(error);
  }

  handleCreateGradeSuccess(addedGrade) {
    console.log("test:", addedGrade);
    this.addedGrade = addedGrade;
    this.grades.push(addedGrade);
    this.update();
  }

  deleteGrade(deleteGrade) {
    this.deleteId = deleteGrade.id;
    $.ajax({
      method: "DELETE",
      url: "https://sgt.lfzprototypes.com/api/grades/" + this.deleteId,
      headers: { "X-Access-Token": "xDx3SQaY" },
      complete: function () {
        console.log("Grade Deleted");
      },
      success: this.handleDeleteGradeSuccess,
      error: this.handleDeleteGradeError,
    })
  }


  handleDeleteGradeError(error) {
    console.error(error);
  }

  handleDeleteGradeSuccess() {
    // this.getGrades();
    for (let i = 0; i < this.grades.length; i++) {
      if (this.grades[i].id === this.deleteId) {
        this.grades.splice(i, 1);
        this.deleteId = null;
        break;
      }
    }
    this.update();
  }

  editGrade(id, name, course, grade) {
    $.ajax({
      method: "PATCH",
      url: "https://sgt.lfzprototypes.com/api/grades/" + id,
      headers: { "X-Access-Token": "xDx3SQaY" },
      data: {
        "name": name,
        "course": course,
        "grade": grade
      },
      complete: function () {
        console.log("Grade Edited");
      },
      success: this.handleEditGradeSuccess,
      error: this.handleEditGradeError,
    })
  }

  handleEditGradeError(error) {
    console.error(error);
  }

  handleEditGradeSuccess(editedGrade) {
    console.log("test:", editedGrade);
    for (let i = 0; i < this.grades.length; i++) {
      if (this.grades[i].id == editedGrade.id) {
        this.grades[i] = editedGrade;
      }
    }

    this.gradeTable.updateGrades(this.grades);
    var sum = 0;
    for (var student of this.grades) {
      sum += Number(student.grade);
    }
    var avg = sum / this.grades.length;
    this.pageHeader.updateAverage(avg);
  }

  editGradeClicked(data) {
    this.gradeForm.switchForm(data);
  }

  update() {
    this.gradeTable.updateGrades(this.grades);
    var sum = 0;
    for (var student of this.grades) {
      sum += Number(student.grade);
    }
    var avg = sum / this.grades.length;
    this.pageHeader.updateAverage(avg);
  }

  start() {
    this.getGrades();
    this.gradeForm.onSubmit(this.createGrade);
    this.gradeTable.onDeleteClick(this.deleteGrade);
    this.gradeTable.onEditClick(this.editGradeClicked);
    this.gradeForm.onEdit(this.editGrade);

  }
}
