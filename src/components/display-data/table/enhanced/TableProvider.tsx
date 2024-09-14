/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useMemo,
  ReactNode,
} from 'react';

import { BaseEntity } from '../base/types';

import { RowSelectionId, RowSelectionModel, TableProps } from './types';

type TableSelectionContextDataType = RowSelectionModel;

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
};

type TableProviderProps<Entry> = {
  tableProps: TableProps<Entry>;
  children: ReactNode;
};

const TableRootContext = React.createContext<unknown>(undefined);

const TableSelectionDataContext = createContext<
  TableSelectionContextDataType | undefined
>(undefined);

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

  const selectionData = useMemo(() => selectedData, [selectedData]);

  const tableActions = useMemo(
    () => ({
      onSelect,
      onSelectAll,
    }),
    [onSelect, onSelectAll],
  );

  return (
    <TableRootContext.Provider value={tableProps}>
      <TableSelectionDataContext.Provider value={selectionData}>
        <TableActionsContext.Provider value={tableActions}>
          {children}
        </TableActionsContext.Provider>
      </TableSelectionDataContext.Provider>
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

const useTableSelectionData = (): TableSelectionContextDataType => {
  const context = useContext(TableSelectionDataContext);
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

export {
  TableDataProvider,
  useTableSelectionData,
  useTableActions,
  useTableRootProps,
};
