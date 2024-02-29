import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { startLogOut } from '../../store/endpoints';


export const NavBar = () => {

    const dispatch = useDispatch();
    const onLogOut = () => {
        dispatch(startLogOut());
    }
    const  { username } = useSelector( state => state.auth );

    return (
        <AppBar position='fixed' >
            <Toolbar>
                <IconButton color='inherit' edge='start' sx={{ mr: 2, display: { sm: 'none' } }}>
                    <MenuOutlined/>
                </IconButton>
                {/* <Toolbar><img src={`${'../logoTaskHand.jpg'}`}  width={60} style={{ margin: '0 2px' }}/></Toolbar> */}
                <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                    
                    <Typography variant='h6' noWrap component='div'>Welcome {username}</Typography>
                    <IconButton 
                    color='inherit'
                    onClick={ onLogOut }>
                        <LogoutOutlined/>
                    </IconButton>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
