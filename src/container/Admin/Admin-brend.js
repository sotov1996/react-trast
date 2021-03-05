import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    margin: "0 auto",
    marginBottom: 30
  },
  container: {
    maxHeight: "100%",
  },
  cell: {
    wordWrap: "break-word"
  },
});

function Alert(props) {
  return <MuiAlert elevation={2} variant="filled" {...props} />;
}

export default function AdminBrend() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const [saveLogo, onSaveLogo] = useState();
  const [newUser, setNewUser] = useState(
    {
      brend: "",
      description: ""
    }
  );
  const [openForm, setOpenForm] = React.useState(false);
  const [openFormAdd, setOpenFormAdd] = React.useState(false);
  const [editUser, setEditUser] = React.useState({});
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState({severity:"",text:""});

  const columns = [
    { id: 'brend', label: 'Бренд', minWidth: 100 },
    { id: 'description', label: 'Описание', minWidth: 450 },
    { id: 'logo', label: 'Картинка', minWidth: 100 },
    { id: 'edit', label: '', minWidth: 100 },
    { id: 'delete', label: '', minWidth: 100 },
  ];

  useEffect(() => {
    fetch('/api/adminBrend')
    .then(result => result.json())
    .then(rowData => {
      setRows(rowData[0])
    })
}, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("logo", saveLogo)
    formData.append('brend', newUser.brend);
    formData.append('description', newUser.description);

    await axios.post("/api/add-brend", formData)
        .then(res => {
          if(res.data !== "error"){
            let productData = []
            productData.push(res.data)
            setRows([...rows,...productData])
            productData = []
            setOpenFormAdd(!openFormAdd)
            setOpenSnackbar(!openSnackbar);
            setSnackbar({severity: "success", text: "Добавлено"})
            onSaveLogo(null)
            setNewUser({brend: "", description: "", price: ""})
          }else {
            setSnackbar({severity: "error", text: "Ошибка: выберите Файл"})
            setOpenSnackbar(!openSnackbar)
          }
        })
        .catch(err => {
          setSnackbar({severity: "error", text: "Ошибка"})
          setOpenSnackbar(!openSnackbar)
           console.log(err);
        });
  }

  const handleChange = (e) => {
    console.log(e.target)
    setNewUser({...newUser, [e.target.name]: e.target.value});
  }
  
  const handleUpdate = (e) => {
    setEditUser({...editUser, [e.target.name]: e.target.value});
  }

  const handleImage = (e) => {
    onSaveLogo(e.target.files[0])
  }

  const handleOpen = (column = {}) => {
    setOpenForm(!openForm)
    setEditUser(column)
  }

  const updateUser = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("logo", saveLogo)
    formData.append('brend', editUser.brend);
    formData.append('description', editUser.description);
    formData.append('id', editUser._id);

    await axios.put("/api/update-brend", formData)
        .then(res => {
          if(res.data !== "error"){
            const newRows = rows.map(row => {
              if(editUser._id == row._id){
                return {...editUser,...res.data}
              }else return row
            })
            setRows(newRows)
            setOpenForm(!openForm)
            setOpenSnackbar(!openSnackbar)
            setSnackbar({severity: "success", text: "Изменено"})
          }else {
            setSnackbar({severity: "error", text: "Ошибка: выберите Файл"})
            setOpenSnackbar(!openSnackbar)
          }
        })
        .catch(err => {
          setSnackbar({severity: "error", text: "Ошибка"})
          setOpenSnackbar(!openSnackbar)
           console.log(err);
        });
  }

  const hendleAddBrend = () => {
    setOpenFormAdd(!openFormAdd)
  }

  const setEditForm = () => { 
    return(
      <Dialog className="dial" open={openForm} onClose={() => setOpenForm(!openForm)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Изменить</DialogTitle>
          <DialogContent>
          <form style={{ marginBottom:20}}>
            <input 
                type="file" 
                accept=".png, .jpg, .jpeg"
                name="logo"
                onChange={handleImage}
                style={{marginBottom:20}}
            />
            {columns.map(column => {
              if(column.id != 'edit' && column.id != 'logo' && column.id != 'delete'){
                if(column.id == "price"){
                  return (
                    <TextField
                      id="outlined-number"
                      label={column.label}
                      name={column.id}
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      value={editUser[column.id]}
                      onChange={handleUpdate}
                      style={{marginBottom:20}}
                      variant="outlined"
                    />
                  )
                }
                return (
                  <TextField
                    key={column.id}
                    id="outlined-multiline-static"
                    label={column.label}
                    name={column.id}
                    multiline
                    fullWidth
                    variant="outlined"
                    value={editUser[column.id]}
                    onChange={handleUpdate}
                    style={{marginBottom:20}}
                  />
                )
              }
            })}
            <Button className="forma_button" variant="contained" color="primary" onClick={(e) => updateUser(e)}>Сохранить</Button>
            <Button className="forma_button" variant="contained" color="primary" style={{marginLeft:10}} onClick={() => setOpenForm(!openForm)}>Отменить</Button>
          </form>
          </DialogContent>
      </Dialog>
    )
  }  

  const setAddForm = () => {
    return(
      <Dialog className="dial" open={openFormAdd} onClose={hendleAddBrend} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Добавить категорию</DialogTitle>
          <DialogContent>
            <form name="Add brend" style={{marginBottom:20}} onSubmit={handleSubmit}>
              <input 
                  type="file" 
                  accept=".png, .jpg, .jpeg"
                  name="logo"
                  onChange={handleImage}
                  style={{marginBottom:20}}
              />
              {columns.map(column => {
                  if(column.id != 'edit' && column.id != 'logo' && column.id != 'delete'){
                    if(column.id == "price"){
                      return (
                        <TextField
                          id="outlined-number"
                          label={column.label}
                          name={column.id}
                          type="number"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          fullWidth
                          style={{marginBottom:20}}
                          variant="outlined"
                          value={newUser[column.id]}
                          onChange={handleChange}
                        />
                      )
                    }
                    return (
                      <TextField
                        key={column.id}
                        id="outlined-multiline-static"
                        label={column.label}
                        name={column.id}
                        multiline
                        fullWidth
                        variant="outlined"
                        value={newUser[column.id]}
                        onChange={handleChange}
                        style={{marginBottom:20}}
                      />
                    )
                  }
              })}
              <Button 
                variant="contained" 
                color="primary"
                type="submit">Добавить</Button>
            </form>
          </DialogContent>
      </Dialog>
    )
  }

  const closeSnacbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const deleteBrend = async (id) => {

    await axios.get(`api/delete-brend/${id}`)
    .then(res => {
      if(res.data !== "error"){
        setRows(res.data)
        setOpenSnackbar(!openSnackbar);
        setSnackbar({severity: "success", text: "Удалено"})
      }else {
        setSnackbar({severity: "error", text: "Ошибка"})
        setOpenSnackbar(!openSnackbar)
      }
    })
    .catch(err => {
      setSnackbar({severity: "error", text: "Ошибка"})
      setOpenSnackbar(!openSnackbar)
       console.log(err);
    });
  }

  const getSnackbar = (severity, text) => {
    return (
      <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={closeSnacbar}>
        <Alert className={classes.alert} onClose={closeSnacbar} severity={severity}>
          {text}
        </Alert>
      </Snackbar>
    )
  }

  return (
    <div style={{marginTop: 40}}>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow key={row._id} hover role="checkbox" tabIndex={-1}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell className={classes.cell} key={`${column.id}${row._id}`} align={column.align}>
                        {column.id == "edit" ? <Button onClick={() => handleOpen(row)} variant="contained" color="primary">Изменить</Button>:
                        column.id == "delete" ?<Button onClick={() => deleteBrend(row._id)} variant="contained" color="secondary">Удалить</Button>:value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <Button variant="contained" color="primary" onClick={hendleAddBrend}>Добавить категорию</Button>
      {openFormAdd ? setAddForm() : null}
      {openForm ? setEditForm() : null}
      {getSnackbar(snackbar.severity, snackbar.text)}
    </div>
  );
}