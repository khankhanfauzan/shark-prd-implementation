import { EditorialShell } from '@/components/layout/EditorialShell';
import { ProductDetail } from '@/components/product/ProductDetail';

export default function ProductPage() {
  return (
    <EditorialShell wide>
      <ProductDetail />
    </EditorialShell>
  );
}
