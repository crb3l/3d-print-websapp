import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import supabase from '@/utils/supabase';
import { useCart } from '@/hooks/useCart';
import MiniCart from './cart/miniCart';

const Navbar = () => {

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { items } = useCart();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error);
      } else {
        setUser(data.user);
      }
      setLoading(false);
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_OUT") {
          setUser(null);
        } else if (event === "SIGNED_IN") {
          setUser(session?.user || null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };

  }, []);

  useEffect(() => {
    if (user) {
      const sessionTimeout = setTimeout(async () => {
        console.log("Session expired. Signing out...");
        await supabase.auth.signOut();
        navigate("/signin");
      }, 3600000); // 1 hour
      return () => clearTimeout(sessionTimeout);
    }
  }, [user, navigate]);

  return (
    <nav className=" w-full py-4 bg-slate-100">
      <div className="mx-auto pl-10 pr-10 py-3">
        {/*pot adauga container in loc de pl-0 si pr-5, care sunt padding stanga, respectiv dreapta daca vreau sa fie in container (1920*1080)*/}
        <div className="flex items-center justify-between">
          <Link to="/" className="text-4xl font-bold">
            Treidee(e)
          </Link>

          <div className="space-x-4">

            {/* {loading ? (
              <Button variant="default" disabled>Loading...</Button>
            ) : user ? (
              <Link to="/print">
                <Button variant="ghost">Start Printing</Button>
              </Link>
            ) : (
              <Link to="/signin">
                <Button variant="ghost">Start Printing</Button>
              </Link>
            )} */}

            <Link to="/print">
              <Button variant="ghost"  >Start Printing</Button>
            </Link>
            <Link to="/materials">
              <Button variant="ghost"  >Materials</Button>
            </Link>
            <Link to="/about">
              <Button variant="ghost"  >About Us</Button>
            </Link>
            <Link to="/contact">
              <Button variant="ghost"   >Contact</Button>
            </Link>
            <Link to="/shop">
              <Button variant="ghost"   >Shop now</Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative">
                  {/* Shopping Cart Icon */}
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 18h14a2 2 0 002-2v-8H6l-2-4M6 20v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H8a2 2 0 00-2 2z"
                    />
                  </svg>
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="p-0">
                <MiniCart />
              </DropdownMenuContent>
            </DropdownMenu>
            {/* {loading ? (
              <Button variant="default" disabled>Loading...</Button>
            ) : user ? (
              <Link to="/account">
                <Button variant="default">Account</Button>
              </Link>
            ) : (
              <Link to="/signin">
                <Button variant="default">Sign In</Button>
              </Link>
            )} */}
            {loading ? (
              <Button variant="default" disabled>
                Loading...
              </Button>
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="default">
                    {"| | |"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate("/account")}>
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={async () => {
                      await supabase.auth.signOut();
                      navigate("/signin");
                    }}
                  >
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/signin">
                <Button variant="default">Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;