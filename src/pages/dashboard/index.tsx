import { Card } from '@/components/ui/card';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold text-lg">Total Products</h3>
          <p className="text-3xl font-bold mt-2">150</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-lg">High Stock</h3>
          <p className="text-3xl font-bold mt-2 text-green-600">50</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-lg">Low Stock</h3>
          <p className="text-3xl font-bold mt-2 text-yellow-600">20</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-lg">Out of Stock</h3>
          <p className="text-3xl font-bold mt-2 text-red-600">5</p>
        </Card>
      </div>
    </div>
  );
}