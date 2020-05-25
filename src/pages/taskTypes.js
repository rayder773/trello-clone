import { COLORS, TITLES, TYPES } from '../service/constants';
import doneWhite from '../assets/images/done_white.png';
import gear from '../assets/images/gear.png';
import lamp from '../assets/images/lamp.png';
import question from '../assets/images/question.png';
import select from '../assets/images/select.png';

export default {
  backlog: {
    title: TITLES.backlog,
    type: TYPES.backlog,
    bodyBackground: COLORS.darkGrey,
    titleBackground: COLORS.grey,
    onlyTitle: true,
    withMark: false,
    crossedOut: false,
    image: lamp,
  },
  selected: {
    title: TITLES.selected,
    type: TYPES.selected,
    bodyBackground: COLORS.darkYellow,
    titleBackground: COLORS.yellow,
    onlyTitle: false,
    withMark: true,
    crossedOut: false,
    image: select,
  },
  running: {
    title: TITLES.running,
    type: TYPES.running,
    bodyBackground: COLORS.darkPurple,
    titleBackground: COLORS.purple,
    onlyTitle: false,
    withMark: true,
    crossedOut: false,
    image: gear,
  },
  evaluating: {
    title: TITLES.evaluating,
    type: TYPES.evaluating,
    bodyBackground: COLORS.darkBlue,
    titleBackground: COLORS.blue,
    onlyTitle: false,
    withMark: true,
    crossedOut: false,
    image: question,
  },
  live: {
    title: TITLES.live,
    type: TYPES.live,
    bodyBackground: COLORS.darkGreen,
    titleBackground: COLORS.green,
    onlyTitle: true,
    withMark: false,
    crossedOut: true,
    image: doneWhite,
  },
};
