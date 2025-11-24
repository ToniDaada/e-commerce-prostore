import Link from "next/link";
import { deleteProducts, getAllProducts } from "@/lib/actions/product.actions";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatId } from "@/lib/utils";

import Pagination from "@/components/shared/pagination";
import DeleteDialog from "@/components/shared/delete-dialog";
const AdminProductsPage = async (props: {
  searchParams: Promise<{
    page: string;

    query: string;
    category: string;
  }>;
}) => {
  const searchParams = await props.searchParams;

  const page = Number(searchParams.page) || 1;

  const searchText = searchParams.query;
  const category = searchParams.category;

  const products = await getAllProducts({
    query: searchText,
    page,
    category,
  });

  return (
    <div className="space-y-2">
      <div className="flex-between">
        <h1 className="h2-bold">Products</h1>
        <Button asChild>
          <Link href="/admin/product/create">Create Product</Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="text-[#808080]">
            <TableHead className="py-4 px-6">ID </TableHead>
            <TableHead>NAME </TableHead>
            <TableHead className="text-right">PRICE</TableHead>
            <TableHead>CATEGORY </TableHead>
            <TableHead>STOCK</TableHead>
            <TableHead>RATING </TableHead>
            <TableHead className="w-[100px]">ACTIONS </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.data.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="py-4 px-6">
                {formatId(product.id)}
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell className="text-right">
                {formatCurrency(product.price)}
              </TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>{product.rating}</TableCell>
              <TableCell className="flex gap-1">
                <Button asChild variant={"outline"} size={"sm"}>
                  <Link href={`admin/product/${product.id}`}>Edit</Link>
                </Button>

                <DeleteDialog id={product.id} action={deleteProducts} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {products?.totalPages > 1 && (
        <Pagination page={page} totalPages={products.totalPages} />
      )}
    </div>
  );
};

export default AdminProductsPage;
