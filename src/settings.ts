import { Setting } from "./interfaces";
import { Player, Theme, FieldSize } from "./enums";
import { createChooseTemplate } from "./templates";
import { toggleStyleClass } from "./main";

/**
 * A array of the setting configuration from that you have to choose
 * - Game themes
 * - Player color selection
 * - Board size cards:@number
 */
export let settings: Setting[] = [
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
 * Generates the settings  from the settings array and injects it
 * into the DOM, then registers change listeners on all radio buttons.
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
}

/**
 * Whenever genereting radio buttons, add a "change" eventlistener to them
 * this calls "settingCollector"
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
  if (inputRef.name !== "theme" || !imgSettingsRef) return;
  imgSettingsRef.src = `assets/imgs/game-theme/theme-${themeValue}.svg`;
}

/**
 * Reads all fieldsets and calls "updateUIForChosen()" to transfer the value to the output area.
 * If all settings have a checked value, calls "styleFinishedChoice()" to style
 * the output area and enable the start button
 */
function showChosenSettings() {
  let settingAreas = document.querySelectorAll("fieldset") as NodeListOf<HTMLFieldSetElement>;
  let outputs = document.querySelectorAll(".output-chosen") as NodeListOf<HTMLFieldSetElement>;
  for (let i = 0; i < settingAreas.length; i++) {
    const area = settingAreas[i];
    const outputFromSetting = outputs[i];
    let checked = area.querySelector("input:checked") as HTMLInputElement;
    if (!checked) continue;
    updateUIForChosen(checked, outputFromSetting);
    if (settingAreas.length === document.querySelectorAll("input:checked").length) {
      styleFinishedChoice();
    }
  }
}

/**
 * Updates the output element to display the chosen setting value.
 * @param checked The currently checked input element whose value will be displayed
 * @param outputFromSetting The output elemnt that displays the chosen value
 */
function updateUIForChosen(checked: HTMLInputElement, outputFromSetting: HTMLElement) {
  if (checked.value === "16" || checked.value === "24" || checked.value === "36") {
    outputFromSetting.textContent = "- " + checked.value;
  } else {
    outputFromSetting.textContent = checked.value.charAt(0).toUpperCase() + checked.value.slice(1);
  }
}

/**
 * Calls two function for updating the settings template
 * @param event The change event updates the theme image
 */
function settingCollector(event: Event) {
  showChosenSettings();
  setThemeImg(event);
}

/**
 * Enables the start button by removing the disabled attribute
 * and updates the separator styles by calling "toggleStyleClass()"
 */
function styleFinishedChoice() {
  let initGameBtn = document.getElementById("initGameBtn") as HTMLButtonElement;
  initGameBtn.disabled = false;
  let separators = document.querySelectorAll(".separator-unchecked") as NodeListOf<HTMLElement>;
  if (separators) {
    separators.forEach((sep) => {
      toggleStyleClass(sep, "separator-unchecked", "separator-checked");
    });
  }
}
