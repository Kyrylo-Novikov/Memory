export class Card {
  width: number = 120;
  height: number = 120;
  front: string = "";
  back: string = "";
  name: string = "";
  theme: string = "";
  readonly BASE_PATH: string = "/assets/imgs/";

  constructor(width: number, height: number, theme: string, name: string) {
    this.width = width;
    this.height = height;
    this.name = name;
    this.theme = theme;
    this.back = this.BASE_PATH + `${theme}/back/${theme}_back.svg`;
    this.front = this.BASE_PATH + `${theme}/front/${name}.svg`;
  }

  cardTemplate() {
    return `<div class="card" style="width:${this.width}px;height:${this.height}px">
                    <img class="" src="${this.back}" alt="Cardback for ${this.theme}${this.name}">
                    <img class="" src="${this.front}" alt="Cardfront for ${this.theme}${this.name}">
                  </div>`;
  }
}
