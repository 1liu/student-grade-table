class PageHeader{
  constructor(headerElement){
    this.headerElement = headerElement;
  }

  updateAverage(newAverage){
    // console.log(newAverage);
    var badge = this.headerElement.querySelector(".badge");
    badge.textContent = newAverage;
  }

}
