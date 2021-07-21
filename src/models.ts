export interface ThemeParameters {
  /**
   * Themes
   */
  themes: any[];
  /**
   * Theme to start on - index
   */
  initialTheme?: number;
  /**
   *  Key for show name of theme
   */
  label?: string;
}

export enum CHANNEL {
  LOAD_THEMES = 'load-themes',
  CHANGE_THEME = 'change-theme',
  REQUEST_THEMES = 'request-themes',
}
