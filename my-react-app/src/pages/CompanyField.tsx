import { useState,  FormEvent } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import axios, { AxiosResponse } from 'axios';

interface CompanyData {
    companyname: string;
    australiabusinessnumber: string ;
    registeredbusinessname: string;
    country: string;
    physicaladdress: string;
    postaladdress: string;
}


const CompanyField = () => {
    const [error, setError] = useState<Partial<CompanyData>>({});
    const navigate= useNavigate()
    const [companyData, setCompanyData]=useState<CompanyData>({
        companyname:'',
        australiabusinessnumber: '',
        registeredbusinessname:'',
        country:'',
        physicaladdress:'',
        postaladdress:''
    })
  
    const handleSubmit = async (event: FormEvent<HTMLFormElement>)=>{
        event.preventDefault()

        const error: Partial<CompanyData> = {};

        if(!companyData.companyname.trim()){
            error.companyname = 'Please fill this field';
        }
        if(!companyData.australiabusinessnumber.trim()){
            error.australiabusinessnumber = 'Please fill this field';
        }
        if(!companyData.registeredbusinessname.trim()){
            error.registeredbusinessname = 'Please fill this field';
        }
        if(!companyData.country.trim()){
            error.country = 'Please fill this field';
        }
        if(!companyData.physicaladdress.trim()){
            error.physicaladdress = 'Please fill this field';
        }
        if(!companyData.postaladdress.trim()){
            error.postaladdress = 'Please fill this field';
        }
        if (Object.keys(error).length > 0){
          console.log('Validation Errors:', error);
          setError(error);
      } else {
          setError({});
      }

        try {
            // const formData=new FormData();
            // formData.append('companyname', companyData.companyname)
            // formData.append('australiabusinessnumber', companyData.australiabusinessnumber)
            // formData.append('registeredbusinessname', companyData.registeredbusinessname)
            // formData.append('country', companyData.country)
            // formData.append('physicaladdress', companyData.physicaladdress)
            // formData.append('postaladdress', companyData.postaladdress)
            // console.log('data',[...formData.entries()])
            // console.log(companyData)

            const response: AxiosResponse = await axios.post(`http://localhost:5000/api/company/companyregistration`, companyData)
            console.log(response.data)
            toast.success('Company has been registered')
            navigate('/dashboard')
            setCompanyData({
                companyname:'',
                australiabusinessnumber:'',
                registeredbusinessname:'',
                country:'',
                physicaladdress:'',
                postaladdress:''
            })
          } catch (err: any) {
            console.log('Error:', err);
            if (err?.response?.data?.error) {
                console.log('Error Message:', err.response.data.error);
                toast.error(err.response.data.error)
            } else {
                toast.error("Something went wrong");
            }
        }
    }


    const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setCompanyData({ ...companyData, [name]: event.target.value });
    }
  


  return (
    <>
    <div className='grid grid-cols-1 lg:grid-cols-2'>
        <div className="h-full flex flex-col p-10 md:p-16 lg:p-16 xl:p-20 2xl:p-40">
        <h1 className="text-3xl font-extrabold italic">RDX <span className='text-3xl text-[#FF6B00] font-extrabold not-italic'>FLOW</span></h1>
        <div className="w-full flex flex-col mt-4">
              <h3 className="text-2xl font-black mb-2">Let's setup your company</h3>
            </div>

            <form onSubmit={handleSubmit}>
            <div className="mt-4">
                <label
                  htmlFor="companyname"
                  className="block text-sm font-medium mb-1"
                >
                  Company Name
                </label>
                <input
                  id="companyname"
                  name='companyname'
                  value={companyData.companyname}
                  onChange={handleChange('companyname')}
                  type="text"
                  placeholder='Eg: Globex Corporation Ptv. Ltd.'
                  className="mt-1 p-2.5 w-full border rounded-md mb-4"
                />
                {error.companyname && <p className="text-red-500 mt-1">{error.companyname}</p>}
              </div>

              <div className="mt-4">
                <label
                  htmlFor="number"
                  className="block text-sm font-medium mb-1"
                >
                  Australian Business Number
                </label>
                <input
                  id="number"
                  name="australiabusinessnumber"
                  value={companyData.australiabusinessnumber}
                  onChange={handleChange('australiabusinessnumber')}
                  type="number"
                  placeholder='Eg: 123 456 678'
                  className="mt-1 p-2.5 w-full border rounded-md mb-4"
                />
                {error.australiabusinessnumber && <p className="text-red-500 mt-1">{error.australiabusinessnumber}</p>}
              </div>

              <div className="mt-4">
                <label
                  htmlFor="text"
                  className="block text-sm font-medium mb-1"
                >
                  Registered Business Name
                </label>
                <input
                  id="text"
                  name="registeredbusinessname"
                  value={companyData.registeredbusinessname}
                  onChange={handleChange('registeredbusinessname')}
                  type="text"
                  placeholder='Eg: Acme Business Solutions'
                  className="mt-1 p-2.5 w-full border rounded-md mb-4"
                />
                {error.registeredbusinessname && <p className="text-red-500 mt-1">{error.registeredbusinessname}</p>}
              </div>

              <div className="mt-4">
                <label
                  htmlFor="text"
                  className="block text-sm font-medium mb-1"
                >
                  Country
                </label>
                <input
                  id="text"
                  name="country"
                  value={companyData.country}
                  onChange={handleChange('country')}
                  type="text"
                  placeholder='Eg: Australia'
                  className="mt-1 p-2.5 w-full border rounded-md mb-4"
                />
                {error.country && <p className="text-red-500 mt-1">{error.country}</p>}
              </div>

              <div className="mt-4">
                <label
                  htmlFor="text"
                  className="block text-sm font-medium mb-1"
                >
                  Physical Address
                </label>
                <input
                  id="text"
                  name="physicaladdress"
                  value={companyData.physicaladdress}
                  onChange={handleChange('physicaladdress')}
                  type="text"
                  placeholder='Eg: 12 Revenue Street Bankstown NSW 2200'
                  className="mt-1 p-2.5 w-full border rounded-md mb-4"
                />
                {error.physicaladdress && <p className="text-red-500 mt-1">{error.physicaladdress}</p>}
              </div>

              <div className="mt-4">
                <label
                  htmlFor="text"
                  className="block text-sm font-medium mb-1"
                >
                  Postal Address
                </label>
                <input
                  id="text"
                  name="postaladdress"
                  value={companyData.postaladdress}
                  onChange={handleChange('postaladdress')}
                  type="text"
                  placeholder='Eg: 12 Revenue Street Bankstown NSW 2200'
                  className="mt-1 p-2.5 w-full border rounded-md mb-4"
                />
                {error.postaladdress && <p className="text-red-500 mt-1">{error.postaladdress}</p>}
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-3 px-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#FF8000] hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2"
              
                >
                  Continue
                </button>
              </div>
            </form>
        </div>

        <div className="relative h-full flex flex-col">
            <img
              src={
                "https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              className="w-full h-full object-cover"
            />
          </div>

    </div>
    </>
  )
}

export default CompanyField