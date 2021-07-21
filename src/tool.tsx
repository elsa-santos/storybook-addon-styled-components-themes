import { addons } from '@storybook/addons';
import { useAddonState, useParameter } from '@storybook/api';
import {
  IconButton,
  TooltipLinkList,
  WithTooltip,
} from '@storybook/components';
import { withTheme } from '@storybook/theming';
import React from 'react';
import { ADDON_ID, PARAM_KEY, TITLE } from './constants';
import { CHANNEL, ThemeParameters } from './models';

const Tool = withTheme(({ theme: themeStorybook }) => {
  const channel = addons.getChannel();

  const {
    themes,
    initialTheme: indexStarted,
    label: labelToShowName,
  } = useParameter<ThemeParameters>(PARAM_KEY, {
    themes: [],
  });

  const [indexThemeSelected, setIndexThemeSelected] = useAddonState(
    ADDON_ID,
    indexStarted || 0
  );

  const handleRequestThemes = () => {
    channel.emit(CHANNEL.LOAD_THEMES, themes);
    channel.emit(CHANNEL.CHANGE_THEME, indexThemeSelected);
  };

  React.useEffect(() => {
    channel.on(CHANNEL.REQUEST_THEMES, handleRequestThemes);
    channel.emit(CHANNEL.LOAD_THEMES, themes);
    channel.emit(CHANNEL.CHANGE_THEME, indexThemeSelected);
    return () => {
      channel.removeListener(CHANNEL.REQUEST_THEMES, handleRequestThemes);
    };
  }, [themeStorybook, themes, indexThemeSelected]);

  const menu = (): JSX.Element => (
    <WithTooltip
      placement='top'
      trigger='click'
      tooltip={() => (
        <TooltipLinkList
          links={themes.map((theme, index) => ({
            id: `${index}`,
            title: `${theme[`${labelToShowName}`] || theme['name'] || index}`,
            onClick: () => setIndexThemeSelected(index),
          }))}
        />
      )}
      closeOnClick
    >
      <IconButton title={`${TITLE}`}>
        {themes[indexThemeSelected][`${labelToShowName}`] ||
          themes[indexThemeSelected]['name'] ||
          indexThemeSelected}
      </IconButton>
    </WithTooltip>
  );

  return (
    <React.Fragment>
      {themes && themes.length ? menu() : <React.Fragment></React.Fragment>}
    </React.Fragment>
  );
});

export default Tool;
