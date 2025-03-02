import { AppBar, Stack, Toolbar, Typography } from "@mui/material";
import { ThemeToggle } from "../../theme/ThemeToggle";
import { SearchField } from "../inputs/SearchField";

interface NavbarProps {
  title: string;
}

export const Navbar = (props: NavbarProps) => {
  const { title } = props;
  return (
    <AppBar
      position='static'
      color='default'
      sx={{
        mb: 2,
        mt: {
          xs: 0,
          sm: 2,
        },
        borderRadius: {
          sm: 0,
          md: 3,
        },
      }}
    >
      <Toolbar>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          flex={1}
          spacing={2}
        >
          <Typography
            variant='h6'
            component='div'
            sx={{ userSelect: "none", cursor: "default" }}
          >
            {title}
          </Typography>
          <SearchField
            sx={{
              maxWidth: "35rem",
              flex: "1",
            }}
          />
          <ThemeToggle />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
