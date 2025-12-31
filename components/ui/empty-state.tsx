"use client";

import { ReactNode } from "react";
import { 
  Inbox, 
  Search, 
  AlertCircle, 
  FileText, 
  Users, 
  FolderOpen,
  Image as ImageIcon,
  Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

/**
 * Generic empty state component
 */
export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 px-4 text-center", className)}>
      {icon && (
        <div className="mb-4 opacity-50">
          {icon}
        </div>
      )}

      <h3 className="text-lg font-semibold mb-2">{title}</h3>

      {description && (
        <p className="text-sm text-foreground-secondary max-w-md mb-6">
          {description}
        </p>
      )}

      {action && (
        <Button onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}

/**
 * No results found empty state
 */
export function NoResultsEmpty({
  query,
  onReset,
}: {
  query?: string;
  onReset?: () => void;
}) {
  return (
    <EmptyState
      icon={<Search className="w-16 h-16" aria-hidden="true" />}
      title="No results found"
      description={
        query
          ? `No results for "${query}". Try adjusting your search.`
          : "No results match your current filters. Try adjusting them."
      }
      action={
        onReset
          ? {
              label: "Clear filters",
              onClick: onReset,
            }
          : undefined
      }
    />
  );
}

/**
 * No projects empty state
 */
export function NoProjectsEmpty({ onAdd }: { onAdd?: () => void }) {
  return (
    <EmptyState
      icon={<FolderOpen className="w-16 h-16" aria-hidden="true" />}
      title="No projects yet"
      description="Start showcasing your work by adding your first project."
      action={
        onAdd
          ? {
              label: "Add project",
              onClick: onAdd,
            }
          : undefined
      }
    />
  );
}

/**
 * No items empty state
 */
export function NoItemsEmpty({
  itemName = "items",
  onAdd,
}: {
  itemName?: string;
  onAdd?: () => void;
}) {
  return (
    <EmptyState
      icon={<Inbox className="w-16 h-16" aria-hidden="true" />}
      title={`No ${itemName} yet`}
      description={`You haven't added any ${itemName} yet.`}
      action={
        onAdd
          ? {
              label: `Add ${itemName}`,
              onClick: onAdd,
            }
          : undefined
      }
    />
  );
}

/**
 * Error empty state
 */
export function ErrorEmpty({
  title = "Something went wrong",
  description = "We encountered an error. Please try again.",
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <EmptyState
      icon={<AlertCircle className="w-16 h-16 text-red-500" aria-hidden="true" />}
      title={title}
      description={description}
      action={
        onRetry
          ? {
              label: "Try again",
              onClick: onRetry,
            }
          : undefined
      }
    />
  );
}

/**
 * No content empty state
 */
export function NoContentEmpty({ type = "content" }: { type?: string }) {
  const icons = {
    content: <FileText className="w-16 h-16" aria-hidden="true" />,
    users: <Users className="w-16 h-16" aria-hidden="true" />,
    images: <ImageIcon className="w-16 h-16" aria-hidden="true" />,
    messages: <Mail className="w-16 h-16" aria-hidden="true" />,
  };

  return (
    <EmptyState
      icon={icons[type as keyof typeof icons] || icons.content}
      title={`No ${type} available`}
      description={`There is no ${type} to display at the moment.`}
    />
  );
}

/**
 * Coming soon empty state
 */
export function ComingSoonEmpty() {
  return (
    <EmptyState
      icon={<FolderOpen className="w-16 h-16" aria-hidden="true" />}
      title="Coming Soon"
      description="This feature is under development and will be available soon."
    />
  );
}

/**
 * Empty state with custom content
 */
export function CustomEmpty({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-center py-12 px-4", className)}>
      {children}
    </div>
  );
}



