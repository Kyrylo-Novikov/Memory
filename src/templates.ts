import { Setting } from "./interfaces";

export function showSettingsTemplate() {
  return `<section class="settings-sec">
                          <h1>Settings</h1>
                          <div class="setting-wrapper">
                            <div id="settings-content"></div>
                            <div class="choosen">
                              <img class="img-theme" id="img-theme" src=""  alt="img of the theme">
                              <aside>
                                <div id="show-theme" class="output-choose">Game theme</div>
                                <span class="separator"></span>
                                <div id="show-player"class="output-choose">Player</div>
                                <span class="separator"></span>
                                <div id="show-size" class="output-choose">Board size</div>
                                <button id="initGameBtn" disabled >
                                  <img src="" alt="">
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
                                  <legend >
                                  ${setting.legend}
                                  </legend>`;
  setting.option.forEach((opt) => {
    construcktSettings += `   <div>
                                    <input name="${setting.type}" type="radio" value="${opt.value}" id="${opt.id}"/>
                                    <label for="${opt.id}">${opt.label}</label>
                                  </div>`;
  });
  construcktSettings += `</fieldset>
                              </div>`;
  return construcktSettings;
}
