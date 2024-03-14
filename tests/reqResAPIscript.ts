import { getListUsers, updateUser } from "../services/resResAPI";
import { htmlReport } from "../helper/html-report";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
import { group } from "k6";
import { createMetrics } from "../helper/utils";

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

const stepNames = {
    getListUsers: "01. Get a user list.",
    updateUser: "02. Update user information"
}

const metrics = createMetrics(stepNames, "Step ")
export function reqResAPIScript() {
    group('UserList', function () {
        JSON.stringify(getListUsers().body);
        metrics.getListUsers.add(getListUsers().timings.duration);
        updateUser(1);
        metrics.updateUser.add(updateUser(1).timings.duration)
    });
}

export function handleSummary(data: any) {
    let scenarioName = "Example Load Test";
    const htmldata = {
        "Report.html": htmlReport(data, { title: scenarioName }),
        stdout: textSummary(data, { indent: " ", enableColors: true })
    };

    return htmldata;
}