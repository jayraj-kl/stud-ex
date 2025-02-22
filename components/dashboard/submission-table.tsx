import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getSubmissions } from "../../app/actions/customer-care";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Key } from "react";

export async function SubmissionsTable() {
  const submissions = await getSubmissions();

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Subject</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Submitted</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions?.data?.map(
            (submission: {
              id: Key | null | undefined;
              subject: string;
              category: string;
              priority: string;
              status: string;
              imageUrl: string | null;
              createdAt: Date;
            }) => (
              <TableRow key={submission.id}>
                <TableCell className="font-medium">
                  {submission.subject}
                </TableCell>
                <TableCell>{submission.category}</TableCell>
                <TableCell>
                  <PriorityBadge priority={submission.priority} />
                </TableCell>
                <TableCell>
                  <StatusBadge status={submission.status} />
                </TableCell>
                <TableCell>
                  {submission.imageUrl && (
                    <div className="relative h-10 w-10">
                      <Image
                        src={submission.imageUrl || "/placeholder.svg"}
                        alt="Submission image"
                        fill
                        className="rounded-md object-cover"
                      />
                    </div>
                  )}
                </TableCell>
                <TableCell>{formatDate(submission.createdAt)}</TableCell>
              </TableRow>
            )
          )}
          {submissions?.data?.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No submissions yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  const variants = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-orange-100 text-orange-800",
    urgent: "bg-red-100 text-red-800",
  };

  return (
    <Badge
      variant="outline"
      className={variants[priority as keyof typeof variants]}
    >
      {priority}
    </Badge>
  );
}

function StatusBadge({ status }: { status: string }) {
  const variants = {
    new: "bg-blue-100 text-blue-800",
    inProgress: "bg-yellow-100 text-yellow-800",
    resolved: "bg-green-100 text-green-800",
    closed: "bg-gray-100 text-gray-800",
  };

  return (
    <Badge
      variant="outline"
      className={variants[status as keyof typeof variants]}
    >
      {status}
    </Badge>
  );
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}
