import { i18n } from "next-i18next";

export const translate = (
  key: string,
  ns?: string | undefined | null,
  text?: string | undefined | null
) => {
  const opts = !!ns ? { ns } : undefined;
  const defaultText = text ? text : key;
  return i18n?.t(key, defaultText, opts) ?? key;
};
