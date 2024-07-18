// import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
// import axios from 'axios'
import api from '../utils/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/@/components/ui/table"

interface Employee {
  firstName: string;
  lastName: string;
  profilePic: string;
}

export const Employee = () => {

  const[employee, setEmployee]= useState<Employee[]>([]);

  useEffect(() => {
    api.get("auth/getAllEmployees")
    .then(res => {
        setEmployee(res.data)
    })
    .catch(err => console.log(err))

  }, [])
  return (
    <div className='m-3 relative'>

      <Link to='/dashboard/addEmployee' className=' right-0 cursor-pointer rounded px-2 py-2 bg-[#0F67B1] hover:bg-[#3FA2F6] text-white font-medium text-sm'><FontAwesomeIcon icon={faPlus} /> Add Employee</Link>
     
      
      <Table className='mt-6'>
        <TableCaption>A list of your recent employees.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">S.N</TableHead>
            <TableHead>Profile Picture</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead className="text-right">Last Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employee.map((e,index) => (
              <TableRow key={index}>
              <TableCell className="font-medium">{index+1}</TableCell>
              <TableCell>
                <div className='flex items-center'>
                  <img src={`http://localhost:5000/Images/`+e.profilePic} alt="" className=' w-8 h-8 rounded-full mr-2'/>
                </div>
              </TableCell>
              <TableCell>{e.firstName}</TableCell>
              <TableCell className="text-right">{e.lastName}</TableCell>
            </TableRow>
          ))
          }
        
        </TableBody>
      </Table>
    </div>
  )
}
