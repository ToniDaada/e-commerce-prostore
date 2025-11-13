import Pagination from "@/components/shared/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getMyorders } from "@/lib/actions/order.actions";
import { PAGE_SIZE } from "@/lib/constants";
import { formatCurrency, formatDateTime, formatId } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "My Orders",
};
const OrdersPage = async (props: {
  searchParams: Promise<{ page: string }>;
}) => {
  //Get page from searchParams

  const { page } = await props.searchParams;
  const orders = await getMyorders({
    page: Number(page) || 1,
    limit: PAGE_SIZE,
  });

  const fallBackDate = new Date("2025-10-19T08:30:00Z");

  return (
    <div className="space-y-2 ">
      <h2 className="h2-bold">Orders</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-[var(--color-border)] ">
              <TableHead className=" text-[#808080]">Order ID</TableHead>
              <TableHead className=" text-[#808080]">DATE</TableHead>
              <TableHead className=" text-[#808080]">TOTAL </TableHead>
              <TableHead className=" text-[#808080]">PAID </TableHead>
              <TableHead className=" text-[#808080]">DELIVERED </TableHead>
              <TableHead className=" text-[#808080]">ACTIONS </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.data.map((order) => (
              <TableRow
                key={order.id}
                className="border-b border-[var(--color-border)]"
              >
                <TableCell>{formatId(order.id)}</TableCell>
                <TableCell>
                  {formatDateTime(order.createdAt || fallBackDate).dateTime}
                </TableCell>
                <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
                <TableCell>
                  {order.isPaid && order.paidAt
                    ? formatDateTime(order.paidAt).dateTime
                    : "Not Paid"}
                </TableCell>
                <TableCell>
                  {order.isDelivered && order.deliveredAt
                    ? formatDateTime(order.deliveredAt).dateTime
                    : "Not Delivered"}
                </TableCell>
                <TableCell>
                  <Link href={`/order/${order.id}`}>
                    <span className="px-2">Details</span>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {orders.totalPages > 1 && (
          <Pagination
            page={Number(page) || 1}
            totalPages={orders?.totalPages}
          />
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
