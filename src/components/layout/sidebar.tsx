import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Package, 
  ShoppingCart, 
  BarChart2, 
  DollarSign,
  Settings,
  Leaf
} from 'lucide-react';
import { ROUTES } from '@/lib/constants';

const navigation = [
  { name: 'Inventory', icon: Package, href: ROUTES.INVENTORY },
  { name: 'Orders', icon: ShoppingCart, href: ROUTES.ORDERS },
  { name: 'Analytics', icon: BarChart2, href: ROUTES.ANALYTICS },
  { name: 'Sales', icon: DollarSign, href: ROUTES.SALES },
  { name: 'Settings', icon: Settings, href: ROUTES.SETTINGS },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="fixed inset-y-0 left-0 w-[14%] flex flex-col z-50">
      <div className="flex flex-col flex-grow bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800">
        <div className="flex items-center h-16 flex-shrink-0 px-4 bg-primary">
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-white" />
            <span className="text-xl font-bold text-white">KnowNGrow</span>
          </Link>
        </div>
        <div className="flex-grow flex flex-col pt-5 pb-4 overflow-y-auto">
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20'
                  )}
                >
                  <item.icon
                    className={cn(
                      'mr-3 h-5 w-5',
                      isActive ? 'text-white' : 'text-gray-400 group-hover:text-primary dark:text-gray-400'
                    )}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}