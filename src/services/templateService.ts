import Handlebars from "handlebars";

export function compileTemplate(template: string, data: any): string {
  const compiled = Handlebars.compile(template);
  return compiled(data);
}