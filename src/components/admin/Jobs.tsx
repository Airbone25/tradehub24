import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Search } from 'lucide-react';

export default function AdminJobs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Jobs</h1>
        <p className="text-muted-foreground">
          Monitor and manage job postings
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search jobs..." className="pl-8" />
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Posted By</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Posted Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              {
                title: 'Bathroom Renovation',
                category: 'Plumbing',
                location: 'Seattle, WA',
                postedBy: 'John Smith',
                status: 'Active',
                postedDate: '2024-03-01',
              },
              {
                title: 'Kitchen Remodel',
                category: 'General Contractor',
                location: 'Portland, OR',
                postedBy: 'Sarah Johnson',
                status: 'Completed',
                postedDate: '2024-02-15',
              },
              {
                title: 'Roof Repair',
                category: 'Roofing',
                location: 'Vancouver, WA',
                postedBy: 'Mike Wilson',
                status: 'Pending',
                postedDate: '2024-03-05',
              },
            ].map((job, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{job.title}</TableCell>
                <TableCell>{job.category}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>{job.postedBy}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                    job.status === 'Active' 
                      ? 'bg-green-50 text-green-700'
                      : job.status === 'Completed'
                      ? 'bg-blue-50 text-blue-700'
                      : 'bg-yellow-50 text-yellow-700'
                  }`}>
                    {job.status}
                  </span>
                </TableCell>
                <TableCell>{job.postedDate}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}