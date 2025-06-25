interface ProfileHeaderProps {
  name: string;
  subName?: string;
  title: string;
  company: string;
}

export function ProfileHeader({
  name,
  subName,
  title,
  company,
}: ProfileHeaderProps) {
  return (
    <div className="text-center mb-8 pt-4">
      <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
        {name}
      </h1>
      {subName && <p className="text-lg text-gray-500 mt-1">{subName}</p>}
      <p className="text-lg text-gray-600 mt-2">{title}</p>
      <p className="text-md text-gray-500">@ {company}</p>
    </div>
  );
}
