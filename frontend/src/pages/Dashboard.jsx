import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { CheckCircle2, Clock, FolderKanban, Hourglass } from 'lucide-react';
import { toast } from 'react-toastify';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import dashboardService from '../services/dashboardService';
import { getErrorMessage } from '../utils/helpers';
import StatCard from '../components/ui/StatCard';
import { SkeletonStat, SkeletonCard } from '../components/common/Skeleton';
import Card from '../components/common/Card';
import { STATUS_COLORS } from '../utils/constants';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await dashboardService.getStats();
        setStats(res.data.data.stats);
      } catch (err) {
        toast.error(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: document.documentElement.classList.contains('dark') ? '#94a3b8' : '#475569',
          usePointStyle: true,
          padding: 20,
        },
      },
    },
    cutout: '70%',
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: document.documentElement.classList.contains('dark') ? '#1e293b' : '#ffffff',
        titleColor: document.documentElement.classList.contains('dark') ? '#f1f5f9' : '#0f172a',
        bodyColor: document.documentElement.classList.contains('dark') ? '#cbd5e1' : '#334155',
        borderColor: document.documentElement.classList.contains('dark') ? '#334155' : '#e2e8f0',
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: document.documentElement.classList.contains('dark') ? '#64748b' : '#94a3b8',
        },
        grid: {
          color: document.documentElement.classList.contains('dark') ? '#334155' : '#f1f5f9',
        },
      },
      x: {
        ticks: {
          color: document.documentElement.classList.contains('dark') ? '#64748b' : '#94a3b8',
        },
        grid: {
          display: false,
        },
      },
    },
  };

  const chartData = {
    labels: ['Completed', 'In Progress', 'Pending'],
    datasets: [
      {
        data: [
          stats?.completed || 0,
          stats?.inProgress || 0,
          stats?.pending || 0,
        ],
        backgroundColor: [
          STATUS_COLORS['Completed'].chart,
          STATUS_COLORS['In Progress'].chart,
          STATUS_COLORS['Pending'].chart,
        ],
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  const barData = {
    labels: ['Completed', 'In Progress', 'Pending'],
    datasets: [
      {
        label: 'Projects',
        data: [
          stats?.completed || 0,
          stats?.inProgress || 0,
          stats?.pending || 0,
        ],
        backgroundColor: [
          STATUS_COLORS['Completed'].chart,
          STATUS_COLORS['In Progress'].chart,
          STATUS_COLORS['Pending'].chart,
        ],
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Welcome back, {user?.name.split(' ')[0]}! Here's what's happening today.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {loading ? (
          <>
            <SkeletonStat />
            <SkeletonStat />
            <SkeletonStat />
            <SkeletonStat />
          </>
        ) : (
          <>
            <StatCard
              icon={FolderKanban}
              label="Total Projects"
              value={stats?.totalProjects || 0}
              color="indigo"
            />
            <StatCard
              icon={CheckCircle2}
              label="Completed"
              value={stats?.completed || 0}
              color="emerald"
            />
            <StatCard
              icon={Clock}
              label="In Progress"
              value={stats?.inProgress || 0}
              color="blue"
            />
            <StatCard
              icon={Hourglass}
              label="Pending"
              value={stats?.pending || 0}
              color="amber"
            />
          </>
        )}
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-1">
          {loading ? (
            <SkeletonCard />
          ) : (
            <Card className="p-6 h-full min-h-[350px] flex flex-col">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-6">
                Project Distribution
              </h3>
              <div className="flex-1 relative">
                {stats?.totalProjects > 0 ? (
                  <Doughnut data={chartData} options={chartOptions} />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-slate-400 dark:text-slate-500 text-sm">
                    No data to display
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>

        <div className="lg:col-span-2">
          {loading ? (
            <SkeletonCard />
          ) : (
            <Card className="p-6 h-full min-h-[350px] flex flex-col">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-6">
                Status Overview
              </h3>
              <div className="flex-1 relative">
                 {stats?.totalProjects > 0 ? (
                  <Bar data={barData} options={barOptions} />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-slate-400 dark:text-slate-500 text-sm">
                    No data to display
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
