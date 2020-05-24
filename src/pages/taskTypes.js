import { COLORS, TITLES, TYPES } from '../service/constants';

export default {
  backlog: {
    title: TITLES.backlog,
    type: TYPES.backlog,
    bodyBackground: COLORS.darkGrey,
    titleBackground: COLORS.grey,
    onlyTitle: true,
    withMark: false,
    crossedOut: false,
  },
  selected: {
    title: TITLES.selected,
    type: TYPES.selected,
    bodyBackground: COLORS.darkYellow,
    titleBackground: COLORS.yellow,
    onlyTitle: false,
    withMark: true,
    crossedOut: false,
  },
  running: {
    title: TITLES.running,
    type: TYPES.running,
    bodyBackground: COLORS.darkPurple,
    titleBackground: COLORS.purple,
    onlyTitle: false,
    withMark: true,
    crossedOut: false,
  },
  evaluating: {
    title: TITLES.evaluating,
    type: TYPES.evaluating,
    bodyBackground: COLORS.darkBlue,
    titleBackground: COLORS.blue,
    onlyTitle: false,
    withMark: true,
    crossedOut: false,
  },
  live: {
    title: TITLES.live,
    type: TYPES.live,
    bodyBackground: COLORS.darkGreen,
    titleBackground: COLORS.green,
    onlyTitle: true,
    withMark: false,
    crossedOut: true,
  },
};
