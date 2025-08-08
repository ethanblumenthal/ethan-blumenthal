'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Mail, Phone, ExternalLink, Eye, Edit, Trash2, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

import { 
  DataTable, 
  createSelectColumn, 
  Button, 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  Badge 
} from '@personal-app/ui';
import { trpc } from '@/components/providers';

// Types
interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  company: string | null;
  website: string | null;
  status: 'prospect' | 'qualified' | 'engaged' | 'converted' | 'lost';
  group: 'venture_capital' | 'private_equity' | 'angel_investor' | 'lender' | 'broker' | null;
  labels: string[];
  leadScore: number;
  source: string;
  createdAt: string;
  updatedAt: string;
}

// Status configuration
const statusConfig = {
  prospect: { label: 'Prospect', color: 'bg-gray-500' },
  qualified: { label: 'Qualified', color: 'bg-blue-500' },
  engaged: { label: 'Engaged', color: 'bg-yellow-500' },
  converted: { label: 'Converted', color: 'bg-green-500' },
  lost: { label: 'Lost', color: 'bg-red-500' },
};

const groupTypeConfig = {
  venture_capital: { label: 'VC', color: 'bg-pink-500' },
  private_equity: { label: 'PE', color: 'bg-cyan-500' },
  angel_investor: { label: 'Angel', color: 'bg-emerald-500' },
  lender: { label: 'Lender', color: 'bg-indigo-500' },
  broker: { label: 'Broker', color: 'bg-teal-500' },
};

// Contact Actions Component
function ContactActions({ contact }: { contact: Contact }) {
  const router = useRouter();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(contact.email)}>
          Copy email
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push(`/contacts/${contact.id}`)}>
          <Eye className="mr-2 h-4 w-4" />
          View details
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push(`/contacts/${contact.id}`)}>
          <Edit className="mr-2 h-4 w-4" />
          Edit contact
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => window.location.href = `mailto:${contact.email}`}>
          <Mail className="mr-2 h-4 w-4" />
          Send email
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete contact
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Lead Score Badge Component
function LeadScoreBadge({ score }: { score: number }) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="flex items-center space-x-2">
      <div
        className={`w-2 h-2 rounded-full ${getScoreColor(score)}`}
        title={`Lead Score: ${score}`}
      />
      <span className="text-sm font-medium">{score}</span>
    </div>
  );
}

// Column Definitions
const columns: ColumnDef<Contact>[] = [
  createSelectColumn<Contact>(),
  {
    accessorKey: 'firstName',
    header: 'Name',
    cell: ({ row }) => {
      const contact = row.original;
      const router = useRouter();
      return (
        <div 
          className="flex flex-col cursor-pointer hover:opacity-80"
          onClick={() => router.push(`/contacts/${contact.id}`)}
        >
          <div className="font-medium text-primary">
            {contact.firstName} {contact.lastName}
          </div>
          {contact.company && (
            <div className="text-sm text-muted-foreground">{contact.company}</div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'email',
    header: 'Contact Info',
    cell: ({ row }) => {
      const contact = row.original;
      return (
        <div className="flex flex-col space-y-1">
          <a
            href={`mailto:${contact.email}`}
            className="text-sm text-primary hover:underline flex items-center"
          >
            <Mail className="mr-1 h-3 w-3" />
            {contact.email}
          </a>
          {contact.phone && (
            <a
              href={`tel:${contact.phone}`}
              className="text-sm text-muted-foreground hover:underline flex items-center"
            >
              <Phone className="mr-1 h-3 w-3" />
              {contact.phone}
            </a>
          )}
          {contact.website && (
            <a
              href={contact.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:underline flex items-center"
            >
              <ExternalLink className="mr-1 h-3 w-3" />
              Website
            </a>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as keyof typeof statusConfig;
      const config = statusConfig[status];
      return (
        <Badge variant="secondary" className={`${config.color} text-white`}>
          {config.label}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'group',
    header: 'Type',
    cell: ({ row }) => {
      const group = row.getValue('group') as keyof typeof groupTypeConfig;
      if (!group) return null;
      const config = groupTypeConfig[group];
      return (
        <Badge variant="outline" className={`${config.color} text-white border-0`}>
          {config.label}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'labels',
    header: 'Labels',
    cell: ({ row }) => {
      const labels = row.getValue('labels') as string[];
      if (!labels || labels.length === 0) return null;
      return (
        <div className="flex flex-wrap gap-1">
          {labels.slice(0, 2).map((label) => (
            <Badge key={label} variant="secondary" className="text-xs">
              {label}
            </Badge>
          ))}
          {labels.length > 2 && (
            <Badge variant="secondary" className="text-xs">
              +{labels.length - 2}
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'leadScore',
    header: 'Score',
    cell: ({ row }) => <LeadScoreBadge score={row.getValue('leadScore')} />,
  },
  {
    accessorKey: 'source',
    header: 'Source',
    cell: ({ row }) => {
      const source = row.getValue('source') as string;
      return <span className="text-sm capitalize">{source}</span>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created',
    cell: ({ row }) => {
      const date = row.getValue('createdAt') as string;
      return <span className="text-sm">{format(new Date(date), 'MMM dd, yyyy')}</span>;
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <ContactActions contact={row.original} />,
    enableSorting: false,
    enableHiding: false,
  },
];

export default function ContactsPage() {
  const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);

  // Fetch contacts data
  const { data: contactsData, isLoading, refetch } = trpc.contact.getAll.useQuery({
    limit: 1000,
    offset: 0,
  });

  const contacts = contactsData?.contacts || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Contacts</h1>
          <p className="text-muted-foreground">
            Manage your CRM contacts and leads
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            Import Contacts
          </Button>
          <Button className="btn-primary">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Contact
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="metric-card">
          <div className="dashboard-stat">{contacts.length}</div>
          <div className="dashboard-stat-label">Total Contacts</div>
        </div>
        <div className="metric-card">
          <div className="dashboard-stat">
            {contacts.filter(c => c.status === 'qualified').length}
          </div>
          <div className="dashboard-stat-label">Qualified Leads</div>
        </div>
        <div className="metric-card">
          <div className="dashboard-stat">
            {contacts.filter(c => c.status === 'converted').length}
          </div>
          <div className="dashboard-stat-label">Converted</div>
        </div>
        <div className="metric-card">
          <div className="dashboard-stat">
            {Math.round(contacts.reduce((sum, c) => sum + c.leadScore, 0) / contacts.length) || 0}
          </div>
          <div className="dashboard-stat-label">Avg Lead Score</div>
        </div>
      </div>

      {/* Data Table */}
      <div className="perplexity-card p-0">
        <DataTable
          columns={columns}
          data={contacts}
          searchKey="email"
          searchPlaceholder="Search contacts..."
          onRefresh={refetch}
          isLoading={isLoading}
          showToolbar={true}
          showPagination={true}
          showColumnToggle={true}
          pageSize={25}
        />
      </div>
    </div>
  );
}