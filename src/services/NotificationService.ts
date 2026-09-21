// src/services/NotificationService.ts
import type { INotificationService } from '../types'

export interface ToastEvent {
  id: string
  type: 'success' | 'error' | 'info'
  title: string
  message?: string
}

type Listener = (event: ToastEvent) => void

export class ObservableNotificationService implements INotificationService {
  private listeners = new Set<Listener>()

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener)
    return () => {
      this.listeners.delete(listener)
    }
  }

  private emit(type: ToastEvent['type'], title: string, message?: string): void {
    const event: ToastEvent = {
      id: crypto.randomUUID(),
      type,
      title,
      message,
    }
    this.listeners.forEach((listener) => listener(event))
  }

  success(title: string, message?: string): void {
    this.emit('success', title, message)
  }

  error(title: string, message?: string): void {
    this.emit('error', title, message)
  }

  info(title: string, message?: string): void {
    this.emit('info', title, message)
  }
}