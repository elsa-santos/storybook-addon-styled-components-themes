import { addons } from '@storybook/addons';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { CHANNEL } from './models';

export const WithThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [themes, setThemes] = React.useState<[]>([]);
  const [indexThemeSelected, setIndexThemeSelected] = React.useState<number>(0);
  const channel = addons.getChannel();

  const handleLoadThemes = (themes: []) => setThemes(themes);
  const handleChangeTheme = (index: number) => setIndexThemeSelected(index);

  React.useEffect(() => {
    channel.on(CHANNEL.LOAD_THEMES, handleLoadThemes);
    channel.on(CHANNEL.CHANGE_THEME, handleChangeTheme);

    return () => {
      channel.removeListener(CHANNEL.LOAD_THEMES, handleLoadThemes);
      channel.removeListener(CHANNEL.CHANGE_THEME, handleChangeTheme);
    };
  }, []);

  return (
    <React.Fragment>
      {themes && themes.length ? (
        <ThemeProvider theme={themes[indexThemeSelected]}>
          {children}
        </ThemeProvider>
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </React.Fragment>
  );
};

export default WithThemeProvider;
