import { COLORS, TITLES } from '../service/constants';

export default {
  backlog: {
    title: TITLES.backlog,
    bodyBackground: COLORS.darkGrey,
    titleBackground: COLORS.grey,
    onlyTitle: true,
    withMark: false,
    crossedOut: false,
  },
  selected: {
    title: TITLES.selected,
    bodyBackground: COLORS.darkYellow,
    titleBackground: COLORS.yellow,
    onlyTitle: false,
    withMark: true,
    crossedOut: false,
  },
  running: {
    title: TITLES.running,
    bodyBackground: COLORS.darkPurple,
    titleBackground: COLORS.purple,
    onlyTitle: false,
    withMark: true,
    crossedOut: false,
  },
  evaluating: {
    title: TITLES.evaluating,
    bodyBackground: COLORS.darkBlue,
    titleBackground: COLORS.blue,
    onlyTitle: false,
    withMark: true,
    crossedOut: false,
  },
  live: {
    title: TITLES.live,
    bodyBackground: COLORS.darkGreen,
    titleBackground: COLORS.green,
    onlyTitle: true,
    withMark: false,
    crossedOut: true,
  },
};
