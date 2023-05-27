export type textRegexp = RegExp;

export const REGEXES: { [key: string]: textRegexp } = {
  first: /(?:title|description|status)[:=]\s*['"`](.*?)['"`],?\s*?/g,
  second: /(?:AlertTitle|AlertDescription).*?>(.*?)</g,
  third:
    /(?:Text|AlertTitle|AlertDescription|FormLabel|Button|ModalHeader|MenuItem).*?>\s*?[{]?['"`]?(.*?)['"`]?[}]?\s*?</g,
};
