import { Card } from '@/components/ui/card';

export default function Sales() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Sales</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold text-lg">Total Sales</h3>
          <p className="text-3xl font-bold mt-2">₹25,00,000</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-lg">Monthly Sales</h3>
          <p className="text-3xl font-bold mt-2">₹5,00,000</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-lg">Daily Sales</h3>
          <p className="text-3xl font-bold mt-2">₹25,000</p>
        </Card>
      </div>
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4">Sales History</h3>
        <div className="h-[400px] flex items-center justify-center bg-secondary/50 rounded-lg">
          Sales History Chart Placeholder
        </div>
      </Card>
    </div>
  );
}