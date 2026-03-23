import "./styles/style.scss";
import { showSettingsTemplate } from "./templates";
import { generateSettings } from "./settings";

const fieldRef = document.getElementById("field") as HTMLElement;
const startBtnRef = document.querySelector("#startBtn") as HTMLButtonElement;
startBtnRef.addEventListener("click", openSettings);

/**
 *Generates the whole setting layout and change the style of the body
 */
function openSettings(): void {
  toggleStyleClass("start", "settings");
  fieldRef.innerHTML = showSettingsTemplate();
  generateSettings();
}

/**
 * Toggle the classes on the body for change of the displayed style
 * @param firstClass  class that i wont to change
 * @param secondClass class that i wont to add
 */
function toggleStyleClass(firstClass: string, secondClass: string): void {
  let bodyRef = document.body;
  bodyRef.classList.toggle(firstClass);
  bodyRef.classList.toggle(secondClass);
}
