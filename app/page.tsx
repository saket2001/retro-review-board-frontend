// import Heading from "@/components/ui/UI/HeadingComponent/Heading";
// import SessionProvider from "./SessionProvider";

import { io } from 'socket.io-client';
import Link from "next/link";
import { Button } from "@/components/ui/MyButton";

export const socket = io(`${process.env.NEXT_PUBLIC_BACKEND_HOST_URL}`, {
  extraHeaders: {
    "Content-type": "application/json"
  },
  withCredentials: true, // Include cookies or other credentials
});

export default function Home() {
  return (
    // <SessionProvider replaceRoute="/" byPassRedirect={true}>
    <main className="min-h-screen mx-4 my-5 px-5 py-2 bg-white text-gray-800 rounded-3xl mb-8">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Collaborate With Your Team, <span className="underline underline-offset-8 decoration-wavy">Effortlessly!</span>
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Create boards, add comments, and manage retrospectives with ease.
          </p>
          <Button>
            <Link href="/board/create-board">
              Create Your First Board
            </Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-center underline decoration-wavy underline-offset-8 mb-4">Main Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-lg transition">
              <h4 className="text-xl font-bold mb-2">Easy Login & Guest Mode</h4>
              <p className="text-gray-600">
                Quickly sign up or log in. Access boards instantly in guest mode without an account.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-lg transition">
              <h4 className="text-xl font-bold mb-2">Quick Board Creation</h4>
              <p className="text-gray-600">
                Create boards with full control over locking, comments masking, categories, and data deletion after N days.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-lg transition">
              <h4 className="text-xl font-bold mb-2">Smooth UI for Comments</h4>
              <p className="text-gray-600">
                Add, edit, or delete comments seamlessly with auto-refresh to keep everyone updated.
              </p>
            </div>
            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-lg transition">
              <h4 className="text-xl font-bold mb-2">Easy Board Management</h4>
              <p className="text-gray-600">
                Update or delete boards easily and share them using a unique code for collaboration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 my-4 rounded-3xl shadow-sm">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Retro Review Board. All Rights Reserved To Saket Chandorkar</p>
        </div>
      </footer>

    </main>
    // </SessionProvider >
  );
}