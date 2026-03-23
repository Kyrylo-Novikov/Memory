import { SettingType } from "./types";

/**
 * Represents the setting that you have to select for preparing the game
 */
export interface Setting {
  type: SettingType;
  legend: string;
  option: Option[];
  icon?: string;
}

/**
 * Represents the option beetwenn you have to choose
 */
export interface Option {
  id: string;
  value: string | number;
  label: string;
  path?: string;
}
