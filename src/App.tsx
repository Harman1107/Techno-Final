import React from 'react';
import {useTable, usePagination, useSortBy} from 'react-table';
import axios from 'axios';
import Table from './components/Table';
import { url } from 'inspector';
import { cursorTo } from 'readline';

const EditableCell = ({
  value: initialValue,
  row: {index},
  column: {id},
  updateMyData,
}) => {
  const [value, setValue] = React.useState(initialValue);

  const onChange = e => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    updateMyData(index, id, value);
  };

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return <input value={value} onChange={onChange} onBlur={onBlur} />;
};
var today = new Date(),
 
    curTime = today.getHours() + ':' + today.getMinutes()

const defaultColumn = {
  Cell: EditableCell,
};

const changeDate = (date) => {
  console.log(date[0]);
}

function App() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'User',
        columns: [
          {
            Header: 'Name',
            Cell: tableProps => (
              <div className="mr-40">
                {tableProps.row.original.image ? <img
                  className="h-12 mr-2 w-12 rounded-full inline flex float-left"
                  src={tableProps.row.original.image}
                /> : <img
                className="h-12 mr-2 w-12 rounded-full inline flex float-left"
                src= "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"
              />}
                {tableProps.row.original.firstName}
                <p className="text-gray-500 font-normal">
                  {tableProps.row.original.email}
                </p>
              </div>
            ),
            accessor: 'firstName',
          },
          {
            Header: 'Status',
            Cell: tableProps => (
              <div>
                {tableProps.row.original.bloodGroup === 'Invited' ? (
                  <span className="bg-gray-300 text-gray-800 text-sm font-bold mr-2 px-2.5 py-0.5 rounded  ">
                    Invited
                  </span>
                ) : (
                  <span className="bg-green-200 text-green-2800 text-sm font-bold  px-2.5 py-0.5 rounded">
                    Active
                  </span>
                )}
              </div>
            ),

            accessor: 'bloodGroup',
          },
          {
            Header: 'Role',
            accessor: 'maidenName',
          },
          {
            Header: 'Last Login',
            Cell: tableProps => (
              <div className="mr-40">
                {tableProps.row.original.birthDate}
                <p className="text-gray-500 font-normal">
                  {curTime}
                </p>
              </div>
            ),
            accessor: 'birthDate',
          },
        ],
      },
    ],
    []
  );

  const [data, setData] = React.useState([{}]);
  const [originalData] = React.useState(data);
  const [skipPageReset, setSkipPageReset] = React.useState(false);

  const updateMyData = (rowIndex, columnId, value) => {
    setSkipPageReset(true);
    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  React.useEffect(() => {
    setSkipPageReset(false);
  }, [data]);

  React.useEffect(() => {
    const fetch = async () => {
      const res = await axios('https://dummyjson.com/users');
      const data = res.data.users;
      data.map((data: any) => {
        if (data.age > 25) {
          data.maidenName = 'Sales Rep';
        } else if (data.age >= 50) {
          data.maidenName = 'Admin';
        } else {
          data.maidenName = 'Sales Leader';
        }
        var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
        const date = data.birthDate;
        var m;
        if(date[5] == 0){
          m=  month[Number(date[6]) - 1]
        }
        else{
          m = month[Number(date[5]+date[6]) - 1]
        }
        
        var day = date[8]+date[9];
        var year = date[0]+date[1]+date[2]+date[3];

        var newDate = m + " " + day + ", "+year
        data.birthDate = newDate;
      
        if (data.height > 185) {
          data.bloodGroup = 'Invited';
        } else {
          data.bloodGroup = 'Active';
        }


      });
      setData(data);
      console.log(data);
    };
    
    fetch();
  }, []);

  const resetData = () => setData(originalData);

  return (
    <>
      {/* <button onClick={resetData}>Reset Data</button> */}
      <Table
        columns={columns}
        data={data}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
        // defaultColumn={defaultColumn}
        setData={setData}
      />
    </>
  );
}

export default App;
