import { Report, IReport } from "../models/report";

const url = 'http://localhost:4000/reports';

export function fetchFullReport(id: number): Promise<IReport> {
  if (id === undefined)
    id = 1;
  return fetch(url + '/' + id)
    .then(response => response.json());
}

export function fetchUpdateReport(report: IReport): Promise<Report> {
  return fetch(url + '/' + report.id, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(report)
  })
    .then(response => response.json());
}