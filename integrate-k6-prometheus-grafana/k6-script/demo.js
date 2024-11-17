import http from 'k6/http';
import {sleep} from 'k6';
import { check } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 10 }, // traffic ramp-up from 1 to 10 users over a minute.
    { duration: '2m', target: 30 }, // stay at 30 users for 5 minutes
    { duration: '1m', target: 0 }, // ramp-down to 0 users
  ],
};

export default function () {
  const res = http.get('https://test.k6.io');
  sleep(1);

  // Check that the response status is 200
  check(res, {
    'is status 200': (r) => r.status === 200,
  });
}
