/**
 * Represents a single memory card with a front image, back image, height, width, name and theme.
 */
export class Card {
  width: number = 120;
  height: number = 120;
  /** Whole string for the image source of the card front */
  front: string = "";
  /** Whole string for the image source of the card back */
  back: string = "";
  name: string = "";
  theme: string = "";
  /** Base path to the images */
  readonly BASE_PATH: string = "/assets/imgs/";

  /**
   * @param width Width of the card in pixels
   * @param height Height of the card in pixels
   * @param theme Theme name used to resolve image paths
   * @param name Card name used to resolve the front image path
   */
  constructor(width: number, height: number, theme: string, name: string) {
    this.width = width;
    this.height = height;
    this.name = name;
    this.theme = theme;
    this.back = this.BASE_PATH + `${theme}/back/${theme}_back.svg`;
    this.front = this.BASE_PATH + `${theme}/front/${name}.svg`;
  }

  /**
   * Template for a dynamic configurated card
   * @returns The template for one Card
   */
  cardTemplate() {
    return `<div class="card" style="width:${this.width}px;height:${this.height}px" data-name=${this.name}>
                    <img class="card__face card__face--front" src="${this.front}" alt="Cardfront for ${this.name}">
                    <img class="card__face card__face--back" src="${this.back}" alt="Cardback for ${this.name}">
                  </div>`;
  }
}
