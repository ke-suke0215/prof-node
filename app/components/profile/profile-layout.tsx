interface ProfileLayoutProps {
  children: React.ReactNode;
}

export function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 animate-gradient">
      <div className="flex items-center justify-center w-full flex-grow">
        {children}
      </div>
      <div className="mt-8 pb-4">
        <a
          href="/"
          className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200 underline decoration-1 underline-offset-2"
        >
          サイトTOPへ
        </a>
      </div>
    </div>
  );
}
