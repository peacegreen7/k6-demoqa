import { getListUsers, updateUser } from "../services/resResAPI";
import { htmlReport } from "../helper/html-report";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
import { group } from "k6";

export const options = {
    summaryTrendStats: ['avg', 'min', 'max', 'p(99)', 'count'],
    scenarios: {
        scenarioName: {
            executor: 'constant-vus',
            exec: 'reqResAPIScript',
            vus: 2,
            duration: '3s'
        },
    }
};

export function reqResAPIScript() {
    group('UserList', function () {
        console.log(JSON.stringify(getListUsers().body))
        // var userList =  JSON.stringify(getListUsers().body);
        // var userID = userList.data.id;
        updateUser(1);
    });
}

export function handleSummary(data) {
    let scenarioName = "Example Load Test";
    const htmldata = {
        "Report.html": htmlReport(data, { title: scenarioName }),
        stdout: textSummary(data, { indent: " ", enableColors: true })
    };

    return htmldata;
}