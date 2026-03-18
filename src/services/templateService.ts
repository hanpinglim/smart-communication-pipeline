export function fillTemplate(
  template: string,
  values: Record<string, string>
): string {
  let output = template;

  for (const key in values) {
    output = output.replace(new RegExp(`\\$\\{${key}\\}`, "g"), values[key]);
  }

  return output;
}