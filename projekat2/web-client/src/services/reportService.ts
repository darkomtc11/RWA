import { Report, IReport } from "../models/report";

const url = 'http://localhost:4000/reports';

export function fetchFullReport(id: string): Promise<IReport> {

  if (id === "undefined" || !id || id === undefined) {
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        availableFunds: 0,
        transactions: []
      })
    }).then(response => response.json());
  }
  else {
    return fetch(url + '/' + id)
      .then(response => response.json()).catch((err) => {
        localStorage.clear();
      });
  }
}

export function fetchUpdateReport(report: IReport): Promise<Report> {
  return fetch(url + '/' + report.id, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(report)
  })
    .then(response => response.json());
}

export function checkCode(code: string): Promise<Report | null> {
  return new Promise<Report | null>((res, rej) => {
    fetch(url + '/' + code)
      .then(response => {
        if (response.ok)
          return response.json();
        else
          res(null);
      }).then(data => {
        res(data)
      });
  });
}