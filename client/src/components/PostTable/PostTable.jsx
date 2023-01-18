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
import { deletePost } from '../../api/usersApi';
import { Modal, Button, Group } from '@mantine/core';


const columns = [
   { id: 'userId', label: 'Name', minWidth: 170 },
  { id: 'userId', label: 'User Name', minWidth: 100 },
  { id: 'desc', label: 'Description', minWidth: 170 },
  { id: 'reports', label: 'Report Count', minWidth: 100 },
  {
    id: 'imageUrl',
    label: 'Image',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  

];




export default function ColumGroupingTable({ data }) {

  console.log(data,"data insider")
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [opened, setOpened] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [id, setId] = useState(null);




  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

 
  const remove = async(id) => {
    await deletePost(id)
    setOpened(false)
  }
  return (
     
    <Paper sx={{ width: '100%' }}>
        <Modal
  opened={opened}
  onClose={() => setOpened(false)}

  >
        <img style={{ width: "100%" }} src={photo} alt="" />
        <span>Reports:</span>
         <ol>
        {data.map((value) => {
          return( value.reports.map((hi) => {
           
            return (
              
             <li>"{hi.comment}"</li>
  

            
          )
         
            }))
         
          
        })}
        </ol> 
        <Button variant="outline" onClick={() => {
          console.log(id)
          remove(id)
        
        }}>
            remove
          </Button>

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
                          {column.id==='imageUrl'?console.log("hi"):console.log("this is working")}
                          {/* {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                             */}
                            <img style={{ width: "50px" }} src={value} alt="" onClick={() => {
                              console.log("this is working")
                              setPhoto(value);
                              setId(row["_id"])
                              setOpened(true)
                            }} />
                          
                          {/* {value?value:value.block?<button>block</button>:<button>unblock</button>} */}
                        </TableCell>
                      );
                      }
                      else if(column.id==='userId') {
                              return (
                        <TableCell key={column.id} align={column.align}>
                    
                          {column.label==='User Name'?value?.userName:value?.firstName}
                        </TableCell>
                      );
                      }
                      else {
                        
                        return (
                        <TableCell key={column.id} align={column.align}>
                    
                        {column.label==='Report Count'?value?.length:value}
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
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
