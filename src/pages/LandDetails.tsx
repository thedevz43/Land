import React from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import GovCard from '@/components/GovCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { demoLandParcels } from '@/utils/demoData';
import { formatINR, formatIndianDate } from '@/utils/constants';
import {
  MapPin,
  User,
  FileText,
  Download,
  ArrowLeft,
  Map,
  CreditCard,
  Compass,
  Building,
  Calendar,
  Eye,
} from 'lucide-react';

const LandDetails = () => {
  const { id } = useParams<{ id: string }>();
  const parcel = demoLandParcels.find((p) => p.id === id);

  if (!parcel) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <MapPin className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Land Record Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The land record you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/search">
            <Button className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Search
            </Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Header */}
      <section className="bg-primary py-6">
        <div className="container mx-auto px-4">
          <Link
            to="/search"
            className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Search
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-primary-foreground">
                Survey No. {parcel.surveyNumber}
                {parcel.subDivision && `/${parcel.subDivision}`}
              </h1>
              <p className="text-primary-foreground/80">
                {parcel.village}, {parcel.taluk}, {parcel.district}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" className="gap-2">
                <Download className="w-4 h-4" />
                Download RTC
              </Button>
              <Button
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                Print
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Owner Details */}
            <GovCard title="Owner Details" icon={<User className="w-5 h-5" />}>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Owner Name</p>
                  <p className="font-semibold text-foreground">{parcel.ownerName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Father's Name</p>
                  <p className="font-semibold text-foreground">{parcel.fatherName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Aadhaar Number</p>
                  <p className="font-semibold text-foreground">{parcel.ownerAadhaar}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Registration Date</p>
                  <p className="font-semibold text-foreground">{parcel.registrationDate}</p>
                </div>
              </div>
            </GovCard>

            {/* Land Details */}
            <GovCard title="Land Details" icon={<MapPin className="w-5 h-5" />}>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Survey Number</p>
                  <p className="font-semibold text-foreground">
                    {parcel.surveyNumber}
                    {parcel.subDivision && `/${parcel.subDivision}`}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Khata Number</p>
                  <p className="font-semibold text-foreground">{parcel.khataNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Patta Number</p>
                  <p className="font-semibold text-foreground">{parcel.pattaNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Land Type</p>
                  <Badge variant="outline">{parcel.landType}</Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Area</p>
                  <p className="font-semibold text-foreground">
                    {parcel.totalArea} {parcel.areaUnit}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Market Value</p>
                  <p className="font-semibold text-foreground text-accent">
                    {formatINR(parcel.marketValue)}
                  </p>
                </div>
              </div>
            </GovCard>

            {/* Location Details */}
            <GovCard title="Location" icon={<Building className="w-5 h-5" />}>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">Village</p>
                  <p className="font-semibold text-foreground">{parcel.village}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Taluk / Mandal</p>
                  <p className="font-semibold text-foreground">{parcel.taluk}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">District</p>
                  <p className="font-semibold text-foreground">{parcel.district}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">State</p>
                  <p className="font-semibold text-foreground">{parcel.state}</p>
                </div>
              </div>
            </GovCard>

            {/* Boundaries */}
            <GovCard title="Boundary Details" icon={<Compass className="w-5 h-5" />}>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">North</p>
                  <p className="font-medium text-foreground">{parcel.boundaries.north}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">South</p>
                  <p className="font-medium text-foreground">{parcel.boundaries.south}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">East</p>
                  <p className="font-medium text-foreground">{parcel.boundaries.east}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">West</p>
                  <p className="font-medium text-foreground">{parcel.boundaries.west}</p>
                </div>
              </div>
            </GovCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Map Placeholder */}
            <GovCard title="Location Map" icon={<Map className="w-5 h-5" />}>
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Map className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Map View</p>
                  <p className="text-xs text-muted-foreground">Coming Soon</p>
                </div>
              </div>
            </GovCard>

            {/* Tax Status */}
            <GovCard title="Tax Status" icon={<CreditCard className="w-5 h-5" />}>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Tax Due</span>
                  <span
                    className={`font-bold ${
                      parcel.taxDue > 0 ? 'text-destructive' : 'text-accent'
                    }`}
                  >
                    {formatINR(parcel.taxDue)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Last Paid</span>
                  <span className="font-medium">{parcel.lastTaxPaid}</span>
                </div>
                {parcel.taxDue > 0 && (
                  <Button className="w-full gap-2">
                    <CreditCard className="w-4 h-4" />
                    Pay Tax Now
                  </Button>
                )}
              </div>
            </GovCard>

            {/* Documents */}
            <GovCard title="Documents" icon={<FileText className="w-5 h-5" />}>
              <div className="space-y-2">
                {parcel.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{doc.uploadedOn}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </GovCard>

            {/* Quick Actions */}
            <GovCard title="Quick Actions">
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <FileText className="w-4 h-4" />
                  Apply for Mutation
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Download className="w-4 h-4" />
                  Download Encumbrance Certificate
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Calendar className="w-4 h-4" />
                  View Transaction History
                </Button>
              </div>
            </GovCard>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default LandDetails;
