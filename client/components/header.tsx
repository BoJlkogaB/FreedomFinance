import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Menu } from '@mui/icons-material';

interface HeaderProps {
  title: string;
}

export default function Header(props: HeaderProps) {
  const { title } = props;

  return (
    <>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Typography
          component="h1"
          variant="body2"
          align="left"
          width={60}
        >
          STOCK CENTER
        </Typography>
        <Typography
          component="h2"
          variant="h6"
          color="red"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
        <IconButton>
          <Menu/>
        </IconButton>
      </Toolbar>
    </>
  );
}