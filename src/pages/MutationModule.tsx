import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import GovCard from '@/components/GovCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { demoMutationRequests, demoLandParcels } from '@/utils/demoData';
import { INDIAN_STATES, DISTRICTS_BY_STATE } from '@/utils/constants';
import { FileText, Plus, Clock, CheckCircle, XCircle, Upload, Eye } from 'lucide-react';
import { toast } from 'sonner';

const MutationModule = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    surveyNumber: '',
    mutationType: '',
    previousOwner: '',
    newOwner: '',
    reason: '',
    state: '',
    district: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === 'state') {
      setFormData((prev) => ({ ...prev, district: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Mutation application submitted successfully!');
    setIsDialogOpen(false);
    setFormData({
      surveyNumber: '',
      mutationType: '',
      previousOwner: '',
      newOwner: '',
      reason: '',
      state: '',
      district: '',
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-accent" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-destructive" />;
      default:
        return <Clock className="w-4 h-4 text-secondary" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'approved':
        return 'default';
      case 'rejected':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const districts = formData.state ? DISTRICTS_BY_STATE[formData.state] || [] : [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Mutation Requests</h1>
            <p className="text-muted-foreground">
              Apply for land mutation and track your applications
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                New Application
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Apply for Mutation</DialogTitle>
                <DialogDescription>
                  Fill in the details to submit a new mutation application
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="mutationType">Mutation Type *</Label>
                    <Select
                      value={formData.mutationType}
                      onValueChange={(v) => handleChange('mutationType', v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sale">Sale / Purchase</SelectItem>
                        <SelectItem value="inheritance">Inheritance</SelectItem>
                        <SelectItem value="gift">Gift Deed</SelectItem>
                        <SelectItem value="partition">Partition</SelectItem>
                        <SelectItem value="court_decree">Court Decree</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="surveyNumber">Survey Number *</Label>
                    <Input
                      id="surveyNumber"
                      placeholder="e.g., 123/A"
                      value={formData.surveyNumber}
                      onChange={(e) => handleChange('surveyNumber', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Select
                      value={formData.state}
                      onValueChange={(v) => handleChange('state', v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {INDIAN_STATES.map((state) => (
                          <SelectItem key={state.code} value={state.code}>
                            {state.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="district">District *</Label>
                    <Select
                      value={formData.district}
                      onValueChange={(v) => handleChange('district', v)}
                      disabled={!formData.state}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select district" />
                      </SelectTrigger>
                      <SelectContent>
                        {districts.map((district) => (
                          <SelectItem key={district} value={district}>
                            {district}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="previousOwner">Previous Owner *</Label>
                    <Input
                      id="previousOwner"
                      placeholder="Enter previous owner name"
                      value={formData.previousOwner}
                      onChange={(e) => handleChange('previousOwner', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newOwner">New Owner (Applicant) *</Label>
                    <Input
                      id="newOwner"
                      placeholder="Enter new owner name"
                      value={formData.newOwner}
                      onChange={(e) => handleChange('newOwner', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason">Reason / Remarks</Label>
                  <Textarea
                    id="reason"
                    placeholder="Provide additional details about the mutation"
                    value={formData.reason}
                    onChange={(e) => handleChange('reason', e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Upload Documents</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag and drop files here, or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Required: Sale Deed, Encumbrance Certificate, Aadhaar Copy
                    </p>
                    <Button type="button" variant="outline" size="sm" className="mt-4">
                      Browse Files
                    </Button>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Submit Application</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <GovCard className="text-center">
            <p className="text-2xl font-bold text-foreground">
              {demoMutationRequests.length}
            </p>
            <p className="text-sm text-muted-foreground">Total Applications</p>
          </GovCard>
          <GovCard className="text-center">
            <p className="text-2xl font-bold text-secondary">
              {demoMutationRequests.filter((m) => m.status === 'pending').length}
            </p>
            <p className="text-sm text-muted-foreground">Pending</p>
          </GovCard>
          <GovCard className="text-center">
            <p className="text-2xl font-bold text-primary">
              {demoMutationRequests.filter((m) => m.status === 'under_review').length}
            </p>
            <p className="text-sm text-muted-foreground">Under Review</p>
          </GovCard>
          <GovCard className="text-center">
            <p className="text-2xl font-bold text-accent">
              {demoMutationRequests.filter((m) => m.status === 'approved').length}
            </p>
            <p className="text-sm text-muted-foreground">Approved</p>
          </GovCard>
        </div>

        {/* Applications List */}
        <GovCard title="My Applications" icon={<FileText className="w-5 h-5" />}>
          <div className="overflow-x-auto">
            <table className="gov-table">
              <thead>
                <tr>
                  <th>Application No.</th>
                  <th>Type</th>
                  <th>Survey No.</th>
                  <th>Previous Owner</th>
                  <th>New Owner</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {demoMutationRequests.map((mutation) => (
                  <tr key={mutation.id}>
                    <td className="font-medium">{mutation.applicationNumber}</td>
                    <td>{mutation.mutationType}</td>
                    <td>{mutation.surveyNumber}</td>
                    <td>{mutation.previousOwner}</td>
                    <td>{mutation.newOwner}</td>
                    <td>{mutation.applicationDate}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(mutation.status)}
                        <Badge variant={getStatusVariant(mutation.status) as any} className="capitalize">
                          {mutation.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    </td>
                    <td>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Eye className="w-3 h-3" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GovCard>

        {/* Info */}
        <GovCard>
          <h4 className="font-semibold text-foreground mb-3">Required Documents for Mutation</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-accent" />
              Sale Deed / Gift Deed / Partition Deed (as applicable)
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-accent" />
              Encumbrance Certificate (EC) for the last 13 years
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-accent" />
              Aadhaar Card copies of both parties
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-accent" />
              Previous RTC / Pahani
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-accent" />
              Tax paid receipts
            </li>
          </ul>
        </GovCard>
      </div>
    </DashboardLayout>
  );
};

export default MutationModule;
