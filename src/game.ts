import { fieldRef, toggleStyleClass } from "./main";
import { GameInt } from "./interfaces";
import { Card } from "./card";
import { createGameFieldTemplate, finishGameTemp } from "./templates";

export class Game {
  flippedCardsData: string[] = [];
  flippedCards: HTMLElement[] = [];
  foundetCardsData: string[] = [];
  foundetCards: HTMLElement[] = [];
  currentGame: GameInt | null = null;
  cardList: Card[] = [];
  scoreBlue: number = 0;
  scoreOrange: number = 0;
  count: number = 0;
  currentPlayer: "orange" | "blue" | "" = "";
  colum: number = 4;
  themeSizes: { [key: string]: { width: number; height: number } } = {
    coding: {
      width: 120,
      height: 120,
    },
    gaming: {
      width: 105,
      height: 120,
    },
    projects: {
      width: 120,
      height: 100,
    },
    foods: {
      width: 122,
      height: 122,
    },
  };
  sizeCard: { width: number; height: number };

  gameTemplate() {
    fieldRef.innerHTML = createGameFieldTemplate(this);
    const menuOL = document.querySelector(".quit-menu-overlay") as HTMLElement;
    document.getElementById("exit-btn")?.addEventListener("click", () => {
      menuOL?.classList.add("show");
    });
    document.getElementById("back-to-game")?.addEventListener("click", () => {
      menuOL?.classList.remove("show");
    });
    toggleStyleClass(document.body, "settings", "game");
  }

  theme() {
    let element = document.body.dataset;
    if (element) {
      element.theme = this.currentGame?.theme || "default";
    }
  }
  constructor() {
    this.currentGame = this.creatCurrentgame();
    this.sizeCard = this.themeSizes[this.currentGame!.theme];
    this.currentPlayer = this.currentGame?.player as "orange" | "blue";
    this.gameTemplate();
    this.theme();
    let gamefield = document.getElementById("game-field");
    if (gamefield && this.currentGame) {
      this.listnerToClick(gamefield);
      this.adjustGrid(gamefield, this.currentGame);
    }
  }

  listnerToClick(gamefield: HTMLElement) {
    gamefield?.addEventListener("click", (e: Event) => {
      let target = e.target as HTMLElement;
      let clickedCard = target.closest(".card") as HTMLElement;
      if (!clickedCard || this.flippedCards.length >= 2 || clickedCard.classList.contains("card--flipped")) return;
      clickedCard.classList.add("card--flipped");
      let dataName = clickedCard.dataset.name;
      this.flippedCards.push(clickedCard);
      this.flippedCardsData.push(dataName!);
      if (this.flippedCards.length == 2) {
        this.handleClickedCards();
      }
    });
  }

  handleClickedCards() {
    if (this.flippedCardsData[0] === this.flippedCardsData[1]) {
      this.matchedPair();
    } else {
      this.noMatchedPair();
    }
  }

  matchedPair() {
    this.transferFromArray(this.flippedCardsData, this.foundetCardsData);
    this.transferFromArray(this.flippedCards, this.foundetCards);
    this.displayPoints();
    if (!this.currentGame) return;
    if (this.scoreBlue > this.currentGame.cards / 4 || this.scoreOrange > this.currentGame.cards / 4) {
      document.getElementById("field")?.classList.add("win-screen");
      let gamefield = document.getElementById("game-field-wrapper") as HTMLElement;
      if (gamefield) {
        gamefield.innerHTML = finishGameTemp(this);
      }
    } else if (this.scoreBlue == this.currentGame.cards / 4 && this.scoreOrange == this.currentGame.cards / 4) {
      console.log("ein Unentschieden");
    }
    return;
  }

  displayPoints() {
    let playerBlueCount = document.getElementById("count-blue") as HTMLElement;
    let playerOrangeCount = document.getElementById("count-orange") as HTMLElement;
    if (this.currentPlayer == "blue") {
      this.scoreBlue++;
      playerBlueCount.innerHTML = this.scoreBlue.toString();
    } else {
      this.scoreOrange++;
      playerOrangeCount.innerHTML = this.scoreOrange.toString();
    }
  }

  noMatchedPair() {
    setTimeout(() => {
      this.flippedCards.forEach((card) => {
        card.classList.remove("card--flipped");
      });
      this.flippedCardsData = [];
      this.flippedCards = [];
      this.playerChange();
    }, 500);
  }

  playerChange() {
    this.currentPlayer = this.currentPlayer == "blue" ? "orange" : "blue";
    toggleStyleClass(document.getElementById("current-player") as HTMLElement, "blue", "orange");
  }

  transferFromArray<T>(arrayToTake: T[], arrayToGive: T[]) {
    arrayToTake.forEach((e) => {
      arrayToGive.push(e);
    });
    arrayToTake.length = 0;
  }

  adjustGrid(gamefield: HTMLElement, currentGame: GameInt) {
    this.takeCardsForGame(currentGame, gamefield);
    if (this.cardList.length > 16) {
      this.colum = 6;
    }
    gamefield.style.gridTemplateColumns = `repeat(${this.colum}, max-content)`;
    gamefield.style.perspective = `1000px`;
  }

  takeCardsForGame(currentGame: GameInt, gamefield: HTMLElement) {
    for (let i = 1; i < currentGame.cards / 2 + 1; i++) {
      let cardName = currentGame.theme + i;
      let card = new Card(this.sizeCard.width, this.sizeCard.height, currentGame.theme, cardName);
      let cardDobble = new Card(this.sizeCard.width, this.sizeCard.height, currentGame.theme, cardName);
      this.cardList.push(card, cardDobble);
    }
    this.shuffle(this.cardList);
    this.cardList.forEach((card) => {
      gamefield.innerHTML += card.cardTemplate();
    });
  }

  creatCurrentgame() {
    let choosenTheme = document.querySelector('input[name="theme"]:checked') as HTMLInputElement;
    let choosenPlayer = document.querySelector('input[name="player"]:checked') as HTMLInputElement;
    let choosenCards = document.querySelector('input[name="fieldSize"]:checked') as HTMLInputElement;
    return (this.currentGame = {
      theme: choosenTheme.value,
      player: choosenPlayer.value,
      cards: Number(choosenCards.value),
    });
  }

  /**
   * Fisher-Yates-Shuffle
   * @param array Array with all card for this game
   */
  shuffle(array: Card[]) {
    let currentIndex = array.length;
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  }
}
