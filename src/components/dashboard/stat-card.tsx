import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  subtitle?: string;
  gradient: string;
  iconBg: string;
  delay?: number;
  className?: string;
}

export function StatCard({
  icon: Icon,
  title,
  value,
  subtitle,
  gradient,
  iconBg,
  delay = 0,
  className,
}: StatCardProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden border-0 text-white shadow-xl transform transition-all duration-700 hover:scale-105",
        gradient,
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardContent className="p-6">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className={cn("p-3 rounded-xl transform transition-transform duration-300 hover:rotate-12", iconBg)}>
              <Icon className="h-6 w-6" />
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold tracking-tight">{value}</div>
              <div className="text-sm opacity-90 font-medium">{title}</div>
            </div>
          </div>
          {subtitle && (
            <div className="text-sm opacity-80 flex items-center">
              <span>{subtitle}</span>
            </div>
          )}
        </div>
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-white opacity-10"></div>
        <div className="absolute bottom-0 left-0 -mb-6 -ml-6 h-32 w-32 rounded-full bg-white opacity-5"></div>
      </CardContent>
    </Card>
  );
}
