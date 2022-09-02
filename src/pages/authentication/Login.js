/* eslint-disable no-nested-ternary */
import Pink from './login/pink';
import Purple from './login/purple';
import Cyan from './login/cyan';
// hooks
import useSettings from '../../hooks/useSettings';

export default function Login() {
  const { themeColor } = useSettings();
  return themeColor === 'default' ? (
    <Pink />
  ) : themeColor === 'purple' ? (
    <Purple />
  ) : themeColor === 'cyan' ? (
    <Cyan />
  ) : null;
}
