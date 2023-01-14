import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/modules/hooks";
import { addAllTask, addTaskAPI, getTaskUserAPI, selectAllTasks } from "../../store/modules/task/taskSlice";
import Task, { status } from "../../config/interfaces/tasks";
import Header from "./components/header/Header";
import Welcome from "./components/welcome/Welcome";
import { StyleInputHome } from "./components/input-home/styleInputHome";
import MyInput from "../../shared/components/input/MyInput";
import TitleIcon from '@mui/icons-material/Title';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Button } from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import Divider from '@mui/material/Divider';
import { ContainerHome } from "../../shared/components/container/Container";
import CardTask from "./components/cards-task/CardTask";
import { selectUserByEmail } from "../../store/modules/users/userSlice";
import Alerts from "../../shared/components/alerts/Alerts";
import ArchiveIcon from '@mui/icons-material/Archive';
import { StyleButtonArchived } from "./components/archived/styleButtonArchived";
import ModalArchive from "./components/archived/ModalArchive";




const Home: React.FC = () => {

    const dispatch = useAppDispatch();

    //info user logged
    const userLogged = useAppSelector((state) => state.userLogged);

    const loggedUser = useAppSelector((state) => selectUserByEmail(state, userLogged));
    const navigate = useNavigate();

    useEffect(() => {
        const navigateLogin = () => {
            navigate('/')
        }
        if (!userLogged) {
            navigateLogin();
        }

    }, [userLogged, navigate])

    // -------------------------

    const allTasks = useAppSelector(selectAllTasks)


    // useEffect(() => {

    //     dispatch(getTaskUserAPI({ email: userLogged }))

    // }, [dispatch, userLogged, loggedUser?.task])

    useEffect(() => {
        if (loggedUser?.task) {

            dispatch(addAllTask(loggedUser.task))
        }

    }, [dispatch, loggedUser?.task])


    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')


    const clearInputs = () => {
        setTitle('');
        setDescription('');
    }


    const handleAddTask = () => {

        if (!title || !description) {

            handleOpen();
            setTypeAlert('warning')
            setMessage('Favor preencher os campos Titulo e Descrição')
            return
        }

        dispatch(addTaskAPI({
            email: userLogged,
            task: {
                title: title,
                description: description,
            }
        }))

        clearInputs();
    }

    // Alert
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [typeAlert, setTypeAlert] = useState<'success' | 'warning' | 'error'>('error')

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true)
    }

    // Task Archived

    const [openModalArchive, setOpenModalArchive] = useState(false)

    const handleCloseArchive = () => {

        setOpenModalArchive(false)
    };

    const handleTaskArchive = () => {

        setOpenModalArchive(true)
    }

    return (
        <>
            <Header />
            <Welcome userName={loggedUser?.name} />

            <Alerts typeAlert={typeAlert} message={message} closeAlert={handleClose} openAlert={open} />

            <StyleInputHome>
                <MyInput
                    myOnChange={setTitle}
                    label='Digite o titulo:'
                    id='inputTitle'
                    value={title}
                >
                    <TitleIcon sx={{ color: '#b9b5b5', mr: 1, my: 0.5 }} />
                </MyInput>
                <MyInput
                    myOnChange={setDescription}
                    label='Digite a descrição:'
                    id='inputDescription'
                    value={description}
                >
                    <AssignmentIcon sx={{ color: '#b9b5b5', mr: 1, my: 0.5 }} />
                </MyInput>

                <Button onClick={handleAddTask}> <AddBoxIcon sx={{ fontSize: 50, color: '#13DFDC' }} /> </Button>
            </StyleInputHome>

            <StyleButtonArchived>
                <Button size="small" onClick={handleTaskArchive} sx={{ color: 'white', backgroundColor: 'gray', textAlign: 'center', fontSize: 11 }} > <ArchiveIcon sx={{ marginRight: 0.5 }} /> Tarefas arquivadas </Button>
            </StyleButtonArchived>

            <Divider sx={{ mb: 3, mt: 1, border: 1, color: '#13DFDC', width: '100%' }} />

            <ContainerHome>

                {allTasks.filter((cardTask) => cardTask.status === "ativo").map((card) => {
                    return <CardTask
                        id={card.id}
                        status={card.status}
                        title={card.title}
                        description={card.description}
                        key={card.id}
                    />
                })}

            </ContainerHome>

            <ModalArchive openModal={openModalArchive} clickCancel={handleCloseArchive} closeModal={handleCloseArchive}
                children={
                    allTasks.filter((cardTask) => cardTask.status === 'arquivado')
                        .map(
                            (card: {
                                id: string;
                                status: status;
                                title: string;
                                description: string;

                            }) => (
                                <CardTask
                                    id={card.id}
                                    status={card.status}
                                    title={card.title}
                                    description={card.description}
                                    key={card.id}
                                />
                            ))}
            />

        </>
    )
}

export default Home;