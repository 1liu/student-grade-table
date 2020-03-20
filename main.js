var table = document.querySelector("table");
var gradeTable = new GradeTable(table);
var header = document.querySelector("header");
var pageHeader = new PageHeader(header);
var gradeFormEl = document.querySelector(".gradeForm");
var gradeForm = new GradeForm(gradeFormEl);
var app = new App(gradeTable, pageHeader, gradeForm);
app.start();
