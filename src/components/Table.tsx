import React from 'react';
import {useTable, usePagination, useSortBy} from 'react-table';
import {CSVLink} from 'react-csv';
import axios from 'axios';
const Table = ({
  columns,
  data,
  updateMyData,
  skipPageReset,
  // defaultColumn,
  setData,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    setPageSize,
    previousPage,
    state: {pageIndex, pageSize},
    state,
  } = useTable(
    {
      columns,
      data,
      // defaultColumn,
      autoResetPage: !skipPageReset,
      updateMyData,
    },
    useSortBy,
    usePagination
  );

  const [showUserModal, setShowUserModal] = React.useState(false);
  const [showEditModal, setEditModal] = React.useState(false);

  const AddUser = () => {
    setShowUserModal(!showUserModal);
  };
  var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
  var today = new Date(),
  date = month[Number(today.getMonth())] + " " + today.getDay() + ", "+ today.getFullYear();
  

  const [addData, setAddData] = React.useState({
    id: 1,
    firstName: '',
    bloodGroup: '',
    maidenName: '',
    birthDate: date,
    email: '',
  });

  const [editData, setEditData] = React.useState({
    firstName: '',
    maidenName: '',
  });

  const handleChangeEdit = (event: any) => {
    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newEditData = {...editData};
    newEditData[fieldName] = fieldValue;
    setEditData(newEditData);
    console.log(newEditData);
  };

  const toggleEdit = (cell:any) => {
    
  }

  const handleEditSubmit = (event: any) => {
    event.preventDefault();
    console.log(event);
    const newContact = {
      firstName: editData.firstName,
      maidenName: editData.maidenName,
    };

    data.map((user:any) => {
        if(user.id == originalVals){
            user.firstName = newContact.firstName;
            user.maidenName = newContact.maidenName;
            console.log(user.maidenName);
        }
    })

    setEditModal(false);
    console.log(originalVals);
    setData((current: any) => current.filter((user: any) => user.id !== 200));
  };
  const [originalVals, setOrigirnalVals] = React.useState();

  const handleChange = (event: any) => {
    console.log(event.target.getAttribute('name'));
    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newFormData = {...addData};
    newFormData[fieldName] = fieldValue;
    setAddData(newFormData);
  };

  const camelCase = (str: any) => {
    return str.substring(0, 1).toUpperCase() + str.substring(1);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newContact = {
      id: addData.id,
      firstName: addData.firstName,
      maidenName: addData.maidenName,
      bloodGroup: addData.bloodGroup,
      birthDate: addData.birthDate,
      email: addData.email,
    };
    setShowUserModal(false);
    const newData = data;
    newData.push(newContact);
    setData(newData);

    setData((current: any) => current.filter((user: any) => user.id !== 200));
  };
  const deleteRow = (cell: any) => {
    console.log(cell.row.original.id);

    setData((current: any) =>
      current.filter((fruit: any) => fruit.id !== Number(cell.row.original.id))
    );
    console.log(data);
  };

  const headers = [
    {label: 'Name', key: 'firstName'},
    {label: 'Status', key: 'bloodGroup'},
    {label: 'Role', key: 'maidenName'},
    {label: 'Last Login', key: 'birthDate'},
  ];

  const [showDeleteModal, setDeleteModal] = React.useState(false);

  const [deleteCell, setDeleteCell] = React.useState();
  const [deleteCellName, setDeleteCellName] = React.useState("");


  const toggleDeleteModel = (cell:any) => {
    setDeleteModal(true);
    setDeleteCell(cell);
    console.log(deleteCell);
    setDeleteModal(false);
  }

  return (
    
    <>
    {/* Delete User Modal */}
    {showDeleteModal && (
        <>
          <div className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w- my-6 mx-auto max-w-2xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Delete User</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowUserModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="p-6 space-y-6">
                
                <p className="text-base leading-relaxed text-black-500">
                    Are you Sure you want to Delete User Details of <strong>{deleteCellName}</strong> ?
                </p>
            </div>

                <div className='flex-row'>
                <button
                    type="button"
                    className="m-4 float-right text-white bg-blue-400 border hover:bg-gray-300 hover:text-black font-bold py-2 px-4 rounded inline-flex items-center "
                    onClick={() => {
                      deleteRow(deleteCell)
                      setDeleteModal(false)
                    }}
                  >
                    Delete User
                  </button>
                <button
                    className="ml-4 mt-4 float-left text-red bg-white-400 border hover:bg-red-700 hover:text-white font-bold py-2 px-4 rounded inline-flex items-center "
                    type="button"
                    onClick={() => setDeleteModal(false)}
                  >
                    Cancel
                  </button>
                </div>
  
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b"></div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    


    {/* Add User Modal */}
      {showUserModal && (
        <>
          <div className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w- my-6 mx-auto max-w-2xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Add User</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowUserModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>

                <form className="" onSubmit={e => handleSubmit(e)}>
                  <input
                    type="text"
                    name="firstName"
                    required
                    className="m-4 bg-gray-50 border w-56 mr-10 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Enter Name"
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="bloodGroup"
                    required
                    className="m-4 bg-gray-50 w-56 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Enter Current Status"
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="maidenName"
                    required
                    className="m-4 bg-gray-50 border w-56 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Enter Role"
                    onChange={handleChange}
                  />
                  <input
                    type="email"
                    name="email"
                    required
                    className="m-4 bg-gray-50 border w-56 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Enter Email"
                    onChange={handleChange}
                  />
                  <button
                    className="ml-4 mt-4 float-left text-red bg-white-400 border hover:bg-red-700 hover:text-white font-bold py-2 px-4 rounded inline-flex items-center "
                    type="button"
                    onClick={() => setShowUserModal(false)}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="m-4 float-right text-white bg-blue-400 border hover:bg-gray-300 hover:text-black font-bold py-2 px-4 rounded inline-flex items-center "
                  >
                    Save Changes
                  </button>
                </form>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b"></div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}

      {/* Edit User Modal */}
      {showEditModal && (
        <>
          <div className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w- my-6 mx-auto max-w-2xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Edit User</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setEditModal(false)}
                  >
                    <span className=" text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>

                <form className="" onSubmit={e => handleEditSubmit(e)}>
                  <input
                    type="text"
                    name="firstName"
                    required
                    className="m-4 bg-gray-50 border w-56 mr-10 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Enter Name"
                    onChange={handleChangeEdit}
                  />

                  <input
                    type="text"
                    name="maidenName"
                    required
                    className="m-4 bg-gray-50 border w-56 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Enter Role"
                    onChange={handleChangeEdit}
                  />

                  <button
                    className="ml-4 mt-4 float-left text-red bg-white-400 border hover:bg-red-700 hover:text-white font-bold py-2 px-4 rounded inline-flex items-center "
                    type="button"
                    onClick={() => setEditModal(false)}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="m-4 float-right text-white bg-blue-400 border hover:bg-gray-300 hover:text-black font-bold py-2 px-4 rounded inline-flex items-center "
                  >
                    Save Changes
                  </button>
                </form>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b"></div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}

      {/* Main Content */}

      <div className="ml-2 mx-auto max-w-9xl py-6 px-4 sm:px-6 lg:px-8">
        <h2 className="ml-2 mb-2 text-3xl font-bold tracking-tight text-gray-900">
          Company Settings
        </h2>
        <div className="ml-2 flex flex-col border-shadow-0.5">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <h3 className="ml-4 inline-flex mt-4 text-xl font-bold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl">
                  Users
                </h3>
                <span className=" ml-4 bg-green-200 text-green-2800 text-sm font-bold  px-2.5 py-0.5 rounded">
                  {data.length} Users
                </span>
                <p className="ml-4 mt-4 text-lg font-sans font-medium text-gray-500 lg:text-xl dark:text-gray-400">
                  Manage your team members and their account permissions
                </p>
                <button
                  type="button"
                  onClick={AddUser}
                  data-modal-target="default"
                  data-modal-toggle="defaultModal"
                  className="mr-4 float-right text-white bg-blue-400 border hover:bg-gray-300 hover:text-black font-bold py-2 px-4 rounded inline-flex items-center "
                >
                  Add User
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 ml-2 -mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
                <CSVLink
                      data={data}
                      headers={headers}
                      filename={'Users.csv'}
                    >
                <button className="float-right mr-3 bg-white-300 border hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                  <svg
                    className="fill-current w-4 h-4 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                  </svg>
                  <span>
                    
                      Download as CSV
                    
                  </span>
                </button></CSVLink>
                <table className=" min-w-full" {...getTableProps()}>
                  <thead className="bg-white border-b">
                    {headerGroups.map(headerGroup => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                          <th
                            className="text-lg font-medium text-gray-900 px-6 py-4 text-left"
                            {...column.getHeaderProps(
                              column.getSortByToggleProps()
                            )}
                          >
                            {column.render('Header')}
                            <span>
                              {column.isSorted
                                ? column.isSortedDesc
                                  ? ' ▼'
                                  : ' ▲'
                                : ' ↓'}
                            </span>
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                      prepareRow(row);
                      return (
                        <tr
                          className="odd:bg-white even:bg-slate-100"
                          {...row.getRowProps()}
                        >
                          {row.cells.map((cell:any) => {
                            return (
                              <>
                                <td
                                  className="  px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-900"
                                  {...cell.getCellProps()}
                                >
                                  {cell.render('Cell')}
                                </td>
                                {cell.column.Header === 'Last Login' ? (
                                  <>
                                    <button
                                      className="mt-6 mr-3 p-2.5 bg-white-500 rounded-xl hover:rounded-3xl hover:bg-gray-600 transition-all duration-300 text-black hover:rounded-3xl hover:bg-gray-600 transition-all duration-300"
                                      onClick={() => {
                                        setDeleteCell(cell);
                                        setDeleteCellName(cell.row.original.firstName)
                                        setDeleteModal(true);
                                      }}
                                    >
                                      <span>
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth="2"
                                          stroke="currentColor"
                                          className="w-6 h-6"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                          />
                                        </svg>
                                      </span>
                                    </button>
                                    <button
                                      className=" p-2.5 bg-white-500 rounded-xl hover:rounded-3xl hover:bg-gray-600 transition-all duration-300 text-black"
                                      onClick={() => {
                                        // const name = cell.row.original.firstName;
                                        setOrigirnalVals(cell.row.original.id);
                                        setEditModal(!showEditModal);
                                        // toggleEdit(cell);
                                      }}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                        />
                                      </svg>
                                    </button>
                                  </>
                                ) : null}
                                {/* {console.log(cell)} */}
                              </>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="min-w-full">
                  <a
                    onClick={() => previousPage()}
                    className=" m-4 float-left inline-flex cursor-pointer items-center px-4 py-2 mr-3 text-sm font-medium text-black-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-800 hover:text-white "
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Previous
                  </a>
                  <a
                    onClick={() => nextPage()}
                    className=" m-4 float-right inline-flex cursor-pointer items-right px-4 py-2 mr-3 text-sm font-medium text-black-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-800 hover:text-white "
                  >
                    Next
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 ml-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
