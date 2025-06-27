interface AuthLayoutProps {
  title: string;
  subtitle: string;
  description: string;
  children: React.ReactNode;
}

export function AuthLayout({
  title,
  subtitle: _subtitle,
  description,
  children,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen animated-gradient flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-2xl font-black text-gray-900">{title}</h1>
          <p className="mt-1 text-sm text-gray-600">{description}</p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white/80 backdrop-filter backdrop-blur-md py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10 border border-gray-200/80">
          {children}
        </div>
      </div>
    </div>
  );
}
