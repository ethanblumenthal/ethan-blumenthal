'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { format } from 'date-fns';
import { 
  ArrowLeft, 
  Save, 
  Mail, 
  Phone, 
  Globe, 
  Building2, 
  Calendar,
  TrendingUp,
  Edit2,
  X,
  Check,
  AlertCircle,
  Trash2,
  MessageSquare,
  FileText,
  DollarSign
} from 'lucide-react';

import { 
  Button, 
  Input, 
  Label, 
  Textarea, 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Badge,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@personal-app/ui';
import { trpc } from '@/components/providers';
import { toast } from 'sonner';

// Types
interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  linkedinProfile: string;
  xProfile: string;
  status: 'prospect' | 'qualified' | 'engaged' | 'converted' | 'lost';
  group: 'venture_capital' | 'private_equity' | 'angel_investor' | 'lender' | 'broker' | null;
  labels: string[];
  notes: string;
}

// Status and group configurations
const statusConfig = {
  prospect: { label: 'Prospect', color: 'bg-gray-500' },
  qualified: { label: 'Qualified', color: 'bg-blue-500' },
  engaged: { label: 'Engaged', color: 'bg-yellow-500' },
  converted: { label: 'Converted', color: 'bg-green-500' },
  lost: { label: 'Lost', color: 'bg-red-500' },
};

const groupConfig = {
  venture_capital: { label: 'Venture Capital', color: 'bg-pink-500' },
  private_equity: { label: 'Private Equity', color: 'bg-cyan-500' },
  angel_investor: { label: 'Angel Investor', color: 'bg-emerald-500' },
  lender: { label: 'Lender', color: 'bg-indigo-500' },
  broker: { label: 'Broker', color: 'bg-teal-500' },
};

