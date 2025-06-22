// Custom SVG icons to avoid lucide-react file handle issues

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

// Custom GitHub icon component
function GithubIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.84 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

// Custom Twitter/X icon component
function TwitterIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// Custom LinkedIn icon component
function LinkedinIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
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
          icon={<GithubIcon />}
          label="GitHub Profile"
        />
      )}

      {links.twitter && (
        <SocialIcon
          href={links.twitter}
          icon={<TwitterIcon />}
          label="X (Twitter) Profile"
        />
      )}

      {links.linkedin && (
        <SocialIcon
          href={links.linkedin}
          icon={<LinkedinIcon />}
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
