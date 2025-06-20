import { useState } from "react";
import { Link, useLocation } from "wouter";
import { BarChart3, FileText, CreditCard, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoUrl from "@assets/20250611_104718_0000_1750428216136.png";

interface LayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: BarChart3 },
  { name: 'Transaksi', href: '/transactions', icon: CreditCard },
  { name: 'Laporan', href: '/reports', icon: FileText },
];

export function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile menu */}
      <div className={`fixed inset-0 z-50 lg:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-slate-600 bg-opacity-75" onClick={() => setMobileMenuOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white shadow-xl">
          <div className="flex h-16 items-center justify-between px-6 border-b border-slate-200">
            <div className="flex items-center">
              <img src={logoUrl} alt="Kanjeng Broiler" className="w-8 h-8 rounded-full mr-3" />
              <span className="text-lg font-semibold text-slate-900">Kanjeng Broiler</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <nav className="flex-1 px-6 py-6">
            <ul className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-slate-200 shadow-sm">
          <div className="flex items-center h-16 px-6 border-b border-slate-200">
            <img src={logoUrl} alt="Kanjeng Broiler" className="w-10 h-10 rounded-full mr-3" />
            <span className="text-lg font-semibold text-slate-900">Kanjeng Broiler</span>
          </div>
          <nav className="flex-1 px-6 py-6">
            <ul className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Mobile header */}
        <div className="sticky top-0 z-40 lg:hidden">
          <div className="bg-white border-b border-slate-200 px-4 py-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <Menu className="w-5 h-5" />
                </Button>
                <div className="ml-3 flex items-center">
                  <img src={logoUrl} alt="Kanjeng Broiler" className="w-6 h-6 rounded-full mr-2" />
                  <span className="text-sm font-semibold text-slate-900">Kanjeng Broiler</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="px-4 py-8 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}