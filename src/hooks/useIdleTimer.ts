// src/hooks/useIdleTimer.ts
import { useEffect, useRef } from 'react';
import { signOut } from '../services/authService';
import { toast } from 'react-toastify';

interface UseIdleTimerProps {
  timeout?: number; // timeout in minutes
  onTimeout?: () => void;
  onActivity?: () => void;
}

export const useIdleTimer = ({
  timeout = 30, // default 30 minutes
  onTimeout,
  onActivity,
}: UseIdleTimerProps = {}) => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  const resetTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      // Sign out the user
      await signOut();
      
      // Show timeout message
      toast.info('You have been logged out due to inactivity');
      
      // Call the onTimeout callback if provided
      if (onTimeout) {
        onTimeout();
      }
    }, timeout * 60 * 1000); // Convert minutes to milliseconds

    // Call the onActivity callback if provided
    if (onActivity) {
      onActivity();
    }
  };

  useEffect(() => {
    // Events that reset the timer
    const events = [
      'mousemove',
      'keydown',
      'mousedown',
      'touchstart',
      'scroll',
      'resize',
    ];

    // Add event listeners
    events.forEach(event => {
      window.addEventListener(event, resetTimer);
    });

    // Start the initial timer
    resetTimer();

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      events.forEach(event => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [timeout, onTimeout, onActivity]);

  return {
    resetTimer,
  };
};
