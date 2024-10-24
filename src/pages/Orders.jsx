import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios'
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
  Inject,
} from '@syncfusion/ej2-react-grids';
import {  contextMenuItems, ordersGrid } from '../data/dummy';
import { Header } from '../components';

const Orders = () => {
  const editing = { allowDeleting: true, allowEditing: true };

  const [ordersData, setOrders] = useState([]);

  useEffect(() => {
    const getALLOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/orders/getAllOrders'); // Replace with your API endpoint
        setOrders(response.data);
        console.log(ordersData)
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    getALLOrders(); // Call the async function
  }, []); 
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Orders" />
      <GridComponent
        id="gridcomp"
        dataSource={ordersData}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems}
        editSettings={editing}
      >
        <ColumnsDirective>
          {ordersGrid.map((item, index) => (
            <ColumnDirective
              key={index}
              headerText={item.headerText}
              width={item.width}
              textAlign={item.textAlign}
              field={item.field}
              template={item.template}
              editType={item.editType}
              format={item.format}
            />
          ))}
        </ColumnsDirective>
        <Inject
          services={[
            Resize,
            Sort,
            ContextMenu,
            Filter,
            Page,
            ExcelExport,
            Edit,
            PdfExport,
          ]}
        />
      </GridComponent>
    </div>
  );
};

export default Orders;