export default function ContactDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const contactId = parseInt(params.id as string);
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ContactFormData | null>(null);
  const [newLabel, setNewLabel] = useState('');

  // Fetch contact data
  const { data: contact, isLoading, refetch } = trpc.contact.getById.useQuery(
    { id: contactId },
    { 
      enabled: !!contactId,
      onSuccess: (data) => {
        if (data) {
          setFormData({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone || '',
            company: data.company || '',
            website: data.website || '',
            linkedinProfile: data.linkedinProfile || '',
            xProfile: data.xProfile || '',
            status: data.status,
            group: data.group,
            labels: data.labels || [],
            notes: data.notes || '',
          });
        }
      }
    }
  );

  // Update contact mutation
  const updateContact = trpc.contact.update.useMutation({
    onSuccess: () => {
      toast.success('Contact updated successfully');
      setIsEditing(false);
      refetch();
    },
    onError: (error) => {
      toast.error('Failed to update contact: ' + error.message);
    },
  });

  // Delete contact mutation
  const deleteContact = trpc.contact.delete.useMutation({
    onSuccess: () => {
      toast.success('Contact deleted successfully');
      router.push('/contacts');
    },
    onError: (error) => {
      toast.error('Failed to delete contact: ' + error.message);
    },
  });

  const handleSave = () => {
    if (!formData || !contact) return;
    
    updateContact.mutate({
      id: contactId,
      ...formData,
    });
  };

  const handleCancel = () => {
    if (contact) {
      setFormData({
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        phone: contact.phone || '',
        company: contact.company || '',
        website: contact.website || '',
        linkedinProfile: contact.linkedinProfile || '',
        xProfile: contact.xProfile || '',
        status: contact.status,
        group: contact.group,
        labels: contact.labels || [],
        notes: contact.notes || '',
      });
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this contact? This action cannot be undone.')) {
      deleteContact.mutate({ id: contactId });
    }
  };

  const addLabel = () => {
    if (newLabel && formData && !formData.labels.includes(newLabel)) {
      setFormData({
        ...formData,
        labels: [...formData.labels, newLabel],
      });
      setNewLabel('');
    }
  };

  const removeLabel = (label: string) => {
    if (formData) {
      setFormData({
        ...formData,
        labels: formData.labels.filter(l => l !== label),
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading contact details...</p>
        </div>
      </div>
    );
  }

  if (!contact || !formData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg font-semibold">Contact not found</p>
          <Button onClick={() => router.push('/contacts')} className="mt-4">
            Back to Contacts
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/contacts')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-primary">
              {isEditing ? 'Edit Contact' : `${contact.firstName} ${contact.lastName}`}
            </h1>
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant="secondary" className={`${statusConfig[contact.status as keyof typeof statusConfig]?.color || 'bg-gray-500'} text-white`}>
                {statusConfig[contact.status as keyof typeof statusConfig]?.label || contact.status}
              </Badge>
              {contact.group && (
                <Badge variant="outline" className={`${groupConfig[contact.group as keyof typeof groupConfig]?.color || 'bg-gray-500'} text-white border-0`}>
                  {groupConfig[contact.group as keyof typeof groupConfig]?.label || contact.group}
                </Badge>
              )}
              <span className="text-sm text-muted-foreground">
                Lead Score: {contact.leadScore}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button onClick={handleSave} className="btn-primary">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={handleDelete} className="text-red-600 hover:text-red-700">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
              <Button onClick={() => setIsEditing(true)} className="btn-primary">
                <Edit2 className="mr-2 h-4 w-4" />
                Edit Contact
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="perplexity-card">
            <h2 className="text-lg font-semibold text-primary mb-6">Contact Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                {isEditing ? (
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  />
                ) : (
                  <p className="text-foreground">{contact.firstName}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                {isEditing ? (
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  />
                ) : (
                  <p className="text-foreground">{contact.lastName}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                ) : (
                  <a href={`mailto:${contact.email}`} className="text-primary hover:underline flex items-center">
                    <Mail className="mr-2 h-4 w-4" />
                    {contact.email}
                  </a>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                ) : contact.phone ? (
                  <a href={`tel:${contact.phone}`} className="text-primary hover:underline flex items-center">
                    <Phone className="mr-2 h-4 w-4" />
                    {contact.phone}
                  </a>
                ) : (
                  <p className="text-muted-foreground">Not provided</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                {isEditing ? (
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                ) : contact.company ? (
                  <p className="text-foreground flex items-center">
                    <Building2 className="mr-2 h-4 w-4 text-muted-foreground" />
                    {contact.company}
                  </p>
                ) : (
                  <p className="text-muted-foreground">Not provided</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                {isEditing ? (
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  />
                ) : contact.website ? (
                  <a href={contact.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center">
                    <Globe className="mr-2 h-4 w-4" />
                    {contact.website}
                  </a>
                ) : (
                  <p className="text-muted-foreground">Not provided</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                {isEditing ? (
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value as ContactFormData['status'] })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(statusConfig).map(([value, config]) => (
                        <SelectItem key={value} value={value}>
                          {config.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Badge variant="secondary" className={`${statusConfig[contact.status as keyof typeof statusConfig]?.color || 'bg-gray-500'} text-white`}>
                    {statusConfig[contact.status as keyof typeof statusConfig]?.label || contact.status}
                  </Badge>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="group">Group</Label>
                {isEditing ? (
                  <Select
                    value={formData.group || 'none'}
                    onValueChange={(value) => setFormData({ ...formData, group: value === 'none' ? null : value as ContactFormData['group'] })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {Object.entries(groupConfig).map(([value, config]) => (
                        <SelectItem key={value} value={value}>
                          {config.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : contact.group ? (
                  <Badge variant="outline" className={`${groupConfig[contact.group as keyof typeof groupConfig]?.color || 'bg-gray-500'} text-white border-0`}>
                    {groupConfig[contact.group as keyof typeof groupConfig]?.label || contact.group}
                  </Badge>
                ) : (
                  <p className="text-muted-foreground">Not assigned</p>
                )}
              </div>
            </div>
            
            {/* Social Profiles */}
            <div className="mt-6 space-y-4">
              <h3 className="text-md font-semibold text-foreground">Social Profiles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedinProfile">LinkedIn Profile</Label>
                  {isEditing ? (
                    <Input
                      id="linkedinProfile"
                      value={formData.linkedinProfile}
                      onChange={(e) => setFormData({ ...formData, linkedinProfile: e.target.value })}
                      placeholder="linkedin.com/in/username"
                    />
                  ) : contact.linkedinProfile ? (
                    <a href={contact.linkedinProfile} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {contact.linkedinProfile}
                    </a>
                  ) : (
                    <p className="text-muted-foreground">Not provided</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="xProfile">X (Twitter) Profile</Label>
                  {isEditing ? (
                    <Input
                      id="xProfile"
                      value={formData.xProfile}
                      onChange={(e) => setFormData({ ...formData, xProfile: e.target.value })}
                      placeholder="x.com/username"
                    />
                  ) : contact.xProfile ? (
                    <a href={contact.xProfile} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {contact.xProfile}
                    </a>
                  ) : (
                    <p className="text-muted-foreground">Not provided</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Labels */}
            <div className="mt-6 space-y-4">
              <h3 className="text-md font-semibold text-foreground">Labels</h3>
              {isEditing ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Input
                      value={newLabel}
                      onChange={(e) => setNewLabel(e.target.value)}
                      placeholder="Add a label"
                      onKeyPress={(e) => e.key === 'Enter' && addLabel()}
                    />
                    <Button onClick={addLabel} size="sm">
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.labels.map((label) => (
                      <Badge key={label} variant="secondary" className="flex items-center space-x-1">
                        <span>{label}</span>
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => removeLabel(label)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {contact.labels.length > 0 ? (
                    contact.labels.map((label: string) => (
                      <Badge key={label} variant="secondary">
                        {label}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-muted-foreground">No labels</p>
                  )}
                </div>
              )}
            </div>
            
            {/* Notes */}
            <div className="mt-6 space-y-4">
              <h3 className="text-md font-semibold text-foreground">Notes</h3>
              {isEditing ? (
                <Textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Add notes about this contact..."
                  rows={4}
                />
              ) : contact.notes ? (
                <p className="text-foreground whitespace-pre-wrap">{contact.notes}</p>
              ) : (
                <p className="text-muted-foreground">No notes</p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="perplexity-card">
            <h3 className="text-lg font-semibold text-primary mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Lead Score</span>
                </div>
                <span className="font-semibold">{contact.leadScore}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Created</span>
                </div>
                <span className="text-sm">{format(new Date(contact.createdAt), 'MMM dd, yyyy')}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Last Updated</span>
                </div>
                <span className="text-sm">{format(new Date(contact.updatedAt), 'MMM dd, yyyy')}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Source</span>
                </div>
                <span className="text-sm capitalize">{contact.source}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="perplexity-card">
            <h3 className="text-lg font-semibold text-primary mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start" onClick={() => window.location.href = `mailto:${contact.email}`}>
                <Mail className="mr-2 h-4 w-4" />
                Send Email
              </Button>
              {contact.phone && (
                <Button variant="outline" className="w-full justify-start" onClick={() => window.location.href = `tel:${contact.phone}`}>
                  <Phone className="mr-2 h-4 w-4" />
                  Call Contact
                </Button>
              )}
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4" />
                Add Note
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <DollarSign className="mr-2 h-4 w-4" />
                Create Deal
              </Button>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="perplexity-card">
            <h3 className="text-lg font-semibold text-primary mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                <div className="flex-1">
                  <p className="text-sm">Contact created</p>
                  <p className="text-xs text-muted-foreground">{format(new Date(contact.createdAt), 'MMM dd, yyyy h:mm a')}</p>
                </div>
              </div>
              {contact.updatedAt !== contact.createdAt && (
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5"></div>
                  <div className="flex-1">
                    <p className="text-sm">Contact updated</p>
                    <p className="text-xs text-muted-foreground">{format(new Date(contact.updatedAt), 'MMM dd, yyyy h:mm a')}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}