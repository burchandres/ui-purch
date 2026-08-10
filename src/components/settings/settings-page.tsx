import { Palette, SquareUser, Toilet } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { FC, ReactNode } from 'react';
import { appearanceConfig } from '@/config/appearance';
import { Separator } from '../base/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../base/tabs';
import { AccountSettings } from './account-settings';
import { AppearanceSettings } from './appearance-settings';

interface SectionConfig {
  display?: string;
  icon: LucideIcon;
  component: ReactNode;
}

const sections: Record<string, SectionConfig> = {
  account: {
    component: <AccountSettings />,
    display: 'Account',
    icon: SquareUser,
  },
  appearance: {
    component: <AppearanceSettings />,
    display: 'Appearance',
    icon: Palette,
  },
  poo: {
    component: <p>🍈</p>,
    display: 'Poop monster',
    icon: Toilet,
  },
};

export const SettingsPage: FC = () => (
  <div style={{ display: 'flex', flexDirection: 'row' }}>
    <Tabs defaultValue='account' orientation='vertical' className='flex min-h-max flex-row'>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: appearanceConfig.mdGap,
          padding: appearanceConfig.lgGap,
        }}
      >
        <TabsList>
          {Object.entries(sections).map(([key, section]) => (
            <TabsTrigger
              key={key}
              value={key}
              style={{
                justifyContent: 'flex-start',
                textAlign: 'left',
              }}
            >
              <div
                style={{
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'row',
                  gap: appearanceConfig.smGap,
                  justifyItems: 'flex-start',
                }}
              >
                <section.icon /> {section.display}
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      <Separator style={{ height: 'auto' }} orientation='vertical' />
      <div style={{ margin: appearanceConfig.lgGap }}>
        {Object.entries(sections).map(([key, section]) => (
          <TabsContent key={key} value={key}>
            {section.component}
          </TabsContent>
        ))}
      </div>
    </Tabs>
  </div>
);
