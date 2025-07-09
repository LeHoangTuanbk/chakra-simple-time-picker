export type Locale = "en" | "vi" | "es" | "fr" | "de" | "ja" | "ko" | "zh";

export interface TimePickerLocale {
  now: string;
  ok: string;
  placeholder?: string;
}

export const locales: Record<Locale, TimePickerLocale> = {
  en: {
    now: "Now",
    ok: "OK",
    placeholder: "Select time",
  },
  vi: {
    now: "Hiện tại",
    ok: "Xác nhận",
    placeholder: "Chọn thời gian",
  },
  es: {
    now: "Ahora",
    ok: "Aceptar",
    placeholder: "Seleccionar hora",
  },
  fr: {
    now: "Maintenant",
    ok: "OK",
    placeholder: "Sélectionner l'heure",
  },
  de: {
    now: "Jetzt",
    ok: "OK",
    placeholder: "Zeit auswählen",
  },
  ja: {
    now: "現在",
    ok: "OK",
    placeholder: "時間を選択",
  },
  ko: {
    now: "지금",
    ok: "확인",
    placeholder: "시간 선택",
  },
  zh: {
    now: "现在",
    ok: "确定",
    placeholder: "选择时间",
  },
};

export const getLocale = (locale: Locale): TimePickerLocale => {
  return locales[locale] || locales.en;
};
