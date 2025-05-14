import Footer from '../components/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen px-4 sm:px-10 font-[family-name:var(--font-geist-sans)] dark:text-white text-black">
      <main className="flex flex-col row-start-2 items-center sm:items-start w-full max-w-5xl">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
