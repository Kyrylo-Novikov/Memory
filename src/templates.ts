import { Setting } from "./interfaces";

export function showSettingsTemplate() {
  return `<section class="settings-sec">
                          <h1 class="">Settings</h1>
                          <div class="setting-wrapper">
                            <div id="settings-content" class="settings-content"></div>
                            <div class="choosen">
                              <img class="img-theme" id="img-theme" src="public/assets/imgs/game-theme/theme-placeholder.png"  alt="img of the theme">
                              <aside>
                                <div class="single-choose-wrapper">Theme<div id="show-theme" class="output-choose"></div></div>
                                <span class="separator separator-unchecked"></span>
                                <div class="single-choose-wrapper" id="show-player">Player<div class="output-choose"></div></div>
                                <span class="separator separator-unchecked"></span>
                                <div class="single-choose-wrapper">Board size <div id="show-size" class="output-choose"></div></div>
                                <button class="btn __init-game" id="initGameBtn" disabled >
                                  <img src="assets/icons/smart_display.svg" alt="">
                                  Start
                                </button>
                              </aside>
                            </div>
                          </div>
                        </section>`;
}

export function createChooseTemplate(setting: Setting) {
  let construcktSettings = "";
  construcktSettings += `<div class="setting-choose-wrapper">
                                <img src="${setting.icon}" alt="Show icon for ${setting.legend}" class="icon-setting" srcset=""/>
                                <fieldset> 
                                  <legend>
                                  ${setting.legend}
                                  </legend><div class="option-wrapper">`;
  setting.option.forEach((opt) => {
    construcktSettings += `  <div> 
                                    <input name="${setting.type}" type="radio" value="${opt.value}" id="${opt.id}"/>
                                    <label for="${opt.id}">${opt.label}</label>
                                    <div class="visual-for-checked"> </div>
                                  </div>`;
  });
  construcktSettings += `</div></fieldset>
                              </div>`;
  return construcktSettings;
}
