"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { useSession } from "next-auth/react";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type ProjectType = {
  title: string;
  slug: string;
  color: string;
};

const projects: ProjectType[] = [
  {
    title: "FY-Btech-CSE",
    slug: "FY-CSE Semester - I",
    color: "bg-rose-500",
  },
  {
    title: "FY-Btech-CSE",
    slug: "FY-CSE Semester - II",
    color: "bg-blue-500",
  },
  {
    title: "SY-Btech-CSE",
    slug: "SY-CSE Semester - I",
    color: "bg-green-500",
  },
  {
    title: "SY-Btech-CSE",
    slug: "SY-CSE Semester - II",
    color: "bg-purple-500",
  },
  {
    title: "TY-Btech-CSE",
    slug: "TY-CSE Semester - I",
    color: "bg-amber-500",
  },
  {
    title: "TY-Btech-CSE",
    slug: "TY-CSE Semester - II",
    color: "bg-cyan-500",
  },
];

export default function ProjectSwitcher({
  large = false,
}: {
  large?: boolean;
}) {
  const { data: session, status } = useSession();
  const [openPopover, setOpenPopover] = useState(false);
  const [selectedProject, setSelectedProject] = useState(projects[0]); // Initialize with first project

  if (!projects || status === "loading") {
    return <ProjectSwitcherPlaceholder />;
  }

  return (
    <div>
      <Popover open={openPopover} onOpenChange={setOpenPopover}>
        <PopoverTrigger>
          <Button
            className="h-8 px-2"
            variant={openPopover ? "secondary" : "ghost"}
            onClick={() => setOpenPopover(!openPopover)}
          >
            <div className="flex items-center space-x-3 pr-2">
              <div
                className={cn(
                  "size-3 shrink-0 rounded-full",
                  selectedProject.color
                )}
              />
              <div className="flex items-center space-x-3">
                <span
                  className={cn(
                    "inline-block truncate text-sm font-medium xl:max-w-[120px]",
                    large ? "w-full" : "max-w-[80px]"
                  )}
                >
                  {selectedProject.slug}
                </span>
              </div>
            </div>
            <ChevronsUpDown
              className="size-4 text-muted-foreground"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="max-w-60 p-2">
          <ProjectList
            selected={selectedProject}
            projects={projects}
            setOpenPopover={setOpenPopover}
            setSelectedProject={setSelectedProject}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

function ProjectList({
  selected,
  projects,
  setOpenPopover,
  setSelectedProject,
}: {
  selected: ProjectType;
  projects: ProjectType[];
  setOpenPopover: (open: boolean) => void;
  setSelectedProject: (project: ProjectType) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      {projects.map((project) => (
        <Link
          key={project.slug}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "relative flex h-9 items-center gap-3 p-3 text-muted-foreground hover:text-foreground"
          )}
          href="#"
          onClick={() => {
            setSelectedProject(project);
            setOpenPopover(false);
          }}
        >
          <div className={cn("size-3 shrink-0 rounded-full", project.color)} />
          <span
            className={`flex-1 truncate text-sm ${
              selected.slug === project.slug
                ? "font-medium text-foreground"
                : "font-normal"
            }`}
          >
            {project.slug}
          </span>
          {selected.slug === project.slug && (
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-foreground">
              <Check size={18} aria-hidden="true" />
            </span>
          )}
        </Link>
      ))}
    </div>
  );
}

function ProjectSwitcherPlaceholder() {
  return (
    <div className="flex animate-pulse items-center space-x-1.5 rounded-lg px-1.5 py-2 sm:w-60">
      <div className="h-8 w-36 animate-pulse rounded-md bg-muted xl:w-[180px]" />
    </div>
  );
}
