/**
 * Substitute {name} placeholders in a translated string.
 *
 * Deliberately tiny: the only interpolated strings on this site are the two
 * prefilled WhatsApp messages. An i18n library with plural rules, date
 * formatting and a message syntax would be several KB to solve a two-string
 * problem. If genuine plurals or dates ever appear, revisit — until then this
 * is the whole requirement.
 *
 * An unknown placeholder is left untouched rather than blanked, so a typo
 * shows up as literal `{prodcut}` instead of silently vanishing.
 */
export function interpolate(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match)
}
