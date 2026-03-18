import fs from "fs";
import path from "path";

export function saveOutput(fileName: string, content: string): void {
  const outputDir = path.join(__dirname, "..", "..", "output");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  fs.writeFileSync(path.join(outputDir, fileName), content, "utf-8");
}