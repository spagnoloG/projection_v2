import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData = [
  {
    title: 'Domov',
    path: '/',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Pesmi',
    path: '/pesmi',
    icon: icon('ic-user'),
  },
];
