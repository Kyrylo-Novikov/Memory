export interface Setting {
  type: "theme" | "player" | "fieldSize";
  legend: string;
  options: Options[];
  icon?: string;
}

export interface Options {
  id: string;
  value: string | number;
  label: string;
  path?: string;
}
