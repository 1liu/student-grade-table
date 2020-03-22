class App {

  constructor(gradeTable, pageHeader, gradeForm) {
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
    this.gradeTable.updateGrades(grades);
    var sum = 0;
    for (var student of grades) {
      sum += student.grade;
    }
    var avg = sum / grades.length;
    this.pageHeader.updateAverage(avg);

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

  handleCreateGradeSuccess() {
    this.getGrades();
  }

  deleteGrade(id) {
    $.ajax({
      method: "DELETE",
      url: "https://sgt.lfzprototypes.com/api/grades/" + id,
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
    this.getGrades();
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

  handleEditGradeSuccess() {
    this.getGrades();
  }

  editGradeClicked(data) {
    this.gradeForm.switchForm(data);
  }

  start() {
    this.getGrades();
    this.gradeForm.onSubmit(this.createGrade);
    this.gradeTable.onDeleteClick(this.deleteGrade);
    this.gradeTable.onEditClick(this.editGradeClicked);
    this.gradeForm.onEdit(this.editGrade);

  }
}
