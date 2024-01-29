
import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-white text-lg font-bold">Your App</Link>
                <div className="space-x-4">
                    <Link href="/" className="text-white">Home</Link>
                    <Link
                        href={{ query: { showDialog: "y" } }}
                        className="underline text-white"
                    >
                        Add Transaction
                    </Link>
                    <Link href="/contact" className="text-white">Contact</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;