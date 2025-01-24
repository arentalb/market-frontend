import { PageHeader } from "@/components/common/PageHeader.tsx";
import { Loader } from "@/components/common/Loader.tsx";
import { ErrorBox } from "@/components/common/ErrorBox.tsx";
import { useParams } from "react-router-dom";
import { NotFoundPage } from "@/features/common/pages/NotFoundPage.tsx";
import { SaleInvoiceGeneralDetail } from "@/features/saleInvoice/components/SaleInvoiceGeneralDetail.tsx";
import { SaleInvoiceProductTable } from "@/features/saleInvoice/components/SaleInvoiceProductTable.tsx";
import { SaleInvoicePaymentsTable } from "@/features/saleInvoice/components/SaleInvoicePaymentsTable.tsx";
import { useGetSaleInvoiceByIdQuery } from "@/features/saleInvoice/api/saleInvoiceApiSlice.ts";

export function SaleInvoiceDetailPage() {
  const { id } = useParams();
  const invoiceId = Number(id);

  if (!invoiceId || isNaN(invoiceId)) {
    return <NotFoundPage />;
  }
  return (
    <div className="flex flex-col w-full h-full">
      <PageHeader title={`وەسڵی ژمارە ${invoiceId} `} />
      <div className="">
        <InvoiceDetailSection invoiceId={invoiceId} />
      </div>
    </div>
  );
}

function InvoiceDetailSection({ invoiceId }: { invoiceId: number }) {
  const { data, isLoading, error } = useGetSaleInvoiceByIdQuery(
    { invoiceId: invoiceId },
    { skip: !invoiceId || isNaN(invoiceId) },
  );

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorBox error={error} />;
  }

  const invoice = data?.data.invoice;
  if (!invoice) {
    return (
      <p className="text-center text-lg text-gray-500">هیچ زانیاریەک نییە </p>
    );
  }

  return (
    <div className={"pb-8"}>
      <SaleInvoiceGeneralDetail invoice={invoice} />
      <SaleInvoiceProductTable products={invoice.products} />
      {invoice.payments.length > 0 && (
        <SaleInvoicePaymentsTable payments={invoice.payments} />
      )}
    </div>
  );
}
