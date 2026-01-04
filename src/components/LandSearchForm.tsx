import React, { useState } from 'react';
import { Search, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { INDIAN_STATES, DISTRICTS_BY_STATE, TALUKS_BY_DISTRICT } from '@/utils/constants';

interface SearchParams {
  surveyNumber: string;
  ownerName: string;
  village: string;
  taluk: string;
  district: string;
  state: string;
}

interface LandSearchFormProps {
  onSearch: (params: SearchParams) => void;
  isLoading?: boolean;
}

const LandSearchForm: React.FC<LandSearchFormProps> = ({ onSearch, isLoading }) => {
  const [formData, setFormData] = useState<SearchParams>({
    surveyNumber: '',
    ownerName: '',
    village: '',
    taluk: '',
    district: '',
    state: '',
  });

  const handleChange = (field: keyof SearchParams, value: string) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      
      // Reset dependent fields
      if (field === 'state') {
        updated.district = '';
        updated.taluk = '';
      } else if (field === 'district') {
        updated.taluk = '';
      }
      
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(formData);
  };

  const handleReset = () => {
    setFormData({
      surveyNumber: '',
      ownerName: '',
      village: '',
      taluk: '',
      district: '',
      state: '',
    });
  };

  const districts = formData.state ? DISTRICTS_BY_STATE[formData.state] || [] : [];
  const taluks = formData.district ? TALUKS_BY_DISTRICT[formData.district] || [] : [];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Survey Number */}
        <div className="space-y-2">
          <Label htmlFor="surveyNumber">Survey Number</Label>
          <Input
            id="surveyNumber"
            placeholder="e.g., 123/A"
            value={formData.surveyNumber}
            onChange={(e) => handleChange('surveyNumber', e.target.value)}
          />
        </div>

        {/* Owner Name */}
        <div className="space-y-2">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input
            id="ownerName"
            placeholder="Enter owner name"
            value={formData.ownerName}
            onChange={(e) => handleChange('ownerName', e.target.value)}
          />
        </div>

        {/* State */}
        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Select value={formData.state} onValueChange={(v) => handleChange('state', v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select State" />
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

        {/* District */}
        <div className="space-y-2">
          <Label htmlFor="district">District</Label>
          <Select
            value={formData.district}
            onValueChange={(v) => handleChange('district', v)}
            disabled={!formData.state}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select District" />
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

        {/* Taluk */}
        <div className="space-y-2">
          <Label htmlFor="taluk">Taluk / Mandal</Label>
          <Select
            value={formData.taluk}
            onValueChange={(v) => handleChange('taluk', v)}
            disabled={!formData.district}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Taluk" />
            </SelectTrigger>
            <SelectContent>
              {taluks.map((taluk) => (
                <SelectItem key={taluk} value={taluk}>
                  {taluk}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Village */}
        <div className="space-y-2">
          <Label htmlFor="village">Village</Label>
          <Input
            id="village"
            placeholder="Enter village name"
            value={formData.village}
            onChange={(e) => handleChange('village', e.target.value)}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-4 border-t border-border">
        <Button type="submit" disabled={isLoading} className="gap-2">
          <Search className="w-4 h-4" />
          Search Land Records
        </Button>
        <Button type="button" variant="outline" onClick={handleReset} className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Reset
        </Button>
      </div>
    </form>
  );
};

export default LandSearchForm;
