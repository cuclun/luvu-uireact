// @ts-ignore
import { TablePagination } from 'react-pagination-table';
import 'app/static/styles/admin/table-pagination.css';

const Table = (props: any) => {
  if (props.data.length === 0) {
    return <></>;
  }

  return (
    <div className="styled-table">
      <TablePagination
        headers={props.header}
        data={props.data}
        columns={props.columns}
        perPageItemCount={10}
        partialPageCount={props.data.length / 10}
        totalCount={props.data.length}
        arrayOption={[]}
      />
    </div>
  );
};

export { Table };
