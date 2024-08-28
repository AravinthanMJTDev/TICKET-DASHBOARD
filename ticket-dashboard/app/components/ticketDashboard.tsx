"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  User,
  Pagination,
  Selection,
  SortDescriptor,
  CircularProgressProps,
  Chip,
} from "@nextui-org/react";
import { CircularProgress } from "@nextui-org/progress";

import { columns, usersDB, statusOptions } from "./data";
import {
  ChevronDownIcon,
  Filter,
  Menu,
  PlusIcon,
  SearchIcon,
  SquareArrowOutUpRight,
  Trash2Icon,
  X,
} from "lucide-react";
import Popup from "./popupform";

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
  team: string;
  subject: string;
  status: string;
  priority: string;
  agent: string;
}

const statusColorMap: Record<string, CircularProgressProps["color"]> = {
  Recent: "success",
  Overdue: "danger",
  Remaining: "warning",
  Responded: "primary",
  closed: "default",
};

const priorityValue: Record<string, CircularProgressProps["value"]> = {
  urgent: 100,
  high: 75,
  medium: 50,
  low: 25,
};

const priorityColor: Record<string, CircularProgressProps["color"]> = {
  urgent: "danger",
  high: "warning",
  medium: "primary",
  low: "success",
};
const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "subject",
  "status",
  "priority",
  "agent",
];

type User = (typeof usersDB)[0];

export default function TicketDashboard() {
  const [users, setUsers] = useState([]);
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });
  const [popup, setPopup] = useState(false);
  const [page, setPage] = React.useState(1);
  const hasSearchFilter = Boolean(filterValue);
  const [menuExpand, setMenuExpand] = useState(false);

  useEffect(() => {
    return setUsers(usersDB);
  }, usersDB);
  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];
    console.log(statusFilter);
    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status.toLowerCase())
      );
    }
    console.log(filteredUsers);
    return filteredUsers;
  }, [users, filterValue, statusFilter]);

  // PAGES
  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: User, b: User) => {
      const first = a[sortDescriptor.column as keyof User] as number;
      const second = b[sortDescriptor.column as keyof User] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items, users]);
  //  HANDLE DELETE
  const handleDelete = () => {
    const newUsers = users.filter(
      (user) => !selectedKeys.has(user.id.toString())
    );
    setSelectedKeys(new Set());
    setUsers(newUsers);
  };

  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.email}
            name={cellValue}
            className="font-medium"
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            <p className="text-bold text-tiny capitalize text-default-400 font-medium">
              {user.team}
            </p>
          </div>
        );

      case "subject":
        return <p className="text-blue-400 font-semibold">{cellValue}</p>;
      case "priority":
        const progressValue = priorityValue[user.priority];
        const progressColor = priorityColor[user.priority];
        console.log(progressColor, "  ", progressValue);
        return (
          <CircularProgress
            aria-label="circularProgress"
            size="lg"
            value={progressValue}
            color={progressColor}
          />
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[cellValue]}
            size="sm"
            variant="flat"
          >
            <p className="font-semibold">{cellValue}</p>
          </Chip>
        );

      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);
  const capitalize = (str: string) => {
    if (typeof str !== "string") return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  // TOP CONTENT

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4   ">
        <div className="flex  justify-between gap-3 items-center  transition-all duration-1000 ease-in-out">
          <p className="hidden sm:flex text-sm font-semibold">
            Unsolved Tickets
          </p>
          <Input
            isClearable
            className="w-full sm:min-w-[20%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex sm:hidden">
            <Menu onClick={() => setMenuExpand(true)} />
            {menuExpand && (
              <div
                style={{
                  transform: menuExpand ? "translateX(0)" : "translateX(-100%)",
                  transition: "transform 1.5s ease",
                }}
                className="w-1/2 fixed top-0 right-0 h-full flex flex-col gap-3 bg-neutral-100 z-50 sm:hidden"
              >
                <div className="flex justify-end p-4">
                  <X onClick={() => setMenuExpand(false)} />
                </div>
                <Dropdown>
                  <DropdownTrigger className="w-full">
                    <Button
                      // endContent={<ChevronDownIcon className="text-small" />}
                      // variant="flat"
                      color="undefined"
                      className="w-full"
                    >
                      Status
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    disallowEmptySelection
                    aria-label="Table Columns"
                    closeOnSelect={false}
                    selectedKeys={statusFilter}
                    selectionMode="multiple"
                    onSelectionChange={setStatusFilter}
                  >
                    {statusOptions.map((status) => (
                      <DropdownItem key={status.uid} className="capitalize">
                        {capitalize(status.name)}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
                <Dropdown>
                  <DropdownTrigger className="w-full">
                    <Button
                      // endContent={<ChevronDownIcon className="text-small" />}
                      // variant="flat"
                      color="undefined"
                      className="w-full"
                      // startContent={<Filter></Filter>}
                    >
                      Filter
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    disallowEmptySelection
                    aria-label="Table Columns"
                    closeOnSelect={false}
                    selectedKeys={visibleColumns}
                    selectionMode="multiple"
                    onSelectionChange={setVisibleColumns}
                  >
                    {columns.map((column) => (
                      <DropdownItem key={column.uid} className="capitalize">
                        {capitalize(column.name)}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>

                <Button
                  // endContent={<PlusIcon />}
                  onClick={() => setPopup(true)}
                  color="undefined"
                  className="w-full"
                >
                  Add New
                </Button>
                <Button
                  // startContent={<Trash2Icon />}
                  color="undefined"
                  onClick={handleDelete}
                  isDisabled={selectedKeys.size === 0}
                  className="w-full"
                >
                  Delete
                </Button>
              </div>
            )}
          </div>

          {/* MEDIUM SCREEN CONTENT */}
          <div className="hidden sm:flex md:flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                  startContent={<Filter></Filter>}
                >
                  Filter
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            <Button endContent={<PlusIcon />} onClick={() => setPopup(true)}>
              Add New
            </Button>
            <Button
              startContent={<Trash2Icon />}
              color="danger"
              onClick={handleDelete}
              isDisabled={selectedKeys.size === 0}
            >
              Delete
            </Button>
          </div>
        </div>
        {/* POPUP COMPONENT */}
        {popup && (
          <Popup
            onClose={() => setPopup(false)}
            priorityColor={priorityColor}
            setUsers={setUsers}
          />
        )}
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {users.length} users
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    users.length,
    hasSearchFilter,
    popup,
    selectedKeys.size,
    setPopup,
    users,
    menuExpand,
  ]);
  console.log(selectedKeys);

  // BOTTOM CONTENT
  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [
    selectedKeys,
    items.length,
    page,
    pages,
    hasSearchFilter,
    users,
    users.length,
  ]);

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px] ",
      }}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No users found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell key={`${item.id}-${String(columnKey)}`}>
                {renderCell(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
