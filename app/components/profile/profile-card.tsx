import { Card, CardContent } from '@/app/components/ui/card';
import { ProfileHeader } from './profile-header';
import { SocialLinks } from './social-links';
import { ContactSection } from './contact-section';
import { OtherLinks } from './other-links';

interface ProfileData {
  name: string;
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
    <div className="relative w-full max-w-md mx-auto">
      <Card className="relative w-full mx-auto rounded-2xl overflow-hidden shadow-xl transition-all duration-300 backdrop-blur-lg bg-white/70 border border-white/20">
        <CardContent className="p-8 md:p-10">
          <ProfileHeader
            name={profile.name}
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
