import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface KPICardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: {
    value: string;
    positive?: boolean;
  };
  icon: ReactNode;
  iconBgColor: string;
  progress?: {
    value: number;
    label: string;
    target?: string;
  };
  chart?: ReactNode;
  className?: string;
}

export default function KPICard({
  title,
  value,
  unit,
  change,
  icon,
  iconBgColor,
  progress,
  chart,
  className
}: KPICardProps) {
  return (
    <Card className={cn("border-neutral-100", className)}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-neutral-500">{title}</h3>
          <div className={cn("text-primary rounded-full p-1.5", iconBgColor)}>
            {icon}
          </div>
        </div>
        
        <div className="flex items-end">
          <span className="text-2xl font-bold text-neutral-800">{value}</span>
          {unit && <span className="text-sm text-neutral-500 ml-2">{unit}</span>}
          
          {change && (
            <span 
              className={cn(
                "ml-auto text-xs font-medium px-2 py-0.5 rounded-full",
                change.positive 
                  ? "bg-success-500 bg-opacity-10 text-success-500" 
                  : "bg-error-500 bg-opacity-10 text-error-500"
              )}
            >
              {change.value}
            </span>
          )}
        </div>
        
        {progress && (
          <>
            <div className="mt-4 h-1 bg-neutral-100 rounded-full overflow-hidden">
              <div 
                className="h-1 bg-primary rounded-full" 
                style={{ width: `${progress.value}%` }}
              />
            </div>
            <div className="mt-1 flex justify-between text-xs text-neutral-500">
              <span>{progress.label}</span>
              {progress.target && <span>{progress.target}</span>}
            </div>
          </>
        )}
        
        {chart && (
          <div className="mt-3 chart-container h-[180px]">
            {chart}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
