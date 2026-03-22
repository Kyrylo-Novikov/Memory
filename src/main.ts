import "./styles/style.scss";
import { Setting } from "./interfaces";
import { Player, Theme, FieldSize } from "./enums";

const fieldRef = document.getElementById("field") as HTMLElement;
const startBtnRef = document.querySelector("#startBtn") as HTMLButtonElement;

startBtnRef.addEventListener("click", openSettings);

function openSettings() {
  toggleStyleClass("start", "settings");
  fieldRef.innerHTML = `<section class="settings-sec">
                          <h1>Settings</h1>
                          <div class="setting-wrapper">
                          <div id="settings-content"></div>
                          <div class="choosen-theme">
                          <img class="img-theme" id="img-theme" src=""  alt="img of the theme">
                          <div>Zeile die die auswahl anzeigt</div>
                          </div>
                          </div>
                        </section>`;
  generateFieldsetSettings();
}

function setThemeImg(event: Event) {
  let imgSettingsRef = document.getElementById("img-theme") as HTMLImageElement;
  const inputRef = event.target as HTMLInputElement;
  const themeValue = inputRef.value;
  imgSettingsRef.src = `public/assets/imgs/game-theme/theme-${themeValue}.svg`;
}

function toggleStyleClass(currentClass: string, newClass: string) {
  let bodyRef = document.body;
  bodyRef.classList.toggle(currentClass);
  bodyRef.classList.toggle(newClass);
}

function generateFieldsetSettings() {
  const settingsRef = document.getElementById(
    "settings-content",
  ) as HTMLElement;
  let settingCollect: string = "";
  settings.forEach((setting) => {
    settingCollect += `<div class="setting-choose-wrapper">
                        <img src="${setting.icon}" alt="Show icon for ${setting.legend}" class="icon-setting" srcset=""/><fieldset> 
                        <legend >${setting.legend}</legend>`;
    setting.options.forEach((opt) => {
      settingCollect += ` <div>
                            <input name="${setting.type}" type="radio" value="${opt.value}" id="${opt.id}"/>
                            <label for="${opt.id}">${opt.label}</label>
                          </div>`;
    });
    settingCollect += `</fieldset></div>`;
  });
  if (settingsRef) {
    settingsRef.innerHTML = settingCollect;
    let themeInputs = document.querySelectorAll(
      "input[name=theme]",
    ) as NodeListOf<HTMLInputElement>;
    themeInputs.forEach((inp) => {
      inp.addEventListener("change", setThemeImg);
    });
  }
}

let settings: Setting[] = [
  {
    icon: "public/assets/icons/choose_theme.svg",
    type: "theme",
    legend: "Game themes",
    options: [
      {
        id: Theme.coding,
        value: Theme.coding,
        label: "Code vibes theme",
        path: "public/assets/imgs/game-theme/theme-coding.svg",
      },
      {
        id: Theme.gaming,
        value: Theme.gaming,
        label: "Gaming theme",
        path: "public/assets/imgs/game-theme/theme-gaming.svg",
      },
      {
        id: Theme.projects,
        value: Theme.projects,
        label: "DA projects theme",
        path: "public/assets/imgs/game-theme/theme-projects.svg",
      },
      {
        id: Theme.foods,
        value: Theme.foods,
        label: "Foods theme",
        path: "public/assets/imgs/game-theme/theme-foods.svg",
      },
    ],
  },
  {
    icon: "public/assets/icons/choose_player.svg",
    type: "player",
    legend: "Choose player",
    options: [
      { id: Player.blue, value: Player.blue, label: "Blue" },
      { id: Player.orange, value: Player.orange, label: "Orange" },
    ],
  },
  {
    icon: "public/assets/icons/choose_stack_size.svg",
    type: "fieldSize",
    legend: "Board size",
    options: [
      { id: "small", value: FieldSize.small, label: "16 cards" },
      { id: "medium", value: FieldSize.medium, label: "24 cards" },
      { id: "large", value: FieldSize.large, label: "36 cards" },
    ],
  },
];
