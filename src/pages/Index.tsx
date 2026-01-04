import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import GovCard from '@/components/GovCard';
import AshokaChakraLoader from '@/components/AshokaChakraLoader';
import {
  Search,
  FileText,
  CreditCard,
  Upload,
  Users,
  Shield,
  ArrowRight,
  CheckCircle,
  MapPin,
  Phone,
  Clock,
} from 'lucide-react';

const Index = () => {
  const services = [
    {
      icon: <Search className="w-6 h-6" />,
      title: 'Land Records Search',
      description: 'Search land records by survey number, owner name, or location',
      href: '/search',
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Mutation Application',
      description: 'Apply for land mutation and track application status',
      href: '/mutation',
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: 'Tax Payment',
      description: 'View and pay your land tax dues online',
      href: '/tax',
    },
    {
      icon: <Upload className="w-6 h-6" />,
      title: 'RTC / Patta Extract',
      description: 'Download Record of Rights, Tenancy and Crops',
      href: '/rtc',
    },
  ];

  const stats = [
    { value: '2.5 Cr+', label: 'Land Records Digitized' },
    { value: '15 Lakh+', label: 'Citizens Registered' },
    { value: '98%', label: 'Services Digitized' },
    { value: '24/7', label: 'Online Availability' },
  ];

  const features = [
    'View and verify land ownership details',
    'Check encumbrance status online',
    'Download Khata/Patta certificates',
    'Track mutation application status',
    'Pay land revenue tax online',
    'Access historical land records',
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-[var(--gradient-hero)] pattern-indian py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-1 w-12 bg-secondary rounded" />
              <span className="text-secondary font-medium text-sm">Government of India</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6 leading-tight">
              Land Revenue Management System
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 leading-relaxed">
              Your one-stop digital portal for all land record services. Search records, 
              apply for mutations, pay taxes, and access citizen services - all from the comfort of your home.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/search">
                <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2">
                  <Search className="w-5 h-5" />
                  Search Land Records
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 gap-2">
                  <Users className="w-5 h-5" />
                  Citizen Registration
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="absolute right-8 bottom-8 opacity-10 hidden lg:block">
          <AshokaChakraLoader size="lg" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-muted py-8 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 saffron-accent inline-block">
              Citizen Services
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-6">
              Access all land revenue services online. Our digital platform ensures transparency, 
              efficiency, and ease of access for all citizens.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Link key={index} to={service.href}>
                <GovCard className="h-full hover:shadow-elevated transition-all duration-300 group">
                  <div className="text-center">
                    <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {service.icon}
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                </GovCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 saffron-accent">
                About Land Records
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                The Land Revenue Management System is a comprehensive digital platform designed 
                to streamline land record management across India. Our system integrates with 
                state revenue departments to provide accurate, up-to-date information about 
                land ownership, mutations, and related services.
              </p>
              <ul className="space-y-3 mb-8">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-foreground">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link to="/services">
                <Button variant="outline" className="gap-2">
                  Explore All Services
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <GovCard className="bg-primary text-primary-foreground">
                <div className="text-center py-4">
                  <Shield className="w-10 h-10 mx-auto mb-3 opacity-90" />
                  <h4 className="font-semibold mb-1">Secure & Verified</h4>
                  <p className="text-sm opacity-80">Government authenticated records</p>
                </div>
              </GovCard>
              <GovCard className="bg-secondary text-secondary-foreground">
                <div className="text-center py-4">
                  <Clock className="w-10 h-10 mx-auto mb-3 opacity-90" />
                  <h4 className="font-semibold mb-1">Quick Access</h4>
                  <p className="text-sm opacity-80">Get records in minutes</p>
                </div>
              </GovCard>
              <GovCard className="bg-accent text-accent-foreground">
                <div className="text-center py-4">
                  <MapPin className="w-10 h-10 mx-auto mb-3 opacity-90" />
                  <h4 className="font-semibold mb-1">Pan-India Coverage</h4>
                  <p className="text-sm opacity-80">All states & districts</p>
                </div>
              </GovCard>
              <GovCard className="border-2 border-primary">
                <div className="text-center py-4">
                  <Phone className="w-10 h-10 mx-auto mb-3 text-primary" />
                  <h4 className="font-semibold mb-1 text-foreground">Helpline</h4>
                  <p className="text-sm text-muted-foreground">1800-XXX-XXXX</p>
                </div>
              </GovCard>
            </div>
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-8 bg-secondary/10 border-y border-secondary/20">
        <div className="container mx-auto px-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-secondary-foreground" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-1">Important Notice</h4>
              <p className="text-sm text-muted-foreground">
                Citizens are advised to verify land records before any property transaction. 
                Always obtain an Encumbrance Certificate and verify ownership details through 
                official channels. For any discrepancies, contact your local Sub-Registrar office.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Ready to Access Your Land Records?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Register now to access all land revenue services. Track applications, 
            pay taxes, and manage your land records online.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/register">
              <Button size="lg" className="gap-2">
                <Users className="w-5 h-5" />
                Register Now
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="gap-2">
                Already Registered? Login
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
