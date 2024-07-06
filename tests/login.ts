import { check } from 'k6';
import { SharedArray } from 'k6/data';
import { generateToken, loginViaAPI } from '../services/user/login';
import { htmlReport } from "../helper/html-report";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

// Load the JSON data into a SharedArray
const data = new SharedArray('user data', function () {
  return JSON.parse(open('../data/users.json'));
});

export const options = {
  vus: 3, // Number of virtual users
  duration: '5s', // Test duration
};

export default function () {
  // Pick a random user from the shared data
  const user = data[Math.floor(Math.random() * data.length)];

  // HTTP request use to authorized user
  let genToken = generateToken(user.username, user.password);
  const resGenerateToken = JSON.parse(JSON.stringify(genToken))
  const responseBody = JSON.parse(resGenerateToken.body)
  const validateStatus = responseBody.status
  const token = responseBody.token

  if (token === null) {
    check(genToken, {
      [`User ${user.username} authorization failed.`]: () => validateStatus == "Failed"
    });
  } else {
    // Check that the response status is 200
    check(genToken, {
      'generate token is status 200': (r) => r.status === 200,
      [`User ${user.username} authorization success.`]: () => validateStatus == "Success"
    });

    // HTTP request use to login user
    let res1 = loginViaAPI(user.username, user.password);

    // Check that the response status is 200
    check(res1, {
      'login is status 200': (r) => r.status === 200,
    });
  }
}

export function handleSummary(data: any) {
  let scenarioName = "Example Load Test for Login function";
  const htmldata = {
    "Report.html": htmlReport(data, { title: scenarioName }),
    stdout: textSummary(data, { indent: " ", enableColors: true })
  };

  return htmldata;
}
