import { Github, Twitter, Linkedin } from 'lucide-react';

interface SocialLinksProps {
  links: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    qiita?: string;
    zenn?: string;
  };
}

interface SocialIconProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  hoverColor?: string;
}

function SocialIcon({
  href,
  icon,
  label,
  hoverColor = 'hover:text-gray-900',
}: SocialIconProps) {
  return (
    <a
      href={href}
      className={`text-gray-500 ${hoverColor} transition-all duration-200 transform hover:scale-110 hover:-translate-y-1`}
      aria-label={label}
      title={label}
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon}
    </a>
  );
}

// Custom Qiita icon component
function QiitaIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M5.11 3.003h13.78v4.133h-4.133v9.643H9.243v-9.643H5.11V3.003zm9.644 13.777v4.133H5.11v-4.133h9.644z" />
    </svg>
  );
}

// Custom Zenn icon component
function ZennIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 256 256"
      fill="currentColor"
    >
      <path d="M111.99,32.05a8,8,0,0,0-8.23,6.23l-32,128.1a8,8,0,1,0,15.74,3.92L119.34,64h63.49a8,8,0,0,0,7.9-6.69l16.17-64.66a8,8,0,0,0-7.9-9.31H176a8,8,0,0,0,0,16h11.23l-3.32,13.29h-64Zm40,112.08-32,64.05a8,8,0,0,0,14.26,7.14L157.34,176h35.49a8,8,0,0,0,0-16H163.7l22.63-45.26a8,8,0,0,0-14.26-7.14Z" />
    </svg>
  );
}

export function SocialLinks({ links }: SocialLinksProps) {
  return (
    <div className="flex justify-center items-center space-x-6 mb-8">
      {links.github && (
        <SocialIcon
          href={links.github}
          icon={<Github size={26} />}
          label="GitHub Profile"
        />
      )}

      {links.twitter && (
        <SocialIcon
          href={links.twitter}
          icon={<Twitter size={24} />}
          label="X (Twitter) Profile"
        />
      )}

      {links.linkedin && (
        <SocialIcon
          href={links.linkedin}
          icon={<Linkedin size={26} />}
          label="LinkedIn Profile"
          hoverColor="hover:text-blue-600"
        />
      )}

      {links.qiita && (
        <SocialIcon
          href={links.qiita}
          icon={<QiitaIcon />}
          label="Qiita Profile"
          hoverColor="hover:text-green-600"
        />
      )}

      {links.zenn && (
        <SocialIcon
          href={links.zenn}
          icon={<ZennIcon />}
          label="Zenn Profile"
          hoverColor="hover:text-blue-500"
        />
      )}
    </div>
  );
}
