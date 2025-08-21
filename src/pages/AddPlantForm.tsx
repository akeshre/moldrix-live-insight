import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, User, Phone, Mail, Clock, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function AddPlantForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    address: '',
    country: '',
    timezone: '',
    manager: '',
    managerEmail: '',
    managerPhone: '',
    capacity: '',
    operatingHours: '',
    description: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Plant Added Successfully! 🏭",
        description: `${formData.name} has been added to your manufacturing network.`,
      });
      
      // Navigate back to global dashboard
      navigate('/');
      setIsSubmitting(false);
    }, 1500);
  };

  const isFormValid = formData.name && formData.location && formData.manager && formData.managerEmail;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="hover-lift">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Dashboard
            </Button>
            <div className="h-4 w-px bg-border" />
            <div>
              <h1 className="text-lg font-bold text-primary">Add New Plant</h1>
              <p className="text-sm text-muted-foreground">Expand your manufacturing network</p>
            </div>
          </div>
          
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-4xl">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Basic Information */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building className="w-5 h-5 text-primary" />
                  <span>Basic Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Plant Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="e.g., Mumbai Manufacturing Plant"
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location/City *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="e.g., Mumbai, Maharashtra"
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="address">Full Address</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Street address, postal code"
                    className="mt-1"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="india">India</SelectItem>
                        <SelectItem value="usa">United States</SelectItem>
                        <SelectItem value="china">China</SelectItem>
                        <SelectItem value="germany">Germany</SelectItem>
                        <SelectItem value="japan">Japan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select value={formData.timezone} onValueChange={(value) => handleInputChange('timezone', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asia/kolkata">Asia/Kolkata (IST)</SelectItem>
                        <SelectItem value="america/new_york">America/New_York (EST)</SelectItem>
                        <SelectItem value="europe/london">Europe/London (GMT)</SelectItem>
                        <SelectItem value="asia/shanghai">Asia/Shanghai (CST)</SelectItem>
                        <SelectItem value="asia/tokyo">Asia/Tokyo (JST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Manager Information */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-primary" />
                  <span>Plant Manager</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="manager">Manager Name *</Label>
                  <Input
                    id="manager"
                    value={formData.manager}
                    onChange={(e) => handleInputChange('manager', e.target.value)}
                    placeholder="e.g., Raj Patel"
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="managerEmail">Email Address *</Label>
                  <Input
                    id="managerEmail"
                    type="email"
                    value={formData.managerEmail}
                    onChange={(e) => handleInputChange('managerEmail', e.target.value)}
                    placeholder="manager@company.com"
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="managerPhone">Phone Number</Label>
                  <Input
                    id="managerPhone"
                    type="tel"
                    value={formData.managerPhone}
                    onChange={(e) => handleInputChange('managerPhone', e.target.value)}
                    placeholder="+91 98765 43210"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="operatingHours">Operating Hours</Label>
                  <Select value={formData.operatingHours} onValueChange={(value) => handleInputChange('operatingHours', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select shift pattern" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single Shift (8 hours)</SelectItem>
                      <SelectItem value="double">Double Shift (16 hours)</SelectItem>
                      <SelectItem value="triple">Triple Shift (24 hours)</SelectItem>
                      <SelectItem value="custom">Custom Schedule</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Operational Details */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Operational Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="capacity">Production Capacity</Label>
                  <Select value={formData.capacity} onValueChange={(value) => handleInputChange('capacity', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select capacity range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small (1-5 machines)</SelectItem>
                      <SelectItem value="medium">Medium (6-15 machines)</SelectItem>
                      <SelectItem value="large">Large (16-30 machines)</SelectItem>
                      <SelectItem value="enterprise">Enterprise (30+ machines)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description">Plant Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Brief description of plant capabilities, specializations, etc."
                    className="mt-1"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Preview Card */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>📋</span>
                  <span>Plant Preview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Name:</span>
                    <span className="font-medium">{formData.name || 'Not specified'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="font-medium">{formData.location || 'Not specified'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Manager:</span>
                    <span className="font-medium">{formData.manager || 'Not specified'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Capacity:</span>
                    <span className="font-medium">{formData.capacity || 'Not specified'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Shifts:</span>
                    <span className="font-medium">{formData.operatingHours || 'Not specified'}</span>
                  </div>
                </div>

                {formData.name && (
                  <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                    <p className="text-sm text-primary">
                      ✅ Ready to add {formData.name} to your manufacturing network!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Submit Section */}
          <div className="mt-8 flex items-center justify-between">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/')}
              className="hover-lift"
            >
              Cancel
            </Button>
            
            <div className="flex items-center space-x-3">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => {
                  setFormData({
                    name: '', location: '', address: '', country: '', timezone: '',
                    manager: '', managerEmail: '', managerPhone: '', capacity: '',
                    operatingHours: '', description: ''
                  });
                }}
                className="hover-lift"
              >
                Clear Form
              </Button>
              
              <Button 
                type="submit" 
                disabled={!isFormValid || isSubmitting}
                className="hover-lift"
              >
                {isSubmitting ? '🔄 Adding Plant...' : '🏭 Add Plant'}
              </Button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}