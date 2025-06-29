export type Context = {
  step: number;
  count: number;
  max: number;
  delay: number;
  isDelayed: boolean;
  isLoading: boolean;
};

export type ConfigParam = {
  max: number;
  delay: number;
  isDelayed: boolean;
};

export type Operation = "INC" | "DEC";
