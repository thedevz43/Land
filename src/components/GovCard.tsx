import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GovCardProps {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: ReactNode;
  className?: string;
  headerClassName?: string;
  action?: ReactNode;
}

const GovCard: React.FC<GovCardProps> = ({
  title,
  subtitle,
  icon,
  children,
  className,
  headerClassName,
  action,
}) => {
  return (
    <div className={cn('gov-card overflow-hidden', className)}>
      {(title || action) && (
        <div
          className={cn(
            'flex items-center justify-between px-5 py-4 border-b border-border bg-muted/30',
            headerClassName
          )}
        >
          <div className="flex items-center gap-3">
            {icon && (
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                {icon}
              </div>
            )}
            <div>
              {title && <h3 className="font-semibold text-foreground">{title}</h3>}
              {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
            </div>
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  className,
}) => {
  return (
    <div className={cn('gov-card p-5', className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
          {trend && (
            <p className={cn(
              'text-xs mt-2 font-medium',
              trend.isPositive ? 'text-accent' : 'text-destructive'
            )}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}% from last month
            </p>
          )}
        </div>
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default GovCard;
