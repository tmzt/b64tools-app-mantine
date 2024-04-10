
import React from 'react';

import { AppShell, Burger, Group, NavLink, Skeleton, AppShellNavbar, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantinex/mantine-logo';
import { Notifications } from '@mantine/notifications';

import { BrowserRouter, Outlet, Route, Router, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import { Root } from './pages/Root';
import { Placeholders } from './pages/Placeholders';
import { SvgToDataUri } from './pages/SvgToDataUri';
import { ImageToDataUri } from './pages/ImageToDataUri';
import { Base64IOLogo } from './components/Logo';
import { ContentSwitch } from './content/Switch';


const logoStyle = {
  height: '70px',
  width: '225px',
  paddingBottom: '5px',
};

export const Layout = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      footer={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      aside={{ width: 300, breakpoint: 'md', collapsed: { desktop: false, mobile: true } }}
      padding="md"
    >
      <Notifications />
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          {/* <MantineLogo size={30} /> */}
          <Base64IOLogo style={logoStyle} />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <NavLink href="/placeholders" label="Placeholders" />
        <NavLink href="/svg-to-data-uri" label="SVG to Data URI" />
        <NavLink href="/image-to-data-uri" label="Image to Data URI" />
        <NavLink href="/analyze-data-uri" label="Analyze Data URI" />

        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={36} mt="sm" animate={false} />
          ))}
      </AppShell.Navbar>
      <AppShell.Main>
        {/* Aside is hidden on on md breakpoint and cannot be opened when it is collapsed */}
        <Outlet />
        {/* TODO: Show aside content below page on md or smaller. */}
      </AppShell.Main>
      <AppShell.Aside p="md">
            <ContentSwitch />
      </AppShell.Aside>
      <AppShell.Footer p="md">
        <Text fz="md" lh="md">&copy; 2024 Timothy Meade.</Text>
      </AppShell.Footer>
    </AppShell>
  );
};

// const AppRouter = () => (
//   <BrowserRouter>
//     <Routes>
//       <Route element={<Layout />}>
//         <Route element={<Root />} />
//         <Route path="/placeholders" element={<Placeholders />} />
//         {/* <Route path="/svg-to-data-uri" element={<SvgToDataUri />} />
//         <Route path="/png-to-data-uri" element={<PngToDataUri />} />
//         <Route path="/analyze-data-uri" element={<AnalyzeDataUri />} /> */}
//       </Route>
//     </Routes>
//   </BrowserRouter>
// );

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Root />} /> */}
        <Route path="/" element={<Layout />}>
          <Route element={<Root />} />
          <Route path="/placeholders" element={<Placeholders />} />
          <Route path="/svg-to-data-uri" element={<SvgToDataUri />} />
          <Route path="/image-to-data-uri" element={<ImageToDataUri />} />
          {/* <Route path="/analyze-data-uri" element={<AnalyzeDataUri />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
