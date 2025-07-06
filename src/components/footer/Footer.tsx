import logo from "@/assets/images/logo.png"
export default function Footer() {
  return (
    <div className="">
       <footer className="bg-green-600 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
        
        {/* Site Info */}
        <div>
           <div className="flex items-center justify-start -mt-3">
            <img className="size-16" src={logo} alt="" />
            <h1 className="text-2xl font-bold text-white">BookManager</h1>
          </div>
          <p className="text-sm">
            A simple and smart way to manage your book library. 
            Keep track of borrowed books, authors, and inventory easily.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:underline">All Books</a></li>
            <li><a href="#" className="hover:underline">Add Book</a></li>
            <li><a href="#" className="hover:underline">Borrow Summary</a></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:underline">All Books</a></li>
            <li><a href="#" className="hover:underline">Add Book</a></li>
            <li><a href="#" className="hover:underline">Borrow Summary</a></li>
          </ul>
        </div>

        {/* Credits */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Developed By</h3>
          <p className="text-sm">Nahida Akther</p>
          <p className="text-xs mt-1">© {new Date().getFullYear()} BookManager. All rights reserved.</p>
        </div>
      </div>
    </footer>
    </div>
  );
}
