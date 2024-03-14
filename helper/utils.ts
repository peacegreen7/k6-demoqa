import { Trend } from "k6/metrics";

export const createMetrics = (stepNames: any, prefix = "") => {
    let metricsDuration: { [k: string]: Trend } = {}
    for (const key in stepNames) {
        metricsDuration[key] = new Trend(prefix + stepNames[key]);
    }
    return metricsDuration
}