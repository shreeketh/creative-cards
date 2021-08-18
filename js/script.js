const colors = [
  "#c0d860",
  "#ebefc9",
  "#fefeeb",
  "#2fb8ac",
  "#d4ee5e",
  "orange",
  "red",
];

const creatives = []
const filterColors = new Set()


class Todo {
  constructor() {
    this.creatives = []
    this.renderColorFilters("filterColors");
    this.renderColorFilters("drawerColorSelect");
    this.addListeners();
  }

  renderColorFilters(targetId, selectedColors=[]) {
    document.getElementById(targetId).innerHTML = colors.reduce(
      (prev = "", current) => {
        return (prev += ColorButton(current, selectedColors.includes(current)));
      },
      ""
    );
  }

  closeDrawer() {
    document.getElementsByTagName("aside")[0].style.display = "none";
  }

  showDrawer() {
    // this.renderColorFilters("drawerColorSelect");
    document.getElementsByTagName("aside")[0].style.display = "block";
  }

  addCreative(){
    const title = document.getElementById('title').value
    const subTitle = document.getElementById('subTitle').value
    const color = document.querySelectorAll("#drawerColorSelect > .selected")[0].getAttribute('data-value')
    creatives.push({title, subTitle, color})
    document.getElementsByTagName("aside")[0].style.display = "none";
    RenderCards()
  }

  onColorFilterSelect(e){
    const color = e.target.closest('.colorWrapper').getAttribute('data-value')
    if(filterColors.has(color)){
        filterColors.delete(color)
        e.target.closest('.colorWrapper').classList.remove('selected')
    } else {
        filterColors.add(color)
        e.target.closest('.colorWrapper').classList.add('selected')
    }

    RenderCards(creatives.filter(data => filterColors.has(data.color)))
  }

  onColorSelectInDrawer(e) {
    // this.selectedColorsInDrawer = e.target.closest('.colorWrapper').getAttribute('data-value')
    document.querySelectorAll("#drawerColorSelect > .selected").forEach(node => node.classList.remove("selected"))
    e.target.closest(".colorWrapper").classList.add("selected");
  }

  addListeners() {
    document
      .getElementById("closeDrawer")
      .addEventListener("click", this.closeDrawer);

    document
      .getElementById("openDrawer")
      .addEventListener("click", this.showDrawer);

    document
      .getElementById("drawerColorSelect")
      .addEventListener("click", this.onColorSelectInDrawer);

      document
      .getElementById("addCreative")
      .addEventListener("click", this.addCreative);

      document
      .getElementById("filterColors")
      .addEventListener("click", this.onColorFilterSelect);
  }
  
}

// Helpers
const ColorButton = (color, selected = false) => {
  return `
            <div class="${
              selected ? "selected" : "selectable"
            } colorWrapper" data-value=${color}>
                <div class="color" style="background-color:${color}" data-value=${color}></div>
            </div>`;
};

const RenderCards = (data = creatives)=> {

    document.getElementById('card-holder').innerHTML =  (data.length? data: creatives).reduce(
        (prev = "", current) => {
          return (prev += `<div class="card" style="background-color: ${current.color}">
            <h2>${current.title}</h2>
            <h4>${current.subTitle}</h4>
        </div>`);
        },
        ""
      );
}

// initialize the UI
(function init() {
  new Todo();
})();
