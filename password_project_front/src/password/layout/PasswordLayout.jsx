import { Box, Toolbar } from '@mui/material';
import { NavBar } from '../components/NavBar';

export const PasswordLayout = ({children}) => {
  return (
    <Box sx={{ display: 'flex'}}>
            <NavBar />
            <Box component='main' sx={{ flexGrow: 1, p: 0}}>
                
                <Toolbar />
                { children }
            </Box>
        </Box>
  )
}
