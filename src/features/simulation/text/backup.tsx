'use client';

import {
  ActionIcon,
  AppShell,
  Box,
  Button,
  CheckIcon,
  Divider,
  Drawer,
  Group,
  Paper,
  Radio,
  ScrollArea,
  SimpleGrid,
  Stack,
  Tabs,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import {
  IconArrowLeft,
  IconArrowRight,
  IconFile,
  IconLogout2,
  IconSearch,
} from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import DOMPurify from 'dompurify';
import { useRouter } from 'next/navigation';
import React from 'react';

import { useDrawer } from '@/contexts';
import { LoadingState, Logo, LogoAndText } from '@/elements';
import { formGetFull, formGetFullKey } from '@/services/form/form-get-full';

import { QuestionNavigation } from '../common/QuestionNavigation';
import { useSimulNavigation } from '../common/useSimulNavigation';

// import { FormEditorMain } from './FormEditorMain';

type Props = {
  formId: string;
  name?: string;
  duration?: number;
};

export function TextSimulationShell({ formId, name, duration }: Props) {
  const router = useRouter();

  const handleQuit = () => {
    modals.openConfirmModal({
      title: 'Quit Confirmation',
      children: (
        <Text size="sm" c="dimmed">
          Are you sure you want to quit the test? You will lose all your current
          data for this section.
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        router.back();
      },
    });
  };

  const { data, isLoading } = useQuery({
    queryKey: formGetFullKey({ formId }),
    queryFn: () => formGetFull({ formId }),
  });

  const questions = data?.data.questions;
  const parts = data?.data.parts;
  const form = data?.data;

  const { goNext, goPrev, humanizeStep, jumpTo, currentStep } =
    useSimulNavigation({
      partLength: form?.partLength ?? 0,
      questionLengthPerPart: form?.questionLengthPerPart ?? [],
    });

  const { open: openDrawer } = useDrawer();
  const [
    questionNavOpened,
    { open: openQuestionNab, close: closeQuestionNav },
  ] = useDisclosure(false);

  const handleJumpTo = (step: string) => {
    jumpTo(step);
    closeQuestionNav();
  };

  if (isLoading) {
    return <LoadingState h="100vh" />;
  }
  return (
    <AppShell
      header={{ height: 80, offset: true }}
      withBorder={false}
      px={{ base: 'md', xs: 'lg', md: 'xl' }}
    >
      <AppShell.Header bg="#fff">
        <Stack gap={0} w="100%">
          <Group justify="space-between" w="100%" pl="md" pr="md" py={8}>
            <Group gap="md">
              <Box hiddenFrom="xs">
                <Logo size="xs" />
              </Box>
              <Box visibleFrom="xs">
                <LogoAndText size="sm" />
              </Box>
            </Group>
            <Group gap="xs">
              <ActionIcon
                color="dark"
                variant="default"
                size="lg"
                title="Quit"
                onClick={handleQuit}
              >
                <IconLogout2 size={16} />
              </ActionIcon>
              <ActionIcon
                color="dark"
                variant="default"
                size="lg"
                title="Review"
                onClick={openQuestionNab}
              >
                <IconSearch size={16} />
              </ActionIcon>

              <ActionIcon
                color="dark"
                variant="default"
                size="lg"
                title="Previous"
                onClick={goPrev}
              >
                <IconArrowLeft size={16} />
              </ActionIcon>
              <ActionIcon
                color="dark"
                variant="default"
                size="lg"
                title="Next"
                onClick={goNext}
              >
                <IconArrowRight size={16} />
              </ActionIcon>
            </Group>
          </Group>
          <Paper px="md" py={4} radius={0} bg="gray.1   ">
            <Group justify="space-between" w="100%">
              <Group>
                <Text fz="xs">Preview {name}</Text>
                <Divider orientation="vertical" />
                <Text fz="xs">{humanizeStep(currentStep)}</Text>
              </Group>
              <Text fz="xs">{duration}</Text>
            </Group>
          </Paper>
        </Stack>
      </AppShell.Header>

      <AppShell.Main>
        <form>
          <Tabs value={currentStep}>
            {/* Form Start */}
            <Tabs.Panel value="formstart">
              {form?.instruction ? (
                <Box
                  maw={700}
                  mx="auto"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(form?.instruction ?? ''),
                  }}
                />
              ) : (
                <Box h={300} maw={700} mx="auto">
                  No instruction provided. Click Next.
                </Box>
              )}
            </Tabs.Panel>
            {/* Form Start */}
            <Tabs.Panel value="formend">
              {form?.instruction ? (
                <Box
                  mx="auto"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(form?.closing ?? ''),
                  }}
                />
              ) : (
                <Box h={300} maw={700} mx="auto">
                  No instruction provided. Click Next.
                </Box>
              )}
            </Tabs.Panel>
            {/* Get all parts */}
            {parts?.map((part) => (
              <Tabs.Panel key={part.id} value={`part-p${part.order}`}>
                {part.instruction ? (
                  <Box
                    maw={700}
                    mx="auto"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(part.instruction ?? ''),
                    }}
                  />
                ) : (
                  <Text>No instruction provided for part {part.order}.</Text>
                )}
              </Tabs.Panel>
            ))}
            {questions?.map((question, idx) => (
              <Tabs.Panel
                key={idx}
                value={`question-p${question.part?.order}q${question.order}`}
              >
                <SimpleGrid
                  cols={{ base: 1, md: 2 }}
                  spacing={{ base: 'lg', sm: 'xl' }}
                >
                  <Box maw={800} w="100%" visibleFrom="md">
                    <ScrollArea.Autosize
                      mah="calc(100vh - 80px)"
                      offsetScrollbars
                      scrollbarSize={5}
                    >
                      <Box
                        px="md"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(
                            question.reference?.text ?? '',
                          ),
                        }}
                      />
                    </ScrollArea.Autosize>
                  </Box>
                  <Stack gap="md" maw={800} w="100%" py="lg">
                    <Group justify="flex-end" hiddenFrom="md">
                      <Button
                        variant="default"
                        size="xs"
                        leftSection={<IconFile size={16} />}
                        onClick={() => {
                          openDrawer({
                            title: 'Reference',
                            size: 'xl',
                            content: (
                              <Box
                                w="100%"
                                dangerouslySetInnerHTML={{
                                  __html: DOMPurify.sanitize(
                                    question.reference?.text ?? '',
                                  ),
                                }}
                              />
                            ),
                          });
                        }}
                      >
                        Reference
                      </Button>
                    </Group>
                    <Box
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(question.text ?? ''),
                      }}
                    />
                    <Radio.Group>
                      <Stack gap="md">
                        {question.options?.map((opt, idx) => (
                          <Radio
                            key={idx}
                            label={opt.text}
                            value={opt.id}
                            icon={CheckIcon}
                          />
                        ))}
                      </Stack>
                    </Radio.Group>
                  </Stack>
                </SimpleGrid>
              </Tabs.Panel>
            ))}
          </Tabs>
        </form>
        <Drawer
          opened={questionNavOpened}
          onClose={closeQuestionNav}
          size="100vw"
          position="right"
          title="Question Navigation"
          overlayProps={{
            opacity: 0.2,
          }}
          styles={{
            title: {
              fontWeight: 700,
              fontSize: 12,
              textTransform: 'uppercase',
            },
          }}
        >
          <QuestionNavigation
            formId={formId}
            onClickQuestion={(v) => handleJumpTo(v.step)}
          />
        </Drawer>
      </AppShell.Main>
    </AppShell>
  );
}
