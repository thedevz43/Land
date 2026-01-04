import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import GovCard from '@/components/GovCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Search,
  FileText,
  CreditCard,
  Upload,
  Download,
  MapPin,
  Users,
  ClipboardList,
  Shield,
  ArrowRight,
} from 'lucide-react';

const Services = () => {
  const citizenServices = [
    {
      icon: <Search className="w-6 h-6" />,
      title: 'Land Records Search',
      description: 'Search and view land records by survey number, owner name, or location. Access RTC/Pahani details.',
      href: '/search',
      color: 'bg-primary',
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Mutation Application',
      description: 'Apply for land mutation online. Track application status and upload required documents.',
      href: '/mutation',
      color: 'bg-secondary',
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: 'Pay Land Tax',
      description: 'View tax dues and pay land revenue tax online using UPI, cards, or net banking.',
      href: '/tax',
      color: 'bg-accent',
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: 'RTC / Patta Extract',
      description: 'Download Record of Rights, Tenancy and Crops (RTC) or Patta/Chitta extract.',
      href: '/rtc',
      color: 'bg-primary',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Encumbrance Certificate',
      description: 'Apply for and download Encumbrance Certificate (EC) for property transactions.',
      href: '/encumbrance',
      color: 'bg-secondary',
    },
    {
      icon: <Upload className="w-6 h-6" />,
      title: 'Document Upload',
      description: 'Upload and manage land-related documents. Link documents to your properties.',
      href: '/documents',
      color: 'bg-accent',
    },
  ];

  const otherServices = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Land Conversion',
      description: 'Apply for conversion of land from agricultural to non-agricultural use.',
      href: '/conversion',
    },
    {
      icon: <ClipboardList className="w-6 h-6" />,
      title: 'Boundary Dispute',
      description: 'File a complaint for land boundary disputes and track resolution.',
      href: '/disputes',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Legal Heir Certificate',
      description: 'Apply for legal heir certificate for inherited properties.',
      href: '/legal-heir',
    },
  ];

  return (
    <MainLayout>
      {/* Header */}
      <section className="bg-primary py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-primary-foreground mb-4">Citizen Services</h1>
          <p className="text-primary-foreground/80 max-w-2xl">
            Access all land revenue services online. Our digital platform ensures transparency, 
            efficiency, and ease of access for all citizens.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Main Services */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-foreground mb-6 saffron-accent inline-block">
            Primary Services
          </h2>
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {citizenServices.map((service, index) => (
              <Link key={index} to={service.href}>
                <GovCard className="h-full hover:shadow-elevated transition-all duration-300 group">
                  <div className={`w-12 h-12 rounded-xl ${service.color} flex items-center justify-center text-white mb-4`}>
                    {service.icon}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                  <span className="text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                    Access Service <ArrowRight className="w-4 h-4" />
                  </span>
                </GovCard>
              </Link>
            ))}
          </div>
        </section>

        {/* Other Services */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-foreground mb-6 saffron-accent inline-block">
            Other Services
          </h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {otherServices.map((service, index) => (
              <GovCard key={index} className="hover:shadow-elevated transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                </div>
              </GovCard>
            ))}
          </div>
        </section>

        {/* Help Section */}
        <section>
          <GovCard className="bg-muted/50">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h3 className="font-bold text-foreground text-lg mb-2">Need Help?</h3>
                <p className="text-muted-foreground">
                  Contact our helpline for any queries related to land records and services.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" className="gap-2">
                  <Shield className="w-4 h-4" />
                  FAQs
                </Button>
                <Button className="gap-2">
                  Call: 1800-XXX-XXXX
                </Button>
              </div>
            </div>
          </GovCard>
        </section>
      </div>
    </MainLayout>
  );
};

export default Services;
