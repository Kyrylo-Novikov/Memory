import "./styles/style.scss";
import { showSettingsTemplate } from "./templates";
import { generateSettings } from "./settings";
import { Game } from "./game";

export const fieldRef = document.getElementById("field") as HTMLElement;
const startBtnRef = document.querySelector("#startBtn") as HTMLButtonElement;
startBtnRef.addEventListener("click", openSettings);
export let currentGame: Game | null = null;
fieldRef.addEventListener("click", (e) => {
  newGame(e);
});

/**
 * Handles the new game flow when the "back to settings" button is clicked.
 * Resets the current game, switches the UI back to the settings screen
 * and reinitializes the game setup.
 * @param e The click event from the "back to settings" button
 */
function newGame(e: Event) {
  let target = e.target as HTMLElement;
  if (!target) return;
  if (target.closest("#back-to-settings")) {
    currentGame = null;
    toggleStyleClass(document.getElementById("field") as HTMLElement, "win-screen", "-");
    toggleStyleClass(document.body, "game", "settings");
    fieldRef.innerHTML = showSettingsTemplate();
    generateSettings();
    startGame();
  }
}

/**
 * Generates the whole setting layout and change the style of the body
 */
function openSettings(): void {
  toggleStyleClass(document.body, "start", "settings");
  fieldRef.innerHTML = showSettingsTemplate();
  generateSettings();
  startGame();
}

/**
 * Registers a click listener on the "init Game" button
 * that creates a new game on clicked
 */
function startGame() {
  let initGameBtn = document.getElementById("initGameBtn") as HTMLButtonElement;
  if (initGameBtn) {
    initGameBtn.addEventListener("click", () => {
      currentGame = new Game();
    });
  }
}

/**
 * Toggle the classes on the body for change of the displayed style
 * @param element  HTMLElement for class change
 * @param firstClass  class to toggle
 * @param secondClass class to toggle
 */
export function toggleStyleClass(element: HTMLElement, firstClass: string, secondClass: string): void {
  let elementRef = element;
  if (elementRef) {
    elementRef.classList.toggle(firstClass);
    elementRef.classList.toggle(secondClass);
  }
}
