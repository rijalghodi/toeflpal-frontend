import { Box, Container } from '@mantine/core';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <Box bg={{ base: undefined, xs: 'aliceblue' }}>
      <Container maw={1000} miw={300} mih="100vh" mx="auto">
        {children}
      </Container>
    </Box>
  );
}
