import { cn } from '../../lib/cn'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-lg bg-gradient-to-r from-surface via-surface-2 to-surface bg-[length:200%_100%]',
        className
      )}
    />
  )
}