import { fieldRef, toggleStyleClass } from "./main";
import { GameInt } from "./interfaces";
import { Card } from "./card";
import { createGameFieldTemplate, finishGameTemp, showWinnerTemplate } from "./templates";

/**
 * Represents a running game instance, managing cards, players, scores and game state.
 */
export class Game {
  theme: string = "";
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
  /** Number of columns in the game field grid */
  colum: number = 4;
  /** Card sizes per theme in pixels */
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

  /**
   * Initializes the game by creating the game configuration, setting the theme,
   * rendering the game template and setting up the game field with cards and click listeners.
   */
  constructor() {
    this.currentGame = this.creatCurrentgame();
    this.sizeCard = this.themeSizes[this.currentGame!.theme];
    this.currentPlayer = this.currentGame?.player as "orange" | "blue";
    this.gameTemplate();
    this.setTheme();
    let gamefield = document.getElementById("game-field");
    if (gamefield && this.currentGame) {
      this.listenerToClick(gamefield);
      this.adjustGrid(gamefield, this.currentGame);
    }
  }

  /**
   * Display the game template and registers click listeners
   * on the menu buttens to show and hide the quit menu.
   * Changes body class from "settings" to "game"
   */
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

  /**
   * Sets the dataset of the body to the theme to use the theme specific style
   */
  setTheme() {
    let element = document.body.dataset;
    if (element) {
      element.theme = this.currentGame?.theme || "default";
    }
  }

  /**
   * Listens to clicks on the gamefield if its cards gives them the class "card--fliepped"
   * and collects the HTML structure and the dataset name from the clicked cards to compare them
   * if two cards are flipped calls "handleClickedCards()"
   * @param gamefield This is the area where the cards are placed
   */
  listenerToClick(gamefield: HTMLElement) {
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

  /**
   * When cards are matched, adds the "card--matched" class
   * and calls "matchedPair()".
   * Otherwise calls "noMatchedPait()"
   */
  handleClickedCards() {
    if (this.flippedCardsData[0] === this.flippedCardsData[1]) {
      this.flippedCards.forEach((card) => {
        card.classList.add("card--matched");
      });
      this.matchedPair();
    } else {
      this.noMatchedPair();
    }
  }

  /**
   * Handles a matched card pair by transferring the flipped cards
   * to the found cards arrays, updating the points display
   * and changes the game template.
   */
  matchedPair() {
    this.transferFromArray(this.flippedCardsData, this.foundetCardsData);
    this.transferFromArray(this.flippedCards, this.foundetCards);
    this.displayPoints();
    this.templateDecision();
  }

  /**
   * Evaluates the current score and decides which template to display.
   * Shows the win template if one player has more than the half of all points,
   * or the draw template if both players have equal scores.
   */
  templateDecision() {
    let gamefieldWrapper = document.getElementById("game-field-wrapper") as HTMLElement;
    if (!this.currentGame) return;
    if (this.scoreBlue > this.currentGame.cards / 4 || this.scoreOrange > this.currentGame.cards / 4) {
      this.winTemplateChanges(gamefieldWrapper);
    } else if (this.scoreBlue == this.currentGame.cards / 4 && this.scoreOrange == this.currentGame.cards / 4) {
      gamefieldWrapper.innerHTML = finishGameTemp(this);
    }
  }

  /**
   * Adds the "win-screen" class to the field and displays the finish template.
   * After 3 seconds or on click, switches to the winner template.
   * @param gamefieldWrappeer The wrapper element of the game field
   */
  winTemplateChanges(gamefieldWrapper: HTMLElement) {
    document.getElementById("field")?.classList.add("win-screen");
    if (gamefieldWrapper) {
      setTimeout(() => {
        gamefieldWrapper.innerHTML = finishGameTemp(this);
        fieldRef.addEventListener("click", () => {
          clearTimeout(timerChangeTemplate);
          gamefieldWrapper.innerHTML = showWinnerTemplate(this);
        });
        let timerChangeTemplate = setTimeout(() => {
          gamefieldWrapper.innerHTML = showWinnerTemplate(this);
        }, 3000);
      }, 20);
    }
  }

  /**
   * Increments the current player's score and updates the display.
   */
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

  /**
   * Handles a non-matching card pair by removing the "card--flipped" class,
   * resetting the flipped cards arrays and switching the current player.
   * Executes after a 500ms delay to let the player see the cards.
   */
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

  /**
   * Switching the current player and updates the player indicator style.
   */
  playerChange() {
    this.currentPlayer = this.currentPlayer == "blue" ? "orange" : "blue";
    toggleStyleClass(document.getElementById("current-player") as HTMLElement, "blue", "orange");
  }

  /**
   * Transfers all elements from one array to another and clears the source array.
   * @param arrayToTake The source array to transfer elements from
   * @param arrayToGive The target array to transfer elements to
   */
  transferFromArray<T>(arrayToTake: T[], arrayToGive: T[]) {
    arrayToTake.forEach((e) => {
      arrayToGive.push(e);
    });
    arrayToTake.length = 0;
  }

  /**
   * Adjusts the grid layout of the game field based on the number of cards.
   * Sets the column count to 6 if there are more than 16 cards.
   * @param gamefield The game field element to adjust
   * @param currentGame The current game instance containing the card settings
   */
  adjustGrid(gamefield: HTMLElement, currentGame: GameInt) {
    this.takeCardsForGame(currentGame, gamefield);
    if (this.cardList.length > 16) {
      this.colum = 6;
    }
    gamefield.style.gridTemplateColumns = `repeat(${this.colum}, max-content)`;
    gamefield.style.perspective = `1000px`;
  }

  /**
   * Creates pairs of cards based on the current game settings,
   * shuffles them and renders them into the game field.
   * @param currentGame The current game instance containing theme and card count
   * @param gamefield The game field element to render the cards into
   */
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

  /**
   * Reads the checked settings inputs and creates the current game configuration.
   * @returns The created game configuration object with theme, player and card count
   */
  creatCurrentgame() {
    let choosenTheme = document.querySelector('input[name="theme"]:checked') as HTMLInputElement;
    let choosenPlayer = document.querySelector('input[name="player"]:checked') as HTMLInputElement;
    let choosenCards = document.querySelector('input[name="fieldSize"]:checked') as HTMLInputElement;
    this.theme = choosenTheme.value;
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
