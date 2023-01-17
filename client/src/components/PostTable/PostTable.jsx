import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import { Modal, Button, Group } from '@mantine/core';

// function Demo() {
//   const [opened, setOpened] = useState(false);

//   return (
//     <>
//       <Modal
//         opened={opened}
//         onClose={() => setOpened(false)}
//         title="Introduce yourself!"
//       >
//         {/* Modal content */}
//       </Modal>
//     </>)
// }

const columns = [
   { id: 'userId', label: 'Name', minWidth: 170 },
   { id: 'userId', label: 'User Name', minWidth: 100 },
  {
    id: 'imageUrl',
    label: 'Image',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  // {
  //   id: 'userId',
  //   label: 'Size\u00a0(km\u00b2)',
  //   minWidth: 170,
  //   align: 'right',
  //   format: (value) => value.toLocaleString('en-US'),
  // },
  // {
  //   id: 'density',
  //   label: 'Density',
  //   minWidth: 170,
  //   align: 'right',
  //   format: (value) => value.toFixed(2),
  // },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];

export default function ColumGroupingTable({ data }) {


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [opened, setOpened] = useState(false);
  const [photo, setPhoto] = useState(null);




  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  
  return (
     
    <Paper sx={{ width: '100%' }}>
        <Modal
  opened={opened}
  onClose={() => setOpened(false)}

  >
    <img style={{width:"100%"}} src={photo} alt="" />

</Modal>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={2}>
                <span style={{"textDecoration":"underline","fontSize":"20px"}}>   Post Table</span>
             
              </TableCell>
           
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      if (column.id === 'imageUrl') {
                        return (
                        <TableCell key={column.id} align={column.align}>
                        
                          {/* {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                             */}
                            <img style={{ width: "50px" }} src={value} alt="" onClick={() => {
                       
                              setPhoto(value);
                              setOpened(true)
                            }} />
                          
                          {/* {value?value:value.block?<button>block</button>:<button>unblock</button>} */}
                        </TableCell>
                      );
                      }
                      else {
                              return (
                        <TableCell key={column.id} align={column.align}>
                       
                          {/* {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                             */}
                      
                          {column.label==='User Name'?value?.userName:value?.firstName}
                        </TableCell>
                      );
                      }
                
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
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
