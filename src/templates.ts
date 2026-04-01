import { Setting } from "./interfaces";
import { Game } from "./game";

/**
 * Returns the HTML template string for the settings screen.
 */
export function showSettingsTemplate() {
  return `<section class="settings-sec">
                          <h1 class="">Settings</h1>
                          <div class="setting-wrapper">
                            <div id="settings-content" class="settings-content"></div>
                            <div class="choosen">
                              <img class="img-theme" id="img-theme" src="/assets/imgs/game-theme/theme-placeholder.png"  alt="img of the theme">
                              <aside>
                                <div class="single-choose-wrapper">Theme<div id="show-theme" class="output-chosen"></div></div>
                                <span class="separator separator-unchecked"></span>
                                <div class="single-choose-wrapper" id="show-player">Player<div class="output-chosen"></div></div>
                                <span class="separator separator-unchecked"></span>
                                <div class="single-choose-wrapper">Board size <div id="show-size" class="output-chosen"></div></div>
                                <button class="btn btn--init-game" disabled id="initGameBtn"  >
                                  <img class="img-hover" src="assets/icons/smart_display.svg" alt="">
                                  Start
                                </button>
                              </aside>
                            </div>
                          </div>
                        </section>`;
}

/**
 * Returns the HTML template string for a single setting group with radio buttons.
 * @param setting The setting object containing typ, legend, icon and options
 * @returns The HTML template string for the setting group
 */
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

/**
 * Returns the HTML template string for the game field including
 * the player scores, current player indicator and exit menu.
 * @param currentGame The current game instance used to display the active player
 */
export function createGameFieldTemplate(currentGame: Game) {
  return `<section class="game-field-section">
                          <div class="game-field-wrapper" id="game-field-wrapper">
                            <header>
                              <div class="player-wrapper">
                                <div class="first-player">
                                  <div class="blue player-icon"></div>
                                  <div class="player-name">Blue</div> 
                                  <div class="count" id="count-blue">
                                    0
                                  </div>
                                </div>
                                <div class="second-player">
                                  <div class="orange player-icon"></div> 
                                  <div class="player-name">Orange</div> 
                                  <div class="count" id="count-orange">
                                    0
                                  </div>
                                </div>
                              </div>
                              <div class="current-player">Current player : 
                                <div  id="current-player" class="currentplayer-bg ${currentGame.currentPlayer}"><div  class="player-icon currentplayer"></div></div>
                                </div>
                                <div class="btn-wrapper">
                                  <button class="btn btn--game menu " id="exit-btn"> <span class="btn__exit-icon"></span>Exit game </button>
                                  <div class="quit-menu-overlay">
                                    <div class="menu-field"> 
                                      <p>Are you sure you want to quit the game?</p>
                                      <div class="btn-wrapper">
                                        <button id="back-to-game" class="btn back">Back to game</button>
                                        <button id="back-to-settings" class="btn exit">Exit game</button>
                                      </div> 
                                    </div> 
                                  </div>
                                </div>
                            </header>
                            <div class="game-field" id="game-field">
                            </div>
                          </div>
                        </section>`;
}

/**
 * Returns the HTML template string for the game over screen with the final scores.
 * @param currentGame The current game instance used to display the final scores
 */
export function finishGameTemp(currentGame: Game) {
  return ` <div class="win-screen">
                                  <h1>
                                    Game Over
                                  </h1>
                                  <p> Final score</p>
                                  <div class="player-wrapper">
                                    <div class="first-player">
                                      <div class="blue player-icon"></div>
                                      <div class="player-name">Blue</div> 
                                      <div class="count" id="count-blue">
                                        ${currentGame.scoreBlue}
                                      </div>
                                     </div>
                                     <div class="second-player">
                                       <div class="orange player-icon"></div> 
                                       <div class="player-name">Orange</div> 
                                       <div class="count" id="count-orange">
                                         ${currentGame.scoreOrange}
                                        </div>
                                      </div>
                                    </div>
                                    <div class="btn-wrapper ${currentGame.scoreBlue === currentGame.scoreOrange ? "is-draw" : "no-draw"}">
                                    <button class="btn btn--game menu" id="back-to-settings">Home</button>
                                  </div>
                                  </div>
                                </div>`;
}

/**
 * Returns the HTML template string for the winner screen
 * displaying the winning player or a draw.
 * @param currentGame The current game instance used to determine and display the winner
 */
export function showWinnerTemplate(currentGame: Game) {
  return `<div class="end-screen">
            <div class="confetti"> </div>
            <div><p> The winner is</p>
              <h1 class=" ${currentGame.scoreBlue > currentGame.scoreOrange ? "blue" : currentGame.scoreOrange > currentGame.scoreBlue ? "orange" : "white"}  ${currentGame.theme == "coding" ? "coding" : ""}">
                ${currentGame.scoreBlue > currentGame.scoreOrange ? "Blue Player" : currentGame.scoreOrange > currentGame.scoreBlue ? "Orange Player" : ""}
              </h1>
            </div>
            <div class="wrapper-winner-img">
              <div class="final-img ${currentGame.currentPlayer}"/> </div>
              <div class="btn-wrapper">
                <button class="btn btn--game menu" id="back-to-settings">Home</button>
              </div>
            </div>
          </div>`;
}
