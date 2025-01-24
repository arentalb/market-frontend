import { PageHeader } from "@/components/common/PageHeader.tsx";
import { useGetPurchaseInvoiceByIdQuery } from "@/features/purchaseInvoice/api/purchaseInvoiceApiSlice.ts";
import { Loader } from "@/components/common/Loader.tsx";
import { ErrorBox } from "@/components/common/ErrorBox.tsx";
import { useParams } from "react-router-dom";
import { NotFoundPage } from "@/features/common/pages/NotFoundPage.tsx";
import { PurchaseInvoiceProductTable } from "@/features/purchaseInvoice/components/PurchaseInvoiceProductTable.tsx";
import { PurchaseInvoicePaymentsTable } from "@/features/purchaseInvoice/components/PurchaseInvoicePaymentsTable.tsx";
import { PurchaseInvoiceGeneralDetail } from "@/features/purchaseInvoice/components/PurchaseInvoiceGeneralDetail.tsx";

export function PurchaseInvoiceDetailPage() {
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
  const { data, isLoading, error } = useGetPurchaseInvoiceByIdQuery(
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
      <PurchaseInvoiceGeneralDetail invoice={invoice} />
      <PurchaseInvoiceProductTable products={invoice.products} />
      {invoice.payments.length > 0 && (
        <PurchaseInvoicePaymentsTable payments={invoice.payments} />
      )}
    </div>
  );
}
