/**
 * APITable <https://github.com/apitable/apitable>
 * Copyright (C) 2022 APITable Ltd. <https://apitable.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { ThemeName, Typography, useTheme, useThemeColors } from '@apitable/components';
import { integrateCdnHost } from '@apitable/core';
import { getEnvVariables } from 'pc/utils/env';
import { ActionType } from './pc_home';
import styles from './style.module.less';

interface IHomeWrapper {
  action?: ActionType;
}

export const HomeWrapper: React.FC<React.PropsWithChildren<IHomeWrapper>> = ({ children, action: _action }) => {
  const colors = useThemeColors();
  let logo = getEnvVariables().IS_AITABLE ? getEnvVariables().LOGO : getEnvVariables().LOGIN_LOGO!;
  let text = getEnvVariables().LOGO_TEXT_DARK;
  if (useTheme().palette.type === ThemeName.Light) {
    if (!getEnvVariables().IS_AITABLE) {
      logo = getEnvVariables().LOGIN_LOGO_LIGHT!;
    }
    text = getEnvVariables().LOGO_TEXT_LIGHT;
  }

  return (
    <div className={styles.pcHome}>
      <div className={styles.header}>
        <div className={styles.brand}>
          {getEnvVariables().IS_AITABLE ? (
            <div>
              <img src={integrateCdnHost(logo)} width={32} alt="logo" />
              <img src={integrateCdnHost(text)} width={96} alt="text" />
            </div>
          ) : (
            <img src={integrateCdnHost(logo)} width={132} alt="logo" />
          )}
          <Typography variant={'h7'} color={colors.textCommonSecondary}>
            {getEnvVariables().IS_AITABLE
              ? 'Custom ChatGPT with Table in 1-Click'
              : getEnvVariables().LOGIN_MOTTO || '技术二部专业二室'}
          </Typography>
        </div>
      </div>
      <div className={styles.main}>{children}</div>
    </div>
  );
};
