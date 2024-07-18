import axios from "axios";
import { Link, Outlet, useNavigate, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple, faFileCircleCheck, faGear,faPlus, faHome, faLayerGroup, faList, faMagnifyingGlass, faRightFromBracket, faMinus, faMessage } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";


// const getTokenFromStorage = () => sessionStorage.getItem('accessToken');

export const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5000/api/auth/logout');
            localStorage.removeItem('accessToken');
            navigate("/login");
        } catch (error: any) {
            console.error(error.response.data);
        }
    }

   
        const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({
            settings: false,
        });
    
        const toggleExpand = (key: string) => {
            setExpanded((prevState) => ({
                ...prevState,
                [key]: !prevState[key],
            }));
        };



  return (

    <div className="min-h-screen bg-gray-100 flex">
        <div className="bg-gray-800 text-gray-100 w-60 flex flex-col">
            <div className="flex-shrink-0 px-8 py-4 flex items-center justify-between">
              <span className="text-lg font-bold">Dashboard</span>
            </div>
            <nav className="flex-1">
                <ul className="space-y-1 mt-4">
                    <div className="relative">
                        <input type="text" placeholder="Search" className="block rounded text-sm right-1 border-2 w-52 pl-7 py-1.5 mx-2 text-gray-700 placeholder border-t" />
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute top-2.5 left-4 text-gray-400 text-sm"/>
                    </div>
                    <li className="block px-8 py-2 text-gray-300 hover:bg-gray-700 hover:text-white text-sm font-semibold"><Link to='#'><FontAwesomeIcon icon={faHome} className="mr-2"/>Home</Link></li>
                    <li className="block px-8 py-2 text-gray-300 hover:bg-gray-700 hover:text-white text-sm font-semibold"><Link to='#'><FontAwesomeIcon icon={faChartSimple} className="mr-2"/>Dashboard</Link></li>
                    <li className="block px-8 py-2 text-gray-300 hover:bg-gray-700 hover:text-white text-sm font-semibold"><Link to='#'><FontAwesomeIcon icon={faLayerGroup} className="mr-2"/>Projects</Link></li>
                    <li className="block px-8 py-2 text-gray-300 hover:bg-gray-700 hover:text-white text-sm font-semibold"><Link to='#'><FontAwesomeIcon icon={faFileCircleCheck} className="mr-2"/>Tasks</Link></li>
                    <li>
                        <NavLink to="/dashboard/employee" className={({ isActive }) => isActive ? "block px-8 py-2 bg-gray-700 text-white text-sm font-semibold" : "block px-8 py-2 text-gray-300 hover:bg-gray-700 hover:text-white text-sm font-semibold"}>
                            <FontAwesomeIcon icon={faList} className="mr-2"/>Employees
                        </NavLink>
                    </li>
                    {/* <li className="block px-8 py-2 text-gray-300 hover:bg-gray-700 hover:text-white text-sm font-semibold"><Link to='#'>
                        <div className="flex justify-between"><div><FontAwesomeIcon icon={faGear} className="mr-2"/>Settings</div><FontAwesomeIcon icon={faPlus} /> </div>
                        </Link>
                    </li> */}
                    <li>
                            <button onClick={() => toggleExpand('settings')} className="w-full text-left block px-8 py-2 text-gray-300 hover:bg-gray-700 hover:text-white text-sm font-semibold">
                                <FontAwesomeIcon icon={faGear} className="mr-2" />Settings
                                <FontAwesomeIcon icon={expanded.settings ? faMinus : faPlus} className="float-right" />
                            </button>
                            <div className="relative">
                            <div className="absolute left-9 top-0 bottom-0 w-0.5 bg-gray-500"></div>
                            {expanded.settings && (
                                <ul className="ml-7">
                                    <li>
                                        <NavLink to="/settings/my-details" className={({ isActive }) => isActive ? "block px-8 py-2 bg-gray-700 text-white text-sm font-semibold" : "block px-8 py-2 text-gray-300 hover:bg-gray-700 hover:text-white text-sm font-semibold"}>
                                            My details
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/settings/profile" className={({ isActive }) => isActive ? "block px-8 py-2 bg-gray-700 text-white text-sm font-semibold" : "block px-8 py-2 text-gray-300 hover:bg-gray-700 hover:text-white text-sm font-semibold"}>
                                            Profile
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/settings/security" className={({ isActive }) => isActive ? "block px-8 py-2 bg-gray-700 text-white text-sm font-semibold" : "block px-8 py-2 text-gray-300 hover:bg-gray-700 hover:text-white text-sm font-semibold"}>
                                            Security
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/settings/integrations" className={({ isActive }) => isActive ? "block px-8 py-2 bg-gray-700 text-white text-sm font-semibold" : "block px-8 py-2 text-gray-300 hover:bg-gray-700 hover:text-white text-sm font-semibold"}>
                                            Integrations
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/settings/billing" className={({ isActive }) => isActive ? "block px-8 py-2 bg-gray-700 text-white text-sm font-semibold" : "block px-8 py-2 text-gray-300 hover:bg-gray-700 hover:text-white text-sm font-semibold"}>
                                            Billing
                                        </NavLink>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </li>


                    <li className="block px-8 py-2 text-gray-300 hover:bg-gray-700 hover:text-white text-sm font-semibold"><Link to='#'><FontAwesomeIcon icon={faMessage} className="mr-2"/>Messages</Link></li>
                </ul>
            </nav>
            <div className="px-8 py-4 border-t border-gray-700">
              <Link to="#" onClick={handleLogout} className="block px-8 py-2 text-gray-300 hover:bg-gray-700 hover:text-white text-sm font-semibold"><FontAwesomeIcon icon={faRightFromBracket} className="mr-2"/>Logout</Link>
            </div>
        </div>

        <div className="flex-1 p-10">
            <Outlet />
        </div>
    </div>
  )
}




 

    