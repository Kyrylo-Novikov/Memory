import { Setting } from "./interfaces";
import { Player, Theme, FieldSize } from "./enums";
import { createChooseTemplate } from "./templates";
import { initGAme } from "./game";

/**
 * A array of the setting configuration from that you have to choose
 * - Game themes
 * - Player color selection
 * - Board size cards:@number
 */
let settings: Setting[] = [
  {
    icon: "assets/icons/choose_theme.svg",
    type: "theme",
    legend: "Game themes",
    option: [
      {
        id: Theme.coding,
        value: Theme.coding,
        label: "Code vibes theme",
        path: "assets/imgs/game-theme/theme-coding.svg",
      },
      {
        id: Theme.gaming,
        value: Theme.gaming,
        label: "Gaming theme",
        path: "assets/imgs/game-theme/theme-gaming.svg",
      },
      {
        id: Theme.projects,
        value: Theme.projects,
        label: "DA projects theme",
        path: "assets/imgs/game-theme/theme-projects.svg",
      },
      {
        id: Theme.foods,
        value: Theme.foods,
        label: "Foods theme",
        path: "assets/imgs/game-theme/theme-foods.svg",
      },
    ],
  },
  {
    icon: "assets/icons/choose_player.svg",
    type: "player",
    legend: "Choose player",
    option: [
      { id: Player.blue, value: Player.blue, label: "Blue" },
      { id: Player.orange, value: Player.orange, label: "Orange" },
    ],
  },
  {
    icon: "assets/icons/choose_stack_size.svg",
    type: "fieldSize",
    legend: "Board size",
    option: [
      { id: "small", value: FieldSize.small, label: "16 cards" },
      { id: "medium", value: FieldSize.medium, label: "24 cards" },
      { id: "large", value: FieldSize.large, label: "36 cards" },
    ],
  },
];

/**
 * Generates the settings template
 */
export function generateSettings() {
  const settingsRef = document.getElementById("settings-content") as HTMLElement;
  let settingCollect: string = "";
  settings.forEach((setting) => {
    settingCollect += createChooseTemplate(setting);
  });
  if (settingsRef) {
    settingsRef.innerHTML = settingCollect;
    addListenerOnRadioBtn();
  }
  return;
}

/**
 * Whenever genereting radio buttons, add a "change" eventlistener to them
 */
function addListenerOnRadioBtn(): void {
  let themeInputs = document.querySelectorAll("input[name]") as NodeListOf<HTMLInputElement>;
  themeInputs.forEach((inp) => {
    inp.addEventListener("change", settingCollector);
  });
}

/**
 * Update the theme image based on the selected radio button if it is a theme input
 * @param event -Change event triggert by a radio input
 */
function setThemeImg(event: Event) {
  let imgSettingsRef = document.getElementById("img-theme") as HTMLImageElement;
  const inputRef = event.target as HTMLInputElement;
  const themeValue = inputRef.value;
  if (inputRef.name !== "theme" || !imgSettingsRef) {
    return;
  }
  imgSettingsRef.src = `assets/imgs/game-theme/theme-${themeValue}.svg`;
}

function showChoosenSettings() {
  let settingAreas = document.querySelectorAll("fieldset") as NodeListOf<HTMLFieldSetElement>;
  let outputs = document.querySelectorAll(".output-choose") as NodeListOf<HTMLFieldSetElement>;
  for (let i = 0; i < settingAreas.length; i++) {
    const area = settingAreas[i];
    const outputFromSetting = outputs[i];
    let checked = area.querySelector("input:checked") as HTMLInputElement;
    if (checked) {
      outputFromSetting.textContent = checked.value;
      if (settingAreas.length === document.querySelectorAll("input:checked").length) {
        enableGameBtn();
        initGAme(checked.value);
      }
    }
  }
}

function settingCollector(event: Event) {
  showChoosenSettings();
  setThemeImg(event);
}

function enableGameBtn() {
  let initGameBtn = document.getElementById("initGameBtn") as HTMLButtonElement;
  initGameBtn.disabled = false;
}
