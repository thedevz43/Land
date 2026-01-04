import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import GovCard from '@/components/GovCard';
import LandSearchForm from '@/components/LandSearchForm';
import AshokaChakraLoader from '@/components/AshokaChakraLoader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { demoLandParcels } from '@/utils/demoData';
import { formatINR } from '@/utils/constants';
import { Search, MapPin, Eye, FileText, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SearchParams {
  surveyNumber: string;
  ownerName: string;
  village: string;
  taluk: string;
  district: string;
  state: string;
}

const LandSearch = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState<typeof demoLandParcels>([]);

  const handleSearch = async (params: SearchParams) => {
    setIsSearching(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Filter demo data based on search params
    let filteredResults = [...demoLandParcels];
    
    if (params.surveyNumber) {
      filteredResults = filteredResults.filter(p => 
        `${p.surveyNumber}/${p.subDivision}`.toLowerCase().includes(params.surveyNumber.toLowerCase()) ||
        p.surveyNumber.toLowerCase().includes(params.surveyNumber.toLowerCase())
      );
    }
    
    if (params.ownerName) {
      filteredResults = filteredResults.filter(p => 
        p.ownerName.toLowerCase().includes(params.ownerName.toLowerCase())
      );
    }
    
    if (params.village) {
      filteredResults = filteredResults.filter(p => 
        p.village.toLowerCase().includes(params.village.toLowerCase())
      );
    }
    
    if (params.district) {
      filteredResults = filteredResults.filter(p => 
        p.district.toLowerCase().includes(params.district.toLowerCase())
      );
    }
    
    setResults(filteredResults);
    setHasSearched(true);
    setIsSearching(false);
  };

  return (
    <MainLayout>
      {/* Page Header */}
      <section className="bg-primary py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <Search className="w-6 h-6 text-primary-foreground" />
            <h1 className="text-2xl font-bold text-primary-foreground">Land Records Search</h1>
          </div>
          <p className="text-primary-foreground/80">
            Search land records by survey number, owner name, village, or location
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Search Form */}
        <GovCard
          title="Search Parameters"
          subtitle="Enter at least one search criteria"
          icon={<Search className="w-5 h-5" />}
          className="mb-8"
        >
          <LandSearchForm onSearch={handleSearch} isLoading={isSearching} />
        </GovCard>

        {/* Loading State */}
        {isSearching && (
          <div className="text-center py-12">
            <AshokaChakraLoader size="lg" />
            <p className="mt-4 text-muted-foreground">Searching land records...</p>
          </div>
        )}

        {/* Results */}
        {!isSearching && hasSearched && (
          <GovCard
            title="Search Results"
            subtitle={`Found ${results.length} record(s)`}
            icon={<MapPin className="w-5 h-5" />}
          >
            {results.length === 0 ? (
              <div className="text-center py-8">
                <MapPin className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Records Found</h3>
                <p className="text-muted-foreground">
                  No land records match your search criteria. Try adjusting your search parameters.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="gov-table">
                  <thead>
                    <tr>
                      <th>Survey Number</th>
                      <th>Owner Name</th>
                      <th>Village / Taluk</th>
                      <th>District</th>
                      <th>Land Type</th>
                      <th>Area</th>
                      <th>Market Value</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((parcel) => (
                      <tr key={parcel.id}>
                        <td className="font-medium">
                          {parcel.surveyNumber}
                          {parcel.subDivision && `/${parcel.subDivision}`}
                        </td>
                        <td>{parcel.ownerName}</td>
                        <td>
                          {parcel.village}
                          <br />
                          <span className="text-xs text-muted-foreground">{parcel.taluk}</span>
                        </td>
                        <td>{parcel.district}</td>
                        <td>
                          <Badge variant="outline">{parcel.landType}</Badge>
                        </td>
                        <td>
                          {parcel.totalArea} {parcel.areaUnit}
                        </td>
                        <td className="font-medium">{formatINR(parcel.marketValue)}</td>
                        <td>
                          <div className="flex items-center gap-2">
                            <Link to={`/land/${parcel.id}`}>
                              <Button variant="outline" size="sm" className="gap-1">
                                <Eye className="w-3 h-3" />
                                View
                              </Button>
                            </Link>
                            <Button variant="ghost" size="sm" className="gap-1">
                              <Download className="w-3 h-3" />
                              RTC
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </GovCard>
        )}

        {/* Initial State */}
        {!isSearching && !hasSearched && (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
              <Search className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Search Land Records</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Use the search form above to find land records. You can search by survey number, 
              owner name, village, or select a district.
            </p>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <GovCard>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">What is RTC Extract?</h4>
                <p className="text-sm text-muted-foreground">
                  RTC (Record of Rights, Tenancy and Crops) is an official document that contains 
                  details about land ownership, area, and type of land. Also known as Pahani in some states.
                </p>
              </div>
            </div>
          </GovCard>

          <GovCard>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">What is Khata/Patta?</h4>
                <p className="text-sm text-muted-foreground">
                  Khata is a revenue document issued by the local authority that lists all the 
                  properties owned by a person within the jurisdiction of that authority.
                </p>
              </div>
            </div>
          </GovCard>
        </div>
      </div>
    </MainLayout>
  );
};

export default LandSearch;
