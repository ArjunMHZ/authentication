// import React from 'react'

// import axios from "axios"
import { ChangeEvent, FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Input } from "@/@/components/ui/input"
import api from '../utils/auth'


interface Employee {
    firstName: string;
    lastName: string;
    profilePic: File | null;
}

export const AddEmployee = () => {

    const [employee, setEmployee] = useState<Employee>({
        firstName: '',
        lastName: '',
        profilePic: null,
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmployee({
            ...employee,
            [e.target.name] : e.target.value
        })
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        // if (e.target.files && e.target.files.length > 0) {
        //     setEmployee(prevState => ({
        //         ...prevState,
        //         profilePic: e.target.files[0],
        //     }));
        // }
        const file = e.target.files?.[0];
        if (file) {
            setEmployee(prevState => ({
                ...prevState,
                profilePic: file,
            }));
        }
    };

    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('firstName', employee.firstName);
        formData.append('lastName', employee.lastName);
        if (employee.profilePic) {
            formData.append('profilePic', employee.profilePic);
        }

        try {
            const response = await api.post('/auth/addEmployee', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate('/dashboard/employee')
            alert(response.data.message)
        } catch (error) {
            console.error(error);
        }
    };

  return (
    <div className="flex flex-1 object-contain justify-center items-center  ">
        <form className="p-4 bg-[#677D6A] shadow-md rounded-md">
            <h2 className="text-white text-center text-xl font-bold mb-4">Add Employee</h2>
            <div className="grid gap-1">
                <label htmlFor="firstName" className="text-white font-medium">Firstname:</label>
                <Input type="text" id="firstName" name="firstName" onChange={handleChange} placeholder="Enter your first name"/>

                <label htmlFor="lastName" className="text-white font-medium">Lastname:</label>
                <Input type="text" id="lastName" name="lastName" onChange={handleChange} placeholder="Enter your last name"/>
                <label htmlFor="inputGroupFile01" className="text-white font-medium">Profile Picture:</label>
                <Input type="file" id="inputGroupFile01" name="profilePic" onChange={handleFileChange} />
            </div>
 
           
                <button onClick={handleSubmit} className="w-full bg-[#D6BD98] p-2 mt-3 rounded text-gray-500 font-medium">Add Employee</button>
           
        </form>
    </div>
  )
}
