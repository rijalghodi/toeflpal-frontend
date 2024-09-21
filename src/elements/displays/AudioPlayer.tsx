import {
  ActionIcon,
  Group,
  Paper,
  PaperProps,
  Popover,
  Slider,
  Text,
} from '@mantine/core';
import {
  IconHeadphonesOff,
  IconPlayerPause,
  IconPlayerPlay,
  IconVolume,
} from '@tabler/icons-react';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

type AudioPlayerProps = {
  src: string;
  withTimer?: boolean;
  autoPlay?: boolean;
} & PaperProps;

export interface AudioPlayerRef {
  play: () => void;
  pause: () => void;
}

export const AudioPlayer = forwardRef<AudioPlayerRef, AudioPlayerProps>(
  ({ src, withTimer = false, autoPlay = false, ...paperProps }, ref) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);

    useImperativeHandle(ref, () => ({
      play: () => audioRef.current?.play(),
      pause: () => audioRef.current?.pause(),
    }));

    useEffect(() => {
      if (audioRef.current) {
        audioRef.current.volume = volume;
      }
    }, [volume]);

    const togglePlayPause = () => {
      if (isPlaying) {
        audioRef.current?.pause();
      } else {
        audioRef.current?.play();
      }
      setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
        setDuration(audioRef.current.duration);
      }
    };

    return (
      <Paper {...paperProps}>
        <Group wrap="nowrap" gap="xs">
          <audio
            ref={audioRef}
            src={src}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleTimeUpdate}
            style={{ display: 'none' }}
            preload="metadata"
            autoPlay={autoPlay}
          />
          <ActionIcon
            onClick={togglePlayPause}
            variant={isPlaying ? 'light' : 'subtle'}
            color="dark"
            disabled={!src}
          >
            {!src ? (
              <IconHeadphonesOff size={16} />
            ) : isPlaying ? (
              <IconPlayerPause size={16} />
            ) : (
              <IconPlayerPlay size={16} />
            )}
          </ActionIcon>
          {withTimer && (
            <Group gap={4} w={74} justify="center" wrap="nowrap">
              <Text fz="xs">
                {Math.floor(currentTime / 60)}:
                {('0' + Math.floor(currentTime % 60)).slice(-2)}
              </Text>

              <Text fz="xs">/</Text>
              <Text fz="xs">
                {Math.floor(duration / 60)}:
                {('0' + Math.floor(duration % 60)).slice(-2)}
              </Text>
            </Group>
          )}
          <Slider
            disabled={!src}
            flex={1}
            color="dark"
            size="sm"
            value={currentTime}
            min={0}
            max={duration}
            label={null}
            onChange={(value) => {
              if (audioRef.current) {
                audioRef.current.currentTime = value;
                setCurrentTime(value);
              }
            }}
          />

          <Popover shadow="xs" position="bottom-end" offset={2}>
            <Popover.Target>
              <ActionIcon variant="subtle" color="dark">
                <IconVolume size={16} />
              </ActionIcon>
            </Popover.Target>
            <Popover.Dropdown>
              <Slider
                size="sm"
                miw={100}
                value={volume * 100}
                min={0}
                max={100}
                onChange={(value) => setVolume(value / 100)}
                color="dark"
                label={null}
              />
            </Popover.Dropdown>
          </Popover>
        </Group>
      </Paper>
    );
  },
);
