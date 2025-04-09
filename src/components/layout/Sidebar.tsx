
import React from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  Calculator, 
  Flasks, 
  Globe, 
  BookMarked, 
  Binary, 
  Users, 
  Building2, 
  Briefcase, 
  HeartPulse
} from "lucide-react";

type Department = {
  name: string;
  icon: React.ReactNode;
  href: string;
  active?: boolean;
};

const departments: Department[] = [
  {
    name: "Computer Science",
    icon: <Binary className="h-5 w-5" />,
    href: "/department/computer-science",
  },
  {
    name: "Mathematics",
    icon: <Calculator className="h-5 w-5" />,
    href: "/department/mathematics",
  },
  {
    name: "Biology",
    icon: <HeartPulse className="h-5 w-5" />,
    href: "/department/biology",
  },
  {
    name: "Chemistry",
    icon: <Flasks className="h-5 w-5" />,
    href: "/department/chemistry",
  },
  {
    name: "Literature",
    icon: <BookMarked className="h-5 w-5" />,
    href: "/department/literature",
  },
  {
    name: "Geography",
    icon: <Globe className="h-5 w-5" />,
    href: "/department/geography",
  },
  {
    name: "Sociology",
    icon: <Users className="h-5 w-5" />,
    href: "/department/sociology",
  },
  {
    name: "Architecture",
    icon: <Building2 className="h-5 w-5" />,
    href: "/department/architecture",
  },
  {
    name: "Business",
    icon: <Briefcase className="h-5 w-5" />,
    href: "/department/business",
  },
];

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  return (
    <aside className={cn("pb-12 w-full lg:w-[240px]", className)}>
      <div className="py-4 space-y-4">
        <div className="px-4">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">Departments</h2>
          <div className="space-y-1">
            {departments.map((dept) => (
              <Link
                key={dept.name}
                to={dept.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-academic-light-gray group",
                  dept.active ? "bg-academic-light-gray text-academic-navy" : "text-academic-gray"
                )}
              >
                {dept.icon}
                <span className="group-hover:text-academic-navy">{dept.name}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="px-4">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">Helpful Links</h2>
          <div className="space-y-1">
            <Link
              to="/academic-resources"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-academic-gray hover:bg-academic-light-gray hover:text-academic-navy"
            >
              <BookOpen className="h-5 w-5" />
              <span>Academic Resources</span>
            </Link>
            <Link
              to="/guidelines"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-academic-gray hover:bg-academic-light-gray hover:text-academic-navy"
            >
              <BookMarked className="h-5 w-5" />
              <span>Community Guidelines</span>
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
