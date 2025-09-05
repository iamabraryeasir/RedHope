export interface IAdminAnalysisResponse {
  totals: Totals;
  bloodGroups: BloodGroups;
  today: Today;
}

export interface Totals {
  users: number;
  requests: number;
  matched: number;
  fulfilled: number;
}

export interface BloodGroups {
  users: User[];
  requests: Request[];
}

export interface User {
  bloodGroup: string;
  count: number;
}

export interface Request {
  bloodGroup: string;
  count: number;
}

export interface Today {
  requestsCreated: number;
  requestsMatched: number;
  requestsFulfilled: number;
  requestsCancelled: number;
}
