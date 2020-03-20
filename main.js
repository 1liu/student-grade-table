var table = document.querySelector("table");
var gradeTable = new GradeTable(table);
var header = document.querySelector(".averageGrade");
var pageHeader = new PageHeader(header);
var app = new App(gradeTable, pageHeader);
app.start();
