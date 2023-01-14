import React, { useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import StyleSearchTask from './styleSearchTask';
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from '../../../../store/modules/hooks';
import { addAllTask, getTaskUserAPI, selectAllTasks } from '../../../../store/modules/task/taskSlice';
import { selectUserByEmail } from '../../../../store/modules/users/userSlice';
import ModalFilter from './ModalFilter';
import CardTask from '../cards-task/CardTask';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.1),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.2),
    },
    marginRight: theme.spacing(1),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(3)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '22ch',
        },
    },
}));




const SearchTask: React.FC = () => {

    const userLogged = useAppSelector((state) => state.userLogged)
    const loggedUser = useAppSelector((state) => selectUserByEmail(state, userLogged));
    const dispatch = useAppDispatch()
    const allTasks = useAppSelector(selectAllTasks)



    // Check
    const [checkArchive, setArchive] = useState(false);
    const [checkActive, setActive] = useState(false);


    //Search
    let archived: string
    let actived: string

    const [search, setSearch] = useState('')

    const handleSearch = () => {

        if (!checkActive && !checkArchive && !search) {
            alert('Selecione pelo menos um modo de pesquisa!')
            return
        }

        if (checkActive && checkArchive) {
            alert('Filtro incorreto, retire uma das opções de status')
            return
        }

        if (checkArchive) {
            archived = 'arquivado'
            setOpenModalFilter(true)
            dispatch(getTaskUserAPI({ email: userLogged, title: search, status: archived }))
        }

        if (checkActive) {
            actived = 'ativo'
            setOpenModalFilter(true)
            dispatch(getTaskUserAPI({ email: userLogged, title: search, status: actived }))
        }

        if (search) {

            setOpenModalFilter(true)
            dispatch(getTaskUserAPI({ email: userLogged, title: search }))
        }

        if (search && checkActive) {
            actived = 'ativo'
            setOpenModalFilter(true)
            dispatch(getTaskUserAPI({ email: userLogged, title: search, status: actived }))
        }

        if (search && checkArchive) {
            archived = 'arquivado'
            setOpenModalFilter(true)
            dispatch(getTaskUserAPI({ email: userLogged, title: search, status: archived }))
        }

        setSearch('')
        setActive(false)
        setArchive(false)

    }

    // Modal Tasks filter


    const [openModalFilter, setOpenModalFilter] = useState(false)

    const handleCloseFilter = () => {

        setOpenModalFilter(false)
        dispatch(getTaskUserAPI({ email: userLogged }))

    };

    const handleTaskArchive = () => {

        setOpenModalFilter(true)
    }


    return (
        <>
            <StyleSearchTask>
                <div className='searchTask'>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon sx={{ color: '#08A1E4' }} />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Pesquise pelo título ... "
                            inputProps={{ 'aria-label': 'search' }}
                            value={search}
                            onChange={(ev) => setSearch(ev.target.value)}
                            sx={{ height: '30px', fontSize: 15 }}
                        />
                        <Button className='btnSearch' sx={{ fontWeight: '600', color: '#000', backgroundColor: '#13DFDC' }} onClick={handleSearch} >  OK </Button>
                    </Search>
                </div>

                <FormGroup aria-label="position" row>
                    <FormControlLabel
                        value="arquivado"
                        control={

                            <Checkbox
                                value={checkArchive}
                                checked={checkArchive}
                                onChange={(ev) => setArchive(ev.target.checked)}
                                inputProps={{ 'aria-label': 'controlled' }}
                                color='info'
                            />
                        }
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }}

                        label={<Typography variant="body2" color="#afb3b4">arquivado</Typography>}
                        labelPlacement="end"
                    />

                    <FormControlLabel
                        value="ativo"
                        control={

                            <Checkbox
                                value={checkActive}
                                checked={checkActive}
                                onChange={(ev) => setActive(ev.target.checked)}
                                inputProps={{ 'aria-label': 'controlled' }}
                                color='info'
                            />
                        }
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }}
                        label={<Typography variant="body2" color="#afb3b4">ativo</Typography>}
                        labelPlacement="end"
                    />
                </FormGroup>
            </StyleSearchTask>

            <ModalFilter openModal={openModalFilter} clickCancel={handleCloseFilter} closeModal={handleCloseFilter}
                children={allTasks.map((cardFilter) => {
                    return <CardTask
                        id={cardFilter.id}
                        status={cardFilter.status}
                        title={cardFilter.title}
                        description={cardFilter.description}
                        key={cardFilter.id}
                    />
                })

                }
            />
        </>
    )
}

export default SearchTask;

