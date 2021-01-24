import { formatDistanceToNow, fromUnixTime } from 'date-fns';

// calculate time to now
export const timestampToString = (timestamp) =>
  formatDistanceToNow(fromUnixTime(timestamp), { addSuffix: true }) + ' ago.';
