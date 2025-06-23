interface OtherLink {
  title: string;
  url: string;
}

interface OtherLinksProps {
  links: OtherLink[];
}

export function OtherLinks({ links }: OtherLinksProps) {
  if (links.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider text-center mb-4">
        Other Links
      </h2>
      <div className="space-y-3 px-4">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            className="block bg-white/60 border border-gray-200/80 rounded-lg p-4 hover:bg-white hover:border-gray-300 hover:shadow-sm transition-all duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="font-semibold text-gray-800">{link.title}</p>
            <p className="text-sm text-gray-500 truncate">{link.url}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
