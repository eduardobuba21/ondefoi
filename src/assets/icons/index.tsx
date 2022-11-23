import { SvgProps } from 'react-native-svg';
// assets
import add from '@src/assets/icons/add.svg';
import eye from '@src/assets/icons/eye.svg';
import info from '@src/assets/icons/info.svg';
import edit from '@src/assets/icons/edit.svg';
import back from '@src/assets/icons/back.svg';
import made from '@src/assets/icons/made.svg';
import sync from '@src/assets/icons/sync.svg';
import home from '@src/assets/icons/home.svg';
import error from '@src/assets/icons/error.svg';
import logout from '@src/assets/icons/logout.svg';
import eyeOff from '@src/assets/icons/eye_off.svg';
import success from '@src/assets/icons/success.svg';
import warning from '@src/assets/icons/warning.svg';
import profile from '@src/assets/icons/profile.svg';
import received from '@src/assets/icons/received.svg';
import calendar from '@src/assets/icons/calendar.svg';
import circlePlus from '@src/assets/icons/circle_plus.svg';
import circleMinus from '@src/assets/icons/circle_minus.svg';
import chevronLeft from '@src/assets/icons/chevron_left.svg';
import chevronRight from '@src/assets/icons/chevron_right.svg';

// ----------------------------------------------------------------------

const icons = {
  add: add,
  eye: eye,
  info: info,
  edit: edit,
  back: back,
  made: made,
  sync: sync,
  home: home,
  error: error,
  logout: logout,
  eyeOff: eyeOff,
  warning: warning,
  success: success,
  profile: profile,
  received: received,
  calendar: calendar,
  circlePlus: circlePlus,
  circleMinus: circleMinus,
  chevronLeft: chevronLeft,
  chevronRight: chevronRight,
} as Record<string, React.FC<SvgProps>>;

export default icons;
