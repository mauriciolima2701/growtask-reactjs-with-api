import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import Logo_ from '../../../../shared/components/logo/Logo_';
import LogoutIcon from '@mui/icons-material/Logout';
import { clearUserLogged } from '../../../../store/modules/userLogged/userLoggedSlice';
import { useAppDispatch } from '../../../../store/modules/hooks';
import { useNavigate } from 'react-router-dom';
import SearchTask from '../search/SearchTask';





const Header: React.FC = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const logoutUser = () => {
        dispatch(clearUserLogged())
        navigate('/')
    }



    return (
        <>

            <AppBar sx={{ backgroundColor: 'rgb(50, 50, 54);' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                        <Logo_ />
                    </Typography>
                    <SearchTask />
                    <Button onClick={() => {

                        logoutUser();

                    }} color="inherit" >
                        <LogoutIcon sx={{ color: '#08A1E4' }} />
                    </Button>
                </Toolbar>
            </AppBar>

        </>
    );
}

export default Header;