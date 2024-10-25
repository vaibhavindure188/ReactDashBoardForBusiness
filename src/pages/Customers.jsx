import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Selection,
  Inject,
  Edit,
  Toolbar,
  Sort,
  Filter,
} from '@syncfusion/ej2-react-grids';
import { customersGrid } from '../data/dummy';
import { Header } from '../components';
import { apiGateway } from '../enverinments/envirnment';

const Customers = () => {
  const [customersData, setcustomersData] = useState([]);
  useEffect(() => {
    const getALLCustomers = async () => {
      try {
        const response = await axios.get(
          `${apiGateway}/api/customers/getAllCustomers`,
        ); // Replace with your API endpoint
        setcustomersData(response.data);
      } catch (error) {
        // eslint-disable-next-line
        alert(error);
      }
    };

    getALLCustomers();
  }, []);
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Delete'];
  const editing = { allowDeleting: true, allowEditing: true };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Customers" />
      <GridComponent
        dataSource={customersData}
        enableHover={false}
        allowPaging
        pageSettings={{ pageCount: 5 }}
        selectionSettings={selectionsettings}
        toolbar={toolbarOptions}
        editSettings={editing}
        allowSorting
      >
        <ColumnsDirective>
          {customersGrid.map((item, index) => (
            <ColumnDirective
              key={index}
              headerText={item.headerText}
              width={item.width}
              template={item.template}
              textAlign={item.textAlign}
              field={item.field}
              format={item.format}
              isPrimaryKey={item.isPrimaryKey}
              type={item.type}
            />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default Customers;
