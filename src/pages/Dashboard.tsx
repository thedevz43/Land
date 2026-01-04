import React from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/layouts/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import GovCard, { StatCard } from '@/components/GovCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { demoLandParcels, demoMutationRequests, demoTaxRecords, demoNotifications } from '@/utils/demoData';
import { formatINR } from '@/utils/constants';
import {
  MapPin,
  FileText,
  CreditCard,
  Clock,
  ArrowRight,
  Bell,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Users,
  ClipboardList,
  BarChart3,
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  // Citizen Dashboard
  if (user.role === 'citizen') {
    const userParcels = demoLandParcels.filter(p => p.ownerName === 'Rajesh Kumar');
    const pendingMutations = demoMutationRequests.filter(m => m.status !== 'approved').length;
    const totalTaxDue = demoTaxRecords.reduce((sum, t) => sum + t.totalDue, 0);
    const unreadNotifications = demoNotifications.filter(n => !n.read).length;

    return (
      <DashboardLayout>
        <div className="space-y-6">
          {/* Welcome Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Welcome, {user.name}</h1>
              <p className="text-muted-foreground">Access your land records and services</p>
            </div>
            <Link to="/search">
              <Button className="gap-2">
                <MapPin className="w-4 h-4" />
                Search Land Records
              </Button>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="My Land Parcels"
              value={userParcels.length}
              icon={<MapPin className="w-6 h-6" />}
              subtitle="Registered properties"
            />
            <StatCard
              title="Pending Mutations"
              value={pendingMutations}
              icon={<FileText className="w-6 h-6" />}
              subtitle="Applications in progress"
            />
            <StatCard
              title="Tax Due"
              value={formatINR(totalTaxDue)}
              icon={<CreditCard className="w-6 h-6" />}
              subtitle="For current FY"
            />
            <StatCard
              title="Notifications"
              value={unreadNotifications}
              icon={<Bell className="w-6 h-6" />}
              subtitle="Unread messages"
            />
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* My Land Parcels */}
            <GovCard
              title="My Land Parcels"
              icon={<MapPin className="w-5 h-5" />}
              action={
                <Link to="/dashboard/my-lands">
                  <Button variant="ghost" size="sm" className="gap-1">
                    View All <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              }
            >
              <div className="space-y-3">
                {userParcels.slice(0, 3).map((parcel) => (
                  <div
                    key={parcel.id}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-foreground">
                        Survey No. {parcel.surveyNumber}/{parcel.subDivision}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {parcel.village}, {parcel.district}
                      </p>
                    </div>
                    <Badge variant={parcel.taxDue > 0 ? 'destructive' : 'secondary'}>
                      {parcel.taxDue > 0 ? 'Tax Due' : 'Clear'}
                    </Badge>
                  </div>
                ))}
              </div>
            </GovCard>

            {/* Recent Mutations */}
            <GovCard
              title="Mutation Requests"
              icon={<FileText className="w-5 h-5" />}
              action={
                <Link to="/dashboard/mutation">
                  <Button variant="ghost" size="sm" className="gap-1">
                    View All <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              }
            >
              <div className="space-y-3">
                {demoMutationRequests.slice(0, 3).map((mutation) => (
                  <div
                    key={mutation.id}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-foreground">{mutation.applicationNumber}</p>
                      <p className="text-sm text-muted-foreground">
                        {mutation.mutationType} - {mutation.surveyNumber}
                      </p>
                    </div>
                    <Badge
                      variant={
                        mutation.status === 'approved'
                          ? 'default'
                          : mutation.status === 'rejected'
                          ? 'destructive'
                          : 'secondary'
                      }
                      className="capitalize"
                    >
                      {mutation.status.replace('_', ' ')}
                    </Badge>
                  </div>
                ))}
              </div>
            </GovCard>

            {/* Notifications */}
            <GovCard
              title="Notifications"
              icon={<Bell className="w-5 h-5" />}
              className="lg:col-span-2"
            >
              <div className="space-y-3">
                {demoNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-3 p-3 rounded-lg ${
                      notification.read ? 'bg-muted/30' : 'bg-secondary/10 border border-secondary/20'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      notification.type === 'warning' ? 'bg-secondary/20 text-secondary' :
                      notification.type === 'success' ? 'bg-accent/20 text-accent' :
                      'bg-primary/20 text-primary'
                    }`}>
                      {notification.type === 'warning' ? <AlertTriangle className="w-4 h-4" /> :
                       notification.type === 'success' ? <CheckCircle className="w-4 h-4" /> :
                       <Bell className="w-4 h-4" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{notification.title}</p>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notification.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GovCard>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Officer Dashboard
  if (user.role === 'officer') {
    const pendingApplications = demoMutationRequests.filter(m => m.status === 'pending').length;
    const underReview = demoMutationRequests.filter(m => m.status === 'under_review').length;
    const approved = demoMutationRequests.filter(m => m.status === 'approved').length;

    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Officer Dashboard</h1>
            <p className="text-muted-foreground">Manage mutation requests and land records</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Pending Applications"
              value={pendingApplications}
              icon={<Clock className="w-6 h-6" />}
              subtitle="Awaiting assignment"
            />
            <StatCard
              title="Under Review"
              value={underReview}
              icon={<ClipboardList className="w-6 h-6" />}
              subtitle="Being processed"
            />
            <StatCard
              title="Approved This Month"
              value={approved}
              icon={<CheckCircle className="w-6 h-6" />}
              trend={{ value: 12, isPositive: true }}
            />
            <StatCard
              title="Disputes"
              value={2}
              icon={<AlertTriangle className="w-6 h-6" />}
              subtitle="Requiring attention"
            />
          </div>

          <GovCard
            title="Recent Applications"
            icon={<FileText className="w-5 h-5" />}
            action={
              <Link to="/dashboard/pending-applications">
                <Button variant="ghost" size="sm" className="gap-1">
                  View All <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            }
          >
            <div className="overflow-x-auto">
              <table className="gov-table">
                <thead>
                  <tr>
                    <th>Application No.</th>
                    <th>Applicant</th>
                    <th>Type</th>
                    <th>Survey No.</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {demoMutationRequests.map((mutation) => (
                    <tr key={mutation.id}>
                      <td className="font-medium">{mutation.applicationNumber}</td>
                      <td>{mutation.applicantName}</td>
                      <td>{mutation.mutationType}</td>
                      <td>{mutation.surveyNumber}</td>
                      <td>{mutation.applicationDate}</td>
                      <td>
                        <Badge
                          variant={
                            mutation.status === 'approved' ? 'default' :
                            mutation.status === 'rejected' ? 'destructive' : 'secondary'
                          }
                          className="capitalize"
                        >
                          {mutation.status.replace('_', ' ')}
                        </Badge>
                      </td>
                      <td>
                        <Button variant="outline" size="sm">Review</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GovCard>
        </div>
      </DashboardLayout>
    );
  }

  // Admin Dashboard
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">System overview and management</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Users"
            value="15,234"
            icon={<Users className="w-6 h-6" />}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Land Records"
            value="2.5 Cr"
            icon={<MapPin className="w-6 h-6" />}
            subtitle="Digitized records"
          />
          <StatCard
            title="Revenue Collected"
            value="₹45.2 Cr"
            icon={<TrendingUp className="w-6 h-6" />}
            trend={{ value: 15, isPositive: true }}
          />
          <StatCard
            title="Active Officers"
            value="342"
            icon={<Users className="w-6 h-6" />}
            subtitle="Across all districts"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <GovCard
            title="User Management"
            icon={<Users className="w-5 h-5" />}
            action={
              <Link to="/dashboard/users">
                <Button variant="ghost" size="sm" className="gap-1">
                  Manage <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            }
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-foreground">Total Citizens</span>
                <span className="font-semibold">14,892</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-foreground">Revenue Officers</span>
                <span className="font-semibold">342</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-foreground">Administrators</span>
                <span className="font-semibold">12</span>
              </div>
            </div>
          </GovCard>

          <GovCard
            title="System Analytics"
            icon={<BarChart3 className="w-5 h-5" />}
            action={
              <Link to="/dashboard/analytics">
                <Button variant="ghost" size="sm" className="gap-1">
                  Details <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            }
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-foreground">Today's Logins</span>
                <span className="font-semibold">1,234</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-foreground">Mutations Processed</span>
                <span className="font-semibold">89</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-foreground">Tax Payments</span>
                <span className="font-semibold">₹12.5 Lakh</span>
              </div>
            </div>
          </GovCard>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
