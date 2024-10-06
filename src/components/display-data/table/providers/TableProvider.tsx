/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useMemo,
  ReactNode,
} from 'react';

import {
  BaseEntity,
  RowSelectionId,
  RowSelectionModel,
  TableProps,
} from '../types';

type TableDataContext = {
  rowsSelection: RowSelectionModel;
  colsWidth: Map<React.Key, number>;
};

type TableContextActionsType = {
  onSelect: (
    checked: boolean,
    checkedRowId: RowSelectionId,
    callBack?: (selectedRowIds: RowSelectionModel) => void,
  ) => void;
  onSelectAll: (
    checked: boolean,
    callBack?: (selectedRowIds: RowSelectionModel) => void,
  ) => void;
  onColumnsResize: (columnKey: string, width: number) => void;
};

type TableProviderProps<Entry> = {
  tableProps: TableProps<Entry>;
  children: ReactNode;
};

const TableRootContext = React.createContext<unknown>(undefined);

const TableDataContext = createContext<TableDataContext | undefined>(undefined);

const TableActionsContext = createContext<TableContextActionsType | undefined>(
  undefined,
);

const TableDataProvider = <Entry extends BaseEntity>({
  tableProps,
  children,
}: TableProviderProps<Entry>) => {
  const { data, rowSelection } = tableProps;

  const [selectedData, setSelectedData] = useState<RowSelectionModel>(
    rowSelection?.selectedRowIds ?? [],
  );

  const [colsWidths, updateColsWidths] = useState(new Map<React.Key, number>());

  const onSelect = useCallback(
    (
      checked: boolean,
      checkedRowId: RowSelectionId,
      callBack?: (selectedData: RowSelectionModel) => void,
    ) => {
      setSelectedData((prevState) => {
        const newSelection = checked
          ? [...prevState, checkedRowId]
          : prevState.filter((id) => id !== checkedRowId);

        if (callBack) {
          callBack(newSelection);
        }

        return newSelection;
      });
    },
    [],
  );

  const onSelectAll = useCallback(
    (
      checked: boolean,
      callBack?: (selectedData: RowSelectionModel) => void,
    ) => {
      const newSelection = checked ? data.map((entry) => entry.id) : [];

      setSelectedData(newSelection);
      if (callBack) {
        callBack(newSelection);
      }
    },
    [data],
  );

  const onColumnsResize = useCallback((columnKey: string, width: number) => {
    updateColsWidths((widths) => {
      if (widths.get(columnKey) !== width) {
        const newWidths = new Map(widths);
        newWidths.set(columnKey, width);
        return newWidths;
      }
      return widths;
    });
  }, []);

  const tableData = useMemo(
    () => ({
      rowsSelection: selectedData,
      colsWidth: colsWidths,
    }),
    [selectedData, colsWidths],
  );

  const tableActions = useMemo(
    () => ({
      onSelect,
      onSelectAll,
      onColumnsResize,
    }),
    [onSelect, onSelectAll, onColumnsResize],
  );

  return (
    <TableRootContext.Provider value={tableProps}>
      <TableDataContext.Provider value={tableData}>
        <TableActionsContext.Provider value={tableActions}>
          {children}
        </TableActionsContext.Provider>
      </TableDataContext.Provider>
    </TableRootContext.Provider>
  );
};

const useTableRootProps = () => {
  const context = useContext(TableRootContext);
  if (!context) {
    throw new Error(
      'useTableRootProps must be used within a TableDataProvider',
    );
  }
  return context as TableProps<BaseEntity>;
};

const useTableData = (): TableDataContext => {
  const context = useContext(TableDataContext);
  if (!context) {
    throw new Error(
      'useTableSelectionData must be used within a TableDataProvider',
    );
  }
  return context;
};

const useTableActions = (): TableContextActionsType => {
  const context = useContext(TableActionsContext);
  if (!context) {
    throw new Error('useTableActions must be used within a TableDataProvider');
  }
  return context;
};

export { TableDataProvider, useTableData, useTableActions, useTableRootProps };
