class GradeForm {
  constructor(formElement) {
    this.gradeNeedsEdit = null;
    this.formElement = formElement;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formElement.addEventListener('submit', this.handleSubmit);
    this.handleCancel = this.handleCancel.bind(this);
    this.formElement.addEventListener('reset', this.handleCancel);
  }

  onSubmit(createGrade) {
    this.createGrade = createGrade;
  }

  handleSubmit(event) {
    event.preventDefault();
    var formData = new FormData(event.target);
    if (this.gradeNeedsEdit) {
      this.editGrade(this.gradeNeedsEdit.id,formData.get('name'), formData.get('course'), formData.get('grade'));

    } else {
      this.createGrade(formData.get('name'), formData.get('course'), formData.get('grade'));
    }
    this.resetForm(event);
  }

  handleCancel(event) {
    this.resetForm(event);
  }

  onEdit(editGrade) {
    this.editGrade = editGrade;
  }

  switchForm(data) {
    this.gradeNeedsEdit = data;
    this.formElement.querySelector('#name').value = data.name;
    this.formElement.querySelector('#course').value = data.course;
    this.formElement.querySelector('#grade').value = data.grade;
    this.formElement.querySelector('.formTitle').textContent = "Edit Grade";
    this.formElement.querySelector('.btn-success').textContent = "Update";
  }

  resetForm(event){
    this.gradeNeedsEdit = null;
    this.formElement.querySelector('.formTitle').textContent = "Add Grade";
    this.formElement.querySelector('.btn-success').value = "Add";
    event.target.reset();
  }


}
