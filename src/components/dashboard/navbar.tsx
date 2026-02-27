import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppContext } from '@/context/app.context';
import { useAuthContext } from '@/context/auth.context';
import { Bars3Icon } from '@heroicons/react/16/solid';
import { useMemo, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

type LanguageCode = 'en' | 'uz';

type TLanguage = {
  label: string;
  flag: ReactNode;
};

const Languages: { [code in LanguageCode]: TLanguage } = {
  ['en']: {
    label: 'English',
    flag: (
      <img src="https://flagcdn.com/gb.svg" width="20" alt="United Kingdom" />
    ),
  },
  ['uz']: {
    label: 'Uzbek',
    flag: <img src="https://flagcdn.com/uz.svg" width="20" alt="Uzbekistan" />,
  },
};

export default function Navbar() {
  const { i18n, t } = useTranslation('dashboard');
  const { toggleSidebar } = useAppContext();
  const { user, logoutUser } = useAuthContext();

  const activeLanguage = useMemo(() => {
    return Languages[i18n.language as LanguageCode];
  }, [i18n.language]);

  const changeLanguage = (lang: string) => {
    if (lang !== i18n.language) {
      i18n.changeLanguage(lang);
    }
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/auth/login');
  };
  return (
    <div className="border-b">
      <nav className="flex items-center justify-between p-4 h-16">
        <div className="flex items-center gap-2">
          <Button
            className="block md:hidden"
            variant={'outline'}
            onClick={toggleSidebar}
          >
            <Bars3Icon className="w-4 h-4" />
          </Button>
          <h4 className="font-semibold">Dashboard</h4>
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="cursor-pointer">
                {user?.login}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>{t('menuLabel')}</DropdownMenuLabel>
                <DropdownMenuItem>{t('profile')}</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  {t('logout')}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="cursor-pointer">
                {activeLanguage.flag}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                {Object.entries(Languages).map(([code, { label, flag }]) => (
                  <DropdownMenuItem
                    key={code}
                    className="cursor-pointer"
                    onClick={() => changeLanguage(code)}
                  >
                    {label}
                    {flag}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </div>
  );
}
