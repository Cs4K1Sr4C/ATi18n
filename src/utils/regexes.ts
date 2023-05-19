export type textRegexp = RegExp;

export const oneGroupRegexes: textRegexp[] = [
  />([^<]+)</g, // Matches texts between ">" and "<" symbols
  /title={([^{}]+)}/g, // Matches texts within `title` attribute
  /placeholder[:=]{([^{}]+)}/g, // Matches texts within `placeholder` attribute
  /<Text>([^<]+)<\/Text>/g, // Matches texts within <Text> tags
  /title:\s*([^,]+),/g, // Matches texts following "title:"
  /description:\s*([^,]+),/g, // Matches texts following "description:"
  /<Text\s+as="[^"]+">([^<]+)<\/Text>/g, // Matches texts within <Text> tags with "as" attribute
  /label="([^"]+)"/g, // Matches texts within label attribute with double quotes
  /label:\s*"([^"]+)",/g, // Matches texts following "label:"
];

export const twoGroupRegexes: textRegexp[] = [];

export const treeGroupRegexes: textRegexp[] = [];

export const fourGroupRegexes: textRegexp[] = [];

export const fiveGroupRegexes: textRegexp[] = [];

export const sixGroupRegexes: textRegexp[] = [];

export const sevenGroupRegexes: textRegexp[] = [];

export const eightGroupRegexes: textRegexp[] = [];

export const nineGroupRegexes: textRegexp[] = [];

export const tenGroupRegexes: textRegexp[] = [];

export const elevenGroupRegexes: textRegexp[] = [];

export const twelveGroupRegexes: textRegexp[] = [];

export const thirteenGroupRegexes: textRegexp[] = [];

export const fourteenGroupRegexes: textRegexp[] = [];

export const fifteenGroupRegexes: textRegexp[] = [];

export const sixteenGroupRegexes: textRegexp[] = [];

export const seventeenGroupRegexes: textRegexp[] = [];

export const eighteenGroupRegexes: textRegexp[] = [];

export const nineteenGroupRegexes: textRegexp[] = [];

export const twentyGroupRegexes: textRegexp[] = [];

export const twentyOneGroupRegexes: textRegexp[] = [];

export const twentyTwoGroupRegexes: textRegexp[] = [];
