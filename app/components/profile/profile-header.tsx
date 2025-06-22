import { Avatar, AvatarFallback } from '@/app/components/ui/avatar';

interface ProfileHeaderProps {
  name: string;
  title: string;
  company: string;
}

export function ProfileHeader({ name, title, company }: ProfileHeaderProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="text-center mb-8 pt-4">
      <div className="flex justify-center mb-4">
        <Avatar className="h-20 w-20">
          <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
            {initials}
          </AvatarFallback>
        </Avatar>
      </div>
      <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
        {name}
      </h1>
      <p className="text-lg text-gray-600 mt-2">{title}</p>
      <p className="text-md text-gray-500">@ {company}</p>
    </div>
  );
}
