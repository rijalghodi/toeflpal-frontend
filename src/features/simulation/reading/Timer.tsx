import { Group, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';

type Props = {
  duration: number; // in milliseconds, e.g., 600000 for 10 minutes or 3600000 for 1 hour
};

export function Timer({ duration }: Props) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1000) {
          // Stop the interval when less than 1 second remains
          clearInterval(interval);
          return 0;
        }
        return prev - 1000; // Decrement by 1000 milliseconds (1 second)
      });
    }, 1000);

    return () => clearInterval(interval); // Clear the interval on component unmount
  }, [timeLeft]);

  const formatTime = (milliseconds: number) => {
    const hrs = Math.floor(milliseconds / 3600000);
    const mins = Math.floor((milliseconds % 3600000) / 60000);
    const secs = Math.floor((milliseconds % 60000) / 1000);
    return (
      <Group gap={4}>
        <Text fz="xs" fw={600} w={16} ta="center">
          {String(hrs).padStart(2, '0')}
        </Text>
        <Text fz="xs" fw={600}>
          :
        </Text>
        <Text fz="xs" fw={600} w={16} ta="center">
          {String(mins).padStart(2, '0')}
        </Text>
        <Text fz="xs" fw={600}>
          :
        </Text>
        <Text fz="xs" fw={600} w={16} ta="center">
          {String(secs).padStart(2, '0')}
        </Text>
      </Group>
    );
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <Text fz="xs" fw={600}>
      {formatTime(timeLeft)}
    </Text>
  );
}
