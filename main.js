
var gradeTable = new GradeTable(document.querySelector("table"));
var pageHeader = new PageHeader(document.querySelector("header"));
var gradeForm = new GradeForm(document.querySelector(".gradeForm"));
var app = new App(gradeTable, pageHeader, gradeForm);
app.start();
