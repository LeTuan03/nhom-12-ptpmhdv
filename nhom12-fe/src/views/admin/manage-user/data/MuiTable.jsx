import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

export default function MuiTable({ data = [], handleEdit = () => { }, handleDelete = () => { } }) {
    return (
        <TableContainer component={Paper} sx={{ scale: "0.92" }}>
            <Table aria-label="simple table" size='small'>
                <TableHead>
                    <TableRow sx={{ background: "#17c1e8" }}>
                        <TableCell sx={{ color: "#fff", width: "100px" }}>Thao tác</TableCell>
                        <TableCell sx={{ color: "#fff", width: "30px" }}>STT</TableCell>
                        <TableCell sx={{ color: "#fff" }} align="center">Tên đang nhập</TableCell>
                        <TableCell sx={{ color: "#fff" }} align="center">Họ và tên</TableCell>
                        <TableCell sx={{ color: "#fff" }} align="center">Email</TableCell>
                        <TableCell sx={{ color: "#fff" }} align="center">Vai trò</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>
                                <IconButton aria-label="delete" size="small" color='info' onClick={() => handleEdit(row)}>
                                    <EditIcon fontSize="inherit" />
                                </IconButton>
                                <IconButton aria-label="delete" size="small" color='error' onClick={() => handleDelete(row)}>
                                    <DeleteIcon fontSize="inherit" />
                                </IconButton>
                            </TableCell>
                            <TableCell align="center"><b>{index + 1}</b></TableCell>
                            <TableCell align="right">{row.fat}</TableCell>
                            <TableCell align="right">{row.carbs}</TableCell>
                            <TableCell align="right">{row.protein}</TableCell>
                            <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
