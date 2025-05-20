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

const Navbar = () => {

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

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