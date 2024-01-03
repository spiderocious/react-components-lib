import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import {
  MOCK_ORDERS,
  MOCK_PRODUCTS,
  MOCK_TRANSACTIONS,
  MOCK_USERS,
  type Order,
  type Product,
  type Transaction,
  type User,
  generateMoreUsers,
} from "./constants";
import {
  DataTable,
  SimpleTable,
  TableEmptyState,
  TableSkeleton,
} from "./reusables";
import type { ColumnDef } from "./types";

// Helper function to extract original data from row (handles both Row instance and raw data)
const getRowData = <T,>(row: T | { original: T }): T => {
  return row && typeof row === "object" && "original" in row
    ? row.original
    : (row as T);
};

const meta: Meta<typeof DataTable> = {
  title: "Components/Table",
  component: DataTable as any, // Type assertion to avoid generic constraints
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Helper components for cell rendering
const Avatar = ({ src, name }: { src?: string; name: string }) => (
  <div className="flex items-center gap-3">
    {src ? (
      <img src={src} alt={name} className="w-8 h-8 rounded-full" />
    ) : (
      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-gray-600">
        {name.charAt(0)}
      </div>
    )}
    <span className="font-medium text-gray-900">{name}</span>
  </div>
);

const Badge = ({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info";
}) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
    info: "bg-blue-100 text-blue-800",
  };

  return (
    <span
      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${variants[variant]}`}
    >
      {children}
    </span>
  );
};

// User table columns
const userColumns: ColumnDef<User>[] = [
  {
    id: "name",
    header: "User",
    accessorKey: "name",
    cell: ({ row }) => {
      const user = getRowData(row);
      return <Avatar src={user.avatar} name={user.name} />;
    },
    sortable: true,
    sticky: "left",
  },
  {
    id: "email",
    header: "Email",
    accessorKey: "email",
    sortable: true,
  },
  {
    id: "role",
    header: "Role",
    accessorKey: "role",
    cell: ({ value }) => (
      <Badge
        variant={
          value === "admin"
            ? "info"
            : value === "moderator"
            ? "warning"
            : "default"
        }
      >
        {(value as string).charAt(0).toUpperCase() + (value as string).slice(1)}
      </Badge>
    ),
    sortable: true,
  },
  {
    id: "status",
    header: "Status",
    accessorKey: "status",
    cell: ({ value }) => (
      <Badge
        variant={
          value === "active"
            ? "success"
            : value === "inactive"
            ? "danger"
            : "warning"
        }
      >
        {(value as string).charAt(0).toUpperCase() + (value as string).slice(1)}
      </Badge>
    ),
    sortable: true,
  },
  {
    id: "department",
    header: "Department",
    accessorKey: "department",
    sortable: true,
  },
  {
    id: "salary",
    header: "Salary",
    accessorKey: "salary",
    cell: ({ value }) => `$${(value as number).toLocaleString()}`,
    align: "right",
    sortable: true,
  },
  {
    id: "joinDate",
    header: "Join Date",
    accessorKey: "joinDate",
    cell: ({ value }) => new Date(value as string).toLocaleDateString(),
    sortable: true,
  },
];

// Transaction table columns
const transactionColumns: ColumnDef<Transaction>[] = [
  {
    id: "reference",
    header: "Reference",
    accessorKey: "reference",
    cell: ({ value }) => (
      <span className="font-mono text-sm">{value as string}</span>
    ),
  },
  {
    id: "amount",
    header: "Amount",
    accessorKey: "amount",
    cell: ({ row }) => {
      const transaction = getRowData(row);
      return (
        <span
          className={`font-semibold ${
            transaction.type === "credit" ? "text-green-600" : "text-red-600"
          }`}
        >
          {transaction.type === "credit" ? "+" : "-"}$
          {transaction.amount.toFixed(2)}
        </span>
      );
    },
    align: "right",
    sortable: true,
  },
  {
    id: "type",
    header: "Type",
    accessorKey: "type",
    cell: ({ value }) => (
      <Badge variant={value === "credit" ? "success" : "info"}>
        {(value as string).toUpperCase()}
      </Badge>
    ),
  },
  {
    id: "status",
    header: "Status",
    accessorKey: "status",
    cell: ({ value }) => (
      <Badge
        variant={
          value === "completed"
            ? "success"
            : value === "pending"
            ? "warning"
            : "danger"
        }
      >
        {(value as string).charAt(0).toUpperCase() + (value as string).slice(1)}
      </Badge>
    ),
  },
  {
    id: "description",
    header: "Description",
    accessorKey: "description",
  },
  {
    id: "merchant",
    header: "Merchant",
    accessorKey: "merchant",
  },
  {
    id: "date",
    header: "Date",
    accessorKey: "date",
    cell: ({ value }) => new Date(value as string).toLocaleDateString(),
    sortable: true,
  },
];

// Product table columns
const productColumns: ColumnDef<Product>[] = [
  {
    id: "product",
    header: "Product",
    accessorKey: "name",
    cell: ({ row }) => {
      const product = getRowData(row);
      return (
        <div className="flex items-center gap-3">
          <img
            src={product.image}
            alt={product.name}
            className="w-10 h-10 rounded object-cover"
          />
          <div>
            <div className="font-medium text-gray-900">{product.name}</div>
            <div className="text-sm text-gray-500">{product.brand}</div>
          </div>
        </div>
      );
    },
    sticky: "left",
    minWidth: 250,
  },
  {
    id: "category",
    header: "Category",
    accessorKey: "category",
  },
  {
    id: "price",
    header: "Price",
    accessorKey: "price",
    cell: ({ value }) => `$${(value as number).toFixed(2)}`,
    align: "right",
    sortable: true,
  },
  {
    id: "stock",
    header: "Stock",
    accessorKey: "stock",
    cell: ({ row }) => {
      const product = getRowData(row);
      return (
        <div className="flex items-center gap-2">
          <span>{product.stock}</span>
          <Badge
            variant={
              product.status === "in_stock"
                ? "success"
                : product.status === "low_stock"
                ? "warning"
                : "danger"
            }
          >
            {product.status.replace("_", " ").toUpperCase()}
          </Badge>
        </div>
      );
    },
    align: "right",
    sortable: true,
  },
  {
    id: "rating",
    header: "Rating",
    accessorKey: "rating",
    cell: ({ value, row }) => {
      const product = getRowData(row);
      return (
        <div className="flex items-center gap-1">
          <span className="text-yellow-400">★</span>
          <span>{value}</span>
          <span className="text-gray-500 text-sm">({product.reviews})</span>
        </div>
      );
    },
    sortable: true,
  },
];

// Order table columns
const orderColumns: ColumnDef<Order>[] = [
  {
    id: "orderNumber",
    header: "Order",
    accessorKey: "orderNumber",
    cell: ({ value }) => (
      <span className="font-mono text-sm font-medium">{value as string}</span>
    ),
  },
  {
    id: "customer",
    header: "Customer",
    accessorFn: (row) => row.customer.name,
    cell: ({ row }) => {
      const order = getRowData(row);
      return <Avatar src={order.customer.avatar} name={order.customer.name} />;
    },
    sortable: true,
  },
  {
    id: "items",
    header: "Items",
    accessorKey: "items",
    cell: ({ value }) => `${value} item${(value as number) !== 1 ? "s" : ""}`,
    align: "center",
  },
  {
    id: "total",
    header: "Total",
    accessorKey: "total",
    cell: ({ value }) => `$${(value as number).toFixed(2)}`,
    align: "right",
    sortable: true,
  },
  {
    id: "status",
    header: "Order Status",
    accessorKey: "status",
    cell: ({ value }) => (
      <Badge
        variant={
          value === "delivered"
            ? "success"
            : value === "shipped"
            ? "info"
            : value === "processing"
            ? "warning"
            : value === "cancelled"
            ? "danger"
            : "default"
        }
      >
        {(value as string).charAt(0).toUpperCase() + (value as string).slice(1)}
      </Badge>
    ),
  },
  {
    id: "paymentStatus",
    header: "Payment",
    accessorKey: "paymentStatus",
    cell: ({ value }) => (
      <Badge
        variant={
          value === "paid"
            ? "success"
            : value === "refunded"
            ? "warning"
            : "danger"
        }
      >
        {(value as string).charAt(0).toUpperCase() + (value as string).slice(1)}
      </Badge>
    ),
  },
  {
    id: "orderDate",
    header: "Order Date",
    accessorKey: "orderDate",
    cell: ({ value }) => new Date(value as string).toLocaleDateString(),
    sortable: true,
  },
];

// Stories
export const UsersTable: Story = {
  render: () => (
    <DataTable<User>
      data={MOCK_USERS}
      columns={userColumns}
      title="Users Management"
      enableSorting={true}
      enableGlobalFilter={true}
      enableSelection={true}
      enablePagination={true}
      pageSize={5}
      toolbarConfig={{
        showGlobalFilter: true,
        showColumnToggle: true,
        showExport: true,
        bulkActions: [
          {
            id: "delete",
            label: "Delete Selected",
            icon: "🗑️",
            variant: "danger",
            onClick: (selectedRows) => {
              console.log("Deleting users:", selectedRows);
            },
          },
          {
            id: "export",
            label: "Export Selected",
            icon: "📤",
            onClick: (selectedRows) => {
              console.log("Exporting users:", selectedRows);
            },
          },
        ],
      }}
      rowActions={[
        {
          id: "edit",
          label: "Edit",
          icon: "✏️",
          onClick: (row) => console.log("Edit user:", row),
        },
        {
          id: "delete",
          label: "Delete",
          icon: "🗑️",
          variant: "danger",
          onClick: (row) => console.log("Delete user:", row),
        },
      ]}
      onRowClick={(row) => console.log("Row clicked:", row)}
    />
  ),
};

export const TransactionsTable: Story = {
  render: () => (
    <DataTable<Transaction>
      data={MOCK_TRANSACTIONS}
      columns={transactionColumns}
      title="Transaction History"
      enableSorting={true}
      enableGlobalFilter={true}
      enablePagination={true}
      pageSize={10}
      toolbarConfig={{
        showExport: true,
      }}
    />
  ),
};

export const ProductsTable: Story = {
  render: () => (
    <DataTable<Product>
      data={MOCK_PRODUCTS}
      columns={productColumns}
      title="Product Inventory"
      enableSorting={true}
      enableGlobalFilter={true}
      enableSelection={true}
      showPagination={false}
      toolbarConfig={{
        customActions: (
          <button className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
            Add Product
          </button>
        ),
        bulkActions: [
          {
            id: "updateStock",
            label: "Update Stock",
            icon: "📦",
            onClick: (selectedRows) => {
              console.log("Updating stock for:", selectedRows);
            },
          },
        ],
      }}
      rowActions={[
        {
          id: "view",
          label: "View",
          icon: "👁️",
          onClick: (row) => console.log("View product:", row),
        },
        {
          id: "edit",
          label: "Edit",
          icon: "✏️",
          onClick: (row) => console.log("Edit product:", row),
        },
      ]}
    />
  ),
};

export const OrdersTable: Story = {
  render: () => (
    <DataTable<Order>
      data={MOCK_ORDERS}
      columns={orderColumns}
      title="Order Management"
      enableSorting={true}
      enableGlobalFilter={true}
      enablePagination={true}
      pageSize={10}
      toolbarConfig={{
        showExport: true,
        bulkActions: [
          {
            id: "markShipped",
            label: "Mark as Shipped",
            icon: "🚚",
            onClick: (selectedRows) => {
              console.log("Marking as shipped:", selectedRows);
            },
          },
        ],
      }}
      rowActions={[
        {
          id: "view",
          label: "View Details",
          icon: "👁️",
          onClick: (row) => console.log("View order:", row),
        },
        {
          id: "print",
          label: "Print Invoice",
          icon: "🖨️",
          onClick: (row) => console.log("Print invoice:", row),
        },
      ]}
    />
  ),
};

export const SimpleTableExample: Story = {
  render: () => (
    <SimpleTable<User>
      data={MOCK_USERS.slice(0, 3)}
      columns={[
        {
          id: "name",
          header: "Name",
          accessorKey: "name",
        },
        {
          id: "email",
          header: "Email",
          accessorKey: "email",
        },
        {
          id: "role",
          header: "Role",
          accessorKey: "role",
        },
      ]}
    />
  ),
};

export const LoadingState: Story = {
  render: () => (
    <DataTable<User>
      data={[]}
      columns={userColumns}
      title="Loading Example"
      loading={true}
      loadingConfig={{
        rows: 8,
        showHeader: true,
        showPagination: true,
      }}
    />
  ),
};

export const EmptyState: Story = {
  render: () => (
    <DataTable<User>
      data={[]}
      columns={userColumns}
      title="Empty State Example"
      loading={false}
      emptyConfig={{
        title: "No users found",
        description:
          "There are no users in the system yet. Start by adding your first user.",
        action: (
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Add First User
          </button>
        ),
      }}
    />
  ),
};

export const LargeDataset: Story = {
  render: () => (
    <DataTable<User>
      data={generateMoreUsers(1000)}
      columns={userColumns}
      title="Large Dataset (1000 rows)"
      enableSorting={true}
      enableGlobalFilter={true}
      enableSelection={true}
      enablePagination={true}
      pageSize={25}
      toolbarConfig={{
        showGlobalFilter: true,
        showColumnToggle: true,
        showExport: true,
      }}
    />
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <DataTable<User>
      data={MOCK_USERS.slice(0, 5)}
      columns={
        userColumns.map((col) => ({
          ...col,
          meta: {
            ...col.meta,
            headerClassName: "bg-blue-600 text-white",
            cellClassName: "hover:bg-blue-50",
          },
        })) as any
      }
      title="Custom Styled Table"
      size="lg"
      className="border-2 border-blue-200"
    />
  ),
};

export const StickyColumns: Story = {
  render: () => (
    <DataTable<User>
      data={MOCK_USERS}
      columns={
        [
          ...userColumns,
          {
            id: "country",
            header: "Country",
            accessorKey: "country",
          },
          {
            id: "phone",
            header: "Phone",
            accessorKey: "phone",
          },
          {
            id: "lastLogin",
            header: "Last Login",
            accessorKey: "lastLogin",
            cell: ({ value }: any) =>
              new Date(value as string).toLocaleDateString(),
            sticky: "right",
          },
        ] as any
      }
      title="Sticky Columns Example"
      enableSorting={true}
      enablePagination={true}
      pageSize={8}
    />
  ),
};

export const MultiSort: Story = {
  render: () => (
    <DataTable<User>
      data={MOCK_USERS}
      columns={userColumns as any}
      title="Multi-Column Sorting"
      enableSorting={true}
      enableMultiSort={true}
      enablePagination={true}
      pageSize={10}
      toolbarConfig={{
        customActions: (
          <div className="text-sm text-gray-600">
            Hold Shift and click column headers to sort by multiple columns
          </div>
        ),
      }}
    />
  ),
};

export const FilterableTable: Story = {
  render: () => (
    <DataTable<User>
      data={MOCK_USERS}
      columns={
        userColumns.map((col) => ({
          ...col,
          filterable: true,
        })) as any
      }
      title="Filterable Table"
      enableSorting={true}
      enableFiltering={true}
      enableGlobalFilter={true}
      enablePagination={true}
      pageSize={10}
    />
  ),
};

export const CompactTable: Story = {
  render: () => (
    <DataTable<Transaction>
      data={MOCK_TRANSACTIONS}
      columns={transactionColumns as any}
      title="Compact Table"
      size="sm"
      enableSorting={true}
      enablePagination={true}
      pageSize={15}
    />
  ),
};

export const MobileResponsive: Story = {
  render: () => (
    <DataTable<User>
      data={MOCK_USERS.slice(0, 5)}
      columns={userColumns as any}
      title="Mobile Responsive"
      enableSorting={true}
      enablePagination={true}
      pageSize={5}
    />
  ),
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

// Skeleton component stories
export const TableSkeletonStory: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Default Skeleton</h3>
        <TableSkeleton columns={5} rows={5} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">With Pagination</h3>
        <TableSkeleton columns={6} rows={8} showPagination />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">No Header</h3>
        <TableSkeleton columns={4} rows={6} showHeader={false} />
      </div>
    </div>
  ),
};

// Empty state component stories
export const TableEmptyStateStory: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Default Empty State</h3>
        <div className="border border-gray-200 rounded-lg">
          <TableEmptyState />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Custom Empty State</h3>
        <div className="border border-gray-200 rounded-lg">
          <TableEmptyState
            title="No transactions found"
            description="You haven't made any transactions yet. Start by making your first transaction."
            icon={
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-2xl">💳</span>
              </div>
            }
            action={
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Make Transaction
              </button>
            }
          />
        </div>
      </div>
    </div>
  ),
};

// Interactive demo
export const InteractiveDemo: Story = {
  render: () => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [currentData, setCurrentData] = useState(MOCK_USERS);

    const handleSelectionChange = (selection: any) => {
      const ids = Object.keys(selection);
      setSelectedIds(ids);
    };

    const deleteSelected = () => {
      setCurrentData(
        currentData.filter((user: User) => !selectedIds.includes(user.id))
      );
      setSelectedIds([]);
    };

    return (
      <DataTable<User>
        data={currentData}
        columns={userColumns as any}
        title="Interactive Demo"
        enableSorting={true}
        enableGlobalFilter={true}
        enableSelection={true}
        enablePagination={true}
        pageSize={10}
        onSelectionChange={handleSelectionChange}
        toolbarConfig={{
          showGlobalFilter: true,
          showColumnToggle: true,
          showExport: true,
          customActions: selectedIds.length > 0 && (
            <button
              onClick={deleteSelected}
              className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete Selected ({selectedIds.length})
            </button>
          ),
        }}
      />
    );
  },
};

export const TableWithLoadingConfig: Story = {
  args: {
    data: [],
    columns: userColumns,
    title: "Custom Loading Configuration",
    loading: true,
    loadingConfig: {
      rows: 12,
      showHeader: true,
      showPagination: true,
      variant: "skeleton",
    },
    toolbarConfig: {
      showGlobalFilter: true,
      showColumnToggle: false,
      showExport: false,
    },
  },
};

export const TableWithEmptyConfig: Story = {
  args: {
    data: [],
    columns: transactionColumns,
    title: "Custom Empty State Configuration",
    loading: false,
    emptyConfig: {
      title: "No transactions found",
      description:
        "You haven't made any transactions yet. Connect your bank account or credit card to start tracking your finances.",
      icon: (
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
        </div>
      ),
      action: (
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Connect Bank Account
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            Add Manual Transaction
          </button>
        </div>
      ),
    },
  },
};

export const TableWithToolbarConfig: Story = {
  args: {
    data: MOCK_PRODUCTS,
    columns: productColumns as any,
    title: "Advanced Toolbar Configuration",
    enableSorting: true,
    enableGlobalFilter: true,
    enableSelection: true,
    enablePagination: true,
    pageSize: 5,
    toolbarConfig: {
      showGlobalFilter: true,
      showColumnToggle: true,
      showExport: true,
      showBulkActions: true,
      customActions: (
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm flex items-center gap-2">
            <span>📦</span>
            Import Products
          </button>
          <button className="px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm flex items-center gap-2">
            <span>📊</span>
            Analytics
          </button>
          <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Accessories</option>
            <option>Office</option>
          </select>
        </div>
      ),
      bulkActions: [
        {
          id: "updatePrice",
          label: "Update Prices",
          icon: "💰",
          onClick: (selectedRows) => {
            console.log("Updating prices for:", selectedRows);
          },
        },
        {
          id: "changeCategory",
          label: "Change Category",
          icon: "📂",
          onClick: (selectedRows) => {
            console.log("Changing category for:", selectedRows);
          },
        },
        {
          id: "markOutOfStock",
          label: "Mark Out of Stock",
          icon: "❌",
          variant: "warning",
          onClick: (selectedRows) => {
            console.log("Marking out of stock:", selectedRows);
          },
        },
        {
          id: "deleteProducts",
          label: "Delete Products",
          icon: "🗑️",
          variant: "danger",
          onClick: (selectedRows) => {
            console.log("Deleting products:", selectedRows);
          },
        },
      ],
    },
  },
};

export const TableWithExternalFilter: Story = {
  render: () => {
    const [statusFilter, setStatusFilter] = React.useState<string>("all");
    const [roleFilter, setRoleFilter] = React.useState<string>("all");
    const [departmentFilter, setDepartmentFilter] =
      React.useState<string>("all");

    const filteredData = React.useMemo(() => {
      return MOCK_USERS.filter((user) => {
        const statusMatch =
          statusFilter === "all" || user.status === statusFilter;
        const roleMatch = roleFilter === "all" || user.role === roleFilter;
        const departmentMatch =
          departmentFilter === "all" || user.department === departmentFilter;
        return statusMatch && roleMatch && departmentMatch;
      });
    }, [statusFilter, roleFilter, departmentFilter]);

    return (
      <div className="space-y-4">
        {/* External Filter Controls */}
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h3 className="text-sm font-medium text-gray-900 mb-3">
            External Filters
          </h3>
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Role
              </label>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="moderator">Moderator</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Department
              </label>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Departments</option>
                <option value="Engineering">Engineering</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="Support">Support</option>
                <option value="Design">Design</option>
                <option value="HR">HR</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setStatusFilter("all");
                  setRoleFilter("all");
                  setDepartmentFilter("all");
                }}
                className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 underline"
              >
                Clear Filters
              </button>
            </div>
          </div>

          <div className="mt-2 text-xs text-gray-600">
            Showing {filteredData.length} of {MOCK_USERS.length} users
          </div>
        </div>

        <DataTable
          data={filteredData}
          columns={userColumns}
          title="Users with External Filtering"
          enableSorting={true}
          enableGlobalFilter={true}
          enablePagination={true}
          pageSize={10}
          manualFiltering={true} // Disable internal filtering since we're handling it externally
          toolbarConfig={{
            showGlobalFilter: true,
            showColumnToggle: true,
            showExport: true,
          }}
        />
      </div>
    );
  },
};

export const TableWithExternalSort: Story = {
  render: () => {
    const [sortConfig, setSortConfig] = React.useState<{
      key: keyof User | null;
      direction: "asc" | "desc";
    }>({ key: null, direction: "asc" });

    const sortedData = React.useMemo(() => {
      if (!sortConfig.key) return MOCK_USERS;

      return [...MOCK_USERS].sort((a, b) => {
        const aVal = a[sortConfig.key!];
        const bVal = b[sortConfig.key!];
        if (!aVal || !bVal) return 0; // Handle null/undefined values gracefully
        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }, [sortConfig]);

    const handleSort = (key: keyof User) => {
      setSortConfig((prev) => ({
        key,
        direction:
          prev.key === key && prev.direction === "asc" ? "desc" : "asc",
      }));
    };

    return (
      <div className="space-y-4">
        {/* External Sort Controls */}
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h3 className="text-sm font-medium text-gray-900 mb-3">
            External Sort Controls
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              { key: "name" as keyof User, label: "Name" },
              { key: "email" as keyof User, label: "Email" },
              { key: "role" as keyof User, label: "Role" },
              { key: "department" as keyof User, label: "Department" },
              { key: "salary" as keyof User, label: "Salary" },
              { key: "joinDate" as keyof User, label: "Join Date" },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => handleSort(key)}
                className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                  sortConfig.key === key
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {label}
                {sortConfig.key === key && (
                  <span className="ml-1">
                    {sortConfig.direction === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </button>
            ))}

            <button
              onClick={() => setSortConfig({ key: null, direction: "asc" })}
              className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 underline"
            >
              Clear Sort
            </button>
          </div>

          <div className="mt-2 text-xs text-gray-600">
            {sortConfig.key ? (
              <>
                Sorted by {sortConfig.key} ({sortConfig.direction}ending)
              </>
            ) : (
              <>No sorting applied</>
            )}
          </div>
        </div>

        <DataTable
          data={sortedData}
          columns={userColumns}
          title="Users with External Sorting"
          enableSorting={false} // Disable internal sorting since we're handling it externally
          manualSorting={true}
          enableGlobalFilter={true}
          enablePagination={true}
          pageSize={10}
          toolbarConfig={{
            showGlobalFilter: true,
            showColumnToggle: true,
            showExport: true,
          }}
        />
      </div>
    );
  },
};
