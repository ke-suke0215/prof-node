import { Card, CardContent } from '~/components/ui/card';
import { ProfileHeader } from './profile-header';
import { SocialLinks } from './social-links';
import { ContactSection } from './contact-section';
import { OtherLinks } from './other-links';

interface ProfileData {
  name: string;
  subName?: string;
  title: string;
  company: string;
  email: string;
  links: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    qiita?: string;
    zenn?: string;
  };
  otherLinks: Array<{
    title: string;
    url: string;
  }>;
}

interface ProfileCardProps {
  profile: ProfileData;
}

export function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <div className="relative w-full max-w-sm mx-auto px-2">
      <Card className="relative w-full mx-auto rounded-2xl overflow-hidden shadow-xl transition-all duration-300 backdrop-blur-lg bg-white/70 border border-white/20">
        <CardContent className="px-6 py-8 md:px-8 md:py-10">
          <ProfileHeader
            name={profile.name}
            subName={profile.subName}
            title={profile.title}
            company={profile.company}
          />

          <SocialLinks links={profile.links} />

          <ContactSection email={profile.email} />

          <OtherLinks links={profile.otherLinks} />
        </CardContent>
      </Card>
    </div>
  );
}
