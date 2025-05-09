import Builder from '@/app/components/Dashboard/Builder/Builder';
import Simulator from '@/app/components/Dashboard/Simulator';
import DashboardLayout from '@/app/layouts/DashboardLayout';

const Dashboard = () => {
  return (
    <DashboardLayout animate={false}>
      <div className="p-4 h-full w-full flex flex-col md:flex-row">
        <Builder />
        <Simulator />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
