import { CompletedPayment } from './payments';

export interface DashboardChartData {
  time: string;
  amount: number | undefined;
}

export interface DashboardApiResponse {
  chartData: DashboardChartData[];
  recentPayments: CompletedPayment[];
  totalDaily: number;
  pendingBalance: number;
}
