import { ReactNode } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { Container } from '@mui/material';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Container>
        <Header title={'Items in stock'}/>
          {children}
        <Footer/>
      </Container>
    </>
  );
}