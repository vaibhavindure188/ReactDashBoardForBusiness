import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Page,
} from '@syncfusion/ej2-react-grids';
import { employeesGrid } from '../data/dummy';
import { Header } from '../components';
import { apiGateway } from '../enverinments/envirnment';

const Employees = () => {
  const [employeesData, setEmployees] = useState([]);

  useEffect(() => {
    const getALLEmployee = async () => {
      try {
        const response = await axios.get(
          `${apiGateway}/api/employees/getAllEmployee`,
        );
        setEmployees(response.data);
      } catch (error) {
        // eslint-disable-next-line
        alert(error);
      }
    };

    getALLEmployee();
  }, []);
  const toolbarOptions = ['Search'];
  const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Employees" />
      <GridComponent
        dataSource={employeesData}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        editSettings={editing}
        toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          {employeesGrid.map((item, index) => (
            <ColumnDirective
              key={index}
              headerText={item.headerText}
              width={item.width}
              template={item.template}
              textAlign={item.textAlign}
              field={item.field}
              format={item.format}
            />
          ))}
        </ColumnsDirective>
        <Inject services={[Search, Page]} />
      </GridComponent>
    </div>
  );
};

export default Employees;
