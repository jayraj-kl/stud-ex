import { getCurrentUser } from "@/lib/session";
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import ExpandableCardDemo from "@/components/expandable-card-demo-grid";

// Sample data with realistic placeholder images from UI Faces
const tutors = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    description:
      "Mathematics & Physics Expert | 8 years of teaching experience",
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    description: "Computer Science Specialist | Full-stack Developer",
  },
  {
    id: 3,
    name: "Emma Williams",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    description: "English Literature & Language Arts | Published Author",
  },
  {
    id: 4,
    name: "David Rodriguez",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    description: "Chemistry & Biology Tutor | PhD in Biochemistry",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    description: "History & Social Studies | Museum Curator",
  },
  {
    id: 6,
    name: "James Wilson",
    avatar: "https://randomuser.me/api/portraits/men/6.jpg",
    description: "Music Theory & Composition | Concert Pianist",
  },
];

export default async function DashboardPage() {
  const user = await getCurrentUser();

  return (
    <>
      <ExpandableCardDemo />
    </>
  );
}
