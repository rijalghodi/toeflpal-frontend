import {
  ActionIcon,
  Group,
  MantineSize,
  Paper,
  PaperProps,
  Popover,
  Slider,
  Text,
  useMantineTheme,
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
  src?: string;
  withTimer?: boolean;
  autoPlay?: boolean;
  size?: MantineSize;
  timerSeparated?: boolean;
} & Omit<PaperProps, 'size'>;

export interface AudioPlayerRef {
  play: () => void;
  pause: () => void;
}

export const AudioPlayer = forwardRef<AudioPlayerRef, AudioPlayerProps>(
  (
    {
      src,
      withTimer = false,
      autoPlay = false,
      size = 'sm',
      timerSeparated,
      ...paperProps
    },
    ref,
  ) => {
    const { fontSizes } = useMantineTheme();

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(autoPlay);
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
      <Paper withBorder={false} shadow="none" {...paperProps}>
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
              <IconHeadphonesOff size={fontSizes[size]} />
            ) : isPlaying ? (
              <IconPlayerPause size={fontSizes[size]} />
            ) : (
              <IconPlayerPlay size={fontSizes[size]} />
            )}
          </ActionIcon>
          {withTimer && !timerSeparated && (
            <Group gap={4} justify="center" wrap="nowrap">
              <Text fz="xs" w={32} ta="center">
                {Math.floor(currentTime / 60)}:
                {('0' + Math.floor(currentTime % 60)).slice(-2)}
              </Text>

              <Text fz="xs">/</Text>
              <Text fz="xs" w={32}>
                {Math.floor(duration / 60)}:
                {('0' + Math.floor(duration % 60)).slice(-2)}
              </Text>
            </Group>
          )}
          {withTimer && timerSeparated && (
            <Text fz="xs" w={32} ta="center">
              {Math.floor(currentTime / 60)}:
              {('0' + Math.floor(currentTime % 60)).slice(-2)}
            </Text>
          )}
          <Slider
            disabled={!src}
            flex={1}
            color="dark"
            size={size}
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
          {withTimer && timerSeparated && (
            <Text fz="xs" w={32} ta="center">
              {Math.floor(duration / 60)}:
              {('0' + Math.floor(duration % 60)).slice(-2)}
            </Text>
          )}

          <Popover shadow="xs" position="top-end" offset={2}>
            <Popover.Target>
              <ActionIcon variant="subtle" color="dark">
                <IconVolume size={fontSizes[size]} />
              </ActionIcon>
            </Popover.Target>
            <Popover.Dropdown>
              <Slider
                size="sm"
                miw={32}
                value={volume * 100}
                min={0}
                max={100}
                onChange={(value) => setVolume(value / 100)}
                color="dark"
                label={null}
                w={80}
              />
            </Popover.Dropdown>
          </Popover>
        </Group>
      </Paper>
    );
  },
);
