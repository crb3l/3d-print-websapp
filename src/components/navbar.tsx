import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const Navbar = () => {
  return (
    <nav className=" w-full py-6 bg-slate-100">
      <div className="mx-auto pl-10 pr-10 py-3">
        {/*pot adauga container in loc de pl-0 si pr-5, care sunt padding stanga, respectiv dreapta daca vreau sa fie in container (1920*1080)*/}
        <div className="flex items-center justify-between">
          <Link to="/" className="text-4xl font-bold">
            Treidee(e)
          </Link>

          <div className="space-x-4">

            <Link to="/print">
              <Button>Start Printing</Button>
            </Link>
            <Link to="/materials">
              <Button /*variant="ghost"*/  >Materials</Button>
            </Link>
            <Link to="/about">
              <Button >About Us</Button>
            </Link>
            <Link to="/contact">
              <Button >Contact</Button>
            </Link>
            <Link to="/shop">
              <Button >Shop now</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;