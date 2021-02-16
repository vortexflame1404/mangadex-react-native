import {
  formatDistanceToNow,
  fromUnixTime,
  sub,
  isAfter,
  format,
} from 'date-fns';
import { decode } from 'html-entities';

const descriptionLanguages = [
  '=FRANCAIS=',
  '[b] Spanish: [/ b]',
  '[b][u]Chinese',
  '[b][u]French',
  '[b][u]German / Deutsch',
  '[b][u]Russian',
  '[b][u]Spanish',
  '[b][u]Vietnamese',
  '[b]External Links',
  '[b]Link[/b]',
  '[b]Links:',
  '[Espa&ntilde;ol]:',
  '[hr]Fr:',
  '[hr]TH',
  '[INDO]',
  '[PTBR]',
  '[right][b][u]Persian',
  '[RUS]',
  '[u]Russian',
  '\r\n\r\nItalian\r\n',
  'Arabic /',
  'Descriptions in Other Languages',
  'Espa&ntilde;ol /',
  'Espa&ntilde;ol:',
  'Farsi/',
  'Fran&ccedil;ais',
  'French - ',
  'Francois',
  'French:',
  'French / ',
  'R&Eacute;SUM&Eacute; FRANCAIS :',
  'German/',
  'German /',
  'Hindi /',
  'Indonesia:',
  'Indonesian:',
  '[u]Indonesian',
  'Italian / ',
  'Italian Summary:',
  'Italian/',
  'Italian:',
  'Japanese /',
  'Links:',
  'Pasta-Pizza-Mandolino/Italiano',
  'Persian /فارسی',
  'Polish /',
  'Polish Summary /',
  'Polish/',
  'Polski',
  'Portugu&ecirc;s',
  'Portuguese (BR)',
  'Pt-Br:',
  'Portuguese /',
  'R&eacute;sum&eacute; Fran&ccedil;ais',
  'R&eacute;sume Fran&ccedil;ais',
  'RUS:',
  'Russia/',
  'Russian /',
  'Spanish:',
  'Spanish /',
  'Spanish Summary:',
  'Spanish/',
  'T&uuml;rk&ccedil;e',
  'Thai:',
  'Turkish /',
  'Turkish/',
  'Turkish:',
  'Русский',
  'العربية',
  '정보',
  '(zh-Hant)',
];

const englishDescriptionTags = [
  '[b][u]English:',
  '[b][u]English',
  '[English]:',
  '[B][ENG][/B]',
];

export const cleanString = (string = '') => {
  const bbRegEx = /\[(\w+)[^\]]*](.*?)\[\/\1]/g;

  let intermediate = string
    .replaceAll('[list]', '')
    .replaceAll('[/list]', '')
    .replaceAll('[*]', '')
    .replaceAll('[hr]', '')
    .replaceAll('[u]', '')
    .replaceAll('[/u]', '')
    .replaceAll('[b]', '')
    .replaceAll('[/b]', '')
    .replaceAll('[i]', '')
    .replaceAll('[/i]', '');

  while (bbRegEx.exec(intermediate)) {
    intermediate = intermediate.replace(bbRegEx, '$2');
  }
  return decode(intermediate);
};

export const cleanDescription = (description: String) => {
  let newDescription = description.toString();
  descriptionLanguages.forEach((item) => {
    if (newDescription.indexOf(item) > 0) {
      newDescription = newDescription.substring(
        0,
        newDescription.indexOf(item),
      );
    }
  });
  let pattern;
  englishDescriptionTags.forEach((item) => {
    pattern = new RegExp(item, 'gi');
    newDescription = newDescription.replace(pattern, '');
  });
  return cleanString(newDescription);
};

// eslint-disable-next-line no-extend-native
String.prototype.replaceAll = function (strReplace: String, strWith) {
  // See http://stackoverflow.com/a/3561711/556609
  let esc = strReplace.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
  let reg = new RegExp(esc, 'ig');
  return this.replace(reg, strWith);
};

// timestamp to String
export const timestampToString = (timestamp) => {
  return format(fromUnixTime(timestamp), 'd MMM y');
};

// calculate time to now
export const calculateDistanceFromTimestampToNow = (timestamp) => {
  const uploadedDate = fromUnixTime(timestamp);
  const sevenDaysAgo = sub(new Date(), { weeks: 1 });
  if (isAfter(uploadedDate, sevenDaysAgo)) {
    const distanceToNow = formatDistanceToNow(uploadedDate, {
      addSuffix: true,
    });
    if (distanceToNow === '1 day ago') {
      return 'yesterday';
    }
    return distanceToNow;
  }
  return timestampToString(timestamp);
};
