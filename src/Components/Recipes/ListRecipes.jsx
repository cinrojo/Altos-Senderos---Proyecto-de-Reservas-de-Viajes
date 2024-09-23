import { useState, useEffect, Fragment } from "react";
import { DataTable } from 'primereact/datatable'
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { ProgressSpinner } from 'primereact/progressspinner';

const ListUsers = () => {

    const [dataUsers, setDataUsers] = useState([]),
        [loadingUsers, setLoadingUsers] = useState(true),
        [dataOneUser, setDataOneUser] = useState({}),
        [openDialogOneUser, setOpenDialogOneUser] = useState(false);

    const getAllUsers = async () => {
        const response = await fetch(`http://localhost:4000/api/users`, {
            method: 'GET',
            cache: 'no-cache',
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        });

        try {
            if (!response.ok) {
                console.log(response.status)
            }
            const results = await response.json();
            setDataUsers(results)
        } catch (e) {
            console.log(e)
        } finally {
            setLoadingUsers(false)
        }
    }

    useEffect(() => {
        getAllUsers()
    }, [])

    const findOneUser = async (id_user) => {
        const response = await fetch(`http://localhost:4000/api/users/${id_user}`, {
            method: 'GET',
            cache: 'no-cache',
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        });

        try {
            if (!response.ok) {
                console.log(response.status)
            }
            const data = await response.json();
            setDataOneUser(data)
            setOpenDialogOneUser(true)
        } catch (e) {
            console.log(e)
        } finally {
            setLoadingUsers(false)
        }
    }

    const BodyTemplate = (rowData) => {
        return (
            <Button label="Detalles" onClick={() => (findOneUser(rowData.id))} icon='pi pi-eye' />
        )
    }

    return (
        <Fragment>
            {loadingUsers ?
                <ProgressSpinner /> :
                <DataTable value={dataUsers} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="name" header="Nombre"></Column>
                    <Column field="email" header="E-mail"></Column>
                    <Column field="role" header="Rol"></Column>
                    <Column field='acciones' body={BodyTemplate}></Column>
                </DataTable>
            }
            <Dialog header="Detalles de un usuario" visible={openDialogOneUser} style={{ width: '50vw' }} onHide={() => setOpenDialogOneUser(false)}>
                <p className="m-0">
                    Nombre: {dataOneUser.name}
                </p>
                <p className="m-0">
                    Email: {dataOneUser.email}
                </p>
                <p className="m-0">
                    Rol: {dataOneUser.role}
                </p>
            </Dialog>

        </Fragment >
    )
}

export default ListUsers