import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import supabase from '@/utils/supabase';

const Navbar = () => {

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
  }, []);


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
            {loading ? (
              <Button variant="default" disabled>Loading...</Button>
            ) : user ? (
              <Link to="/account">
                <Button variant="default">Account</Button>
              </Link>
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