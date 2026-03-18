import fs from "fs";

export interface TemplateConfig {
  policy: string;
  claim: string;
}

export function loadTemplateConfig(filePath: string): TemplateConfig {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}