import {
  selectIsAuthenticated,
  useAuthStore,
  useLogoutMutation,
} from '@/entities/session';

import { AuthButtons } from './components/auth-buttons/AuthButtons';
import { NavList } from './components/nav-list/navList';

interface Props {
  classNameNav?: string;
  classNameButtons?: string;
}

export const NavProfile = (props: Props) => {
  const IsAuthenticated = useAuthStore(selectIsAuthenticated);
  const { mutate: logout } = useLogoutMutation();

  if (IsAuthenticated)
    return <NavList className={props.classNameNav} logoutHandler={logout} />;

  return <AuthButtons className={props.classNameButtons} />;
};
